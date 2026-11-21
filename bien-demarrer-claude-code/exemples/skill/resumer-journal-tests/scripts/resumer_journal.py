#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Gabrielle Magnan
# SPDX-License-Identifier: MIT
"""Résume un journal de tests (unittest ou pytest) : verdict, compteurs, tests en échec.

Usage :
    python -I -B resumer_journal.py JOURNAL [--json]
    python -I -B resumer_journal.py - [--json]      # lit le journal sur stdin

Codes de sortie :
    0  résumé produit (que les tests soient verts ou rouges)
    2  journal illisible, trop gros, ou format non reconnu

Le journal est traité comme une DONNÉE : le script n'exécute rien de ce qu'il contient
et ne recopie que des noms de tests, tronqués.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

TAILLE_MAX_OCTETS = 5 * 1024 * 1024
NOMS_MAX = 20
LONGUEUR_NOM_MAX = 200

# --- unittest -----------------------------------------------------------------------
RE_UNITTEST_RAN = re.compile(r"^Ran (\d+) tests? in [\d.]+s\s*$", re.MULTILINE)
RE_UNITTEST_FIN = re.compile(r"^(OK|FAILED)(?: \(([^)]*)\))?\s*$", re.MULTILINE)
RE_UNITTEST_ECHEC = re.compile(r"^(FAIL|ERROR): (\S+)(?: \(([^)]*)\))?", re.MULTILINE)

# --- pytest -------------------------------------------------------------------------
RE_PYTEST_BILAN = re.compile(
    r"^=*\s*((?:\d+ (?:passed|failed|errors?|skipped|xfailed|xpassed|deselected|warnings?)(?:, )?)+)"
    r"\s+in [\d.]+s",
    re.MULTILINE,
)
RE_PYTEST_ECHEC = re.compile(r"^(FAILED|ERROR) (\S+)", re.MULTILINE)


def _tronquer(nom: str) -> str:
    nom = "".join(c for c in nom if c.isprintable())
    return nom if len(nom) <= LONGUEUR_NOM_MAX else nom[: LONGUEUR_NOM_MAX - 1] + "…"


def analyser(texte: str) -> dict:
    """Retourne un dictionnaire de résumé, ou lève ValueError si le format est inconnu."""
    ran = RE_UNITTEST_RAN.findall(texte)
    if ran:
        total = int(ran[-1])
        compteurs = {"failures": 0, "errors": 0, "skipped": 0, "expected failures": 0, "unexpected successes": 0}
        fins = RE_UNITTEST_FIN.findall(texte)
        statut, details = fins[-1] if fins else ("", "")
        for morceau in filter(None, (m.strip() for m in details.split(","))):
            cle, _, valeur = morceau.partition("=")
            if cle.strip() in compteurs and valeur.strip().isdigit():
                compteurs[cle.strip()] = int(valeur)
        echecs = [
            f"{nom} ({classe})" if classe else nom for _type, nom, classe in RE_UNITTEST_ECHEC.findall(texte)
        ]
        echoues = compteurs["failures"] + compteurs["errors"]
        return {
            "format": "unittest",
            "verdict": "rouge" if statut == "FAILED" or echoues else ("vert" if statut == "OK" else "inconnu"),
            "total": total,
            "reussis": max(total - echoues - compteurs["skipped"] - compteurs["expected failures"], 0),
            "echecs": compteurs["failures"],
            "erreurs": compteurs["errors"],
            "sautes": compteurs["skipped"],
            "tests_en_echec": [_tronquer(n) for n in echecs],
        }

    bilans = RE_PYTEST_BILAN.findall(texte)
    if bilans:
        compteurs: dict[str, int] = {}
        for morceau in bilans[-1].split(","):
            nombre, _, cle = morceau.strip().partition(" ")
            cle = {"error": "errors", "warning": "warnings"}.get(cle, cle)
            compteurs[cle] = compteurs.get(cle, 0) + int(nombre)
        echecs = [nom for _type, nom in RE_PYTEST_ECHEC.findall(texte)]
        echoues = compteurs.get("failed", 0) + compteurs.get("errors", 0)
        total = sum(compteurs.get(c, 0) for c in ("passed", "failed", "errors", "skipped", "xfailed", "xpassed"))
        return {
            "format": "pytest",
            "verdict": "rouge" if echoues else "vert",
            "total": total,
            "reussis": compteurs.get("passed", 0),
            "echecs": compteurs.get("failed", 0),
            "erreurs": compteurs.get("errors", 0),
            "sautes": compteurs.get("skipped", 0),
            "tests_en_echec": [_tronquer(n) for n in echecs],
        }

    raise ValueError("format non reconnu (ni bilan unittest « Ran N tests », ni bilan pytest « N passed in »)")


def en_markdown(resume: dict) -> str:
    etiquette = {"vert": "✅ VERT", "rouge": "⛔ ROUGE", "inconnu": "❓ INCONNU"}[resume["verdict"]]
    lignes = [
        f"**Verdict : {etiquette}** ({resume['format']})",
        "",
        "| Total | Réussis | Échecs | Erreurs | Sautés |",
        "|---:|---:|---:|---:|---:|",
        f"| {resume['total']} | {resume['reussis']} | {resume['echecs']} | {resume['erreurs']} | {resume['sautes']} |",
    ]
    noms = resume["tests_en_echec"]
    if noms:
        lignes += ["", "Tests en échec :"]
        lignes += [f"- `{nom}`" for nom in noms[:NOMS_MAX]]
        if len(noms) > NOMS_MAX:
            lignes.append(f"- … et {len(noms) - NOMS_MAX} autres")
    return "\n".join(lignes)


def lire(source: str) -> str:
    if source == "-":
        donnees = sys.stdin.buffer.read(TAILLE_MAX_OCTETS + 1)
    else:
        chemin = Path(source)
        if not chemin.is_file():
            raise ValueError(f"fichier introuvable : {source}")
        if chemin.stat().st_size > TAILLE_MAX_OCTETS:
            raise ValueError("journal trop gros (plus de 5 Mio)")
        donnees = chemin.read_bytes()
    if len(donnees) > TAILLE_MAX_OCTETS:
        raise ValueError("journal trop gros (plus de 5 Mio)")
    return donnees.decode("utf-8", errors="replace")


def main(argv: list[str] | None = None) -> int:
    analyseur = argparse.ArgumentParser(description="Résume un journal de tests unittest ou pytest.")
    analyseur.add_argument("journal", help="chemin du journal, ou - pour stdin")
    analyseur.add_argument("--json", action="store_true", help="sortie JSON au lieu de Markdown")
    options = analyseur.parse_args(argv)
    try:
        resume = analyser(lire(options.journal))
    except ValueError as err:
        print(f"resumer_journal : {err}", file=sys.stderr)
        return 2
    print(json.dumps(resume, ensure_ascii=False, indent=2) if options.json else en_markdown(resume))
    return 0


if __name__ == "__main__":
    # Sortie et messages d'erreur en UTF-8 sur tous les systèmes : sous Windows, un flux
    # redirigé suivrait sinon la page de code locale (cp1252).
    sys.stderr.reconfigure(encoding="utf-8")
    sys.stdout.reconfigure(encoding="utf-8", newline="\n")
    sys.exit(main())
