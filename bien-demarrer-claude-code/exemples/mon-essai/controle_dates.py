# SPDX-FileCopyrightText: 2026 Gabrielle Magnan
# SPDX-License-Identifier: MIT
"""Contrôle de référence du dossier d'essai : aucune date ni aucun montant ne se perd ni ne s'ajoute.

Compare chaque document de documents/ (ESSAI-C-nnn.txt) à son explication dans explications/
(ESSAI-E-nnn.md) : chaque date et chaque montant du document doit figurer dans l'explication,
et l'explication n'en ajoute aucun. Les dates s'écrivent en lettres (« 1er janvier 2027 ») ou en
chiffres (« 15/01/2027 ») : les deux formes se comparent entre elles.

Usage, depuis le dossier d'essai :
  python -I -B controle_dates.py ESSAI-C-001     un seul document
  python -I -B controle_dates.py --tous          tous les documents
Code de sortie : 0 si tout passe, 1 s'il y a au moins un échec, 2 sur une erreur d'usage ou une entrée illisible.
Bibliothèque standard seulement. Aucune donnée réelle : les documents sont inventés.
"""
import re
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août",
        "septembre", "octobre", "novembre", "décembre"]
DATE_LETTRES = re.compile(r"\b(1er|\d{1,2})\s+(" + "|".join(MOIS) + r")\s+(\d{4})\b", re.I)
DATE_CHIFFRES = re.compile(r"\b(\d{1,2})/(\d{1,2})/(\d{4})\b")
MONTANT = re.compile(r"\b(\d{1,3}(?:[   ]\d{3})*,\d{2})\s*(?:euros?|€)", re.I)


class EntreeImpossible(Exception):
    """Une entrée que le contrôle ne peut pas lire : ce n'est pas un verdict sur l'explication."""


def extraire(texte):
    """Les dates (jour, mois, année) et les montants (en centimes) d'un texte. Une date impossible lève EntreeImpossible."""
    dates = set()
    for jour, mois, annee in DATE_LETTRES.findall(texte):
        if not 1 <= (1 if jour.lower() == "1er" else int(jour)) <= 31:
            raise EntreeImpossible(f"date impossible, « {jour} {mois} {annee} » : un jour va de 1 à 31")
        dates.add((1 if jour.lower() == "1er" else int(jour), MOIS.index(mois.lower()) + 1, int(annee)))
    for jour, mois, annee in DATE_CHIFFRES.findall(texte):
        if not (1 <= int(mois) <= 12 and 1 <= int(jour) <= 31):
            raise EntreeImpossible(f"date impossible, « {jour}/{mois}/{annee} » : un mois va de 1 à 12, un jour de 1 à 31")
        dates.add((int(jour), int(mois), int(annee)))
    montants = {int(re.sub(r"\D", "", m)) for m in MONTANT.findall(texte)}
    return dates, montants


def ecrire_date(d):
    jour, mois, annee = d
    return f"{'1er' if jour == 1 else jour} {MOIS[mois - 1]} {annee}"


def ecrire_montant(c):
    return f"{c // 100},{c % 100:02d} euros"


def lire(chemin):
    """Le texte d'un fichier enregistré en UTF-8. Un autre encodage lève EntreeImpossible."""
    try:
        return chemin.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        raise EntreeImpossible(f"{chemin.parent.name}/{chemin.name} n'est pas enregistré en UTF-8 : "
                               "enregistrez-le en UTF-8, puis relancez") from None


def controler(racine, ident):
    """La liste des écarts entre le document ident (ESSAI-C-nnn) et son explication."""
    numero = ident.rsplit("-", 1)[-1]
    doc = Path(racine) / "documents" / f"ESSAI-C-{numero}.txt"
    exp = Path(racine) / "explications" / f"ESSAI-E-{numero}.md"
    if not doc.is_file():
        return [f"document introuvable : documents/{doc.name}"]
    if not exp.is_file():
        return [f"explication absente : explications/{exp.name}"]
    d_doc, m_doc = extraire(lire(doc))
    d_exp, m_exp = extraire(lire(exp))
    ecarts = [f"date du document absente de l'explication : {ecrire_date(d)}" for d in sorted(d_doc - d_exp)]
    ecarts += [f"date ajoutée, absente du document : {ecrire_date(d)}" for d in sorted(d_exp - d_doc)]
    ecarts += [f"montant du document absent de l'explication : {ecrire_montant(m)}" for m in sorted(m_doc - m_exp)]
    ecarts += [f"montant ajouté, absent du document : {ecrire_montant(m)}" for m in sorted(m_exp - m_doc)]
    return ecarts


def main(argv=None, racine=ICI, sortie=None):
    sortie = sortie or sys.stdout
    argv = sys.argv[1:] if argv is None else argv
    if argv == ["--tous"]:
        idents = sorted(p.stem for p in (Path(racine) / "documents").glob("ESSAI-C-*.txt"))
        if not idents:
            print("aucun document ESSAI-C-nnn.txt dans documents/", file=sys.stderr)
            return 2
    elif len(argv) == 1 and re.fullmatch(r"ESSAI-C-\d{3}", argv[0]):
        idents = argv
    else:
        print("usage : python -I -B controle_dates.py ESSAI-C-001 | --tous", file=sys.stderr)
        return 2
    echecs = 0
    for ident in idents:
        try:
            ecarts = controler(racine, ident)
        except EntreeImpossible as e:
            print(f"contrôle impossible : {e}", file=sys.stderr)
            return 2
        nom = ident.replace("-C-", "-E-")
        if ecarts:
            echecs += 1
            for e in ecarts:
                print(f"ÉCHEC  {nom} : {e}", file=sortie)
        else:
            print(f"OK     {nom}", file=sortie)
    pluriel = "s" if len(idents) > 1 else ""
    print(f"{len(idents)} explication{pluriel} contrôlée{pluriel}, {echecs} en échec (code de sortie {1 if echecs else 0})",
          file=sortie)
    return 1 if echecs else 0


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.exit(main())
