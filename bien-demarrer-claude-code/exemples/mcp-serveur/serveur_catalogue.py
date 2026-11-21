#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Gabrielle Magnan
# SPDX-License-Identifier: MIT
"""Serveur MCP minimal : transport stdio, bibliothèque standard Python seulement.

Ce qu'il montre
---------------
- JSON-RPC 2.0, un message par ligne sur stdin et stdout ; les journaux vont sur stderr.
- Un seul outil, en lecture seule : ``lire_fiche``, qui lit un fichier d'un petit
  catalogue SYNTHÉTIQUE (``donnees/``).
- Il refuse tout chemin qui sort de sa racine, et ne fait aucun appel réseau.
- Il parle les deux « ères » du protocole :
  * l'ère à poignée de main (révision 2025-11-25) : ``initialize``, puis la
    notification ``notifications/initialized``, puis ``tools/list`` et ``tools/call`` ;
  * l'ère sans état (révision 2026-07-28) : chaque requête porte sa version dans
    ``params._meta``, et le serveur répond à ``server/discover``.
  Un hôte récent peut donc parler l'une ou l'autre, selon la version de son SDK.

Lancement
---------
    python -I -B serveur_catalogue.py [--racine DOSSIER] [--eres double|heritee|moderne]

Le serveur attend sur stdin : un terminal muet est normal. Ctrl+D (ou Ctrl+Z puis
Entrée sous Windows) ferme stdin, et le serveur s'arrête.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path, PurePosixPath
from typing import Any

# --- Identité et versions -----------------------------------------------------

NOM_SERVEUR = "catalogue-synthetique"
VERSION_SERVEUR = "1.0.0"

# Ère sans état : la version est portée par chaque requête (révision 2026-07-28).
VERSIONS_MODERNES = ("2026-07-28",)
# Ère à poignée de main : la version est négociée une fois par ``initialize``.
VERSIONS_HERITEES = ("2025-11-25",)

CLE_VERSION = "io.modelcontextprotocol/protocolVersion"
CLE_CAPACITES_CLIENT = "io.modelcontextprotocol/clientCapabilities"
CLE_INFO_SERVEUR = "io.modelcontextprotocol/serverInfo"

# --- Codes d'erreur JSON-RPC et MCP ---------------------------------------------

ERREUR_ANALYSE = -32700  # le JSON ne se lit pas
ERREUR_REQUETE = -32600  # message qui n'est pas une requête valide
ERREUR_METHODE = -32601  # méthode inconnue
ERREUR_PARAMETRES = -32602  # paramètres invalides, outil inconnu, _meta incomplet
ERREUR_INTERNE = -32603
ERREUR_VERSION = -32022  # UnsupportedProtocolVersion (révision 2026-07-28)

# --- Garde-fous de lecture -------------------------------------------------------

EXTENSIONS_PERMISES = {".json", ".md"}
TAILLE_MAX_OCTETS = 64 * 1024

INSTRUCTIONS = (
    "Catalogue synthétique en lecture seule. Lisez d'abord index.json, "
    "puis une fiche par son chemin relatif (par exemple fiches/FICHE-001.md)."
)

# La définition de l'outil, telle que tools/list la renvoie.
OUTIL_LIRE_FICHE: dict[str, Any] = {
    "name": "lire_fiche",
    "title": "Lire une fiche du catalogue",
    "description": (
        "Lit un fichier du catalogue synthétique de projets, en lecture seule. "
        "Le chemin est relatif à la racine du catalogue : 'index.json' pour la liste, "
        "'fiches/FICHE-001.md' pour une fiche. Les chemins absolus, les remontées '..' "
        "et les extensions autres que .json et .md sont refusés."
    ),
    "inputSchema": {
        "type": "object",
        "properties": {
            "chemin": {
                "type": "string",
                "description": "Chemin relatif à la racine du catalogue, par exemple 'index.json'.",
            }
        },
        "required": ["chemin"],
        "additionalProperties": False,
    },
    # Des indices pour l'hôte : ils ne prouvent rien, le code ci-dessous oui.
    "annotations": {"readOnlyHint": True, "openWorldHint": False},
}


class ErreurProtocole(Exception):
    """Une erreur rendue comme erreur JSON-RPC (le modèle ne peut pas la corriger)."""

    def __init__(self, code: int, message: str, data: Any = None) -> None:
        super().__init__(message)
        self.code = code
        self.message = message
        self.data = data


class CheminRefuse(Exception):
    """Un chemin refusé : rendu comme résultat d'outil avec ``isError: true``."""


