> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.4.2 : « Annexe E. Gabarits ».
>
> - Précédent : [Annexe D. La version web](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-d-la-version-web.md)
> - Suivant : [Annexe F. Grille de relecture experte](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-f-grille-de-relecture-experte.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-e-gabarits.html#h-ann-e>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## Annexe E. Gabarits

Cette annexe rassemble les gabarits du guide, à recopier puis à adapter à votre projet. Elle en donne quatre : l’analyse de cause, la définition du fini, la porte de commit et la revue experte. Chaque gabarit est une forme proposée par ce guide, sauf mention d’une source. Les exemples remplis sont ceux de Passerelle 🌉, et leurs identifiants portent le préfixe fictif `PASS-`.

### E.3 L’analyse de cause

Ce formulaire se remplit après un défaut réel : un défaut livré, une session qui a dérapé, un contrôle qui n’a rien vu. Il suit la culture du retour d’expérience sans recherche de coupable, où l’on cherche les causes et non les fautes, et où chaque leçon devient une action suivie [\[120\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sre-postmortem-culture). Il sépare trois choses qu’on confond souvent : la correction de l’instance, ce cas-ci, la [correction de classe](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-correction-de-classe), tous les cas qui partagent le même mécanisme, et l’oracle qui prouve chacune. La forme est proposée par ce guide, et le [chapitre 16](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#ch16) la développe.

Chez Passerelle 🌉, le cas est celui du [chapitre 16](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#ch16) : un brouillon a perdu un délai, et le contrôle est resté vert. Rien n’est parti : aucun brouillon ne sert sans la relecture d’Odile. L’exemple est inventé, comme tout le projet.

**Tableau :** Le formulaire d’analyse de cause, avec l’exemple fictif du [chapitre 16](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#ch16).

| Rubrique | Ce qu’on y écrit | Exemple fictif |
| --- | --- | --- |
| Constat | le symptôme, la date, la version de Claude Code et la preuve : une sortie, un diff, un journal | dans le brouillon `PASS-B-047`, le délai « sous huitaine » du courrier est devenu « rapidement ». Le contrôle des dates et des montants est resté vert. Sa sortie est jointe |
| Impact | ce qui a été touché, depuis quand, et qui doit le savoir | un brouillon du lot de la vague, aucun envoi, aucune personne n’a raté de délai. Les bénévoles qui relisent doivent le savoir |
| Chaîne des pourquoi | une suite de « pourquoi » qui s’arrête sur un mécanisme, jamais sur une personne | le délai est écrit en toutes lettres dans le courrier. Le contrôle cherche les dates et les délais en chiffres, pas « sous huitaine » ni « dans les quinze jours ». Ses cas de test n’avaient que des chiffres |
| Correction de l’instance | ce qui répare ce cas précis, et le test qui échouait avant et passe après | le brouillon est refait et relu par Odile, et un cas de test sur ce courrier échoue sur l’ancien contrôle |
| Correction de la classe | les autres endroits où le même mécanisme produit le même défaut, et ce qui ferme la classe : une règle, un contrôle, un gabarit | tous les délais écrits en toutes lettres : le contrôle les reconnaît, et chaque forme a son cas de test |
| Oracle de la correction | pour chaque correction, la commande déterministe qui la prouve, sa sortie attendue, et où elle tourne | la suite de tests du contrôle, sur des courriers synthétiques de toutes les formes, à chaque commit. Attendu : aucun échec |
| Capitalisation | la consigne ajoutée, où elle vit (`CLAUDE.md`, skill, hook, intégration continue), et pourquoi à ce niveau | une ligne de `CLAUDE.md` sur les délais en toutes lettres. Le contrôle dans la porte de commit, parce qu’il doit tenir à chaque fois |
| Revérification | la date à laquelle on vérifie que la classe reste fermée, et par quelle commande | à la fin de la vague de courriers, relancer le contrôle sur tous les brouillons |

Une correction de classe sans oracle reste une intention. Avant de fermer le formulaire, lancez chaque oracle et collez sa sortie dans sa rubrique. Une leçon qui doit tenir à chaque fois ne s’arrête pas à une consigne : elle descend jusqu’à un contrôle qui s’exécute ([section 5.5](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#s5-5)).

### E.5 La définition du fini

Dans ce guide, « fini » ne se dit que d’un livrable reçu : c’est le mot de la recette ([section 14.9](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-9)). Une tâche finit sur l’un des mots d’issue du [chapitre 14](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#ch14). La [définition du fini](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-definition-du-fini) d’un projet est la liste des conditions qu’un livrable remplit avant d’être dit fini, et chaque condition nomme le contrôle qui la vérifie. Une condition qu’aucun contrôle ne vérifie le dit : « prose seule ». Ce guide propose cette forme, qui rend visible ce qui ne tient que par l’attention.

Le gabarit à recopier :

```text
# Définition du fini : <projet>

Chaque condition nomme le contrôle qui la vérifie. Le texte du contrôle reste dans son outil.
« prose seule » : aucun contrôle ne la vérifie aujourd'hui.
Un « fini » d'une session précédente n'est pas une preuve : relancer le contrôle.

## Où vivent les demandes et les spécifications
| Question | Fichier |
|---|---|
| Que demande-t-on ? | <le registre des demandes> |
| Que doit faire l'outil ? | <le fichier des exigences> |
| Quand est-ce fini ? | ce fichier |

## Toute modification
| Condition | Vérifiée par |
|---|---|
| <la demande est inscrite, avec ses mots, avant le travail> | prose seule |
| <les tests passent> | <la commande de la porte de commit> |
| <aucun secret, aucune donnée réelle> | <le contrôle de la porte de commit> |
| <le commit nomme ses fichiers, sans contourner les hooks> | prose seule |

## Un livrable
| Condition | Vérifiée par |
|---|---|
| <la recette est faite par la personne qui reçoit> | <sa décision, notée avec ses mots et sa date> |
```

Chez Passerelle 🌉, le livrable est un brouillon remis pour relecture. Sa définition du fini tient en quelques lignes :

**Tableau :** La définition du fini d’un brouillon de Passerelle, exemple fictif.

| Condition | Vérifiée par |
| --- | --- |
| chaque date et chaque montant du courrier est dans le brouillon, et aucun ne s’y ajoute | le contrôle des dates et des montants ([chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#ch5)) |
| aucun numéro qui ressemble à un vrai, seulement des numéros visiblement faux comme `PASS-NIR-0000-0000` | le hook qui bloque ces motifs ([chapitre 7](https://gmag-dev.github.io/bien-demarrer-claude-code/7-ecrire-ses-premieres-extensions.html#ch7)) |
| le brouillon passe à l’oral, lu par un lecteur d’écran | prose seule : Thomas l’écoute et le dit |
| la personne concernée a relu et accepté | prose seule : la décision d’Odile, notée avec sa date |

Le dernier mot n’est pas un contrôle : c’est celui d’Odile. Rien ne remplace sa relecture, et l’outil n’envoie rien.

### E.7 La porte de commit

Une [porte de commit](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-porte-de-commit) est un hook git `pre-commit` qui lance vos contrôles avant chaque commit : s’il sort avec un code différent de zéro, git annule le commit [\[139\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-githooks). Elle arrête le défaut avant qu’il entre dans l’historique. Sa limite est connue : `git commit --no-verify` la saute [\[139\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-githooks). Un contrôle qui doit tenir à coup sûr se double donc d’une étape que le poste ne peut pas sauter, l’intégration continue sur une branche protégée, quand sa définition est elle-même protégée ([section 11.2](https://gmag-dev.github.io/bien-demarrer-claude-code/11-commits-et-collaboration.html#s11-2)).

Ce guide propose de nommer les contrôles dans un gestionnaire de tâches, avec une commande qui les lance tous, puis de faire appeler cette seule commande par la porte. Le contrôle est alors le même à la main, dans la porte et dans l’intégration continue. Voici un exemple avec `just`, pour Passerelle :

```text
# justfile : une commande par contrôle, et une qui les lance tous
check: tests dates

tests:
    python -I -B -m unittest discover -s tests

dates:
    python -I -B controle_dates.py --tous
```

Le contrôle des dates est celui du [chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#ch5), et ses tests vivent dans `tests/`. Sous `python -I`, `sys.path` ne contient ni le dossier du script ni le dossier courant [\[85\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-python-cmdline) : un test de `tests/` qui importe un module de la racine, comme `controle_dates.py`, y ajoute d’abord la racine, par `sys.path.append(str(Path(__file__).resolve().parents[1]))`, comme le test de `dates.py` au [chapitre 11](https://gmag-dev.github.io/bien-demarrer-claude-code/11-commits-et-collaboration.html#ch11). Sans cette ligne, la recette `tests` échoue sur une erreur d’import. Ce gabarit montre l’état du [chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#ch5) : au [chapitre 14](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#ch14), le contrôle devient `controle_fidelite.py`, et la recette `dates` lance alors `python -I -B controle_fidelite.py --tous`. Un contrôle de plus, comme le scanner de secrets du [chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/23-securite-et-propriete-intellectuelle-en-entreprise.html#ch23), s’ajoute par une ligne de plus sous `check`.

Et la porte, dans `.githooks/pre-commit`, qui ferme à la moindre erreur :

```sh
#!/bin/sh
# Porte de commit : un contrôle qui échoue annule le commit.
set -eu
just check
```

Git ne lit ce dossier qu’une fois désigné, par `git config core.hooksPath .githooks` [\[139\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-githooks). Il ignore aussi un hook qui n’est pas exécutable : sous Linux, le commit passe alors, avec un simple avertissement [\[139\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-githooks). Sous macOS et Linux, rendez donc la porte exécutable, par `chmod +x .githooks/pre-commit`. Puis éprouvez-la une fois, sur tout système : faites échouer un contrôle exprès, et constatez que le commit est refusé. Sans gestionnaire de tâches, la porte appelle directement les deux commandes, une par ligne.

> **⚠️ Attention**
>
> Un hook git s’exécute avec vos droits, comme tout script : relisez celui d’un dépôt que vous n’avez pas écrit avant de l’activer. La porte et les recettes lancent aussi, sans rien demander, le contrôle et les tests, des fichiers que Claude peut écrire. Leurs règles, et le fichier de réglages où elles vont, sont au [tableau 17.3](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#tab-17-3) ([section 17.2](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#s17-2)), la source unique de ce guide pour ce qui s’exécute sans demander. Le contrôle et les tests qu’elles lancent restent modifiables par Claude : c’est leur travail. D’où, avant chaque commit, `git status` et la relecture du diff, fichiers nouveaux compris, puisque la porte lance ce que Claude vient d’écrire. Et quand la porte refuse, corrigez la cause. Si Claude propose `--no-verify`, répondez non : sauter la porte, c’est committer le défaut qu’elle vient de trouver ([section 11.2](https://gmag-dev.github.io/bien-demarrer-claude-code/11-commits-et-collaboration.html#s11-2)).

### E.8 La revue experte et le retour d’expérience

Une [revue experte](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-revue-experte) est une relecture qui cherche à réfuter le travail, par une personne ou une session qui ne l’a pas produit et qui lit les artefacts avant les conclusions de l’autrice ([chapitre 16](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#ch16)). Le retour d’expérience vient à la fin d’un lot : il compare ce qui était prévu à ce qui s’est passé, sans recherche de coupable, et chaque leçon devient une action suivie [\[120\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sre-postmortem-culture). Ce guide propose les deux gabarits qui suivent, et la [section 16.6](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#s16-6) dit quand prendre du recul.

Le gabarit d’une revue, à recopier :

```text
# Revue de <l'artefact>, <AAAA-MM-JJ>

Relu par : <la personne ou la session, qui n'a pas produit l'artefact>
Lu d'abord : <les fichiers relus>, avant le résumé de l'autrice
Verdict : <prêt, à reprendre, ou bloqué>

| Id | Gravité | Où | Preuve citée | Correction proposée | Réponse de l'autrice |
|---|---|---|---|---|---|
| 1 | <bloquant, à corriger, ou remarque> | <fichier:ligne> | « <le passage exact> » | <…> | <acceptée, ou refusée avec sa raison> |
```

**Tableau :** Un constat de revue sur un brouillon de Passerelle, exemple fictif.

| Id | Gravité | Où | Preuve citée | Correction proposée | Réponse |
| --- | --- | --- | --- | --- | --- |
| 1 | bloquant | `brouillons/PASS-B-024.md:4` | « répondez dans une semaine », quand le courrier `PASS-C-024` dit « sous huit jours » | reprendre le délai tel quel, et le mettre en gras | acceptée par Inès. Odile relit la nouvelle version et tranche |

Le gabarit d’un retour d’expérience, à recopier :

```text
# Retour d'expérience : <le lot>, <AAAA-MM-JJ>

Ce qui était prévu : <le but, le périmètre, l'échéance>
Ce qui s'est passé : <les faits, avec leurs preuves>
Pourquoi l'écart : <la chaîne des pourquoi, jusqu'à un mécanisme (section E.3)>
Ce qu'on garde : <…>
Ce qu'on change, et où : <CLAUDE.md, skill, hook, contrôle de la porte>
Revérifié le : <AAAA-MM-JJ>, par <la commande>
```

Une revue ne tranche pas à la place de la personne : elle lui donne les constats et leurs preuves. Chez Passerelle, la décision reste celle d’Odile.

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/guide-en-une-page.html#toc)
