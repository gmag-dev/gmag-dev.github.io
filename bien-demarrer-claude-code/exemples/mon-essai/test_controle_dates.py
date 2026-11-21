# SPDX-FileCopyrightText: 2026 Gabrielle Magnan
# SPDX-License-Identifier: MIT
"""Tests du contrôle de référence : chaque cas faux doit échouer, avant que l'on croie le contrôle vert.

Depuis le dossier d'essai : python -I -B -m unittest -v
"""
import contextlib
import io
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import controle_dates as cd  # noqa: E402

DOC = Path(__file__).resolve().parent / "documents"
JUSTE = {
    "001": "La carte expire le 31 décembre 2026. La cotisation coûte 12,00 euros. Payez-la avant le 31 janvier 2027. "
           "Une carte perdue coûte 3 euros.",
    "002": "Dès le 4 janvier 2027, le repas coûte 3,45 euros au lieu de 3,20 euros. Le tarif réduit coûte 1,10 euro. "
           "Envoyez le dossier avant le 18 décembre 2026.",
    "003": "La facture fait 186,60 euros. Trois prélèvements de 62,20 euros : le 15 janvier 2027, "
           "le 15 février 2027 et le 15 mars 2027. Un rejet coûte 7,50 euros.",
}


class Controle(unittest.TestCase):
    def dossier(self, explications):
        d = tempfile.TemporaryDirectory()
        self.addCleanup(d.cleanup)
        racine = Path(d.name)
        (racine / "documents").mkdir()
        (racine / "explications").mkdir()
        for p in DOC.glob("ESSAI-C-*.txt"):
            (racine / "documents" / p.name).write_text(p.read_text(encoding="utf-8"), encoding="utf-8")
        for num, texte in explications.items():
            (racine / "explications" / f"ESSAI-E-{num}.md").write_text(texte, encoding="utf-8")
        return racine

    def lancer(self, racine, argv):
        out = io.StringIO()
        code = cd.main(argv, racine=racine, sortie=out)
        return code, out.getvalue()

    def test_trois_documents_inventes(self):
        noms = sorted(p.name for p in DOC.glob("*.txt"))
        self.assertEqual(noms, ["ESSAI-C-001.txt", "ESSAI-C-002.txt", "ESSAI-C-003.txt"])
        for p in DOC.glob("*.txt"):
            texte = p.read_text(encoding="utf-8")
            self.assertTrue(texte.startswith("Document fictif ESSAI-C-"), p.name)
            self.assertIn("(organisme fictif)", texte)

    def test_explications_justes_passent(self):
        code, out = self.lancer(self.dossier(JUSTE), ["--tous"])
        self.assertEqual(code, 0, out)
        self.assertIn("3 explications contrôlées, 0 en échec", out)

    def test_date_perdue_echoue(self):
        faux = dict(JUSTE, **{"001": JUSTE["001"].replace(" avant le 31 janvier 2027", "")})
        code, out = self.lancer(self.dossier(faux), ["ESSAI-C-001"])
        self.assertEqual(code, 1)
        self.assertIn("date du document absente de l'explication : 31 janvier 2027", out)

    def test_montant_ajoute_echoue(self):
        faux = dict(JUSTE, **{"002": JUSTE["002"] + " Prévoyez 50,00 euros."})
        code, out = self.lancer(self.dossier(faux), ["ESSAI-C-002"])
        self.assertEqual(code, 1)
        self.assertIn("montant ajouté, absent du document : 50,00 euros", out)

    def test_date_en_chiffres_comparee_a_la_date_en_lettres(self):
        faux = dict(JUSTE, **{"003": JUSTE["003"].replace("le 15 février 2027 et ", "")})
        code, out = self.lancer(self.dossier(faux), ["ESSAI-C-003"])
        self.assertEqual(code, 1)
        self.assertIn("15 février 2027", out)

    def test_explication_absente_echoue(self):
        code, out = self.lancer(self.dossier({}), ["--tous"])
        self.assertEqual(code, 1)
        self.assertEqual(out.count("explication absente"), 3)

    def test_date_sans_annee_refusee_meme_juste(self):
        """Une explication juste, mais qui écrit une date sans son année, échoue quand même : c'est une limite du
        contrôle, écrite dans le README (« Les limites »), pas une erreur de l'explication."""
        juste = dict(JUSTE, **{"001": JUSTE["001"].replace("avant le 31 janvier 2027", "avant le 31 janvier")})
        code, out = self.lancer(self.dossier(juste), ["ESSAI-C-001"])
        self.assertEqual(code, 1, out)
        self.assertIn("date du document absente de l'explication : 31 janvier 2027", out)

    def test_entrees_impossibles_code_2(self):
        """Une date impossible, un fichier qui n'est pas en UTF-8 ou un dossier documents/ vide arrêtent le contrôle
        en code 2 : ce n'est pas un verdict sur l'explication."""
        date = self.dossier(dict(JUSTE, **{"001": JUSTE["001"] + " Rappel le 01/13/2027."}))
        utf16 = self.dossier({})
        (utf16 / "explications" / "ESSAI-E-001.md").write_text(JUSTE["001"], encoding="utf-16")
        vide = self.dossier({})
        for p in (vide / "documents").glob("*.txt"):
            p.unlink()
        for titre, racine, argv in (("date impossible", date, ["ESSAI-C-001"]),
                                    ("explication en UTF-16", utf16, ["ESSAI-C-001"]),
                                    ("documents/ vide", vide, ["--tous"])):
            with self.subTest(titre):
                erreur = io.StringIO()
                with contextlib.redirect_stderr(erreur):
                    code, out = self.lancer(racine, argv)
                self.assertEqual(code, 2, out + erreur.getvalue())

    def test_usage(self):
        code, _ = self.lancer(self.dossier(JUSTE), ["PASS-C-003"])
        self.assertEqual(code, 2)


if __name__ == "__main__":
    unittest.main()
