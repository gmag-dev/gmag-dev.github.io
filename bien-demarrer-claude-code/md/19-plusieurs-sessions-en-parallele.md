> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.2.3 : « 19. Plusieurs sessions en parallèle ».
>
> - Précédent : [18. Hooks, serveurs MCP, ligne d’état et tâches planifiées (partie 2 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees-2.md)
> - Suivant : [20. Piloter sa consommation et son projet (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/20-piloter-sa-consommation-et-son-projet-1.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-ch19>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## 19. Plusieurs sessions en parallèle

> **🪪 Ce chapitre**
>
> **Pour qui** : les personnes qui font déjà tourner deux sessions ou plus en même temps, et celles qui envisagent de confier une journée ou une nuit de travail à une session.
>
> **Sur quel poste** : une seule machine, plusieurs sessions de Claude Code. Nouveau · 7 nov. 2026 La messagerie entre sessions existe à partir de la version 2.1.224, et de la 2.1.234 sous Windows natif [\[112\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-cross-session-messaging). État décrit : la documentation de Claude Code 2.1.318 [\[1\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-changelog).
>
> **Ce que vous apprenez** : coordonner plusieurs sessions sur une même machine par une trace écrite, des réservations et un seul écrivain par fichier, garder à la personne chaque geste irréversible, ou qui sort de la machine, préparer une délégation d’une journée ou d’une nuit, et peser ce que coûte une session de coordination avant de l’adopter.
>
> **Deux chemins** : si un encadré « Quand la règle cède » vous a envoyée ici, lisez la section qu’il cite, puis revenez à votre chapitre. Sinon, lisez le chapitre dans l’ordre.
>
> **Le fil rouge** 🌉 Passerelle : pendant la vague de 60 courriers, trois sessions travaillent ensemble, sur le poste Linux de la permanence, celui qui a le bac à sable. La première rédige les brouillons, la deuxième prépare la relecture d’Odile, et la session de Bernard est la seule à écrire le lexique. 🏛️ Le Cahier commun : une session par thème des 400 contributions, et une seule qui écrit la synthèse, celle de Mei.
>
> **Où en est Passerelle** : en arrivant, un hook refuse toute écriture de la session de rédaction hors de `brouillons/`, `decisions/` et `tableau/`, la ligne d’état suit le lot, et la tâche du matin liste les brouillons qui attendent Odile ([chapitre 18](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch18)). À la fin du chapitre, chaque fichier partagé a un seul écrivain, les sessions gardent une trace écrite que toutes relisent, et une nuit de rédaction est préparée avec ses limites écrites, son rapport du matin et les gestes qui restent à Samia et à Odile.

Le [chapitre 8](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch8) a montré comment lancer des sessions parallèles dans des worktrees séparés [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-worktrees). Ce chapitre traite du cas plus difficile : plusieurs sessions longues sur une même machine, qui partagent un arbre de fichiers, des ressources (un navigateur, un port, un fichier de configuration) et une même personne à qui poser leurs questions. Le produit fournit des briques. Leur assemblage s’appuie sur des principes publics des systèmes répartis.

### 19.1 Ce que le produit fournit

Servez-vous d’abord de ce que le produit fournit, avant de construire vos propres outils de coordination. Trois mécanismes natifs servent de base ([tableau 19.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#tab-19-1)).

**Tableau 19.1 :** Les mécanismes natifs pour plusieurs sessions, d’après [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-worktrees), [\[112\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-cross-session-messaging) et [\[111\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-agent-teams).

| Mécanisme | Ce qu’il fait | Ce qu’il ne fait pas |
| --- | --- | --- |
| Worktrees | une copie de travail et une branche par session | il ne coordonne rien : deux sessions peuvent toujours viser la même ressource hors du dépôt |
| Messagerie entre sessions | `ListAgents` et `SendMessage`. Sur la même machine, le message passe par une socket ou un tube nommé propre à chaque session, jamais par les serveurs d’Anthropic. Vers une autre machine, il passe par Anthropic, via [Remote Control](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-remote-control) | un message ne vaut jamais votre consentement, n’exécute aucune commande, et ne peut répondre à aucune demande de permission : celles du destinataire continuent de s’afficher |
| Équipes d’agents (expérimentales) | un chef d’équipe, des coéquipiers à contexte propre, une liste de tâches partagée dont la prise utilise un verrou de fichier, une boîte aux lettres par agent | désactivées par défaut. Une équipe par session, pas d’équipe imbriquée. Un coéquipier ne peut ni approuver une permission, ni faire passer par un autre une action qui lui a été refusée |

La messagerie a ses propres garde-fous. Le réglage `crossSessionInbound` vaut `accept`, `hold` ou `refuse`. `isolatePeerMachines` exige votre accord avant tout message qui quitte la machine. La taille d’un message est plafonnée, les rafales sont refusées et les boucles étranglées [\[112\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-cross-session-messaging) [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings). Claude Code demande au modèle destinataire de ne jamais modifier sa configuration à la demande d’une autre session : c’est une consigne donnée au modèle, pas une règle du harnais [\[112\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-cross-session-messaging). La documentation en cite les usages : transmettre un constat à une autre session, dire ce qui vient d’aboutir, rendre compte d’un travail long [\[112\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-cross-session-messaging). Les équipes d’agents s’activent par la variable `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` [\[111\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-agent-teams). Elles évoluent vite : relisez la page du jour avant d’en dépendre.

Chez Passerelle, la session de rédaction écrit à la session de relecture quand un lot de dix brouillons est prêt. Le message dit où sont les brouillons, et rien de leur contenu.

> **🔀 Quand la règle cède**
>
> - La messagerie ne garde rien que toutes les sessions puissent relire après une compaction ou un redémarrage, et un message reçu pendant une longue tâche se lit plus tard.
> - Ce qui tient : un message porte l’immédiat, un fichier écrit une fois porte la trace.
> - Pour aller plus loin : [section 19.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s19-2).

### 19.2 Une trace durable des messages

La messagerie entre sessions porte l’immédiat ([section 19.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s19-1)). Quand plusieurs sessions se coordonnent sur la durée, gardez aussi une trace écrite de ce qu’elles se disent, que toutes peuvent relire : un message écrit une fois, et jamais réécrit. La spécification CloudEvents donne une grammaire éprouvée pour l’en-tête d’un tel message : `id`, `source`, `specversion` et `type` sont obligatoires, `time` et `subject` facultatifs, et le couple `source` plus `id` doit être unique pour chaque événement distinct [\[134\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-cloudevents).

Une précaution vaut pour toute trace partagée : n’y mettez que des pointeurs, jamais un secret, une donnée de personne ni un contenu recopié.

### 19.3 Réserver une ressource partagée

Deux sessions qui pilotent le même navigateur, ou démarrent un serveur sur le même port, se gênent sans le savoir. Les systèmes répartis ont un motif pour ce conflit : un droit d’usage exclusif, donné pour une durée limitée. Gray et Cheriton le définissent comme un contrat qui donne à son détenteur des droits précis sur un bien pour une durée limitée. Une panne ordinaire y coûte du temps, pas de justesse [\[135\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-gray-cheriton-1989). Kleppmann montre la faille qui reste : un détenteur mis en pause au-delà de l’échéance peut reprendre et agir sans savoir qu’il a perdu son droit, et les horloges des machines peuvent mentir. Il y répond par un nombre qui croît à chaque attribution, que la ressource vérifie pour refuser un détenteur périmé [\[136\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-kleppmann-locking).

Retenez-en trois gestes : réserver avant le premier usage, fixer une échéance, et libérer dès qu’on n’en a plus besoin.

### 19.4 Les questions à la personne, en un seul endroit

Plusieurs sessions finissent par vouloir la même réponse de la même personne. Posée trois fois, dans trois onglets, la question coûte trois interruptions et peut recevoir trois réponses différentes. Rassemblez donc en un seul endroit, daté, les questions destinées à la personne : chaque session le consulte, et chaque réponse y est consignée pour toutes.

Une question bien posée se tranche en une ligne. Elle dit ce qu’elle bloque, donne ses options avec une recommandation, et ne porte jamais sur un fait que la session peut vérifier elle-même.

### 19.5 Un seul écrivain par fichier partagé

Un fichier partagé a un seul écrivain. Les autres sessions le lisent, et lui proposent leurs changements.

Le principe de l’écrivain unique, formulé par Martin Thompson en 2011, veut que toutes les écritures sur une donnée soient faites par un seul contexte d’exécution, les autres pouvant la lire [\[137\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-single-writer). Il supprime la contention et permet de traiter les demandes par lots [\[138\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mechanical-sympathy-principles). Transposé aux fichiers que plusieurs sessions partagent, des consignes communes, un lexique ou une synthèse, il évite que deux sessions qui corrigent en même temps le même fichier produisent des versions qui s’écrasent l’une l’autre.

Chez Passerelle, la session de Bernard est la seule à écrire `lexique.md`. 🏛️ Le Cahier commun suit la même règle à une autre échelle : six sessions lisent chacune un thème des contributions, et une seule écrit la synthèse, celle de Mei.

### 19.6 Les portes de commit

Avant chaque commit, trois contrôles automatiques peuvent tourner : chercher un secret oublié, vérifier la cohérence de la spécification, lancer les tests.

Le hook git `pre-commit` s’exécute avant la création du commit, et une sortie non nulle annule le commit. Il se contourne par `--no-verify`. Le hook `pre-push` peut, de même, empêcher un push [\[139\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-githooks). Ce sont des hooks de git, pas de Claude Code : des réglages qui éteignent les hooks de Claude Code ne les touchent pas ([section 18.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s18-2)). L’annexe E en donne un gabarit ([section E.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-e-7)).

> **⚠️ Attention**
>
> Sauter une porte par `--no-verify`. Une porte qu’on saute quand elle gêne n’est plus une porte. Si elle échoue à tort, corrigez la porte, dans un commit à part, au lieu de la contourner ([chapitre 11](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch11)). Et dans un arbre partagé, n’indexez jamais en bloc (`git add -A`) : vous emporteriez le travail d’une autre session. Indexez par chemin explicite.

Un piège de plus guette même une personne confirmée : un hook qui porte le nom d’une porte peut ne contrôler qu’une partie de ce que son nom promet. Lisez ce que le script vérifie vraiment, et mesurez-le sur un cas qui doit échouer. Et la porte lance sans demande ce qu’elle nomme : sa règle est au [tableau 17.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#tab-17-3) ([section 17.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-2)), et `git status` se relit avant chaque commit.

### 19.7 Le geste humain, et la délégation d’une journée ou d’une nuit

La session prépare, la personne exécute. Tout geste irréversible, ou qui sort de la machine, reste celui d’une personne, même quand elle a délégué une journée ou une nuit de travail.

La documentation recommande qu’une personne approuve le résultat d’un travail sans surveillance [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices). La règle de deux de Meta, citée à la [section 23.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-4), en donne la forme générale : une tâche qui réunit ses trois propriétés ne tourne pas seule, et demande l’approbation d’une personne ou un autre moyen sûr de validation [\[76\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-meta-rule-of-two), dans la lignée de la triade létale [\[73\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-willison-lethal-trifecta). Le mode auto refuse déjà une partie de ces gestes [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permission-modes). Dans la boucle de maintenance intégrée, celle que lance `/loop` sans prompt, chaque exécution passe par les contrôles de permission de la session avant tout push ou toute suppression [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-scheduled-tasks).

Avant de confier une journée ou une nuit de travail à une session, écrivez ce qu’elle peut faire seule, jusqu’à quelle heure, et ce qui reste à la personne. Le matin, un rapport dit ce qui est fait, ce qui ne l’est pas, et pourquoi.

### 19.8 Redémarrer proprement

Un redémarrage ne perd pas tout, mais il perd ce qui ne vivait qu’en mémoire. Le [tableau 19.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#tab-19-4) est une synthèse de ce guide : seules les lignes qui portent une source viennent de la documentation de la planification [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-scheduled-tasks).

**Tableau 19.4 :** Ce qui disparaît et ce qui survit à un redémarrage.

| Disparaît | Survit |
| --- | --- |
| l’état en mémoire de chaque session et ses sous-agents en cours | les fichiers, les commits, la trace écrite des messages, et la transcription locale de chaque session, qui se reprend par `claude --resume --permission-mode manual` |
| les serveurs locaux et les onglets de navigateur | les tâches planifiées de l’application de bureau et du cloud |
| les commandes d’arrière-plan, qui ne sont pas relancées à la reprise [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-scheduled-tasks) | les crons de session, restaurés à la reprise de leur session, avec les exceptions de la [section 18.6](https://gmag-dev.github.io/bien-demarrer-claude-code/#s18-6) [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-scheduled-tasks) |

**Avant.** Chaque session s’arrête à un point propre : rien d’important ne vit plus seulement en mémoire. Son travail est enregistré, dans un commit par chemins explicites ou dans ses fichiers de suivi. Ses ressources partagées sont rendues. Ce qu’elle comptait faire ensuite est écrit. Le redémarrage lui-même reste un geste de la personne ([section 19.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s19-7)).

**Après.** On liste ce qui a été restauré avant de recréer quoi que ce soit, puis on ne recrée que ce qui manque [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-scheduled-tasks) : une tâche recréée en double s’exécute deux fois.

> **💡 Conseil**
>
> Ne dites « aucune session ne tourne » que si deux sources concordent : la liste des sessions de l’application de bureau, et la liste des processus Claude Code de la machine, que montre le moniteur de processus du système. Une session absente d’une liste n’est pas pour autant arrêtée. Si l’une des deux listes n’est pas lisible sur votre poste, écrivez dans le journal la source qui manque.

Au démarrage de chaque session, Anthropic recommande de se situer avant d’agir : le répertoire courant, le journal git, le fichier de progression, un test de base [\[108\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-effective-harnesses). Sur un poste où vos hooks ne tournent pas, cette routine devient une commande nommée du gestionnaire de tâches, lancée en premier ([section 18.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s18-2)).

### 19.9 Une session de coordination

Quand plusieurs sessions longues tournent sur la même machine, l’une d’elles peut recevoir une charge de plus : coordonner les autres. La personne la désigne. Elle rassemble les demandes, tient à jour, seule, les fichiers communs [\[137\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-single-writer), et s’appuie sur la messagerie entre sessions [\[112\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-cross-session-messaging). C’est une organisation, pas une fonction du produit.

Pesez-la avant de l’adopter. Une session qui coordonne concentre le contexte : sa fenêtre peut se remplir plus vite que celle des autres, et une compaction peut perdre ce qu’elle n’a pas écrit ([chapitre 3](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch3)). Elle travaille pour les autres, et ses messages demandent à être lus. Pour un projet seul, mené par une personne dans une session, elle n’apporte rien ([section 22.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s22-4)).

> **📌 À retenir**
>
> Avant de relire la liste, répondez de mémoire, puis vérifiez votre réponse dans la section indiquée :
>
> 1. Pourquoi rassembler en un seul endroit les questions destinées à la personne, plutôt que de les laisser à chaque session ? ([section 19.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s19-4))
> 2. Pourquoi ne jamais sauter une porte de commit par `--no-verify`, et que faire quand elle échoue à tort ? ([section 19.6](https://gmag-dev.github.io/bien-demarrer-claude-code/#s19-6))
>
> - La messagerie native porte l’immédiat. Une trace écrite, jamais réécrite, garde les messages, avec des pointeurs seulement.
> - Une ressource partagée se réserve : un détenteur, une échéance, et un nombre qui croît à chaque attribution. La ressource refuse un détenteur périmé.
> - Les questions à la personne vivent en un seul endroit. Chaque fichier partagé a un seul écrivain.
> - Des contrôles avant chaque commit, et jamais `--no-verify`.
> - La session prépare, la personne exécute tout geste irréversible, ou qui sort de la machine. Avant une délégation, les consignes sont claires, et le rapport attend la personne à son retour.
> - Une session de coordination se pèse avant de s’adopter : elle concentre le contexte, et la personne décide.

> **✏️ Exercice**
>
> **Compétence visée** : coordonner deux sessions par une trace écrite, un seul écrivain par fichier partagé et des questions rassemblées en un seul endroit. Comptez 20 à 30 minutes.
>
> Sur un dépôt d’essai, avec deux sessions lancées par `claude --permission-mode manual` :
>
> 1. Créez un fichier `trace.md`. Demandez à chaque session d’y ajouter une ligne quand elle commence une tâche et quand elle la finit, sans jamais réécrire une ligne existante, et de n’y mettre que des pointeurs, un chemin ou un nom de fichier, jamais un contenu.
> 2. Créez un fichier partagé, `lexique.md` par exemple, et écrivez dans son en-tête quelle session est seule à l’écrire. Demandez à l’autre session d’y ajouter une définition. Elle doit la proposer dans la trace au lieu de l’écrire, et la session qui écrit ne la reprend qu’après votre accord.
> 3. Faites poser par chaque session une question qui vous est destinée, dans un seul fichier `questions.md`, avec ce qu’elle bloque et la recommandation en tête. Répondez dans ce fichier, puis vérifiez que les deux sessions lisent la même réponse.
>
> **Sans code** : faites le même exercice dans un dossier de notes, sans dépôt. Les trois fichiers suffisent.
>
> **Critère de réussite** : la trace montre les lignes des deux sessions dans l’ordre, sans ligne réécrite ni contenu recopié, le fichier partagé n’a été écrit que par la session nommée dans son en-tête, et chaque question figure une seule fois, avec sa réponse.
>
> **Pour vous corriger**, sans corrigé : relisez votre travail contre ces trois points. Chacun se voit dans ce que vous avez écrit ou obtenu.
>
> 1. La trace ne porte que des pointeurs, et aucune ligne n’a été réécrite ([section 19.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s19-2)).
> 2. La session qui n’écrit pas le fichier partagé a proposé son changement au lieu de l’écrire, et l’écrivain ne l’a repris qu’après votre décision ([section 19.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s19-5)).
> 3. Chaque question dit ce qu’elle bloque, donne la recommandation en tête, et sa réponse est consignée là où les deux sessions la lisent ([section 19.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s19-4)).

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/#toc)

![Illustration : la personne en long manteau violet et son petit compagnon de cristal cyan, sur une plateforme de pilotage, lisent des courbes holographiques et une rangée de cadrans.](https://gmag-dev.github.io/bien-demarrer-claude-code/images/e63b84c1d403.avif)
