#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Gabrielle Magnan
# SPDX-License-Identifier: MIT
"""Hook SessionStart : ajoute au contexte de Claude les notes d'équipe du projet.

Pour SessionStart, la doc dit qu'un texte écrit sur stdout (code 0) est ajouté au
contexte de Claude : pas besoin de JSON. Le hook lit ``NOTES-SESSION.md`` à la racine du
projet s'il existe (4 Kio au plus) et le recopie, au démarrage, à la reprise, après
``/clear`` et après une compaction (champ ``source`` de l'entrée).

Il ne bloque jamais : pour SessionStart, le code 2 n'arrête rien de toute façon.
"""

from __future__ import annotations

import json
import os
import sys
from pathlib import Path

NOM_NOTES = "NOTES-SESSION.md"
TAILLE_MAX = 4 * 1024


def main() -> int:
    try:
        evenement = json.loads(sys.stdin.buffer.read(1024 * 1024).decode("utf-8"))
    except (UnicodeDecodeError, ValueError):
        evenement = {}
    projet = os.environ.get("CLAUDE_PROJECT_DIR") or evenement.get("cwd")
    if not projet:
        return 0
    notes = Path(projet) / NOM_NOTES
    if not notes.is_file():
        return 0
    with notes.open("rb") as f:
        texte = f.read(TAILLE_MAX).decode("utf-8", errors="replace").strip()
    if not texte:
        return 0
    source = evenement.get("source", "startup")
    print(f"Notes d'équipe du projet ({NOM_NOTES}, session : {source}) :\n{texte}")
    return 0


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8", newline="\n")
    sys.exit(main())
