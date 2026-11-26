> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.4.2 : « 21. Écrire des skills, des agents et des artefacts », partie 2 sur 3.
>
> - Précédent : [21. Écrire des skills, des agents et des artefacts (partie 1 sur 3)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/21-ecrire-des-skills-des-agents-et-des-artefacts-1.md)
> - Suivant : [21. Écrire des skills, des agents et des artefacts (partie 3 sur 3)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/21-ecrire-des-skills-des-agents-et-des-artefacts-3.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#h-s21-4>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

### 21.4 Tester avant d’écrire

Voir un skill se déclencher prouve que Claude l’a trouvé, pas qu’il a fait ce qu’on voulait [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skills). Le guide de la plateforme décrit une boucle qui commence **avant** d’écrire, sur le modèle du test d’abord du [chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#ch5) [\[66\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skill-authoring-best-practices), reprise dans les mêmes termes par l’article qui présente les skills [\[146\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-equipping-agents-skills) :

1. faire tourner Claude **sans** le skill sur des tâches représentatives, et noter ses échecs,
2. écrire trois scénarios qui testent ces manques,
3. mesurer la ligne de base, toujours sans le skill,
4. écrire le minimum d’instructions qui comble les manques,
5. itérer : évaluer, comparer à la ligne de base, affiner.

Bernard suit la boucle sur trois courriers fictifs, `PASS-C-012`, `PASS-C-027` et `PASS-C-044`. Sans le skill, Claude perd le délai de `PASS-C-027` dans une phrase trop longue, écrit un montant sans sa virgule, et garde le mot « forclusion » sans l’expliquer. Ce sont ses trois scénarios et sa ligne de base. Il n’écrit qu’ensuite les instructions qui comblent ces trois manques, et rien d’autre.

Un scénario se décrit par les skills en jeu, la requête, les fichiers d’entrée et la liste des comportements attendus. La plateforme ne fournit pas d’outil intégré pour les exécuter [\[66\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skill-authoring-best-practices). Claude Code propose un plugin de création de skills qui exécute des cas dans des sous-agents isolés, compare avec et sans le skill, compare deux versions à l’aveugle et règle la description. Nouveau · 7 nov. 2026 `claude plugin eval` exécute des cas avec et sans un plugin [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skills). La méthode manuelle reste faisable partout, sans aucun plugin.

Quatre règles rendent ces essais honnêtes :

- tester dans une **session neuve**, avec le skill puis sans (`skillOverrides` à `"off"`), parce que le contexte resté de la rédaction masque les manques [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skills),
- séparer **Claude A**, qui aide à écrire le skill, et **Claude B**, une instance neuve qui l’utilise sur de vraies tâches. On rapporte à A ce que B a manqué [\[66\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skill-authoring-best-practices),
- tester avec **chaque modèle** prévu, et **observer la navigation** : un fichier relu sans cesse doit remonter dans `SKILL.md`, un fichier jamais ouvert est inutile ou mal signalé [\[66\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skill-authoring-best-practices),
- garder des cas **réservés**, qui ne servent pas à écrire, pour ne pas sur-ajuster : la règle est posée pour les outils d’agents [\[149\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-writing-tools-for-agents). Son transfert aux skills est une inférence de ce guide.

Ce guide distingue deux familles de cas. Les cas de **déclenchement** (doit, ne doit pas) se rejouent à chaque changement de la description. Les cas de **comportement** (le résultat attendu) se rejouent à chaque changement du corps. Leur croisement donne un diagnostic.

**Tableau 21.5 :** La matrice déclenchement et comportement, proposée par ce guide.

| Cas | Le skill se déclenche | Le skill ne se déclenche pas |
| --- | --- | --- |
| doit déclencher | bon signe pour la description. Vérifier ensuite le comportement | faux négatif : revoir la description, avec les mots de la personne et le cas principal en tête |
| ne doit pas déclencher | faux positif : préciser la description, nommer le voisin exclu, ou réserver le skill à la personne qui le tape | bon, rien à faire |
| comportement, si déclenché | résultat attendu : garder le cas comme cas de régression | sans objet |

Les cas d’Inès pour le skill de Passerelle : « fais le brouillon de PASS-C-041 » et « jette un œil à ce courrier » doivent déclencher. « Vérifie les dates du brouillon PASS-B-041 » et « combien de courriers cette semaine ? » ne le doivent pas : le premier revient au skill du contrôle, le second à une simple recherche. Un test automatique vérifie le script et la forme du `SKILL.md`, pas le déclenchement par Claude, qui se vérifie en session.

> **💡 Conseil**
>
> Si votre organisation ne permet pas d’installer le plugin de création de skills, la méthode manuelle donne la même mesure par une étape permise : une session neuve, la liste écrite des demandes, le résultat noté à la main dans la matrice ci-dessus.

### 21.5 Écrire un agent

Un sous-agent ne voit pas ce que voit la session principale : il reçoit son propre prompt système et quelques détails d’environnement, mais **pas** la conversation [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents). Son corps doit donc se suffire à lui-même.

**Tableau 21.6 :** Ce qu’un sous-agent reçoit, et ce qu’il ne reçoit pas, d’après [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents).

| Reçoit | Ne reçoit pas |
| --- | --- |
| le corps de son fichier, comme prompt système | le prompt système de Claude Code |
| le message de délégation | la conversation de la session principale |
| le répertoire de travail et un instantané de l’état git | les fichiers déjà lus |
| les `CLAUDE.md`, sauf Explore, Plan et les agents marqués `omitClaudeMd` | les skills déjà invoqués |
| les skills listés dans son champ `skills`, préchargés en entier | le style de sortie et la mémoire automatique de la session principale |

Seul son rapport revient à la session principale, et c’est une donnée à vérifier, pas une vérité.

Le frontmatter d’un agent n’exige que `name` et `description`. Les autres champs règlent ses droits et son coût. Le piège principal est le premier : **`tools` omis, l’agent hérite de tous les outils** disponibles aux sous-agents, écriture et délégation comprises [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents). Ce guide conseille donc d’écrire toujours la liste, en [liste blanche](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-liste-blanche), et de donner à un agent de revue ou de recherche ses seuls outils de lecture : `tools: Read, Grep, Glob`.

**Tableau 21.7 :** Les champs d’un agent qui comptent le plus, d’après [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents).

| Champ | Rôle | Défaut et piège |
| --- | --- | --- |
| `description` | dit quand déléguer | au-delà de 15 000 jetons de descriptions cumulées, Claude Code avertit au démarrage. Le détail va dans le corps |
| `tools` | liste blanche des outils | omis, l’agent hérite de tous les outils |
| `disallowedTools` | liste d’exclusion, appliquée en premier | une liste d’exclusion oublie facilement un outil, comme PowerShell sous Windows ou NotebookEdit : préférez `tools` |
| `model`, `effort` | modèle et effort | `inherit` ou un nom, choisis selon la difficulté de la tâche |
| `permissionMode` | mode de permission | ignoré si la session principale est en `bypassPermissions`, `acceptEdits` ou auto, et pour un agent de plugin |
| `maxTurns` | plafond de tours | atteint, l’agent s’arrête et sa sortie est marquée partielle. Ce guide ne le pose pas : un plafond coupe un long travail avant son rapport, et l’arrêt d’un agent passe par son brief |
| `skills` | préchargement | contenu complet injecté au démarrage de l’agent |
| `mcpServers`, `hooks` | serveurs et hooks propres | ignorés pour un agent de plugin |
| `isolation: worktree` | copie de travail temporaire | nettoyée si rien ne change |

L’agent de relecture de Passerelle applique le moindre privilège : trois outils de lecture, un modèle nommé, et le skill préchargé.

```markdown
---
name: relecture-brouillons
description: Relit en lecture seule un brouillon de Passerelle contre son courrier fictif, et cherche à le réfuter (date perdue, montant changé, délai adouci, phrase trop longue). À utiliser après l'écriture d'un brouillon et avant sa remise à la relectrice. Rend un rapport classé par gravité, sans rien modifier.
tools: Read, Grep, Glob
model: sonnet
skills: brouillon-pour-relecture
---
```

Un agent dont le champ `tools` ne liste que `Read`, `Grep` et `Glob` ne peut pas modifier un fichier, quoi qu’il décide : la borne tient [par construction](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-par-construction), car le harnais l’applique [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents). Ce que son corps lui interdit en plus tient [par consigne](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-par-consigne) ([section 10.3](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#s10-3)).

**Un corps qui se suffit à lui-même.** Puisque l’agent n’a pas la conversation, son corps doit dire tout ce que la conversation aurait dit. L’article d’Anthropic sur les outils pour agents demande de décrire un outil comme à une personne qui arrive dans l’équipe, en rendant explicite le contexte implicite [\[149\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-writing-tools-for-agents). Ce guide transpose la consigne au corps d’un agent, en sept rubriques.

**Tableau 21.8 :** Les sept rubriques d’un corps d’agent autonome, proposées par ce guide d’après [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents), [\[149\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-writing-tools-for-agents) et [\[66\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skill-authoring-best-practices).

| Rubrique | Contenu | Pourquoi |
| --- | --- | --- |
| Rôle | une phrase : ce que l’agent fait, et ce qu’il ne fait pas | il n’a pas le contexte de la session principale |
| Entrées attendues | ce que le message de délégation doit contenir, et que faire s’il manque | le brief varie, le corps reste |
| Doctrine à lire | les fichiers ou les skills à lire d’abord, ou le champ `skills` | il n’hérite pas des skills invoqués |
| Procédure | des étapes numérotées, avec leurs vérifications | liberté basse pour les étapes fragiles |
| Interdits | ce qu’il ne touche jamais, même si on le lui demande | le harnais applique la liste d’outils, pas l’interdit de méthode |
| Arrêt | le critère d’arrêt, le budget, ce qu’il rend si le budget est atteint | l’agent s’arrête sur son critère, pas sur un plafond qui couperait son rapport |
| Rapport | un schéma fixe | la session principale le lit comme une donnée |

**Le rapport est une donnée, pas une vérité.** Ce guide propose d’en faire un contrat écrit dans la définition de l’agent : une issue, prise dans votre liste de mots d’issue ([section 14.10](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-10)), les livrables avec leur chemin, les preuves (une commande et sa sortie), les faits séparés des hypothèses, ce qui n’a pas pu être vérifié, et la prochaine action proposée. L’article sur les outils pour agents conseille de ne renvoyer que l’information à fort signal, et montre qu’un format concis peut coûter environ un tiers des jetons d’un format détaillé, 72 contre 206 dans son exemple [\[149\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-writing-tools-for-agents). D’où un rapport court, et un fichier pour le détail, cité par son chemin. L’agent de Passerelle fixe ainsi son tableau de constats :

```markdown
## Constats
| # | Gravité | Fichier:ligne | Constat | Preuve | Correction proposée |
|---|---|---|---|---|---|
| 1 | P0 bloquant, P1 important ou P2 mineur | brouillons/PASS-B-027.md:3 | … | citation courte | … |
```

La session principale relit au moins une preuve par livrable avant de s’appuyer sur un rapport. Un rapport sans preuve est noté « non vérifié » ([chapitre 15](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#ch15)). Et l’agent ne décide de rien pour Passerelle : il signale, Bernard corrige, et Odile tranche si le brouillon sert.

> **🎓 Fonctions avancées et bonnes pratiques : les sous-agents**
>
> - **La mémoire d’un agent.** Le champ `memory`, à `user`, `project` ou `local`, lui donne une mémoire persistante, dont les 200 premières lignes ou 25 Ko de `MEMORY.md` entrent dans son prompt [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents).
> - **La reprise.** Chaque lancement crée une instance neuve, et pour continuer un agent, Claude lui écrit par `SendMessage` avec son identifiant : l’agent repris garde tout son historique [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents).
> - **L’imbrication.** Un sous-agent peut en lancer d’autres jusqu’à trois niveaux sous la conversation principale, et vingt sous-agents tournent au plus à la fois par défaut [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents).
> - **Le fork.** Un fork hérite de toute la conversation et du même jeu d’outils, au lieu de partir à vide [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents).
> - **L’agent qui tient la session.** `claude --agent nom` donne à la session principale les outils et le modèle de l’agent, son prompt remplace celui de Claude Code, et dans ce seul cas `tools: Agent(worker, researcher)` limite les types d’agents qu’il peut lancer [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents) [\[41\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sessions).
>
> Toutes les fonctions avancées, les bonnes pratiques et les pièges : [annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#ann-l), [section L.3](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-3).

### 21.6 Essayer un agent

Les sources lues ne publient pas de procédure pour tester un sous-agent. Ce guide propose une règle simple : **essayez un agent sur une petite tâche dont vous connaissez la réponse, dans une session neuve, avant de vous en servir.** Les règles d’essai des skills de la [section 21.4](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-4) s’y transposent : une session neuve, des cas qui doivent le faire choisir et d’autres qui ne le doivent pas.

Bernard essaie l’agent de relecture sur `PASS-B-027`, un brouillon dont il sait qu’il a perdu le délai du 15 décembre 2026. L’agent doit le signaler en P0. Puis il lui demande de corriger le brouillon lui-même : l’agent ne le peut pas, faute d’outil d’écriture. L’essai est le moment de constater ce que la documentation annonce : la liste `tools` est appliquée par le harnais [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents).

Un résultat juste une fois ne suffit pas : pour un agent dont on attend la même chose à chaque fois, la mesure qui compte est la réussite à chaque essai, [pass^k](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-pass-k) ([section 14.3](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-3)) [\[95\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-demystifying-evals). Bernard relance donc le même essai trois fois.

Pour une session entière tenue par l’agent, `claude --agent` lance une session dont le prompt de l’agent remplace le prompt système, et où `CLAUDE.md` se charge encore [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents). Gardez-y le mode Manual :

```bash
claude --agent relecture-brouillons --permission-mode manual
```

> **📌 À retenir**
>
> Avant de relire la liste, répondez de mémoire, puis vérifiez votre réponse dans la section indiquée :
>
> 1. Pourquoi tester un skill dans une session neuve, avec lui puis sans lui ? ([section 21.4](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-4))
> 2. Sur quel cas essayez-vous un agent avant de vous en servir, et pourquoi un résultat juste une seule fois ne suffit-il pas ? ([section 21.6](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-6))
>
> - Un skill est un objet : une interface, le nom et la description, et une implémentation, le corps, chargés par niveaux.
> - La liste des skills a un budget : le cas principal en premier, des descriptions courtes, `/context` et `/doctor` pour mesurer, `/nom` pour un flux connu.
> - Partez du plus léger : une ligne de `CLAUDE.md`, puis un skill, un hook ou un sous-agent seulement quand le cran d’avant ne suffit pas.
> - Testez avant d’écrire : trois scénarios, une session neuve, avec et sans. Déclenchement et comportement se testent à part.
> - Un agent ne voit pas la conversation : une liste `tools` en liste blanche, un corps autonome, un rapport à schéma fixe et des preuves, et un essai répété sur un cas dont vous connaissez la réponse.

> **✏️ Exercice**
>
> **Compétence visée** : écrire et essayer un skill et un agent (partie A). Comptez une séance d’environ une heure.
>
> Prenez un petit dépôt à vous, ou le dossier de Passerelle si vous suivez le fil rouge.
>
> 1. Sans skill, demandez trois fois à Claude, dans une session neuve en mode Manual (`claude --permission-mode manual`), la tâche que vous voulez confier au skill. Notez ce qui manque : ce sont vos trois scénarios et votre ligne de base.
> 2. Écrivez le skill minimal qui comble ces manques : les seuls champs du standard, moins de 100 lignes, un script appelé par `${CLAUDE_SKILL_DIR}` pour l’étape fragile.
> 3. Écrivez deux demandes qui doivent le déclencher et deux qui ne le doivent pas, dont une reformulée avec d’autres mots. Rangez chaque résultat dans la matrice de la [section 21.4](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-4).
> 4. Écrivez un agent de relecture en lecture seule (`tools: Read, Grep, Glob`) qui précharge le skill et rend un rapport à schéma fixe. Essayez-le, dans une session neuve, sur un cas dont vous connaissez le défaut, trois fois.
>
> Si vous suivez Passerelle, le brouillon qui sort de votre skill ne sert qu’après la relecture d’Odile, qui décide s’il est remis à la personne.
>
> **Sans code** : un skill sans script est déjà un skill. À l’étape 2, écrivez un `SKILL.md` en Markdown seul, et remplacez le script par une liste de contrôle écrite. L’agent de l’étape 4 est lui aussi un fichier Markdown.
>
> **Critère de réussite** : les trois manques notés avant d’écrire le skill, les quatre demandes rangées dans la matrice avec leur résultat, et un rapport de l’agent qui signale le défaut connu à chacun des trois essais.
>
> **Pour vous corriger**, sans corrigé : relisez votre travail contre ces cinq points. Chacun se voit dans ce que vous avez écrit ou obtenu.
>
> 1. Vos trois manques ont été notés sans le skill, avant d’en écrire une ligne : ce sont vos scénarios, et votre ligne de base se mesure toujours sans lui ([section 21.4](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-4)).
> 2. Chaque instruction de votre skill comble un des manques notés, et rien d’autre : le minimum d’instructions ([section 21.4](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-4)).
> 3. Chacune des quatre demandes est rangée dans sa case de la matrice du tableau 21.5, et une demande qui devait déclencher le skill sans le faire a conduit à revoir la description, comme Inès a ajouté l’intention de regarder un courrier (sections [21.2](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-2) et [21.4](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-4)).
> 4. Votre agent ne liste que `Read`, `Grep` et `Glob` dans son champ `tools`, et son rapport suit un schéma fixe, avec ses preuves, une commande et sa sortie ([section 21.5](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-5)).
> 5. Le défaut connu est signalé aux trois essais, chacun dans une session neuve : pour un agent dont on attend la même chose à chaque fois, la mesure qui compte est la réussite à chaque essai ([section 21.6](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-6)).
>
> Par le chemin sans code, les cinq points s’appliquent tels quels, votre liste de contrôle écrite tenant la place du script.

**Partie B. Relier et faire durer.** Un skill et un agent qui marchent ne vivent pas seuls. Ils côtoient les fichiers de consignes du projet et ses hooks, ils servent des exigences et des décisions, et ils doivent encore marcher dans six mois. Cette partie les relie, puis les versionne, les évalue et les sauvegarde. Chez Passerelle, le skill et l’agent de relecture de la partie A marchent. Il reste à les accorder avec les consignes partagées, à les relier à l’exigence née de l’entretien avec Josiane, à mesurer leur tenue sur la vague, et à mettre le tout à l’abri.

### 21.7 CLAUDE.md et AGENTS.md

Le [chapitre 2](https://gmag-dev.github.io/bien-demarrer-claude-code/2-bien-demarrer.html#ch2) a posé les bases de `CLAUDE.md`. Pour la personne qui l’écrit, trois faits s’y ajoutent. D’abord, `CLAUDE.md` est du **contexte, pas une configuration** : il est livré comme un message après le prompt système, et Claude essaie de le suivre sans garantie stricte. Pour bloquer quoi que décide le modèle, il faut une [règle imposée](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-regle-imposee), comme un hook `PreToolUse` ([chapitre 18](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#ch18)) [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory). Ensuite, si deux consignes se contredisent, Claude peut en choisir une arbitrairement [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory). Enfin, `/doctor prompt-audit` cherche les consignes écrites pour d’anciens modèles, les renvois vers des fichiers ou des commandes inexistants et les contradictions entre fichiers, dans `CLAUDE.md`, `CLAUDE.local.md`, `AGENTS.md`, les règles, les skills, les commandes, les sous-agents et les styles de sortie. Il ne modifie rien sans accord [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory).

Ce qui n’y va pas : ce que Claude peut tirer du code (l’arborescence, les dépendances), une procédure en plusieurs étapes (un skill), une consigne qui doit s’exécuter à un moment précis (un hook) [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory). Les commentaires HTML de bloc sont retirés avant l’injection : les notes pour qui maintient le fichier ne coûtent rien [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory). Après une compaction, le `CLAUDE.md` racine est relu sur le disque, alors qu’une consigne donnée seulement dans la conversation est perdue [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory).

**[AGENTS.md](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-agents-md)** est un standard ouvert, « un README pour les agents », en Markdown simple, sans champ obligatoire. Il suggère des sections : aperçu, commandes de construction et de test, style de code, tests, sécurité, consignes de commit. Dans un dépôt qui regroupe plusieurs projets, chaque sous-projet a le sien, et le plus proche l’emporte. Plus de 60 000 projets l’emploient, et il est administré par l’Agentic AI Foundation, sous la Linux Foundation [\[150\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-agents-md).

Claude Code lit `AGENTS.md` **seulement** s’il n’y a ni `CLAUDE.md` ni `CLAUDE.local.md` dans le répertoire de travail ou au-dessus. La valeur `claude-md-and-agents-md` du réglage des instructions de projet fait lire les deux, et un `CLAUDE.md` qui importe `@AGENTS.md` marche partout. Ajouter un `CLAUDE.local.md` **arrête** la lecture d’`AGENTS.md` [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory). Pour une équipe qui emploie plusieurs outils, ce guide propose qu’`AGENTS.md` porte le contenu commun et que `CLAUDE.md` l’importe, en n’ajoutant que ce qui est propre à Claude Code.

Chez Passerelle, une association voisine veut reprendre les règles de rédaction des brouillons avec un autre assistant. Samia déplace dans `AGENTS.md` ce qui vaut pour tous les outils (à qui s’adresse le brouillon, aucune donnée réelle, rien ne part sans la relecture d’Odile). Le `CLAUDE.md` de Passerelle n’en garde que deux lignes :

```markdown
@AGENTS.md
Avant de dire « vérifié », lance le contrôle des dates et des montants, et montre sa sortie.
```

> **🔀 Quand la règle cède**
>
> - Les deux sources ne promettent pas la même précédence : `AGENTS.md` annonce que le fichier le plus proche l’emporte [\[150\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-agents-md), la documentation de Claude Code dit qu’en cas de conflit Claude peut suivre l’une ou l’autre consigne [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory).
> - Ce qui tient : un fichier plus proche précise sans contredire, et la recherche de contradictions, par `/doctor prompt-audit` puis par une relecture, fait partie de la revue.
> - Pour aller plus loin : [chapitre 17](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#ch17), sur les couches de réglages.

### 21.8 Les hooks d’un skill ou d’un agent, et l’échec fermé

Un skill ou un agent peut porter ses propres hooks, déclarés dans son frontmatter. Leur durée de vie dépend de l’objet : dans un agent, ils ne vivent que pendant son exécution, et `Stop` y devient `SubagentStop`. Dans un skill, ils s’activent à l’invocation et durent jusqu’à la fin de la session [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks). Écrire un hook dans un objet, c’est donc écrire du code qui tourne avec vos droits, pendant la durée que fixe l’objet, et pas seulement pendant la tâche.

La règle de la garde est celle de la [section 18.1](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-1), que ce chapitre ne redit pas en détail : une garde sort avec le code 2, car le code 1 laisse passer l’action. Le champ `onFailure` à `"block"`, sur un hook de type `command` ou `http`, fait bloquer en plus un hook qui échoue, à partir de la version 2.1.295 [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks). C’est l’[échec fermé](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-echec-ferme).

> **⚠️ Attention**
>
> Une garde portée par un skill continue de tourner après la tâche, jusqu’à la fin de la session, et une garde qui plante laisse passer l’action qu’elle devait arrêter. Déclarez-la en échec fermé, essayez-la sur une entrée mal formée, et écrivez dans son en-tête ce qu’elle ne voit pas.

Chez Passerelle, la première version du skill portait elle-même la garde du numéro de sécurité sociale, dans son champ `hooks`. Bernard constate qu’elle continuait de tourner pour tout le reste de la session, sur des tâches sans rapport, et qu’elle ne tournait pas du tout dans une session où le skill n’avait pas été invoqué. Il la retire du skill et la laisse dans les réglages du projet, où elle vaut pour chaque session ([chapitre 18](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#ch18)). Le skill y gagne une règle de plus : la connaissance vit dans le skill, la garde dans les réglages.

La liste des événements change d’une version à l’autre : renvoyez à la page plutôt que de la recopier [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks). `/hooks` liste les hooks que Claude Code a pris en compte [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks). Ce guide pose une règle : aucun contrôle indispensable ne repose sur un hook de Claude Code seul.

> **💡 Conseil**
>
> Si les réglages de votre organisation n’autorisent que ses propres hooks, ceux de vos skills et de vos agents ne tournent pas. Lisez `/hooks` avant de bâtir une garde sur l’un d’eux, et doublez chaque contrôle d’une étape qui ne dépend pas d’eux, comme une commande nommée du projet ou un hook git ([chapitre 18](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#ch18)).

### 21.9 Spécifier et décider : EARS et MADR

Un skill ou un agent vérifie souvent une exigence. Son verdict ne vaut porte que s’il s’appuie sur un contrôle qui peut échouer, un test ou un contrôle déterministe : il faut donc que l’exigence soit vérifiable. Une exigence vérifiable s’écrit simplement, par exemple : « Quand une personne valide un formulaire vide, le système doit afficher un message d’erreur. »

La norme de référence, publiée ensemble par l’ISO, l’IEC et l’IEEE, est ISO/IEC/IEEE 29148:2018, *Requirements engineering*. Elle traite la construction d’une exigence, les qualités d’une exigence prise seule et d’un ensemble, les attributs et la gestion du changement [\[151\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-iso-29148). Son texte est payant. Ce guide s’en tient à ce qu’en dit sa fiche publique, et à des outils librement lisibles.

**[EARS](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-ears)** (*Easy Approach to Requirements Syntax*) donne à chaque exigence un gabarit fixe, avec un ordre des clauses qui suit la logique du temps : zéro ou plusieurs préconditions, zéro ou un déclencheur, un seul nom de système, une ou plusieurs réponses [\[102\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-ears). La [section 14.5](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-5) en donne les gabarits. Ce que ce chapitre ajoute, c’est la place de l’exigence parmi les artefacts d’un skill : un identifiant, une source, un test, et la version qui la livre.

Au [chapitre 14](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#ch14), l’entretien avec Josiane a donné une exigence : là où le courrier fixe un délai, le brouillon le donne dans sa première phrase. Bernard l’écrit pour le skill, avec son identifiant, puis ajoute le comportement indésirable que le contrôle doit attraper :

```text
PASS-EX-004 (événement) : Quand un courrier contient un délai, le skill brouillon-pour-relecture doit reporter ce délai, tel que le courrier l'écrit, dans la première phrase du brouillon.
PASS-EX-005 (comportement indésirable) : Si une date du courrier manque dans le brouillon, alors le contrôle des dates doit échouer et nommer cette date.
```

Chaque phrase devient un test, et ce test devient le contrôle qui ferme la phase ([chapitre 14](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#ch14)). Le test de `PASS-EX-005` s’est vu échouer sur `PASS-B-027`, puis passer après la correction.

**Les décisions** s’écrivent une par fichier, sous la forme d’un [ADR](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-adr). Nygard propose cinq rubriques : un titre court, un contexte écrit sans jugement, une décision à la voix active, un statut et des conséquences, toutes et pas seulement les bonnes. La numérotation est séquentielle et jamais réutilisée, et une décision inversée est gardée et marquée remplacée [\[152\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-nygard-adr). [MADR](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-madr) 4.0.0 structure le même objet : contexte et problème, options envisagées, décision retenue, et en option les critères, les conséquences, la **confirmation**, les avantages et les inconvénients de chaque option. Il prévoit des fichiers nommés `NNNN-titre-avec-tirets.md` et les statuts proposé, rejeté, accepté, déprécié, remplacé [\[110\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-madr).

```markdown
# 0002 L'outil n'envoie aucun message

Statut : accepté. Date : 2026-11-03.

## Contexte et problème
## Options envisagées
## Décision retenue
## Conséquences
## Confirmation
Un test échoue si .mcp.json déclare un serveur qui envoie des messages, ou si un agent du dépôt de Passerelle liste WebFetch ou WebSearch dans son champ tools. La recherche web du lexique se fait dans un projet à part, sans données.
```

Ce guide propose d’employer la rubrique « confirmation » pour nommer le contrôle (un test, une porte de commit, une règle) qui échouera si la décision n’est plus respectée. Deux principes tiennent l’ensemble : chaque exigence et chaque décision existent **à un seul endroit**, et l’on renvoie de l’une à l’autre par identifiant [\[151\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-iso-29148) [\[152\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-nygard-adr) [\[110\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-madr). On garde aussi une **trace datée** de chaque demande et de la décision qu’elle a reçue.

*Dessin : La chaîne de traçabilité de Passerelle, de la demande au journal. Schéma : la description suit.*

**Figure 21.3 :** La chaîne de traçabilité de Passerelle, de la demande au journal. Chaque maillon cite le précédent par son identifiant, et aucune information n’est écrite deux fois. En tirets le geste d’une personne, en bleu la décision, en vert la preuve. Synthèse de ce guide, d’après [\[102\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-ears), [\[110\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-madr), [\[153\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-semver) et [\[154\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-keep-a-changelog).

La même chaîne, en texte :

1. La demande, tirée de l’entretien avec Josiane, datée, avec la décision qu’elle a reçue.
2. L’exigence `PASS-EX-004`, en EARS, avec sa source.
3. La décision `PASS-ADR-0002`, avec sa rubrique de confirmation.
4. Le test lié à l’exigence, vu échouer puis passer.
5. La version du skill qui le livre, 1.1.0.
6. L’entrée datée du journal des changements.
