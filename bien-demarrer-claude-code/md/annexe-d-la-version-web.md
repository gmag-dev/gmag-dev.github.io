> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.2.1 : « Annexe D. La version web ».
>
> - Précédent : [Annexe C. Installer par système (partie 2 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-c-installer-par-systeme-2.md)
> - Suivant : [Annexe E. Gabarits](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-e-gabarits.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-ann-d>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## Annexe D. La version web

La version web du guide est un seul fichier [HTML](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-html), qui se lit dans un navigateur, en ligne sur le site du guide ou hors ligne depuis son paquet. Elle a des réglages que le [PDF](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-pdf) n’a pas : une recherche, des options de lecture, des raccourcis, le plein écran, des annotations et les réponses repliées sous leur question. Cette annexe les décrit, avec la page de titre et le bas de page, puis dit comment lire avec son rendu complet un fichier Markdown que Claude vous rend, et comment régler ce que vous voyez de son travail dans la conversation. Tous les réglages de la version web restent dans votre navigateur, et rien n’est envoyé.

**Où la trouver.** La version web se lit en ligne, sur le site du guide, [https://gmag-dev.github.io/bien-demarrer-claude-code/](https://gmag-dev.github.io/bien-demarrer-claude-code/), ou hors ligne, dans le paquet du guide, un fichier `guide-claude-code-v<version>.zip`, où `<version>` est le numéro de version du guide, sans sa date. Le paquet de cette version se télécharge sur le même site : [`guide-claude-code-v3.2.1.zip`](https://gmag-dev.github.io/bien-demarrer-claude-code/guide-claude-code-v3.2.1.zip). Il contient la page du guide, `guide-v3.2.1-publique-autonome.html`, la page « Préparez votre poste », [`preparez-votre-poste.html`](https://gmag-dev.github.io/bien-demarrer-claude-code/preparez-votre-poste.html), et le dossier `exemples/`, dont le dossier d’essai `exemples/mon-essai/` du [chapitre 2](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch2). Décompressez le paquet, par un double-clic ou « Extraire tout », puis ouvrez `guide-v3.2.1-publique-autonome.html` dans votre navigateur. Si vous n’avez reçu que la page, téléchargez le paquet sur le site du guide, ou demandez-le à la personne qui vous a transmis le guide, ou à l’autrice par la ligne de contact du bas de page ([section D.8](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-d-8)). Pour la semaine sans code, la [section A.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-a-3) donne en clair les trois documents du dossier d’essai.

### D.1 La barre du haut, le sommaire et la recherche

La barre du haut reste visible pendant la lecture. De gauche à droite, elle donne :

- **Sommaire**, qui ouvre ou ferme le sommaire. Sur un écran étroit, il devient un tiroir,
- le titre de la section où vous êtes,
- **Rechercher**, le champ de recherche, qui s’atteint aussi par Ctrl+K (Cmd+K sous macOS), ou par la touche `/` tant que les raccourcis d’une seule touche sont activés ([section D.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-d-3)),
- **Annotations**, qui ouvre le panneau de vos annotations et porte leur nombre ([section D.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-d-5)). Le panneau offre d’abord « Afficher les annotations dans le texte », puis la liste de vos annotations. Cette première ligne n’apparaît que si votre navigateur sait surligner un passage sans toucher à la page, par l’interface « CSS Custom Highlight ». Sans elle, vos annotations restent dans la liste,
- **Figures et tableaux**, un mode qui montre toutes les figures et tous les tableaux du guide, les uns à la suite des autres,
- **Plein écran**, qui fait occuper au guide tout l’écran, sans les barres du navigateur. Le même bouton, ou la touche `e`, en sort. Il n’apparaît que si votre navigateur permet le plein écran,
- **Contacts**, qui ouvre un petit menu pour joindre ou soutenir l’autrice : son profil LinkedIn et sa page Tipeee, dans un nouvel onglet, et son adresse électronique, qui ouvre votre logiciel de messagerie. Échap referme ce menu,
- **Options**, le panneau des réglages ([section D.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-d-2)).

Sous environ 1 000 pixels de large, ou dès que la barre ne tient plus sur sa ligne, ses boutons n’affichent que leur icône, et leur nom au survol. Sous environ 520 pixels, sur un téléphone, la barre garde Sommaire et Rechercher, et range les autres boutons, avec leur nom, dans le menu ≡. Ce menu se termine par les liens de « Contacts ».

**Le sommaire.** Il range le guide en trois parties, chacune sur une ligne à elle, au-dessus de ses chapitres : la Partie I, « Bien démarrer et bien travailler », chapitres [1](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch1) à [13](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch13), la Partie II, « Du jalon Confirmé au jalon Expert », chapitres [14](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch14) à [23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23), puis les annexes. Un clic sur une partie mène à son intercalaire, le grand panneau qui l’ouvre ([section D.8](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-d-8)).

La recherche tolère les fautes de frappe. Elle surligne dans le texte chaque mot trouvé, et l’occurrence courante avec un contour. Une liste de résultats s’ouvre sous le champ : les flèches la parcourent, et Entrée ouvre le résultat choisi. Sans choix dans la liste, Entrée passe à l’occurrence suivante et Maj+Entrée à la précédente, comme F3 et Maj+F3 partout dans la page. Les boutons « Résultat précédent » et « Résultat suivant », à côté du champ, font de même, avec un compteur comme « 3 sur 17 ». Échap ferme la liste et efface le surlignage.

Pour retrouver les limites des règles d’un chapitre, cherchez « Quand la règle cède » : chaque encadré de ce nom, marqué 🔀, dit la situation où cède la règle de sa section, ce qui tient alors, et où le guide le développe. Sous un tableau à trois niveaux, la limite tient dans l’encadré 📏 « La limite ». L’icône 🎓 marque une autre sorte d’encadré, « Fonctions avancées et bonnes pratiques », qui présente un composant de Claude Code et que le chemin débutant saute.

### D.2 Le panneau Options

Le bouton « Options » ouvre le panneau des réglages. Chaque ligne en règle un.

**Tableau :** Les options de la version web, et leur réglage de départ.

| Option | Ce qu’elle règle | Au départ |
| --- | --- | --- |
| Thème | Auto, qui suit le réglage de votre système, Clair ou Sombre | Sombre, à votre première visite |
| Style | Cyberpunk, ou Classique, plus sobre, qui saute aussi l’entrée animée de la page de titre ([section D.8](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-d-8)) | Cyberpunk |
| Animations | Activées ou Désactivées. Désactivées, le titre s’affiche d’un coup au lieu de s’écrire, l’entrée de la page de titre est sautée, et le décor ne bouge plus ([section D.8](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-d-8)) | activées |
| Taille du texte | plus petit ou plus grand, par paliers, et un bouton qui revient à 100 % | 100 % |
| Largeur du texte | une colonne plus étroite ou plus large, jusqu’à la pleine largeur, et « Par défaut » | par défaut |
| Largeur du sommaire | réglée à la main, de 12 à 40 rem, ou « Auto », adaptée à l’écran. Sur un écran étroit, le sommaire est un tiroir et cette ligne n’apparaît pas | Auto |
| Alignement | le texte justifié, ou aligné à gauche | justifié |
| Affichage | le plein écran, comme le bouton de la barre, et le réglage « Pages » : 1, 2, 3 ou Auto, à toute largeur de fenêtre, puisque c’est vous qui choisissez. Chaque colonne en plus montre la page d’écran suivante et suit le défilement. Le texte de chaque colonne se sélectionne et se copie. Auto choisit le nombre de colonnes d’après la largeur de la fenêtre, pour garder des lignes lisibles | 1 page |
| Exercices | « Affichés », ou « Masqués : guide seulement » ([section D.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-d-4)) | affichés |
| Nouveautés | « Tout le guide », ou « Nouveautés seulement », qui ne garde que la section « Quoi de neuf » de « Comment lire ce guide » et les sections qui portent le badge 🆕 Nouveau ([section D.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-d-4)) | tout le guide |
| Raccourcis clavier | activés ou désactivés, et « Voir la liste » ([section D.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-d-3)) | activés |
| Annotations | ouvrir le panneau de vos annotations, comme le bouton « Annotations » de la barre, ou annoter la section en cours ([section D.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-d-5)) | sans objet |
| Signaler une erreur | les tickets du dépôt public du guide, chez GitHub, dans un nouvel onglet | sans objet |
| Paramètres | « Remettre les paramètres par défaut », en dernière ligne (ci-dessous) | sans objet |

Si votre version n’a pas l’une de ces lignes, c’est qu’elle ne propose pas ce réglage : le reste du tableau vaut tel quel.

**Remettre les paramètres par défaut.** Le bouton de la dernière ligne ne change rien tout de suite : il ouvre, dans le panneau même, la question « Remettre tous les paramètres par défaut ? Vos annotations sont gardées. », avec deux boutons, « Remettre » et « Annuler ». Échap annule aussi, et refermer le panneau Options retire la question. « Remettre » efface tous les réglages de lecture de ce tableau et l’affichage des passages annotés, puis recharge la page sur la section où vous êtes, avec les réglages de départ. Vos annotations restent.

### D.3 Les raccourcis et la lecture au clavier

Toute la page se parcourt au clavier. Tab et Maj+Tab passent d’un lien ou d’un bouton au suivant ou au précédent. Dans un groupe de boutons ou dans une liste, les flèches se déplacent. Entrée ou Espace activent un bouton et ouvrent une réponse repliée. Échap ferme un panneau. Ce sont les conventions du clavier que décrit le W3C pour une interface web [\[106\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-wai-keyboard-interface).

Les raccourcis d’une seule touche ne jouent pas pendant que vous tapez dans un champ. La ligne « Raccourcis clavier » des options désactive tous ces raccourcis d’une seule touche. Ctrl+K (Cmd+K sous macOS), F3 et Maj+F3, et Échap restent actifs, car ils ne gênent pas la saisie. « Voir la liste », ou la touche `?`, les affiche. Le tableau reprend cette liste, dans son ordre.

**Tableau :** Les raccourcis clavier de la version web.

| Touche | Ce qu’elle fait |
| --- | --- |
| Ctrl+K (Cmd+K sous macOS), toujours actif, ou `/` | aller à la recherche |
| Entrée ou F3 | aller à l’occurrence suivante de la recherche (Entrée dans le champ, F3 partout) |
| Maj+Entrée ou Maj+F3 | revenir à l’occurrence précédente (Maj+Entrée dans le champ, Maj+F3 partout) |
| `?` | afficher la liste des raccourcis |
| `n` | aller à la section suivante |
| `p` | revenir à la section précédente |
| `l` | copier le lien de la section en cours |
| `m` | replier ou déplier le sommaire |
| `f` | passer au mode figures et tableaux, ou en revenir |
| `o` | ouvrir ou fermer les options |
| `t` | changer de thème : Auto, Clair, Sombre |
| `+` | agrandir le texte |
| `-` | réduire le texte |
| `=` | revenir à la taille de 100 % |
| `e` | passer en plein écran, ou en sortir. Cette ligne manque si votre navigateur ne permet pas le plein écran |
| Échap | fermer un panneau ou la liste des raccourcis |

La touche `e` suit la même règle que les autres : elle ne joue ni pendant une saisie, ni quand la liste des raccourcis est ouverte, ni quand la ligne « Raccourcis clavier » la désactive.

### D.4 Les réponses repliées, les exercices et l’impression

Dans la version web, deux encadrés seulement sont repliés : la réponse attendue à la question de placement, sous « Voir la réponse attendue », et le corrigé de l’exercice, sous « Voir le corrigé expliqué ». Ils s’ouvrent à la souris, ou au clavier par Entrée ou Espace quand leur titre a le focus. Tout le reste du guide se lit sans rien déplier.

La ligne « Exercices » des options propose « Affichés », le réglage de départ, ou « Masqués : guide seulement ». Masqués, les questions de placement et les exercices disparaissent. Les règles, les encadrés « Quand la règle cède » et « À retenir » restent : ils sont le guide. Votre choix reste dans ce navigateur, et l’impression le suit.

La ligne « Nouveautés » propose « Tout le guide », le réglage de départ, ou « Nouveautés seulement ». Ce second choix masque chaque section qui ne porte pas le badge 🆕 Nouveau, sauf la section « Quoi de neuf », qui liste les nouveautés, et retire du sommaire les lignes des sections masquées. Une section gardée garde le titre de son chapitre, et un badge placé hors de toute section, comme dans le cartouche d’un chapitre, ne garde que le paragraphe ou l’encadré qui le porte. Le badge dit son mot et sa date, et son icône se tait pour les lecteurs d’écran. Il reste soixante jours après sa date, comptés jusqu’à la date de la version du guide, puis s’efface à la version suivante. Votre choix reste dans ce navigateur, et l’impression le suit. Les deux lignes se combinent : avec les exercices masqués, une section neuve se lit sans son exercice.

À l’impression, les réponses et les corrigés s’ouvrent. Le PDF garde tout, et regroupe les réponses et les corrigés à l’[annexe I](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-i). Chaque intercalaire de partie s’imprime sur une page à lui, comme une page de garde ([section D.8](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-d-8)). Ni le bouton « Plein écran » ni les compteurs de caractères ne s’impriment.

### D.5 Annoter le guide

Dans la version web, vous pouvez annoter le guide comme un livre papier. Une annotation relie un passage du texte à une note que vous écrivez. Elle se fait en cinq gestes :

1. **annoter un passage** : sélectionnez quelques mots, puis choisissez « Annoter », qui apparaît près de la sélection. Sans sélection, « Annoter la section », dans la ligne « Annotations » des options, annote la section où vous êtes,
2. **choisir une catégorie** : Note, Suggestion, Erreur, Bug, Question ou Autre. Chacune a son nom, son icône et sa couleur de surlignage. Le nom est toujours écrit, la couleur n’est qu’un repère en plus,
3. **écrire et enregistrer** : l’éditeur accepte le gras, l’italique, les listes et les liens. Une annotation tient en 6 000 caractères au plus. Un compteur, sous l’éditeur, dit où vous en êtes, par exemple « 120 / 6000 », et la saisie qui dépasserait est refusée, avec un message lu par les lecteurs d’écran,
4. **relire** : le bouton « Annotations » de la barre du haut ([section D.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-d-1)), qui porte leur nombre, ouvre le panneau de vos annotations. Sa première ligne, « Afficher les annotations dans le texte », surligne les passages annotés ou retire ce surlignage, sans rien effacer. Survolez un passage surligné, ou touchez-le sur un écran tactile, pour lire sa note, puis « Modifier » pour la reprendre. Sous cette ligne vient la liste de vos annotations : vous pouvez filtrer par catégorie, aller au passage, modifier ou supprimer. Échap ou « Fermer » referme le panneau et rend le focus au bouton,
5. **garder et partager** : « Exporter (Markdown) » et « Exporter (JSON) » téléchargent toutes vos annotations, dans un fichier nommé à l’heure de l’export. « Importer (JSON) » reprend un export, par exemple sur un autre navigateur. « Tout effacer » supprime les annotations et leur clé.

**Où vont vos annotations.** Elles restent dans ce navigateur, sur cet appareil. Elles y sont chiffrées sous une clé que la page ne peut pas exporter. Ce chiffrement empêche une lecture rapide du stockage ou une copie de son texte. Il ne protège ni d’un script qui tourne dans la page, ni d’une personne qui a un accès complet à votre profil de navigateur. Ouverte depuis le disque, au moins dans Chrome et Edge, la page partage aussi ce stockage avec tout autre fichier HTML ouvert depuis le disque : un tel fichier peut lire vos annotations, car il partage aussi leur clé. N’ouvrez dans ce navigateur que des fichiers locaux de confiance, ou réservez au guide un profil de navigateur. Vos annotations ne vous suivent pas sur un autre navigateur : exportez-les pour les garder. Les exports sont en clair. Rien n’est envoyé.

> **⚠️ Attention**
>
> Un export d’annotations est un fichier en clair. N’y écrivez rien que vous ne mettriez pas dans un document ordinaire : ni mot de passe, ni donnée d’une personne.

Le PDF ne propose pas d’annotations : elles n’existent que dans la version web.

### D.6 Lire un Markdown avec son rendu complet

Un rapport, une spécification ou un plan que Claude vous rend arrive souvent en [Markdown](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-markdown), avec des tableaux et des schémas [Mermaid](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-mermaid). Mermaid transforme une description en texte en diagramme [\[86\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mermaid-intro). Dans le terminal, vous lisez le texte brut, et le schéma n’apparaît pas. Pour le lire rendu, plusieurs moyens existent, chacun avec son prix.

Chez Passerelle 🌉, Inès reçoit de Claude un rapport sur un lot de courriers fictifs, avec le schéma du circuit courrier, brouillon, relecture. Dans le terminal, le schéma n’est qu’une suite de flèches en texte. Elle l’ouvre dans l’aperçu de son éditeur, et le voit dessiné.

**Tableau :** Lire un Markdown avec son rendu, cinq moyens, d’après [\[144\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-vscode-markdown) pour l’aperçu de VS Code. Les autres lignes sont proposées par ce guide.

| Moyen | Pour | Contre |
| --- | --- | --- |
| l’aperçu de l’éditeur. Dans VS Code : Ctrl+Maj+V, ou Ctrl+K puis V pour l’ouvrir à côté, et sous macOS Maj+Cmd+V, ou Cmd+K puis V [\[144\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-vscode-markdown) | déjà installé, et il suit l’écriture. L’aperçu Markdown intégré de VS Code, celui d’un fichier ouvert dans l’éditeur, rend les schémas Mermaid, au 9 novembre 2026 [\[144\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-vscode-markdown) | dépend de l’éditeur : un autre peut demander une extension |
| une [visionneuse locale](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-visionneuse-locale), servie sur `127.0.0.1`, qui embarque une bibliothèque de rendu Markdown, Mermaid et un assainisseur de HTML | rendu complet, hors ligne. Vos fichiers restent sur le poste | un programme de plus à lancer, une racine à restreindre aux dossiers voulus, un arrêt après inactivité. Ses bibliothèques s’épinglent par empreinte, et le HTML s’assainit, car un fichier Markdown peut en contenir |
| un livre statique, comme mdBook avec son extension Mermaid | navigation et recherche sur beaucoup de fichiers | une étape de construction. À un essai de ce guide, le 6 novembre 2026, son thème d’origine montrait des défauts d’accessibilité, à corriger avant de s’y fier |
| le rendu de la forge, le site qui héberge le dépôt | aucune installation, schémas rendus | il faut pousser : il ne vaut que pour un dépôt qui peut partir ([chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23)) |
| un lecteur Markdown dans le terminal | sans quitter le terminal | aucun schéma |

> **⚠️ Attention**
>
> Coller un fichier dans un site de rendu en ligne, c’est l’envoyer. Ne le faites jamais pour un fichier confidentiel, ni pour un fichier qui contient des données d’une personne : chez Passerelle, aucun rapport qui cite un courrier ne part sur un site. Préférez l’aperçu de l’éditeur ou une visionneuse locale.

**Tableau :** Quel moyen choisir, à trois niveaux. Proposé par ce guide.

| Si vous… | Faites | Pourquoi |
| --- | --- | --- |
| débutez | ouvrez l’aperçu de votre éditeur | rien à installer, et le rendu suit le fichier |
| êtes à l’aise | servez une visionneuse locale sur `127.0.0.1` seulement, sur le dossier du projet | le rendu complet, sans que les fichiers quittent le poste |
| voulez aller plus loin | lancez la visionneuse par une commande nommée de votre gestionnaire de tâches, avec sa racine et son arrêt après inactivité | la même configuration à chaque fois, sans oubli |

> **📏 La limite**
>
> Un rendu propre ne rend pas le contenu juste : un rapport bien dessiné se relit comme le texte brut, preuve par preuve ([chapitre 15](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch15)).

### D.7 Les vues de la conversation et les styles de sortie

Deux réglages changent ce que vous voyez du travail, sans rien changer à ce que Claude fait : la vue de la conversation et le [style de sortie](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-style-de-sortie).

- **La vue.** Dans l’application de bureau, le menu de la session, ouvert par la flèche à côté de son titre, propose « Transcript view », et Ctrl+O fait défiler ses vues [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-desktop). Dans le terminal, Ctrl+O ouvre la vue détaillée, avec le détail des outils et le raisonnement en gris [\[36\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-interactive-mode) [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-model-config).
- **Le style.** Il se choisit par `/output-style`, par `/config` dans le terminal, ou par la clé `outputStyle` des réglages. Il s’applique dès le message suivant, à la session principale et pas aux sous-agents [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-output-styles). D’autres styles existent, comme « Concise », qui raccourcit les réponses [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-output-styles).
- Dans l’application de bureau, la voie décrite par la documentation est le champ `outputStyle` d’un fichier de réglages, par exemple `.claude/settings.local.json` [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-output-styles). Ce guide s’en tient à cette voie. Le menu de la session, décrit plus haut pour la vue, ne l’est pas pour le style : un choix du style dans ce menu, vu dans l’application le 6 novembre 2026, n’est pas décrit par la documentation, relue le 9 novembre 2026 [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-desktop).

**Tableau :** Les vues et les styles, ce qu’ils montrent et leur prix, d’après [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-desktop), [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-output-styles) et [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-model-config).

| Réglage | Ce qu’il montre | Quand l’utiliser | Le prix |
| --- | --- | --- | --- |
| vue « Normal » | les appels d’outils réduits à un résumé, les réponses en entier [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-desktop) | le travail courant, les longs lots autonomes | ce qu’a fait un outil reste caché derrière son résumé |
| vue « Thinking » | la même chose, plus le raisonnement. Elle n’apparaît au menu qu’une fois que Claude a raisonné dans la session [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-desktop) | une conversation de travail ou un atelier, pour suivre le raisonnement | aucun jeton de plus, puisque le raisonnement est facturé qu’il soit affiché ou non [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-model-config). Plus de texte à lire, et un raisonnement qui peut ancrer votre jugement sur la première piste |
| vue « Verbose » | chaque appel d’outil, chaque fichier lu et chaque étape, plus le raisonnement [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-desktop) | comprendre pourquoi Claude a fait telle action | beaucoup de texte à lire |
| style « Default » | aucune consigne de style ajoutée [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-output-styles) | l’exécution courante, les longs lots | les choix du code ne sont pas expliqués |
| style « Explanatory » | de courts blocs « Insight » qui expliquent les choix, sans les écrire dans vos fichiers [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-output-styles) | comprendre ce qui se passe, en atelier | des réponses plus longues : plus de jetons en sortie, de contexte et de forfait |
| style « Learning » | les mêmes blocs, et Claude vous laisse écrire de petits morceaux de code marqués `TODO(human)`, puis attend [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-output-styles) | se former en écrivant soi-même | des réponses plus longues encore, et un travail plus lent |

Les consignes d’un style ajoutent aussi des jetons en entrée, que le cache réduit après la première requête [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-output-styles).

> **💡 Conseil**
>
> Pour une conversation de travail ou un atelier, où l’on veut comprendre ce qui se passe, choisissez la vue « Thinking » dans l’application (la vue détaillée par Ctrl+O dans le terminal) et le style « Explanatory ». Le prix : plus de texte à lire, des réponses plus longues qui consomment plus de jetons, de contexte et de forfait, et un raisonnement affiché qui peut distraire ou ancrer. Revenez à « Normal » et « Default » pour l’exécution courante, passez en « Verbose » pour comprendre un appel d’outil qui a dérapé, et prenez « Learning » pour vous former. Chez Passerelle, Inès forme deux nouvelles bénévoles en « Thinking » et « Explanatory », puis repasse en « Normal » pour le lot du soir.

### D.8 La page de titre, les parties et le bas de page

**L’entrée de la page de titre.** À l’ouverture du guide, la page de titre apparaît en quelques secondes, dans un ordre fixe. D’abord le ciel, la lune et les étoiles, puis une ville de nuit en pixel art, qui s’allume des immeubles lointains aux plus proches. Viennent ensuite le logo, puis le reste de la page, qui monte doucement du bas en fondu, et enfin le titre, qui s’écrit lettre à lettre. Un défilement, une touche ou un clic pendant l’entrée affiche tout d’un coup, titre compris.

**Le décor sur toute la page.** La ville reste derrière tout le guide, dans les marges, et la colonne du texte garde son fond plein. Quand vous faites défiler la page, ses plans glissent chacun à sa vitesse, quelques lumières s’allument et s’éteignent, et des véhicules passent dans le ciel. Tout en bas, une scène de rue, au pied des immeubles, précède le bas de page. En thème clair, la nuit devient une aube pâle, pour que le texte reste lisible. Le texte du guide, lui, apparaît en fondu, en montant de quelques pixels, quand il entre dans l’écran, sauf si le réglage « réduire les animations » de votre système est actif, sous un contraste forcé, avec « Animations : Désactivées » ou dans le style Classique.

**Ce qui coupe le mouvement.** Le décor n’est jamais nécessaire à la lecture. L’entrée est sautée, et tout s’affiche d’un coup, si vous choisissez « Animations : Désactivées » ou le style Classique dans les options ([section D.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-d-2)), si le réglage « réduire les animations » de votre système est actif, sous un contraste forcé, et quand la page s’ouvre sur une section précise ou déjà défilée. L’entrée est aussi sautée si la page met plus d’une seconde et demie à se poser : tout s’affiche alors d’un coup. Avec « Animations : Désactivées » ou le réglage du système, le décor ne bouge plus non plus : aucun plan ne glisse, aucune lumière ne clignote, aucun véhicule ne passe. Sans JavaScript, tout reste visible, sans entrée.

**Les intercalaires de partie.** Chaque partie s’ouvre sur un grand panneau centré, son intercalaire : une icône dans un médaillon, puis le nom de la partie et ses chapitres, par exemple « Partie I », « Bien démarrer et bien travailler », « Chapitres [1](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch1) à [13](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch13) ». Les annexes ont le leur. Le sommaire mène à chacun ([section D.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-d-1)). À l’impression, chaque intercalaire prend une page à lui, comme une page de garde.

**Le cadrage.** Sous l’autrice et la version, un encadré dit en quelques lignes pourquoi ce guide, à quoi il sert, comment il se lit et pour qui, puis la version de Claude Code qu’il décrit.

**La licence.** La page de titre n’en garde qu’une ligne : les icônes Creative Commons et le lien « Licence CC BY-NC-ND 4.0 et permissions ». Ce lien mène au bloc « Licence et permissions », tout en bas de la page, après les sources, qui donne la licence en entier et ses permissions.

**La mention de transparence.** Elle dit avec quels outils d’intelligence artificielle ce guide a été fait, et qui en porte la responsabilité. Elle vient après les sources, juste avant le bloc de licence.

**Le bas de page.** La page se termine par un bas de page, sous la scène de rue : le logo du guide, son titre et son sous-titre, l’autrice et la version, la ligne de licence, avec ses icônes et son lien vers le bloc de licence, la ligne de contact, et « Haut de page », qui ramène à la page de titre.

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/#toc)
