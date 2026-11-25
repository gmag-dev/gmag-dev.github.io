> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.2.3 : « 11. Commits et collaboration ».
>
> - Précédent : [10. Sécurité (partie 2 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/10-securite-2.md)
> - Suivant : [12. Diagnostiquer, rendre lisible, reformuler](https://gmag-dev.github.io/bien-demarrer-claude-code/md/12-diagnostiquer-rendre-lisible-reformuler.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-ch11>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## 11. Commits et collaboration

> **🪪 Ce chapitre**
>
> **Pour qui** : toute personne qui enregistre dans [git](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-git) le travail fait avec Claude, seule ou en équipe, et qui veut que l’historique dise vrai.
>
> **Sur quel poste** : n’importe lequel, avec git et Claude Code installés ([chapitre 2](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch2)). La [section 11.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s11-5) suppose une forge, le site qui héberge les [dépôts](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-depot), mais se lit sans en avoir.
>
> **Ce que vous apprenez** : vérifier qu’un message de [commit](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-commit) décrit exactement le [diff](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-diff), et repérer un changement à risque avant de committer. Le chapitre finit par l’exercice de passage du jalon Confirmé : un relecteur qui ne peut que lire, appliqué à votre diff contre une spécification, et vos preuves des chapitres [6](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch6) à [10](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch10) rassemblées dans un fichier.
>
> **Deux chemins** : si vous débutez, lisez tout le chapitre et faites les trois barreaux : comptez 20 à 30 minutes pour l’exercice, puis 45 à 60 minutes pour l’exercice de passage, plus un quart d’heure pour réunir vos preuves. Si vous répondez juste à la question ci-dessous, lisez les encadrés « Quand la règle cède » et « La limite », puis faites le barreau ③.
>
> **Le fil rouge** 🌉 Passerelle : aucun vrai courrier n’entre dans git. Un diff retire le dossier des pièces du fichier `.gitignore` sous un message qui parle d’autre chose, et Amadou l’arrête avant le commit. Samia veut ensuite partager le projet avec une autre association : Bernard et Amadou vérifient tout l’historique avant le premier envoi.
>
> **Où en est Passerelle** : en arrivant, les réglages partagés refusent la lecture des secrets et retirent les outils web, et la triade de l’outil est dessinée ([chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch10)). À la fin du chapitre, l’historique est propre, vérifié sur toute sa longueur avant un premier dépôt distant.

Claude Code sait préparer des [branches](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-branche), écrire des messages de commit et ouvrir des demandes de fusion [\[26\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-overview). La responsabilité de ce qui entre dans l’historique reste la vôtre. Un historique se lit des mois plus tard, par une personne qui cherche quand et pourquoi une ligne a changé, et il part en entier le jour où le dépôt est partagé. Ce chapitre fixe cinq règles : des commits petits et relus, des contrôles jamais contournés, des gestes irréversibles laissés à une personne, une configuration partagée avec soin, et un historique vérifié avant le premier envoi.

> **⏭️ Vous pouvez sauter ce chapitre si…**
>
> Un contrôle lancé avant chaque commit refuse le vôtre : il a trouvé ce qui ressemble à une clé d’accès dans un fichier de test. Claude propose `git commit --no-verify` pour avancer. Que répondez-vous, et que faites-vous ensuite ? Écrivez votre réponse avant d’ouvrir la réponse attendue.
>
> **Voir la réponse attendue**
>
> Non : `--no-verify` saute précisément les contrôles qui protègent le dépôt [\[25\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-git-commit). On corrige la cause. Une vraie clé se retire du fichier, et si elle a déjà quitté le poste, ce qui est le cas dès que Claude l’a lue ([chapitre 1](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch1)), elle se fait révoquer. Une fausse se remplace par une valeur visiblement fictive. On l’écrit aussi dans `CLAUDE.md`, pour que Claude ne le propose plus. Une réponse d’experte sait qu’une règle `deny` ou un hook de Claude Code peuvent appuyer cette consigne, avec leurs limites, et que le contrôle qui tient vraiment est côté serveur, là où le poste ne l’atteint pas ([section 11.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s11-2)).
>
> Vous avez ces éléments ? Lisez seulement les encadrés « Quand la règle cède » et « La limite », puis faites le barreau ③ de l’exercice. Sinon, lisez le chapitre dans l’ordre : il est écrit pour vous.

### 11.1 Des commits petits et relus

Des mois plus tard, quelqu’un cherchera dans l’historique quand et pourquoi une ligne a changé : un commit fourre-tout l’oblige à tout relire, et un message faux l’envoie au mauvais endroit. Un changement cohérent par commit, et un message qui dit exactement ce que montre le diff, la liste des lignes ajoutées et retirées. Un petit commit se relit vraiment, se teste et s’annule facilement. Lisez le diff avant chaque commit, et relisez la [demande de fusion](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-demande-de-fusion) préparée par Claude avant de la soumettre, en lui demandant d’en signaler les risques [\[43\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-common-workflows). Les points de retour de Claude ne couvrent pas tout ([section 2.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-4)) : git reste votre filet [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices).

Inès fait son premier commit pour Passerelle : elle a reformulé deux règles du skill « brouillon pour relecture » et ajouté un courrier d’essai : le courrier piégé du [chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch10), `PASS-C-099`, fictif comme les autres, qu’elle garde pour vérifier que le skill n’obéit pas à l’ordre caché ([section 10.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-3)). Un fichier nouveau n’apparaît pas dans `git diff` sans option ([section 5.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s5-5)). Elle lance donc d’abord :

```bash
git status
```

qui liste les fichiers modifiés et, à part, le courrier nouveau. Puis elle demande à Claude :

```text
Résume mes changements en trois lignes, fichiers nouveaux compris, et signale les risques avant que je committe. Dis-moi aussi si un fichier n'a rien à voir avec le skill.
```

Claude signale un fichier qu’Inès n’attendait pas : un brouillon de la veille, modifié par erreur. Elle le laisse hors du commit, n’ajoute que les fichiers qu’elle nomme, un par un, et relit ce que le commit enregistrera, le courrier nouveau compris :

```bash
git add .claude/skills/brouillon-pour-relecture/SKILL.md courriers/PASS-C-099.txt
git diff --staged
```

Ce guide propose cette pratique : on indexe par chemins nommés, jamais en bloc, pour qu’aucun fichier n’entre sans avoir été vu.

> **💡 Conseil**
>
> Faites écrire le message par Claude, puis relisez-le contre le diff, ligne à ligne : chaque fichier modifié doit y être couvert, et rien ne doit y être annoncé que le diff ne montre pas. Un message vague fait perdre du temps. Un message faux fait chercher au mauvais endroit.

> **🔀 Quand la règle cède**
>
> - Le diff relu ne montre pas tout ce que le commit enregistrera : sans option, `git diff` ne montre ni un fichier nouveau ni ce que `git add` a déjà pris ([section 5.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s5-5)).
> - Ce qui tient : `git status` d’abord, des fichiers indexés par chemins nommés, puis `git diff --staged`, qui montre ce que le commit enregistrera, fichiers nouveaux compris.
> - Pour aller plus loin : [section 19.6](https://gmag-dev.github.io/bien-demarrer-claude-code/#s19-6).

### 11.2 Ne jamais contourner les hooks git

Un mot de passe oublié dans un fichier ou un test cassé s’arrêtent mieux avant d’entrer dans l’historique, d’où ils partiraient au prochain envoi. Votre dépôt peut lancer des contrôles avant chaque commit : chercher un mot de passe oublié, lancer les [tests](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-test), vérifier la forme du message. Ce sont des [hooks git](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-hook-git), à ne pas confondre avec les [hooks](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-hook) de Claude Code ([section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-2)). Quand l’un d’eux échoue, il signale un vrai problème : on corrige la cause, on ne le fait jamais taire.

D’après la documentation de git, l’option `-n`, ou `--no-verify`, de `git commit` saute les hooks `pre-commit` et `commit-msg` [\[25\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-git-commit) : précisément les contrôles qui protègent le dépôt. Écrivez-le dans `CLAUDE.md` : « Si un hook de commit échoue, corrige la cause, n’utilise jamais `--no-verify`. » Une règle `deny` et un hook de Claude Code peuvent l’appuyer, avec leurs limites (encadré « Quand la règle cède » en fin de section).

Chez Passerelle, le hook git lance le contrôle des dates et des montants, puis une recherche de secrets. Un soir, il refuse le commit de Bernard : un brouillon d’essai contient un numéro à quinze chiffres, tapé de tête, qui ressemble à un vrai numéro de sécurité sociale. Claude propose `--no-verify`. Bernard refuse, et remplace le numéro par `PASS-NIR-0000-0000`, visiblement faux ([figure 11.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#fig-11-1)).

*Dessin : Un hook git refuse un commit, que faire. Schéma : la description suit.*

**Figure 11.1 :** Un hook git refuse un commit. En rouge ce qui est refusé, en bleu la question, en ambre le cas réel, en vert ce qui mène au commit, en tirets le geste de Bernard. Schéma proposé par ce guide.

Le même choix, en texte :

1. Le hook git refuse le commit. Le sauter par `--no-verify` est exclu.
2. Si ce qu’il a trouvé est réel, on le retire du fichier. Si c’est un secret et qu’il a quitté le poste, ce qui est le cas dès que Claude l’a lu, on le fait révoquer.
3. Si c’est faux, on le remplace par une valeur visiblement fictive.
4. Dans les deux cas, on relance le commit, le hook passe, et Bernard relit le diff avant de committer lui-même.

> **⚠️ Attention**
>
> Sauter un hook git, par `--no-verify` ou `-n`, laisse entrer ce que le contrôle devait arrêter, peut-être un secret qui partira avec le prochain envoi. Ne l’acceptez pas, même dans l’urgence : lisez ce que le hook a trouvé, corrigez la cause, puis relancez le commit.

> **🔀 Quand la règle cède**
>
> - Un contrôle placé sur le poste peut être contourné depuis le poste : `--no-verify` saute par définition les hooks `pre-commit` et `commit-msg` [\[25\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-git-commit). Si vos hooks de Claude Code sont éteints, doublez chaque contrôle d’une étape qui ne dépend pas d’eux.
> - Pour appuyer la consigne de `CLAUDE.md`, une [règle deny](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-regle-deny) comme `"Bash(git commit --no-verify *)"` peut aider. Elle porte sur le texte de la commande tel qu’il est écrit : la forme courte `-n`, ou un autre ordre des options, y échappent [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permissions). Un hook `PreToolUse` de Claude Code examine la commande avant son exécution et peut la bloquer [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks), dans les limites du [chapitre 18](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch18).
> - Ce qui tient : le contrôle côté serveur, que l’option ne touche pas. La protection de la branche sur la forge, et l’[intégration continue](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-integration-continue) quand sa définition est elle-même protégée, par une revue obligatoire des fichiers qui la décrivent ([section 17.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-3)).
> - Pour aller plus loin : sections [17.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-3) et [19.6](https://gmag-dev.github.io/bien-demarrer-claude-code/#s19-6).

### 11.3 Des gestes qui restent humains

Un envoi, une fusion ou un déploiement ne se défont pas proprement : le travail parti est peut-être déjà chez d’autres. Gardez pour une personne l’approbation de l’envoi vers le dépôt distant, de la fusion et du déploiement. Trois appuis s’additionnent : une [règle ask](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-regle-ask) sur `git push`, la [protection de branche](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-protection-de-branche) côté [forge](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-forge), et une demande de fusion comme point d’arrivée du travail de Claude. Avant de laisser un travail tourner sans surveillance, la documentation pose cinq questions [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices) :

- Sait-il à quoi ressemble un travail vérifié ? Une condition d’objectif, une spécification, un test qui doit passer.
- Peut-il vérifier son travail ? La suite de tests, un hook, une relecture.
- Que peut-il toucher ? Les règles de permission, le bac à sable, un dossier de travail à part, la seule branche où il peut envoyer.
- Qu’est-ce qui l’arrête ? En mode non interactif, un plafond de tours et un plafond de dépense.
- Où va le résultat, et qui signe ? Une demande de fusion, puis une personne qui approuve ce qu’on ne peut pas défaire.

Chez Passerelle, la règle est écrite dans le `CLAUDE.md` et appuyée par une règle `ask` : Samia seule envoie vers le dépôt partagé, après avoir relu ce qui part.

> **⚠️ Attention**
>
> `git push`, une fusion ou un déploiement font sortir le travail du poste, et ne se défont pas proprement : d’autres personnes l’ont peut-être déjà récupéré. Ne laissez pas Claude les faire seul. Gardez une règle `ask` sur `git push`, lisez ce qui part, et faites le geste vous-même.

> **🔀 Quand la règle cède**
>
> - Une règle `ask` sur `git push` se contourne par une autre forme de la commande, comme toute règle par motif [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permissions).
> - Ce qui tient : la protection de la branche côté forge, qu’une commande de la session ne lève pas sans les droits d’administration du dépôt, et une personne qui approuve la demande de fusion.
> - Pour aller plus loin : [section 17.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-3).

### 11.4 Partager la configuration

Une règle rangée au mauvais endroit s’impose à toute l’équipe sans qu’elle l’ait voulu, ou ne protège que vous. L’endroit où vit une règle décide de qui elle concerne [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings). `.claude/settings.local.json` et `~/.claude/settings.json` n’appartiennent qu’à vous. `.claude/settings.json` et ses hooks appartiennent au dépôt : une fois commités, ils s’appliquent à toute l’équipe. Les réglages gérés par l’organisation ne peuvent être remplacés par aucun fichier personnel [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings) [\[82\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-managed-settings). De même, `CLAUDE.md` se partage par git, tandis que `CLAUDE.local.md` reste personnel [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-memory).

Chez Passerelle, les règles du [chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch10) vivent dans `.claude/settings.json`, commité : chaque bénévole qui récupère le projet les reçoit. Inès, qui préfère que Claude lui demande avant chaque lecture de pièce jointe, a mis sa préférence dans `.claude/settings.local.json`, qui reste sur son poste.

Restez sobre. Chaque hook et chaque règle imposée finira par se déclencher à tort, et quelqu’un devra l’entretenir. Si vous en comptez une quarantaine, la plupart sont sans doute des préférences que Claude aurait pu juger seul [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices).

> **🔀 Quand la règle cède**
>
> - Un `.claude/settings.json` versionné s’applique à toute personne qui travaille dans le dépôt, ses hooks compris une fois la confiance accordée au dossier : c’est vrai aussi d’un dépôt que vous clonez ([section 10.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-5)).
> - Ce qui tient : la configuration partagée se relit comme du code, en revue, et chaque règle `allow` large dit pourquoi elle est là.
> - Pour aller plus loin : [section 17.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-1).

### 11.5 Avant le premier dépôt distant

Le jour où vous ajoutez un dépôt distant et envoyez, tout l’historique part, pas seulement l’état du jour. Un secret retiré d’un fichier il y a trois mois est toujours dans le commit qui l’a ajouté. Avant le premier envoi, cherchez donc dans tout l’historique : le scanner de secrets lancé sur l’état courant ne suffit pas, lancez-le sur l’historique entier, ce que gitleaks fait dans son mode git [\[83\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-gitleaks). Cherchez aussi les fichiers qui n’auraient jamais dû être commités : données réelles, exports, journaux, fichiers `.env`.

Samia veut partager l’outil avec une autre association de Rivelune. Avant d’ajouter le dépôt distant, Bernard lance le scanner sur tout l’historique, qui ne trouve rien, et Amadou vérifie que le dossier des pièces n’est jamais entré dans git :

```bash
git log --all --oneline -- pieces/
```

La commande ne rend aucune ligne : aucun commit n’a jamais touché `pieces/`. Samia décide alors d’envoyer.

Si quelque chose ne doit pas partir, deux voies existent, après une sauvegarde vérifiée : repartir d’un dépôt neuf, ou réécrire les seuls chemins en cause. Le [chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23) les décrit pas à pas. Dans les deux cas, Claude peut chercher, lister les chemins et préparer les commandes. Réécrire l’historique et envoyer restent vos gestes, parce qu’ils ne se défont pas.

> **⚠️ Attention**
>
> Un secret publié se révoque, il ne s’efface pas. S’il a été envoyé, même une minute, il est exposé : faites-le révoquer par son émetteur et remplacez-le ([section 10.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-2)). Ne réécrivez jamais un historique que d’autres ont déjà récupéré : la réécriture casse leurs copies, et le secret y reste.

**Tableau 11.1 :** Avant le premier envoi, à trois niveaux. Proposé par ce guide, détail au [chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23).

| Si vous… | Faites avant le premier envoi | Pourquoi |
| --- | --- | --- |
| débutez | le scanner de secrets sur tout l’historique, la relecture de la liste des fichiers suivis (`git ls-files`), puis, s’il y a un doute, un dépôt neuf à partir de l’état courant, après une sauvegarde vérifiée | c’est simple, et l’ancien historique reste sur votre poste |
| êtes à l’aise | le scanner sur tout l’historique, la liste des chemins à retirer relue par vous, puis l’une des deux voies du [chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23) | vous gardez l’historique utile, sans ce qui ne doit pas partir |
| voulez aller plus loin | la réécriture par chemins, le scanner relancé sur l’historique réécrit jusqu’à zéro constat, la sauvegarde gardée hors du dépôt jusqu’à la fin de la vérification | une réécriture se prouve par un contrôle qui repasse, pas par sa commande |

> **📏 La limite**
>
> Rien ne rattrape un secret déjà envoyé : seule sa révocation le neutralise ([chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23)).

> **📌 À retenir**
>
> - Un changement cohérent par commit, le diff relu, et un message qui dit exactement ce que montre le diff.
> - Jamais `--no-verify` : on lit ce que le hook a trouvé, et on corrige la cause.
> - L’envoi, la fusion et le déploiement restent des gestes humains. Un contrôle qui doit tenir se place aussi côté serveur.
> - La configuration d’équipe dans `.claude/settings.json` et `CLAUDE.md`, les préférences dans les fichiers locaux.
> - Avant le premier envoi, cherchez dans tout l’historique. Un secret publié se révoque.

> **✏️ Exercice en trois barreaux**
>
> **Compétence visée** : vérifier qu’un message de commit décrit exactement le diff, et repérer un changement à risque avant de committer. Comptez 20 à 30 minutes.
>
> **① Exemple travaillé.** Bernard a déplacé la fonction qui extrait les dates dans un fichier à part, et ajouté un test. Claude propose le message « Corrige l’extraction des dates ». Voici le diff, réduit à l’essentiel :
>
> ```text
> diff --git a/controle_dates.py b/controle_dates.py
> -def extraire_dates(texte):
> +sys.path.append(str(Path(__file__).resolve().parent))  # python -I n'ajoute pas ce dossier
> +from dates import extraire_dates
> diff --git a/dates.py b/dates.py
> +def extraire_dates(texte):
> diff --git a/tests/test_dates.py b/tests/test_dates.py
> +import sys
> +import unittest
> +from pathlib import Path
> +sys.path.append(str(Path(__file__).resolve().parents[1]))  # la racine du dépôt
> +from dates import extraire_dates
> +class TestDates(unittest.TestCase):
> +    def test_premier_janvier(self):
> +        self.assertEqual(extraire_dates("à compter du 1er janvier 2027"), ["2027-01-01"])
> ```
>
> `controle_dates.py` importe déjà `sys` et `Path`, et le nouveau test les importe lui-même. Le test est une classe `unittest.TestCase` : la découverte de `unittest` ne lance que les tests rangés dans une telle classe [\[84\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-python-unittest). Les deux lignes `sys.path.append` font partie du déplacement. Le contrôle se lance par `python -I`, et dans ce mode `sys.path` ne contient ni le dossier du script ni le dossier courant [\[85\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-python-cmdline) : sans elles, `from dates import extraire_dates` échouerait, le contrôle ne tournerait plus, et le hook `Stop` de la [section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-2) bloquerait chaque fin de tour. Ajouté en fin de liste, le dossier du dépôt ne passe pas devant les modules de Python : un fichier `json.py` posé à la racine ne remplacerait pas le vrai.
>
> Le diff ne corrige rien : il déplace une fonction et ajoute un test. Bernard réécrit le message : « Déplace extraire\_dates dans dates.py et ajoute un test pour le 1er janvier ». Chaque fichier du diff est couvert, et rien n’est annoncé que le diff ne montre pas. **Pourquoi ?** Pourquoi un message faux est-il plus grave qu’un message vague ?
>
> **② À compléter.** Claude propose de committer ce diff sous le message « Met à jour la notice » :
>
> ```text
> diff --git a/.gitignore b/.gitignore
>  .env
> -pieces/
> diff --git a/README.md b/README.md
> +Pour lancer le contrôle : python -I controle_dates.py --tous
> ```
>
> Repérez le changement à risque que le message tait, écrivez ce que vous faites avant de committer, puis le message juste du commit qui reste.
>
> **③ Sur votre projet.** Faites écrire par Claude le message d’un petit changement. Relisez le diff, corrigez le message s’il décrit autre chose que ce que montre le diff, puis committez vous-même, en nommant chaque fichier.
>
> **Sans code** : les barreaux ① et ② se font en lisant, sans rien écrire d’autre qu’un message. Le barreau ③ se fait aussi sur un dépôt de documents, comme un dossier de comptes rendus suivi par git.
>
> **Critère de réussite** : un commit dont le message décrit exactement le diff, chaque fichier modifié couvert, et aucun hook contourné, ce que vous constatez par `git show --stat`. Par le chemin sans code, vos messages réécrits pour les barreaux ① et ②, qui couvrent chaque fichier du diff, le changement à risque du barreau ② nommé, puis, sur votre dépôt de documents, un commit dont `git show --stat` liste les seuls fichiers que son message annonce.
>
> **Voir le corrigé expliqué (après votre essai)**
>
> **①** Un message vague oblige à lire le diff. Un message faux trompe la personne qui cherche dans l’historique : en cherchant quand le défaut des dates a été corrigé, elle tomberait sur ce commit, croirait le défaut réglé, et chercherait ailleurs la cause d’un brouillon faux. Chez Passerelle, ce brouillon faux passerait encore par Odile, qui relit et tranche avant que rien ne serve.
>
> **②** On s’arrête : le diff retire `pieces/` du `.gitignore`, ce que le message tait. On demande pourquoi, on remet la ligne, et on ne committe que le changement de la notice `README.md`, sous le message « Ajoute à la notice la commande du contrôle ». Si retirer `pieces/` avait une raison, ce serait un commit à part, nommé, relu par Amadou, qui décide de ce qui entre dans le dossier. Erreur fréquente : corriger le message sans regarder le `.gitignore`, et laisser passer le changement à risque.
>
> **③** `git show --stat` liste les fichiers du commit : chacun doit être couvert par le message. Si un fichier vous surprend, annulez le commit par `git reset --soft HEAD~1`, qui garde vos changements, et recommencez en nommant les fichiers.

> **✏️ Exercice en trois barreaux**
>
> **Exercice de passage du jalon Confirmé.** Il clôt les chapitres [6](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch6) à [11](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch11), et sa preuve est un fichier et une liste de constats (« Apprendre avec ce guide »).
>
> **Compétence visée** : écrire un relecteur qui ne peut que lire, l’appliquer à votre propre diff contre une spécification, et relier chaque constat à une exigence. Comptez 45 à 60 minutes, plus un quart d’heure pour réunir vos preuves du niveau.
>
> **① Exemple travaillé.** Avant de committer un changement du contrôle des dates, Bernard le fait relire contre `SPEC.md` ([chapitre 4](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch4)), dont il a numéroté les exigences, de `PASS-EX-001` à `PASS-EX-006`. Il écrit `.claude/agents/relecteur-spec.md`, sur le modèle du relecteur du [chapitre 8](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch8) :
>
> ```markdown
> ---
> name: relecteur-spec
> description: Relit un diff contre SPEC.md, sans rien modifier. À employer avant un commit.
> tools: Read, Grep, Glob
> ---
> Tu relis un diff que tu n'as pas écrit, contre SPEC.md.
> Pour chaque constat, donne l'identifiant de l'exigence qu'il touche, puis la ligne du diff en cause.
> Un écart qui ne touche aucune exigence se range à part, sous « hors spécification ». Ignore le style.
> Rends tes constats dans ton message final.
> ```
>
> Il indexe ses fichiers en les nommant, note la sortie de `git status --short`, puis demande, dans une session neuve en mode Manual :
>
> ```text
> lance git diff --staged, puis donne sa sortie entière au sous-agent relecteur-spec dans son brief, pour qu'il la relise contre SPEC.md. rends-moi ses constats tels quels, sans rien corriger
> ```
>
> Le relecteur n’a pas de shell : c’est la session qui lance `git diff --staged`, avec l’accord de Bernard, et qui lui passe la sortie.
>
> Le relecteur rend deux constats. Le premier dit : « `PASS-EX-002` : les dates écrites en lettres sont testées, mais aucun test ne couvre une date écrite en chiffres ». Bernard ouvre `SPEC.md` et le diff : l’exigence existe, et le diff ne teste que les dates en lettres. Il garde le constat. Le second dit : « `PASS-EX-008` : le brouillon doit tenir en une page ». `SPEC.md` n’a pas cette exigence : Bernard le rejette. `git status --short` rend la même sortie qu’avant la relecture. Bernard ajoute le test manquant, puis committe lui-même. **Pourquoi ?** Pourquoi exiger que chaque constat cite une exigence, plutôt que de demander « des remarques » ?
>
> **② À compléter.** Sur un autre diff de Bernard, le relecteur rend trois constats :
>
> ```text
> 1. PASS-EX-002 : la date du 15 décembre 2026 n'est cherchée que dans la première page du brouillon. controle_dates.py, ligne 14 du diff.
> 2. Le nom de variable « d » est peu parlant. dates.py, ligne 3 du diff.
> 3. PASS-EX-009 : chaque brouillon doit citer le nom de l'organisme. controle_dates.py, ligne 20 du diff.
> ```
>
> `SPEC.md` compte six exigences, de `PASS-EX-001` à `PASS-EX-006`. Pour chaque constat, reliez-le à l’exigence de `SPEC.md` qu’il cite, si vous la retrouvez, puis écrivez votre décision, gardé, hors spécification ou rejeté, avec sa raison.
>
> **③ Sur votre projet.** Numérotez au moins trois exigences d’une spécification de votre projet, ou écrivez-en une courte. Écrivez votre relecteur, avec `tools: Read, Grep, Glob`. Indexez un petit changement, notez la sortie de `git status --short`, lancez le relecteur sur `git diff --staged`, puis vérifiez chaque constat dans la spécification et dans le diff. S’il ne rend aucun constat, plantez un écart, une ligne qui contredit une exigence, et relancez-le. Reliez chaque constat gardé à son exigence, décidez de chaque constat, puis committez vous-même.
>
> **Les preuves du jalon Confirmé.** Le relecteur ne prouve pas tout le niveau. Dans un fichier `passage-confirme.md` de votre projet, réunissez ce que les chapitres [6](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch6) à [10](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch10) vous ont fait constater, une ligne datée par preuve : le brouillon produit par votre skill et contrôlé, et le refus de votre hook, fichier inchangé ([chapitre 7](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch7)), le serveur local branché en lecture seule, si votre projet en a un, choisi par la [figure 6.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#fig-6-2) et déclaré comme à la [section 18.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s18-3), les deux branches menées en parallèle, chacune dans son worktree, sans fichier commun ([chapitre 8](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch8)), un relevé de `/usage` comparé au rythme lissé ([chapitre 9](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch9)), et une lecture refusée par une règle `deny` ([chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch10)). Chez Passerelle, Bernard y note le refus de la garde contre les numéros, le serveur du lexique, les branches `worktree-skill-bareme` et `worktree-lexique-urgent`, et les relevés de la vague. Une preuve qui manque vous renvoie à son chapitre avant de déclarer le niveau.
>
> **Sans code** : le relecteur est un fichier de texte, et le barreau ② se fait en lisant. Le barreau ③ se fait sur un dépôt de documents : la spécification est la liste numérotée de vos règles d’écriture, et le diff est celui d’un document. Le fichier des preuves se tient sans code : il recense ce que vous avez déjà constaté par le chemin sans code de chaque chapitre.
>
> **Critère de réussite** : le fichier du relecteur, dont le champ `tools` ne liste que `Read`, `Grep` et `Glob`, la même sortie de `git status --short` avant et après la relecture, une liste où chaque constat cite une exigence que vous retrouvez dans la spécification, ou se range « hors spécification », avec votre décision écrite, et `passage-confirme.md`, une ligne datée par preuve des chapitres [6](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch6) à [10](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch10). Par le chemin sans code, le même fichier du relecteur, la même sortie de `git status --short` avant et après la relecture du diff d’un document, une liste où chaque constat cite une de vos règles d’écriture numérotées, ou se range « hors spécification », avec votre décision, et `passage-confirme.md`, dont chaque ligne renvoie à la preuve sans code de son chapitre.
>
> **Voir le corrigé expliqué (après votre essai)**
>
> **①** Un constat relié à une exigence se vérifie : l’exigence existe ou non, et la ligne du diff dit ce qu’il affirme ou non. Une demande de « remarques » en fait toujours trouver, et mêle la justesse au style ([section 5.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s5-4)). Le second constat de Bernard le montre : un rapport de sous-agent est une affirmation, même quand il cite un identifiant ([chapitre 8](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch8)). Le relecteur ne décide pas. Bernard décide et committe, et les brouillons que vérifiera ce contrôle passent encore par Odile, qui relit et tranche.
>
> **②** Le premier se garde, après lecture de la ligne 14 du diff et de `PASS-EX-002` : une date que le contrôle ne cherche pas partout peut manquer au brouillon sans qu’il le voie. Le deuxième est hors spécification : c’est du style, que la consigne demandait d’ignorer. Il se range à part et ne bloque pas le commit. Le troisième se rejette : `PASS-EX-009` n’existe pas, le relecteur a inventé l’exigence. Erreur fréquente : garder un constat parce qu’il cite un identifiant, sans le chercher dans `SPEC.md`.
>
> **③** Votre liste est juste si vous retrouvez chaque identifiant dans votre spécification, et la ligne citée dans le diff. Si la sortie de `git status --short` a changé pendant la relecture, ce n’est pas le relecteur, qui n’a aucun outil d’écriture : cherchez quelle session a écrit. Si le relecteur n’a pas trouvé l’écart planté, précisez sa consigne et relancez-le, avant de lui faire confiance. Dans `passage-confirme.md`, chaque ligne renvoie à une trace que vous pouvez rouvrir : un commit, une sortie, un relevé daté. Une ligne sans trace se refait dans son chapitre, et c’est vous qui déclarez le niveau atteint, pas Claude.

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/#toc)

![Illustration : la personne en long manteau violet et son petit compagnon de cristal cyan, à une table à dessin, tracent un trait de lumière qui devient un plan ordonné flottant au-dessus d’eux.](https://gmag-dev.github.io/bien-demarrer-claude-code/images/d41d79a90d33.avif)