class Serveur:
    """La logique du serveur, indépendante du transport (testable sans sous-processus)."""

    def __init__(self, racine: Path, eres: str = "double") -> None:
        self.racine = racine.resolve()
        self.accepte_moderne = eres in ("double", "moderne")
        self.accepte_heritee = eres in ("double", "heritee")
        # Version négociée par ``initialize`` (ère à poignée de main), sinon None.
        self.version_heritee: str | None = None

    # --- Point d'entrée : un message décodé, une réponse (ou None) ------------------

    def traiter(self, message: Any) -> dict[str, Any] | None:
        if not isinstance(message, dict) or message.get("jsonrpc") != "2.0":
            return _erreur(_id_de(message), ERREUR_REQUETE, "Message JSON-RPC 2.0 attendu")
        methode = message.get("method")
        if not isinstance(methode, str):
            return _erreur(_id_de(message), ERREUR_REQUETE, "Champ 'method' manquant")

        # Une notification n'a pas d'id : on n'y répond jamais.
        if "id" not in message:
            if methode == "notifications/initialized":
                journal("notification initialized reçue")
            return None

        ident = message["id"]
        if ident is None or isinstance(ident, bool) or not isinstance(ident, (str, int)):
            return _erreur(None, ERREUR_REQUETE, "L'id doit être une chaîne ou un entier")

        params = message.get("params", {})
        if not isinstance(params, dict):
            return _erreur(ident, ERREUR_PARAMETRES, "'params' doit être un objet")

        try:
            return {"jsonrpc": "2.0", "id": ident, "result": self._aiguiller(methode, params)}
        except ErreurProtocole as err:
            return _erreur(ident, err.code, err.message, err.data)
        except Exception as exc:  # pragma: no cover - filet de sécurité
            journal(f"erreur interne : {exc!r}")
            return _erreur(ident, ERREUR_INTERNE, "Erreur interne du serveur")

    # --- Aiguillage entre les deux ères -------------------------------------------------

    def _aiguiller(self, methode: str, params: dict[str, Any]) -> dict[str, Any]:
        meta = params.get("_meta")
        version = meta.get(CLE_VERSION) if isinstance(meta, dict) else None

        # 1. Ère sans état : la requête porte sa version dans _meta.
        if version is not None and self.accepte_moderne:
            if not isinstance(version, str):
                raise ErreurProtocole(ERREUR_PARAMETRES, f"{CLE_VERSION} doit être une chaîne")
            if CLE_CAPACITES_CLIENT not in meta:
                raise ErreurProtocole(ERREUR_PARAMETRES, f"Champ _meta requis manquant : {CLE_CAPACITES_CLIENT}")
            if version not in VERSIONS_MODERNES:
                raise ErreurProtocole(
                    ERREUR_VERSION,
                    "Unsupported protocol version",
                    {"supported": self._versions_supportees(), "requested": version},
                )
            return self._moderne(methode, params)

        # 2. Ère à poignée de main.
        if methode == "initialize":
            if not self.accepte_heritee:
                # Un serveur moderne seulement DEVRAIT nommer ses versions (révision 2026-07-28).
                raise ErreurProtocole(
                    ERREUR_METHODE,
                    "initialize non pris en charge ; versions acceptées : " + ", ".join(VERSIONS_MODERNES),
                    {"supported": list(VERSIONS_MODERNES)},
                )
            return self._initialiser(params)

        if self.accepte_heritee:
            if methode not in ("tools/list", "tools/call", "ping"):
                raise ErreurProtocole(ERREUR_METHODE, f"Méthode inconnue : {methode}")
            if self.version_heritee is None:
                raise ErreurProtocole(ERREUR_REQUETE, "initialize attendu avant toute autre requête")
            return self._heritee(methode, params)

        raise ErreurProtocole(ERREUR_PARAMETRES, f"Champ _meta requis manquant : {CLE_VERSION}")

    def _versions_supportees(self) -> list[str]:
        versions: list[str] = []
        if self.accepte_moderne:
            versions.extend(VERSIONS_MODERNES)
        if self.accepte_heritee:
            versions.extend(VERSIONS_HERITEES)
        return versions

    def _info(self) -> dict[str, str]:
        return {"name": NOM_SERVEUR, "version": VERSION_SERVEUR}

    # --- Ère à poignée de main (2025-11-25) ----------------------------------------------

    def _initialiser(self, params: dict[str, Any]) -> dict[str, Any]:
        demandee = params.get("protocolVersion")
        # Négociation : même version si on la connaît, sinon notre plus récente.
        version = demandee if demandee in VERSIONS_HERITEES else VERSIONS_HERITEES[0]
        self.version_heritee = version
        journal(f"initialize : version demandée {demandee!r}, retenue {version}")
        return {
            "protocolVersion": version,
            "capabilities": {"tools": {"listChanged": False}},
            "serverInfo": self._info(),
            "instructions": INSTRUCTIONS,
        }

    def _heritee(self, methode: str, params: dict[str, Any]) -> dict[str, Any]:
        if methode == "ping":
            return {}
        if methode == "tools/list":
            return {"tools": [OUTIL_LIRE_FICHE]}
        return self._appeler_outil(params)

    # --- Ère sans état (2026-07-28) ------------------------------------------------------

    def _moderne(self, methode: str, params: dict[str, Any]) -> dict[str, Any]:
        meta_resultat = {CLE_INFO_SERVEUR: self._info()}
        if methode == "server/discover":
            return {
                "resultType": "complete",
                "supportedVersions": self._versions_supportees(),
                "capabilities": {"tools": {}},
                "_meta": meta_resultat,
                "instructions": INSTRUCTIONS,
                "ttlMs": 3_600_000,
                "cacheScope": "public",
            }
        if methode == "tools/list":
            return {
                "resultType": "complete",
                "tools": [OUTIL_LIRE_FICHE],
                "ttlMs": 300_000,
                "cacheScope": "public",
                "_meta": meta_resultat,
            }
        if methode == "tools/call":
            return {"resultType": "complete", **self._appeler_outil(params), "_meta": meta_resultat}
        raise ErreurProtocole(ERREUR_METHODE, f"Méthode inconnue : {methode}")

    # --- L'outil -------------------------------------------------------------------------

    def _appeler_outil(self, params: dict[str, Any]) -> dict[str, Any]:
        nom = params.get("name")
        if nom != OUTIL_LIRE_FICHE["name"]:
            # Outil inconnu : erreur de protocole (le modèle ne peut pas la corriger).
            raise ErreurProtocole(ERREUR_PARAMETRES, f"Outil inconnu : {nom}")
        arguments = params.get("arguments", {})
        if not isinstance(arguments, dict):
            raise ErreurProtocole(ERREUR_PARAMETRES, "'arguments' doit être un objet")
        try:
            inconnus = sorted(set(arguments) - {"chemin"})
            if inconnus:
                raise CheminRefuse(f"Argument inattendu : {', '.join(inconnus)}")
            texte = self.lire(arguments.get("chemin"))
        except CheminRefuse as refus:
            # Erreur d'exécution : rendue au modèle, qui peut réessayer autrement.
            journal(f"refus : {refus}")
            return {"content": [{"type": "text", "text": f"Refusé : {refus}"}], "isError": True}
        return {"content": [{"type": "text", "text": texte}], "isError": False}

    def lire(self, chemin: Any) -> str:
        """Lit un fichier SOUS la racine, ou lève CheminRefuse."""
        if not isinstance(chemin, str) or not chemin.strip():
            raise CheminRefuse("le chemin doit être une chaîne non vide")
        if "\x00" in chemin:
            raise CheminRefuse("caractère nul interdit")
        brut = Path(chemin)
        if brut.is_absolute() or brut.drive or brut.anchor:
            raise CheminRefuse("chemin absolu refusé ; donnez un chemin relatif à la racine")
        if ".." in PurePosixPath(chemin.replace("\\", "/")).parts:
            raise CheminRefuse("remontée '..' refusée")
        cible = (self.racine / brut).resolve()
        # Deuxième garde, après résolution des liens : la cible doit rester sous la racine.
        if not cible.is_relative_to(self.racine):
            raise CheminRefuse("chemin hors de la racine du catalogue")
        if cible.suffix.lower() not in EXTENSIONS_PERMISES:
            raise CheminRefuse("seules les extensions .json et .md sont lisibles")
        if not cible.is_file():
            raise CheminRefuse(f"fichier introuvable : {chemin}")
        if cible.stat().st_size > TAILLE_MAX_OCTETS:
            raise CheminRefuse("fichier trop gros pour cet exemple")
        return cible.read_text(encoding="utf-8")


