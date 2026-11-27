> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.5.0 : « Annexe L. Fiches des composants : fonctions avancées et bonnes pratiques », partie 4 sur 5.
>
> - Précédent : [Annexe L. Fiches des composants : fonctions avancées et bonnes pratiques (partie 3 sur 5)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-l-fiches-des-composants-3.md)
> - Suivant : [Annexe L. Fiches des composants : fonctions avancées et bonnes pratiques (partie 5 sur 5)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-l-fiches-des-composants-5.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#h-s-l-9>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

### L.9 Mémoire : CLAUDE.md, imports, règles et mémoire automatique

**Rôle.** Chaque session démarre avec une fenêtre de contexte neuve : ce que le projet a appris doit lui être redonné [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory). La mémoire donne à chaque session les consignes et les apprentissages du projet. C’est du contexte, pas une configuration imposée [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory).

**La structure.** Les fichiers de mémoire se rangent en deux familles, ceux qui entrent toujours et ceux qui n’entrent qu’à la demande, reliées par les imports (figure suivante). La place de la mémoire parmi les autres composants est la figure du début de cette annexe.

*Dessin : Les fichiers de mémoire : ce qui entre toujours, ce qui entre à la demande. Schéma : la description suit.*

**Figure :** Les fichiers de mémoire : ce qui entre toujours, ce qui entre à la demande. En gris ce qui est toujours là et les imports, en vert ce qui n’entre qu’à la demande, chaque colonne portant aussi son titre en mots. D’après [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory).

Les mêmes fichiers, en texte :

1. Toujours, à chaque session : le `CLAUDE.md` géré, de l’organisation, `~/.claude/CLAUDE.md`, pour vous dans tous vos projets, le `CLAUDE.md` du projet et ceux des dossiers au-dessus, `CLAUDE.local.md`, pour vous seule ou seul dans ce worktree, les règles sans `paths` de `.claude/rules/` et de `~/.claude/rules/`, et les 200 premières lignes ou 25 Ko de `MEMORY.md`.
2. Un fichier de consignes en importe d’autres par `@chemin`, relatif au fichier qui l’appelle, jusqu’à quatre niveaux. Hors du dossier de travail, l’import demande votre accord une fois par projet.
3. À la demande : le `CLAUDE.md` d’un sous-dossier, quand Claude y lit ou y écrit, et une règle à `paths`, quand Claude lit ou modifie un fichier qui correspond.
4. Tout se concatène dans le contexte. Une consigne de mémoire ne bloque rien : pour bloquer, un hook `PreToolUse`.

**Fonctions avancées.**

- **Les emplacements.** Un `CLAUDE.md` géré par l’organisation (sous Windows, `C:\Program Files\ClaudeCode\CLAUDE.md`), celui de l’utilisatrice, ceux du projet, et `CLAUDE.local.md` pour vous seule ou seul. Les fichiers des dossiers au-dessus du dossier de travail se chargent au démarrage, ceux des sous-dossiers quand Claude y lit ou y écrit. Tous se concatènent, de la racine vers le dossier de travail [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory).
- **Les imports.** `@chemin` importe un fichier, relatif au fichier qui l’appelle, jusqu’à quatre niveaux. Un `@chemin` entre accents graves reste du texte. Un import qui sort du dossier de travail demande votre accord une fois par projet [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory).
- **Les règles.** `.claude/rules/` se parcourt en profondeur. Une règle à champ `paths` ne se charge que quand Claude lit ou modifie un fichier qui correspond. `~/.claude/rules/` vaut pour tous vos projets, et un lien symbolique vers un dossier hors du projet compte comme un import extérieur [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory).
- **Les exclusions.** `claudeMdExcludes` écarte, par motif, les `CLAUDE.md` d’autres équipes dans un grand dépôt, sauf celui de l’organisation [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory).
- **Les dossiers ajoutés.** `--add-dir` ne charge leurs `CLAUDE.md` qu’avec `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory).
- **La [mémoire automatique](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-memoire-automatique).** Elle vit dans `~/.claude/projects/<projet>/memory/`, partagée par les worktrees d’un même dépôt. Les 200 premières lignes ou 25 Ko de `MEMORY.md` se chargent à chaque session. `autoMemoryEnabled` l’éteint par projet, `autoMemoryDirectory` la déplace [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory).
- **Le choix des fichiers d’instructions.** La valeur par défaut lit `CLAUDE.md`, ou `AGENTS.md` à défaut, depuis la version 2.1.277, s’il n’y a ni `CLAUDE.md` ni `CLAUDE.local.md` dans le dossier de travail ou au-dessus [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory). `claude-md-and-agents-md` lit les deux, et `managed-only` ne garde que le fichier de l’organisation et la mémoire automatique ([section 21.7](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-7)) [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory).

**Bonnes pratiques.**

- Moins de 200 lignes par fichier. Ce qui ne vaut que pour une partie du code va dans une règle à `paths`, une procédure dans un skill [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory). D’après la documentation lue le 16 novembre 2026, un `CLAUDE.md` plus long que la longueur conseillée fait afficher un avertissement au démarrage et dans `/status` [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory).
- Les commentaires HTML de bloc sont retirés avant l’injection : les notes pour qui maintient le fichier ne coûtent rien [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory).
- `/doctor prompt-audit` cherche les contradictions et les consignes datées ([section 21.7](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-7)) [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory).

**Pièges.**

- Deux consignes contradictoires : Claude peut en suivre une au hasard [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory).
- Un `CLAUDE.local.md` n’existe que dans le worktree où il a été créé : pour le partager entre worktrees, importez un fichier de votre dossier personnel [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory).
- Un sous-agent lancé dans son worktree prend les consignes de la conversation principale, pas le `CLAUDE.md` du worktree [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees).
- Une consigne de mémoire guide sans rien bloquer. Pour bloquer, un hook `PreToolUse` [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory).

**Génération Claude 5.** `/doctor prompt-audit` repère les consignes écrites pour d’anciens modèles [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory). Après un passage aux modèles 5.5, c’est la première relecture à faire, car une insistance écrite pour un modèle plus ancien peut faire trop appliquer la règle ([section 4.7](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-7)).

**Dans le guide.** Sections [2.2](https://gmag-dev.github.io/bien-demarrer-claude-code/2-bien-demarrer.html#s2-2), [3.2](https://gmag-dev.github.io/bien-demarrer-claude-code/3-la-fenetre-de-contexte.html#s3-2), [21.7](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-7) et [23.2](https://gmag-dev.github.io/bien-demarrer-claude-code/23-securite-et-propriete-intellectuelle-en-entreprise.html#s23-2).

### L.10 Styles de sortie

**Rôle.** Vous voulez des réponses qui expliquent leurs choix, ou au contraire plus courtes, sans le redemander à chaque message. Un [style de sortie](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-style-de-sortie) fixe le rôle, le ton et la forme de chaque réponse d’une session [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-output-styles).

**Fonctions avancées.**

- **Cinq styles fournis.** Default, Proactive (Claude démarre sans questions de routine, sans changer le mode de permission), Concise (le résultat d’abord, 2.1.237), Explanatory (des blocs « Insight » qui expliquent les choix) et Learning (Claude laisse des morceaux à écrire, marqués `TODO(human)`) [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-output-styles).
- **Les styles à vous.** Un fichier Markdown dans `~/.claude/output-styles/`, `.claude/output-styles/` ou les réglages gérés. Les dossiers de projet imbriqués se lisent jusqu’à la racine du dépôt, et le plus proche l’emporte [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-output-styles).
- **Les champs.** `keep-coding-instructions: true` garde les consignes d’ingénierie de Claude Code, que le style retire sinon. `force-for-plugin: true` impose le style d’un plugin activé [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-output-styles).
- **Le changement en cours de session** prend effet au message suivant (2.1.251), par `/output-style`, `/config` ou la clé `outputStyle`, enregistrée dans `.claude/settings.local.json` [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-output-styles).

**Bonnes pratiques.**

- Un style pour la voix et la forme, `CLAUDE.md` pour les faits du projet, un hook pour ce qui doit arriver à coup sûr : les trois se combinent [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-output-styles).
- Pour un style qui garde le travail de code, `keep-coding-instructions: true`. Comme ce champ n’a pas d’effet sur le prompt système court, `CLAUDE_CODE_SIMPLE_SYSTEM_PROMPT=0` sélectionne le prompt complet [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-output-styles).

**Pièges.**

- La clé `outputStyle` respecte la casse : `explanatory` au lieu de `Explanatory` donne le style Default, sans erreur [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-output-styles).
- Dans le terminal, un fichier de style modifié en cours de session ne se relit qu’au redémarrage [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-output-styles).
- Un fork hérite du style, les autres sous-agents non [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-output-styles).
- Explanatory et Learning allongent les réponses, donc les jetons de sortie [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-output-styles).

**Génération Claude 5.** La page ne lie aucun style à un modèle. Le prompt système court, sur lequel `keep-coding-instructions` n’agit pas, dépend du modèle [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-output-styles). Sans réglage, Haiku 4.5, Sonnet 5, Opus 4.7 et les modèles plus anciens de ces familles reçoivent le prompt complet, et les plus récents le prompt court. `CLAUDE_CODE_SIMPLE_SYSTEM_PROMPT=0` impose le prompt complet sur tout modèle [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-output-styles) [\[184\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-env-vars).

**Dans le guide.** [Section 21.3](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-3), [annexe D](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-d-la-version-web.html#ann-d) ([section D.7](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-d-la-version-web.html#s-d-7)).

### L.11 Ligne d’état

**Rôle.** Vous voulez voir le contexte, la branche ou l’effort sans les demander. La [ligne d’état](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-ligne-d-etat) est une commande que Claude Code relance pour afficher, sous la saisie, ce que vous voulez suivre [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-statusline).

**Fonctions avancées.**

- **`/statusline`** écrit le script à partir d’une description en langage courant, et `/statusline delete` la retire [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-statusline).
- **Les champs du réglage** : `padding`, `refreshInterval` (une seconde au moins, utile quand la session attend des sous-agents), `hideVimModeIndicator` [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-statusline).
- **Le rythme.** Un anti-rebond de 300 ms regroupe les changements, et un script encore en cours est annulé par la mise à jour suivante [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-statusline).
- **La forme.** Plusieurs lignes, des couleurs ANSI, et des liens cliquables OSC 8 dans les terminaux qui les gèrent [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-statusline).
- **Des champs d’expert** : `effort.level` et `thinking.enabled`, `worktree.name` et `worktree.branch`, `output_style.name`, `exceeds_200k_tokens`, et `session_id`, qui sert à nommer un cache propre à chaque session [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-statusline).
- **Une ligne pour les sous-agents.** Un plugin peut fixer `subagentStatusLine` dans son `settings.json` [\[61\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-plugins-reference).

**Bonnes pratiques.**

- Traitez chaque champ comme facultatif, et ne laissez jamais le script planter ([section 18.4](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-4)).
- Mettez en cache un calcul lent, comme l’état git, sous un nom qui contient `session_id` [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-statusline).

**Pièges.**

- Une ligne d’état personnelle masque la plupart des aides du pied de page, dont « esc to interrupt » [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-statusline).
- Elle tourne hors du bac à sable, avec vos droits [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sandboxing), et disparaît sous `allowManagedHooksOnly` ([section 18.2](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-2)).

**Génération Claude 5.** `effort.level` montre le niveau que Claude Code applique vraiment quand le modèle ne prend pas celui demandé [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-statusline).

**Dans le guide.** Sections [18.4](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-4), [20.2](https://gmag-dev.github.io/bien-demarrer-claude-code/20-piloter-sa-consommation-et-son-projet.html#s20-2).

### L.12 Mode plan

**Rôle.** Sur une tâche longue ou incertaine, mieux vaut lire l’approche avant qu’un fichier change ([section 4.2](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-2)). En mode plan, Claude explore et propose un plan sans modifier vos sources tant que vous ne l’avez pas approuvé [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permission-modes).

**Fonctions avancées.**

- **Les entrées.** `Shift+Tab` dans le terminal, `/plan` suivi de la tâche, ou `claude --permission-mode plan` [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permission-modes).
- **Les commandes pendant le plan.** Si le mode auto est disponible et `useAutoModeDuringPlan` actif, son réglage par défaut, le classificateur relit les commandes au lieu de vous les demander [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permission-modes).
- **L’approbation.** Trois choix : passer en mode auto, approuver chaque modification, ou continuer à planifier. `Ctrl+G` ouvre le plan dans votre éditeur pour le corriger avant [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permission-modes).
- **Le fichier du plan.** Il va dans `~/.claude/plans/`, ou dans le dossier fixé par `plansDirectory` [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permission-modes). Il est relu depuis le disque après une compaction ([section 3.2](https://gmag-dev.github.io/bien-demarrer-claude-code/3-la-fenetre-de-contexte.html#s3-2)).
- **`opusplan`.** Cet alias planifie avec `opus` et exécute avec `sonnet` [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config).
- **La reprise.** Une session finie en mode plan reprend en mode plan, et accepter un plan donne à la session un titre tiré du plan [\[41\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sessions).

**Bonnes pratiques.**

- Planifiez pour une tâche longue ou incertaine, pas pour un petit changement ([section 4.2](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-2)).
- Corrigez le plan par `Ctrl+G` plutôt que par une suite de messages [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permission-modes).

**Pièges.**

- Dans une session interactive du terminal où `bypassPermissions` est disponible, même sans être le mode choisi, les blocages du mode plan ne sont pas appliqués : Claude est seulement invité à planifier [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permission-modes).
- Une règle `deny` qui retire l’outil `ExitPlanMode` empêche Claude de présenter son plan [\[41\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sessions).
- L’option `showClearContextOnPlanAccept` ajoute en tête de la liste d’approbation un choix qui approuve le plan et vide le contexte de planification [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permission-modes).

**Génération Claude 5.** L’agent Plan hérite du modèle de la session : `CLAUDE_CODE_SUBAGENT_MODEL`, seule, ne le change pas [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents).

**Dans le guide.** Sections [4.1](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-1), [4.2](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-2) et [3.2](https://gmag-dev.github.io/bien-demarrer-claude-code/3-la-fenetre-de-contexte.html#s3-2).

### L.13 Sessions : reprise, branches, points de contrôle et contexte

**Rôle.** Une modification à défaire, ou un travail à reprendre le lendemain, ne doit pas dépendre de votre mémoire. Une session est une conversation enregistrée, liée à un dossier, que l’on reprend, nomme, copie ou rembobine [\[41\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sessions).

**La structure.** Une session avance de point de contrôle en point de contrôle. On peut y revenir, la copier, ou la reprendre plus tard, et chaque geste rend une partie différente de l’état (figure suivante).

*Dessin : Une session : points de contrôle, copie, retour en arrière et reprise. Schéma : la description suit.*

**Figure :** Une session : points de contrôle, copie, retour en arrière et reprise. En tirets gris votre geste, en vert les points de contrôle et ce que la reprise rend, en bleu les deux copies, en rouge ce qu’il faut repasser ou confier à git, en tirets ambre le retour en arrière. D’après [\[41\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sessions) et [\[42\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-checkpointing).

La même session, en texte :

1. Vous démarrez une session, nommée par `claude -n nom`, ou plus tard par `/rename`.
2. Chaque message qui ouvre un tour crée un point de contrôle, et les 100 derniers gardent leurs instantanés.
3. `/rewind` revient à un point de contrôle antérieur, pour le code, la conversation ou les deux.
4. `/branch` copie la conversation et vous y fait passer. L’original reste intact.
5. `claude --continue --fork-session` fait la même copie dans un nouveau processus, sans les accords « pour cette session ».
6. La reprise, par `--continue`, `--resume` ou `/resume`, rend l’historique, le modèle, l’agent de session, le mode de permission dans les cas que décrit la page, l’objectif `/goal` et les tâches planifiées non expirées.
7. Les drapeaux `--mcp-config`, `--settings`, `--plugin-dir` et `--add-dir` sont à repasser. `/rewind` ne défait ni une modification faite par Bash, ni celle d’un sous-agent : git, oui.

**Fonctions avancées.**

- **Reprendre.** `claude --continue`, `claude --resume` avec un nom, un identifiant ou le chemin d’une transcription, `claude --from-pr <numéro>`, `/resume` dans la session [\[41\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sessions).
- **Ce qui revient.** L’historique, le modèle, l’agent de session, le mode de permission dans les cas de la page, l’objectif `/goal`, et les tâches planifiées non expirées. Les drapeaux `--mcp-config`, `--settings`, `--plugin-dir` et `--add-dir` ne reviennent pas : repassez-les [\[41\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sessions).
- **Nommer.** `claude -n nom`, `/rename`, ou `Ctrl+R` dans la liste. Le nom affiché par défaut ne sert pas à reprendre, le titre généré si [\[41\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sessions).
- **Copier.** `/branch` copie la conversation et vous y fait passer, l’original restant intact. `claude --continue --fork-session` fait de même dans un nouveau processus, sans les accords « pour cette session » [\[41\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sessions).
- **Les [points de contrôle](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-point-de-controle).** Chaque message qui ouvre un tour en crée un, et les 100 derniers gardent leurs instantanés. `/rewind` ou `Esc` deux fois restaure le code, la conversation ou les deux, ou résume « à partir d’ici » et « jusqu’ici » [\[42\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-checkpointing).
- **Les transcriptions.** En [JSONL](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-jsonl) dans `~/.claude/projects/<projet>/`, gardées 30 jours (`cleanupPeriodDays`). `/export` les rend lisibles, et `claude purge` les efface plus tôt [\[41\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sessions).
- **La [compaction](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-compaction)** et ce qui y survit sont traités en section [3.2](https://gmag-dev.github.io/bien-demarrer-claude-code/3-la-fenetre-de-contexte.html#s3-2) et [14.7](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-7). Les descriptions des skills y sont reconstruites, et les skills déjà invoqués reviennent, chacun par ses 5 000 premiers jetons au plus, dans un budget commun de 25 000 jetons : au-delà, les plus anciens sont retirés en premier ([section 21.1](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-1)) [\[30\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-context-window) [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-skills). Une règle à champ `paths` ou un `CLAUDE.md` de sous-dossier est résumé avec la conversation, puis rechargé à la demande [\[30\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-context-window).
- **Les fichiers cités par `@`** ([section 3.3](https://gmag-dev.github.io/bien-demarrer-claude-code/3-la-fenetre-de-contexte.html#s3-3)). Le contenu d’un fichier cité par `@` est inclus s’il tient dans la limite de l’outil de lecture, 25 000 jetons par défaut. Un fichier texte de plus de 256 Ko ne l’est pas [\[43\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-common-workflows).

**Bonnes pratiques.**

- Nommez une session avant `/clear` si vous voulez y revenir ([section 3.2](https://gmag-dev.github.io/bien-demarrer-claude-code/3-la-fenetre-de-contexte.html#s3-2)).
- Compactez à une coupure naturelle, entre deux tâches, plutôt que d’attendre la compaction automatique en pleine tâche [\[31\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-prompt-caching).
- Pour un script, lisez les sessions par `claude -p --resume <id> --output-format json`, pas en analysant les fichiers JSONL, dont le format change d’une version à l’autre [\[41\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sessions).

**Pièges.**

- Deux terminaux qui reprennent la même session sans la copier mêlent leurs messages dans une seule transcription [\[41\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sessions).
- `/rewind` ne restaure ni un fichier changé seulement par Bash, ni les modifications faites hors de la session, ni celles d’un sous-agent, ni les liens symboliques. Ce n’est pas un gestionnaire de versions [\[42\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-checkpointing).
- Le dialogue « Resume this conversation? » estime la part de la fenêtre de cinq heures que la conversation consommera au premier message [\[41\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sessions).
- Les sessions lancées par `claude -p` ou l’Agent SDK n’apparaissent pas dans la liste, mais se reprennent par leur identifiant [\[41\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sessions).

**Génération Claude 5.** Les modèles 5.5 ont une fenêtre d’un million de jetons. Les modèles à fenêtre native d’un million, dont les modèles 5.5, compactent vers 967 000 jetons par défaut, et `/autocompact` règle ce seuil par modèle [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config). La documentation lue le 16 novembre 2026, à une version plus récente que celle de ce guide, précise que Sonnet 4.6 et Opus 4.6, sans contexte étendu, compactent à 200 000 jetons [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config). Elle dit aussi que `/autocompact` accepte un seuil de 100 000 à 1 million de jetons, comme `/autocompact 500k`, sans dépasser la fenêtre du modèle, et l’enregistre pour le modèle en cours depuis la version 2.1.288 [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config). `/autocompact auto` revient au réglage d’usine [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config).

**Dans le guide.** [Chapitre 3](https://gmag-dev.github.io/bien-demarrer-claude-code/3-la-fenetre-de-contexte.html#ch3), sections [14.7](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-7), [18.2](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-2) et [19.8](https://gmag-dev.github.io/bien-demarrer-claude-code/19-plusieurs-sessions-en-parallele.html#s19-8).

### L.14 Worktrees et travail en parallèle

**Rôle.** Deux travaux qui écrivent en même temps dans le même dossier modifient les mêmes fichiers. Un [worktree](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-worktree) donne à une session ou à un sous-agent sa propre copie des fichiers et sa branche, sur un dépôt partagé [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees).

**La structure.** Deux worktrees sur un même dépôt, chacun avec ses fichiers et sa branche, sont la [figure 8.2](https://gmag-dev.github.io/bien-demarrer-claude-code/8-le-travail-en-parallele.html#fig-8-2) ([section 8.2](https://gmag-dev.github.io/bien-demarrer-claude-code/8-le-travail-en-parallele.html#s8-2)).

**Fonctions avancées.**

- **La base.** `worktree.baseRef` vaut `fresh` (la branche par défaut du dépôt distant) ou `head` (votre état local, commits non poussés compris) [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees).
- **Depuis une demande de fusion.** `claude --worktree "#1234"`, ou l’adresse d’une demande GitHub ou GitLab, crée le worktree sur ce changement [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees).
- **En cours de session.** Claude crée un worktree par l’outil `EnterWorktree`, et en sort par `ExitWorktree` [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees).
- **L’isolation appliquée.** Dans un worktree, Claude Code refuse une écriture dans la copie principale, une commande qui y tourne, une redirection de git vers elle, et une commande dont il ne peut pas vérifier où git agit [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees).
- **Ce qui est partagé.** Le dossier `.git`, les plugins de portée projet, les accords « ne plus demander », enregistrés dans la copie principale, sauf sous Windows, où ils restent propres à chaque worktree, et les skills, agents et commandes de projet non suivis par git (2.1.277) [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees).
- **Hors de git.** Des hooks `WorktreeCreate` et `WorktreeRemove` remplacent la logique de git pour un autre gestionnaire de versions [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees).
- **Le nettoyage.** Un balayage périodique retire les worktrees de sous-agents et de sessions d’arrière-plan plus vieux que `cleanupPeriodDays`, sauf ceux qui contiennent du travail. Un worktree d’agent en cours porte un verrou git [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees).
- **Au-delà des worktrees.** `/batch` découpe un grand changement en 5 à 30 unités, une par sous-agent dans son worktree [\[67\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-commands). Les équipes d’agents et la messagerie entre sessions sont au [chapitre 19](https://gmag-dev.github.io/bien-demarrer-claude-code/19-plusieurs-sessions-en-parallele.html#ch19).

**Bonnes pratiques.**

- Ajoutez `.claude/worktrees/` au `.gitignore`, et ne mettez dans `.worktreeinclude` que le strict nécessaire ([section 8.2](https://gmag-dev.github.io/bien-demarrer-claude-code/8-le-travail-en-parallele.html#s8-2)).
- Nommez une session en worktree si vous voulez qu’on vous demande avant de la supprimer en sortant [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees).

**Pièges.**

- Les contrôles d’isolation lisent le texte des commandes : un `cp` ou une redirection du shell vers la copie principale leur échappe [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees).
- Un `claude -p --worktree` ne nettoie pas son worktree, et son verrou reste jusqu’au balayage suivant [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees).
- Avec Git LFS installé en local au dépôt, le worktree contient des fichiers pointeurs : `git lfs pull` les remplit [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-worktrees).
- Un worktree isole les fichiers, pas les ressources hors du dossier ([section 8.2](https://gmag-dev.github.io/bien-demarrer-claude-code/8-le-travail-en-parallele.html#s8-2)).
- Sous Windows, une session de worktree ne lit pas le `settings.local.json` de la copie principale : vérifiez par `/hooks`, avant toute demande, que vos hooks y sont ([section 8.2](https://gmag-dev.github.io/bien-demarrer-claude-code/8-le-travail-en-parallele.html#s8-2)) [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-settings).
- Dans un worktree, le hook `Stop` du [chapitre 7](https://gmag-dev.github.io/bien-demarrer-claude-code/7-ecrire-ses-premieres-extensions.html#ch7) contrôle encore la copie principale : lancez le contrôle vous-même avant de committer ([section 8.2](https://gmag-dev.github.io/bien-demarrer-claude-code/8-le-travail-en-parallele.html#s8-2)).

**Génération Claude 5.** Rien de propre à un modèle dans la page relue.

**Dans le guide.** Sections [8.2](https://gmag-dev.github.io/bien-demarrer-claude-code/8-le-travail-en-parallele.html#s8-2), [8.3](https://gmag-dev.github.io/bien-demarrer-claude-code/8-le-travail-en-parallele.html#s8-3), [chapitre 19](https://gmag-dev.github.io/bien-demarrer-claude-code/19-plusieurs-sessions-en-parallele.html#ch19).
