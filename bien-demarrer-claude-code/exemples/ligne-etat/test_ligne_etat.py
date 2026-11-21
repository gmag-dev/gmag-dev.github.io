# SPDX-FileCopyrightText: 2026 Gabrielle Magnan
# SPDX-License-Identifier: MIT
"""Tests de la ligne d'état : on lui envoie le JSON documenté sur stdin."""

from __future__ import annotations

import json
import os
import re
import subprocess
import sys
import unittest
from pathlib import Path

ICI = Path(__file__).resolve().parent
SCRIPT = ICI / "ligne_etat.py"

# Extrait du schéma complet de la page Status line (lue le 2026-11-02).
COMPLET = {
    "cwd": "/chemin/vers/projet",
    "session_id": "abc123",
    "model": {"id": "claude-opus-5-5", "display_name": "Opus"},
    "workspace": {"current_dir": "/chemin/vers/projet", "project_dir": "/chemin/vers/projet", "added_dirs": []},
    "version": "2.1.90",
    "cost": {"total_cost_usd": 0.01234, "total_duration_ms": 45000},
    "context_window": {
        "total_input_tokens": 15500,
        "context_window_size": 200000,
        "used_percentage": 8,
        "remaining_percentage": 92,
        "current_usage": {"input_tokens": 8500, "output_tokens": 1200},
    },
    "exceeds_200k_tokens": False,
    "rate_limits": {
        "five_hour": {"used_percentage": 23.5, "resets_at": 1738425600},
        "seven_day": {"used_percentage": 91.2, "resets_at": 1738857600},
    },
}


def afficher(donnees: dict | str, *options: str, colonnes: str | None = None) -> str:
    env = {k: v for k, v in os.environ.items() if k not in ("COLUMNS", "NO_COLOR")}
    if colonnes:
        env["COLUMNS"] = colonnes
    entree = donnees if isinstance(donnees, str) else json.dumps(donnees)
    sortie = subprocess.run(
        [sys.executable, "-I", "-B", str(SCRIPT), *options],
        input=entree.encode("utf-8"),
        capture_output=True,
        timeout=30,
        check=False,
        env=env,
    )
    assert sortie.returncode == 0, sortie.stderr
    return sortie.stdout.decode("utf-8").rstrip("\n")


class LigneEtat(unittest.TestCase):
    def test_schema_complet(self):
        ligne = afficher(COMPLET)
        self.assertTrue(ligne.startswith("Opus | projet | contexte 8 % ok | 5 h 24 % ok (remise "), ligne)
        self.assertRegex(ligne, r"\| 7 j 91 % critique \(remise \d\d/\d\d \d\d:\d\d\)$")
        self.assertEqual(len(ligne.splitlines()), 1)

    def test_debut_de_session_sans_limites_et_pourcentage_nul(self):
        donnees = {
            "model": {"id": "claude-sonnet-5", "display_name": "Sonnet"},
            "workspace": {"current_dir": "C:/depots/demo"},
            "context_window": {"used_percentage": None, "current_usage": None},
        }
        self.assertEqual(afficher(donnees), "Sonnet | demo | contexte —")

    def test_une_fenetre_peut_manquer(self):
        donnees = dict(COMPLET, rate_limits={"seven_day": {"used_percentage": 75, "resets_at": 1738857600}})
        ligne = afficher(donnees)
        self.assertNotIn("5 h", ligne)
        self.assertIn("7 j 75 % attention", ligne)

    def test_entree_minimale_de_la_doc(self):
        donnees = {
            "model": {"display_name": "Opus"},
            "workspace": {"current_dir": "/home/user/project"},
            "context_window": {"used_percentage": 25},
            "session_id": "test-session-abc",
        }
        self.assertEqual(afficher(donnees), "Opus | project | contexte 25 % ok")

    def test_entree_illisible_ne_casse_rien(self):
        self.assertEqual(afficher("{pas du json"), "Claude | état indisponible")
        self.assertEqual(afficher("[]"), "Claude | état indisponible")

    def test_largeur_du_terminal(self):
        ligne = afficher(COMPLET, colonnes="30")
        self.assertEqual(len(ligne), 30)
        self.assertTrue(ligne.endswith("…"))

    def test_couleur_toujours_doublee_d_un_mot(self):
        ligne = afficher(COMPLET, "--couleur")
        self.assertIn("\033[31mcritique\033[0m", ligne)
        sans_codes = re.sub(r"\033\[\d+m", "", ligne)
        self.assertIn("critique", sans_codes)

    def test_reglages_d_exemple(self):
        reglages = json.loads((ICI / "exemple.settings.json").read_text(encoding="utf-8"))
        ligne = reglages["statusLine"]
        self.assertEqual(ligne["type"], "command")
        self.assertGreaterEqual(ligne["refreshInterval"], 1)  # minimum documenté
        self.assertNotIn("\\", ligne["command"])  # Git Bash mange les barres obliques inverses
        # Chapitre 17, tableau 17.3 : la ligne lance son script sans demande, d'où une règle ask sur son écriture
        # et sur celle du fichier qui la déclare. Pas de deny : il empêcherait /statusline d'écrire l'un et l'autre.
        demandes = reglages["permissions"]["ask"]
        self.assertIn("Edit(~/.claude/ligne_etat.py)", demandes)
        self.assertIn("Edit(~/.claude/settings.json)", demandes)
        self.assertNotIn("deny", reglages["permissions"])


if __name__ == "__main__":
    unittest.main()
