#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 Gabrielle Magnan
# SPDX-License-Identifier: MIT
"""Ligne d'état pour Claude Code : lit le JSON de session sur stdin, affiche une ligne.

Exemple de sortie :
    Opus | projet | contexte 8 % ok | 5 h 23 % ok (remise 14:00) | 7 j 41 % ok

- Chaque niveau s'écrit avec un MOT (ok, attention, critique), jamais avec une couleur seule.
- Les champs absents ou nuls sont omis ou affichés « — » : la doc prévient que
  ``rate_limits`` n'existe que pour certains abonnements et seulement après la première
  réponse, et que ``context_window.used_percentage`` peut être ``null`` en début de session.
- Le script ne plante jamais : en cas de souci, il affiche une ligne minimale.

Options : ``--couleur`` ajoute des codes ANSI (ignorés si ``NO_COLOR`` est défini).
"""

from __future__ import annotations

import json
import os
import sys
import time
from pathlib import PurePath
from typing import Any

# valeurs d’exemple, à calibrer
SEUIL_ATTENTION = 70.0
SEUIL_CRITIQUE = 90.0
COULEURS = {"ok": "\033[32m", "attention": "\033[33m", "critique": "\033[31m"}
FIN_COULEUR = "\033[0m"


def niveau(pourcentage: float) -> str:
    if pourcentage >= SEUIL_CRITIQUE:
        return "critique"
    if pourcentage >= SEUIL_ATTENTION:
        return "attention"
    return "ok"


def nombre(valeur: Any) -> float | None:
    if isinstance(valeur, bool) or not isinstance(valeur, (int, float)):
        return None
    return float(valeur)


def format_pourcentage(valeur: float) -> str:
    return f"{valeur:.0f} %"


def segment_jauge(libelle: str, valeur: float, couleur: bool, suffixe: str = "") -> str:
    mot = niveau(valeur)
    texte_mot = f"{COULEURS[mot]}{mot}{FIN_COULEUR}" if couleur else mot
    return f"{libelle} {format_pourcentage(valeur)} {texte_mot}{suffixe}"


def heure_de_remise(epoch: Any, avec_date: bool) -> str:
    secondes = nombre(epoch)
    if secondes is None:
        return ""
    moment = time.localtime(secondes)
    return time.strftime("%d/%m %H:%M" if avec_date else "%H:%M", moment)


def construire(donnees: dict[str, Any], couleur: bool = False) -> str:
    modele = donnees.get("model") or {}
    nom_modele = modele.get("display_name") or modele.get("id") or "Claude"

    espace = donnees.get("workspace") or {}
    dossier = espace.get("current_dir") or donnees.get("cwd") or ""
    morceaux = [str(nom_modele)]
    if dossier:
        morceaux.append(PurePath(str(dossier).replace("\\", "/")).name or str(dossier))

    contexte = nombre((donnees.get("context_window") or {}).get("used_percentage"))
    morceaux.append(segment_jauge("contexte", contexte, couleur) if contexte is not None else "contexte —")

    limites = donnees.get("rate_limits")
    if isinstance(limites, dict):
        for cle, libelle, avec_date in (("five_hour", "5 h", False), ("seven_day", "7 j", True)):
            fenetre = limites.get(cle)
            if not isinstance(fenetre, dict):
                continue  # chaque fenêtre peut manquer indépendamment
            utilise = nombre(fenetre.get("used_percentage"))
            if utilise is None:
                continue
            remise = heure_de_remise(fenetre.get("resets_at"), avec_date)
            morceaux.append(segment_jauge(libelle, utilise, couleur, f" (remise {remise})" if remise else ""))

    return " | ".join(morceaux)


def tronquer(ligne: str, colonnes: str | None) -> str:
    """Claude Code fournit la largeur du terminal dans COLUMNS (pas de tput dans un script)."""
    try:
        largeur = int(colonnes) if colonnes else 0
    except ValueError:
        largeur = 0
    if largeur <= 0 or "\033" in ligne or len(ligne) <= largeur:
        return ligne
    return ligne[: max(largeur - 1, 1)] + "…"


def main(argv: list[str]) -> int:
    couleur = "--couleur" in argv and "NO_COLOR" not in os.environ
    try:
        donnees = json.loads(sys.stdin.buffer.read(1024 * 1024).decode("utf-8"))
        if not isinstance(donnees, dict):
            raise ValueError("objet JSON attendu")
        ligne = construire(donnees, couleur)
    except Exception:  # une ligne d'état ne doit jamais casser l'interface
        ligne = "Claude | état indisponible"
    sys.stdout.reconfigure(encoding="utf-8", newline="\n")
    print(tronquer(ligne, os.environ.get("COLUMNS")))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
