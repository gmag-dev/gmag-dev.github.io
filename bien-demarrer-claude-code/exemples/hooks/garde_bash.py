#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Gabrielle Magnan
# SPDX-License-Identifier: MIT
"""Hook PreToolUse : bloque quelques commandes Bash dangereuses avant qu'elles ne s'exécutent.

Entrée : le JSON que Claude Code écrit sur stdin (champs ``hook_event_name``,
``tool_name``, ``tool_input.command``…).

Deux façons de répondre, toutes deux documentées :
- par défaut, **code de sortie 2** et la raison sur **stderr** : la commande est bloquée,
  et Claude lit la raison ;
- avec ``--json``, une **décision JSON** sur stdout et le code 0 :
  ``hookSpecificOutput.permissionDecision`` vaut ``deny`` (bloquer) ou ``ask``
  (demander à la personne).

⚠️ Ce n'est PAS une frontière de sécurité : une détection par le texte se contourne
(variables, encodage, script intermédiaire). C'est une ceinture, pas un coffre-fort ;
le bac à sable et les règles ``deny`` restent nécessaires.
"""

from __future__ import annotations

import json
import re
import shlex
import sys

TAILLE_MAX_ENTREE = 1024 * 1024

# Programmes « enveloppes » qui lancent la vraie commande en argument.
ENVELOPPES = {"sudo", "doas", "env", "command", "builtin", "nice", "nohup", "time", "timeout", "stdbuf", "xargs"}
CIBLES_RACINE = {"/", "/*", "~", "~/", "~/*", "$HOME", "${HOME}", "$HOME/", ".", "./", "..", "*"}
SHELLS = {"sh", "bash", "zsh", "dash", "ksh"}

RE_TUBE_VERS_SHELL = re.compile(r"\b(curl|wget)\b[^|]*\|\s*(sudo\s+)?(sh|bash|zsh|dash|python3?)\b")
RE_SEPARATEURS = re.compile(r"&&|\|\||[;|&\n]")
RE_BOMBE = re.compile(r":\(\)\s*\{\s*:\s*\|\s*:\s*&\s*\}\s*;\s*:")


def _mots(segment: str) -> list[str]:
    try:
        return shlex.split(segment, posix=True)
    except ValueError:
        return segment.split()


def _programme_et_arguments(mots: list[str]) -> tuple[str, list[str]]:
    """Retire les affectations VAR=val, les enveloppes et le chemin du programme."""
    i = 0
    while i < len(mots):
        mot = mots[i]
        if re.match(r"^[A-Za-z_][A-Za-z0-9_]*=", mot):
            i += 1
            continue
        nom = mot.rsplit("/", 1)[-1]
        if nom in ENVELOPPES:
            i += 1
            # « timeout 30 cmd » : on saute aussi la durée et les options de l'enveloppe.
            while i < len(mots) and (mots[i].startswith("-") or re.match(r"^\d+[smhd]?$", mots[i])):
                i += 1
            continue
        return nom, mots[i + 1 :]
    return "", []


def raison_de_refus(commande: str, profondeur: int = 0) -> str | None:
    """Retourne la raison du refus, ou None si rien de dangereux n'est reconnu."""
    if profondeur > 3:
        return "commande imbriquée trop profondément"
    if RE_TUBE_VERS_SHELL.search(commande):
        return "télécharger puis exécuter (curl | sh) est interdit ; téléchargez, relisez, puis lancez"
    if RE_BOMBE.search(commande):
        return "bombe fork reconnue"

    for segment in RE_SEPARATEURS.split(commande):
        programme, args = _programme_et_arguments(_mots(segment.strip()))
        if not programme:
            continue
        options = {a for a in args if a.startswith("-")}
        lettres = "".join(a[1:] for a in options if not a.startswith("--"))

        if programme in SHELLS and "-c" in args:
            # « bash -c '...' » : on inspecte aussi la commande transmise.
            position = args.index("-c")
            if position + 1 < len(args):
                interne = raison_de_refus(args[position + 1], profondeur + 1)
                if interne:
                    return interne

        if programme == "rm":
            recursif = "r" in lettres.lower() or "--recursive" in options
            force = "f" in lettres or "--force" in options
            cibles = [a for a in args if not a.startswith("-")]
            if recursif and force and any(c in CIBLES_RACINE for c in cibles):
                return f"rm récursif et forcé sur {', '.join(c for c in cibles if c in CIBLES_RACINE)} : refusé"

        if programme == "git" and args:
            sous_commande = args[0]
            if sous_commande == "push" and ({"--force", "-f"} & options or "f" in lettres):
                return "git push --force réécrit l'historique distant : faites-le vous-même, en connaissance de cause"
            if sous_commande == "reset" and "--hard" in options:
                return "git reset --hard efface le travail non commité : refusé"

        if programme.startswith("mkfs"):
            return "formatage d'un système de fichiers refusé"
        if programme == "dd" and any(a.startswith("of=/dev/") for a in args):
            return "écriture brute sur un périphérique refusée"
        if programme == "chmod" and ("R" in lettres or "--recursive" in options) and "777" in args:
            return "chmod -R 777 ouvre tous les droits : refusé"
    return None


def demande_confirmation(commande: str) -> str | None:
    """Commandes non dangereuses mais sortantes : on demande plutôt que de bloquer (mode --json)."""
    for segment in RE_SEPARATEURS.split(commande):
        programme, args = _programme_et_arguments(_mots(segment.strip()))
        if programme == "git" and args[:1] == ["push"]:
            return "git push publie des commits : confirmez"
    return None


def main(argv: list[str]) -> int:
    mode_json = "--json" in argv
    brut = sys.stdin.buffer.read(TAILLE_MAX_ENTREE + 1)
    try:
        if len(brut) > TAILLE_MAX_ENTREE:
            raise ValueError("entrée trop grande")
        evenement = json.loads(brut.decode("utf-8"))
        if not isinstance(evenement, dict):
            raise ValueError("objet JSON attendu")
    except (UnicodeDecodeError, ValueError) as err:
        # Garde qui échoue : on ferme (code 2) plutôt que de laisser passer.
        print(f"garde_bash : entrée illisible ({err}) ; commande bloquée par prudence", file=sys.stderr)
        return 2

    try:
        if evenement.get("tool_name") != "Bash":
            return 0
        entree = evenement.get("tool_input")
        if not isinstance(entree, dict) or not isinstance(entree.get("command"), str):
            raise ValueError("tool_input.command attendu")
        commande = entree["command"]
        raison = raison_de_refus(commande)
    except Exception as err:  # garde qui échoue : on ferme
        print(f"garde_bash : entrée inattendue ({err}) ; commande bloquée par prudence", file=sys.stderr)
        return 2

    if raison is None and not mode_json:
        return 0
    if raison is None:
        question = demande_confirmation(commande)
        if question is None:
            return 0
        decision, motif = "ask", question
    else:
        decision, motif = "deny", raison

    if mode_json:
        sortie = {
            "hookSpecificOutput": {
                "hookEventName": "PreToolUse",
                "permissionDecision": decision,
                "permissionDecisionReason": f"garde_bash : {motif}",
            }
        }
        sys.stdout.write(json.dumps(sortie, ensure_ascii=False) + "\n")
        return 0
    print(f"garde_bash : {motif}", file=sys.stderr)
    return 2


if __name__ == "__main__":
    sys.stderr.reconfigure(encoding="utf-8")
    sys.stdout.reconfigure(encoding="utf-8", newline="\n")
    sys.exit(main(sys.argv[1:]))
