> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.5.0 : « Annexe L. Fiches des composants : fonctions avancées et bonnes pratiques », partie 2 sur 5.
>
> - Précédent : [Annexe L. Fiches des composants : fonctions avancées et bonnes pratiques (partie 1 sur 5)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-l-fiches-des-composants-1.md)
> - Suivant : [Annexe L. Fiches des composants : fonctions avancées et bonnes pratiques (partie 3 sur 5)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-l-fiches-des-composants-3.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#h-s-l-2>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

### L.2 Skills

**Rôle.** Vous retapez le même prompt, ou collez la même procédure pour la troisième fois : un [skill](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-skill) l’enregistre une fois pour toutes [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-features-overview). C’est un dossier de procédure ou de connaissance que Claude charge quand il sert, ou que vous lancez par `/nom` [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skills).

**La structure.** Chaque élément du dossier entre dans le contexte à son heure, et l’un d’eux n’y entre jamais : il s’exécute (figure suivante). Les trois niveaux de la divulgation progressive sont la [figure 21.1](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#fig-21-1) ([section 21.1](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-1)).

*Dessin : L'anatomie d'un dossier de skill : ce qui entre, quand, et ce qui s'exécute. Schéma : la description suit.*

**Figure :** L’anatomie d’un dossier de skill : ce qui entre, quand, et ce qui s’exécute. À gauche les éléments du dossier. À droite, en gris ce qui est toujours là, en bleu ce qui entre à l’invocation, en vert ce qui n’entre qu’à la demande, en ambre ce qui s’exécute et dont seule la sortie entre. Chaque case le dit aussi en mots. D’après [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skills), [\[65\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-agent-skills-spec) et [\[66\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skill-authoring-best-practices).

Le même dossier, en texte :

1. L’en-tête de `SKILL.md`, avec `name` et `description` : la description est là à chaque requête, environ 100 jetons, et sert à choisir le skill.
2. Le corps de `SKILL.md` : il entre à l’invocation, par `/nom` ou par le choix de Claude. Moins de 500 lignes, l’essentiel en tête.
3. Une commande injectée dans le corps : elle s’exécute avant que Claude lise le skill, sa sortie prend sa place, et un code de sortie de 2 ou plus, ou de 1 hors d’une recherche ou d’une comparaison, annule l’invocation.
4. `references/` : lu à la demande, si la tâche le demande, par un seul niveau de renvoi depuis `SKILL.md`.
5. `scripts/` : exécuté, pas chargé. Seule sa sortie entre. On l’appelle par `${CLAUDE_SKILL_DIR}`.
6. `assets/` : des gabarits, des images, des données, employés seulement si la tâche le demande.

**Fonctions avancées.**

- **Les portées.** Entreprise (réglages gérés), personnelle (`~/.claude/skills/`), projet (`.claude/skills/`), dossier ajouté par `--add-dir`, plugin (`/plugin:skill`), et les skills synchronisés depuis claude.ai dans `~/.claude/skills/synced/`. À nom égal, entreprise l’emporte sur personnel, et personnel sur projet [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skills).
- **Les skills imbriqués.** Un `.claude/skills/` placé dans un sous-dossier se charge quand la session démarre dans ce sous-dossier, ou quand Claude touche ses fichiers [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skills). Depuis la version 2.1.319, quand le bac à sable du shell est actif, il ne se charge plus que si la session démarre là ou y passe par `/cd` [\[1\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-changelog).
- **Le rechargement à chaud.** Un skill modifié s’applique dans la session en cours. Un nouveau dossier racine de skills demande `/reload-skills` [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skills).
- **La divulgation progressive** et ses trois niveaux, `references/`, `scripts/` et `assets/`, sont expliqués en [section 21.1](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-1). Le point qui compte pour l’expertise : un script du dossier est exécuté, pas chargé, et seule sa sortie entre dans le contexte [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skills) [\[65\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-agent-skills-spec).
- **Les substitutions.** `$ARGUMENTS`, `$ARGUMENTS[N]` ou `$N` (à partir de 0), `$nom` pour un argument nommé par le champ `arguments`, et les variables `${CLAUDE_SKILL_DIR}`, `${CLAUDE_SESSION_ID}`, `${CLAUDE_EFFORT}` et `${CLAUDE_PROJECT_DIR}`. Sans aucun emplacement, les arguments sont ajoutés en fin de skill sous la forme `ARGUMENTS: <valeur>` [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skills).
- **L’injection de contexte.** Une commande écrite entre \``!` \``et un accent grave, ou un bloc de code ouvert par` \`\``!`, s’exécute avant que Claude lise le skill, et sa sortie prend sa place. Le réglage `"disableSkillShellExecution": true` la remplace par un texte de refus pour les skills personnels, de projet, de plugin et de dossier ajouté, pas pour les skills fournis ni gérés [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skills).
- **Les champs propres à Claude Code**, au-delà de ceux de la [section 21.1](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-1) : `disallowed-tools` retire des outils et `allowed-tools` en autorise sans demande, l’un comme l’autre jusqu’à votre message suivant seulement, `agent` choisit le type de sous-agent d’un `context: fork` (`Explore`, `Plan`, `general-purpose` ou un agent à vous), `background: false` fait attendre son résultat, `shell` vaut `bash` ou `powershell` pour les commandes injectées, `user-invocable: false` cache le skill du menu `/` [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skills).
- **Les hooks d’un skill.** Ils s’enregistrent à l’invocation et durent jusqu’à la fin de la session, et le champ `once: true` d’un hook n’est honoré que dans le frontmatter d’un skill [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks).
- **Le contrôle des invocations** par les permissions : `Skill(nom)` vise un skill exact, `Skill(nom *)` un préfixe, et `Skill` seul en `deny` les retire tous. `skillOverrides` règle la visibilité sans toucher au fichier, et `disableBundledSkills` coupe les skills fournis [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skills).
- **L’enchaînement.** Un message qui commence par `/skill-a /skill-b` charge les deux, jusqu’à six, et donne la suite du texte à chacun en argument [\[67\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-commands).

**Bonnes pratiques.**

- Gardez `SKILL.md` sous 500 lignes, et mettez l’essentiel en tête : après une compaction, seuls ses premiers jetons reviennent ([section 21.1](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-1)) [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skills).
- Réservez `context: fork` aux skills qui portent une tâche explicite. Un skill fait seulement de consignes, lancé en fork, ne rend rien d’utile [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skills).
- Pour un skill destiné aussi à claude.ai ou à l’API, n’employez que les champs du standard, sans quoi le téléversement échoue ([section 21.1](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-1)) [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skills).
- Ce guide propose d’appeler chaque script par `${CLAUDE_SKILL_DIR}` et de tester avec et sans le skill dans une session neuve ([section 21.4](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-4)).

**Quand en faire un skill, et lequel.** Le choix entre un skill et un autre objet est la [figure 6.2](https://gmag-dev.github.io/bien-demarrer-claude-code/6-choisir-ses-extensions.html#fig-6-2) ([section 6.3](https://gmag-dev.github.io/bien-demarrer-claude-code/6-choisir-ses-extensions.html#s6-3)), et sa version d’auteur, la [figure 21.2](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#fig-21-2) ([section 21.3](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-3)). Une fois le skill décidé, trois champs disent qui le lance et où il tourne. Ce guide propose de se poser les questions dans cet ordre (figure suivante).

*Dessin : Qui lance le skill, et où il tourne. Schéma : la description suit.*

**Figure :** Qui lance le skill, et où il tourne. En bleu les questions, posées dans l’ordre. En ambre ce qui est réservé à votre commande, en vert ce qui tourne dans un contexte séparé, en gris le reste, chaque case le disant aussi en mots. Schéma proposé par ce guide, d’après [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skills) et [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-features-overview).

Le même choix, en texte, où l’on s’arrête au premier « oui » :

1. Le skill modifie-t-il des fichiers, ou agit-il au-dehors ? Oui : `disable-model-invocation: true`. Vous seule ou seul le lancez, et sa description ne coûte plus rien en contexte.
2. Est-ce un savoir de fond, que vous ne lanceriez pas vous-même ? Oui : `user-invocable: false`. Il disparaît du menu `/`, et Claude le charge quand il sert.
3. Porte-t-il une tâche explicite dont le travail inonderait la conversation ? Oui : `context: fork`, avec le champ `agent` qui choisit le sous-agent, `Explore`, `Plan`, `general-purpose` ou le vôtre. Seul le résultat revient.
4. Non à tout : le défaut, que vous et Claude lancez, dans la conversation.

**Pièges.**

- Un YAML illisible charge le skill sans aucun champ, sans erreur visible : `/nom` marche encore, le déclenchement automatique non. `claude --debug` montre l’erreur [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skills).
- Une commande injectée qui échoue annule toute l’invocation. Avec le shell `bash` par défaut, une commande de recherche ou de comparaison qui sort en 1 compte comme un résultat normal, mais un code de 2 ou plus échoue [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skills).
- Le réglage géré `allowManagedPermissionRulesOnly` fait ignorer le champ `allowed-tools` des skills personnels et de projet [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skills).
- Un skill en fork lancé en arrière-plan, le cas par défaut, modifie des fichiers que `/rewind` ne restaure pas [\[42\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-checkpointing).

**Génération Claude 5.** La page des skills relue ne cite pas de modèle par son nom. Le champ `effort` accepte les cinq niveaux des modèles 5.5 ([section L.18](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-18)) [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config).

**Dans le guide.** Sections [7.1](https://gmag-dev.github.io/bien-demarrer-claude-code/7-ecrire-ses-premieres-extensions.html#s7-1), [21.1](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-1) à [21.4](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-4), [21.8](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-8), [21.10](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-10) à [21.12](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-12).

### L.3 Sous-agents

**Rôle.** Une tâche annexe inonde la conversation d’une sortie dont vous n’avez plus besoin [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-features-overview). Un [sous-agent](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-sous-agent) la prend à part : c’est un travailleur à contexte séparé, avec son propre prompt système, ses outils et son modèle, dont seul le rapport revient [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents).

**La structure.** Ce qui entre dans le contexte d’un sous-agent, et ce qui en revient, décide de son usage (figure suivante). Plusieurs sous-agents lancés en éventail sont la [figure 8.1](https://gmag-dev.github.io/bien-demarrer-claude-code/8-le-travail-en-parallele.html#fig-8-1) ([section 8.1](https://gmag-dev.github.io/bien-demarrer-claude-code/8-le-travail-en-parallele.html#s8-1)). Le choix entre un sous-agent et la session principale est la quatrième question de la [figure 6.2](https://gmag-dev.github.io/bien-demarrer-claude-code/6-choisir-ses-extensions.html#fig-6-2) ([section 6.3](https://gmag-dev.github.io/bien-demarrer-claude-code/6-choisir-ses-extensions.html#s6-3)).

*Dessin : Le contexte séparé d'un sous-agent, et ce qui en revient. Schéma : la description suit.*

**Figure :** Le contexte séparé d’un sous-agent, et ce qui en revient. En bleu la session principale, en vert les deux contextes séparés, en gris ce qui reste chez l’agent. D’après [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents), [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-output-styles) et [\[42\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-checkpointing).

Le même partage, en texte :

1. La session principale envoie un brief à un sous-agent ordinaire. Il part d’un contexte vide, avec son prompt système, qui est le corps de son fichier, ses outils (la liste `tools`, sinon tous), son modèle et son effort, les `CLAUDE.md` sauf pour Explore, Plan ou un agent en `omitClaudeMd`, et les skills préchargés par son champ `skills`.
2. Seul son rapport revient dans la conversation.
3. Un fork hérite de toute la conversation, du même jeu d’outils et du style de sortie. `/subtask` le lance en arrière-plan, et son résultat revient dans la conversation.
4. Les lectures, les essais et la sortie des outils restent chez l’agent. Ses modifications de fichiers ne sont en général pas dans les points de contrôle : `/rewind` ne les défait pas, git oui.

**Fonctions avancées.**

- **Les agents intégrés.** Explore, en lecture seule, avec trois niveaux de profondeur (« quick », « medium », « very thorough »). Plan, en lecture seule, pour le [mode plan](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-mode-plan). general-purpose, avec tous les outils permis aux sous-agents. Explore et Plan démarrent sans `CLAUDE.md` ni instantané git. Une règle `deny` comme `Agent(Explore)` en retire un, et `CLAUDE_CODE_DISABLE_EXPLORE_PLAN_AGENTS=1` retire les deux [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents).
- **Les portées.** Réglages gérés, puis `--agents` (du JSON, pour la session), projet, utilisateur, plugin, dans cet ordre de priorité. Les dossiers de projet et d’utilisateur sont parcourus en profondeur [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents).
- **Les champs avancés**, au-delà du tableau de la [section 21.5](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-5) : `memory` (`user`, `project` ou `local`) donne à l’agent une mémoire persistante, dont les 200 premières lignes ou 25 Ko de `MEMORY.md` entrent dans son prompt, et active d’office Read, Write et Edit. `autoCompactWindow` abaisse son seuil de compaction (2.1.296). `omitClaudeMd` le fait démarrer sans les `CLAUDE.md` (2.1.271). `background: true` le garde en arrière-plan. `initialPrompt` part comme premier message quand l’agent tient la session. `experimental.cacheTtl` règle la durée du cache, `5m` ou `1h` (2.1.248) [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents).
- **Premier plan et arrière-plan.** Un sous-agent au premier plan bloque la conversation et vous transmet ses demandes de permission. En arrière-plan, ses demandes s’affichent dans la session principale, et `Esc` refuse un seul appel sans l’arrêter. `Ctrl+B` passe une tâche en arrière-plan [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents).
- **La reprise.** Chaque lancement crée une instance neuve. Pour continuer un agent, Claude lui écrit par `SendMessage`, avec son identifiant, et l’agent repris garde tout son historique. Explore et Plan ne se reprennent pas [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents).
- **L’imbrication et la concurrence.** Un sous-agent peut en lancer d’autres jusqu’à trois niveaux sous la conversation principale (`CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH`, et `1` coupe l’imbrication). Vingt sous-agents tournent au plus à la fois par défaut (`CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS`, 2.1.217) [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents).
- **Le [fork](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-fork).** Un fork hérite de toute la conversation et du même jeu d’outils, au lieu de partir à vide. `/subtask` en lance un en arrière-plan, dont le résultat revient dans la conversation [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents) [\[67\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-commands).
- **L’agent qui tient la session.** `claude --agent nom`, ou la clé `agent` d’un fichier de réglages, donne à la session principale les outils et le modèle de l’agent, et son prompt remplace celui de Claude Code. Le choix tient à la reprise. Dans ce seul cas, `tools: Agent(worker, researcher)` limite les types d’agents qu’il peut lancer [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents) [\[41\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sessions).
- **Les règles de permission par paramètre.** `Agent(model:opus)` ou `Agent(isolation:worktree)` visent les appels qui demandent ce modèle ou un worktree [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permissions).

**Bonnes pratiques.**

- Écrivez la liste `tools` en [liste blanche](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-liste-blanche), un corps autonome et un rapport à schéma fixe ([section 21.5](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-5)).
- Baissez l’effort d’un agent de tâche mécanique par son champ `effort`. `CLAUDE_CODE_SUBAGENT_EFFORT` fixe l’effort par défaut des sous-agents (2.1.316) [\[1\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-changelog) ([section 15.4](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-4)).
- Pour un travail en parallèle qui écrit, donnez à chaque agent son worktree par `isolation: worktree` ([section L.14](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-14)).

**Pièges.**

- `tools` omis, l’agent hérite de tous les outils, écriture et délégation comprises ([section 21.5](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-5)) [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents).
- Un sous-agent en arrière-plan reçoit moins d’outils intégrés qu’au premier plan, sauf un fork ou un agent repris [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents).
- Les modifications d’un sous-agent ne sont en général pas dans les points de contrôle : `/rewind` ne les défait pas, git oui [\[42\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-checkpointing).
- La liste de types `Agent(...)` est ignorée dans un sous-agent ordinaire : elle ne vaut que pour l’agent lancé par `--agent` [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents).

**Génération Claude 5.** Le champ `model` accepte `fable`, `opus`, `sonnet`, `haiku`, `inherit` ou un identifiant complet comme `claude-opus-5-5`. Par défaut, Explore prend le modèle de votre conversation. Quand elle tourne sur un modèle Fable, avec un abonnement Claude, un compte de la Console ou une passerelle, Explore tourne sur le modèle de l’alias `opus` [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents).

**Dans le guide.** [Chapitre 8](https://gmag-dev.github.io/bien-demarrer-claude-code/8-le-travail-en-parallele.html#ch8), sections [3.4](https://gmag-dev.github.io/bien-demarrer-claude-code/3-la-fenetre-de-contexte.html#s3-4), [15.1](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-1) à [15.7](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-7), [21.5](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-5) et [21.6](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-6).

### L.4 Hooks

**Rôle.** Une consigne est suivie presque toujours, pas toujours, et ce qui doit arriver à chaque fois ne peut pas en dépendre [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Un [hook](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-hook) est une action que Claude Code exécute lui-même à un événement de son cycle de vie, sans que le modèle décide [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks).

**La structure et le choix.** Les moments où un hook peut agir sont la [figure 6.1](https://gmag-dev.github.io/bien-demarrer-claude-code/6-choisir-ses-extensions.html#fig-6-1) ([section 6.1](https://gmag-dev.github.io/bien-demarrer-claude-code/6-choisir-ses-extensions.html#s6-1)), et une garde d’écriture complète, avec ses trois questions et son code 2, la [figure 18.1](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#fig-18-1) ([section 18.1](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-1)). Reste à choisir le type du hook. Ce guide propose de le choisir par trois questions (figure suivante).

*Dessin : Quel type de hook choisir. Schéma : la description suit.*

**Figure :** Quel type de hook choisir. En bleu les questions, posées dans l’ordre. En ambre ce qui s’exécute avec vos droits, en gris ce qui n’apporte pas de garantie, chaque case le disant aussi en mots. Schéma proposé par ce guide, d’après [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks), [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices) et [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sandboxing).

Le même choix, en texte, où l’on s’arrête au premier « oui » :

1. La règle doit-elle tenir à chaque fois, sans jugement ? Oui : un hook `command`, ou `http` vers un service. Il sort en 2 pour bloquer, avec `onFailure: "block"`, a 600 secondes par défaut, et tourne avec vos droits.
2. Faut-il agir sur un autre système par l’outil d’un serveur MCP ? Oui : un hook `mcp_tool`, 600 secondes par défaut.
3. La décision demande-t-elle de juger un sens ? Oui : un hook `prompt`, 30 secondes, ou `agent`, 60 secondes et expérimental. Un autre modèle décide : ce n’est pas déterministe, et il ne porte jamais seul une garantie.
4. Non à tout : pas de hook. Une ligne de `CLAUDE.md` ou un skill suffit.

**Fonctions avancées.**

- **Cinq types.** `command`, `http`, `mcp_tool` (appeler l’outil d’un serveur MCP), `prompt` et `agent`, ce dernier expérimental. Délais par défaut : 600 secondes pour les trois premiers, 30 pour `prompt`, 60 pour `agent`. Les hooks `SessionEnd` partagent un budget d’une seconde et demie [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks).
- **Le filtre `if`.** Une expression de règle de permission, comme `"Bash(git *)"`, affine le `matcher`. Elle n’est évaluée que sur `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PermissionRequest` et `PermissionDenied`. Sur un autre événement, le hook ne tourne pas [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks).
- **Les hooks asynchrones.** `"async": true` lance la commande en arrière-plan sans bloquer, et `"asyncRewake": true` réveille Claude si elle sort en 2 [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks).
- **Les sorties JSON**, au-delà du code 2 : `continue: false` arrête Claude, `systemMessage` avertit la personne, `additionalContext` ajoute un rappel au contexte (10 000 caractères au plus), `updatedInput` réécrit les arguments d’un outil avant son exécution, `updatedToolOutput` réécrit la sortie après, et `retry: true` relance un appel refusé sur `PermissionDenied` [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks).
- **33 événements**, dont, au-delà de ceux du [chapitre 18](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#ch18) : `UserPromptExpansion`, `PostToolBatch`, `PreModelSwitch` et `PostModelSwitch`, `InstructionsLoaded` (un fichier de consignes vient de se charger), `ConfigChange`, `FileChanged`, `Elicitation`, `TaskCreated` et `TaskCompleted` [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks).
- **Le `matcher`.** Lettres, chiffres, `_`, `-`, espace, `,` et `|` donnent une comparaison exacte. Tout autre caractère en fait une expression régulière non ancrée. `mcp__memory__.*` vise tous les outils du serveur `memory`, `mcp__memory` seul ne vise rien [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks).
- **L’exécution.** Les hooks qui correspondent à un événement tournent en parallèle. Un même hook déclaré dans plusieurs fichiers de réglages ne tourne qu’une fois. Au-delà de douze hooks `prompt` ou `agent` simultanés, les suivants attendent [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks).

**Bonnes pratiques.**

- Pour une politique, un hook `command` ou `http` qui sort en 2, avec `onFailure: "block"` ([section 18.1](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-1)).
- Écrivez la commande sous la forme `command` et `args`, sans shell intermédiaire, et les chemins par `${CLAUDE_PROJECT_DIR}`, remplacé tel quel dans `command` comme dans chaque élément de `args`, sans shell ([section 18.1](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-1)) [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks).
- Testez-le à la main avec une entrée fabriquée, puis relisez-le avec `/hooks`, qui montre la source de chaque hook ([section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/7-ecrire-ses-premieres-extensions.html#s7-2)) [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks).

**Pièges.**

- Le filtre `if` est une aide, pas une frontière : la documentation renvoie aux règles de permission pour un refus ferme [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks).
- Sur `PermissionRequest`, le code 2 n’est pas honoré : on refuse par l’objet `decision` [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks).
- Dans un worktree, `${CLAUDE_PROJECT_DIR}` reste à la racine du projet de départ : le chemin du worktree se lit dans le champ `cwd` de l’entrée [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees).
- Les hooks tournent hors du [bac à sable](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-bac-a-sable), avec tous vos droits [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sandboxing), et le mode `--bare` ne les lance pas, même passés par `--settings` [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless).
- Il n’existe pas de variable `CLAUDE_MODEL` : le modèle se lit dans les champs de l’entrée [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks).

**Génération Claude 5.** Les événements `PreModelSwitch` et `PostModelSwitch` permettent de réagir à un changement de modèle. `CLAUDE_EFFORT` donne au hook l’effort en cours [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks).

**Dans le guide.** Sections [7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/7-ecrire-ses-premieres-extensions.html#s7-2), [18.1](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-1), [18.2](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-2), [21.8](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-8) et [17.6](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#s17-6).
