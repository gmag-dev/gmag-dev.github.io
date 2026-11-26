> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.3.0 : « Annexe C. Installer par système », partie 1 sur 2.
>
> - Précédent : [Annexe B. Glossaire (partie 2 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-b-glossaire-2.md)
> - Suivant : [Annexe C. Installer par système (partie 2 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-c-installer-par-systeme-2.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-ann-c>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## Annexe C. Installer par système

Le [chapitre 2](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch2) suit un seul chemin d’installation, pour ne pas noyer la débutante sous les variantes. Cette annexe donne tous les autres, système par système : macOS, Windows natif, Ubuntu en serveur et en poste de bureau, Windows avec [WSL](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-wsl), puis la mise à jour, le diagnostic et la désinstallation. Viennent ensuite un tableau pour qui vient d’un autre assistant de programmation, puis le dossier d’essai et git, pas à pas, pour la [section 2.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-1). Chaque chemin a les mêmes quatre étapes : installer, vérifier, lancer en [mode Manual](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-mode-manual), se connecter. Lisez seulement la section de votre système.

### C.1 Choisir son chemin

Sur un poste fourni par une organisation, rien de cette annexe ne s’installe avant son accord : l’encadré en tête des « Prérequis » dit les questions à poser. Il faut d’abord un abonnement Pro, Max, Ultra, Team ou Enterprise, ou un compte de la console Anthropic : l’offre gratuite de claude.ai ne donne pas accès à Claude Code [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup). La machine demande au moins 4 Go de mémoire vive, un processeur x64 ou ARM64 et une connexion à internet. Les systèmes pris en charge sont macOS 13.0 ou plus récent, Windows 10 version 1809 ou plus récent, Windows Server 2019 ou plus récent, Ubuntu 20.04 ou plus récent, Debian 10 ou plus récent et Alpine Linux 3.19 ou plus récent [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup).

Toutes les [surfaces](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-surface), le terminal, l’extension d’un éditeur, l’application de bureau ou le web, reposent sur le même moteur : les fichiers `CLAUDE.md`, les réglages et les serveurs [MCP](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-mcp) d’un dépôt fonctionnent partout [\[26\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-overview). Le mode de départ fait exception. Une session cloud ignore, sans le dire, un `defaultMode` à `dontAsk` ou à `bypassPermissions` venu des fichiers de réglages, et démarre dans le mode choisi dans son sélecteur. L’extension VS Code ne lit pas les réglages du projet pour son mode de départ [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permission-modes). Avant d’y reprendre une procédure écrite pour le terminal, vérifiez le mode de la session. Choisir son système ne vous enferme donc pas. La figure suivante part de votre poste.

*Dessin : Quel chemin pour installer Claude Code. Schéma : la description suit.*

**Figure :** Quel chemin pour installer Claude Code. En bleu les questions, en vert les chemins sur votre poste, en ambre le cloud, qui sort de votre poste. Arbre de décision proposé par ce guide, d’après [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup) et [\[167\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-claude-code-on-the-web).

Le même choix, en texte :

1. Sur un Mac, suivez la [section C.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-c-2).
2. Sur un PC sous Windows, gardez Windows natif ([section C.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-c-3)) si vos projets et vos outils sont propres à Windows. Sinon, ou si vous voulez le bac à sable, prenez WSL ([section C.6](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-c-6)).
3. Sous Linux sans écran ni navigateur, suivez Ubuntu Server ([section C.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-c-4)). Avec un poste de bureau, Ubuntu Desktop ([section C.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-c-5)).
4. Sans poste à vous, le cloud ne demande rien à installer : sa ligne du tableau suivant dit ce qui en sort.

**Tableau :** Le pour et le contre de chaque chemin, d’après [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup), [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing) et [\[167\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-claude-code-on-the-web), et les sources citées dans chaque cellule. La mention « pratique du guide » signale un conseil de ce guide.

| Chemin | Pour : ce qu’il apporte | Contre : ses limites |
| --- | --- | --- |
| macOS | installation native, qui se met à jour seule [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup). Bac à sable intégré au système [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing) | demande macOS 13.0 ou plus récent [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup) |
| Windows natif | aucun droit d’administration, vos projets et vos outils Windows tels quels [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup) | pas de [bac à sable](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-bac-a-sable). Sans Git for Windows, pas d’outil Bash [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup) |
| WSL, tout sous Linux | outils Linux et bac à sable, avec WSL 2 [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup). Fichiers et outils dans le même système, plus rapide que de traverser vers `/mnt/c` [\[168\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-wsl-filesystems) | une machine virtuelle qui peut prendre jusqu’à la moitié de la mémoire de Windows [\[169\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-wsl-config). Git et vos outils à installer aussi côté Linux [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup) |
| WSL en hybride | éditeur, navigateur et bureautique sous Windows, build et tests sous Linux, l’éditeur connecté au projet rangé côté Linux [\[170\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-wsl-vscode) | deux installations à tenir à jour (pratique du guide). Lire les fichiers de l’autre système est lent [\[171\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-wsl-compare-versions), et la recherche de Claude peut y trouver moins de résultats [\[172\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-troubleshooting) |
| Linux de bureau | la même commande que sur un serveur. Bac à sable avec `bubblewrap` et `socat` [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing) | application de bureau encore en bêta, sur Ubuntu 22.04 ou plus et Debian 12 ou plus, sans contrôle de l’écran ni dictée [\[173\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-desktop-linux) |
| Linux serveur | le projet et la puissance de la machine, joignables par [SSH](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-ssh) (pratique du guide). Dans [tmux](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-tmux), la session survit à une coupure [\[174\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-tmux-getting-started) | pas de navigateur : la connexion se termine sur un autre appareil [\[38\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-troubleshoot-install). Claude agit avec les droits de votre compte sur le serveur |
| Cloud | rien à installer. Ouvrez `claude.ai/code`, ou l’onglet Code de l’application Claude sur téléphone. La session tourne dans une machine virtuelle gérée par Anthropic, continue ordinateur fermé, et plusieurs tâches tournent en parallèle [\[167\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-claude-code-on-the-web) | cloner et pousser demandent GitHub, et la session clone la branche telle qu’elle est sur GitHub, sans vos commits locaux ni vos modifications non commitées. Un dépôt envoyé sans GitHub part en paquet, avec les modifications non commitées des fichiers suivis, même dans un fichier sensible sous Windows natif. La session compte dans les limites du forfait, et le cloud est fermé aux organisations en conservation zéro des données [\[167\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-claude-code-on-the-web) |

> **⚠️ Attention**
>
> Le cloud fait sortir votre code de votre poste. Avant d’envoyer un dépôt, vérifiez ce qu’il contient, modifications non commitées comprises : aucun secret, aucune donnée réelle d’une personne. Dans le doute, travaillez en local ([chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23)).

> **💡 Conseil**
>
> Si vous débutez, gardez votre système et la surface où vous travaillez déjà : l’extension de votre éditeur si vous codez dans VS Code ou Cursor, le terminal sinon. Chez Passerelle 🌉, les bénévoles n’ont pas tous le même poste : le [chapitre 2](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch2) en suit un, cette annexe sert aux autres.

**Le mode Manual sur chaque surface.** Dans le terminal, l’option `--permission-mode manual` le choisit au lancement, et Maj+Tab fait défiler les modes pendant la session [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permission-modes). Dans l’extension VS Code, le réglage `claudeCode.initialPermissionMode` à `manual` fait démarrer chaque nouvelle conversation en Manual. Il se lit dans vos réglages utilisateur, jamais dans ceux du dépôt [\[28\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-vs-code). Dans l’application de bureau, choisissez Manual dans le sélecteur de mode, sous la zone de saisie. Un `defaultMode` de vos réglages peut s’imposer à une nouvelle session : vérifiez le sélecteur avant votre premier message [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permission-modes).

### C.2 macOS

**Installer.** Dans le Terminal, lancez la commande d’installation native. Elle n’affiche aucune progression pendant le téléchargement, puis l’installation se met à jour seule en arrière-plan [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup).

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Homebrew existe aussi, mais ne se met pas à jour seul : lancez de temps en temps `brew upgrade claude-code` [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup).

```bash
brew install --cask claude-code
```

> **⚠️ Attention**
>
> Ces commandes téléchargent un programme et le lancent aussitôt, avec vos droits. Copiez-les depuis ce guide ou depuis la page d’installation d’Anthropic, jamais depuis un message ou un site tiers, et vérifiez l’adresse `claude.ai` avant d’appuyer sur Entrée. Ne lancez qu’une seule des deux : chacune installe.

**Vérifier.** Ouvrez un nouveau terminal, puis demandez la version :

```bash
claude --version
```

Si le shell répond que `claude` est introuvable, son dossier n’est pas encore dans le [PATH](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-path). Sous zsh, le shell par défaut de macOS, ajoutez `export PATH="$HOME/.local/bin:$PATH"` à `~/.zshrc`, puis ouvrez un nouveau terminal [\[38\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-troubleshoot-install).

**Lancer.** Depuis le dossier du projet, en mode Manual :

```bash
cd mon-projet
claude --permission-mode manual
```

Au premier lancement dans un dossier, Claude Code demande si vous lui faites confiance. Lancé dans votre dossier personnel, cet accord ne vaut que pour la session en cours, et la question revient à chaque fois. Depuis un dossier de projet, il est enregistré pour ce dossier [\[21\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-security).

**Se connecter.** Au premier lancement, Claude Code ouvre le navigateur pour la connexion à votre compte Claude ou à la console. Si le navigateur affiche un code au lieu de revenir au terminal, collez-le à l’invite `Paste code here` [\[27\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-authentication).

### C.3 Windows natif

**Installer.** Dans PowerShell, sans droits d’administration, lancez la commande d’installation [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup) :

```powershell
irm https://claude.ai/install.ps1 | iex
```

WinGet existe aussi, mais ne se met pas à jour seul : lancez de temps en temps `winget upgrade Anthropic.ClaudeCode` [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup).

```powershell
winget install Anthropic.ClaudeCode
```

> **⚠️ Attention**
>
> La première commande télécharge un script et l’exécute aussitôt, avec vos droits. Copiez-la depuis ce guide ou la page d’installation d’Anthropic, et vérifiez l’adresse `claude.ai`. Si PowerShell refuse de l’exécuter, ne changez pas sa stratégie d’exécution pour la faire passer : lisez la page de dépannage [\[38\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-troubleshoot-install), et, sur un ordinateur fourni par une organisation, demandez à la personne qui le gère.

**Git for Windows, conseillé.** Il fournit [Git Bash](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-git-bash), dont l’outil Bash de Claude Code a besoin. Sans lui, Claude passe par l’outil PowerShell [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup). Ce chemin convient aux projets et aux outils propres à Windows [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup), mais le bac à sable n’y fonctionne pas [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing). Les règles `Bash(...)` des réglages visent l’outil Bash. L’outil PowerShell a les siennes, de même forme, sous le nom `PowerShell(...)` [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permissions), et il reste disponible à côté de Bash, par défaut, une fois Git for Windows installé [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup) : écrivez en double chaque règle qui compte. La reconnaissance de `cat` comme lecture vise l’outil Bash : 🟡 à vérifier pour l’outil PowerShell. Ce guide se sert de git partout ([chapitre 11](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch11)) : `git --version`, dans une nouvelle fenêtre PowerShell, vous dit s’il est là. S’il manque, installez-le depuis git-scm.com, et gardez les choix proposés par son installeur, sauf l’éditeur par défaut : choisissez-en un que vous connaissez. Si son installeur demande des droits d’administration que vous n’avez pas, arrêtez-vous et demandez à la personne qui gère le poste.

**Vérifier, lancer, se connecter.** Ouvrez une nouvelle fenêtre PowerShell, puis `claude --version`. Lancez ensuite depuis le dossier du projet :

```powershell
cd mon-projet
claude --permission-mode manual
```

Au premier lancement, le navigateur s’ouvre pour la connexion, qui se termine comme à la [section 2.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-1), étape 4 [\[27\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-authentication). Si `claude` reste introuvable, la page de dépannage dit comment corriger le PATH sous PowerShell [\[38\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-troubleshoot-install).

### C.4 Ubuntu Server, en terminal seul

Vous travaillez sur le serveur par SSH, la connexion chiffrée à une machine distante, sans écran ni navigateur. Bash, le shell par défaut de la plupart des distributions Linux, est pris en charge. Git est facultatif pour l’outil lui-même, mais ce guide s’en sert partout ([chapitre 11](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch11)) : `git --version` vous dit s’il est là [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup).

**Installer**, sous votre compte habituel. L’installateur place le lanceur dans `~/.local/bin/claude` et les versions dans `~/.local/share/claude/versions/`. Une installation neuve d’Ubuntu peut ne pas avoir [curl](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-curl) : vérifiez avec `curl --version`, et s’il manque, ajoutez-le par [apt](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-apt) [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup).

```bash
sudo apt update
sudo apt install curl
```

Puis installez Claude Code :

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Vérifier.** Ouvrez une nouvelle session SSH, puis demandez la version. Une installation qui marche affiche un numéro suivi de `(Claude Code)`. `claude doctor` va plus loin : il diagnostique l’installation et les réglages, sans ouvrir de session [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup).

```bash
claude --version
claude doctor
```

Si `claude` est introuvable, ajoutez son dossier au PATH de Bash [\[38\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-troubleshoot-install) :

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

**Lancer, et se connecter depuis un autre appareil.** Pour un travail long, ouvrez d’abord une session tmux (plus bas), puis lancez Claude dedans :

```bash
cd ~/mon-projet
claude --permission-mode manual
```

Le serveur n’a pas de navigateur. Appuyez sur c pour copier l’adresse de connexion, ou sélectionnez-la dans le terminal. Ouvrez-la dans le navigateur de votre ordinateur ou de votre téléphone, et connectez-vous. Le navigateur affiche un code : collez-le dans le terminal, à l’invite `Paste code here` [\[38\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-troubleshoot-install). Le terminal répond `Login successful`, et Entrée continue [\[27\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-authentication). Si coller dans l’invite ne fait rien, `claude auth login` lit le code sur l’entrée standard [\[38\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-troubleshoot-install).

Vos identifiants sont ensuite enregistrés dans `~/.claude/.credentials.json`, avec les droits `0600` : seuls votre compte et les comptes d’administration de la machine peuvent le lire [\[27\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-authentication). Ne copiez jamais ce fichier dans un dépôt.

> **⚠️ Attention**
>
> Sur le serveur, Claude agit avec les droits de votre compte. Gardez le mode Manual les premiers jours. N’employez pas `bypassPermissions`, le mode où tout passe sans demande, ni sur ce serveur ni sur votre poste : il n’a de sens que dans un conteneur ou une machine virtuelle sans vos secrets, au réseau limité, pour un dépôt de confiance ([section 10.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-4)).

> **⚠️ Attention**
>
> N’ouvrez pas l’adresse de connexion depuis le serveur lui-même. En session SSH, le navigateur peut s’ouvrir sur la mauvaise machine, ou vous connecter puis afficher une erreur vers une adresse `localhost`. Rien à réparer : prenez l’adresse affichée au-dessus de l’invite `Paste code here`, ouvrez-la sur votre poste, et collez le code obtenu [\[38\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-troubleshoot-install).

**Survivre à une coupure SSH.** C’est une pratique de ce guide, pas une consigne de la documentation de Claude Code : lancez Claude dans tmux, un multiplexeur de terminal qui garde les programmes d’un serveur en marche quand la connexion tombe [\[174\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-tmux-getting-started). S’il manque, `sudo apt install tmux` l’ajoute.

```bash
tmux new -s claude
tmux ls
tmux attach -t claude
```

La première ligne ouvre une session tmux nommée, dans laquelle vous lancez `cd ~/mon-projet` puis `claude --permission-mode manual`. Ctrl+b puis d vous en détache, et Claude continue de tourner. La deuxième liste les sessions, la troisième vous y rattache après une reconnexion.

Dans tmux, Maj+Entrée envoie le message au lieu d’aller à la ligne, et les notifications n’atteignent pas votre terminal. La documentation de Claude Code donne quatre lignes à ajouter à `~/.tmux.conf`, à appliquer ensuite par `tmux source-file ~/.tmux.conf` [\[175\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-terminal-config) :

```text
set -g allow-passthrough on
set -g focus-events on
set -s extended-keys on
set -as terminal-features 'xterm*:extkeys'
```

La première ligne demande tmux 3.3 ou plus récent [\[176\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-tmux-faq), et `tmux -V` affiche votre version. Au 6 novembre 2026, Ubuntu 20.04 fournit tmux 3.0a, Ubuntu 22.04 la 3.2a et Ubuntu 24.04 la 3.4 [\[177\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-launchpad-tmux). Sur une version plus ancienne que la 3.3, retirez la première ligne, que tmux refuserait, au prix des notifications. 🟡 À vérifier : les lignes 3 et 4 demanderaient tmux 3.2, et avant cette version, retirez-les aussi.

Sans tmux, après une coupure, `claude --continue --permission-mode manual` reprend la session la plus récente du dossier, en mode Manual : sans l’option, elle repartirait dans le mode de départ de vos réglages ([section 2.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-4)).

### C.5 Ubuntu Desktop, avec une interface graphique

**Installer et vérifier** : ouvrez un terminal, et lancez les mêmes commandes que sur un serveur ([section C.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-c-4)).

**Se connecter.** Au premier lancement de `claude --permission-mode manual` dans le dossier du projet, Claude Code ouvre une fenêtre du navigateur. S’il ne l’ouvre pas, appuyez sur c et collez l’adresse dans le navigateur. La suite est celle de la [section 2.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-1), étape 4 [\[27\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-authentication).

**Aller à la ligne.** Ctrl+J, ou `\` puis Entrée, marchent dans tous les terminaux [\[175\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-terminal-config). Maj+Entrée ne marche pas dans gnome-terminal, et depuis Ubuntu 25.10 le terminal fourni est Ptyxis [\[178\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-ubuntu-release-notes-25-10), que la page ne classe pas. Servez-vous de Ctrl+J.

**L’application de bureau, si vous préférez une fenêtre au terminal.** Elle existe sous Linux, en bêta, pour Ubuntu 22.04 ou plus récent et Debian 12 ou plus récent, sur x86\_64 ou arm64. Elle donne les sessions en parallèle, la relecture visuelle des diffs, un terminal et un éditeur intégrés. Elle s’installe depuis le dépôt apt d’Anthropic, dont vous vérifiez d’abord la clé de signature. Si `curl` ou `gpg` manque, `sudo apt install curl gnupg` les ajoute [\[173\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-desktop-linux).

```bash
sudo curl -fsSLo /usr/share/keyrings/claude-desktop-archive-keyring.asc https://downloads.claude.ai/claude-desktop/key.asc
gpg --show-keys /usr/share/keyrings/claude-desktop-archive-keyring.asc
echo "deb [arch=amd64,arm64 signed-by=/usr/share/keyrings/claude-desktop-archive-keyring.asc] https://downloads.claude.ai/claude-desktop/apt/stable stable main" | sudo tee /etc/apt/sources.list.d/claude-desktop.list
sudo apt update
sudo apt install claude-desktop
```

L’empreinte attendue de la clé, à comparer avec la sortie de la deuxième ligne, est `31DDDE24DDFAB679F42D7BD2BAA929FF1A7ECACE` [\[173\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-desktop-linux).

> **⚠️ Attention**
>
> Ces lignes ajoutent une source de logiciels au système, avec les droits d’administration. Si l’empreinte affichée diffère de celle de ce guide et de la page d’Anthropic, arrêtez-vous : n’exécutez pas les trois dernières lignes, et supprimez le fichier de clé téléchargé.

Lancez ensuite « Claude » depuis le lanceur d’applications, ou `claude-desktop` dans un terminal, sous votre compte ordinaire : lancée en root, l’application s’arrête. Connectez-vous avec votre abonnement claude.ai ou par l’authentification unique de votre organisation. L’application ne se met pas à jour seule : ses versions arrivent avec celles du système, par `sudo apt update` puis `sudo apt upgrade`. La bêta n’a pas encore le contrôle de l’écran ni la dictée, et [Cowork](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-cowork), la partie de l’application consacrée aux tâches longues, demande en plus la virtualisation matérielle [\[173\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-desktop-linux).

**Dans un éditeur.** L’extension pour VS Code se trouve en cherchant « Claude Code » dans la vue Extensions, ouverte par Ctrl+Maj+X. Dans un éditeur qui ne peut pas installer l’extension, lancez `claude --permission-mode manual` dans son terminal intégré [\[28\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-vs-code).

**Les autres façons d’installer.** La documentation propose aussi un dépôt apt signé pour Debian et Ubuntu, avec un canal `stable`, qui sert une version d’environ une semaine, et un canal `latest`, la plus récente. Ce paquet suit les mises à jour du système, par `sudo apt update` puis `sudo apt upgrade claude-code`. Il existe enfin un paquet npm, qui demande Node.js 22 ou plus récent et ne s’installe jamais avec `sudo`. Les commandes exactes sont sur la page d’installation [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup).

### C.6 Windows avec WSL, tout sous Linux ou en hybride

Sous Windows natif, Claude Code n’a pas de bac à sable, et certains outils n’existent que sous Linux : WSL 2 répond aux deux [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing) [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup). WSL, le sous-système Windows pour Linux, fait tourner une [distribution](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-distribution) Linux, Ubuntu par exemple, directement dans Windows, sans double démarrage [\[179\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-wsl-install). Pour Claude Code, c’est un autre chemin sur un poste Windows, à côté de Windows natif et du cloud.

**Pourquoi WSL.** Trois raisons, à vous de voir si l’une vous concerne :

- **le bac à sable** : il confine les commandes shell sous macOS, Linux et WSL 2, pas sous Windows natif, et la documentation renvoie à WSL 2 pour l’avoir sur un poste Windows [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing) ([section 10.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-5)),
- **les outils Linux** : la documentation de Claude Code conseille WSL 2 pour les chaînes d’outils Linux [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup). WSL 2 a un vrai noyau Linux, dans une machine virtuelle gérée, et des outils comme Docker y tournent [\[171\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-wsl-compare-versions),
- **le même système que la production**, si votre code tourne sous Linux sur les serveurs. C’est une pratique de ce guide : tester là où le code tournera.

Si vos projets et vos outils sont propres à Windows, restez en Windows natif : c’est l’usage que la documentation lui donne [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup).

**Installer WSL.** Il faut Windows 10 version 2004 ou plus récente (build 19041), ou Windows 11. Ouvrez PowerShell avec les droits d’administration, lancez la première commande ci-dessous, puis redémarrez : elle active WSL et installe Ubuntu. Créez ensuite le nom d’utilisateur et le mot de passe de la distribution. Les nouvelles installations sont en WSL 2 par défaut [\[179\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-wsl-install).

```powershell
wsl --install
wsl -l -v
wsl --set-version Ubuntu 2
```

La deuxième commande affiche la version de WSL de chaque distribution. La troisième passe une distribution en WSL 2, sous le nom que montre la deuxième.

Installez ensuite Claude Code dans la distribution, avec les étapes de la [section C.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-c-4), et lancez `claude --permission-mode manual` dans le terminal de WSL, pas dans PowerShell. Sous WSL 1, `claude` peut s’arrêter sur `Exec format error` : passez alors la distribution en WSL 2. Si aucun navigateur ne s’ouvre à la connexion, ouvrez l’adresse affichée et collez le code, comme sur un serveur [\[38\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-troubleshoot-install). WSL n’a pas besoin de Git for Windows [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup).

**Tout sous Linux.** Tout le travail se fait dans la distribution :

- le projet vit dans le système de fichiers Linux, par exemple `/home/<vous>/mon-projet`, et non sous `/mnt/c/`, qui est le disque `C:` de Windows vu depuis Linux [\[168\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-wsl-filesystems),
- Claude Code, git et vos outils sont installés dans la distribution [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup),
- l’éditeur se connecte à WSL : VS Code s’installe côté Windows, avec son extension WSL, et `code .`, tapé dans la distribution, ouvre le dossier courant. Le terminal intégré de l’éditeur est alors celui de la distribution [\[170\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-wsl-vscode).

Dans une fenêtre de l’éditeur connectée à WSL, un réglage comme le certificat d’un proxy se pose dans le `~/.claude/settings.json` de la distribution, pas dans celui de Windows [\[28\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-vs-code). Ce montage est le plus simple à raisonner, avec un seul système pour les fichiers et les outils.

**En hybride.** Windows garde l’éditeur, le navigateur et la bureautique. WSL prend le build, les tests et les outils Linux, et le projet reste rangé côté Linux [\[170\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-wsl-vscode). Claude Code peut alors tourner à deux endroits : dans WSL pour les projets rangés côté Linux, avec le bac à sable en WSL 2 [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup), et sous Windows natif pour les projets rangés côté Windows. La règle de Microsoft tient en une phrase : rangez les fichiers du côté des outils qui les travaillent [\[168\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-wsl-filesystems). Dans l’Explorateur de Windows, `\\wsl$` montre les distributions et leurs fichiers, et `explorer.exe .`, tapé dans la distribution, ouvre le dossier courant [\[168\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-wsl-filesystems).

**Tableau :** Ce que coûte WSL, d’après les sources citées dans chaque ligne.

| Coût | Ce qui se passe | Ce que vous faites |
| --- | --- | --- |
| Deux systèmes de fichiers | WSL 2 est plus lent que WSL 1 dès qu’un outil lit les fichiers de l’autre système [\[171\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-wsl-compare-versions). Un projet sous `/mnt/c/` peut donner une recherche de Claude qui trouve moins de résultats, alors que `claude doctor` l’affiche comme correcte [\[172\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-troubleshooting) | ranger le projet sous `/home/`, ou travailler en Windows natif [\[172\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-troubleshooting) |
| Deux installations | en hybride, Claude Code, git et vos outils existent des deux côtés, chacun avec ses réglages : `~/.claude` dans la distribution, `%USERPROFILE%\.claude` sous Windows [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings) | mettre à jour WSL par `wsl --update` [\[171\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-wsl-compare-versions), Ubuntu par apt, et garder les deux côtés au même niveau (pratique du guide) |
| La mémoire | la machine virtuelle de WSL 2 reçoit par défaut jusqu’à la moitié de la mémoire de Windows [\[169\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-wsl-config) | fixer une limite dans `%UserProfile%\.wslconfig`, section `[wsl2]`, par exemple `memory=8GB`, au-dessus des 4 Go que demande Claude Code, puis `wsl --shutdown` [\[169\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-wsl-config) |
| Les chemins | le même fichier s’écrit `C:\Users\<vous>\Projet` sous Windows et `/mnt/c/Users/<vous>/Projet` dans la distribution, et Linux distingue les majuscules, pas Windows [\[168\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-wsl-filesystems) | donner des chemins au format Linux aux commandes passées à `wsl` [\[168\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-wsl-filesystems) |
| Les outils de Windows vus depuis Linux | WSL ajoute par défaut les dossiers de Windows au PATH de la distribution [\[169\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-wsl-config) | pour une installation par npm, si `which node` répond par un chemin sous `/mnt/c/`, installer Node.js côté Linux. L’installation native n’est pas concernée [\[38\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-troubleshoot-install) |
