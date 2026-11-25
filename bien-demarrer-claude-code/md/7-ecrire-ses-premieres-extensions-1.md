> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.2.2 : « 7. Écrire ses premières extensions : skills et hooks », partie 1 sur 2.
>
> - Précédent : [6. Choisir ses extensions (partie 2 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/6-choisir-ses-extensions-2.md)
> - Suivant : [7. Écrire ses premières extensions : skills et hooks (partie 2 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/7-ecrire-ses-premieres-extensions-2.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-ch7>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## 7. Écrire ses premières extensions : skills et hooks

> **🪪 Ce chapitre**
>
> **Pour qui** : toute personne qui a choisi un skill ou un hook pour une gêne ([chapitre 6](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch6)), et qui veut l’écrire, puis le voir agir.
>
> **Sur quel poste** : n’importe lequel, avec Claude Code et, pour le chemin avec code, Python 3. Le hook de la [section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-2) se teste sur une machine où vos propres hooks tournent : le Conseil de la [section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-2) dit comment le vérifier.
>
> **Ce que vous apprenez** : écrire un skill réservé à votre commande et un hook qui ferme quand il doute, puis prouver que chacun agit.
>
> **Deux chemins** : si vous débutez, lisez tout le chapitre et faites les trois barreaux : comptez 30 à 45 minutes pour l’exercice. Si vous répondez juste à la question ci-dessous, lisez les encadrés « La limite » et « Quand la règle cède », l’encadré des fonctions avancées des skills, qui renvoie à l’[annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-l), et la règle en gras de la [section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-2), pour ce qui s’exécute sans vous demander, puis faites le barreau ③, qui l’applique.
>
> **Le fil rouge** 🌉 Passerelle : Inès fait du prompt qu’elle retape chaque matin un skill, « brouillon pour relecture ». Bernard écrit un hook qui refuse d’écrire dans un fichier un numéro qui a la forme d’un numéro de sécurité sociale, et Amadou, qui tient le dossier des courriers, vérifie le refus. Bernard impose aussi son contrôle à chaque fin de tour.
>
> **Où en est Passerelle** : en arrivant, chaque gêne a son extension choisie, et le serveur du lexique est branché, en lecture seule ([chapitre 6](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch6)). À la fin du chapitre, le skill et les deux hooks existent, et chacun est prouvé : le skill par un brouillon produit et contrôlé, la garde par un refus constaté, le hook `Stop` par un échec voulu qui renvoie Claude au travail.

Choisir une extension ne suffit pas : elle doit encore être écrite, puis prouvée, au lieu d’être crue installée. Les deux que vous écrirez le plus tôt sont le skill, qui enregistre un prompt que vous retapez, et le hook, qui fait arriver une action à chaque fois [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-features-overview) [\[59\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks-guide). Ce chapitre écrit les deux sur Passerelle, et prouve chacun par son effet constaté.

> **⏭️ Vous pouvez sauter ce chapitre si…**
>
> Claude a oublié deux fois de lancer le contrôle des dates après avoir modifié un brouillon. Que mettez-vous en place, et pourquoi pas un skill ? Écrivez votre réponse avant d’ouvrir la réponse attendue.
>
> **Voir la réponse attendue**
>
> Une action qui doit arriver à chaque fois, sans exception, relève d’un hook : ici un hook `PostToolUse` sur les outils d’écriture, de type `command`, qui lance le contrôle après chaque modification. Un hook `Stop`, comme celui de Bernard en [section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-2), répond aussi : il lance le contrôle de tout le dossier une fois par tour, quand Claude veut s’arrêter, et le renvoie au travail s’il échoue. On le relit avec `/hooks` avant de l’accepter, parce qu’il s’exécute avec vos permissions. Un skill, comme une ligne de `CLAUDE.md`, reste une consigne, que Claude suit presque toujours. Une réponse d’experte dit aussi qu’un hook de type `prompt` ou `agent` fait décider un autre modèle, et n’est donc pas déterministe.
>
> Vous avez ces éléments ? Lisez seulement les encadrés « La limite » et « Quand la règle cède », l’encadré des fonctions avancées des skills, qui renvoie à l’[annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-l), [section L.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-2), et la règle en gras de la [section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-2), pour ce qui s’exécute sans vous demander, puis faites le barreau ③ de l’exercice, qui l’applique. Sinon, lisez le chapitre dans l’ordre : il est écrit pour vous.

### 7.1 Les skills, un prompt enregistré

Vous retapez chaque jour le même long prompt, ou vous collez la même procédure pour la troisième fois : le skill les enregistre une fois pour toutes [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-features-overview). C’est l’extension que vous écrirez le plus souvent. Il se découvre en deux temps : d’abord comme un prompt enregistré, que vous lancez par son nom, puis comme un dossier, avec sa structure, ses champs et ses fonctions avancées.

#### Le skill comme prompt enregistré

Si vous tapez souvent le même long prompt, enregistrez-le une fois pour toutes : c’est un skill, que vous lancez ensuite en tapant son nom après une barre oblique. Claude peut aussi s’en servir seul quand la tâche s’y prête.

Un skill est un fichier `SKILL.md` qui contient des instructions, une connaissance ou une procédure. Claude l’emploie quand il le juge utile, ou vous le lancez par `/nom-du-skill` [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills). Il se place dans `.claude/skills/<nom>/SKILL.md` pour le projet, à versionner pour l’équipe, ou dans `~/.claude/skills/<nom>/SKILL.md` pour tous vos projets.

Un skill pèse moins qu’une section de `CLAUDE.md` : à chaque session, Claude ne voit que son nom et sa description, et ne lit le fichier complet que lorsque la tâche le demande [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices). La description décide du déclenchement : si elle est vague, ou recoupe celle d’un autre skill, Claude peut charger le mauvais ou manquer le bon [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-features-overview). Pour une procédure qui modifie des fichiers ou agit au-dehors, le champ `disable-model-invocation: true` empêche Claude de la lancer seul. Elle ne part que si vous tapez la commande, et sa description ne coûte plus rien en contexte [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices) [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-features-overview).

Chez Passerelle, Inès retapait chaque matin le même prompt pour tirer un brouillon d’un courrier. Elle en a fait ce skill, `.claude/skills/brouillon-pour-relecture/SKILL.md`, où `$ARGUMENTS` reçoit ce qu’elle tape après la commande [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills) :

```markdown
---
name: brouillon-pour-relecture
description: Tire d'un courrier fictif de Passerelle un brouillon en langage facile, pour relecture par une personne concernée. À lancer sur un seul courrier PASS-C à la fois.
disable-model-invocation: true
---
Le courrier à traiter est $ARGUMENTS.
1. Lire ce courrier, et lui seul, dans courriers/.
2. Écrire le brouillon dans brouillons/, sous le même numéro : PASS-C-014 donne PASS-B-014.
3. Commencer le brouillon par la ligne « Brouillon pour relecture », comme le demande CLAUDE.md.
4. Suivre les règles de rédaction de regles-redaction.md, à lire avant d'écrire.
5. Lancer le contrôle des dates et des montants sur ce brouillon, et montrer sa sortie.
6. Ne rien envoyer, à personne.
```

Elle le lance par `/brouillon-pour-relecture PASS-C-014`. La sixième ligne n’est qu’une consigne : la règle qui retire à l’outil ses moyens d’envoyer se pose au [chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch10), et elle ne tient que si aucun outil restant ne peut envoyer.

**Tableau 7.1 :** Le même besoin, faire d’un prompt un skill, à trois niveaux. Proposé par ce guide, d’après [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices).

| Si vous… | Ce que vous faites | Pourquoi |
| --- | --- | --- |
| débutez | « Transforme le prompt que je viens d’utiliser pour le brouillon de PASS-C-003 en un skill de projet, que je lancerai moi-même, et montre-moi le fichier avant de l’écrire. » | vous lisez ce que Claude a retenu de votre prompt |
| êtes à l’aise | une description précise, qui dit quand employer le skill et sur quoi ([section 21.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-2)) | c’est elle qui décide du déclenchement |
| allez plus loin | `disable-model-invocation: true` pour une procédure qui modifie des fichiers, et un essai sur trois courriers avant de partager le skill | la procédure ne part que sur votre commande, et vous l’avez vue marcher |

> **📏 La limite**
>
> Un skill reste une [consigne](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-consigne) : Claude peut sauter une de ses étapes, y compris « ne rien envoyer ». Ce qui doit tenir à chaque fois va dans un hook ([section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-2)), ou se retire par la structure ([chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch10)). Et pour ce que Claude trouve seul en lisant le dépôt, un skill est inutile [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices).

#### La structure d’un skill et ses fonctions avancées

Un skill n’est pas qu’un fichier : c’est un **dossier**, dont `SKILL.md` est la seule pièce obligatoire. À côté, il peut ranger trois dossiers : `references/` pour de la documentation, `scripts/` pour du code, `assets/` pour des gabarits, des images ou des données [\[65\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-agent-skills-spec). Chaque pièce entre dans le contexte à son heure, et l’une d’elles n’y entre jamais : elle s’exécute ([figure 7.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#fig-7-1)).

*Dessin : L'anatomie d'un dossier de skill : ce qui entre, quand, et ce qui s'exécute. Schéma : la description suit.*

**Figure 7.1 :** L’anatomie d’un dossier de skill : ce qui entre, quand, et ce qui s’exécute. À gauche les éléments du dossier. À droite, en gris ce qui est toujours là, en bleu ce qui entre à l’invocation, en vert ce qui n’entre qu’à la demande, en ambre ce qui s’exécute et dont seule la sortie entre. Chaque case le dit aussi en mots. D’après [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills), [\[65\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-agent-skills-spec) et [\[66\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skill-authoring-best-practices).

Le même dossier, en texte :

1. L’en-tête de `SKILL.md`, avec `name` et `description` : la description est là à chaque requête, environ 100 jetons, et sert à choisir le skill.
2. Le corps de `SKILL.md` : il entre à l’invocation, par `/nom` ou par le choix de Claude. Moins de 500 lignes, l’essentiel en tête.
3. Une commande injectée dans le corps : elle s’exécute avant que Claude lise le skill, sa sortie prend sa place, et un code de sortie de 2 ou plus, ou de 1 hors d’une recherche ou d’une comparaison, annule l’invocation.
4. `references/` : lu à la demande, si la tâche le demande, par un seul niveau de renvoi depuis `SKILL.md`.
5. `scripts/` : exécuté, pas chargé. Seule sa sortie entre. On l’appelle par `${CLAUDE_SKILL_DIR}`.
6. `assets/` : des gabarits, des images, des données, employés seulement si la tâche le demande.

**Ce qui est chargé, et quand.** C’est la [divulgation progressive](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-divulgation-progressive) : chaque niveau n’entre que si le précédent l’a rendu nécessaire. La description d’abord, à chaque requête, puis le corps à l’invocation, puis les fichiers du dossier, seulement si la tâche les demande [\[65\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-agent-skills-spec) [\[66\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skill-authoring-best-practices). Une fois invoqué, le corps reste dans la conversation. Après une [compaction](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-compaction), seuls ses premiers jetons reviennent : l’essentiel va en tête du fichier [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills).

**Les trois dossiers.** `references/` reçoit ce qui serait trop long pour le corps : un barème, des règles détaillées, un modèle de données. Chaque fichier se nomme depuis `SKILL.md`, à un seul niveau de renvoi, car face à une chaîne de renvois Claude peut ne lire que le début d’un fichier [\[66\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skill-authoring-best-practices). `scripts/` reçoit le code d’une étape fragile : un script est **exécuté, pas chargé**, et seule sa sortie entre dans le contexte [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills) [\[65\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-agent-skills-spec). `assets/` reçoit ce que le skill emploie sans le lire en entier, comme un gabarit à copier [\[65\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-agent-skills-spec).

**Les arguments et le dossier du skill.** Ce que vous tapez après `/nom` arrive dans le corps par `$ARGUMENTS`, ou mot par mot par `$ARGUMENTS[N]` ou `$N`, à partir de 0, ou par `$nom` pour un argument que nomme le champ `arguments`. Sans aucun de ces emplacements, Claude Code ajoute les arguments en fin de skill, sous la forme `ARGUMENTS: <valeur>`. La variable `${CLAUDE_SKILL_DIR}` donne le dossier du skill, quelle que soit sa portée [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills). Ce guide propose d’appeler chaque script par elle plutôt que par un chemin écrit en dur, pour que le skill marche aussi bien dans le projet que dans `~/.claude/skills/`.

**L’injection de contexte.** Une commande écrite entre \``!` \``et un accent grave, ou un bloc de code ouvert par` \`\``!`, s’exécute **avant** que Claude lise le skill, et sa sortie prend sa place. Un échec annule toute l’invocation [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills). Le réglage `"disableSkillShellExecution": true` coupe cette exécution pour vos skills, ceux du projet et ceux des plugins [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills). C’est la ligne à chercher avant d’installer un skill venu d’ailleurs, car elle tourne avec vos droits ([section 21.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-1)).

**Le fork.** Avec `context: fork`, le skill tourne dans un contexte séparé, comme un [sous-agent](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-sous-agent), et seul son résultat revient. Le champ `agent` choisit lequel : `Explore`, `Plan`, `general-purpose` ou un agent à vous. Réservez-le à un skill qui porte une tâche explicite : un skill fait seulement de consignes, lancé en fork, ne rend rien d’utile [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills).

**Qui le lance.** Par défaut, vous et Claude. `disable-model-invocation: true` le réserve à votre commande, et sa description ne coûte plus rien en contexte. `user-invocable: false` fait l’inverse : le skill disparaît du menu `/`, et Claude le charge quand il sert, ce qui convient à un savoir de fond [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills) [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-features-overview). Ce guide propose de se poser trois questions dans l’ordre ([figure 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#fig-7-2)).

*Dessin : Qui lance le skill, et où il tourne. Schéma : la description suit.*

**Figure 7.2 :** Qui lance le skill, et où il tourne. En bleu les questions, posées dans l’ordre. En ambre ce qui est réservé à votre commande, en vert ce qui tourne dans un contexte séparé, en gris le reste, chaque case le disant aussi en mots. Schéma proposé par ce guide, d’après [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills) et [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-features-overview).

Le même choix, en texte, où l’on s’arrête au premier « oui » :

1. Le skill modifie-t-il des fichiers, ou agit-il au-dehors ? Oui : `disable-model-invocation: true`. Vous seule ou seul le lancez, et sa description ne coûte plus rien en contexte.
2. Est-ce un savoir de fond, que vous ne lanceriez pas vous-même ? Oui : `user-invocable: false`. Il disparaît du menu `/`, et Claude le charge quand il sert.
3. Porte-t-il une tâche explicite dont le travail inonderait la conversation ? Oui : `context: fork`, avec le champ `agent` qui choisit le sous-agent. Seul le résultat revient.
4. Non à tout : le défaut, que vous et Claude lancez, dans la conversation.

**La description décide du déclenchement.** Claude choisit un skill sur sa seule description. Elle dit ce que fait le skill **et** quand l’employer, avec les mots que dirait la personne qui s’en sert, à la troisième personne, en 1 024 caractères au plus [\[65\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-agent-skills-spec) [\[66\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skill-authoring-best-practices). Une description vague, ou qui recoupe celle d’un autre skill, fait charger le mauvais ou manquer le bon [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-features-overview).

**Quand en faire un skill, et quand non.** Un skill répond à un prompt que vous retapez, ou à une procédure que vous collez pour la troisième fois ([tableau 6.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#tab-6-1)) [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-features-overview). Il est de trop pour ce que Claude trouve seul en lisant le dépôt [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices). Il ne suffit pas pour ce qui doit arriver à chaque fois, qui relève d’un hook ([section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-2)), ni pour une convention de chaque session, qui tient en une ligne de `CLAUDE.md`. Et une tâche dont la sortie inonderait la conversation va dans un sous-agent, ou dans un skill en fork. La [figure 6.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#fig-6-2) range ces choix ([section 6.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s6-3)).

Chez Passerelle, le skill d’Inès tient encore en un seul fichier. Au [chapitre 21](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch21), Bernard lui ajoute un script qui ne fait que lire, et le corps l’appelle par la variable du dossier ([section 21.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-1)). Le dossier devient :

```text
.claude/skills/brouillon-pour-relecture/
├── SKILL.md
└── scripts/
    └── lister_dates.py
```

Le contrôle des dates et des montants, `controle_dates.py`, reste à la racine du dépôt : le hook de la [section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-2) et la règle de permission du [chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch10) l’appellent là, et son renommage, au [chapitre 14](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch14), les fait tous mettre à jour. Ce guide propose cette règle simple : un script qui ne sert qu’au skill va dans son dossier `scripts/`, un script que d’autres pièces appellent reste à un seul endroit, hors du skill.

> **🎓 Fonctions avancées et bonnes pratiques : les skills**
>
> - **Les outils pendant le skill.** `disallowed-tools` retire des outils et `allowed-tools` en autorise sans demande, l’un comme l’autre jusqu’à votre message suivant seulement : ce n’est pas une garde durable [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills).
> - **Les hooks d’un skill.** Ils s’enregistrent à l’invocation et durent jusqu’à la fin de la session, et le champ `once: true` d’un hook n’est honoré que dans le frontmatter d’un skill [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks).
> - **Le contrôle des invocations.** Une règle de permission `Skill(nom)` vise un skill exact, `Skill(nom *)` un préfixe, et `Skill` seul en `deny` les retire tous [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills).
> - **Les portées et le rechargement.** À nom égal, un skill d’entreprise l’emporte sur un skill personnel, et un skill personnel sur un skill de projet. Un skill modifié s’applique dans la session en cours [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills).
> - **L’enchaînement.** Un message qui commence par `/skill-a /skill-b` charge les deux, jusqu’à six [\[67\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-commands).
> - **Les commandes personnalisées.** Elles ont été fusionnées dans les skills : un fichier `.claude/commands/deploy.md` et un skill `.claude/skills/deploy/SKILL.md` créent tous deux `/deploy` [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills).
> - **Les codes de sortie de l’injection.** Avec le shell `bash` par défaut, tout code de sortie autre que 0 est un échec, sauf le code 1 d’une commande de recherche ou de comparaison, qui compte comme un résultat normal. Un code de 2 ou plus échoue toujours ([annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-l), [section L.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-2)) [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills).
> - **Le fork en arrière-plan.** Un skill en fork lancé en arrière-plan, le cas par défaut, modifie des fichiers que `/rewind` ne restaure pas [\[42\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-checkpointing).
> - **Le piège.** Un en-tête YAML illisible charge le skill sans aucun champ, sans erreur visible : `/nom` marche encore, le déclenchement automatique non. `claude --debug` montre l’erreur [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills).
>
> Toutes les fonctions avancées, les bonnes pratiques et les pièges : [annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-l), [section L.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-2). La [section 21.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-1) donne les chiffres de chaque niveau ([figure 21.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#fig-21-1)), et la [section 21.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-2) traite du budget de la liste des skills et du routage.
