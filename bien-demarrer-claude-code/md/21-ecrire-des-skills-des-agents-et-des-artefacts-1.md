> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.2.2 : « 21. Écrire des skills, des agents et des artefacts », partie 1 sur 3.
>
> - Précédent : [20. Piloter sa consommation et son projet (partie 2 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/20-piloter-sa-consommation-et-son-projet-2.md)
> - Suivant : [21. Écrire des skills, des agents et des artefacts (partie 2 sur 3)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/21-ecrire-des-skills-des-agents-et-des-artefacts-2.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-ch21>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## 21. Écrire des skills, des agents et des artefacts

> **🪪 Ce chapitre**
>
> **Pour qui** : la personne confirmée qui écrit ses propres skills, ses agents et les fichiers de méthode qui les entourent, et qui veut qu’ils se déclenchent au bon moment, tiennent leur rôle et durent.
>
> **Sur quel poste** : tout poste où Claude Code tourne, avec un dossier de projet sous git. Les noms de champs changent vite : relisez la page de documentation du jour avant de les recopier [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills). État décrit : la documentation de Claude Code 2.1.319 [\[1\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-changelog), sauf les passages marqués 🆕, écrits à la date de leur badge.
>
> **Ce que vous apprenez** : écrire, tester et évaluer un skill, un agent et une exigence, puis les versionner et les sauvegarder.
>
> **Deux parties** : le chapitre se lit en deux temps, chacun avec son « À retenir » et son exercice. La partie A, « Écrire et essayer » (sections [21.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-1) à [21.6](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-6)), écrit un skill et un agent et les essaie. La partie B, « Relier et faire durer » (sections [21.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-7) à [21.13](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-13)), les relie aux consignes, aux hooks, aux exigences et aux décisions, puis les versionne, les évalue et les sauvegarde. Faites l’exercice A avant d’ouvrir la partie B.
>
> **Deux chemins** : si un encadré « Quand la règle cède » vous a envoyée ici, lisez la section qu’il cite, puis revenez à votre chapitre. Sinon, lisez le chapitre dans l’ordre, partie par partie. Les sections à lire d’abord : 21.1, 21.3 et 21.4 si vous débutez, 21.2, 21.11 et 21.12 si vous écrivez déjà des skills.
>
> **Le fil rouge** 🌉 Passerelle : Bernard reprend le skill « brouillon pour relecture » du [chapitre 7](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch7) et le teste avant de le réécrire. Inès écrit les demandes qui doivent le déclencher et celles qui ne le doivent pas. Samia fait écrire l’exigence « quand un courrier contient un délai… » et la décision « l’outil n’envoie rien ». Odile et Thomas notent les brouillons qui calibrent l’évaluation, et Amadou sauvegarde le tout.
>
> **Où en est Passerelle** : en arrivant, la vague de soixante courriers est passée. L’outil a son skill, son hook, son contrôle des dates et des montants, et un backlog des types de courriers ([chapitre 20](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch20)). À la fin du chapitre, le skill a une suite de cas sous git, une version 1.1.0 et son journal, un agent de relecture en lecture seule, une exigence EARS liée à son test, et une sauvegarde vérifiée.

Le [chapitre 6](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch6) a présenté les extensions et le moment de les ajouter. Ce chapitre s’adresse à la personne qui les écrit. Un skill qui ne se déclenche pas, un agent qui reçoit trop d’outils, une consigne qui en contredit une autre : ces défauts ne se voient pas à la lecture du fichier, et ils coûtent cher une fois en service. Un fil court donc le chapitre : un skill, un agent ou un fichier de consignes est un **objet**, avec une interface (ce que les autres voient et appellent) et une implémentation (son corps). On l’écrit comme du code. On le teste avant de le publier, on le versionne, on note ses changements, et on le sauvegarde. Les extraits sont les pièces de Passerelle, toutes fictives. L’[annexe H](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-h) rassemble les exemples testés du guide.

### 21.1 L’anatomie d’un skill et la divulgation progressive

Un [skill](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-skill) est une fiche de procédure que Claude ne lit que lorsqu’il en a besoin. Au démarrage, il n’en voit que le nom et une phrase de description. S’il juge la fiche utile, il la lit, puis seulement les annexes dont la tâche a besoin. Pour commencer, un dossier, un fichier `SKILL.md`, un nom et une description bien écrite suffisent.

Un skill est un **dossier**. Il contient au moins un fichier `SKILL.md`, fait d’un en-tête au format [YAML](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-yaml) (le [frontmatter](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-frontmatter)) puis d’instructions en Markdown. Il peut contenir aussi `scripts/` (du code à exécuter), `references/` (de la documentation lue à la demande) et `assets/` (des gabarits, des images, des données) [\[65\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-agent-skills-spec).

Le frontmatter a deux étages. Le premier est le standard ouvert **Agent Skills**, que d’autres outils lisent aussi [\[65\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-agent-skills-spec). Le second regroupe les extensions propres à Claude Code [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills). La différence compte : Claude Code ignore sans erreur un champ inconnu, mais hors de Claude Code (un téléversement sur claude.ai, l’API) seuls les champs du standard sont admis, et tout autre champ provoque une erreur bloquante [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills). La plateforme ajoute deux interdits : pas de balise XML dans `name` ni dans `description`, et pas de mot réservé (« anthropic », « claude ») dans `name` [\[66\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skill-authoring-best-practices).

**Tableau 21.1 :** Les deux étages du frontmatter d’un skill, d’après [\[65\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-agent-skills-spec) et [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills).

| Champ | Standard Agent Skills | Claude Code |
| --- | --- | --- |
| `name` | obligatoire, 1 à 64 caractères, minuscules, chiffres et traits d’union, égal au nom du dossier | facultatif, vaut par défaut le nom du dossier, et donne la commande `/nom` |
| `description` | obligatoire, 1 à 1 024 caractères : ce que fait le skill et quand l’utiliser | recommandée, sert à décider quand appliquer le skill |
| `license`, `compatibility`, `metadata` | facultatifs | acceptés, sans effet |
| `allowed-tools` | expérimental | outils permis sans demande pendant le tour d’invocation |
| `when_to_use`, `argument-hint`, `arguments` | absents | déclencheurs ajoutés à la description, aide à la saisie, arguments nommés |
| `disable-model-invocation`, `user-invocable` | absents | qui peut lancer le skill : vous, Claude, ou les deux |
| `model`, `effort`, `context: fork`, `hooks`, `paths` | absents | modèle et effort du tour, exécution dans un sous-agent, hooks actifs dès l’invocation, activation limitée à certains fichiers |

Deux pièges sont silencieux. Si le YAML ne se lit pas, le skill se charge **sans aucun champ** : `/nom` marche encore, mais Claude ne peut plus le faire correspondre à sa description. `--debug` montre l’erreur, et `claude plugin validate`, appliqué au dossier des skills, repère les frontmatters illisibles [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills). Et une injection de commande dans le corps (un point d’exclamation suivi d’une commande entre accents graves) s’exécute **avant** que Claude voie le skill : sa sortie est insérée telle quelle, et un échec annule toute l’invocation. Avec le shell `bash` par défaut, le code 1 d’une commande de recherche ou de comparaison compte comme un résultat normal, et un code de 2 ou plus échoue toujours [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills).

> **⚠️ Attention**
>
> Installer un skill venu d’ailleurs, c’est accepter qu’une commande de son corps s’exécute à l’invocation, avec vos droits, avant que Claude ait rien décidé. Lisez le `SKILL.md` et ses scripts avant de copier le dossier, cherchez-y les points d’exclamation suivis d’une commande, et n’installez que des skills de source sûre [\[146\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-equipping-agents-skills).

Ce guide recommande donc un validateur de frontmatter comme première porte, et l’appel des scripts par `${CLAUDE_SKILL_DIR}`, le dossier du skill, plutôt que par un chemin absolu, pour que le skill marche à toutes les portées [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills).

Chez Passerelle, Bernard reprend le skill écrit au [chapitre 7](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch7). Inès l’avait réservé à sa commande, et il écrivait lui-même le brouillon. Bernard le coupe en deux. Le skill garde la connaissance, les règles de rédaction et la liste des dates, sans aucun effet de bord : Claude peut donc le choisir seul, et un agent peut le précharger ([section 21.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-5)). Bernard lève ainsi la réserve du [chapitre 7](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch7) : la ligne `disable-model-invocation: true` sort du frontmatter, parce que le skill ne modifie plus aucun fichier. L’écriture du fichier reste un geste de la session, en mode Manual ([section 21.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-3)). Le frontmatter n’emploie que des champs courts, et le corps appelle un script qui ne fait que lire, par la variable du dossier. L’identifiant du courrier lui arrive par `$ARGUMENTS`, que Claude Code remplace par ce qui suit le nom du skill dans la commande, par exemple `/brouillon-pour-relecture PASS-C-041` [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills) :

```markdown
---
name: brouillon-pour-relecture
description: Tire d'un courrier administratif fictif de Passerelle un brouillon en langage facile, pour relecture par une personne concernée, et liste ses dates et ses montants. À utiliser quand une ou un bénévole demande d'expliquer, de simplifier, de reformuler ou de regarder un courrier PASS-C. Ne pas utiliser pour vérifier un brouillon déjà écrit (skill verifier-dates-montants).
argument-hint: "[identifiant-du-courrier]"
---
```

```bash
python -I -B "${CLAUDE_SKILL_DIR}/scripts/lister_dates.py" "$ARGUMENTS"
```

**La [divulgation progressive](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-divulgation-progressive)** est le principe qui rend un skill bon marché : chaque niveau n’est chargé que si le précédent l’a rendu nécessaire [\[65\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-agent-skills-spec) [\[146\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-equipping-agents-skills) [\[66\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skill-authoring-best-practices).

*Dessin : Les trois niveaux de divulgation progressive d’un skill. Schéma : la description suit.*

**Figure 21.1 :** Les trois niveaux de divulgation progressive d’un skill. En gris ce qui est toujours là, en bleu ce qui entre à l’invocation, en vert ce qui n’entre qu’à la demande. D’après [\[65\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-agent-skills-spec), [\[146\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-equipping-agents-skills) et [\[66\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skill-authoring-best-practices).

Les mêmes niveaux, en texte :

1. Au démarrage de chaque session, Claude voit le nom et la description de chaque skill, environ 100 jetons par skill.
2. Quand Claude ou vous lancez le skill, son corps entre, moins de 5 000 jetons conseillés.
3. Les dossiers `references`, `scripts` et `assets` ne sont lus ou exécutés que si la tâche le demande. Un script exécuté ne coûte que sa sortie.

Trois règles d’écriture en découlent [\[66\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skill-authoring-best-practices) :

- **un seul niveau de renvoi** : toutes les références partent de `SKILL.md`, car face à une chaîne de renvois Claude peut ne lire que le début d’un fichier,
- **une table des matières** en tête de tout fichier de référence de plus de 100 lignes,
- **un corps court** : moins de 500 lignes, conseil que donnent aussi la documentation de Claude Code et le standard [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills) [\[65\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-agent-skills-spec). Chaque paragraphe doit justifier son coût : Claude est déjà très compétent.

Le guide de la plateforme parle de **degrés de liberté** : du texte libre quand plusieurs approches sont valables, un script paramétré quand un motif est préféré, un script exact et sans option quand l’opération est fragile. Il conseille aussi une option par défaut plutôt qu’une liste de choix, et le même mot pour la même chose d’un bout à l’autre [\[66\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skill-authoring-best-practices). Chez Passerelle, l’extraction des dates est fragile : elle passe par un script exact. La reformulation en phrases courtes admet plusieurs bonnes réponses : elle reste en texte libre.

Le contenu d’un skill a enfin un cycle de vie dans la session. À l’invocation, il entre dans la conversation et n’est plus relu. Après une compaction, Claude Code rattache la dernière invocation de chaque skill, en gardant ses 5 000 premiers jetons, dans un budget commun de 25 000 jetons rempli en partant du skill le plus récent : les skills plus anciens peuvent disparaître entièrement [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills). Mettez donc l’essentiel en haut du fichier, et réinvoquez le skill après une compaction.

**Tableau 21.2 :** Le même skill à trois niveaux, proposé par ce guide.

| Si vous… | Faites | Pourquoi |
| --- | --- | --- |
| débutez | un dossier, un fichier `SKILL.md`, un nom, une description et quelques lignes d’instructions | le premier niveau suffit à le faire trouver |
| êtes à l’aise | un script appelé par `${CLAUDE_SKILL_DIR}` pour l’étape fragile | un script exact ne se réinterprète pas |
| voulez aller plus loin | les champs propres à Claude Code, et le budget de réinjection après une compaction en tête du fichier | ce qui n’est pas en tête peut ne pas revenir |

> **📏 La limite**
>
> Ces règles rendent un skill bon marché et trouvable, pas juste : seul l’essai dit s’il fait ce qu’on attend ([section 21.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-4)).

> **🎓 Fonctions avancées et bonnes pratiques : les skills**
>
> - **Les champs propres à Claude Code.** `disallowed-tools` retire des outils et `allowed-tools` en autorise sans demande, l’un comme l’autre jusqu’à votre message suivant seulement : ce n’est pas une garde durable [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills).
> - **Les hooks d’un skill.** Ils s’enregistrent à l’invocation et durent jusqu’à la fin de la session, et le champ `once: true` d’un hook n’est honoré que dans le frontmatter d’un skill [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks).
> - **Le contrôle des invocations.** Une règle de permission `Skill(nom)` vise un skill exact, `Skill(nom *)` un préfixe, et `Skill` seul en `deny` les retire tous [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills).
> - **Les portées et le rechargement.** À nom égal, un skill d’entreprise l’emporte sur un skill personnel, et un skill personnel sur un skill de projet, et un skill modifié s’applique dans la session en cours [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills).
> - **Le piège.** Un YAML illisible charge le skill sans aucun champ et sans erreur visible, et `claude --debug` montre l’erreur [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills).
>
> Toutes les fonctions avancées, les bonnes pratiques et les pièges : [annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-l), [section L.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-2).

### 21.2 La liste des skills, son budget et le routage

La description est l’interface d’un skill : Claude s’en sert pour choisir parmi des skills qui peuvent être plus de cent [\[66\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skill-authoring-best-practices). Elle dit ce que fait le skill **et** quand l’utiliser, avec les mots que dirait la personne qui s’en sert, à la troisième personne, car elle est injectée dans le prompt système [\[66\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skill-authoring-best-practices) [\[65\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-agent-skills-spec).

> **💡 Conseil**
>
> Une forme de description en trois phrases, appuyée sur les pages de la plateforme et de Claude Code : « \[Verbe\] \[objet\] \[précision\]. À utiliser quand \[déclencheur 1\], \[déclencheur 2\], ou quand la personne mentionne \[mots-clés\]. Ne pas utiliser pour \[voisin le plus proche\]. » La dernière phrase règle un recouvrement. Elle coûte des caractères et ne se justifie que si un voisin existe. Écrivez les variables entre crochets : des chevrons s’afficheraient en codes illisibles [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills).

Cette liste a un **budget**. La description et `when_to_use` sont coupées ensemble à 1 536 caractères. La liste entière a un budget en caractères qui suit 1 % de la fenêtre de contexte. Au-delà, tous les noms restent, mais les descriptions tombent en commençant par les skills les moins invoqués : Claude peut encore les invoquer, mais il est moins enclin à en choisir un de lui-même [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills) [\[32\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings-reference). D’où la consigne de l’éditeur : le cas d’usage principal en premier [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills).

**Tableau 21.3 :** Les leviers et les mesures du budget de la liste, d’après [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills) et [\[32\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings-reference).

| Levier ou mesure | Effet |
| --- | --- |
| `skillListingMaxDescChars` | change la coupe de chaque description, 1 536 caractères par défaut |
| `skillListingBudgetFraction` | change la part de la fenêtre réservée à la liste, 0,01 par défaut |
| `skillOverrides` | prend quatre valeurs : `on`, `name-only` (le nom seul), `user-invocable-only` (caché à Claude, `/nom` reste possible), `off`. Il ne s’applique pas aux skills de plugin |
| `disable-model-invocation: true` | la description sort du contexte, et le skill ne part que si vous tapez sa commande. Il ne peut plus être préchargé dans un sous-agent |
| `/doctor` | estime le coût de la liste et ses plus gros contributeurs |
| `/skill-doctor` | Nouveau · 7 nov. 2026 donne le coût et la fréquence d’usage de chaque skill (depuis la version 2.1.252) |
| `/context`, ligne Skills | donne la taille de la liste après application du budget |
| `--debug` | écrit un avertissement quand la liste déborde |

**Un ordre de grandeur, sur un exemple fictif** (valeurs d’exemple, à remplacer par votre mesure). Avec environ quatre caractères par jeton, une hypothèse, 1 % d’une fenêtre de 200 000 jetons donne environ 8 000 caractères, et 1 % d’une fenêtre d’un million environ 40 000. Un portefeuille fictif de 120 skills, à 900 caractères de description chacun, pèse 108 000 caractères : il déborde de 2,7 à 13,5 fois, et la plupart des descriptions ne sont alors pas vues. Le calcul est celui de ce guide. Le chiffre réel de votre poste se lit par `/context` et `/doctor`. La conséquence vaut quel que soit le chiffre : au-delà de quelques dizaines de skills, la longueur **moyenne** des descriptions compte autant que la qualité de chacune.

Quand un skill ne se déclenche pas, vérifiez ses mots-clés, sa présence dans la liste et, s’il a un champ `paths`, que les fichiers touchés sont bien sous le répertoire de travail. Le remède que donne la documentation est de reformuler la demande au plus près de la description [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills). Quand il se déclenche trop, précisez sa description ou réservez-le à la personne qui le tape [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills). Côté nom, le guide de la plateforme recommande la forme gérondive, un verbe en -ing (`processing-pdfs`), et déconseille `helper`, `utils`, `tools`, `documents`, `data` ou `files` [\[66\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skill-authoring-best-practices).

Un agent se choisit de la même façon, sur sa description. Au-delà de 15 000 jetons de descriptions d’agents cumulées, Claude Code avertit au démarrage, et tous les agents se chargent quand même. La documentation demande des descriptions qui désignent un seul agent [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sub-agents).

**Router parmi des centaines.** La précision du choix baisse quand le nombre de candidats grandit, et restreindre les candidats **avant** que le modèle choisisse améliore la sélection : la plateforme le dit des outils, au-delà de 30 à 50 [\[147\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-tool-search-tool), et une étude le mesure sur des serveurs MCP [\[148\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-rag-mcp). Claude Code applique déjà ce principe aux outils MCP : au démarrage, seuls leurs noms se chargent, et leurs schémas complets restent différés jusqu’à ce qu’une tâche les demande [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-features-overview). Ce chargement différé est actif par défaut, et l’[annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-l), [section L.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-5), dit ce qui le coupe [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mcp). Pour un flux connu, rien ne vaut un chemin qui ne dépend d’aucun déclenchement : taper `/nom`, faire précharger le skill par un agent ([section 21.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-5)), ou lancer une session entière sur un agent par `claude --agent` [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sub-agents).

Chez Passerelle, Inès essaie deux demandes dans une session neuve. « Fais le brouillon de PASS-C-041 » déclenche le skill. « Jette un œil à ce courrier PASS-C-041 » ne le déclenche pas dans la première version, dont la description ne parlait que de brouillon. Elle ajoute l’intention, « regarder un courrier », à la description de l’exemple de la [section 21.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-1), et garde les deux demandes comme cas d’essai ([section 21.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-4)).

> **🔀 Quand la règle cède**
>
> - Au-delà de quelques dizaines de skills, la description d’un skill peu invoqué peut tomber de la liste, et la meilleure description ne sert plus à rien.
> - Ce qui tient : l’invocation explicite par `/nom`, et le préchargement d’un ensemble de skills par un agent, qui ne dépendent d’aucun déclenchement ([section 21.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-5)).
> - Pour aller plus loin : [section 21.12](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-12), où les cas de déclenchement entrent dans l’évaluation.

### 21.3 Skill, commande, hook ou agent ?

Partez toujours du plus léger, comme le dit la forme courte de la [section 6.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s6-3), que cette section approfondit. Une consigne générale va dans `CLAUDE.md`, une procédure dans un skill, ce qui doit arriver à chaque fois dans un [hook](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-hook), un travail qui inonderait la conversation dans un [sous-agent](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-sous-agent).

Un sous-agent convient à une sortie verbeuse inutile à la session principale, à des outils à restreindre, ou à un travail autonome qui rend un résumé. La session principale vaut mieux pour les allers-retours fréquents, un petit changement ou une latence qui compte [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sub-agents).

*Dessin : Choisir l’objet à écrire, du moins coûteux au plus coûteux. Schéma : la description suit.*

**Figure 21.2 :** Choisir l’objet à écrire, du moins coûteux au plus coûteux. En bleu les questions, posées dans l’ordre, en gris les objets, en ambre la règle imposée, en vert ce qui ne demande rien de plus. Synthèse de ce guide, d’après [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills), [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-memory), [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sub-agents) et [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-output-styles).

Le même choix, en texte, où l’on s’arrête au premier « oui » :

1. Claude le trouve-t-il seul en lisant le dépôt ? Oui : ne rien écrire.
2. Cela doit-il arriver à chaque fois, sans exception ? Oui : un hook, exécuté par le harnais.
3. Est-ce une convention à connaître à chaque session ? Oui : une ligne de `CLAUDE.md`, ou une règle du dossier `.claude/rules` si elle ne vaut que pour certains chemins.
4. Est-ce une procédure pour un type de tâche ? Oui : un skill, réservé à votre commande s’il a des effets de bord.
5. Sa sortie inonderait-elle la conversation, ou faut-il restreindre les outils ? Oui : un sous-agent, ou un skill en `context: fork`.
6. Non à tout : un style de sortie si c’est une voix ou un format pour toute la session, sinon la conversation suffit.

**Tableau 21.4 :** Ce que vous voulez, l’objet qui le porte, et pourquoi, d’après [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-memory), [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills), [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sub-agents), [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks) et [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-output-styles).

| Vous voulez | Utilisez | Parce que |
| --- | --- | --- |
| que Claude connaisse les conventions et les commandes du projet | `CLAUDE.md` | chargé à chaque session, relu après une compaction [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-memory) |
| une consigne qui ne vaut que pour une partie du code | une règle `.claude/rules/` avec `paths:` | chargée quand Claude touche ces fichiers [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-memory) |
| une procédure pour un type de tâche | un skill | chargé seulement à l’usage [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills) |
| une procédure à effets de bord, lancée par vous seule ou seul | un skill avec `disable-model-invocation: true` | Claude ne la lance pas de lui-même [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills) |
| une procédure qui inonderait la conversation | un skill en `context: fork`, ou un sous-agent | contexte séparé, un résumé revient [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills) [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sub-agents) |
| que quelque chose arrive à chaque fois, sans exception | un hook | exécuté par le harnais, pas par le jugement de Claude [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks) |
| une voix, une longueur, un format pour toute la session | un style de sortie | s’applique à chaque réponse [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-output-styles) |

Les commandes personnalisées ont été **fusionnées** dans les skills : `.claude/commands/x.md` et `.claude/skills/x/SKILL.md` créent tous deux `/x`. À nom égal, le skill l’emporte. Un fichier de commande accepte le même frontmatter, sauf `name` et `paths` [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills). Le manifeste de plugin recommande `skills/` plutôt que `commands/` pour un nouveau plugin [\[61\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-reference). Ce guide conseille donc d’écrire toute nouvelle commande comme un skill, car un dossier peut accueillir un script et des références.

Chez Passerelle, clore un lot déplace les brouillons vers le dossier « à relire » d’Odile : c’est un effet de bord. Le skill est réservé à la personne qui le tape, et déclare ses arguments nommés :

```markdown
---
name: clore-lot
description: Range les brouillons d'un lot de Passerelle dans le dossier à relire et en dresse la liste pour la relectrice, sans rien envoyer.
disable-model-invocation: true
argument-hint: "[numéro-du-lot] [dossier-cible]"
arguments: lot dossier
---
```

Agent et skill se composent. Le champ `skills` d’un agent **précharge le contenu complet** des skills listés, et un skill réservé à la personne ne peut pas être préchargé [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sub-agents). Ce guide en tire un partage des rôles : la **connaissance** vit dans le skill, à un seul endroit. L’**exécutant** vit dans l’agent, avec ses outils, son modèle, ses droits et le format de son rapport, et il précharge le skill au lieu d’en recopier le texte.

Les vues de la conversation et les styles de sortie sont dans l’[annexe D](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-d), [section D.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-d-7).

> **🎓 Fonctions avancées et bonnes pratiques : les commandes**
>
> - **Deux familles.** Les commandes intégrées, comme `/model` ou `/branch`, agissent sur Claude Code, et les skills fournis, comme `/batch`, `/simplify` ou `/code-review`, sont des prompts donnés à Claude [\[67\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-commands).
> - **Des commandes d’expert.** `/goal` fait travailler Claude de tour en tour jusqu’à une condition, `/fork` copie la conversation dans une session d’arrière-plan, et `/btw` pose une question à côté, sans l’ajouter au fil [\[67\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-commands).
> - **La file d’attente.** Une commande envoyée pendant une réponse attend la fin du tour, sauf `/status`, `/tasks` et `/usage`, qui s’exécutent tout de suite [\[67\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-commands).
> - **En mode non interactif.** Les skills que vous lancez marchent dans `claude -p`, les commandes du seul terminal non [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-headless).
> - **Le piège.** Une commande n’est reconnue qu’en début de message, et dans une boucle `/loop` une commande intégrée arrive à Claude comme du texte, sans s’exécuter [\[67\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-commands) [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-scheduled-tasks).
>
> Toutes les fonctions avancées, les bonnes pratiques et les pièges : [annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-l), [section L.6](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-6).

> **🎓 Fonctions avancées et bonnes pratiques : les styles de sortie**
>
> - **Cinq styles fournis.** Default, Proactive, Concise, Explanatory, dont les blocs « Insight » expliquent les choix, et Learning, qui laisse des morceaux à écrire, marqués `TODO(human)` [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-output-styles).
> - **Les styles à vous.** Un fichier Markdown dans `~/.claude/output-styles/` ou `.claude/output-styles/`, où `keep-coding-instructions: true` garde les consignes d’ingénierie de Claude Code, que le style retire sinon [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-output-styles).
> - **Les trois se combinent.** Un style pour la voix et la forme, `CLAUDE.md` pour les faits du projet, un hook pour ce qui doit arriver à coup sûr [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-output-styles).
> - **Le piège.** La clé `outputStyle` respecte la casse : `explanatory` au lieu de `Explanatory` donne le style Default, sans erreur [\[37\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-output-styles).
>
> Toutes les fonctions avancées, les bonnes pratiques et les pièges : [annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-l), [section L.10](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-10).
