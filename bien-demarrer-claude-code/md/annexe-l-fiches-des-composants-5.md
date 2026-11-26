> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.4.1 : « Annexe L. Fiches des composants : fonctions avancées et bonnes pratiques », partie 5 sur 5.
>
> - Précédent : [Annexe L. Fiches des composants : fonctions avancées et bonnes pratiques (partie 4 sur 5)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-l-fiches-des-composants-4.md)
> - Suivant : [Sources (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/sources-1.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#h-s-l-15>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

### L.15 Tâches planifiées

**Rôle.** Une vérification à refaire chaque jour ne devrait pas attendre que vous y pensiez. Une [tâche planifiée](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-tache-planifiee) relance un prompt à heure fixe, dans le cloud, dans l’application de bureau ou dans une session ouverte [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-scheduled-tasks).

**Le choix.** Quatre lieux font revenir un travail, et chacun a ses conditions. Ce guide propose de choisir par trois questions (figure suivante). Ce qu’il faut faire après un redémarrage, lister puis recréer, est la [figure 18.2](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#fig-18-2) ([section 18.6](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-6)).

*Dessin : Où planifier une tâche qui revient. Schéma : la description suit.*

**Figure :** Où planifier une tâche qui revient. En bleu les questions, posées dans l’ordre, en vert les quatre lieux, chacun nommé en tête de sa case. Schéma proposé par ce guide, d’après [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-scheduled-tasks) et [\[132\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-desktop-scheduled-tasks).

Le même choix, en texte, où l’on s’arrête au premier « oui » :

1. La tâche doit-elle tourner ordinateur éteint, sans vos fichiers locaux ? Oui : une tâche du cloud. Elle part d’un clone neuf, en mode auto par défaut, toutes les heures au plus souvent.
2. Lui faut-il vos fichiers, session fermée ? Oui : une tâche de l’application de bureau, avec son mode, son modèle et l’option Worktree. L’ordinateur doit rester éveillé, et une seule exécution de rattrapage part au réveil.
3. Attendez-vous un événement qu’un script peut guetter ? Oui : l’outil Monitor, qui suit le script en continu et coûte souvent moins de jetons qu’un prompt relancé.
4. Non à tout : `/loop`, dans la session ouverte, à intervalle fixe ou au rythme de Claude.

**Fonctions avancées.**

- **Les formes de `/loop`.** Avec un intervalle, un rythme fixe. Sans intervalle, Claude choisit après chaque tour une attente d’une minute à une heure. Sans prompt, une routine de maintenance intégrée, ou votre fichier `loop.md` (`.claude/loop.md`, puis `~/.claude/loop.md`, 25 000 octets au plus) [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-scheduled-tasks).
- **Arrêter.** `Esc` arrête une boucle au rythme choisi par Claude. Une boucle à intervalle fixe s’arrête en demandant à Claude de l’annuler [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-scheduled-tasks).
- **Un rappel unique**, demandé en mots (« dans 45 minutes, vérifie… »), se supprime après son exécution [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-scheduled-tasks).
- **Plutôt que de sonder**, l’outil Monitor suit un script en continu et coûte souvent moins de jetons qu’un prompt relancé [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-scheduled-tasks).
- **Les tâches de l’application de bureau.** Chacune a son mode de permission, son modèle et l’option Worktree. Son prompt vit dans `~/.claude/scheduled-tasks/<nom>/SKILL.md`. Au réveil, une seule exécution de rattrapage part pour la dernière heure manquée des sept derniers jours [\[132\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-desktop-scheduled-tasks).
- **Les tâches du cloud** partent d’un clone neuf, en mode auto par défaut, toutes les heures au plus souvent [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-scheduled-tasks).

**Bonnes pratiques.**

- Après une création dans l’application, « Run now » puis « always allow » à chaque demande, pour que les exécutions suivantes ne s’arrêtent pas [\[132\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-desktop-scheduled-tasks).
- Mettez dans le prompt ses propres gardes de temps, puisqu’une tâche de 9 h peut partir à 23 h après une veille [\[132\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-desktop-scheduled-tasks).
- Après un redémarrage, listez avant de recréer ([section 18.6](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-6)).

**Pièges.**

- Un ordinateur en veille saute l’exécution, et fermer le capot met en veille malgré « Keep computer awake » [\[132\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-desktop-scheduled-tasks).
- Un outil MCP marqué `requiresUserInteraction` arrête la tâche à chaque appel [\[132\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-desktop-scheduled-tasks).
- Supprimer une tâche laisse son dossier `SKILL.md` sur le disque [\[132\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-desktop-scheduled-tasks).
- Une boucle au rythme choisi par Claude n’est pas restaurée à la reprise [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-scheduled-tasks).
- Une boucle `/loop` laissée active dans une conversation déjà longue renvoie tout le contexte à chaque exécution, même la nuit [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices) [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-costs). Arrêtez-la avant de partir ([section 9.4](https://gmag-dev.github.io/bien-demarrer-claude-code/9-usage-et-cout-sans-credits-d-usage.html#s9-4)).

**Génération Claude 5.** Rien de propre à un modèle dans les pages relues.

**Dans le guide.** Sections [18.5](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-5) et [18.6](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-6), [section 19.7](https://gmag-dev.github.io/bien-demarrer-claude-code/19-plusieurs-sessions-en-parallele.html#s19-7).

### L.16 Mode non interactif et Agent SDK

**Rôle.** Le même travail sur plusieurs fichiers, ou dans une intégration continue, ne peut pas attendre vos réponses à chaque tour. Le [mode non interactif](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-mode-non-interactif), `claude -p`, et l’[Agent SDK](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-agent-sdk) en Python et en TypeScript font tourner la boucle de Claude Code depuis un script, une intégration continue ou une application [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless) [\[118\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-agent-sdk-overview).

**Fonctions avancées.**

- **Le mode `--bare`.** Il ne lance aucun hook et ne découvre ni commandes, ni sous-agents, ni plugins, ni serveurs MCP, ni mémoire automatique, ni `CLAUDE.md`. Des skills, il ne charge que ceux du dossier `.claude/skills/` d’un dossier passé par `--add-dir`, sans en donner la liste à Claude : nommez le skill dans le prompt. On passe ce qu’il faut par drapeau : `--append-system-prompt`, `--settings`, `--mcp-config`, `--agents`, `--plugin-dir`. Il ne lit pas la connexion d’un abonnement : sur l’API d’Anthropic, il lui faut une clé d’API. La documentation le recommande pour les scripts, et annonce qu’il deviendra le défaut de `-p` [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless).
- **Les sorties.** `--output-format` vaut `text`, `json` ou `stream-json`. `--json-schema` rend une sortie structurée dans `structured_output`. Le flux marque par `parent_tool_use_id` les messages de chaque sous-agent [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless).
- **Les portes d’intégration continue.** L’événement `system/init` liste `plugin_errors` et `mcp_server_errors` : un tableau non vide doit faire échouer la chaîne, puisque le lancement, lui, sort proprement [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless).
- **Les permissions sans personne.** `--allowedTools` pour les outils permis, `--permission-mode` pour le mode, et `--permission-prompts none` (2.1.259) pour refuser ce qui attendrait une réponse [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless).
- Nouveau · 18 nov. 2026 **Le mode restreint.** `--restricted`, ou `CLAUDE_CODE_RESTRICTED=1`, sert quand un banc d’évaluation pilote `claude` sur une machine partagée, où Claude Code ne doit ni lancer de commande ni lire les réglages de cette machine [\[115\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-cli-reference) [\[1\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-changelog). Il retire les outils intégrés qui lancent des commandes ou du code, et `WebFetch`, sauf s’ils sont nommés dans `--tools`, garde les outils de fichiers dans le dossier de travail, refuse le mode qui retire toutes les demandes de permission et ignore les fichiers de réglages de l’utilisateur, du projet et locaux (2.1.248) [\[1\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-changelog).
- **Le coût.** Le JSON donne `total_cost_usd`, une estimation côté client, et `--max-budget-usd` arrête la session quand la dépense estimée atteint son montant, qui peut être dépassé ([section 15.5](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-5)) [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless) [\[115\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-cli-reference).
- **Le SDK.** Les mêmes outils, la même boucle et la même gestion du contexte, avec des hooks en fonctions, des sous-agents, MCP, les permissions, les sessions, et le chargement des skills, commandes et mémoire de `.claude/` [\[118\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-agent-sdk-overview).

**Bonnes pratiques.**

- En intégration continue, `--bare` et des drapeaux explicites, pour le même résultat sur chaque machine [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless).
- Vérifiez la présence de `structured_output` avant de vous en servir : un refus le laisse absent [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless).

**Pièges.**

- En mode non interactif, `claude -p` n’affiche ni la boîte de confiance ni l’approbation des serveurs du `.mcp.json` : même dans un dossier jamais approuvé, les hooks, le bloc `env` et les serveurs du `.mcp.json` du dépôt s’exécutent sans rien vous demander [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permissions) [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless). Ne le lancez que dans un dépôt que vous avez inspecté ([section 10.5](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#s10-5)).
- L’entrée standard est plafonnée à 10 Mo, et un arrêt par SIGTERM sort en 143 sans résultat pour le tour en cours [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless).
- Un produit tiers bâti sur l’Agent SDK ne peut pas proposer la connexion claude.ai, sauf accord préalable : il passe par une clé d’API [\[118\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-agent-sdk-overview).

**Intégration continue.**

- Nouveau · 18 nov. 2026 **GitHub Actions.** L’action `anthropics/claude-code-action@v1` s’installe par `/install-github-app`, lancé depuis Claude Code, sur un dépôt de github.com dont vous êtes administratrice. Sans entrée `prompt`, elle attend la mention `@claude`. Avec une entrée `prompt`, elle tourne sans mention, et `claude_args` lui passe des drapeaux de la CLI [\[116\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-github-actions).
- **L’authentification.** `ANTHROPIC_API_KEY`, ou `CLAUDE_CODE_OAUTH_TOKEN`, créé par `claude setup-token`, ou une fédération d’identité, sans secret statique dans le dépôt [\[116\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-github-actions).
- **Qui la déclenche.** Sur un ticket ou une demande de fusion, une personne qui a l’accès en écriture au dépôt. Un robot est refusé s’il n’est pas listé dans `allowed_bots`, et un robot listé n’est pas vérifié contre les droits du dépôt [\[116\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-github-actions) [\[81\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-claude-code-action-security).
- **GitLab.** L’intégration est en bêta, maintenue par GitLab : un job lance `claude -p`, et la clé d’API vit dans une variable de la CI [\[117\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-gitlab-ci-cd).
- **Les secrets et l’injection.** Aucun jeton d’accès personnel de GitHub quand l’action accepte des personnes sans accès en écriture, `show_full_output` coupé, aucun code de demande de fusion non fiable récupéré à la racine de l’espace de travail avant l’action sous `pull_request_target` ou `workflow_run`, et le contenu brut d’un contributeur externe relu avant traitement : un commentaire HTML, un caractère invisible ou un attribut caché peuvent porter une instruction [\[81\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-claude-code-action-security). Le détail est à la [section 15.5](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-5).

**Génération Claude 5.** Depuis la version 2.1.302, `claude -p` démarre en mode Manual quand rien ne fixe le mode [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless).

**Dans le guide.** Sections [15.4](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-4), [15.5](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-5) et [18.3](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-3), [chapitre 14](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#ch14) pour les boucles de livraison.

### L.17 Application de bureau

**Rôle.** Vous préférez des fenêtres au terminal, ou vous voulez voir le diff et l’aperçu d’une page sans quitter la session. L’onglet Code de l’application de bureau fait tourner Claude Code avec des panneaux, un aperçu web, des sessions en parallèle et des tâches planifiées [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-desktop).

**Fonctions avancées.**

- **Les panneaux.** Modifications, Navigateur, Terminal, Fichiers, Plan, Tâches d’arrière-plan et sous-agents, déplaçables, détachables dans une fenêtre et réduisibles (version 4.0.0). Sous Windows : `Ctrl+Shift+D` pour les modifications, `Ctrl+Shift+B` pour le navigateur, \``Ctrl+` \``pour le terminal,`Ctrl+\\\` ferme le panneau actif [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-desktop).
- **L’aperçu.** `.claude/launch.json` déclare les serveurs de développement. « Auto-verify changes » est actif par défaut, et `"autoVerify": false` l’éteint pour un projet. Le navigateur a son propre profil, et chaque site extérieur demande un accord [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-desktop).
- **La relecture.** Un commentaire par ligne dans le panneau des modifications, envoyés ensemble par `Ctrl+Enter`. `/code-review` rend une carte avec « Walk through in diff » et « Apply fixes » [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-desktop).
- **Les vues.** Normal, Thinking (le raisonnement en plus) et Verbose (chaque appel d’outil), par `Ctrl+O`. Une question à côté par `Ctrl+;` ou `/btw`, non enregistrée [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-desktop).
- **Les environnements.** Local, SSH, cloud et WSL 2 [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-desktop).
- **Les visuels.** L’outil Artifact publie une sortie de session comme une page web privée et interactive [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-features-overview). Le volet navigateur affiche un aperçu des fichiers HTML, PDF et vidéo [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-desktop).

**Bonnes pratiques.**

- Gardez « Auto-verify changes » actif quand Claude touche une interface web [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-desktop).
- Fixez le mode de départ par `permissions.defaultMode` : les terminaux, les extensions et l’application lisent les mêmes fichiers de réglages [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-desktop) [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-settings).

**Pièges.**

- Le mode `dontAsk` n’existe que dans le terminal, et `Shift+Tab` n’y change pas de mode [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-desktop).
- Une session WSL de l’application ne prend aucun plugin, et une session du cloud ne voit pas ceux du poste [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-desktop).
- Claude ne voit, quand il liste vos sessions, ni celles du cloud, ni celles du terminal ou de VS Code [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-desktop).
- `/desktop`, alias `/app`, continue la session du terminal dans l’application de bureau. Il demande macOS ou Windows x64 et un abonnement Claude, il n’existe donc pas sous Linux [\[67\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-commands).

**Génération Claude 5.** Le sélecteur de mode n’offre le mode auto qu’avec Opus 4.6 ou plus récent, Sonnet 4.6 ou plus récent, Haiku 5.5 ou un modèle Fable, sur l’API d’Anthropic [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-desktop).

**Dans le guide.** Sections [2.1](https://gmag-dev.github.io/bien-demarrer-claude-code/2-bien-demarrer.html#s2-1), [9.3](https://gmag-dev.github.io/bien-demarrer-claude-code/9-usage-et-cout-sans-credits-d-usage.html#s9-3), [18.5](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-5) et [20.3](https://gmag-dev.github.io/bien-demarrer-claude-code/20-piloter-sa-consommation-et-son-projet.html#s20-3), [annexe D](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-d-la-version-web.html#ann-d).

### L.18 La génération Claude 5

**Rôle de cette fiche.** Dire ce que la documentation attache aux modèles en cours, Opus 5.5, Sonnet 5.5, Haiku 5.5 et Nouveau · 8 nov. 2026 Fable 5.1 (Fable 5.2, venu après la version de ce guide : [section 15.4](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-4)), pour qu’une fiche lue plus tard se rapporte à sa génération [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config).

**Ce que disent les pages.**

- **Les alias.** À la version 2.1.319 que décrit ce guide, sur l’API d’Anthropic, `opus` donne Opus 5.5, `sonnet` Sonnet 5.5, `haiku` Haiku 5.5 et `fable` Fable 5.1. `best` donne Fable où il est disponible, sinon Opus. Nouveau · 25 nov. 2026 Depuis la version 2.1.321, `best` donne le même modèle que `opus`, et `fable` donne Fable 5.2, sauf dans les sessions qui passent par la passerelle des applications Claude. Pour refaire un exercice avec Fable 5.1, choisissez son identifiant, `claude-fable-5-1` [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config). Chez d’autres fournisseurs, les alias donnent d’autres versions, et `default` revient au modèle par défaut du compte [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config).
- **Le contexte.** Fable 5.1, Fable 5, Sonnet 5 et suivants, Haiku 5.5, Opus 4.7 et suivants ont une fenêtre d’un million de jetons par défaut. `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` revient à 200 000 [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config).
- **L’effort.** Cinq niveaux, `low` à `max`, quatre sur Opus 4.6 et Sonnet 4.6, qui n’ont pas `xhigh`. Le défaut est `medium` sur Opus 5.5, Sonnet 5.5 et Haiku 5.5, `xhigh` sur Opus 4.7, `high` sur les autres modèles qui le prennent [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config) ([section 15.4](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-4)).
- **La réflexion.** Elle ne se coupe pas sur Opus 5.5, Sonnet 5.5, Haiku 5.5 et les modèles Fable, et le raisonnement adaptatif y est toujours actif. `ultrathink`, tapé dans le terminal, peut monter un tour à `xhigh` (2.1.311) [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config).
- **Le repli de sécurité.** Fable 5.1, Fable 5, Opus 5.5 et Opus 5 rejouent sur Opus 5 une demande signalée en biologie, et sur Opus 4.8 une demande signalée en cybersécurité. Sonnet 5.5 rejoue sur Sonnet 5 une demande signalée en cybersécurité [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config).
- **Haiku 5.5.** Sur l’API d’Anthropic, il tourne à un million de jetons, et ses prompts au-delà de 100 000 jetons coûtent plus cher [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config).
- **Le mode auto et le classificateur**, voir [section L.8](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-8) [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permission-modes).

**Ce qui en découle pour l’expertise.** Ce guide propose trois réflexes. Relire l’effort d’un agent quand son modèle change, puisque le niveau de la session ne s’applique pas à un autre modèle ([section 15.4](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-4)). Mesurer une fenêtre d’un million de jetons par `/context` plutôt que la croire vide ([section 3.1](https://gmag-dev.github.io/bien-demarrer-claude-code/3-la-fenetre-de-contexte.html#s3-1)). Et noter, dans un rapport qui dépend du modèle, l’identifiant complet, comme `claude-opus-5-5`, plutôt qu’un alias qui change de cible [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config).

**Dans le guide.** Sections [3.1](https://gmag-dev.github.io/bien-demarrer-claude-code/3-la-fenetre-de-contexte.html#s3-1), [9.1](https://gmag-dev.github.io/bien-demarrer-claude-code/9-usage-et-cout-sans-credits-d-usage.html#s9-1), [15.4](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-4).

### L.19 Combiner les composants, et passer le jalon Expert

L’expertise tient moins à un composant qu’à leur combinaison. La documentation en donne quatre motifs : un skill qui apprend à se servir d’un serveur MCP, un skill qui lance des sous-agents, `CLAUDE.md` pour les règles et des skills pour la référence, un hook qui agit par un outil MCP [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-features-overview). Elle dit aussi qui l’emporte quand un composant existe à plusieurs couches : les `CLAUDE.md` s’additionnent, les skills, les sous-agents et les serveurs MCP se remplacent par leur nom, les hooks se cumulent [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-features-overview).

**Tableau :** Des combinaisons d’expert, chacune avec son effet et sa limite. Les mécanismes viennent des sources citées, les combinaisons sont proposées par ce guide.

| Combinaison | Effet | Limite |
| --- | --- | --- |
| un agent qui précharge un skill par `skills`, plus un skill en `context: fork` avec `agent` | la connaissance à un seul endroit, l’exécutant à part [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents) [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skills) | un skill réservé à votre commande ne se précharge pas ([section 21.3](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-3)) |
| `isolation: worktree` sur un agent, ou `/batch` | des écritures en parallèle sans collision [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees) [\[67\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-commands) | l’isolation lit le texte des commandes, pas les fichiers écrits |
| un hook `mcp_tool` sur `PostToolUse` | une action vers un autre système à chaque modification [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks) | il tourne avec vos droits, hors du bac à sable |
| un moniteur de plugin démarré à l’invocation d’un skill | une surveillance qui ne coûte rien tant que le skill ne sert pas [\[61\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-plugins-reference) | un moniteur ne reçoit pas les valeurs de `userConfig` |
| `claude -p --bare` avec `--agents`, `--mcp-config` et `--json-schema` | un lancement reproductible et vérifiable en intégration continue [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless) | sans hooks : la garde se place ailleurs |
| un style de sortie et des forks | la même voix dans les sous-tâches qui héritent de la conversation [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-output-styles) | les autres sous-agents ne prennent pas le style |

Ces fiches préparent le dernier jalon du guide. Le jalon Expert couvre les chapitres [16](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#ch16) à [23](https://gmag-dev.github.io/bien-demarrer-claude-code/23-securite-et-propriete-intellectuelle-en-entreprise.html#ch23), et son exercice de passage, à la fin du [chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/23-securite-et-propriete-intellectuelle-en-entreprise.html#ch23), conduit un lot complet (« Apprendre avec ce guide »). Ce guide propose de s’y préparer fiche par fiche : choisir une fonction avancée par composant que vous employez, la prouver par un effet constaté, une sortie, un refus ou un diff, comme au [chapitre 7](https://gmag-dev.github.io/bien-demarrer-claude-code/7-ecrire-ses-premieres-extensions.html#ch7), puis relire la fiche avec la grille de l’[annexe F](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-f-grille-de-relecture-experte.html#ann-f), et noter le résultat dans la grille d’auto-évaluation de l’[annexe G](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-g-grille-d-auto-evaluation.html#ann-g). Une fonction que vous n’avez pas vue agir sur votre poste reste, pour vous, une affirmation.

> **⚠️ Attention**
>
> Plusieurs fonctions de ces fiches élargissent ce que Claude peut faire sans vous : les hooks, les serveurs MCP locaux, les plugins, `claude -p` hors du mode `--bare`, `bypassPermissions`. Avant d’en activer une, lisez ce qu’elle exécute, essayez-la dans un dossier jetable, et n’y faites entrer aucune donnée de client, d’employeur ou d’usager (sections [10.3](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#s10-3) et [23.1](https://gmag-dev.github.io/bien-demarrer-claude-code/23-securite-et-propriete-intellectuelle-en-entreprise.html#s23-1)). Un dossier jetable ne suffit pas à `bypassPermissions` : ce mode demande un conteneur ou une machine virtuelle sans vos secrets, au réseau limité, pour un dépôt de confiance ([section 10.4](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#s10-4)).

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/guide-en-une-page.html#toc)
