> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.5.0 : « 5. Vérification et tests ».
>
> - Précédent : [4. La méthode de travail (partie 2 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/4-la-methode-de-travail-2.md)
> - Suivant : [6. Choisir ses extensions (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/6-choisir-ses-extensions-1.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#h-ch5>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## 5. Vérification et tests

> **🪪 Ce chapitre**
>
> **Pour qui** : toute personne qui accepte encore « c’est corrigé » sans preuve, ou qui ne sait pas dire si un travail annoncé terminé l’est vraiment.
>
> **Sur quel poste** : n’importe lequel, avec Claude Code et [git](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-git) installés (« Prérequis », avant le [chapitre 1](https://gmag-dev.github.io/bien-demarrer-claude-code/1-ce-qu-est-claude-code.html#ch1), et [section 2.1](https://gmag-dev.github.io/bien-demarrer-claude-code/2-bien-demarrer.html#s2-1)). Le contrôle de Bernard est un petit script Python : le chemin sans code n’en a pas besoin.
>
> **Ce que vous apprenez** : exiger une vérification qui réussit ou échoue, et sa sortie, avant de dire « vérifié ».
>
> **Deux chemins** : si vous débutez, lisez tout le chapitre et faites les trois barreaux : comptez 30 à 45 minutes pour l’exercice. Si vous répondez juste à la question ci-dessous, lisez les encadrés « Quand la règle cède » et « La limite », puis faites le barreau ③.
>
> **Le fil rouge** 🌉 Passerelle : Bernard écrit le premier contrôle de Passerelle, qui compare les dates et les montants d’un courrier à ceux de son brouillon. Inès en fait la version sans code. Thomas écoute les brouillons au lecteur d’écran, et Odile tranche.
>
> **Où en est Passerelle** : en arrivant, le circuit courrier, brouillon, relecture a un plan approuvé ([chapitre 4](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#ch4)), et trente courriers fictifs, `PASS-C-001` à `PASS-C-030`. À la fin du chapitre, un contrôle a échoué sur le brouillon `PASS-B-003`, qui avait perdu un délai, et le correctif est enregistré par un premier [commit](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-commit) relu. Le brouillon `PASS-B-017`, qui ajoutait un montant, est corrigé au barreau ② : le contrôle passe sur les trente brouillons.

Claude s’arrête quand le travail a l’air terminé. S’il n’a rien à exécuter qui lui dise si le résultat est juste, c’est vous qui devenez la suite de [tests](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-test), et chaque erreur attend que vous la remarquiez [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Chez Passerelle, l’erreur qui compte ne fait rien planter : c’est un délai qui disparaît d’un brouillon, et que personne ne voit avant la date. Ce chapitre montre comment fermer cette boucle.

> **⏭️ Vous pouvez sauter ce chapitre si…**
>
> Claude vient de corriger un défaut dans le contrôle des dates de Passerelle, et il annonce : « C’est corrigé, les tests passent. » Quelle est votre première demande ? Écrivez votre réponse avant d’ouvrir la réponse attendue.
>
> **Voir la réponse attendue**
>
> Une réponse d’experte commence par se situer : si vous connaissez mal cette partie du code, vous demandez d’abord un diagnostic, sans modification. Elle contient ensuite trois éléments : la sortie d’un test qui échouait avant la correction et passe après, ce test d’abord s’il n’existe pas, et, pour ce qui doit toujours passer, un contrôle imposé. C’est un hook `Stop` en session ([section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/7-ecrire-ses-premieres-extensions.html#s7-2)), et l’intégration continue comme dernière porte, si sa propre définition est protégée.
>
> Vous avez ces éléments ? Lisez seulement les encadrés « Quand la règle cède » et « La limite », puis faites le barreau ③ de l’exercice. Sinon, lisez le chapitre dans l’ordre : il est écrit pour vous.

### 5.1 Un contrôle qui réussit ou échoue

Donnez à Claude quelque chose qu’il peut exécuter et qui répond « réussi » ou « échoué » : un fichier de test, le [code de sortie](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-code-de-sortie) d’une commande (0 si tout va bien), un [linter](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-linter), un script qui compare une sortie à une référence, une capture d’écran posée à côté de la maquette [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Claude modifie, exécute, lit l’échec et corrige avant de relancer, sans que vous surveilliez. Si votre [dépôt](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-depot) a une telle vérification, la ligne la plus utile de votre `CLAUDE.md` est la commande qui la lance [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices).

Ce guide appelle [oracle](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-oracle) toute vérification de ce genre : elle dit si le résultat est juste sans demander l’avis du modèle. Deux sortes d’oracles ont leur propre nom : le test, qui vérifie le code, et le contrôle, un seul script nommé qui vérifie une règle du projet sur ses fichiers. Un oracle n’a pas besoin d’être technique. Une sortie attendue, écrite d’avance et comparée à la sortie obtenue, en est déjà un.

Chez Passerelle, Bernard écrit le contrôle dont l’association a le plus besoin, le contrôle des dates et des montants : aucune date ni aucun montant ne se perd ni ne s’ajoute entre le courrier et son brouillon. Son script compare les dates et les montants des deux fichiers, et signale aussi chaque mot du lexique, comme « réexamen », resté tel quel. Sur le brouillon du courrier `PASS-C-003` ([chapitre 1](https://gmag-dev.github.io/bien-demarrer-claude-code/1-ce-qu-est-claude-code.html#ch1)), il trouve ceci :

```text
python -I controle_dates.py PASS-C-003
ÉCHEC  PASS-B-003 : date du courrier absente du brouillon : 15 décembre 2026
1 brouillon contrôlé, 1 en échec (code de sortie 1)
```

Le brouillon avait perdu le délai pour envoyer l’avis d’imposition. Le script du même nom, dans le dossier d’essai, prend `ESSAI-C-001` et refuse `PASS-C-003`, en code 2. Inès, sur le chemin sans code, écrit d’avance la liste des dates et des montants, et une commande compare le brouillon à cette liste.

La rigueur se règle sur une échelle : la consigne dans le [prompt](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-prompt), que Claude juge seul, l’objectif `/goal`, une condition que vous écrivez et qu’un modèle séparé vérifie, le hook `Stop` ([section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/7-ecrire-ses-premieres-extensions.html#s7-2)), et le regard de qui n’a pas écrit le travail ([section 5.4](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#s5-4)) [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices).

> **🔀 Quand la règle cède**
>
> - Un oracle qui ne peut pas échouer ne prouve rien : un test sans assertion, ou un contrôle qui passe aussi sur un brouillon faux. Voyez-le échouer une fois sur un cas planté, puis passer.
> - Ce qui tient : la confiance va à l’oracle qu’on a vu échouer.
> - Pour aller plus loin : [section 14.6](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-6). À partir du [chapitre 14](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#ch14), le contrôle des dates et des montants s’appelle aussi contrôle de fidélité, d’après ce qu’il garantit ([section 14.2](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-2)).

### 5.2 Le test d’abord

Une correction faite sans avoir vu le défaut se produire peut viser à côté, et rien ne le dira. Avant de corriger un défaut, assurez-vous donc de l’avoir compris. Si vous connaissez mal cette partie du code, demandez d’abord un diagnostic, sans rien modifier : ce qui se passe, où, et comment Claude l’a vérifié.

Demandez ensuite un test qui échoue et reproduit le problème, puis la correction qui le fait passer [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices), et ajoutez « montre-moi qu’il échoue avant de corriger ». Un test vu en échec prouve qu’il détecte le défaut, alors qu’un test écrit avec sa correction peut passer sans rien prouver. Nommez aussi les cas limites : conditions d’erreur, valeurs frontières, entrées inattendues [\[43\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-common-workflows).

Chez Passerelle, le courrier `PASS-C-014` écrit son délai en chiffres, « 15/12/2026 », et le contrôle ne cherchait que les dates en toutes lettres. Un brouillon qui perdait ce délai passait sans bruit.

**Tableau 5.1 :** Le même défaut, une date en chiffres que le contrôle ne voit pas, à trois niveaux. Proposé par ce guide.

| Si vous… | Ce que vous demandez | Exemple de prompt |
| --- | --- | --- |
| découvrez ce code | un diagnostic, rien n’est modifié | « Le contrôle ne signale pas le délai de PASS-C-014. Ne modifie rien. Trouve où il cherche les dates, et explique-moi pourquoi celle-ci lui échappe. » |
| connaissez le contrôle | un test qui reproduit, puis une proposition | « Écris un test qui reproduit le cas de PASS-C-014, montre-moi qu’il échoue, puis propose la correction avant de l’appliquer. » |
| connaissez la cause | une consigne précise, cas limites compris | « Le contrôle ne lit que les dates en lettres. Écris un test qui échoue sur 15/12/2026, sur « 1er janvier » et sur une date en fin de ligne, montre-le en échec, corrige, puis montre la sortie de tous les tests. » |

> **📏 La limite**
>
> Pour un prototype jetable, le test d’abord ralentit sans protéger, et un défaut qui ne se reproduit pas à coup sûr demande une trace. Dans les deux cas, aucune correction n’est dite « vérifié » sans un oracle qui peut échouer (sections [14.6](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-6) et [14.10](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-10)).

### 5.3 Des preuves et l’application réelle

Un résumé peut lire trop vite, ou dire ce que l’on espérait. « Tous les tests passent », seul, ne dit presque rien. Quel que soit l’oracle, demandez donc la preuve : la commande exécutée et sa sortie. Pour une session que vous ne surveilliez pas, la sortie est la seule preuve disponible [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices).

```text
montre-moi la commande exacte que tu as lancée et les dernières lignes de sa sortie
```

Chez Passerelle, Claude a d’abord résumé un lot par « les trente brouillons passent le contrôle ». Bernard a demandé la sortie : vingt-neuf lignes `OK` et une ligne `ÉCHEC`, le brouillon `PASS-B-017` ajoutait un montant de 50 euros absent du courrier. Le résumé lisait trop vite. La sortie ne résume rien.

Certains défauts échappent aux tests, comme une page qui s’affiche mal : `/verify` demande à Claude de lancer l’application et de regarder le résultat [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Chez Passerelle, l’application réelle est le brouillon lu par la personne qui le reçoit ([section 5.4](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#s5-4)).

> **🔀 Quand la règle cède**
>
> - Une sortie peut être ancienne ou recopiée. Elle ne prouve que si elle vient du tour même, et si vous lisez la sortie, pas le résumé qui l’accompagne.
> - Ce qui tient : un rapport sans preuve relue reste « non vérifié », surtout celui d’un [sous-agent](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-sous-agent). Le [chapitre 14](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#ch14) donne la liste des mots d’issue d’une tâche.
> - Pour aller plus loin : [chapitre 15](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#ch15).

### 5.4 La relecture par un regard neuf

La personne qui a écrit un travail voit ce qu’elle voulait écrire, pas toujours ce qui est écrit. Faites relire par un regard qui n’a pas vu l’écriture.

Une seconde session est le relecteur indépendant le plus simple : l’une écrit, l’autre relit sans avoir vu l’écriture [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). `/code-review` relit le [diff](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-diff), la liste des lignes changées, dans un sous-agent neuf, que le raisonnement qui a produit le code n’influence pas [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Pour faire vérifier le travail contre votre spécification, écrivez la consigne vous-même :

```text
utilise un sous-agent pour relire le diff du contrôle des dates contre SPEC.md : chaque exigence est-elle implémentée, chaque cas limite listé a-t-il un test ? signale seulement les écarts qui touchent la justesse, ignore le style
```

Gardez « ignore le style » : un relecteur à qui l’on demande des problèmes en trouvera toujours, et corriger chaque remarque ajoute du code pour des cas impossibles [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices).

Chez Passerelle, le regard neuf qui compte le plus est humain. Thomas écoute chaque brouillon avec son lecteur d’écran. Dans `PASS-B-009`, le délai était dans une parenthèse, lue d’une traite : il a raté la date. Aucun test ne l’avait entendu, mais la remarque se mesure, et Bernard a ajouté au contrôle une règle, aucune date entre parenthèses. Le reste, la clarté, le ton, ne se mesure pas : Odile relit chaque brouillon, et rien ne sert sans son accord.

> **🔀 Quand la règle cède**
>
> - Un regard neuf cesse de l’être dès qu’on lui donne sa conclusion : donnez au relecteur l’objet et la consigne, jamais votre verdict.
> - Ce qui tient : un relecteur de la même famille de modèles partage une part de vos angles morts. Pour un enjeu fort, ajoutez un oracle, qui ne dépend d’aucun modèle, ou une relecture humaine.
> - Pour aller plus loin : [chapitre 16](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#ch16) et [section 14.11](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-11).

### 5.5 Imposer le contrôle

Une ligne « lance toujours le contrôle avant de t’arrêter » dans `CLAUDE.md` fonctionne la plupart du temps, pas toujours. Pour l’imposer, un [hook Stop](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-hook-stop) renvoie Claude au travail quand le contrôle échoue [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Il est présenté à la [section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/7-ecrire-ses-premieres-extensions.html#s7-2), avec les autres hooks et leurs précautions. La [figure 5.1](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#fig-5-1) place ce contrôle imposé dans la chaîne complète, jusqu’à votre commit.

*Dessin : La chaîne de vérification, du premier test à la fusion. Schéma : la description suit.*

**Figure 5.1 :** La chaîne de vérification. En vert les contrôles automatiques, en bleu la question, en ambre le retour au travail, en tirets les gestes d’une personne. D’après [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices), schéma proposé par ce guide.

La même chaîne, en texte :

1. Les étapes 1 à 4 tournent sans vous : tests, contrôles, `/verify`, relecture neuve. Un échec renvoie à l’étape 1.
2. Les étapes 5 à 8 sont des gestes humains : lire le diff, committer, pousser après accord, approuver la fusion.

Les étapes 5 et 6 forment le commit relu, que le [chapitre 11](https://gmag-dev.github.io/bien-demarrer-claude-code/11-commits-et-collaboration.html#ch11) développe. Pour enregistrer un travail relu, quatre commandes suffisent, dans le dossier du projet :

```bash
git add <les fichiers à enregistrer, nommés un par un>
git diff --staged
git commit -m "<ce que fait le changement>"
git log -1 --stat
```

1. `git add` prend les fichiers que vous nommez : nommez-les un par un, plutôt qu’un dossier entier.
2. `git diff --staged` montre ce que le commit enregistrera, fichiers nouveaux compris. Sans option, `git diff` ne montre ni un fichier nouveau ni ce que `git add` a déjà pris. `git status` liste les uns et les autres.
3. Le message dit ce que fait le diff, et rien d’autre.
4. `git log -1 --stat` montre le dernier commit et ses fichiers : ceux que vous avez relus, et eux seuls.

Tant que l’état de départ d’un dépôt n’est pas commité, tous ses fichiers sont nouveaux : enregistrez-le d’abord par un commit à part, comme au [chapitre 2](https://gmag-dev.github.io/bien-demarrer-claude-code/2-bien-demarrer.html#ch2), pour que les suivants ne montrent que ce qui change.

> **🔀 Quand la règle cède**
>
> - Un hook `Stop` qui a bloqué huit fins de tour d’affilée, sans appel d’outil entre elles, laisse passer [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks). L’[intégration continue](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-integration-continue) reste la dernière porte, si sa définition est protégée par une revue obligatoire des fichiers de workflow et par la protection de la [branche](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-branche). Sinon, un agent qui pousse peut modifier le contrôle dans la même branche.
> - Ce qui tient : ce qui doit tenir à coup sûr se place aussi là où le poste ne peut pas l’atteindre.
> - Pour aller plus loin : sections [7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/7-ecrire-ses-premieres-extensions.html#s7-2) et [18.1](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-1).

### 5.6 Avancer sans la vraie pièce

Quand une pièce dont vous dépendez n’est pas prête, remplacez-la par un [bouchon](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-bouchon), une pièce simple qui répond comme la vraie, avec des données inventées. Quand les données vraies sont confidentielles, n’en copiez aucune : inventez-les. Vous avancez sur votre partie, et vous branchez la vraie pièce le jour où elle arrive.

Le métier dit [doublure de test](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-doublure-de-test) pour toute pièce qui en remplace une vraie pendant un test, et distingue le bouchon, aux réponses préparées, du faux et du simulacre [\[58\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-test-double). 💡 Conseil : en français courant, « bouchon » suffit.

Les données suivent la même règle. Des [données synthétiques](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-donnees-synthetiques) ont la forme des vraies, mais aucune ligne ne décrit une personne qui existe. Ce guide propose trois gestes pour commencer :

- **un script les produit**, avec une [graine](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-graine) écrite dans son code : la même graine redonne le même jeu, et un test qui échoue aujourd’hui échoue encore demain,
- **un préfixe dit qu’elles sont inventées** : `PASS-C-` pour un courrier, `PASS-B-` pour son brouillon,
- **un numéro qui ressemblerait à un vrai s’écrit visiblement faux** : `PASS-NIR-0000-0000` tient la place d’un numéro de sécurité sociale.

Les trente courriers de Passerelle sortent d’un tel générateur, où le cas de `PASS-C-014` a été ajouté exprès. La méthode complète est au [chapitre 14](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#ch14).

> **⚠️ Attention**
>
> Un vrai courrier, ou une donnée de client ou d’employeur, mis dans le dossier du projet part au modèle dès que Claude le lit, et reste dans git. Générez les données par un script, gardez les vraies hors du dossier, même « juste pour essayer » (chapitres [10](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#ch10) et [23](https://gmag-dev.github.io/bien-demarrer-claude-code/23-securite-et-propriete-intellectuelle-en-entreprise.html#ch23)).

Passerelle voudra un jour lire des courriers scannés, et cette lecture n’existe pas encore.

**Tableau 5.2 :** Le même besoin, avancer sans la lecture des courriers scannés, à trois niveaux. Proposé par ce guide.

| Si vous… | Demandez par exemple | Pourquoi |
| --- | --- | --- |
| ne connaissez pas le sujet | « La lecture des courriers scannés n’existe pas encore. Explique-moi comment la remplacer pour avancer, et ce qu’il faudra changer le jour où elle arrivera. Ne modifie rien. » | l’explication avant tout changement ([section 5.2](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#s5-2)) |
| savez ce qu’est une fonction | « Crée un bouchon de la lecture : une fonction qui rend le texte des fichiers courriers/PASS-C-\*.txt, sous le nom de la future lecture. » | le reste du code ne verra pas la différence |
| avez son contrat | « Écris le contrat de la lecture, entrée, sortie et erreurs, un bouchon qui le suit, et un test de contrat prêt à tourner contre la vraie lecture. » | le jour où le bouchon part est préparé |

> **📏 La limite**
>
> Un bouchon qui ne ressemble plus à la vraie pièce fait passer les tests et casse le vrai usage : décrivez les deux par le même contrat, prouvé par un [test de contrat](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-test-de-contrat). Un jeu synthétique ne contient que ce qu’on y a mis ([chapitre 14](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#ch14)).

> **📌 À retenir**
>
> - Pas d’oracle qui peut échouer, pas de « vérifié ».
> - Pour un défaut : le diagnostic si le code vous est mal connu, puis le test qui échoue d’abord, la correction ensuite.
> - Exigez la sortie de la commande, pas le résumé.
> - Faites relire par un regard neuf, sans le style. Ce qui se mesure dans une relecture humaine devient un contrôle.
> - Ce qui doit toujours passer, un [contrôle](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-controle) court et non la suite de tests entière, s’impose par un hook `Stop`, et par l’intégration continue protégée.
> - Une pièce manque : un bouchon. Des données confidentielles : des données inventées, produites par un script.

> **✏️ Exercice en trois barreaux**
>
> **Compétence visée** : exiger une vérification qui réussit ou échoue, et sa sortie, avant de dire « vérifié », puis enregistrer le correctif par un commit relu. Comptez 30 à 45 minutes.
>
> **① Exemple travaillé.** Le brouillon `PASS-B-003` a perdu le délai du 15 décembre 2026. Bernard lance Claude depuis le dossier de Passerelle, en [mode Manual](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-mode-manual) :
>
> ```bash
> claude --permission-mode manual
> ```
>
> Demande 1 : « Écris un test qui vérifie que chaque date et chaque montant du courrier PASS-C-003 figure dans le brouillon PASS-B-003. Ne corrige rien. Lance le test et montre-moi la sortie. » Claude montre le test en échec, sur la date du 15 décembre 2026.
>
> Demande 2 : « Ajoute le délai au brouillon, en début de phrase, relance le contrôle sur les trente brouillons et montre-moi la sortie. » Claude montre `30 brouillons contrôlés, 1 en échec (PASS-B-017)`. `PASS-B-003` passe désormais. L’échec qui reste est un autre défaut, le montant ajouté de la [section 5.3](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#s5-3), et le barreau ② part de lui. Bernard relit le changement, puis l’enregistre lui-même par le commit relu de la [section 5.5](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#s5-5) :
>
> ```bash
> git status
> git add brouillons/PASS-B-003.md tests/test_controle.py
> git diff --staged
> git commit -m "Ajoute au brouillon PASS-B-003 le délai du 15 décembre 2026, et son test"
> git log -1 --stat
> ```
>
> `git status` montre le brouillon modifié, et le test nouveau parmi les fichiers non suivis, ou son dossier `tests/` s’il est nouveau lui aussi : `git diff` seul ne l’aurait pas montré. Le diff indexé montre une phrase changée, « Avant le 15 décembre 2026, envoyez votre avis d’imposition au Bureau des aides. », et le test ajouté. `git log -1 --stat` liste ces deux fichiers, et eux seuls : le message dit exactement ce que fait le diff. **Pourquoi ?** Pourquoi la demande 1 interdit-elle de corriger ?
>
> **② À compléter.** Le brouillon `PASS-B-017` ajoute un montant de 50 euros absent de son courrier. La demande 1 : « Écris un test qui échoue si PASS-B-017 contient un montant absent de PASS-C-017. Ne corrige rien, et montre-moi la sortie. » Écrivez la demande 2, le critère qui permettra de dire « vérifié », et le message du commit.
>
> **③ Sur votre projet.** Sur un défaut réel, faites écrire le test, montré en échec, puis la correction, et exigez la sortie qui passe. Relisez le diff, puis committez vous-même, en nommant les fichiers. Dans le dossier d’essai, le défaut à corriger est décrit dans son `README.md`. En option, après le [chapitre 7](https://gmag-dev.github.io/bien-demarrer-claude-code/7-ecrire-ses-premieres-extensions.html#ch7), installez le hook `Stop` de la [section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/7-ecrire-ses-premieres-extensions.html#s7-2), sur un projet dont le contrôle `--tous` passe déjà, avec la relecture que cette section demande avant chaque session. Dans le dossier d’essai : après la correction du défaut et l’explication des trois documents. Ce hook lance ce contrôle, pas les tests.
>
> **Exercice de passage du niveau Débutant.** Le barreau ③ est votre exercice de passage : il rassemble ce que les chapitres [1](https://gmag-dev.github.io/bien-demarrer-claude-code/1-ce-qu-est-claude-code.html#ch1) à [5](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#ch5) ont appris. Faites-le dans une session lancée en mode Manual, par `claude --permission-mode manual`, avec le `CLAUDE.md` court du [chapitre 2](https://gmag-dev.github.io/bien-demarrer-claude-code/2-bien-demarrer.html#ch2) chargé et une règle `deny` sur vos secrets (jour 2 de l’[annexe A](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-a-ma-premiere-semaine.html#ann-a)). Tapez `/clear` avant de commencer. Écrivez la demande en prompt de réalisation, avec ses quatre ingrédients ([section 4.7](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-7)). Faites planifier la correction en mode plan, et corrigez le plan avant de l’approuver. Si Claude part dans une mauvaise direction, revenez en arrière par `/rewind`. Gardez sept preuves :
>
> 1. la sortie de `/context`, qui montre votre `CLAUDE.md` chargé,
> 2. le refus affiché quand vous demandez à Claude de lire `.env`, que protège votre règle `deny`,
> 3. votre prompt de réalisation,
> 4. le plan, avec l’étape que vous avez corrigée,
> 5. la sortie du test qui échoue sur le défaut, avant la correction,
> 6. la sortie du même test qui passe, après,
> 7. le commit relu, visible par `git log -1 --stat`.
>
> C’est la preuve du niveau Débutant de « Apprendre avec ce guide », et le jour 5 de l’[annexe A](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-a-ma-premiere-semaine.html#ann-a) la reprend.
>
> **Sans code** : faites comme Inès. Écrivez à la main la liste des dates et des montants d’un document, faites-en faire une explication, retirez-en vous-même une date, et enregistrez cette explication fautive par un commit ([section 5.5](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#s5-5)). Lancez vous-même la comparaison de l’[annexe A](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-a-ma-premiere-semaine.html#ann-a), une commande : elle doit échouer sur la date retirée. Faites corriger, relancez la comparaison, relisez le diff par `git add` puis `git diff --staged`, et committez. Pour l’exercice de passage, gardez les mêmes sept preuves : la demande d’explication écrite en prompt de réalisation, son plan corrigé, et la comparaison en échec puis en succès à la place des tests.
>
> **Critère de réussite** : une sortie d’échec avant, une sortie de succès après, un diff relu par `git diff --staged`, et un commit dont le message décrit exactement le diff, visible par `git log -1 --stat`. Pour l’exercice de passage, les sept preuves de la liste. Par le chemin sans code, l’échec avant et le succès après sont deux sorties de la même comparaison : elle nomme la date retirée, puis n’affiche plus rien.
>
> **Voir le corrigé expliqué (après votre essai)**
>
> **①** Si Claude corrige et teste dans la même demande, il peut écrire un test qui passe avec sa correction. Un test qu’on n’a jamais vu échouer ne prouve pas qu’il détecte le défaut ([section 5.2](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#s5-2)). Le commit ne clôt pas le circuit : Odile relit le brouillon corrigé et décide s’il peut servir, puis la destinataire du courrier décide de ce qu’elle en fait.
>
> **②** Une demande 2 juste : « Retire le montant ajouté, relance le contrôle sur les trente brouillons et montre-moi la sortie. » Le critère : le nouveau test échouait avant et passe après, la sortie montre `30 brouillons contrôlés, 0 en échec`, et aucun autre test n’a changé d’état. Un message juste : « Retire du brouillon PASS-B-017 un montant absent du courrier, et ajoute son test ». Erreur fréquente : accepter « c’est corrigé » sans la sortie, ou un message vague comme « corrections ». Le brouillon repart ensuite chez Odile, qui tranche.
>
> **③** `git log -1 --stat` liste les fichiers que nomme votre message, et eux seuls. Pour l’exercice de passage, c’est vous qui déclarez le niveau atteint, preuves en main : s’il en manque une, refaites le geste qui la produit, pas tout l’exercice. Si Claude a corrigé sans montrer l’échec, recommencez sur une copie du défaut. Si le hook ne se déclenche pas, lisez le Conseil de la [section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/7-ecrire-ses-premieres-extensions.html#s7-2).

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/guide-en-une-page.html#toc)

![Illustration : la personne en long manteau violet et son petit compagnon de cristal cyan, emboîtent des blocs modulaires néon sur une console.](https://gmag-dev.github.io/bien-demarrer-claude-code/images/7b1d8da420a9.avif)
