#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Gabrielle Magnan
# SPDX-License-Identifier: MIT
"""Hook PostToolUse : après une écriture (Write ou Edit), contrôle le fichier écrit.

- fichier ``.py`` : compilation en mémoire (aucun ``.pyc`` écrit) pour trouver une erreur
  de syntaxe ;
- fichier ``.json`` : analyse JSON.

En cas d'erreur, le hook rend ``{"decision": "block", "reason": ...}`` : l'outil a déjà
tourné, rien n'est annulé, mais la raison s'affiche à côté du résultat et Claude la lit,
donc il corrige au tour suivant. Le hook ne modifie jamais le fichier.

Le même squelette lance un vrai formateur ou une suite de tests : remplacez ``controler``.
"""

from __future__ import annotations

import json
import os
import sys
from pathlib import Path

TAILLE_MAX_FICHIER = 2 * 1024 * 1024


def controler(chemin: Path) -> str | None:
    """Retourne un message d'erreur lisible, ou None si le fichier est correct."""
    texte = chemin.read_text(encoding="utf-8", errors="replace")
    if chemin.suffix == ".py":
        try:
            compile(texte, str(chemin), "exec")
        except SyntaxError as err:
            return f"erreur de syntaxe Python dans {chemin.name}, ligne {err.lineno} : {err.msg}"
    elif chemin.suffix == ".json":
        try:
            json.loads(texte)
        except json.JSONDecodeError as err:
            return f"JSON invalide dans {chemin.name}, ligne {err.lineno}, colonne {err.colno} : {err.msg}"
    return None


def main() -> int:
    try:
        evenement = json.loads(sys.stdin.buffer.read(1024 * 1024).decode("utf-8"))
    except (UnicodeDecodeError, ValueError):
        return 0  # rien à contrôler : un PostToolUse ne peut de toute façon rien empêcher

    chemin_brut = (evenement.get("tool_input") or {}).get("file_path")
    if not isinstance(chemin_brut, str) or Path(chemin_brut).suffix not in (".py", ".json"):
        return 0
    chemin = Path(chemin_brut).resolve()

    # Ne lire que dans le projet : CLAUDE_PROJECT_DIR est fourni par Claude Code.
    projet = os.environ.get("CLAUDE_PROJECT_DIR") or evenement.get("cwd")
    if not projet or not chemin.is_relative_to(Path(projet).resolve()):
        return 0
    if not chemin.is_file() or chemin.stat().st_size > TAILLE_MAX_FICHIER:
        return 0

    probleme = controler(chemin)
    if probleme:
        sys.stdout.write(json.dumps({"decision": "block", "reason": probleme}, ensure_ascii=False) + "\n")
    return 0


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8", newline="\n")
    sys.exit(main())
