> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.2.0 : « 6. Choisir ses extensions », partie 1 sur 2.
>
> - Précédent : [5. Vérification et tests](https://gmag-dev.github.io/bien-demarrer-claude-code/md/5-verification-et-tests.md)
> - Suivant : [6. Choisir ses extensions (partie 2 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/6-choisir-ses-extensions-2.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-ch6>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## 6. Choisir ses extensions

> **🪪 Ce chapitre**
>
> **Pour qui** : toute personne qui retape chaque jour les mêmes demandes, ou qui a vu Claude oublier deux fois la même règle, et qui se demande quoi ajouter à Claude Code, et à quel moment, selon son niveau et son projet.
>
> **Sur quel poste** : n’importe lequel, avec Claude Code. Ce chapitre fait choisir, sans rien écrire : le [chapitre 7](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch7) écrit les deux premières extensions.
>
> **Ce que vous apprenez** : choisir l’extension qui répond à une gêne, selon votre niveau et votre projet, et justifier ce choix par la preuve qui montrera qu’elle agit.
>
> **Deux chemins** : si vous débutez, lisez tout le chapitre et faites les trois barreaux : comptez 20 à 30 minutes pour l’exercice. Si vous répondez juste à la question ci-dessous, lisez les encadrés « Quand la règle cède », les lignes « La limite » et la carte de la [section 6.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s6-2), puis faites le barreau ③.
>
> **Le fil rouge** 🌉 Passerelle : trois gênes reviennent, le prompt qu’Inès retape chaque matin, le contrôle que Claude a oublié deux fois, et le lexique de l’association, que Claude ne voit pas. L’équipe choisit pour chacune l’extension la plus légère qui y répond. Bernard branche un petit serveur qui fait lire à Claude le lexique, en lecture seule, présenté au [chapitre 18](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch18).
>
> **Où en est Passerelle** : en arrivant, un contrôle des dates et des montants, qui a trouvé un brouillon qui avait perdu un délai et un autre qui ajoutait un montant, et un premier commit relu ([chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch5)). À la fin du chapitre, chaque gêne a son extension choisie, avec la preuve attendue, et le serveur du lexique est branché. Le skill et le hook s’écrivent au [chapitre 7](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch7).

Les outils intégrés suffisent à la plupart des tâches. Pourtant, certaines gênes reviennent : une consigne oubliée deux fois, un long prompt retapé chaque jour, une action qui dépend encore de la mémoire de Claude. Claude Code a pour elles des extensions : une connaissance chargée à la demande, une connexion vers un autre système, un automatisme, un travailleur isolé, ou un emballage pour partager le tout [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-features-overview). Chacune a un prix, et la plus lourde n’est pas la plus sûre. Ce chapitre apprend à choisir l’extension qui répond à la gêne, selon votre niveau et selon votre projet, avant d’en écrire une : il part de vos gênes, donne une carte courte des composants, puis l’ordre dans lequel les choisir. Le [chapitre 7](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch7) écrit les deux premières.

> **⏭️ Vous pouvez sauter ce chapitre si…**
>
> Chez Passerelle, trois gênes reviennent : un long prompt qu’Inès retape chaque matin, un contrôle que Claude a oublié deux fois de lancer, et le lexique de l’association, que Claude ne voit pas. Quelle extension choisissez-vous pour chacune, et dans quel ordre les ajoutez-vous ? Écrivez votre réponse avant d’ouvrir la réponse attendue.
>
> **Voir la réponse attendue**
>
> Un skill pour le prompt, réservé à la commande d’Inès s’il modifie des fichiers. Un hook pour le contrôle, parce qu’il doit arriver à chaque fois, et qu’un skill ou une ligne de `CLAUDE.md` resterait une consigne. Pour le lexique, sa ligne de commande s’il en a une, sinon un serveur MCP local en lecture seule. On les ajoute une à une, quand la gêne apparaît, et chacune se prouve par son effet. Une réponse d’experte dit aussi ce que le projet fait éviter : sur un poste qui n’admet que les hooks de l’organisation, le contrôle passe par une règle de permission, un hook git ou l’intégration continue.
>
> Vous avez ces éléments ? Lisez seulement les encadrés « Quand la règle cède », les lignes « La limite » et la carte de la [section 6.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s6-2), puis faites le barreau ③ de l’exercice. Sinon, lisez le chapitre dans l’ordre : il est écrit pour vous.

### 6.1 Partir d’une gêne

Une extension a un prix : elle ajoute du contexte à vos sessions, ou exécute du code avec vos droits [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-features-overview) [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks). Installée sans gêne à régler, elle coûte sans rien rendre. N’installez donc rien d’avance. La documentation conseille de commencer par `CLAUDE.md` seul, et d’ajouter une extension quand son déclencheur apparaît [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-features-overview). Chaque extension répond à une gêne que vous avez déjà rencontrée. Le [tableau 6.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#tab-6-1) part de ces gênes.

**Tableau 6.1 :** Le déclencheur de chaque extension, d’après [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-features-overview). La colonne Passerelle est proposée par ce guide.

| Déclencheur | Ajouter | Chez Passerelle 🌉 |
| --- | --- | --- |
| Claude se trompe deux fois sur une convention ou une commande | une ligne dans `CLAUDE.md` | « un brouillon s’adresse à la personne par vous » |
| Vous tapez toujours le même prompt pour démarrer une tâche | un [skill](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-skill) que vous lancez vous-même | le prompt du brouillon, retapé par Inès chaque matin ([section 7.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-1)) |
| Vous collez la même procédure pour la troisième fois | un skill | la marche à suivre pour un courrier qui annonce un délai |
| Vous copiez sans cesse des données d’un système que Claude ne voit pas | un serveur [MCP](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-mcp), s’il n’existe pas de ligne de commande | le lexique de l’association, lu par un serveur local en lecture seule ([chapitre 18](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch18)) |
| Claude lit beaucoup de fichiers pour trouver où un symbole est défini | un [plugin](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-plugin) d’intelligence de code | aucun usage |
| Une tâche annexe inonde la conversation d’une sortie inutile | un [sous-agent](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-sous-agent) | la relecture d’un lot de brouillons ([chapitre 8](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch8)) |
| Quelque chose doit arriver à chaque fois, sans le demander | un [hook](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-hook) | aucun numéro qui ressemble à un vrai dans un fichier ([section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-2)) |
| Un second dépôt a besoin de la même configuration | un plugin | une association voisine qui reprend l’outil |

Chaque extension intervient à un moment précis de la session ([figure 6.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#fig-6-1)). Au démarrage, Claude Code charge `CLAUDE.md`, les descriptions des skills et les noms des outils MCP. Le contenu complet d’un skill n’est chargé que lorsqu’il sert [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-features-overview). Pour les outils MCP, seuls les noms se chargent au démarrage, et leurs schémas complets restent différés jusqu’à ce qu’une tâche les demande [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-features-overview) ([section 18.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s18-3)). Les hooks, eux, s’exécutent hors de la conversation, à des événements fixes [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-features-overview).

*Dessin : Les points d’extension sur la vie d’une session. Schéma : la description suit.*

**Figure 6.1 :** Les points d’extension sur la vie d’une session. En gris ce qui est toujours là au démarrage, et l’outil. En bleu les moments où Claude décide, d’après ce qu’il lit. En vert les hooks qui tiennent à chaque fois, en ambre ceux dont le code 2 impose un arrêt ou un retour au travail, en tirets votre geste. D’après [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-features-overview) et [\[59\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks-guide).

La même session, en texte :

1. Au démarrage, Claude lit `CLAUDE.md`, les descriptions des skills et les noms des outils MCP. Le hook `SessionStart` s’exécute.
2. À votre prompt, le hook `UserPromptSubmit` peut le rejeter avant que Claude le lise.
3. Claude lit alors la demande. Au choix d’un outil, il charge un skill s’il sert, ou lance un sous-agent. Le hook `PreToolUse` peut bloquer l’appel.
4. Après l’exécution, le hook `PostToolUse` peut lancer un contrôle.
5. À la fin du tour, le hook `Stop` peut renvoyer Claude au travail. C’est là que Bernard branche son contrôle de tout le dossier, une fois par tour plutôt qu’après chaque écriture ([section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-2)).

Deux extensions de ce tableau ont leur propre place dans le guide. Le sous-agent est l’objet du [chapitre 8](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch8). Le serveur MCP relie Claude à un service externe, un gestionnaire de tickets, une base de données, un navigateur [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mcp). Si le système a une ligne de commande, laissez plutôt Claude s’en servir : elle coûte moins de contexte, car elle n’ajoute aucune liste d’outils [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-costs). La commande `/mcp` montre l’état de vos serveurs [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mcp). Chez Passerelle, Bernard a branché un seul serveur, local, qui ne fait que lire le lexique de l’association sur le poste et n’a qu’un outil : rendre l’explication d’un mot.

> **⚠️ Attention**
>
> Connecter un serveur MCP, c’est faire entrer dans la session ce qu’il lit. Un serveur qui récupère du contenu externe vous expose à l’injection de prompt [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mcp). Anthropic examine les connecteurs de son annuaire selon ses critères de référencement, mais ne fait l’audit de sécurité d’aucun serveur MCP [\[21\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-security). Ne connectez qu’un serveur dont vous connaissez la provenance, avec les seuls outils dont la tâche a besoin, et retirez-le quand il ne sert plus.

> **💡 Conseil**
>
> Quatre mécanismes reviennent dans la suite du guide, chacun avec son usage et son risque :
>
> - **le skill**, une consigne chargée quand elle sert ([section 7.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-1)). Le [chapitre 21](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch21) apprend à l’écrire, à l’essayer et à le versionner,
> - **le hook**, une commande que le harnais lance à un moment fixe, avec vos droits ([section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-2), puis [section 18.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s18-1)). Un poste géré peut n’autoriser que les hooks de l’organisation ([section 17.6](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-6)),
> - **le serveur MCP**, une connexion vers un autre système, qui fait entrer ce qu’il lit dans la session ([section 18.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s18-3)),
> - **le sous-agent**, un travailleur isolé dans son propre contexte ([chapitre 8](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch8), puis [section 21.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-5)).
>
> Ce guide propose de n’en ajouter qu’un à la fois, quand sa gêne apparaît, puis de prouver qu’il agit. Pour choisir entre eux, voyez la [section 6.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s6-3), puis la [section 21.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-3).

> **🎓 Fonctions avancées et bonnes pratiques : les plugins**
>
> - **Les composants.** Un plugin emballe des skills, des commandes, des agents, des hooks, des serveurs MCP, des styles de sortie, et un dossier `bin/` dont les fichiers entrent dans le `PATH` de l’outil Bash [\[61\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-reference).
> - **Deux dossiers.** `${CLAUDE_PLUGIN_ROOT}` change à chaque mise à jour, et `${CLAUDE_PLUGIN_DATA}` survit aux mises à jour et sert aux dépendances et aux caches [\[61\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-reference).
> - **La validation.** `claude plugin validate`, et `--strict` en intégration continue, vérifie les chemins, les champs et les serveurs MCP du plugin [\[61\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-reference).
> - **La mesure.** `claude plugin details <nom>` donne les jetons que le plugin ajoute à chaque session [\[62\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-install).
> - **Avant d’installer.** Lisez le panneau « Will install », car un plugin lance des hooks et des serveurs MCP [\[62\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-install).
>
> Toutes les fonctions avancées, les bonnes pratiques et les pièges : [annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-l), [section L.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-7).

> **🔀 Quand la règle cède**
>
> - Une extension qui lit du contenu venu d’ailleurs fait entrer du contenu non fiable dans la session : avec des données privées et un moyen de sortie, elle complète la [triade létale](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-triade-letale), les trois propriétés qui, ensemble, permettent de faire sortir ces données ([section 10.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-3)). Le chargement différé des outils MCP est actif par défaut, et la fiche des serveurs MCP dit quand il ne joue pas ([annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-l), [section L.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-5)).
> - Ce qui tient : une extension a les seuls outils et les seules données dont sa tâche a besoin, et ce qui sort se borne par le harnais, pas par une consigne. Un moyen de sortie n’est retiré que si aucun outil restant ne peut sortir ([section 10.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-3)).
> - Pour aller plus loin : sections [18.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s18-3) et [23.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-4). Le serveur de Bernard est présenté au [chapitre 18](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch18), avec sa déclaration et sa sécurité.

### 6.2 La carte des composants

Le [tableau 6.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#tab-6-1) partait de vos gênes. La carte du [tableau 6.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#tab-6-2) part des composants : pour chacun, le jalon où ce guide propose de l’adopter, et sa fiche dans l’[annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-l), avec ses fonctions avancées, ses pièges et ses sources. Les jalons sont les quatre de « Apprendre avec ce guide ». La carte complète, avec ce qu’est chaque composant, le cas où il ne sert pas et son risque, et l’arborescence qui dit où vit chaque fichier, sont dans l’[annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-l), [section L.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-1).

**Tableau 6.2 :** La carte courte des composants de Claude Code. Le jalon est proposé par ce guide, d’après « Apprendre avec ce guide » et l’[annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-l).

| Composant | Jalon où ce guide propose de l’adopter | Sa fiche |
| --- | --- | --- |
| `CLAUDE.md` | Débutant | [section L.9](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-9) |
| règle à `paths` | Confirmé | [section L.9](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-9) |
| commande, comme `/clear` ou `/rewind` | Débutant | [section L.6](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-6) |
| skill | Confirmé | [section L.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-2) |
| hook | Confirmé | [section L.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-4) |
| sous-agent | Confirmé | [section L.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-3) |
| serveur MCP | Confirmé pour un serveur local en lecture seule, déclaré par la [section 18.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s18-3) lue en avance, Expert au-delà | [section L.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-5) |
| plugin | Avancé pour en installer un relu, Expert pour en écrire un | [section L.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-7) |
| réglages et permissions | Débutant pour le [mode Manual](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-mode-manual) et une règle `deny`, Expert pour les couches | [section L.8](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-8) |
| [mode plan](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-mode-plan) | Débutant | [section L.12](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-12) |
| [points de contrôle](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-point-de-controle) et reprise | Débutant | [section L.13](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-13) |
| [style de sortie](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-style-de-sortie) | Confirmé | [section L.10](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-10) |
| [worktree](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-worktree) | Confirmé | [section L.14](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-14) |
| [mode non interactif](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-mode-non-interactif) et [Agent SDK](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-agent-sdk) | Avancé | [section L.16](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-16) |
| [ligne d’état](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-ligne-d-etat) | Expert | [section L.11](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-11) |
| [tâche planifiée](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-tache-planifiee) | Expert | [section L.15](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-15) |

> **🔀 Quand la règle cède**
>
> - Le niveau d’adoption ne dit pas ce qu’un composant garantit. Chaque composant pose une borne qui tient [par construction](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-par-construction) ou [par consigne](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-par-consigne) : `CLAUDE.md`, une règle à `paths`, un skill et un style de sortie restent des consignes, alors que les permissions, la liste `tools` d’un sous-agent et un hook qui tourne tiennent par construction [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-features-overview) [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks) [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permissions) [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sub-agents).
> - Ce qui tient : ce qui doit arriver à chaque fois se confie à un composant qui tient par construction. C’est ce qui ordonne le choix de la [section 6.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s6-3).
> - Pour aller plus loin : [annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-l), [section L.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-1).

### 6.3 Choisir entre les extensions

Plusieurs extensions peuvent sembler proches, et chacune a son coût : du contexte, ou du code exécuté avec vos droits [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-features-overview) [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks). Pour choisir, partez du plus léger, et arrêtez-vous à la première réponse « oui » ([figure 6.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#fig-6-2)). Si Claude trouve la réponse seul en lisant le dépôt, n’écrivez rien [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices). La question du hook vient en premier : `CLAUDE.md` et un skill restent des consignes, que Claude suit presque toujours, alors qu’un hook de type `command` arrive à chaque fois [\[59\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks-guide) [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices). La [section 21.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-3) l’approfondit, avec les skills en `context: fork` et les styles de sortie.

*Dessin : Choisir l’extension, du plus léger au plus lourd. Schéma : la description suit.*

**Figure 6.2 :** Choisir l’extension, du plus léger au plus lourd. En bleu les questions, posées dans l’ordre, en gris les extensions, en ambre la règle que le harnais impose, en vert ce qui ne demande rien de plus. Schéma proposé par ce guide, d’après [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-features-overview), [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks), [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills), [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sub-agents), [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-costs) et [\[61\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-reference).

Le même choix, en texte, où l’on s’arrête au premier « oui » :

1. Cela doit-il arriver à chaque fois, sans exception ? Oui : un hook, exécuté par le harnais.
2. Est-ce une convention à connaître à chaque session ? Oui : une ligne de `CLAUDE.md`, ou une règle à `paths` si elle ne vaut que pour certains fichiers.
3. Est-ce une procédure, ou un prompt que vous retapez ? Oui : un skill, réservé à votre commande s’il agit au-dehors.
4. Une tâche annexe inonderait-elle la conversation ? Oui : un sous-agent, qui ne rend que son rapport.
5. Faut-il des données d’un système que Claude ne voit pas ? Oui : sa ligne de commande, sinon un serveur MCP.
6. Le même outillage sert-il un autre dépôt ou une équipe ? Oui : un plugin, qui emballe le tout.
7. Non à tout : la conversation suffit.

Quatre choix reviennent souvent :

- **Skill ou commande.** Les commandes personnalisées ont été fusionnées dans les skills [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills). Ce guide propose d’écrire toute nouvelle commande comme un skill ([section 21.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-3)).
- **Sous-agent ou session principale.** Un sous-agent convient à une sortie verbeuse, à des outils à restreindre ou à un travail autonome qui rend un résumé. La session principale vaut mieux pour les allers-retours fréquents et les petits changements [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sub-agents).
- **Serveur MCP ou ligne de commande.** La ligne de commande d’abord, quand elle existe : elle coûte moins de contexte ([section 6.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s6-1)).
- **Plugin ou fichiers du projet.** Un plugin n’emballe que ce qui existe déjà. Ce guide propose de prouver chaque pièce dans un projet avant de l’emballer, puis de valider le plugin [\[61\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-reference).

**Tableau 6.3 :** Le même besoin, choisir une extension, à trois niveaux. Proposé par ce guide, d’après [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-features-overview).

| Si vous… | Ce que vous faites | Pourquoi |
| --- | --- | --- |
| débutez | « Voici ma gêne : … Propose l’extension la plus légère qui y répond, dis pourquoi pas un hook ni un serveur MCP, et ne crée rien. » | vous lisez le raisonnement avant qu’un fichier existe |
| êtes à l’aise | vous suivez la [figure 6.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#fig-6-2), puis vous écrivez d’avance la preuve attendue : un brouillon produit, un refus constaté, un rapport vérifié | une extension se juge à son effet |
| allez plus loin | vous combinez deux pièces, par exemple un skill qui lance un sous-agent en [liste blanche](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-liste-blanche), et vous prouvez chacune séparément ([annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-l), [section L.19](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-19)) | une combinaison ne vaut que ce que vaut chacune de ses pièces |

> **📏 La limite**
>
> La figure range des cas simples : une gêne qui appelle une consigne et sa garde demande les deux, et un poste géré peut retirer une branche entière, comme les hooks ([section 6.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s6-5)).

### 6.4 Choisir selon votre niveau

Adopter tous les composants d’un coup, c’est ajouter des risques avant de savoir les lire. Ce guide a donc quatre niveaux, Débutant, Confirmé, Avancé et Expert, chacun validé par un exercice de passage (« Apprendre avec ce guide »). Il propose d’adopter les composants dans le même ordre ([tableau 6.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#tab-6-4)) : un composant arrive quand vous savez prouver qu’il agit, et le suivant attend que le précédent tienne.

**Tableau 6.4 :** Les composants à adopter, niveau par niveau. Le parcours est proposé par ce guide, d’après « Apprendre avec ce guide » et l’[annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-l).

| Niveau | Chapitres | Vous adoptez | La preuve qu’il agit | Vous attendez encore |
| --- | --- | --- | --- | --- |
| Débutant | 1 à 5 | le mode Manual, un `CLAUDE.md` court, le mode plan, un prompt de réalisation, `/clear`, `/rewind`, et une règle `deny` pour ce qui ne doit pas être lu | les sept preuves de l’exercice de passage du [chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch5), de la ligne de `CLAUDE.md` chargée au commit relu | les hooks, les serveurs MCP, les plugins, et tout mode qui ne demande plus votre accord |
| Confirmé | 6 à 11 | un skill réservé à votre commande, un hook `command` qui ferme quand il doute, c’est-à-dire qui refuse l’action quand il ne comprend pas ce qu’il reçoit ([section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-2)), un serveur MCP local en lecture seule, dont la déclaration et la sécurité se lisent en avance à la [section 18.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s18-3), un sous-agent en liste blanche, un worktree par travail en parallèle | un brouillon produit et contrôlé, un refus constaté avec le fichier inchangé, un rapport de sous-agent vérifié | les plugins, les tâches planifiées, `claude -p` hors d’un essai |
| Avancé | 12 à 15 | le diagnostic d’une session décevante, un contrôle qui vérifie ce que le modèle propose, la délégation par des briefs | un même travail lancé sur trois fichiers par `claude -p`, avec des outils permis d’avance et un plafond de tours, et sa sortie relue | les couches de réglages, plusieurs sessions qui se parlent |
| Expert | 16 à 23 | la revue qui cherche à réfuter, les couches de réglages et la défense par la structure, plusieurs sessions, le pilotage chiffré | l’exercice de passage du [chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23), et une fonction avancée par composant, prouvée par un effet constaté ([annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-l), [section L.19](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-19)) | rien, mais chaque fiche se relit à chaque version ([annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-l), [section L.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-1)) |

La colonne « Vous adoptez » reprend ce que « Apprendre avec ce guide » fait maîtriser à chaque niveau. Les autres composants s’y ajoutent quand leur gêne apparaît ([tableau 6.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#tab-6-2)).

Le niveau dit un ordre, pas une permission. Une débutante qui doit protéger un dossier pose une règle `deny` dès le premier jour, et c’est la bonne réponse ([section 10.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-1)). À l’inverse, un composant adopté avant son niveau ajoute un risque que vous ne savez pas encore lire : un hook s’exécute avec tous vos droits, et `/hooks` montre la commande qu’il lance, pas ce que fait le script lancé ([section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-2)).

> **🔀 Quand la règle cède**
>
> - La règle cède quand le projet vous donne un composant avant votre niveau : une équipe qui a déjà ses hooks, un poste dont l’organisation fixe les réglages.
> - Ce qui tient : vous relisez ce que vous héritez comme ce que vous écrivez, avec `/hooks` [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks), `/permissions` [\[21\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-security), et `/status`, qui montre les sources de réglages chargées [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings).
> - Pour aller plus loin : [section 17.6](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-6), et les grilles des [annexes F](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-f) et G.
