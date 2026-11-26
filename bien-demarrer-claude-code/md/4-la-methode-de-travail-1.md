> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.4.0 : « 4. La méthode de travail », partie 1 sur 2.
>
> - Précédent : [3. La fenêtre de contexte](https://gmag-dev.github.io/bien-demarrer-claude-code/md/3-la-fenetre-de-contexte.md)
> - Suivant : [4. La méthode de travail (partie 2 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/4-la-methode-de-travail-2.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#h-ch4>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## 4. La méthode de travail

> **🪪 Ce chapitre**
>
> **Pour qui** : toute personne qui demande à Claude une tâche qui touche plusieurs fichiers, ou qui découvre après coup que Claude a construit autre chose que prévu.
>
> **Sur quel poste** : n’importe lequel, avec Claude Code installé ([chapitre 2](https://gmag-dev.github.io/bien-demarrer-claude-code/2-bien-demarrer.html#ch2)). Le mode plan est le même dans le terminal et dans l’extension de l’éditeur.
>
> **Ce que vous apprenez** : planifier avant de coder, corriger le plan plutôt que le code, et écrire un prompt de réalisation avec ses quatre ingrédients. En complément, poser une question neutre sur un fait passé, et la bonne question avant le prompt.
>
> **Deux chemins** : si vous débutez, lisez le chapitre et faites les trois barreaux : comptez 35 à 45 minutes pour l’exercice. Les sections [4.6](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-6) et [4.8](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-8) sont des compléments que l’exercice ne demande pas, et elles peuvent attendre le jour où vous en aurez besoin. Si vous répondez juste à la question ci-dessous, lisez les encadrés « Quand la règle cède » et « La limite », la dernière ligne des tableaux à trois niveaux, et faites le barreau ③.
>
> **Le fil rouge** 🌉 Passerelle : Inès fait planifier le circuit d’un courrier, du courrier au brouillon puis à la relecture, en mode plan. Samia lit le plan et en corrige une étape. Inès mène aussi l’entretien de besoin avec Samia, puis écrit avec Bernard le prompt de réalisation que les bénévoles reprennent pour chaque courrier, et Thomas lui fait ajouter la raison d’une contrainte.
>
> **Où en est Passerelle** : en arrivant, trente courriers fictifs, un `CLAUDE.md` court et une note de passation, `notes/passation.md`, dans le dépôt. À la fin du chapitre, un plan du circuit, corrigé par Samia et approuvé, est gardé dans `plans/circuit-courrier.md`, et les bénévoles ont un prompt de réalisation qu’ils et elles réutilisent pour chaque courrier.

Claude Code réussit souvent du premier coup une demande simple. Pour une tâche qui touche plusieurs fichiers, deux échecs reviennent : Claude construit autre chose que ce que vous vouliez, faute d’information, ou annonce que c’est fait, faute de moyen de vérifier [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Ce chapitre donne une méthode contre les deux, puis ses outils, du mode plan aux questions qui font dire le vrai besoin.

> **⏭️ Vous pouvez sauter ce chapitre si…**
>
> On vous demande d’ajouter la pagination à l’[API](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-api) des commandes d’un dépôt que vous connaissez mal. Écrivez vos premières demandes à Claude, dans l’ordre. Sans code, la même question : on vous demande de réorganiser un long dossier de documents écrit par d’autres. Écrivez votre réponse avant d’ouvrir la réponse attendue.
>
> **Voir la réponse attendue**
>
> Une réponse d’experte commence par l’exploration, sans rien modifier : une vue d’ensemble du dépôt, puis le parcours d’une commande, de l’API jusqu’à la base [\[43\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-common-workflows). Vient ensuite un plan, en mode plan, lu et corrigé avant toute modification [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permission-modes). Le code vient après, par petits incréments, et la vérification par un contrôle qui réussit ou échoue, sortie montrée [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Sans code, le même ordre : une vue d’ensemble du dossier sans rien modifier, un plan de la réorganisation corrigé avant toute modification, puis un document à la fois, chacun vérifié.
>
> Vous avez ces éléments ? Lisez seulement les encadrés « Quand la règle cède » et « La limite », et la dernière ligne des tableaux à trois niveaux, puis faites le barreau ③ de l’exercice. Sinon, lisez le chapitre dans l’ordre : il est écrit pour vous.

### 4.1 Explorer, planifier, coder, vérifier

Une tâche qui touche plusieurs fichiers échoue rarement d’un coup : Claude part dans une direction que vous n’avez pas vue, et vous le découvrez quand tout est écrit. Pour une telle tâche, avancez donc en quatre temps.

1. **Explorer.** Sur un code que vous connaissez mal, posez d’abord des questions larges, puis resserrez : vue d’ensemble, architecture, données, parcours d’une fonctionnalité de bout en bout [\[43\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-common-workflows). Si vous ne connaissez pas le sujet, c’est le moment du diagnostic : demandez ce qui se passe et pourquoi, sans rien modifier ([chapitre 12](https://gmag-dev.github.io/bien-demarrer-claude-code/12-diagnostiquer-rendre-lisible-reformuler.html#ch12)).
2. **Planifier**, en mode plan : Claude lit et propose une démarche sans modifier vos sources, et vous corrigez le plan avant toute modification [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permission-modes). Une mauvaise direction repérée sur le plan évite un retravail coûteux [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-costs).
3. **Coder.** Approuvez le plan. Claude écrit, de préférence par petits incréments ([section 4.4](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-4)).
4. **Vérifier.** Donnez à Claude un contrôle qui réussit ou échoue, et demandez la preuve qu’il l’a passé [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). En cas d’échec, on revient au code. En cas de succès, on relit et l’on enregistre le travail ([chapitre 11](https://gmag-dev.github.io/bien-demarrer-claude-code/11-commits-et-collaboration.html#ch11)).

L’exploration et le plan répondent au premier échec, la vérification au second. 💡 Conseil : l’enchaînement en quatre temps est une synthèse de ce guide, pas une formule de la documentation.

```text
donne-moi une vue d'ensemble de ce dépôt, sans rien modifier
explique comment un courrier devient un brouillon, fichier par fichier
/plan écris le brouillon de PASS-C-003 selon CLAUDE.md
compare les dates et les montants du brouillon à ceux du courrier, puis montre-moi la sortie
```

*Dessin : Explorer, planifier, coder, vérifier. Schéma : la description suit.*

**Figure 4.1 :** Explorer, planifier, coder, vérifier. Les deux premiers temps se font en mode plan, sans modification. La vérification renvoie au code tant que le contrôle échoue. En tirets votre geste, l’approbation. Synthèse proposée par ce guide, d’après [\[43\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-common-workflows), [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permission-modes) et [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices).

Le même cycle, en texte :

1. Explorer, sans rien modifier, puis planifier : Claude propose, vous corrigez.
2. Approuver le plan corrigé, puis coder par petits incréments.
3. Vérifier : si le contrôle échoue, revenir au code. S’il passe, relire et enregistrer le travail.

> **🔀 Quand la règle cède**
>
> - Le cycle coûte plus qu’il ne rapporte pour une faute de frappe ou une simple question. Sur une tâche qui tient sur plusieurs fenêtres de contexte, le plan et l’état vivent dans des fichiers, pas dans la conversation ([chapitre 3](https://gmag-dev.github.io/bien-demarrer-claude-code/3-la-fenetre-de-contexte.html#ch3)).
> - Ce qui tient : la vérification par un contrôle qui peut échouer, sur toute tâche qui change quelque chose.
> - Pour aller plus loin : sections [14.7](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-7) et [14.8](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-8).

### 4.2 Le mode plan en pratique

Une erreur de compréhension coûte une ligne à corriger sur un plan, et bien plus une fois le code écrit. Lisez donc et corrigez le plan avant de l’approuver. Le [mode plan](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-mode-plan) sépare le moment où Claude comprend de celui où il agit : vous voyez ce qu’il a compris, et ce qu’il compte faire, avant que le moindre fichier ne change. En mode plan, Claude lit les fichiers, lance des commandes d’exploration et rédige un plan, mais ne modifie pas vos sources tant que vous ne l’avez pas approuvé [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permission-modes). Une exception, dans l’encadré « Quand la règle cède » ci-dessous.

On y entre de trois façons : `Maj+Tab` jusqu’à ce que la barre d’état affiche `plan mode on`, le préfixe `/plan` devant un seul message, ou l’option `--permission-mode plan` au lancement [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permission-modes) [\[43\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-common-workflows). `Ctrl+G` ouvre le plan dans votre éditeur de texte, pour le corriger directement [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permission-modes). Quel éditeur ? Celui que votre poste ouvre par défaut, qui n’est pas toujours celui que vous connaissez. S’il vous est inconnu, fermez-le sans enregistrer et prenez le geste sans éditeur : écrivez votre correction dans la conversation, « à l’étape 4, remplace… », avant d’approuver. Le texte du plan est aussi dans un fichier de `~/.claude/plans/`, que vous pouvez copier (fiche ci-dessous). Le plan est écrit sur le disque et rechargé après une compaction [\[30\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-context-window). Pour une faute de frappe ou un renommage, le mode plan est superflu : la documentation le recommande pour les tâches complexes [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-costs).

À l’approbation, Claude propose de continuer en mode auto, de continuer en validant chaque modification, ou de poursuivre la planification 🕘 [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permission-modes).

Chez Passerelle, Inès lance `/plan` pour le circuit d’un courrier, du fichier `courriers/PASS-C-nnn.txt` au brouillon puis à la relecture. Samia lit le plan avec elle, étape par étape, comme elle relirait la consigne d’une nouvelle bénévole. Elle y trouve une étape à corriger : l’exercice ① la reprend.

> **⚠️ Attention**
>
> Approuver sans lire, ou continuer en mode auto, laisse la suite au classificateur, qui décide à votre place : un plan lu ne vaut pas accord sur chaque commande. Les premiers jours, choisissez « continuer en validant chaque modification ».
>
> Pendant le plan lui-même, si le mode auto est disponible, le réglage `useAutoModeDuringPlan`, actif par défaut, fait relire par le classificateur les commandes shell du mode plan, au lieu de vous les demander 🕘 [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permission-modes). Pour qu’elles vous soient demandées, mettez `"useAutoModeDuringPlan": false` dans vos réglages utilisateur, `~/.claude/settings.json`. Le réglage du dépôt ne compte pas [\[32\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-settings-reference).

> **🎓 Fonctions avancées et bonnes pratiques : le mode plan**
>
> - **L’approbation.** Trois choix, passer en mode auto, approuver chaque modification ou continuer à planifier, et `Ctrl+G` ouvre le plan dans votre éditeur pour le corriger avant [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permission-modes).
> - **Le fichier du plan.** Il va dans `~/.claude/plans/`, ou dans le dossier fixé par `plansDirectory`, et il est relu depuis le disque après une compaction ([section 3.2](https://gmag-dev.github.io/bien-demarrer-claude-code/3-la-fenetre-de-contexte.html#s3-2)) [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permission-modes).
> - **`opusplan`.** Cet alias planifie avec `opus` et exécute avec `sonnet` [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config).
> - **La reprise.** Une session finie en mode plan reprend en mode plan, et accepter un plan donne à la session un titre tiré du plan [\[41\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sessions).
> - **Le piège.** Dans une session interactive du terminal où `bypassPermissions` est disponible, même sans être le mode choisi, les blocages du mode plan ne sont pas appliqués : Claude est seulement invité à planifier [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permission-modes).
>
> Toutes les fonctions avancées, les bonnes pratiques et les pièges : [annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#ann-l), [section L.12](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-12).

> **🔀 Quand la règle cède**
>
> - Une session du terminal où `bypassPermissions` est disponible n’applique pas les blocages du mode plan [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permission-modes). Pour un travail qui réunit un contenu non fiable, des données privées et un moyen de sortie, ne continuez pas en mode auto : le classificateur n’est pas une personne qui supervise ([section 2.3](https://gmag-dev.github.io/bien-demarrer-claude-code/2-bien-demarrer.html#s2-3)).
> - Ce qui tient : le plan se corrige, la suite se supervise, en mode Manual.
> - Pour aller plus loin : [section 23.4](https://gmag-dev.github.io/bien-demarrer-claude-code/23-securite-et-propriete-intellectuelle-en-entreprise.html#s23-4).

### 4.3 Spécifier par l’entretien

Quand vous ne savez pas encore précisément ce que vous voulez, demandez à Claude de vous interroger jusqu’à pouvoir écrire une spécification [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Il revient avec des questions sur ce que vous n’avez pas tranché. Une fois la spécification écrite dans `SPEC.md`, lancez la construction dans une session neuve : elle démarre avec un contexte propre et une définition écrite du résultat attendu, contre laquelle vous ferez relire le travail [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices).

```text
Je veux que l'outil prépare les brouillons, mais nous n'avons pas tout tranché. Interroge-moi jusqu'à pouvoir écrire la spécification, puis écris-la dans SPEC.md.
```

Chez Passerelle, Claude demande à Inès que faire d’un courrier sans date, qui relit un brouillon, et si un brouillon peut servir sans relecture. Inès ne tranche pas seule les deux dernières : elle les pose à Samia, qui répond qu’Odile relit chaque brouillon et que rien ne sert sans son accord.

> **🔀 Quand la règle cède**
>
> - Une spécification née d’un entretien reste à relire : une question que vous n’avez pas tranchée peut y entrer comme un choix par défaut.
> - Ce qui tient : `SPEC.md` relu avant la construction, avec des exigences écrites pour qu’un contrôle puisse les vérifier.
> - Pour aller plus loin : [section 14.5](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-5).

### 4.4 Petits incréments et effort

Un grand changement fait d’un seul coup noie ses erreurs dans la masse, et vous ne savez plus laquelle de ses parties a tout cassé. Écrivez donc un fichier, testez-le, puis continuez : les erreurs se voient tôt [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-costs). Pour réorganiser un code existant, procédez par petites étapes testables, en demandant de garder exactement le même comportement [\[43\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-common-workflows). Chez Passerelle, Bernard fait écrire un seul brouillon, vérifie ses dates, puis passe au suivant, plutôt que d’en demander dix d’un coup.

Le temps de réflexion de Claude se règle par le niveau d’effort, qui a un réglage par défaut [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Montez-le pour la session, par `/effort` [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config), devant un bogue dans du code que vous n’avez pas écrit, ou un test instable. Baissez-le pour un brouillon que vous relisez de toute façon. Pour un seul message difficile, le mot [`ultrathink`](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-ultrathink) demande une réflexion plus profonde sans changer le réglage [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). 💡 Conseil : gardez d’abord le réglage par défaut.

« Réfléchis étape par étape » ou « sois minutieux » ne sont pas des mots-clés : ils ne dépassent pas le niveau d’effort réglé [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices).

> **🔀 Quand la règle cède**
>
> - L’effort se règle aussi par agent, dans sa définition [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents).
> - Ce qui tient : le rayon d’impact d’une erreur se borne par les tests et git, pas par la réflexion.
> - Pour aller plus loin : [chapitre 9](https://gmag-dev.github.io/bien-demarrer-claude-code/9-usage-et-cout-sans-credits-d-usage.html#ch9) et [section 15.4](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-4).

### 4.5 Reprendre un code qu’on n’a pas écrit

Un code que d’autres ont écrit cache des choix que vous ne voyez pas, et le premier changement peut casser ce que personne ne vous a dit. Avant de le modifier, faites-en dresser la carte, en mode plan, pour que rien ne change pendant la lecture. Ce guide propose une carte en quatre rubriques :

- les points d’entrée : où le programme commence, une commande, une route, un script de démarrage,
- les modules : ce que fait chacun, en une ligne, et qui appelle qui,
- les dépendances : les bibliothèques, les services externes, les variables d’environnement attendues,
- les flux de données : le parcours d’une donnée importante, de son entrée à sa sortie.

Chaque affirmation de la carte porte sa source, « code » (lu dans un fichier, avec son chemin et sa ligne), « doc » (lu dans une documentation, qui peut être périmée) ou « déduction » (tiré d’un nom ou d’une habitude, sans preuve), et sa confiance : haute, moyenne ou basse. Une lacune ne se comble pas par une supposition : elle devient une question.

```text
Ne modifie rien. Dresse la carte de ce dépôt : points d'entrée, modules, dépendances, flux de données.
Pour chaque affirmation, donne sa source (code avec chemin et ligne, doc, ou déduction) et ta confiance.
Ce que tu ne peux pas établir, écris-le comme une question, pas comme un fait.
```

Chez Passerelle, un ancien bénévole a laissé `range.py`, un petit script qui range les courriers par date d’arrivée. Bernard en fait dresser la carte avant d’y toucher. Une ligne dit « déduction, confiance basse : les courriers sans date vont dans `divers/` ». Il la vérifie en lançant le script sur un courrier fictif sans date.

**Tableau 4.1 :** Reprendre un code inconnu, à trois niveaux, proposé par ce guide.

| Si vous… | Faites | Pourquoi |
| --- | --- | --- |
| débutez | une visite guidée en mode plan, « explique-moi ce dépôt comme à une nouvelle arrivante, sans rien modifier », puis le parcours d’une seule fonctionnalité | vous voyez le tout avant le détail |
| êtes à l’aise | la carte en quatre rubriques, chaque affirmation avec sa source et sa confiance, les lacunes en questions | une déduction ne passe plus pour un fait |
| voulez aller plus loin | la carte dressée par un sous-agent, relue par un second qui cherche à la réfuter (chapitres [15](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#ch15) et [16](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#ch16)), puis des tests qui figent le comportement actuel avant le premier changement | la carte est vérifiée, et le premier changement aussi |

> **📏 La limite**
>
> Une carte dit ce que le code fait, pas pourquoi il a été écrit ainsi : l’intention, seuls une personne ou l’historique peuvent la donner.

### 4.6 L’entretien de besoin, la règle

Quand c’est vous qui menez l’entretien, avec la personne qui demande ou qui se servira de l’outil, interrogez-la sur des faits passés, pas sur ses intentions. Des questions mal posées obtiennent des réponses de complaisance : on vous dit ce que vous voulez entendre, et le besoin réel reste caché. « La dernière fois qu’un délai a été manqué, que s’est-il passé ? » vaut mieux que « utiliseriez-vous un outil qui explique les courriers ? ». Une intention ne coûte rien à promettre, un fait passé a eu lieu. C’est l’esprit du Mom Test, un livre de Rob Fitzpatrick sur les conversations qui évitent les retours biaisés [\[45\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-mom-test).

Avant toute reformulation, gardez la phrase de la personne mot pour mot, entre guillemets, avec sa date. Votre reformulation vient à côté, jamais à la place.

Chez Passerelle, Inès mène l’entretien avec Samia. Elle ne demande pas « un brouillon automatique vous aiderait ? », mais « racontez-moi la dernière fois qu’un délai a posé problème ». Samia raconte un courrier fictif qui disait « dans un délai de quinze jours à compter de la notification » : la personne et la bénévole qui l’aidait avaient compris deux points de départ différents. Inès recopie la phrase de Samia, datée, en tête de `SPEC.md`. Le besoin réel apparaît : le brouillon doit dire d’où part chaque délai, et donner la date de départ quand le courrier la donne.

**Tableau 4.2 :** L’entretien de besoin, à trois niveaux, proposé par ce guide, d’après [\[45\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-mom-test).

| Si vous… | Faites | Pourquoi |
| --- | --- | --- |
| débutez | la phrase de la personne recopiée en tête de vos notes, puis trois questions sur la dernière fois que le problème s’est produit | un fait passé ne se promet pas, il se raconte |
| êtes à l’aise | vos questions relues par Claude avant l’entretien, qui signale celles qui orientent la réponse | une question orientée se voit mieux à froid |
| voulez aller plus loin | vos hypothèses écrites et mises à l’épreuve d’un entretien à l’autre, puis chaque exigence reliée à un fait daté ([section 14.5](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-5)) | l’exigence garde la trace de ce qui la fonde |

> **📏 La limite**
>
> Un entretien dit ce que les personnes font et vivent, pas ce qu’elles feront d’un outil qui n’existe pas encore : cela, seul un essai le montre ([section 14.5](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-5)).

### 4.7 Le prompt de réalisation

Un prompt vague oblige Claude à deviner, et il devine parfois mal : vous perdez alors un tour à corriger ce qu’il a compris. Un [prompt](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-prompt) précis lui apporte une information qu’il n’a pas, et vous épargne en général ce tour de corrections [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Pour explorer, une question ouverte convient très bien. Pour faire, la précision paie.

**Quatre ingrédients.** Un prompt de réalisation dit le résultat attendu et ce que Claude ne peut pas deviner seul. Il réunit quatre ingrédients : le **contexte** (le fichier, le symptôme, ce que Claude ne peut pas voir), le **but**, les **contraintes** (pas de nouvelle bibliothèque, garder l’interface publique) et le [critère de fin](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-critere-de-fin), ce que « fait » veut dire. La documentation de Claude Code recommande de nommer le fichier, de décrire le symptôme et de dire à quoi ressemble « corrigé » [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Celle de la plateforme recommande d’être précis sur le format de sortie et les contraintes [\[46\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-prompting-best-practices). 💡 Conseil : le regroupement en quatre ingrédients est une présentation de ce guide.

**Tableau 4.3 :** Du prompt vague au prompt précis, d’après [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices).

| Au lieu de | Essayez |
| --- | --- |
| « résume ce document » | « résume ce compte rendu en cinq points pour une personne qui n’était pas à la réunion, et termine par ce qui reste à décider » |
| « corrige le bogue de connexion » | « les utilisateurs signalent que la connexion échoue après expiration de la session. regarde le rafraîchissement du jeton dans src/auth/, écris un test qui échoue et reproduit le problème, puis corrige-le » |
| « ajoute un widget calendrier » | « suis le modèle de HotDogWidget.php et construis un widget calendrier qui permet de choisir un mois et de naviguer entre les années. aucune nouvelle bibliothèque » |

Chez Passerelle, Inès écrivait jusqu’ici « réécris ce courrier pour une usagère ». Claude devinait le reste, et devinait parfois mal : un brouillon arrondissait un montant, un autre ajoutait un conseil. Voici le prompt qu’elle a écrit avec Bernard, et que les bénévoles reprennent pour chaque courrier :

```text
Contexte : le courrier fictif PASS-C-003 est dans courriers/. Son brouillon sera lu par une usagère qui lit lentement et préfère les phrases courtes.
But : écris dans brouillons/PASS-B-003.md un brouillon en langage facile, avec « Brouillon pour relecture » en première ligne.
Contraintes : garde chaque date et chaque montant du courrier, à l'identique. N'ajoute aucune date, aucun montant, aucun conseil. Une idée par phrase, quinze mots au plus par phrase.
Critère de fin : chaque date et chaque montant du courrier se retrouve dans le brouillon. Montre-moi la comparaison.
```

Le critère de fin se constate : la comparaison montre ou non chaque date et chaque montant. Au [chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#ch5), Bernard en fait un contrôle qui réussit ou échoue. Le brouillon va ensuite à Odile, qui le relit et décide s’il sert. Si vous préférez une approche à une autre, dites-le d’avance : Claude ne peut pas lire cette préférence dans le code [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Et donnez la chose elle-même, fichier, capture ou sortie, plutôt que de la décrire ([section 3.3](https://gmag-dev.github.io/bien-demarrer-claude-code/3-la-fenetre-de-contexte.html#s3-3)).

**Le test du collègue.** Un prompt clair pour vous peut rester obscur pour qui n’a pas votre contexte, et Claude n’a que ce que vous écrivez. Avant d’envoyer un prompt important, montrez-le donc à une personne qui connaît peu la tâche, et demandez-lui de le suivre. Si elle se perd, Claude se perdra aussi : c’est le test que propose la documentation de prompting d’Anthropic [\[46\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-prompting-best-practices). Elle invite à traiter Claude comme une recrue brillante mais sans contexte sur vos usages, et à numéroter les étapes quand l’ordre ou l’exhaustivité comptent [\[46\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-prompting-best-practices).

Donnez aussi la raison de chaque contrainte : expliquer la motivation d’une consigne aide Claude à mieux cibler sa réponse [\[46\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-prompting-best-practices). Inès a montré son prompt à Thomas, qui lit avec un lecteur d’écran. Il lui a fait ajouter une contrainte, avec sa raison : « Le brouillon sera lu à voix haute par un lecteur d’écran, donc pas de tableau ni de symbole sans mot, qu’il lirait mal. » La raison donnée, Claude peut en tirer ce que la règle ne dit pas : sur ce brouillon, il a écrit « 212,40 euros » plutôt que « 212,40 € », et Thomas l’a vérifié à l’écoute.

**Un rôle d’expert, et l’exactitude.** Écrire « Tu es un expert en… » ne rend pas, en général, les réponses plus exactes : deux études l’ont mesuré sur des questions à choix multiple [\[47\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-zheng-2024-personas) [\[48\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-basil-2025-personas). Une troisième, en prépublication, voit même l’exactitude baisser [\[49\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hu-2026-prism). Une quatrième voit le rôle changer la confiance affichée, pas la justesse des réponses [\[50\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-xu-2025-confidence). Un rôle donné dans le prompt système oriente le comportement et le ton, d’après Anthropic [\[46\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-prompting-best-practices). 💡 Conseil : pour l’exactitude, soignez plutôt la consigne, les exemples et la vérification.

**L’ampleur, sans insistance.** Claude lit souvent une demande de façon prudente, et construit la plus petite chose qui y répond, faute de savoir ce que vous espériez. Quand vous voulez la version complète, dites-le : « sois ambitieux » reste utile, car il précise l’ampleur, que vous êtes la seule personne à connaître [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Il en va de même hors du code : « résume ce rapport » peut donner trois lignes, alors que « résume ce rapport en une page, avec les chiffres clés et les décisions à prendre » dit l’ampleur attendue.

```text
Construis la page d'accueil de l'outil pour les bénévoles. Sois ambitieux : états vide et erreur, navigation au clavier, lecture correcte par un lecteur d'écran, pas seulement la mise en page.
```

À l’inverse, l’insistance ne sert plus. Les modèles actuels suivent une consigne écrite simplement, et les MAJUSCULES ou « IMPORTANT » les poussent surtout à appliquer la règle trop largement [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Si une consigne se perd, le fichier qui la porte est sans doute trop long. Si elle ne souffre aucune exception, elle devient un hook ou une règle `deny`, avec leurs limites ([section 17.3](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#s17-3) et [chapitre 18](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#ch18)).

> **🔀 Quand la règle cède**
>
> - Un prompt précis peut fermer une piste : en nommant le fichier, vous excluez une cause qui serait ailleurs. Et « sois ambitieux » élargit aussi le diff à relire et la consommation.
> - Ce qui tient : quand vous doutez de la cause, nommez le symptôme et demandez d’abord un diagnostic ([chapitre 12](https://gmag-dev.github.io/bien-demarrer-claude-code/12-diagnostiquer-rendre-lisible-reformuler.html#ch12)). L’ampleur se dit, et le critère de fin la borne. Le test du collègue vaut aussi pour le brief d’un sous-agent, qui ne voit pas votre conversation.
> - Pour aller plus loin : [chapitre 12](https://gmag-dev.github.io/bien-demarrer-claude-code/12-diagnostiquer-rendre-lisible-reformuler.html#ch12) et [section 15.2](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-2).
