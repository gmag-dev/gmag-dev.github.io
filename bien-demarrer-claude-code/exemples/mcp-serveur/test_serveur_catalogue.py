# SPDX-FileCopyrightText: 2026 Gabrielle Magnan
# SPDX-License-Identifier: MIT
"""Tests du serveur MCP d'exemple : la poignée de main est jouée par un vrai sous-processus.

Lancer : python -I -B -m unittest discover -s <dossier exemples> -p "test_*.py"
"""

from __future__ import annotations

import importlib.util
import json
import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ICI = Path(__file__).resolve().parent
SCRIPT = ICI / "serveur_catalogue.py"

META_MODERNE = {
    "io.modelcontextprotocol/protocolVersion": "2026-07-28",
    "io.modelcontextprotocol/clientCapabilities": {},
    "io.modelcontextprotocol/clientInfo": {"name": "test-unitaire", "version": "0.0.1"},
}


def charger_module():
    """Charge le serveur par son chemin (le dossier n'est pas un paquet importable)."""
    spec = importlib.util.spec_from_file_location("serveur_catalogue", SCRIPT)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def dialoguer(messages: list, *arguments: str) -> list[dict]:
    """Envoie des messages au serveur lancé en sous-processus, ferme stdin, lit les réponses."""
    entree = "".join(
        (m if isinstance(m, str) else json.dumps(m)) + "\n" for m in messages
    ).encode("utf-8")
    processus = subprocess.run(
        [sys.executable, "-I", "-B", str(SCRIPT), *arguments],
        input=entree,
        capture_output=True,
        timeout=30,
        check=False,
    )
    # Les journaux de stderr sont en UTF-8, comme le protocole, quel que soit le système.
    journal = processus.stderr.decode("utf-8")
    assert processus.returncode == 0, journal
    lignes = processus.stdout.decode("utf-8").splitlines()
    return [json.loads(ligne) for ligne in lignes if ligne.strip()]


def requete(ident: int, methode: str, params: dict | None = None) -> dict:
    message = {"jsonrpc": "2.0", "id": ident, "method": methode}
    if params is not None:
        message["params"] = params
    return message


INITIALIZE = requete(
    1,
    "initialize",
    {
        "protocolVersion": "2025-11-25",
        "capabilities": {},
        "clientInfo": {"name": "test-unitaire", "version": "0.0.1"},
    },
)
INITIALIZED = {"jsonrpc": "2.0", "method": "notifications/initialized"}


class PoigneeDeMainHeritee(unittest.TestCase):
    """L'ère à poignée de main : initialize, initialized, tools/list, tools/call."""

    def test_sequence_complete(self):
        reponses = dialoguer(
            [
                INITIALIZE,
                INITIALIZED,
                requete(2, "tools/list"),
                requete(3, "tools/call", {"name": "lire_fiche", "arguments": {"chemin": "index.json"}}),
            ]
        )
        # La notification ne reçoit pas de réponse : trois réponses pour trois requêtes.
        self.assertEqual([r["id"] for r in reponses], [1, 2, 3])

        init = reponses[0]["result"]
        self.assertEqual(init["protocolVersion"], "2025-11-25")
        self.assertIn("tools", init["capabilities"])
        self.assertEqual(init["serverInfo"]["name"], "catalogue-synthetique")

        outils = reponses[1]["result"]["tools"]
        self.assertEqual([o["name"] for o in outils], ["lire_fiche"])
        self.assertTrue(outils[0]["annotations"]["readOnlyHint"])
        self.assertEqual(outils[0]["inputSchema"]["type"], "object")

        appel = reponses[2]["result"]
        self.assertFalse(appel["isError"])
        catalogue = json.loads(appel["content"][0]["text"])
        self.assertEqual([p["id"] for p in catalogue["projets"]], ["FICHE-001", "FICHE-002", "FICHE-003"])

    def test_version_inconnue_negociee_vers_la_plus_recente(self):
        message = json.loads(json.dumps(INITIALIZE))
        message["params"]["protocolVersion"] = "1900-01-01"
        (reponse,) = dialoguer([message])
        self.assertEqual(reponse["result"]["protocolVersion"], "2025-11-25")

    def test_requete_avant_initialize_refusee(self):
        (reponse,) = dialoguer([requete(7, "tools/list")], "--eres", "heritee")
        self.assertEqual(reponse["error"]["code"], -32600)

    def test_serveur_herite_seulement_ignore_server_discover(self):
        # Le client à deux ères s'appuie sur cette erreur pour revenir à initialize.
        (reponse,) = dialoguer([requete(1, "server/discover", {"_meta": META_MODERNE})], "--eres", "heritee")
        self.assertEqual(reponse["error"]["code"], -32601)


