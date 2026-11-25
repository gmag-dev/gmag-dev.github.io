> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.2.2 : « Annexe L. Fiches des composants : fonctions avancées et bonnes pratiques », partie 3 sur 5.
>
> - Précédent : [Annexe L. Fiches des composants : fonctions avancées et bonnes pratiques (partie 2 sur 5)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-l-fiches-des-composants-2.md)
> - Suivant : [Annexe L. Fiches des composants : fonctions avancées et bonnes pratiques (partie 4 sur 5)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-l-fiches-des-composants-4.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-s-l-5>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

### L.5 Serveurs MCP

**Rôle.** Vous copiez sans cesse des données d’un système que Claude ne voit pas, et ce système n’a pas de ligne de commande [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-features-overview). Un serveur [MCP](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-mcp) relie alors Claude Code à un service extérieur par des outils, des ressources et des prompts [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mcp).

**La structure.** Un serveur se déclare à une portée, et ses outils n’entrent dans le contexte que par étapes (figure suivante). Le choix entre un serveur et une ligne de commande est la cinquième question de la [figure 6.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#fig-6-2) ([section 6.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s6-3)) : la ligne de commande d’abord, quand elle existe.

*Dessin : Les portées d'un serveur MCP, et le chargement différé de ses outils. Schéma : la description suit.*

**Figure :** Les portées d’un serveur MCP, et le chargement différé de ses outils. En bleu la portée de l’organisation, en gris les autres portées et ce qui est toujours là, en vert ce qui entre à la demande, en ambre le résultat d’un appel. D’après [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mcp) et [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-features-overview).

Les mêmes portées et le même chargement, en texte :

1. À nom égal, la portée la plus haute l’emporte : `managedMcpServers`, des réglages gérés, au-dessus de tout, puis local (vous, dans ce projet, la portée par défaut), projet (`.mcp.json`, versionné), utilisateur (tous vos projets), plugin, et enfin les connecteurs claude.ai.
2. L’entrée gagnante est prise entière, sans fusion de champs.
3. Au démarrage, seuls les noms des outils de chaque serveur entrent dans le contexte.
4. Quand une tâche demande un outil, son schéma complet entre.
5. À l’appel, un résultat de plus de 50 000 caractères est rangé dans un fichier.
6. Sans chargement différé, avec `ENABLE_TOOL_SEARCH=false` ou un modèle antérieur à Opus 4, Sonnet 4 et Haiku 4.5, tout entre au démarrage.

**Fonctions avancées.**

- **Les transports.** [stdio](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-stdio) pour un programme local, `http` pour un serveur distant, celui que la documentation recommande. Le transport SSE est déprécié, et Claude Code y bascule seul quand HTTP échoue, depuis la version 2.1.265. WebSocket s’ajoute par `claude mcp add-json` [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mcp).
- **La précédence.** Local, puis projet, puis utilisateur, puis plugin, puis connecteurs claude.ai. L’entrée gagnante est prise en entier, sans fusion de champs, et `managedMcpServers` passe au-dessus de tout (2.1.259) [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mcp).
- **Les variables dans `.mcp.json`.** `${VAR}` et `${VAR:-défaut}` s’étendent dans `command`, `args`, `env`, `url` et `headers`. Les identifiants de Claude Code et du fournisseur cloud, comme `ANTHROPIC_API_KEY`, et quelques autres, comme `NPM_TOKEN`, valent vide dans l’adresse et les en-têtes d’un serveur distant. Une variable hors de cet ensemble, comme `API_KEY`, s’y étend [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mcp). Et un serveur stdio du dépôt est un programme qui hérite de votre environnement [\[184\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-env-vars) : approuvez-le comme un logiciel que vous installez.
- **L’authentification.** OAuth par `/mcp` ou `claude mcp login`, un port de retour fixe par `--callback-port`, et un `headersHelper` qui calcule les en-têtes en dix secondes au plus [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mcp).
- **Les délais.** `MCP_TIMEOUT` au démarrage, `MCP_TOOL_TIMEOUT` par appel, ou un champ `timeout` par serveur. Un appel encore en cours après deux minutes passe en tâche d’arrière-plan (`CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS`) [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mcp).
- **Les échanges avancés.** `list_changed` met à jour la liste des outils sans reconnexion. Un serveur peut pousser des messages dans la session par un canal (`--channels`), ou vous demander une donnée en cours de tâche par une élicitation, à laquelle un hook `Elicitation` peut répondre seul [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mcp). Les prompts d’un serveur deviennent des commandes, comme `/mcp__github__list_prs` [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-scheduled-tasks).
- **Les annotations côté serveur.** `_meta["anthropic/requiresUserInteraction"]` exige votre accord à chaque appel, et `_meta["anthropic/maxResultSizeChars"]` relève le seuil de 50 000 caractères au-delà duquel un résultat part dans un fichier [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mcp).
- **Claude Code comme serveur.** `claude mcp serve` expose les outils de Claude Code à une autre application, qui doit alors gérer elle-même l’accord à chaque appel [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mcp).
- **Le chargement différé.** Il vaut pour Claude Opus 4, Claude Sonnet 4, Claude Haiku 4.5 et les modèles plus récents, et sur l’Agent Platform de Google Cloud à partir d’Opus 4.5, Sonnet 4.5 et Haiku 4.5. Un modèle plus ancien et Foundry hébergé sur Azure chargent tout au démarrage, et `ENABLE_TOOL_SEARCH=true` n’y change rien. `ENABLE_TOOL_SEARCH=false` le coupe, et le seuil de 10 % de la fenêtre ne joue qu’en mode `ENABLE_TOOL_SEARCH=auto` [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mcp).

**Bonnes pratiques.**

- Préférez une ligne de commande à un serveur quand elle existe ([section 6.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s6-1)), et mesurez le coût de chaque outil par `/context all` [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-features-overview).
- Avant `claude mcp remove`, lancez `claude mcp logout` : la suppression efface les jetons locaux sans les révoquer chez le serveur [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mcp).
- Un serveur local en stdio ou sur `127.0.0.1`, le moins d’outils possible, et l’accord d’un outil par son nom exact ([section 18.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s18-3)).

**Pièges.**

- `claude -p` charge et connecte les serveurs du `.mcp.json` d’un dossier jamais approuvé, sans demande, sauf en mode `--bare` [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-headless).
- Les serveurs MCP locaux tournent hors du bac à sable, avec vos droits [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing).
- Une entrée copiée d’un autre client avec un `url` mais sans `type` est lue comme stdio [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mcp).
- `disabledMcpjsonServers` bloque un serveur de projet dans tous les modes, et `--strict-mcp-config` ne charge que les serveurs passés par `--mcp-config` [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mcp).

**Génération Claude 5.** La page ne lie aucune fonction MCP à un modèle de la génération 5. Le chargement différé des schémas, lui, ne vaut pas pour un modèle plus ancien qu’Opus 4, Sonnet 4 et Haiku 4.5, ni sur l’Agent Platform de Google Cloud pour un modèle plus ancien qu’Opus 4.5, Sonnet 4.5 et Haiku 4.5 [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mcp).

**Dans le guide.** Sections [6.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s6-1), [18.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s18-3), [18.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s18-7), [23.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-4).

### L.6 Commandes et commandes personnalisées

**Rôle.** Vider le contexte, planifier, revenir en arrière ou lancer une procédure enregistrée ne demande pas une phrase, mais un geste court. Une commande, tapée après une barre oblique au début d’un message, pilote la session : commande intégrée, skill fourni, skill à vous, commande de plugin ou prompt d’un serveur MCP [\[67\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-commands).

**La structure.** Une commande personnalisée est un skill : l’anatomie du dossier et le choix de qui la lance sont les deux figures de la fiche L.2.

**Fonctions avancées.**

- **Deux familles.** Les commandes intégrées agissent sur Claude Code, comme `/model`, `/plan`, `/branch` ou `/tasks`. Les skills fournis sont des prompts donnés à Claude, comme `/batch` (5 à 30 unités en sous-agents d’arrière-plan, chacun dans un worktree), `/simplify` (quatre agents de nettoyage, sans chasse aux défauts), `/code-review` (avec un niveau, de `low` à `max`, puis `ultra`), `/debug`, `/verify` et `/loop` [\[67\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-commands).
- **Quelques commandes d’expert.** `/goal` fait travailler Claude de tour en tour jusqu’à une condition. `/fork` copie la conversation dans une session d’arrière-plan. `/btw` pose une question à côté, sans l’ajouter au fil. `/import` reprend la configuration de Codex, de Gemini CLI ou de Cursor. `/security-review` relit la branche courante et demande un dépôt distant `origin` [\[67\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-commands).
- **Le suivi de l’usage** ([section 9.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s9-3)). `/insights` produit un rapport sur votre façon de travailler : demandes mal comprises, points de friction, suggestions [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-costs). L’aide en ligne nomme `/status` pour suivre le quota restant [\[69\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plan-usage). La documentation de Claude Code renvoie à `/usage`, qui affiche les barres du forfait [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-costs).
- **Les commandes personnalisées** sont des skills : `.claude/commands/x.md` marche encore, et à nom égal le skill l’emporte ([section 7.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-1)) [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills). Une commande de plugin porte le nom du plugin, `/plugin:commande` [\[61\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-reference).
- **La file d’attente.** Une commande envoyée pendant une réponse attend la fin du tour, sauf `/status`, `/tasks` et `/usage`, qui s’exécutent tout de suite [\[67\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-commands).
- **En mode non interactif.** Les skills que vous lancez marchent dans `claude -p`, les commandes du seul terminal non. `/model`, `/effort` et quelques autres prennent leur valeur en argument, et `/config clé=valeur` change un réglage [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-headless).

**Bonnes pratiques.**

- Écrivez toute nouvelle commande comme un skill, qui accueille scripts et références ([section 21.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-3)).
- Réservez à votre commande, par `disable-model-invocation: true`, ce qui a des effets de bord ([section 7.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-1)).

**Pièges.**

- Une commande n’est reconnue qu’en début de message : plus loin, c’est du texte [\[67\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-commands).
- Dans une boucle `/loop`, un skill réservé à votre commande, une commande intégrée ou un prompt MCP arrive à Claude comme du texte, sans s’exécuter [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-scheduled-tasks).

**Génération Claude 5.** [`ultracode`](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-ultracode) n’est pas un sixième niveau d’effort mais un réglage de Claude Code : il fait orchestrer des flux dynamiques pour les tâches substantielles, au niveau d’effort de la session. `/effort ultracode` laisse ce niveau inchangé, `claude --effort ultracode` le met à `xhigh`. Il manque sur un modèle qui ne prend pas `xhigh` [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-model-config). D’après la documentation lue le 16 novembre 2026, le réglage `"ultracode": true` l’active à chaque session, et il manque aussi quand les flux dynamiques sont coupés [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-model-config). Le mot `ultracode`, tapé par une personne dans un message, fait un flux pour cette seule tâche, sans changer l’effort [\[114\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-workflows). Un flux consomme plus de jetons et de temps que la même demande sans flux, et un abonnement atteint plus tôt ses limites [\[114\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-workflows).

**Dans le guide.** Sections [7.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-1) et [21.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-3), [annexe D](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-d) pour les commandes de la version web du guide.

### L.7 Plugins et places de marché

**Rôle.** Un second dépôt ou une équipe a besoin de la même configuration [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-features-overview). Un [plugin](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-plugin) emballe des skills, des agents, des hooks, des serveurs MCP et d’autres pièces en une unité installable, diffusée par une [place de marché](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-place-de-marche) [\[61\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-reference) [\[62\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-install).

**La structure.** Chaque dossier du plugin devient une pièce de Claude Code, et deux variables séparent ce qui change de ce qui dure (figure suivante). Le moment de passer au plugin est la sixième question de la [figure 6.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#fig-6-2) ([section 6.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s6-3)).

*Dessin : L'arborescence d'un plugin, et ce que devient chaque pièce. Schéma : la description suit.*

**Figure :** L’arborescence d’un plugin, et ce que devient chaque pièce. À gauche les éléments du dossier. À droite, en bleu ce qui devient une commande ou un agent, en ambre ce qui tourne avec vos droits hors du bac à sable, en rouge ce qui est ignoré ou ne doit garder aucun état, en vert le dossier qui survit aux mises à jour, en gris le reste. D’après [\[61\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-reference) et [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing).

Le même dossier, en texte :

1. `.claude-plugin/plugin.json` : le manifeste, facultatif. `name` préfixe chaque composant, comme `deploy-tools:reviewer`, avec `version` et `dependencies`.
2. `skills/` et `commands/` : des skills et des commandes, lancés par `/plugin:skill`.
3. `agents/` : des sous-agents, qui ignorent leurs champs `hooks`, `mcpServers` et `permissionMode`.
4. `hooks/hooks.json` : des hooks, hors du bac à sable, avec vos droits.
5. `.mcp.json` et `.lsp.json` : des serveurs MCP et des serveurs de langage, hors du bac à sable, avec vos droits.
6. `bin/` : ses fichiers entrent dans le `PATH` de l’outil Bash.
7. `output-styles/` et `workflows/` : des styles de sortie et des flux, auxquels s’ajoutent des thèmes.
8. `settings.json` : seules les clés `agent` et `subagentStatusLine` agissent.
9. Un `CLAUDE.md` à la racine est ignoré : les consignes vont dans un skill.
10. `${CLAUDE_PLUGIN_ROOT}` change à chaque mise à jour et ne garde aucun état. `${CLAUDE_PLUGIN_DATA}` survit aux mises à jour, pour les dépendances et les caches.

**Fonctions avancées.**

- **Les composants.** `skills/`, `commands/`, `agents/`, `hooks/hooks.json`, `.mcp.json`, `.lsp.json` (l’intelligence de code par un serveur de langage), `output-styles/`, `workflows/`, des thèmes, des moniteurs expérimentaux, un dossier `bin/` dont les fichiers entrent dans le `PATH` de l’outil Bash, et un `settings.json` dont seules les clés `agent` et `subagentStatusLine` agissent [\[61\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-reference).
- **Le manifeste**, `.claude-plugin/plugin.json`, facultatif : `name` en minuscules et tirets, sous lequel chaque composant est rangé (`deploy-tools:reviewer`), `version` qui fige la version installée, `dependencies` et `defaultEnabled` [\[61\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-reference).
- **La configuration de l’utilisatrice.** `userConfig` déclare les valeurs à demander à l’activation. Une valeur `sensitive` est masquée et rangée dans le coffre d’identifiants du système, pas dans `settings.json`. Elle se lit par `${user_config.CLE}` ou par la variable `CLAUDE_PLUGIN_OPTION_CLE` [\[61\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-reference).
- **Deux dossiers.** `${CLAUDE_PLUGIN_ROOT}` change à chaque mise à jour, et `${CLAUDE_PLUGIN_DATA}` (`~/.claude/plugins/data/<id>/`) survit aux mises à jour et sert aux dépendances et aux caches [\[61\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-reference).
- **Un moniteur** est un processus d’arrière-plan qui démarre avec la session, ou à la première invocation d’un skill par `"when": "on-skill-invoke:<skill>"` [\[61\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-reference).
- **La validation.** `claude plugin validate`, et `--strict` en intégration continue, vérifie les chemins, qui commencent tous par `./` et restent dans le plugin, les champs, et les serveurs MCP (2.1.281) [\[61\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-reference).
- **Les places de marché.** `/plugin marketplace add` accepte un dépôt GitHub (`owner/repo#ref` pour figer une étiquette), un dépôt git, un dossier local ou une adresse de `marketplace.json`. La mise à jour automatique n’est active par défaut que pour la plupart des places officielles d’Anthropic et pour celles venues de claude.ai [\[62\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-install).
- **La mesure.** Pour la place officielle, le panneau d’installation donne deux estimations, « Every turn » et « When invoked ». `claude plugin details <nom>` donne les jetons ajoutés à chaque session, et l’onglet Installed signale les plugins « Not used recently » [\[62\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-install).

**Bonnes pratiques.**

- Lisez le panneau « Will install » avant d’installer : un plugin lance des hooks et des serveurs MCP [\[62\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-install).
- Testez votre plugin par `--plugin-dir`, sans l’installer [\[62\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-install), puis par Nouveau · 8 nov. 2026 `claude plugin eval` ([section 21.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-4)).
- En portée projet, l’entrée de `.claude/settings.json` active le plugin pour l’équipe, mais chaque personne l’installe une fois [\[62\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-install).

**Pièges.**

- N’écrivez aucun état dans `${CLAUDE_PLUGIN_ROOT}`, qui change à la mise à jour [\[61\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-reference).
- Un `CLAUDE.md` à la racine d’un plugin n’est pas chargé : les consignes vont dans un skill [\[61\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-reference).
- Retirer une place de marché désinstalle tous les plugins venus d’elle [\[62\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-install).
- Un agent de plugin ignore ses champs `hooks`, `mcpServers` et `permissionMode` ([section 21.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-5)) [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sub-agents).
- Les sessions du cloud ne chargent pas vos plugins locaux [\[62\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-install), et une session WSL de l’application de bureau n’en prend aucun [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-desktop).

**Génération Claude 5.** La documentation des plugins relue ne lie aucune fonction à un modèle.

**Dans le guide.** Sections [6.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s6-1), [11.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s11-4) et [21.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-3), [chapitre 17](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch17) pour les [mods](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-mod).

### L.8 Réglages, permissions, modes et bac à sable

**Rôle.** Une consigne de sécurité ne suffit pas, car une consigne est du contexte, que rien n’impose [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-memory). Les réglages fixent, [par construction](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-par-construction), ce que Claude Code peut faire, à quelle couche et pour qui [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings) [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permissions).

**La structure.** Cinq couches de réglages, chacune pour un public, et un ordre fixe des règles dans chaque appel (figure suivante). Pour choisir la portée d’un réglage, lisez la figure par la colonne « pour qui ». Les couches de défense, de la consigne au bac à sable, sont la [figure 17.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#fig-17-1) ([section 17.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-4)).

*Dessin : Les couches de réglages, pour qui chacune, et l'ordre des règles. Schéma : la description suit.*

**Figure :** Les couches de réglages, pour qui chacune, et l’ordre des règles. En bleu la couche de l’organisation, en gris les autres couches et les listes, en ambre l’exception de sécurité. Dans l’ordre des règles, en rouge le refus, en ambre la demande, en vert le permis, chacun écrit en mots. D’après [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings) et [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permissions).

Les mêmes couches, en texte, de la plus forte à la plus faible :

1. Les réglages gérés : l’organisation, pour tout le poste.
2. `--settings` : une seule session.
3. `.claude/settings.local.json` : vous, dans ce projet.
4. `.claude/settings.json` : l’équipe, versionné avec le projet.
5. `~/.claude/settings.json` : vous, dans tous vos projets.
6. Les listes se fusionnent d’une couche à l’autre. Pour quelques clés de sécurité, la valeur plus stricte d’une couche basse l’emporte, même sur les réglages gérés.
7. Dans chaque appel, `deny`, puis `ask`, puis `allow` : la première règle qui correspond décide.

**Fonctions avancées.**

- **La précédence.** [Réglages gérés](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-reglages-geres), puis `--settings` pour une session, puis `.claude/settings.local.json`, `.claude/settings.json` et `~/.claude/settings.json`. Les listes se fusionnent, et les variables d’environnement ne sont pas une couche : chaque paire variable et clé a sa propre règle [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings).
- **Les exceptions de sécurité.** Pour quelques clés, une valeur plus stricte venue d’une couche plus basse l’emporte sur les réglages gérés : `permissions.blockReadsOutsideWorkingDirectories`, `permissions.blockWritesOutsideWorkingDirectories` (2.1.314), `isolatePeerMachines`, Nouveau · 8 nov. 2026 `maxEffortLevel`, le plafond du niveau d’effort, ou `crossSessionInbound` posé par le projet [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings).
- **Le rechargement.** La plupart des modifications de fichier s’appliquent sans redémarrer, et chacune déclenche le hook `ConfigChange`. `model` et l’effort ne se lisent qu’au démarrage [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings).
- **L’ordre des règles.** `deny`, puis `ask`, puis `allow`, la première qui correspond décide, quelle que soit sa précision. Un `deny` sur un nom d’outil seul le retire du contexte de Claude. Une commande composée (`&&`, `|`, `;`) se découpe, et chaque morceau doit être permis [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permissions).
- **Les modes.** Six : Manual (`default`), `acceptEdits`, `plan`, `auto`, `dontAsk` et `bypassPermissions`. Une écriture dans un chemin protégé, comme `.git`, `.claude`, `.mcp.json` ou les fichiers de démarrage du shell, vous est demandée en mode Manual et en `acceptEdits`. En mode auto, le classificateur en décide seul. En `dontAsk`, elle est refusée, et en `bypassPermissions`, permise. En mode plan, elle peut être permise quand `bypassPermissions` est disponible dans le terminal [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permission-modes).
- **Le [mode auto](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-mode-auto).** Un [classificateur](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-classificateur), Sonnet 5 par défaut (`CLAUDE_CODE_AUTO_MODE_MODEL`, 2.1.302), relit les actions. Trois refus de suite ou vingt au total le mettent en pause, et Claude Code repasse aux demandes [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permission-modes).
- **Le bac à sable.** Seatbelt sous macOS, bubblewrap sous Linux et WSL 2. Il borne les écritures au dossier de travail, à un dossier temporaire et aux dossiers ajoutés, et fait passer le réseau par un mandataire dont la liste de domaines part vide. `failIfUnavailable` fait quitter Claude Code plutôt que tourner sans lui, et `allowUnsandboxedCommands: false` retire l’échappatoire `dangerouslyDisableSandbox` [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing). Depuis la version 2.1.325, une commande confinée suit par défaut le circuit normal des permissions [\[1\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-changelog). La clé `autoAllowBashIfSandboxed` à `true` la laisse passer sans demande, même en mode Manual ([section 17.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-4)) [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing).
- Nouveau · 8 nov. 2026 **`permissions.denyInsteadOfPrompting`** refuse un appel qui attendrait une demande de permission, et le tour continue, dans les sessions du terminal, les sous-agents et les coéquipiers (2.1.319) [\[1\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-changelog).
- Nouveau · 18 nov. 2026 **Code Mode.** D’après sa page, lue le 18 novembre 2026 à une version plus récente que celle de ce guide, cette fonction expérimentale, coupée par défaut, fait écrire à Claude du JavaScript qui enchaîne plusieurs appels d’outils en une étape. Elle demande la version 2.1.323 ou plus récente, une session interactive du terminal, et s’active par la variable `CLAUDE_CODE_EXPERIMENTAL_CODE_MODE=1`. Chaque appel du code passe par vos règles `deny` et `ask` et vos hooks `PreToolUse`, et en mode auto le classificateur relit le code, pas chaque appel. Une organisation la bloque en mettant la même variable à `0` dans ses réglages gérés [\[183\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-code-mode).

**Bonnes pratiques.**

- Posez la garde en `deny`, appliqué tout de suite, et laissez les `allow` d’un projet attendre l’approbation du dossier [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings).
- Vérifiez ce qui a chargé par `/status`, ligne « Setting sources », et ce qui a été rejeté par `claude doctor` [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings).
- Ajoutez `$schema` en tête du fichier pour l’autocomplétion, en sachant que le schéma peut avoir du retard sur la dernière version [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings).

**Pièges.**

- `defaultMode` à `auto` ou `bypassPermissions` est ignoré dans les réglages de projet [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permission-modes).
- Un réglage en JSON invalide (un commentaire, une virgule finale) est ignoré en bloc, avec un dialogue au démarrage, et en silence dans `claude -p` [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings).
- Par défaut, le bac à sable ne borne pas la lecture : une commande confinée lit presque toute la machine, `~/.ssh` compris, sauf les chemins de `denyRead`. Il ne couvre ni Read, Edit, Write, WebFetch et WebSearch, ni les hooks, les serveurs MCP locaux, les serveurs LSP, la ligne d’état et les mods, et sous Windows natif les commandes tournent sans lui [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing).
- `bypassPermissions` ne protège ni contre l’injection de prompt ni contre une action involontaire [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permission-modes).

**Génération Claude 5.** Le mode auto demande, sur l’API d’Anthropic, Opus 4.6 ou plus récent, Sonnet 4.6 ou plus récent, Haiku 5.5 ou un modèle Fable. Chez les autres fournisseurs, Sonnet 5 ou plus récent, Opus 4.7 ou plus récent, Haiku 5.5 ou un modèle Fable [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permission-modes). Depuis la version 2.1.302, `claude -p` démarre en mode Manual quand rien ne fixe le mode [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permission-modes). Sur Team et Enterprise, le mode auto est disponible par défaut, et l’administration peut le couper par `permissions.disableAutoMode` dans les réglages gérés [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permission-modes).

**Dans le guide.** Sections [2.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-3), [10.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-1), [10.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-5), [chapitre 17](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch17) et [section 23.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-2).
