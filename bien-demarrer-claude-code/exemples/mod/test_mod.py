# SPDX-FileCopyrightText: 2026 Gabrielle Magnan
# SPDX-License-Identifier: MIT
"""Contrôle statique du mod d'exemple, en Python : il ne remplace pas `claude plugin test`.

Il vérifie la structure documentée (plugin.json, hooks/hooks.json et sa clé « modules »,
export de register) et les règles d'analyse statique de la page « Create a mod », puis la
liste des méthodes appelées, qui doit rester dans la liste blanche du mod.
"""

from __future__ import annotations

import json
import re
import unittest
from pathlib import Path

MOD = Path(__file__).resolve().parent / "bilan-outils"
CODE = (MOD / "hooks" / "register.js").read_text(encoding="utf-8")

# Méthodes que ce mod a le droit d'appeler.
LISTE_BLANCHE = {"$.command.register"}
# Méthodes qui font sortir quelque chose du mod (réseau, processus, modèle, autres sessions…).
SORTIES = ("$.http", "$.process", "$.model", "$.mcp.call", "$.env.set", "$.prompt.submit", "$.session.send")


def sans_commentaires(code: str) -> str:
    return re.sub(r"//[^\n]*", "", code)


class Structure(unittest.TestCase):
    def test_manifeste(self):
        manifeste = json.loads((MOD / ".claude-plugin" / "plugin.json").read_text(encoding="utf-8"))
        self.assertEqual(manifeste["name"], MOD.name)
        # Un nom qui ressemble à ceux d'Anthropic (« claude-… ») échoue à la validation.
        self.assertFalse(manifeste["name"].startswith("claude"))
        self.assertRegex(manifeste["version"], r"^\d+\.\d+\.\d+$")

    def test_hooks_json_pointe_vers_le_module(self):
        hooks = json.loads((MOD / "hooks" / "hooks.json").read_text(encoding="utf-8"))
        # C'est la clé « modules » qui fait d'un plugin un mod.
        self.assertIsInstance(hooks["modules"], list)
        for chemin in hooks["modules"]:
            self.assertTrue((MOD / "hooks" / chemin).is_file(), chemin)

    def test_export_register(self):
        self.assertRegex(CODE, r"export function register\(on\)")

    def test_un_fichier_de_test_pour_claude_plugin_test(self):
        tests = list((MOD / "tests").glob("*.test.ts"))
        self.assertTrue(tests)
        for fichier in tests:
            texte = fichier.read_text(encoding="utf-8")
            self.assertIn("from 'claude-code/testing'", texte)
            self.assertIn("test(", texte)


class ReglesDAnalyseStatique(unittest.TestCase):
    code = sans_commentaires(CODE)

    def test_noms_d_evenements_litteraux(self):
        appels = re.findall(r"\bon\(\s*([^,\s]+)", self.code)
        self.assertTrue(appels)
        for premier in appels:
            self.assertRegex(premier, r"^'[a-z]+\.[a-zA-Z]+'$", premier)

    def test_pas_de_dollar_dans_une_variable(self):
        self.assertNotRegex(self.code, r"=\s*\$\s*[;\n]")
        self.assertNotRegex(self.code, r"=\s*\$\.[a-z]+\s*[;\n]")
        self.assertNotRegex(self.code, r"\{[^}]*\}\s*=\s*\$")

    def test_modules_es_seulement(self):
        self.assertNotIn("require(", self.code)
        self.assertNotRegex(self.code, r"\bimport\s*\(")

    def test_appels_dans_la_liste_blanche(self):
        appels = set(re.findall(r"\$\.[a-z]+\.[a-zA-Z]+", self.code))
        self.assertLessEqual(appels, LISTE_BLANCHE, appels - LISTE_BLANCHE)
        for sortie in SORTIES:
            self.assertNotIn(sortie, self.code, sortie)


if __name__ == "__main__":
    unittest.main()
