> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.4.2 : « 8. Le travail en parallèle », partie 1 sur 2.
>
> - Précédent : [7. Écrire ses premières extensions : skills et hooks (partie 2 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/7-ecrire-ses-premieres-extensions-2.md)
> - Suivant : [8. Le travail en parallèle (partie 2 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/8-le-travail-en-parallele-2.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/8-le-travail-en-parallele.html#h-ch8>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## 8. Le travail en parallèle

> **🪪 Ce chapitre**
>
> **Pour qui** : toute personne à l’aise avec une session, qui a plusieurs travaux à mener dans le même dépôt, ou un lot trop gros pour une seule conversation.
>
> **Sur quel poste** : n’importe lequel, avec Claude Code, git, deux terminaux, et un dépôt qui compte au moins un commit.
>
> **Ce que vous apprenez** : confier un lot à des sous-agents et vérifier leurs rapports, puis isoler deux travaux parallèles dans deux worktrees et vérifier qu’ils ne se recoupent pas.
>
> **Deux chemins** : si vous débutez, lisez tout le chapitre et faites les trois barreaux : comptez 35 à 45 minutes pour l’exercice. Si vous répondez juste à la question ci-dessous, lisez les encadrés « Quand la règle cède », puis faites le barreau ③.
>
> **Le fil rouge** 🌉 Passerelle : le Bureau des aides de Rivelune change son barème, et soixante courriers arrivent en une semaine. Inès confie chaque courrier à un sous-agent, pendant que Bernard corrige en urgence une explication fausse du lexique, chacun dans son worktree. 🏛️ Le Cahier commun : Mei confie à un sous-agent chaque thème des contributions sur la place des Tilleuls.
>
> **Où en est Passerelle** : en arrivant, le skill « brouillon pour relecture » et la garde contre les numéros qui ressemblent à un vrai sont en place et prouvés ([chapitre 7](https://gmag-dev.github.io/bien-demarrer-claude-code/7-ecrire-ses-premieres-extensions.html#ch7)). À la fin du chapitre, deux branches sont relues, aucun fichier n’a été écrit par les deux, et Le Cahier commun a une première synthèse par thème, chaque phrase avec ses sources.

Claude Code permet de mener plusieurs travaux à la fois : à l’intérieur d’une session, en confiant des tâches à des sous-agents, et entre sessions, en donnant à chacune sa propre copie du dépôt. Le parallélisme fait gagner du temps, mais il se paie deux fois : en usage, puisque tout compte sur le même quota, et en collisions, quand deux travaux touchent les mêmes fichiers. Ce chapitre dit quand il en vaut la peine, et comment garder les travaux séparés.

> **⏭️ Vous pouvez sauter ce chapitre si…**
>
> Vous voulez faire avancer en même temps une fonctionnalité et la correction d’un bogue urgent, dans le même dépôt. Comment lancez-vous les deux sessions ? Écrivez votre réponse avant d’ouvrir la réponse attendue.
>
> **Voir la réponse attendue**
>
> Une session par worktree, jamais deux sur la même copie de travail : `claude --worktree <nom> --permission-mode manual`, avec un nom par tâche, dans deux terminaux. Chaque session a ses fichiers et sa branche. Une réponse d’experte pense aussi à la copie neuve, sans `.env` ni dépendances installées, sauf par `.worktreeinclude`, et au fait que les deux sessions consomment sur le même quota.
>
> Vous avez ces éléments ? Lisez seulement les encadrés « Quand la règle cède » et faites le barreau ③ de l’exercice. Sinon, lisez le chapitre dans l’ordre : il est écrit pour vous.

### 8.1 L’éventail des sous-agents

Un gros lot traité dans une seule conversation l’encombre, et n’avance qu’un élément à la fois. Un [sous-agent](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-sous-agent) prend une part du travail dans sa propre fenêtre de contexte, et seul son résumé revient ([section 3.4](https://gmag-dev.github.io/bien-demarrer-claude-code/3-la-fenetre-de-contexte.html#s3-4)). Il mérite son coût dans quatre situations [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices) :

- mener des travaux indépendants en même temps, pour aller plus vite,
- garder une sortie longue, comme une suite de tests complète ou une recherche large, hors de votre conversation,
- obtenir un relecteur qui n’a pas vu le travail s’écrire,
- donner à une tâche moins d’outils que la session principale, par exemple un relecteur qui ne peut que lire.

Claude délègue aussi de lui-même : les recherches larges vont à l’agent intégré Explore, et les tâches annexes sont confiées à des sous-agents qui tournent en arrière-plan pendant que votre conversation continue [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Un sous-agent ne voit ni l’historique de votre conversation, ni les skills que vous avez invoqués, ni les fichiers déjà lus : Claude lui compose un brief, et seul son résumé final revient [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents). Par défaut, il emploie le même modèle que vous, ou un plus petit : il apporte du parallélisme ou un regard neuf, pas une réponse plus intelligente [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Demandez-lui un résumé court, sans quoi ses vingt résultats finiront quand même dans votre contexte [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices).

Chez Passerelle, la vague est arrivée. Pour les dix premiers courriers, Inès lance Claude en mode Manual et demande :

```text
pour chacun des courriers PASS-C-031 à PASS-C-040, lance un sous-agent. chaque sous-agent lit .claude/skills/brouillon-pour-relecture/SKILL.md, en applique les étapes à son seul courrier, et n'écrit que le brouillon de ce courrier. rends-moi une ligne par courrier : son numéro et la dernière ligne de la sortie du contrôle
```

La règle qui tient l’ensemble est simple : un fichier, un seul écrivain. Chaque sous-agent n’écrit que son brouillon. Quand les dix lignes reviennent, Bernard ne les croit pas sur parole : `git status --short` doit lister dix fichiers nouveaux, `PASS-B-031` à `PASS-B-040`, et rien d’autre, puis il relance lui-même le contrôle sur les dix ([chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#ch5)).

Pour la relecture, Bernard a écrit un sous-agent à lui, dans `.claude/agents/relecteur-brouillon.md`. Son champ `tools` ne liste que trois outils de lecture [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents) :

```markdown
---
name: relecteur-brouillon
description: Relit un brouillon de Passerelle contre son courrier, sans rien modifier. À employer après l'écriture d'un brouillon, avant la relecture humaine.
tools: Read, Grep, Glob
---
Tu relis un brouillon que tu n'as pas écrit. Compare-le à son courrier : chaque date, chaque montant, chaque pièce à fournir.
Signale seulement ce qui manque, ce qui est ajouté ou ce qui change de sens. Ignore le style.
Rends une ligne par écart, avec la phrase du courrier et celle du brouillon.
```

Un relecteur dont le champ `tools` ne liste que `Read`, `Grep` et `Glob` ne peut pas modifier un fichier, quoi qu’il décide : la borne tient par construction, le harnais l’applique [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents). Écrivez toujours cette borne en liste blanche, les outils permis, jamais en liste d’exclusion, qui oublierait un outil. Ce que son texte lui demande, « ignore le style », ne tient que par consigne. Après lui, chaque brouillon va chez Odile, qui décide s’il sert.

🏛️ **Le Cahier commun.** Mei a reçu les contributions des habitantes et des habitants sur le réaménagement de la place des Tilleuls, chacune dans un fichier `contributions/CAH-001.txt` qui porte une ligne « Thème ». Elle commence sur 40 contributions, `CAH-001` à `CAH-040`, et lance un sous-agent par thème : les arbres et l’ombre, les jeux d’enfants, la circulation, le marché du samedi, les bancs et l’accès pour toutes et tous. Chacun ne lit que les contributions de son thème, et rend trois à cinq phrases, chacune suivie des numéros des contributions qui la fondent, comme « Plusieurs personnes demandent de l’ombre près des bancs (CAH-004, CAH-012, CAH-031). » Un rapport de sous-agent est une affirmation : avant de garder une phrase, Mei vérifie que chaque numéro cité existe, puis que la contribution dit bien cela. La synthèse reviendra aux habitantes et aux habitants avant que le conseil municipal décide.

*Dessin : L’éventail des sous-agents pendant la vague de courriers. Schéma : la description suit.*

**Figure 8.1 :** L’éventail des sous-agents pendant la vague de courriers. En bleu la session qui délègue, en gris le travail isolé, en vert ce qui revient, en tirets les gestes des personnes. D’après [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices) et [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents), schéma proposé par ce guide.

Le même éventail, en texte :

1. La session principale d’Inès envoie un brief par courrier, à un sous-agent par courrier.
2. Chaque sous-agent travaille dans son contexte isolé : il lit son courrier, écrit son brouillon, lance le contrôle.
3. Seule une ligne par courrier revient dans la conversation d’Inès.
4. Bernard vérifie `git status` et relance le contrôle, puis Odile relit chaque brouillon et décide.

> **🔀 Quand la règle cède**
>
> - Un rapport de sous-agent est une affirmation, pas une preuve : relisez ses sorties avant de vous en servir. Deux sous-agents qui écrivent dans les mêmes fichiers se gênent, d’où la règle d’un seul écrivain par fichier.
> - Ce qui tient : le brief dit ce que le sous-agent doit savoir et ce qu’il peut écrire, et la preuve se relit.
> - Pour aller plus loin : sections [15.3](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-3) et [15.6](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-6). Au [chapitre 22](https://gmag-dev.github.io/bien-demarrer-claude-code/22-une-architecture-de-reference-du-harnais.html#ch22), Bernard resserre le montage du premier jour de la vague : le sous-agent de rédaction n’a plus que des outils de lecture, il rend le brouillon dans son rapport, et la session de rédaction écrit le fichier, puis lance le contrôle.

### 8.2 Worktrees et sessions parallèles

Deux sessions ouvertes sur la même copie de travail modifient les mêmes fichiers et se contredisent, sans même le savoir. D’où la règle : une session par copie de travail.

Un [worktree](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-worktree) git est un répertoire de travail séparé, avec ses propres fichiers et sa branche, qui partage l’historique et le dépôt distant de votre copie principale [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees). Donner un worktree à chaque session permet à l’une d’avancer sur une fonctionnalité pendant qu’une autre corrige un défaut, sans que leurs modifications se percutent. 💡 Conseil : tant que vous débutez, travaillez dans une seule session à la fois, et gardez les worktrees pour le jour où deux travaux doivent vraiment avancer ensemble.

Chez Passerelle, pendant la vague, Inès améliore le [skill](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-skill) pour qu’il explique le mot « barème », qui revient dans chaque nouveau courrier. Au même moment, Odile signale que le lexique explique « avis d’imposition » par « la facture des impôts », ce qui est faux, et que cette erreur passe dans chaque brouillon. Bernard la corrige tout de suite, dans un second terminal :

```bash
claude --worktree skill-bareme --permission-mode manual
claude --worktree lexique-urgent --permission-mode manual
```

`-w` est la forme courte de `--worktree`. Le worktree est créé sous `.claude/worktrees/<nom>/` à la racine du dépôt, sur une nouvelle branche `worktree-<nom>`, et le dépôt doit compter au moins un commit [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees) [\[43\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-common-workflows). Ajoutez `.claude/worktrees/` à votre `.gitignore`. Un worktree est une copie neuve : les fichiers que git ignore, comme `.env`, n’y sont pas, et les dépendances n’y sont pas installées. Un fichier `.worktreeinclude` à la racine, de même syntaxe que `.gitignore`, liste les fichiers ignorés à recopier dans chaque nouveau worktree [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees).

Les hooks de Passerelle font partie de ces fichiers ignorés : la garde et le hook `Stop` sont déclarés dans `.claude/settings.local.json`, que git ignore ([section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/7-ecrire-ses-premieres-extensions.html#s7-2)). Selon le système, une session de worktree ne les trouve pas toujours (encadré ci-dessous). Dans chaque nouvelle session de worktree, avant toute demande, Bernard vérifie donc par `/hooks` qu’ils y figurent : la commande liste les hooks configurés et dit d’où vient chacun. S’ils manquent, il quitte la session. Le hook `Stop` contrôle pourtant la copie principale, même depuis un worktree : il reçoit `${CLAUDE_PROJECT_DIR}`, qui y reste la racine du projet de départ ([annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#ann-l), [section L.4](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-4)) [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks) [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees). Avant de committer dans son worktree, Bernard y lance donc le contrôle lui-même : `python -I -B controle_dates.py --tous`.

> **🔀 Quand la règle cède**
>
> - Sous Linux et macOS, une session de worktree lit `.claude/settings.local.json` à la racine de la copie principale, et les hooks y sont donc. Sous Windows, elle le lit dans le dossier du worktree, et un worktree neuf ne l’a pas [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-settings) [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees).
> - Ce qui tient : la vérification par `/hooks`, puis la copie du fichier. Dans la copie principale, Bernard crée le fichier `.worktreeinclude` comme tout fichier dont le nom commence par un point ([section 2.3](https://gmag-dev.github.io/bien-demarrer-claude-code/2-bien-demarrer.html#s2-3)), avec la ligne `.claude/settings.local.json`, et vérifie que `git check-ignore .claude/settings.local.json` répond par ce chemin : `.worktreeinclude` ne recopie que des fichiers ignorés. Puis il ouvre un nouveau worktree sous un autre nom, par `claude --worktree <autre-nom> --permission-mode manual`, puisque rien n’y a encore été fait. Un worktree qui contient déjà du travail ne se recrée pas : Bernard y recopie le fichier à la main, puis vérifie de nouveau par `/hooks`.
> - Pour aller plus loin : [annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#ann-l), [section L.4](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-4).

> **⚠️ Attention**
>
> Chaque fichier que `.worktreeinclude` recopie est une copie de plus, dans chaque worktree : un secret qu’on y liste se multiplie. N’y mettez que le strict nécessaire pour que le travail tourne, jamais un fichier de vraies données, et retirez les worktrees qui ne servent plus.

Le nettoyage est en grande partie automatique : en quittant un worktree sans modification, Claude le supprime avec sa branche. S’il contient du travail, il vous demande s’il faut le garder [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees). Les sous-agents peuvent aussi travailler chacun dans leur worktree : demandez-le dans votre prompt, ou ajoutez `isolation: worktree` à la définition d’un sous-agent [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees).

Quand chaque session a commité sur sa branche, et avant toute intégration, Bernard vérifie que les deux branches ne se recoupent pas. Les commandes ne voient que les commits : une branche sans commit montre une liste vide, qui ne prouve rien. Chaque commande liste les fichiers qu’une branche a changés depuis `main`, la branche principale, nommée dès `git init -b main` ([section 2.1](https://gmag-dev.github.io/bien-demarrer-claude-code/2-bien-demarrer.html#s2-1)) :

```bash
git diff --name-only main...worktree-skill-bareme
git diff --name-only main...worktree-lexique-urgent
```

La première liste `.claude/skills/brouillon-pour-relecture/SKILL.md`, la seconde `lexique.md`. Aucun fichier en commun : les deux branches se relisent et s’intègrent l’une après l’autre ([chapitre 11](https://gmag-dev.github.io/bien-demarrer-claude-code/11-commits-et-collaboration.html#ch11)).

*Dessin : Deux worktrees pendant la vague, un dépôt partagé. Schéma : la description suit.*

**Figure 8.2 :** Deux worktrees pendant la vague, un dépôt partagé. En gris le dépôt et la copie principale, en bleu les deux sessions, en ambre ce que la copie neuve n’a pas, en vert la vérification. D’après [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees), schéma proposé par ce guide.

Les mêmes copies, en texte :

1. Le dépôt git partagé garde l’historique et les branches.
2. La copie principale reste sur `main`. Le worktree `skill-bareme` porte la session d’Inès, le worktree `lexique-urgent` celle de Bernard, chacun sur sa branche.
3. Chaque copie a ses fichiers. `.env` et les dépendances en sont absents, sauf par `.worktreeinclude`.
4. Avant l’intégration, et après le commit de chaque branche, les deux listes de fichiers changés ne doivent avoir aucune ligne commune.

> **🎓 Fonctions avancées et bonnes pratiques : les worktrees**
>
> - **La base.** `worktree.baseRef` vaut `fresh`, la branche par défaut du dépôt distant, ou `head`, votre état local, commits non poussés compris [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees).
> - **Depuis une demande de fusion.** `claude --worktree "#1234"`, ou l’adresse d’une demande GitHub ou GitLab, crée le worktree sur ce changement [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees).
> - **L’isolation appliquée.** Dans un worktree, Claude Code refuse une écriture dans la copie principale et une commande qui y tourne [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees).
> - **Le découpage.** `/batch` découpe un grand changement en 5 à 30 unités, une par sous-agent dans son worktree [\[67\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-commands).
> - **Le piège.** Les contrôles d’isolation lisent le texte des commandes : un `cp` ou une redirection du shell vers la copie principale leur échappe [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees).
>
> Toutes les fonctions avancées, les bonnes pratiques et les pièges : [annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#ann-l), [section L.14](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-14).

> **🔀 Quand la règle cède**
>
> - Un worktree isole les fichiers, rien d’autre. L’historique, le dépôt distant et tout ce qui vit hors du dossier, comme une base de données locale, restent communs.
> - Ce qui tient : une ressource partagée se réserve avant d’être touchée.
> - Pour aller plus loin : sections [19.3](https://gmag-dev.github.io/bien-demarrer-claude-code/19-plusieurs-sessions-en-parallele.html#s19-3) et [19.6](https://gmag-dev.github.io/bien-demarrer-claude-code/19-plusieurs-sessions-en-parallele.html#s19-6).

### 8.3 Ce que coûte le parallélisme, et ce que supporte le poste

Chaque session et chaque sous-agent envoient leurs propres requêtes, décomptées sur le même quota que la session principale [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices) [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-costs). Un sous-agent neuf doit en outre réunir un contexte que votre conversation avait déjà, et peut donc être plus lent que la tâche faite sur place [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices).

Pour réduire la facture : un modèle léger, `model: haiku`, pour les sous-agents aux tâches simples, des résumés courts, et un coup d’œil à `/usage`, qui montre la part des sous-agents dans votre consommation ([chapitre 9](https://gmag-dev.github.io/bien-demarrer-claude-code/9-usage-et-cout-sans-credits-d-usage.html#ch9)) [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-costs).

Le parallélisme pèse aussi sur votre machine. Chaque session est un programme qui tourne sur votre poste, avec sa mémoire. Chaque worktree est une copie des fichiers du dépôt, et ses dépendances s’y installent à nouveau [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees). Chaque suite de tests lancée en parallèle occupe le processeur. Ce guide propose trois gestes :

- **avant d’ouvrir une troisième session ou un lot lourd**, regardez la mémoire et le disque libres dans l’outil de votre système : le Gestionnaire des tâches sous Windows, le Moniteur d’activité sous macOS, `free -h` et `df -h` sous Linux. Fixez votre propre seuil, à calibrer sur votre machine, en dessous duquel vous n’en ouvrez pas,
- **retirez les worktrees qui ne servent plus** : `git worktree list` les montre, et Claude propose de supprimer ceux qu’il a créés quand vous les quittez,
- **surveillez aussi votre propre contexte** : `/context` montre le remplissage de la conversation ([chapitre 3](https://gmag-dev.github.io/bien-demarrer-claude-code/3-la-fenetre-de-contexte.html#ch3)). Un sous-agent garde sa sortie longue hors d’elle, et `/clear` ou `/compact` se décident avant qu’elle sature.

Nouveau · 20 nov. 2026 **La mémoire vive, d’abord.** Plusieurs sessions longues, leurs sous-agents et leurs contrôles se partagent la mémoire vive du poste. Quand elle s’épuise, le système écrit sur le disque, et tout le poste ralentit, sessions comprises. Ce guide ne fixe pas de plancher : la mémoire qu’il faut dépend du projet, de ses outils et du nombre de sessions. Mesurez plutôt. Regardez la mémoire libre avant un lot, puis pendant, commencez à deux sous-agents ou à un worktree de plus, et fixez votre seuil sur ce que vous observez. Si le poste ralentit, revenez à une session à la fois : deux worktrees menés l’un après l’autre donnent le même résultat, plus lentement. Quand la mémoire est comptée, fermez le plus possible des programmes qui ne servent pas au lot, surtout avant une nuit de travail autonome ([section 19.7](https://gmag-dev.github.io/bien-demarrer-claude-code/19-plusieurs-sessions-en-parallele.html#s19-7)), un lot tout en agents ou une forte charge. Ce guide vous conseille de fermer d’abord les gros consommateurs d’aujourd’hui : les assistants comme Microsoft Copilot, les messageries comme Teams, les navigateurs web et leurs onglets, et les IDE ouverts qui ne servent pas. Le Gestionnaire des tâches, trié par mémoire, ou le Moniteur d’activité, vous montre les vôtres.

Un exemple, mesuré le 20 novembre 2026 au matin sur un portable de 32 Go, dont 31,6 Go utilisables, avec seize sessions ouvertes dans l’application de bureau de Claude. Cette application occupait à elle seule 114 processus et environ 13 Go, soit près de 0,8 Go par session. Il restait 5,9 Go libres. Et Windows avait déjà promis aux programmes 45 Go de mémoire, plus que la mémoire physique : le surplus repose sur le fichier d’échange, sur le disque, bien plus lent que la mémoire vive. Cette mesure dit qu’un poste de 32 Go est tendu à seize sessions. Elle ne dit pas qu’un poste plus petit ne peut pas en mener deux.

Chez Passerelle, l’ordinateur de la permanence, un portable partagé par les bénévoles, ralentissait dès que dix sous-agents lançaient leurs contrôles à la fois. Bernard demande désormais de les lancer trois par trois : la vague avance un peu moins vite, et l’ordinateur reste utilisable pour l’accueil. 🏛️ Mei, elle, a mesuré dans `/usage` ce qu’a coûté son éventail de cinq sous-agents sur 40 contributions, avant de le lancer sur les 400 ([chapitre 9](https://gmag-dev.github.io/bien-demarrer-claude-code/9-usage-et-cout-sans-credits-d-usage.html#ch9)).

> **🔀 Quand la règle cède**
>
> - Pour les équipes d’agents, plusieurs sessions de Claude qui travaillent ensemble ([section 15.7](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-7)), une fonction désactivée par défaut, la documentation estime la consommation à environ sept fois celle d’une session standard quand les coéquipiers tournent en mode plan, et chaque coéquipier actif consomme jusqu’à sa fermeture [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-costs). Ce facteur est une estimation : mesurez votre cas avec `/usage` avant de vous y fier.
> - Ce qui tient : paralléliser se justifie par un gain mesuré, en temps comme en usage, et par une machine qui suit.
> - Pour aller plus loin : sections [15.6](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-6) et [20.7](https://gmag-dev.github.io/bien-demarrer-claude-code/20-piloter-sa-consommation-et-son-projet.html#s20-7).