# --- Utilitaires -------------------------------------------------------------------------


def _id_de(message: Any) -> Any:
    return message.get("id") if isinstance(message, dict) else None


def _erreur(ident: Any, code: int, message: str, data: Any = None) -> dict[str, Any]:
    corps: dict[str, Any] = {"code": code, "message": message}
    if data is not None:
        corps["data"] = data
    return {"jsonrpc": "2.0", "id": ident, "error": corps}


def journal(texte: str) -> None:
    """stdout est réservé au protocole : tout journal va sur stderr."""
    print(f"[{NOM_SERVEUR}] {texte}", file=sys.stderr, flush=True)


def ecrire(sortie: Any, message: dict[str, Any]) -> None:
    # json.dumps échappe les retours à la ligne : un message tient sur une seule ligne.
    sortie.write((json.dumps(message, ensure_ascii=False) + "\n").encode("utf-8"))
    sortie.flush()


def boucle(serveur: Serveur, entree: Any, sortie: Any) -> None:
    """Lit stdin ligne à ligne jusqu'à sa fermeture (signal d'arrêt du transport stdio)."""
    for ligne in entree:
        ligne = ligne.strip()
        if not ligne:
            continue
        try:
            message = json.loads(ligne.decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError):
            ecrire(sortie, _erreur(None, ERREUR_ANALYSE, "JSON illisible"))
            continue
        if isinstance(message, list):
            # Les lots JSON-RPC ne font plus partie des révisions récentes de MCP.
            ecrire(sortie, _erreur(None, ERREUR_REQUETE, "Les lots JSON-RPC ne sont pas pris en charge"))
            continue
        reponse = serveur.traiter(message)
        if reponse is not None:
            ecrire(sortie, reponse)


def main(argv: list[str] | None = None) -> int:
    analyseur = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    analyseur.add_argument(
        "--racine",
        type=Path,
        default=Path(__file__).resolve().parent / "donnees",
        help="dossier du catalogue (défaut : ./donnees à côté du script)",
    )
    analyseur.add_argument(
        "--eres",
        choices=("double", "heritee", "moderne"),
        default="double",
        help="ères du protocole acceptées (défaut : les deux)",
    )
    options = analyseur.parse_args(argv)
    if not options.racine.is_dir():
        journal(f"racine introuvable : {options.racine}")
        return 2
    journal(f"prêt (ères : {options.eres}) ; racine : {options.racine.name}/")
    boucle(Serveur(options.racine, options.eres), sys.stdin.buffer, sys.stdout.buffer)
    return 0


if __name__ == "__main__":
    # Journaux en UTF-8 sur tous les systèmes : sous Windows, un flux redirigé suivrait
    # sinon la page de code locale (cp1252), que l'hôte ne sait pas lire.
    sys.stderr.reconfigure(encoding="utf-8")
    sys.stdout.reconfigure(encoding="utf-8", newline="\n")
    sys.exit(main())
