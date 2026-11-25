> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.2.1 : « 2. Bien démarrer », partie 1 sur 2.
>
> - Précédent : [1. Ce qu’est Claude Code](https://gmag-dev.github.io/bien-demarrer-claude-code/md/1-ce-qu-est-claude-code.md)
> - Suivant : [2. Bien démarrer (partie 2 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/2-bien-demarrer-2.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-ch2>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## 2. Bien démarrer

> **🪪 Ce chapitre**
>
> **Pour qui** : toute personne qui installe Claude Code, ou qui s’en sert sans avoir choisi son mode de permission.
>
> **Sur quel poste** : macOS, Windows ou Linux, dans un terminal ou dans l’extension de votre éditeur, avec un abonnement qui donne accès à Claude Code (voir « Prérequis », avant le [chapitre 1](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch1)). Le détail de chaque système est à l’[annexe C](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-c).
>
> **Ce que vous apprenez** : installer, lancer en mode Manual, se connecter, et écrire un `CLAUDE.md` court qui passe le test des deux questions.
>
> **Deux chemins** : si vous débutez, lisez tout le chapitre et faites les trois barreaux : comptez 25 à 40 minutes pour l’exercice. Si vous répondez juste à la question ci-dessous, lisez les encadrés « Quand la règle cède » des sections [2.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-1) à [2.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-4), l’encadré « La limite » de la [section 2.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-3) et la dernière ligne des tableaux à trois niveaux, et faites le barreau ③.
>
> **Le fil rouge** 🌉 Passerelle : Inès installe Claude Code sur le poste de la permanence et écrit le `CLAUDE.md` de Passerelle avec Samia. Elle essaie les modes de permission sur le dossier des courriers, et Odile relit les règles des brouillons.
>
> **Où en est Passerelle** : en arrivant, un dossier de projet avec dix courriers fictifs, `PASS-C-001` à `PASS-C-010`, et une première règle, « l’outil n’envoie jamais rien », nommée comme une règle imposée. À la fin du chapitre, un `CLAUDE.md` de moins de vingt lignes, chargé, et vérifié par `/context`.

Une première session se joue sur trois réglages : où vous lancez Claude Code, ce qu’il lit de vous avant toute demande, et ce qu’il peut faire sans vous demander. Mal réglés, ils ne se voient pas tout de suite : on découvre trop tard qu’une commande est passée sans accord. Ce chapitre règle les trois, dans cet ordre.

> **⏭️ Vous pouvez sauter ce chapitre si…**
>
> Vous ouvrez Claude Code pour la première fois sur votre projet d’essai, aux données inventées. Quelles sont vos deux premières commandes, et depuis quel dossier ? Écrivez votre réponse avant d’ouvrir la réponse attendue.
>
> **Voir la réponse attendue**
>
> Depuis le dossier du projet, pas votre dossier personnel, où la confiance accordée au dossier n’est pas enregistrée [\[21\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-security) : `claude --version` pour vérifier l’installation, puis `claude --permission-mode manual`. Sans cette option, une session interactive du terminal ou de VS Code démarre en mode auto 🕘 depuis la version 2.1.283, s’il est disponible pour votre modèle et votre compte, et sinon en Manual [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permission-modes). Viennent ensuite `/init`, et un `CLAUDE.md` réduit à ce que Claude ne peut pas deviner, sous 200 lignes [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices).
>
> Vous avez ces éléments ? Lisez seulement les encadrés « Quand la règle cède » des sections [2.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-1) à [2.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-4), l’encadré « La limite » de la [section 2.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-3) et la dernière ligne des tableaux à trois niveaux, puis faites le barreau ③ de l’exercice. Les sections [2.6](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-6) et [2.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-7) ne concernent que Linux et WSL. Sinon, lisez le chapitre dans l’ordre : il est écrit pour vous.

### 2.1 Le dossier d’essai, installer, lancer, se connecter

L’abonnement, le système, le terminal et Python sont dans « Prérequis », avant le [chapitre 1](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch1). Il vous faut encore un dossier d’essai et git.

> **⚠️ Attention**
>
> Sur un poste fourni par votre employeur, cette section attend l’accord de la personne qui gère le poste : n’installez ni git ni Claude Code, et ne connectez aucun compte, avant ses réponses aux quatre questions de l’encadré des « Prérequis ». Le compte que vous connecterez à l’étape 4 est celui qu’elle autorise, et des données de l’employeur ne passent que par le compte que l’organisation fournit. Chez vous, sur votre propre ordinateur et avec votre propre compte, rien n’attend : suivez les étapes.

**Un dossier d’essai**, pour votre projet d’essai aux données inventées. Sans lui, vous essaieriez Claude Code sur vos vrais fichiers. Ce guide en fournit un, `exemples/mon-essai/` : trois courriers inventés d’organismes fictifs de Rivelune, la commune du fil rouge, et le contrôle de référence `controle_dates.py`, pour le chemin avec code. Il est livré dans le paquet du guide, un fichier `guide-claude-code-v<version>.zip`, où `<version>` est le numéro de version de la page de titre, par exemple `3.2.1` : c’est le fichier que vous avez reçu avec ce guide, ou que vous téléchargez sur son site ([annexe D](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-d), « Où la trouver »). Décompressez-le, copiez `mon-essai` dans votre dossier personnel, par le terminal ou à la souris, puis, dans le terminal, `cd ~/mon-essai`. La [section C.9](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-c-9) donne les commandes de chaque système, et ce qu’il faut faire sans le paquet ou si un dossier `mon-essai` existe déjà. C’est ce dossier, jamais le dossier personnel, que vous ouvrirez à Claude Code. Son `README.md` dit quoi y faire.

**[git](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-git) en cinq minutes.** git garde l’historique de votre dossier, et ce guide s’en sert dès le [chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch5). `git --version` dit s’il est installé [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup). Sinon, installez Git for Windows depuis git-scm.com sous Windows, acceptez les outils de développement que macOS propose à la première commande `git`, ou lancez `sudo apt install git-all` sous Ubuntu [\[22\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-git-installer). Puis vérifiez s’il connaît l’adresse qu’il écrit dans chaque [commit](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-commit) : s’il en affiche une, gardez-la [\[23\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-git-first-setup).

```bash
git config --global user.email
```

S’il n’affiche rien, donnez-lui, une fois par poste, votre nom et votre adresse :

```bash
git config --global user.name "Prénom Nom"
git config --global user.email "vous@example.org"
```

Enfin, dans le dossier d’essai, faites-en un [dépôt](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-depot), et enregistrez son état de départ par un premier commit, en nommant ses fichiers et son dossier `documents` [\[24\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-git-init) [\[25\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-git-commit). Sous macOS, un geste s’ajoute d’abord (encadré ci-dessous).

```bash
git init -b main
git add README.md controle_dates.py test_controle_dates.py documents
git commit -m "État de départ du dossier d'essai"
git log --oneline
git status
```

`git log --oneline` affiche une seule ligne, qui finit par « État de départ du dossier d’essai », et `git status` ne trouve plus rien à committer. Les commits suivants ne montreront ainsi que ce qui change ([section 5.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s5-5)).

> **🔀 Quand la règle cède**
>
> - Sous macOS, écrivez d’abord la ligne `.DS_Store` dans un fichier `.gitignore`, par `echo .DS_Store > .gitignore`, et ajoutez `.gitignore` à la deuxième ligne, juste après `git add` : la [section C.9](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-c-9) dit pourquoi, et ce que devient cette ligne sans le paquet. L’option `-b main` et son remplacement pour un Git plus ancien que la version 2.28 sont à la [section C.9](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-c-9).
> - Ce qui tient : la vérification par `git log --oneline`, qui affiche une seule ligne, et par `git status`, qui ne trouve plus rien à committer.
> - Pour aller plus loin : [annexe C](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-c), [section C.9](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-c-9).

**Installer, lancer, se connecter.** Gardez votre système et la façon dont vous travaillez déjà : l’extension de votre éditeur si vous codez dans [VS Code](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-vs-code) ou Cursor, le terminal sinon. Ces façons de travailler s’appellent des [surfaces](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-surface) : terminal, extensions d’éditeur, application de bureau, version web. Toutes reposent sur le même moteur, et les fichiers `CLAUDE.md` et les réglages d’un projet valent partout [\[26\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-overview), sauf pour le mode de départ, qu’une session cloud ou l’extension VS Code peuvent ne pas reprendre ([section C.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-c-1)) [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permission-modes).

1. **Installer.** Copiez la seule commande de votre système. L’installation native se met ensuite à jour seule [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup).
2. **Vérifier.** Dans un nouveau terminal, `claude --version` affiche un numéro de version.
3. **Lancer depuis le dossier du projet**, en mode Manual : Claude vous demande avant chaque modification et la plupart des commandes, et les lectures passent sans demande [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permission-modes). Un jeu de commandes de lecture, comme `cat`, `grep`, `find` ou `head`, passe aussi sans demande, même en Manual [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permissions).
4. **Se connecter.** Au premier lancement, Claude Code ouvre le navigateur pour vous connecter à votre compte. Chez vous, c’est le compte claude.ai de votre abonnement Pro, Max ou Ultra ; dans une organisation, celui auquel elle vous a invité [\[27\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-authentication). Si le navigateur affiche un code au lieu de revenir au terminal, collez-le à l’invite `Paste code here` [\[27\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-authentication). Claude Code demande ensuite si vous faites confiance au dossier. Depuis un dossier de projet, votre réponse est enregistrée [\[21\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-security).

macOS, Linux et WSL, dans le terminal [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup) :

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Windows, dans PowerShell, sans droits d’administration [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup) :

```powershell
irm https://claude.ai/install.ps1 | iex
```

Ces commandes téléchargent un programme et le lancent aussitôt, avec vos droits. Le mode auto bloque ce motif, `curl | bash`, quand Claude le tente ([section 2.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-3)) : ici, c’est vous qui le lancez. Copiez-les depuis ce guide ou depuis la page d’installation d’Anthropic, jamais depuis un message ou un site tiers, et vérifiez l’adresse `claude.ai` avant d’appuyer sur Entrée.

Puis, dans un nouveau terminal :

```bash
claude --version
cd ~/mon-essai
claude --permission-mode manual
```

Dans l’extension VS Code, le réglage `claudeCode.initialPermissionMode` mis à `manual` fait démarrer chaque conversation en Manual. Il se lit dans vos réglages utilisateur, jamais dans ceux du dépôt [\[28\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-vs-code). Dans l’application de bureau, choisissez Manual dans le sélecteur de mode, sous la zone de saisie. Un `defaultMode` de vos réglages peut s’imposer à une nouvelle session : vérifiez le sélecteur avant votre premier message [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permission-modes).

Chez Passerelle, Inès installe Claude Code sur le poste de la permanence, sous Linux, et le lance dans le dossier `passerelle`.

*Dessin : Le premier lancement, de l’installation à la connexion. Schéma : la description suit.*

**Figure 2.1 :** Le premier lancement. En bleu le lancement et la question, en ambre le cas sans navigateur, en tirets votre geste. Schéma proposé par ce guide, d’après [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup) et [\[27\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-authentication).

Le même parcours, en texte :

1. Choisissez la surface, puis installez avec la commande de votre système.
2. Vérifiez par `claude --version`, puis lancez Claude Code en mode Manual depuis le dossier du projet.
3. Si le navigateur s’ouvre, connectez-vous. Sinon, ouvrez l’adresse affichée sur un autre appareil et collez le code ([annexe C](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-c)).
4. Lisez la question de confiance avant d’y répondre.

Le détail de chaque système, du cloud au diagnostic ([section C.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-c-7)) et à la désinstallation, est à l’[annexe C](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-c).

> **⚠️ Attention**
>
> Lancer Claude Code dans votre dossier personnel lui ouvre tous ses sous-dossiers [\[13\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-how-claude-code-works), et la question de confiance y revient à chaque lancement [\[21\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-security). Lancez-le toujours dans le dossier d’un projet. Et ce dossier ne reçoit jamais une donnée de client ou d’employeur, ni le vrai courrier d’une personne : ce que Claude lit part vers le modèle ([section 1.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s1-3)).

> **🎓 Fonctions avancées et bonnes pratiques : l’application de bureau**
>
> - **Les panneaux.** Modifications, Navigateur, Terminal, Fichiers, Plan, Tâches d’arrière-plan et sous-agents, déplaçables, détachables dans une fenêtre et réduisibles [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-desktop).
> - **L’aperçu.** `.claude/launch.json` déclare les serveurs de développement, et « Auto-verify changes » est actif par défaut, à garder ainsi quand Claude touche une interface web [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-desktop).
> - **La relecture.** Un commentaire par ligne dans le panneau des modifications, envoyés ensemble par `Ctrl+Enter` [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-desktop).
> - **Les vues.** Normal, Thinking et Verbose, par `Ctrl+O`, et une question à côté, non enregistrée, par `/btw` [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-desktop).
> - **Le piège.** Une session WSL de l’application ne prend aucun plugin, et une session du cloud ne voit pas ceux du poste [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-desktop).
>
> Toutes les fonctions avancées, les bonnes pratiques et les pièges : [annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-l), [section L.17](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-17).

### 2.2 Le fichier CLAUDE.md et la mémoire

Chaque session commence sans rien savoir de votre projet ni de vos règles, et vous répéteriez sans fin les mêmes consignes. Écrivez dans `CLAUDE.md` seulement ce que Claude ne peut pas trouver en lisant le projet [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices). Chaque session commence avec un contexte vierge. Deux mécanismes portent la connaissance d’une session à l’autre : les fichiers [CLAUDE.md](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-claude-md), que vous écrivez, et la [mémoire automatique](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-memoire-automatique), des notes que Claude prend lui-même à partir de vos corrections. Les deux sont chargés au début de chaque session, comme du contexte, pas comme une configuration imposée [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-memory).

Gardez-le sous 200 lignes : chargé dans chaque session, un fichier plus long coûte du contexte et se suit moins bien [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices) [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-memory).

Ce qui y va : les commandes exactes de test, les endroits trompeurs (un vieux motif à ne pas recopier, un dossier qui semble mort mais sert encore), les décisions prises hors du dépôt, et ce que vous avez déjà dû corriger deux fois. Le test tient en deux questions : Claude pourrait-il le trouver en lisant le projet, et irait-il vraiment regarder ? Si la réponse est oui aux deux, n’écrivez rien [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices).

Lancez `/init` pour obtenir une première version, puis travaillez surtout à retirer des lignes. `/context` montre que le fichier est chargé, et `/memory` ouvre les fichiers chargés pour les modifier [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices) [\[30\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-context-window).

Le `CLAUDE.md` de Passerelle, écrit par Inès avec Samia, tient en seize lignes :

```markdown
# Passerelle : brouillons pour relecture
Outil local de l'association Passerelle (fictive). Il tire de chaque courrier
un brouillon en langage facile, pour une personne concernée qui relit et décide.

# Règles des brouillons
- Le brouillon de courriers/PASS-C-nnn.txt s'écrit dans brouillons/PASS-B-nnn.md
- Il commence par la ligne « Brouillon pour relecture »
- Il garde chaque date et chaque montant du courrier
- Une idée par phrase, un délai par phrase
- Les règles de rédaction de Samia sont dans regles-redaction.md : lis-les avant chaque brouillon

# Interdits
- N'envoie rien : ni courriel, ni formulaire, ni message (règle à imposer, chapitre 10)
- Le dossier ne contient que des courriers fictifs préfixés PASS-
- Un fichier sans ce préfixe : arrête-toi et signale-le
- modeles/ garde d'anciens brouillons, écrits avant ces règles : ne recopie pas leur style
```

Odile relit les règles des brouillons avant qu’Inès les garde : c’est elle qui a demandé « un délai par phrase ».

Les fichiers d’instructions vivent à plusieurs étages, qui s’additionnent : tous ceux du dossier courant et des dossiers parents sont lus, du plus large au plus précis, et le plus proche de votre dossier de travail est lu en dernier [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-memory).

**Tableau 2.1 :** Où placer les fichiers CLAUDE.md, d’après [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-memory).

| Étage | Emplacement | Pour quoi | Partagé avec |
| --- | --- | --- | --- |
| Organisation | un emplacement système fixé par l’organisation | ses normes et ses politiques | toute l’organisation |
| Utilisateur | `~/.claude/CLAUDE.md`, où `~` désigne votre dossier personnel | vos préférences pour tous vos projets | vous seule ou vous seul |
| Projet | `./CLAUDE.md` | les consignes de l’équipe pour ce projet | l’équipe, par git |
| Local | `./CLAUDE.local.md`, à ajouter au `.gitignore` | vos préférences pour ce projet seulement | vous seule ou vous seul |

Ces fichiers ne sont pas seuls dans le dossier du projet : où se rangent aussi les réglages, comme `.claude/settings.local.json`, les skills et les agents, et lesquels se partagent avec l’équipe, l’arborescence de l’[annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-l), [section L.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-1), le montre.

> **🎓 Fonctions avancées et bonnes pratiques : la mémoire**
>
> - **Les imports.** `@chemin` importe un fichier, relatif au fichier qui l’appelle, jusqu’à quatre niveaux [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-memory).
> - **Les règles.** Une règle de `.claude/rules/` à champ `paths` ne se charge que quand Claude lit ou modifie un fichier qui correspond [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-memory).
> - **La mémoire automatique.** Elle vit dans `~/.claude/projects/<projet>/memory/`, et les 200 premières lignes ou 25 Ko de `MEMORY.md` se chargent à chaque session [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-memory).
> - **Ce qui ne coûte rien.** Les commentaires HTML de bloc sont retirés avant l’injection : les notes pour qui maintient le fichier ne coûtent rien [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-memory).
> - **Le piège.** Une consigne de mémoire ne bloque rien : pour bloquer, un hook `PreToolUse` [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-memory).
>
> Toutes les fonctions avancées, les bonnes pratiques et les pièges : [annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-l), [section L.9](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-9).

> **🔀 Quand la règle cède**
>
> - `CLAUDE.md` est une consigne : une ligne y est suivie presque toujours, sans garantie ([section 1.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s1-4)). Un `CLAUDE.md` modifié en cours de session ne s’applique qu’au prochain `/clear`, `/compact` ou redémarrage [\[31\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-prompt-caching). Si le dépôt a déjà un `AGENTS.md`, écrit pour d’autres outils, Claude le lit à la place, mais seulement en l’absence de `CLAUDE.md` et de `CLAUDE.local.md` [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-memory). Pour garder les deux, écrivez dans votre `CLAUDE.md` une ligne `@AGENTS.md`, qui l’importe.
> - Ce qui tient : ce qui doit arriver toujours, ou jamais, va dans une règle imposée, que le harnais applique : elle tient [par construction](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-par-construction), avec ses limites ([section 17.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-3) et [chapitre 18](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch18)).
> - Pour aller plus loin : [section 21.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-7).
