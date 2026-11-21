# SPDX-FileCopyrightText: 2026 Gabrielle Magnan
# SPDX-License-Identifier: MIT
"""Tests de forme de la commande slash : invocation manuelle, arguments déclarés et utilisés."""

from __future__ import annotations

import re
import unittest
from pathlib import Path

ICI = Path(__file__).resolve().parent
SKILL = ICI / "relire-message" / "SKILL.md"
ANCIEN = ICI / "ancien-format" / "relire.md"


def lire(chemin: Path) -> tuple[dict[str, str], str]:
    texte = chemin.read_text(encoding="utf-8")
    bloc = re.match(r"^---\n(.*?)\n---\n(.*)$", texte, re.DOTALL)
    assert bloc, f"frontmatter absent dans {chemin.name}"
    meta = {}
    for ligne in bloc.group(1).splitlines():
        cle, _, valeur = ligne.partition(":")
        meta[cle.strip()] = valeur.strip().strip('"')
    return meta, bloc.group(2)


class CommandeEnSkill(unittest.TestCase):
    def setUp(self):
        self.meta, self.corps = lire(SKILL)

    def test_invocation_par_l_utilisateur_seulement(self):
        # true : Claude ne charge pas ce skill de lui-même ; seule la personne tape /relire-message.
        self.assertEqual(self.meta["disable-model-invocation"], "true")
        self.assertEqual(self.meta["name"], SKILL.parent.name)

    def test_chaque_argument_declare_est_utilise(self):
        for nom in self.meta["arguments"].split():
            self.assertIn(f"${nom}", self.corps, nom)

    def test_aucun_argument_utilise_sans_declaration(self):
        declares = set(self.meta["arguments"].split()) | {"ARGUMENTS"}
        utilises = set(re.findall(r"\$([A-Za-z_][A-Za-z0-9_]*)", self.corps))
        self.assertLessEqual(utilises, declares, utilises - declares)

    def test_aide_d_autocompletion(self):
        self.assertTrue(self.meta["argument-hint"].startswith("<fichier-brouillon>"))


class AncienFormat(unittest.TestCase):
    def test_champs_admis(self):
        meta, corps = lire(ANCIEN)
        # Un fichier de .claude/commands/ accepte le même frontmatter qu'un skill, sauf name et paths.
        self.assertNotIn("name", meta)
        self.assertNotIn("paths", meta)
        # $N est l'argument d'indice N, en partant de 0.
        self.assertIn("$0", corps)
        self.assertIn("$1", corps)


if __name__ == "__main__":
    unittest.main()
