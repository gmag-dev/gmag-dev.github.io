# SPDX-FileCopyrightText: 2026 Gabrielle Magnan
# SPDX-License-Identifier: MIT
"""Tests de forme du sous-agent d'exemple : frontmatter valide, moindre privilège, rapport."""

from __future__ import annotations

import re
import unittest
from pathlib import Path

AGENT = Path(__file__).resolve().parent / "relecteur-adversarial.md"

# Valeurs documentées pour le champ « model » (page Subagents, lue le 2026-11-02),
# en plus d'un identifiant complet de modèle.
MODELES_ALIAS = {"sonnet", "opus", "haiku", "fable", "inherit"}
# Outils qui ne peuvent ni écrire, ni exécuter, ni sortir sur le réseau.
OUTILS_LECTURE_SEULE = {"Read", "Grep", "Glob"}


def lire_agent() -> tuple[dict[str, str], str]:
    texte = AGENT.read_text(encoding="utf-8")
    bloc = re.match(r"^---\n(.*?)\n---\n(.*)$", texte, re.DOTALL)
    assert bloc, "frontmatter absent"
    meta = {}
    for ligne in bloc.group(1).splitlines():
        cle, _, valeur = ligne.partition(":")
        meta[cle.strip()] = valeur.strip()
    return meta, bloc.group(2)


class FormeDeLAgent(unittest.TestCase):
    def setUp(self):
        self.meta, self.corps = lire_agent()

    def test_champs_requis(self):
        # Seuls name et description sont obligatoires.
        self.assertTrue(self.meta.get("name"))
        self.assertTrue(self.meta.get("description"))

    def test_nom(self):
        nom = self.meta["name"]
        self.assertLessEqual(len(nom), 256)
        self.assertNotIn(":", nom)
        self.assertEqual(nom, AGENT.stem)

    def test_moindre_privilege(self):
        outils = {o.strip() for o in self.meta["tools"].split(",")}
        self.assertTrue(outils, "tools vide : l'agent hériterait de tous les outils")
        self.assertLessEqual(outils, OUTILS_LECTURE_SEULE, f"outils en trop : {outils - OUTILS_LECTURE_SEULE}")
        # Sans l'outil Agent, il ne peut pas lancer de sous-agent à son tour.
        self.assertNotIn("Agent", outils)

    def test_modele(self):
        modele = self.meta["model"]
        self.assertTrue(modele in MODELES_ALIAS or modele.startswith("claude-"), modele)

    def test_pas_de_plafond_de_tours(self):
        # Un plafond maxTurns coupe un long travail avant son rapport : l'arrêt passe par le brief.
        self.assertNotIn("maxTurns", self.meta)

    def test_le_corps_se_suffit_et_fixe_un_rapport(self):
        self.assertIn("## Format du rapport", self.corps)
        self.assertIn("## Verdict", self.corps)
        # Le corps ne doit pas renvoyer à une conversation que l'agent ne voit pas.
        for expression in ("comme dit plus haut", "voir ci-dessus dans la conversation"):
            self.assertNotIn(expression, self.corps.lower())


if __name__ == "__main__":
    unittest.main()
