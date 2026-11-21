#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Gabrielle Magnan
# SPDX-License-Identifier: MIT
"""Petit client MCP de test, en bibliothèque standard : il appelle un serveur stdio comme un hôte.

Ce qu'il montre
---------------
- Le lancement du serveur en sous-processus, un message JSON par ligne.
- La détection de l'« ère » du serveur, comme le décrit la révision 2026-07-28 pour stdio :
  1. sonder avec ``server/discover`` (version moderne dans ``_meta``) ;
  2. un ``DiscoverResult`` ou l'erreur -32022 : serveur moderne, on reste moderne ;
  3. toute autre erreur, ou le silence : serveur hérité, on revient à ``initialize``
     puis ``notifications/initialized``.
- ``tools/list`` puis ``tools/call``.
- La fermeture propre : on ferme stdin, on attend la fin du serveur.

Usage
-----
    python -I -B client_hote.py [--ere auto|heritee|moderne] [--outil NOM] [--arguments JSON] \
        -- python -I -B ../mcp-serveur/serveur_catalogue.py

Ce client n'est pas Claude Code : il sert à vérifier un serveur avant de le déclarer.
"""

from __future__ import annotations

import argparse
import json
import queue
import subprocess
import sys
import threading
from typing import Any

VERSIONS_MODERNES = ("2026-07-28",)
VERSION_HERITEE = "2025-11-25"
INFO_CLIENT = {"name": "client-hote-exemple", "version": "1.0.0"}
ERREUR_VERSION = -32022


class ErreurMcp(Exception):
    def __init__(self, erreur: dict[str, Any]) -> None:
        super().__init__(f"{erreur.get('code')} : {erreur.get('message')}")
        self.code = erreur.get("code")
        self.data = erreur.get("data")


class ClientStdio:
    def __init__(self, commande: list[str], delai: float = 10.0, cwd: str | None = None) -> None:
        self.delai = delai
        self.ere: str | None = None
        self.version: str | None = None
        self.info_serveur: dict[str, Any] = {}
        self._prochain_id = 0
        self._reponses: queue.Queue = queue.Queue()
        self.journal_serveur: list[str] = []
        self._processus = subprocess.Popen(
            commande,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            cwd=cwd,
        )
        self._lecteurs = [
            threading.Thread(target=self._lire_stdout, daemon=True),
            threading.Thread(target=self._lire_stderr, daemon=True),
        ]
        for lecteur in self._lecteurs:
            lecteur.start()

    # --- Transport ------------------------------------------------------------------

    def _lire_stdout(self) -> None:
        for ligne in self._processus.stdout:
            if ligne.strip():
                try:
                    self._reponses.put(json.loads(ligne.decode("utf-8")))
                except (UnicodeDecodeError, json.JSONDecodeError):
                    self._reponses.put({"_illisible": ligne.decode("utf-8", "replace")})
        self._reponses.put(None)  # fin de flux

    def _lire_stderr(self) -> None:
        for ligne in self._processus.stderr:
            self.journal_serveur.append(ligne.decode("utf-8", "replace").rstrip())

    def _envoyer(self, message: dict[str, Any]) -> None:
        self._processus.stdin.write((json.dumps(message) + "\n").encode("utf-8"))
        self._processus.stdin.flush()

    def notifier(self, methode: str, params: dict[str, Any] | None = None) -> None:
        message: dict[str, Any] = {"jsonrpc": "2.0", "method": methode}
        if params is not None:
            message["params"] = params
        self._envoyer(message)

    def demander(self, methode: str, params: dict[str, Any] | None = None) -> dict[str, Any]:
        """Envoie une requête et attend la réponse au même id (les autres sont ignorées)."""
        self._prochain_id += 1
        ident = self._prochain_id
        params = dict(params or {})
        if self.ere == "moderne":
            params["_meta"] = self._meta()
        self._envoyer({"jsonrpc": "2.0", "id": ident, "method": methode, "params": params})
        while True:
            try:
                reponse = self._reponses.get(timeout=self.delai)
            except queue.Empty:
                raise TimeoutError(f"pas de réponse à {methode} en {self.delai} s") from None
            if reponse is None:
                raise ConnectionError("le serveur a fermé sa sortie")
            if reponse.get("id") != ident:
                continue  # réponse tardive à une requête abandonnée, ou notification
            if "error" in reponse:
                raise ErreurMcp(reponse["error"])
            return reponse["result"]

    def _meta(self) -> dict[str, Any]:
        return {
            "io.modelcontextprotocol/protocolVersion": self.version,
            "io.modelcontextprotocol/clientCapabilities": {},
            "io.modelcontextprotocol/clientInfo": INFO_CLIENT,
        }

    # --- Détection de l'ère -----------------------------------------------------------

    def connecter(self, ere: str = "auto") -> str:
        if ere in ("auto", "moderne"):
            self.ere, self.version = "moderne", VERSIONS_MODERNES[0]
            try:
                decouverte = self.demander("server/discover")
                communes = [v for v in VERSIONS_MODERNES if v in decouverte.get("supportedVersions", [])]
                if not communes:
                    raise RuntimeError("aucune version moderne commune avec le serveur")
                self.version = communes[0]
                self.info_serveur = decouverte.get("_meta", {}).get("io.modelcontextprotocol/serverInfo", {})
                return self.ere
            except ErreurMcp as err:
                if err.code == ERREUR_VERSION:
                    # Serveur moderne, autre version : on en choisit une commune, sans repli.
                    communes = [v for v in VERSIONS_MODERNES if v in (err.data or {}).get("supported", [])]
                    if not communes:
                        raise RuntimeError("serveur moderne sans version commune") from err
                    self.version = communes[0]
                    return self.ere
                if ere == "moderne":
                    raise
            except TimeoutError:
                if ere == "moderne":
                    raise
            # Toute autre erreur, ou le silence : serveur hérité.
        self.ere, self.version = "heritee", None
        resultat = self.demander(
            "initialize",
            {"protocolVersion": VERSION_HERITEE, "capabilities": {}, "clientInfo": INFO_CLIENT},
        )
        self.version = resultat.get("protocolVersion")
        self.info_serveur = resultat.get("serverInfo", {})
        self.notifier("notifications/initialized")
        return self.ere

    # --- Outils -----------------------------------------------------------------------------

    def lister_outils(self) -> list[dict[str, Any]]:
        return self.demander("tools/list")["tools"]

    def appeler(self, nom: str, arguments: dict[str, Any]) -> dict[str, Any]:
        return self.demander("tools/call", {"name": nom, "arguments": arguments})

    def fermer(self) -> int:
        """Arrêt stdio : fermer stdin, attendre, puis terminer le processus s'il traîne."""
        try:
            self._processus.stdin.close()
            code = self._processus.wait(timeout=self.delai)
        except subprocess.TimeoutExpired:
            self._processus.terminate()
            code = self._processus.wait(timeout=self.delai)
        # Les lecteurs voient la fin de flux, puis on ferme les tubes.
        for lecteur in self._lecteurs:
            lecteur.join(timeout=self.delai)
        self._processus.stdout.close()
        self._processus.stderr.close()
        return code

    def __enter__(self) -> "ClientStdio":
        return self

    def __exit__(self, *exc: object) -> None:
        self.fermer()


