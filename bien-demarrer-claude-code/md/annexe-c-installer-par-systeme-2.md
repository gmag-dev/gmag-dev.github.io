> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.2.4 : « Annexe C. Installer par système », partie 2 sur 2.
>
> - Précédent : [Annexe C. Installer par système (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-c-installer-par-systeme-1.md)
> - Suivant : [Annexe D. La version web](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-d-la-version-web.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-s-c-7>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

### C.7 Mettre à jour, diagnostiquer, désinstaller

**Mettre à jour.** L’installation native se met à jour seule, en arrière-plan, et la nouvelle version prend effet au lancement suivant. `claude update` l’applique tout de suite [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup). Homebrew, WinGet et le dépôt apt ne se mettent pas à jour par Claude Code : ils suivent leur propre commande, donnée dans la section de votre système [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup).

**Diagnostiquer.** Hors session, `claude doctor` vérifie l’installation et la configuration, et montre le résultat de la dernière mise à jour [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup). Dans une session, `/doctor` diagnostique de même l’installation et la configuration [\[13\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-how-claude-code-works).

**Désinstaller une installation native**, sous macOS, Linux ou WSL, par deux commandes [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup) :

```bash
rm -f ~/.local/bin/claude
rm -rf ~/.local/share/claude
```

> **⚠️ Attention**
>
> Une commande `rm -rf` efface sans corbeille ni retour. Recopiez ces deux chemins tels quels, sans rien y ajouter. Vos réglages et votre historique restent dans `~/.claude` et `~/.claude.json`. Les supprimer efface aussi les outils autorisés, les serveurs MCP configurés et l’historique des sessions [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup) : gardez-les si vous comptez réinstaller.

Sous Windows natif, et pour Homebrew, WinGet ou apt, la page d’installation donne la commande de désinstallation propre à chaque méthode [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup).

Chez Passerelle 🌉, une désinstallation ne touche jamais au dossier des courriers : il vit dans le projet, pas dans `~/.claude`.

### C.8 Venir d’un autre assistant de programmation

Vous avez peut-être déjà travaillé avec un [assistant de complétion](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-assistant-de-completion), qui propose la suite du code pendant la frappe, ou un panneau de discussion qui propose du code à coller. Beaucoup de vos gestes gardent leur but ici, mais changent de forme.

**Tableau :** Vos gestes habituels et leur forme dans Claude Code, au 6 novembre 2026. Proposé par ce guide, d’après les sections citées.

| Votre geste habituel | Le geste ici | Ce qui change |
| --- | --- | --- |
| accepter une suggestion, ligne par ligne, d’une touche | décrire la tâche entière, puis relire le diff de tous les fichiers touchés ([section 11.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s11-1)) | l’unité de travail est la tâche, plus la ligne |
| copier un extrait dans la discussion pour donner le contexte | nommer le fichier, la fonction ou le symptôme : Claude lit lui-même ce dont il a besoin ([section 1.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s1-3)) | rien à copier : le contexte, c’est le dépôt |
| coller le code proposé, puis lancer soi-même les tests | demander que Claude lance les tests et montre leur sortie ([section 5.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s5-3)) | une commande lancée par l’agent agit sur votre poste, selon votre mode de permission ([section 2.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-3)) |
| écrire ses consignes dans le fichier de règles de l’ancien outil | reprendre dans `CLAUDE.md` ce qui vaut encore, en peu de lignes ([section 2.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-2)) | un `AGENTS.md` déjà présent n’est lu qu’en l’absence de `CLAUDE.md` et de `CLAUDE.local.md` [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-memory) |
| annuler dans l’éditeur | Échap pour arrêter, `/rewind` pour revenir à un message antérieur, git pour le reste ([section 2.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-4)) | une commande shell ou une action sur un système distant ne se rembobine pas ([section 2.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-4)) |
| une conversation par question, oubliée à la fermeture | une session par tâche, nommée et reprise plus tard, et `/clear` entre deux tâches ([section 3.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s3-2)) | la session reste sur votre poste, et se reprend |

Les deux sortes d’outils changent vite : avant de vous fier à une ligne de ce tableau, vérifiez votre version ([section 13.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s13-3)).

**Ce qui change de nature.** Un assistant de complétion propose du texte, et c’est vous qui l’exécutez. Claude Code est un agent : il lit des fichiers, lance des commandes et enchaîne les étapes jusqu’au résultat ([section 1.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s1-2)). Une commande lancée agit sur votre poste, pas sur un brouillon. C’est pourquoi le mode de permission compte ([section 2.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-3)), et qu’un contenu lu par Claude peut chercher à le détourner ([section 10.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-3)).

Ce guide propose de garder trois habitudes : relire le diff avant chaque commit, demander pourquoi avant d’accepter un changement que vous ne comprenez pas, et garder git comme filet. Il propose d’en quitter trois : accepter en bloc parce que la suggestion avait l’air juste, coller dans la conversation des fichiers entiers ou un secret ([section 10.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-2)), et corriger le résultat à la main sans le dire à Claude.

### C.9 Le dossier d’essai et git, pas à pas

Cette section détaille deux gestes de la [section 2.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-1) : copier le dossier d’essai, puis en faire un dépôt git.

**Copier le dossier d’essai.** Le paquet du guide, `guide-claude-code-v<version>.zip`, contient la version web et le dossier `exemples/`. Décompressez-le, par un double-clic ou « Extraire tout ». Si vous n’avez que la page web, téléchargez le paquet sur le site du guide ([annexe D](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-d), « Où la trouver »), ou demandez-le à la personne qui vous a transmis le guide, ou à l’autrice par le lien de la page de titre, ou recréez le dossier à partir de la [section A.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-a-3), qui donne ses trois documents en clair. Copiez ensuite `mon-essai` dans votre dossier personnel, où le terminal s’ouvre en général. Avec le terminal, placez-vous d’abord dans le dossier du paquet décompressé, `guide-claude-code-v<version>`, par `cd` suivi de son chemin, par exemple `cd ~/Downloads/guide-claude-code-v<version>` s’il est dans le dossier des téléchargements, dont le nom peut différer sur votre poste. Remplacez `<version>`, chevrons compris, par le numéro qui suit « Version » sur la page de titre, sans la date : `3.2.4` pour cette version. Si ce dossier ne contient pas `exemples/`, mais un dossier du même nom que le paquet, entrez d’abord dans ce dernier. Puis `cp -R exemples/mon-essai ~/mon-essai` sous macOS et Linux, `Copy-Item -Recurse exemples\mon-essai $HOME\mon-essai` sous Windows. Si un dossier `mon-essai` existe déjà dans votre dossier personnel, ces deux commandes copient le nouveau à l’intérieur, en `mon-essai/mon-essai` (essai de ce guide, le 9 novembre 2026) : renommez d’abord l’ancien, ou copiez sous un autre nom, comme `~/mon-essai-2`, et employez ce nom dans la suite. Sans le terminal, copiez le dossier `mon-essai` avec l’Explorateur de fichiers ou le Finder, et collez-le dans votre dossier personnel. Puis, dans le terminal, `cd ~/mon-essai`.

**Les fichiers `.DS_Store` de macOS.** Sous macOS, le dossier peut contenir des fichiers `.DS_Store`, propres à macOS [\[180\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-apple-smb-ds-store), même dans `documents/`, que le `git add` de la [section 2.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-1) prendrait avec lui. La ligne `.DS_Store` d’un fichier `.gitignore` à la racine du dossier, écrite avant le `git add`, fait ignorer ces fichiers à tous les niveaux du dossier, et le `.gitignore` entre dans le même premier commit [\[181\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-gitignore). Un `.gitignore` ne retire pas un fichier déjà commité : git ne touche pas un fichier qu’il suit déjà [\[181\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-gitignore). Si un `.DS_Store` est entré dans le premier commit, `git rm --cached` suivi de son chemin le retire du suivi sans l’effacer du disque [\[182\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-git-rm), puis un commit l’enregistre.

**Sans le paquet.** Le dossier recréé par la [section A.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-a-3) n’a que `documents` : la deuxième ligne du premier commit de la [section 2.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-1) devient `git add documents`, ou `git add .gitignore documents` sous macOS.

**Un Git plus ancien que la version 2.28.** L’option `-b main` de `git init` nomme `main` la première branche, celle à laquelle les chapitres [8](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch8) et [11](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch11) comparent les autres [\[24\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-git-init). Un Git plus ancien que la version 2.28 la refuse : lancez alors `git init` seul, puis, après le premier commit, `git branch -m main`, qui renomme la branche.

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/#toc)
