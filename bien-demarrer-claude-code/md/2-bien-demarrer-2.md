> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.2.0 : « 2. Bien démarrer », partie 2 sur 2.
>
> - Précédent : [2. Bien démarrer (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/2-bien-demarrer-1.md)
> - Suivant : [3. La fenêtre de contexte](https://gmag-dev.github.io/bien-demarrer-claude-code/md/3-la-fenetre-de-contexte.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-s2-4>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

### 2.4 Garder la main

Claude peut partir dans une mauvaise direction, ou modifier ce qu’il ne fallait pas, et il faut alors l’arrêter ou revenir en arrière sans tout perdre. Trois gestes vous gardent la main [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices) :

- `Échap` arrête Claude en gardant le travail déjà fait, pour le réorienter,
- `/rewind`, ou `Échap` deux fois sur une invite vide, ramène le code, la conversation, ou les deux, à un message antérieur,
- `/clear` repart d’une conversation vide ([chapitre 3](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch3)).

Pour un travail sur plusieurs jours, nommez la session par `/rename courriers-lot-1`, puis reprenez-la plus tard depuis le terminal [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices) :

```bash
claude --resume courriers-lot-1 --permission-mode manual
claude --continue --permission-mode manual
```

La première commande reprend la session nommée, la seconde la plus récente du dossier. Pour une question annexe qui ne doit pas encombrer la conversation, `/btw` répond sans rien y ajouter [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices).

> **💡 Conseil**
>
> Pour suivre ce que fait Claude pendant un atelier, affichez le détail des outils (`Ctrl+O` dans le terminal) [\[36\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-interactive-mode), et essayez le style « Explanatory », qui explique ses choix, par `/output-style` [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-output-styles). Ses réponses sont plus longues. La [section D.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-d-7) détaille les vues et les styles.

> **🔀 Quand la règle cède**
>
> - Ces retours en arrière ont deux limites. Ils ne couvrent que les fichiers modifiés par les outils d’édition de Claude : un fichier touché par une commande du terminal n’est pas restauré [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices). Et une action sur un système distant, une base de données ou un envoi, ne s’annule pas ainsi [\[13\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-how-claude-code-works).
> - Ce qui tient : git, que ces gestes complètent sans le remplacer.
> - Pour aller plus loin : [chapitre 11](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch11).

### 2.5 Venir d’un autre assistant

Sautez cette section si Claude Code est votre premier assistant de programmation.

Un assistant de complétion propose du texte, que vous exécutez. Claude Code est un agent : il lit des fichiers, lance des commandes et enchaîne les étapes [\[13\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-how-claude-code-works). L’unité de travail devient la tâche. Ce guide propose de garder la relecture du diff ([chapitre 11](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch11)) et git comme filet, et de quitter l’acceptation en bloc. L’[annexe C](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-c) met vos anciens gestes en regard des nouveaux.

### 2.6 Linux, et une machine sans navigateur

Sautez cette section si vous n’installez Claude Code ni sous Linux, ni sur un serveur sans navigateur : rien de la suite n’exige de l’avoir lue.

Sous Linux, de bureau ou serveur, la commande d’installation est celle de la [section 2.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-1) [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup). Sans navigateur sur la machine, par exemple sur un serveur joint par SSH, la connexion se termine sur un autre appareil : la [section C.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-c-4) donne le geste [\[38\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-troubleshoot-install). Sur le serveur, Claude agit avec les droits de votre compte : gardez le mode Manual.

### 2.7 Windows avec WSL

Sautez cette section si vous ne travaillez pas sous Windows, ou si Windows natif vous suffit : rien de la suite n’exige de l’avoir lue.

[WSL](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-wsl), le sous-système Windows pour Linux, fait tourner une distribution Linux dans Windows. Le bac à sable de Claude Code, qui borne ce que les commandes du terminal écrivent et joignent sur le réseau ([section 10.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-5)), demande WSL 2 sur un poste Windows [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-setup). Si vos projets et vos outils sont propres à Windows, restez en Windows natif. La [section C.6](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-c-6) dit comment installer, monter le projet et le ranger.

> **📌 À retenir**
>
> - Installez, vérifiez par `claude --version`, puis lancez `claude --permission-mode manual` depuis le dossier du projet, jamais depuis votre dossier personnel.
> - `CLAUDE.md` court : seulement ce que Claude ne peut pas deviner, sous 200 lignes. Chaque ligne passe le test des deux questions.
> - Les étages de `CLAUDE.md` s’additionnent, du plus large au plus précis.
> - Connaissez votre mode. Le mode auto décide à votre place, il ne vous supervise pas.
> - `Échap` arrête, `/rewind` puis git ramènent un état antérieur, du plus rapide au plus sûr.

> **✏️ Exercice en trois barreaux**
>
> **Compétence visée** : installer Claude Code, lancer une session en mode Manual et se connecter, puis écrire un `CLAUDE.md` court qui passe le test des deux questions, et vérifier qu’il est chargé. Comptez 25 à 40 minutes.
>
> **① Exemple travaillé.** Inès lance `/init` dans le dossier de Passerelle. Parmi les lignes proposées, six demandent un choix :
>
> ```text
> 1. Le projet contient les dossiers courriers/, brouillons/ et modeles/.
> 2. Chaque brouillon garde chaque date et chaque montant du courrier.
> 3. Écris de façon claire et professionnelle.
> 4. Les courriers sont des fichiers texte.
> 5. Les règles de rédaction de Samia sont dans regles-redaction.md : lis-les avant chaque brouillon.
> 6. modeles/ garde d'anciens brouillons, écrits avant ces règles : ne recopie pas leur style.
> ```
>
> Inès garde les lignes 2, 5 et 6. Les lignes 1 et 4 décrivent ce que Claude voit en ouvrant le dossier, et la ligne 3 ne dit rien de vérifiable. La ligne 2 est une règle de l’association, écrite nulle part ailleurs, et la ligne 6 signale un endroit trompeur. **Pourquoi ?** Laquelle des lignes gardées Claude pourrait-il trouver seul, mais n’irait sans doute pas chercher ?
>
> **② À compléter.** Trois lignes de plus :
>
> ```text
> 7. Les courriers sont nommés PASS-C-001.txt, PASS-C-002.txt, et ainsi de suite.
> 8. N'envoie rien : ni courriel, ni formulaire, ni message.
> 9. Sois bienveillant avec les personnes accueillies.
> ```
>
> Pour chacune, répondez aux deux questions, puis dites si vous la gardez. Dites enfin si la ligne 8 suffit à protéger Josiane d’un envoi avant relecture.
>
> **③ Sur votre projet.** Installez Claude Code ([section 2.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-1)). Dans le dossier de votre projet, lancez `claude --permission-mode manual`, connectez-vous au premier lancement, vérifiez que la barre d’état affiche `⏸ manual mode on`, puis lancez `/init`. Réduisez le fichier à moins de vingt lignes en appliquant le test. Vérifiez par `/context` qu’il est chargé. Faites défiler les modes par `Maj+Tab` et notez le nom affiché pour chacun.
>
> **Sans code** : les barreaux ① et ② se font sur papier. Le barreau ③ se fait sur un dossier de documents, sans une ligne de code.
>
> **Critère de réussite** : un `CLAUDE.md` de moins de vingt lignes, chaque ligne justifiée par le test, la sortie de `/context` qui le montre chargé, et la liste des modes affichés, comparée au [tableau 2.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#tab-2-2). Par le chemin sans code, le même `CLAUDE.md`, écrit pour un dossier de documents, chaque ligne gardée avec sa réponse aux deux questions, et la même sortie de `/context`.
>
> **Voir le corrigé expliqué (après votre essai)**
>
> **①** La ligne 5. Claude verrait le fichier `regles-redaction.md` en listant le dossier, mais rien ne lui dit de le lire avant chaque brouillon : la ligne lui donne le chemin et le moment. Avant de garder les lignes 2 et 5, Inès les fait relire par Odile, qui a le dernier mot sur les règles des brouillons : c’est elle qui fait ajouter « un délai par phrase ».
>
> **②** La ligne 7 se retire : Claude voit les noms des fichiers. L’erreur fréquente est de la garder parce qu’elle est vraie : vraie mais trouvable, elle coûte de l’attention sans rien apporter. La ligne 9 se retire, ou se réécrit en règle vérifiable, comme « vouvoie la personne ». La ligne 8 se garde, mais ne suffit pas : c’est une consigne, suivie presque toujours. Elle devra devenir une règle imposée ([chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch10)). Et un brouillon ne sert que si Odile l’a relu, puis la destinataire décide de ce qu’elle fait de son courrier.
>
> **③** `/context` montre votre `CLAUDE.md` parmi les fichiers de mémoire chargés. S’il manque, vérifiez que vous avez lancé Claude depuis la racine du projet. Si un mode du [tableau 2.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#tab-2-2) manque au défilement, c’est attendu : `dontAsk` n’y figure jamais, auto seulement s’il est disponible, et `bypassPermissions` seulement si vous l’avez autorisé au lancement ou dans vos réglages [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permission-modes).

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/#toc)

![Illustration : la personne en long manteau violet et son petit compagnon de cristal cyan, dans un bureau sous un grand cadre lumineux, où la personne choisit les livres qui restent sur la table.](https://gmag-dev.github.io/bien-demarrer-claude-code/images/dc4df6623044.avif)
