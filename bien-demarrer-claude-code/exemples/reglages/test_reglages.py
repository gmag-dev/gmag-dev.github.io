# SPDX-FileCopyrightText: 2026 Gabrielle Magnan
# SPDX-License-Identifier: MIT
"""Tests du settings.json de projet d'exemple : syntaxe des règles et cohérence avec les autres exemples."""

from __future__ import annotations

import json
import re
import unittest
from pathlib import Path

ICI = Path(__file__).resolve().parent
EXEMPLES = ICI.parent
REGLAGES = json.loads((ICI / "exemple.settings.json").read_text(encoding="utf-8"))
PERMISSIONS = REGLAGES["permissions"]

# Forme d'une règle : « Outil » ou « Outil(spécificateur) » (page Configure permissions).
RE_REGLE = re.compile(r"^(?P<outil>[A-Za-z][A-Za-z0-9_]*(?:__[A-Za-z0-9_*.-]+)*)(?:\((?P<spec>.+)\))?$")


class SyntaxeDesRegles(unittest.TestCase):
    def test_chaque_regle_a_une_forme_valide(self):
        for liste in ("allow", "ask", "deny"):
            for regle in PERMISSIONS[liste]:
                with self.subTest(liste=liste, regle=regle):
                    self.assertRegex(regle, RE_REGLE)

    def test_aucune_regle_mcp_avec_parentheses(self):
        # Claude Code saute au chargement toute règle mcp__ qui a des parenthèses.
        for liste in ("allow", "ask", "deny"):
            for regle in PERMISSIONS[liste]:
                if regle.startswith("mcp__"):
                    self.assertNotIn("(", regle, regle)

    def test_aucun_joker_non_ancre_en_allow(self):
        # « * », « mcp__* » en allow sont ignorés : ils n'approuvent rien.
        for regle in PERMISSIONS["allow"]:
            outil = RE_REGLE.match(regle).group("outil")
            if "*" in outil:
                self.assertRegex(outil, r"^mcp__[A-Za-z0-9_-]+__", regle)

    def test_joker_final_precede_d_un_espace_en_allow(self):
        # « Bash(git diff *) » exige un espace : « Bash(git diff*) » accepterait aussi « git diff-tree ». En allow,
        # une règle sans espace laisserait passer plus. En ask ou en deny, elle demande ou refuse plus : le côté sûr
        # (chapitre 17, section 17.2), d'où « Bash(py*unittest*) » en ask.
        for regle in PERMISSIONS["allow"]:
            spec = RE_REGLE.match(regle).group("spec") or ""
            if regle.startswith("Bash(") and spec.endswith("*"):
                self.assertTrue(spec.endswith(" *"), regle)

    def test_git_diff_et_log_en_formes_exactes_seulement_en_allow(self):
        # Chapitre 17 : « git diff --no-index » lit hors du dépôt, « --output= » écrit un fichier.
        for regle in PERMISSIONS["allow"]:
            if regle.startswith(("Bash(git diff", "Bash(git log")):
                self.assertNotIn("*", regle, regle)
        self.assertIn("Bash(git diff *)", PERMISSIONS["ask"])
        self.assertIn("Bash(git log *)", PERMISSIONS["ask"])

    def test_aucun_allow_ne_lance_un_fichier_que_claude_peut_ecrire(self):
        # Chapitre 17 : en allow, la découverte des tests lancerait sans vous un code que Claude vient d'écrire.
        lanceurs = re.compile(r"\b(?:unittest|pytest|npm (?:run|test)|node|py(?:thon3?)?(?:\s+-\w+)*\s+[\w./-]+\.py)\b")
        for regle in PERMISSIONS["allow"]:
            if regle.startswith(("Bash(", "PowerShell(")):
                self.assertNotRegex(regle, lanceurs, regle)
        self.assertIn("Bash(py*unittest*)", PERMISSIONS["ask"])

    def test_ce_qui_s_execute_sans_demande_est_protege_en_ecriture(self):
        # Chapitre 17, section 17.2 : un hook, une recette just ou la porte de commit lance sans demande les fichiers
        # qu'il nomme. Un deny sur Edit protège ce qui les déclare ou les appelle, et les recettes restent en ask.
        # Lot G2 : ce fichier même, qui porte ces règles, le mod d'exemple et `.git/config`, où core.hooksPath déclare la
        # porte de commit (tableau 17.3, section 17.2).
        for regle in ("Edit(./.claude/settings.json)", "Edit(./.claude/hooks/**)", "Edit(./.claude/settings.local.json)",
                      "Edit(./exemples/mcp-serveur/**)", "Edit(./.mcp.json)", "Edit(./exemples/mod/bilan-outils/**)",
                      "Edit(./justfile)", "Edit(./.githooks/**)", "Edit(./.git/config)"):
            self.assertIn(regle, PERMISSIONS["deny"])
        self.assertIn("Bash(just *)", PERMISSIONS["ask"])
        for regle in PERMISSIONS["allow"]:
            self.assertFalse(regle.startswith(("Bash(just", "Bash(make", "Bash(sh .githooks")), regle)

    def test_secrets_proteges_en_lecture_et_ecriture(self):
        self.assertIn("Read(./.env)", PERMISSIONS["deny"])
        self.assertIn("Read(./secrets/**)", PERMISSIONS["deny"])
        self.assertIn("Edit(./secrets/**)", PERMISSIONS["deny"])
        self.assertIn("./secrets", REGLAGES["sandbox"]["filesystem"]["denyRead"])


class Coherence(unittest.TestCase):
    def test_l_outil_mcp_autorise_est_celui_du_serveur_d_exemple(self):
        configuration = json.loads((EXEMPLES / "mcp-consommateur" / "exemple.mcp.json").read_text(encoding="utf-8"))
        serveurs = configuration["mcpServers"]
        regles_mcp = [r for r in PERMISSIONS["allow"] if r.startswith("mcp__")]
        for regle in regles_mcp:
            _, serveur, outil = regle.split("__", 2)
            self.assertIn(serveur, serveurs)
            self.assertIn(f'"name": "{outil}"', (EXEMPLES / "mcp-serveur" / "serveur_catalogue.py").read_text(encoding="utf-8"))

    def test_bac_a_sable_sans_echappatoire(self):
        self.assertTrue(REGLAGES["sandbox"]["enabled"])
        self.assertFalse(REGLAGES["sandbox"]["allowUnsandboxedCommands"])
        self.assertFalse(REGLAGES["sandbox"]["autoAllowBashIfSandboxed"])  # sinon le shell confiné passe sans demande
        self.assertEqual(REGLAGES["sandbox"]["network"]["allowedDomains"], [])


if __name__ == "__main__":
    unittest.main()