def main(argv: list[str] | None = None) -> int:
    argv = list(sys.argv[1:] if argv is None else argv)
    if "--" not in argv:
        print("usage : client_hote.py [options] -- <commande du serveur>", file=sys.stderr)
        return 2
    coupure = argv.index("--")
    options_client, commande = argv[:coupure], argv[coupure + 1 :]
    analyseur = argparse.ArgumentParser(description="Client MCP stdio de test")
    analyseur.add_argument("--ere", choices=("auto", "heritee", "moderne"), default="auto")
    analyseur.add_argument("--outil", default=None, help="outil à appeler (défaut : aucun)")
    analyseur.add_argument("--arguments", default="{}", help="arguments JSON de l'outil")
    analyseur.add_argument("--delai", type=float, default=10.0, help="secondes d'attente par requête")
    options = analyseur.parse_args(options_client)
    if not commande:
        print("commande du serveur manquante après --", file=sys.stderr)
        return 2

    with ClientStdio(commande, delai=options.delai) as client:
        try:
            ere = client.connecter(options.ere)
            print(f"ère : {ere} ; version : {client.version} ; serveur : {client.info_serveur.get('name', '?')}")
            for outil in client.lister_outils():
                print(f"outil : {outil['name']} — {outil.get('title', '')}")
            if options.outil:
                resultat = client.appeler(options.outil, json.loads(options.arguments))
                etat = "ERREUR D'OUTIL" if resultat.get("isError") else "ok"
                print(f"appel {options.outil} : {etat}")
                for bloc in resultat.get("content", []):
                    if bloc.get("type") == "text":
                        print(bloc["text"])
                return 1 if resultat.get("isError") else 0
            return 0
        except (ErreurMcp, TimeoutError, ConnectionError, RuntimeError) as err:
            print(f"échec : {err}", file=sys.stderr)
            return 1


if __name__ == "__main__":
    # Sortie en UTF-8 sur tous les systèmes : sous Windows, un flux redirigé suivrait
    # sinon la page de code locale (cp1252).
    sys.stderr.reconfigure(encoding="utf-8")
    sys.stdout.reconfigure(encoding="utf-8", newline="\n")
    sys.exit(main())
