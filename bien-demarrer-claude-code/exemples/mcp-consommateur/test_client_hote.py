# SPDX-FileCopyrightText: 2026 Gabrielle Magnan
# SPDX-License-Identifier: MIT
"""Tests du consommateur : le .mcp.json d'exemple et le client qui joue l'hôte."""

from __future__ import annotations

import importlib.util
import json
import os
import re
import subprocess
import sys
import unittest
from pathlib import Path

ICI = Path(__file__).resolve().parent
EXEMPLES = ICI.parent
RACINE_PROJET = EXEMPLES.parent  # le dossier où l'on copierait .mcp.json
CLIENT = ICI / "client_hote.py"
SERVEUR = EXEMPLES / "mcp-serveur" / "serveur_catalogue.py"
CONFIG = ICI / "exemple.mcp.json"


def charger_client():
    spec = importlib.util.spec_from_file_location("client_hote", CLIENT)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def developper(valeur: str, environnement: dict[str, str]) -> str:
    """Développe ${VAR} et ${VAR:-défaut} comme le décrit la page MCP de Claude Code.

    Une variable définie mais vide compte comme définie : ${VAR:-défaut} donne alors "".
    """

    def remplacer(trouve: re.Match) -> str:
        nom, defaut = trouve.group(1), trouve.group(3)
        if nom in environnement:
            return environnement[nom]
        return defaut if defaut is not None else ""

    return re.sub(r"\$\{([A-Za-z_][A-Za-z0-9_]*)(:-([^}]*))?\}", remplacer, valeur)


def lancer_client(*arguments: str, serveur: list[str] | None = None) -> subprocess.CompletedProcess:
    serveur = serveur or [sys.executable, "-I", "-B", str(SERVEUR)]
    return subprocess.run(
        [sys.executable, "-I", "-B", str(CLIENT), *arguments, "--", *serveur],
        capture_output=True,
        timeout=60,
        check=False,
    )


class ConfigurationDeProjet(unittest.TestCase):
    def test_structure_du_mcp_json(self):
        config = json.loads(CONFIG.read_text(encoding="utf-8"))
        serveur = config["mcpServers"]["catalogue"]
        self.assertEqual(serveur["type"], "stdio")
        self.assertIn("-I", serveur["args"])
        # Aucune adresse réseau : un serveur stdio n'écoute sur aucun port.
        self.assertNotIn("url", serveur)

    def test_le_chemin_par_defaut_designe_bien_le_serveur(self):
        config = json.loads(CONFIG.read_text(encoding="utf-8"))
        args = [developper(a, {}) for a in config["mcpServers"]["catalogue"]["args"]]
        self.assertTrue((RACINE_PROJET / args[-1]).is_file(), args[-1])

    def test_variable_definie_mais_vide(self):
        self.assertEqual(developper("${X:-defaut}", {"X": ""}), "")
        self.assertEqual(developper("${X:-defaut}", {}), "defaut")
        self.assertEqual(developper("${X}", {"X": "a"}), "a")

    def test_lancement_comme_le_ferait_l_hote(self):
        """Lance le serveur avec la commande exacte du fichier, depuis la racine du projet."""
        config = json.loads(CONFIG.read_text(encoding="utf-8"))["mcpServers"]["catalogue"]
        environnement = {k: v for k, v in os.environ.items() if k != "CATALOGUE_SERVEUR"}
        # « python » est résolu par l'hôte dans le PATH ; ici on prend l'interpréteur des tests.
        commande = [sys.executable] + [developper(a, environnement) for a in config["args"]]
        module = charger_client()
        with module.ClientStdio(commande, cwd=str(RACINE_PROJET)) as client:
            self.assertEqual(client.connecter(), "moderne")
            noms = [o["name"] for o in client.lister_outils()]
            self.assertEqual(noms, ["lire_fiche"])
            # Le nom que verra Claude Code, et donc celui des règles de permission :
            self.assertEqual(f"mcp__catalogue__{noms[0]}", "mcp__catalogue__lire_fiche")


class DetectionDeLEre(unittest.TestCase):
    def test_serveur_double_reste_moderne(self):
        sortie = lancer_client("--outil", "lire_fiche", "--arguments", '{"chemin": "index.json"}')
        texte = sortie.stdout.decode("utf-8")
        self.assertEqual(sortie.returncode, 0, sortie.stderr.decode("utf-8", "replace"))
        self.assertIn("ère : moderne", texte)
        self.assertIn("FICHE-003", texte)

    def test_serveur_herite_seulement_declenche_le_repli(self):
        serveur = [sys.executable, "-I", "-B", str(SERVEUR), "--eres", "heritee"]
        sortie = lancer_client("--outil", "lire_fiche", "--arguments", '{"chemin": "fiches/FICHE-001.md"}', serveur=serveur)
        texte = sortie.stdout.decode("utf-8")
        self.assertEqual(sortie.returncode, 0, sortie.stderr.decode("utf-8", "replace"))
        self.assertIn("ère : heritee", texte)
        self.assertIn("version : 2025-11-25", texte)
        self.assertIn("FICHE-001", texte)

    def test_client_herite_contre_serveur_moderne_echoue_proprement(self):
        serveur = [sys.executable, "-I", "-B", str(SERVEUR), "--eres", "moderne"]
        sortie = lancer_client("--ere", "heritee", serveur=serveur)
        self.assertEqual(sortie.returncode, 1)
        self.assertIn("échec", sortie.stderr.decode("utf-8"))

    def test_refus_rendu_comme_erreur_d_outil(self):
        sortie = lancer_client("--outil", "lire_fiche", "--arguments", '{"chemin": "../serveur_catalogue.py"}')
        self.assertEqual(sortie.returncode, 1)
        self.assertIn("ERREUR D'OUTIL", sortie.stdout.decode("utf-8"))


if __name__ == "__main__":
    unittest.main()