class EreSansEtat(unittest.TestCase):
    """L'ère sans état (révision 2026-07-28) : la version voyage dans _meta."""

    def test_discover_puis_outils(self):
        reponses = dialoguer(
            [
                requete(1, "server/discover", {"_meta": META_MODERNE}),
                requete(2, "tools/list", {"_meta": META_MODERNE}),
                requete(
                    3,
                    "tools/call",
                    {"_meta": META_MODERNE, "name": "lire_fiche", "arguments": {"chemin": "fiches/FICHE-002.md"}},
                ),
            ]
        )
        decouverte, liste, appel = (r["result"] for r in reponses)
        self.assertEqual(decouverte["resultType"], "complete")
        self.assertIn("2026-07-28", decouverte["supportedVersions"])
        self.assertIn("tools", decouverte["capabilities"])
        self.assertEqual(liste["resultType"], "complete")
        self.assertIn("ttlMs", liste)
        self.assertIn(liste["cacheScope"], ("public", "private"))
        self.assertEqual(appel["resultType"], "complete")
        self.assertIn("FICHE-002", appel["content"][0]["text"])
        self.assertEqual(
            appel["_meta"]["io.modelcontextprotocol/serverInfo"]["name"], "catalogue-synthetique"
        )

    def test_version_non_prise_en_charge(self):
        meta = dict(META_MODERNE, **{"io.modelcontextprotocol/protocolVersion": "1900-01-01"})
        (reponse,) = dialoguer([requete(1, "tools/list", {"_meta": meta})])
        self.assertEqual(reponse["error"]["code"], -32022)
        self.assertEqual(reponse["error"]["data"]["requested"], "1900-01-01")
        self.assertIn("2026-07-28", reponse["error"]["data"]["supported"])

    def test_meta_incomplet(self):
        meta = {"io.modelcontextprotocol/protocolVersion": "2026-07-28"}
        (reponse,) = dialoguer([requete(1, "tools/list", {"_meta": meta})])
        self.assertEqual(reponse["error"]["code"], -32602)

    def test_serveur_moderne_seulement_refuse_initialize_en_nommant_ses_versions(self):
        (reponse,) = dialoguer([INITIALIZE], "--eres", "moderne")
        self.assertIn("2026-07-28", reponse["error"]["message"])


class Refus(unittest.TestCase):
    """Les chemins hors racine sont refusés, en erreur d'exécution d'outil (isError)."""

    def appeler(self, arguments: dict) -> dict:
        reponses = dialoguer(
            [INITIALIZE, INITIALIZED, requete(2, "tools/call", {"name": "lire_fiche", "arguments": arguments})]
        )
        return reponses[-1]

    def verifier_refus(self, chemin: str) -> None:
        resultat = self.appeler({"chemin": chemin})["result"]
        self.assertTrue(resultat["isError"], chemin)
        self.assertTrue(resultat["content"][0]["text"].startswith("Refusé"), chemin)

    def test_remontee(self):
        self.verifier_refus("../serveur_catalogue.py")
        self.verifier_refus("fiches/../../serveur_catalogue.py")
        self.verifier_refus("fiches\\..\\..\\serveur_catalogue.py")

    def test_chemin_absolu(self):
        self.verifier_refus(str(SCRIPT))
        self.verifier_refus("/etc/hosts")

    def test_extension_interdite(self):
        self.verifier_refus("fiches/FICHE-001.txt")

    def test_fichier_absent(self):
        self.verifier_refus("fiches/FICHE-999.md")

    def test_argument_inattendu(self):
        resultat = self.appeler({"chemin": "index.json", "mode": "ecriture"})["result"]
        self.assertTrue(resultat["isError"])

    def test_outil_inconnu_est_une_erreur_de_protocole(self):
        reponses = dialoguer(
            [INITIALIZE, INITIALIZED, requete(2, "tools/call", {"name": "ecrire_fiche", "arguments": {}})]
        )
        self.assertEqual(reponses[-1]["error"]["code"], -32602)

    def test_lien_symbolique_sortant(self):
        module = charger_module()
        with tempfile.TemporaryDirectory() as dossier:
            racine = Path(dossier) / "racine"
            racine.mkdir()
            dehors = Path(dossier) / "secret.md"
            dehors.write_text("hors racine", encoding="utf-8")
            try:
                os.symlink(dehors, racine / "lien.md")
            except (OSError, NotImplementedError):
                self.skipTest("création de lien symbolique non permise sur ce poste")
            with self.assertRaises(module.CheminRefuse):
                module.Serveur(racine).lire("lien.md")


class Transport(unittest.TestCase):
    """Les règles du transport stdio : une ligne par message, rien d'autre sur stdout."""

    def test_json_illisible(self):
        (reponse,) = dialoguer(["{pas du json"])
        self.assertEqual(reponse["error"]["code"], -32700)

    def test_lot_refuse(self):
        (reponse,) = dialoguer([json.dumps([requete(1, "tools/list")])])
        self.assertEqual(reponse["error"]["code"], -32600)

    def test_reponse_sur_une_seule_ligne_meme_avec_retours_a_la_ligne(self):
        reponses = dialoguer(
            [INITIALIZE, requete(2, "tools/call", {"name": "lire_fiche", "arguments": {"chemin": "fiches/FICHE-001.md"}})]
        )
        self.assertIn("\n", reponses[-1]["result"]["content"][0]["text"])


if __name__ == "__main__":
    unittest.main()
