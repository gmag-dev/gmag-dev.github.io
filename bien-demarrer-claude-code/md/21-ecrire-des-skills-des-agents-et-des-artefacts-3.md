> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.2.2 : « 21. Écrire des skills, des agents et des artefacts », partie 3 sur 3.
>
> - Précédent : [21. Écrire des skills, des agents et des artefacts (partie 2 sur 3)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/21-ecrire-des-skills-des-agents-et-des-artefacts-2.md)
> - Suivant : [22. Une architecture de référence du harnais](https://gmag-dev.github.io/bien-demarrer-claude-code/md/22-une-architecture-de-reference-du-harnais.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-s21-10>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

### 21.10 Versions et journal des changements

Numérotez chaque version de vos skills et de vos agents, et notez en une ligne ce qui a changé. C’est ce qui permet, le jour où quelque chose casse, de retrouver la modification en cause et de revenir en arrière. [SemVer](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-semver) et Keep a Changelog disent quel numéro changer et comment écrire la note.

Le standard Agent Skills n’a **pas de champ de version** : son exemple range la version dans `metadata` [\[65\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-agent-skills-spec), une table libre sur laquelle Claude Code n’agit pas [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills). Dans un plugin, `version` est une chaîne non vérifiée. La renseigner fixe sur cette version les personnes qui ont installé le plugin, jusqu’à ce qu’elle change [\[61\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-reference) : modifier un skill d’un plugin sans changer sa version ne le livre donc pas (inférence de ce guide).

**SemVer 2.0.0** fixe la forme `MAJEURE.MINEURE.CORRECTIF` : majeure pour un changement incompatible de l’API publique, mineure pour un ajout compatible, correctif pour une correction compatible. Un logiciel qui suit SemVer doit déclarer son API publique. Le contenu d’une version publiée ne doit plus changer. Une dépréciation demande une version mineure, avant le retrait dans une version majeure [\[153\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-semver).

Qu’est-ce que l’API publique d’un skill ou d’un agent ? Ce guide propose cinq éléments : son **nom** (ce qu’on tape, ce que d’autres préchargent), son **déclenchement** (la description), ses **entrées** (les arguments, les champs attendus du brief), sa **sortie** (le format du rapport ou du livrable) et les **chemins** de ses fichiers que d’autres citent.

**Tableau 21.9 :** Quel numéro changer, proposé par ce guide d’après [\[153\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-semver).

| Changement | Version |
| --- | --- |
| renommer, rétrécir le déclenchement, changer le format de sortie, retirer un fichier cité | majeure |
| ajouter une capacité sans rien casser, annoncer une dépréciation | mineure |
| corriger sans toucher au nom, au déclenchement, aux entrées, à la sortie ni aux chemins | correctif |

**Keep a Changelog 1.1.0** décrit le [journal des changements](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-journal-des-changements) : une liste choisie, ordonnée dans le temps, des changements notables de chaque version, écrite pour des humains. Une entrée par version, la plus récente en tête, datée au format ISO. Six types de changements : **Added**, **Changed**, **Deprecated**, **Removed**, **Fixed** et **Security**. Une section **Unreleased** en tête. Une version retirée pour un défaut grave se marque `[YANKED]` [\[154\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-keep-a-changelog). Le texte met en garde contre la recopie du journal des commits, qui n’est que du bruit [\[154\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-keep-a-changelog). Déprécier avant de retirer est une règle commune aux deux textes [\[153\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-semver) [\[154\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-keep-a-changelog).

Le journal du skill de Passerelle, après le travail de Bernard :

```markdown
## [Unreleased]

## [1.1.0] - 2026-11-05
### Added
- Le délai du courrier est repris dans la première phrase du brouillon (PASS-EX-004).
### Deprecated
- L'argument --sans-lexique. Il sera retiré en 2.0.0.

## [1.0.0] - 2026-10-20
### Added
- Première version publiée.
```

Ce guide ajoute deux règles. Le journal vit **hors** du fichier qu’il décrit : un skill garde un pointeur vers son journal, pour ne pas payer l’historique en jetons à chaque invocation. Et chaque affirmation d’une note de version (un compte, « tout est appliqué ») est vérifiée avant le commit, par un comptage ou par la revue.

### 21.11 Un portefeuille dans la durée

Un portefeuille de skills et d’agents vieillit comme du code. Quand plusieurs sessions le partagent, une seule l’écrit ([chapitre 19](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch19)). Claude Code et le standard fournissent des contrôles automatiques. Le guide de la plateforme publie une liste de contrôle à passer avant de partager un skill, en trois blocs : qualité, code et scripts, tests, avec au moins trois évaluations, des essais avec chaque modèle et en usage réel [\[66\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skill-authoring-best-practices).

**Tableau 21.10 :** Les contrôles fournis par l’outil et le standard, d’après [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-memory), [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills), [\[61\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-plugins-reference) et [\[65\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-agent-skills-spec).

| Contrôle | Ce qu’il regarde |
| --- | --- |
| `/doctor prompt-audit` | consignes pour d’anciens modèles, renvois morts et contradictions, dans tous les fichiers de consignes. Propose, ne modifie rien sans accord |
| `/skill-doctor` | le coût et la fréquence d’usage de chaque skill, donc les skills inutilisés |
| `/doctor` | le coût estimé de la liste des skills et ses plus gros contributeurs |
| `claude plugin validate` | frontmatters illisibles, chemins, champs inconnus d’un manifeste |
| `skills-ref validate` | la conformité au standard Agent Skills |

Ce guide propose cinq habitudes pour la durée :

- **les contrôles automatiques d’abord, le jugement ensuite** : on passe les validateurs avant de discuter de la clarté ou du recouvrement,
- **relire à sa source chaque fait volatil** (une version, une limite, un prix, un nom de modèle) avant de republier. Le guide de la plateforme demande de ne pas écrire d’information datée dans le corps, et de ranger l’historique dans une section « anciens motifs » [\[66\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skill-authoring-best-practices),
- **une revue à contexte neuf** avant toute publication ([chapitre 16](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch16)) : la personne ou l’agent qui relit reçoit l’objet, la liste de contrôle et les cas d’évaluation, pas la conversation de rédaction. N’installez que des skills de source sûre, et auditez les scripts, les dépendances et les appels réseau d’un skill moins sûr [\[146\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-equipping-agents-skills),
- **capitaliser au fil de l’usage** : l’éditeur conseille de demander à Claude d’inscrire dans le skill les approches qui ont réussi et les erreurs courantes [\[146\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-equipping-agents-skills). Une mise en garde garde la trace du cas réel qui l’a fait naître, sinon elle n’est qu’une opinion,
- **un renommage se cherche partout, avant et après, et se note au journal** [\[153\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-semver) [\[154\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-keep-a-changelog).

**La fraîcheur.** Des équipes de documentation attachent à chaque document la date de sa **dernière revue**, et un outil le signale passé un seuil d’environ trois mois [\[141\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-swe-book-documentation) [\[142\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hve-core-doc-maintenance). Dans l’une d’elles, le contrôle porte sur les seuls fichiers modifiés d’une demande de fusion, et un balayage de tout le dépôt revient chaque semaine. Un fichier encore exact se confirme en avançant sa date, qui dit la dernière revue et non le dernier changement [\[142\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hve-core-doc-maintenance). Chez une autre, chaque document a une personne propriétaire, et un document qui ne sert plus est retiré ou marqué obsolète [\[141\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-swe-book-documentation). Claude Code, lui, n’a aucun champ de date de revue : `metadata` est une table libre sur laquelle il n’agit pas [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills). Une date rangée là n’avertit donc personne par elle-même.

> **💡 Conseil**
>
> Donnez à chaque skill une date de revue, et faites-la lire par une étape que vous lancez, une commande nommée du projet ou la porte de commit, pas par Claude. Étalez les dates selon la volatilité : courte pour un skill qui cite une version, une limite ou un prix, longue pour une méthode stable. Les durées sont à calibrer sur votre usage. Une revue pose aussi la question « ce skill sert-il encore ? » : une capacité qu’un skill apportait peut devenir inutile quand le modèle progresse [\[155\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-improving-skill-creator).

Chez Passerelle, la vague est venue d’un changement de règle du Bureau des aides de Rivelune. Bernard en tire un déclencheur : à chaque changement de règle annoncé, le lexique et le skill passent en revue, quelle que soit leur date. Le journal le dit sous **Changed**.

Le renommage mérite cette prudence. À nom égal, un skill d’entreprise l’emporte sur un skill personnel, qui l’emporte sur un skill de projet. Les skills de plugin vivent dans un espace de noms [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills). Pour les agents, les réglages gérés l’emportent, puis la ligne de commande, le projet, la personne et les plugins [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sub-agents). Un renommage ne laisse donc pas de trace : l’ancien nom disparaît du menu, et un agent qui le préchargeait le perd sans bruit (inférence de ce guide). La dépréciation suit la règle publique : une version mineure l’annonce sous **Deprecated**, une version majeure retire sous **Removed** [\[153\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-semver) [\[154\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-keep-a-changelog).

### 21.12 Évaluer un skill, un agent ou une application à base de modèle

Un skill, un agent ou une application qui appelle un modèle ne se teste pas tout à fait comme un programme : la même entrée peut donner deux sorties. La [section 21.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-4) teste un skill avant de l’écrire. Cette section garde la mesure dans la durée, d’après l’article d’Anthropic sur l’évaluation des agents [\[95\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-demystifying-evals). Ce guide en tire six pratiques :

1. **Des cas réels, avec la réponse attendue, sous git.** Une suite d’évaluation est une liste de cas : une entrée, et ce qu’une bonne réponse doit contenir ou éviter. Vingt à cinquante tâches tirées d’échecs réels suffisent pour commencer [\[95\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-demystifying-evals). La suite vit sous git, à côté de ce qu’elle évalue.
2. **Un cas par incident.** Chaque défaut trouvé en usage devient un cas, la forme la plus solide d’une leçon ([section 16.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s16-5)). La suite grandit avec les erreurs réelles, pas avec l’imagination.
3. **Le déclenchement à part du résultat.** Les cas de déclenchement de la [section 21.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-4), des demandes reformulées et des demandes qui ne doivent rien déclencher, se rejouent en session neuve, à côté des cas de comportement [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills).
4. **Un [évaluateur à base de modèle](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-evaluateur-a-base-de-modele) se calibre, et ne sert jamais seul de porte.** Pour une réponse en texte libre, un autre modèle peut noter. Il se calibre d’abord sur des jugements humains [\[95\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-demystifying-evals). Ce guide propose de noter vous-même une vingtaine de réponses, de les faire noter par l’évaluateur, puis de comparer. Tant qu’il ne s’accorde pas avec vous, il relit, il ne bloque pas. Calibré, il bloque avec un contrôle déterministe ou une personne, jamais seul.
5. **Un seuil écrit qui bloque, avec pass^k.** Un seuil fixé à l’avance décide si la version passe. Pour livrer, chaque cas qui compte réussit k fois sur k essais ([section 14.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s14-3)) [\[95\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-demystifying-evals). Un cas qui ne réussit qu’une fois sur trois n’est pas acquis.
6. **Tracer en local pour comparer deux versions.** Pour chaque essai, gardez la trace : l’entrée, les appels d’outils, la sortie, la note. Lisez-en quelques-unes, pas seulement le score, car il faut lire les transcriptions pour savoir si les évaluateurs eux-mêmes fonctionnent [\[95\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-demystifying-evals). Deux versions se comparent sur les mêmes cas, trace contre trace.

Chez Passerelle, la suite compte vingt cas tirés des courriers fictifs de la vague. Pour le critère « le brouillon se comprend », un modèle note les brouillons. Odile note d’abord vingt brouillons elle-même, Thomas dit lesquels ne passent pas au lecteur d’écran, et Bernard compare leurs notes à celles de l’évaluateur. Tant que l’écart reste grand, l’évaluateur relit et signale, il ne bloque rien. Et la note d’un évaluateur ne remplace jamais la relecture d’Odile, qui décide de chaque brouillon.

Le prompt de Bernard, à recopier en l’adaptant :

```text
Construis une suite d'évaluation pour le skill brouillon-pour-relecture : vingt cas tirés des courriers fictifs PASS-C-031 à PASS-C-090, chacun avec l'entrée et ce que le brouillon doit contenir (chaque date, chaque montant, le délai en première phrase).
Lance chaque cas trois fois avec la version 1.0.0, puis trois fois avec la version 1.1.0. Garde les traces en local, dans evals/traces/.
Donne, pour chaque version, la part des cas réussis trois fois sur trois, et montre-moi les traces des cas qui ont changé.
```

> **⚠️ Attention**
>
> Une trace d’évaluation contient tout ce que contient le cas, et elle reste sur votre poste. Ne construisez une suite que sur des données inventées et marquées comme telles, jamais sur un vrai courrier ou une vraie donnée de client ou d’employeur ([chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23)).

**Ce qu’une évaluation ne prouve pas.** Un score qui monte peut venir d’un ajustement aux cas eux-mêmes : gardez des cas réservés, qui ne servent jamais à écrire ([section 21.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-4)). Ce guide propose aussi de recalibrer l’évaluateur quand son modèle change, comme on relit les consignes d’un agent ([section 15.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s15-4)).

**Tableau 21.11 :** La même évaluation à trois niveaux, proposée par ce guide d’après [\[95\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-demystifying-evals).

| Si vous… | Faites | Pourquoi |
| --- | --- | --- |
| débutez | cinq cas réels avec la réponse attendue écrite, rejoués à la main avant et après chaque changement, un premier pas sous les vingt à cinquante de la source | un premier écart se voit déjà |
| êtes à l’aise | une suite sous git, un cas par incident, des cas de déclenchement, un seuil écrit, et pass^k sur les cas qui comptent | une version ne passe que sur une mesure fixée d’avance |
| voulez aller plus loin | un évaluateur calibré sur vos propres notes, qui ne bloque qu’avec un contrôle déterministe ou une personne, des cas réservés, deux versions comparées trace contre trace | un score seul peut tromper, la trace se lit |

> **📏 La limite**
>
> Une évaluation prouve que l’objet réussit les cas de la suite, pas qu’il réussira ceux qu’elle ne contient pas.

### 21.13 Un portefeuille sauvegardé

Vos skills, vos agents et vos réglages valent des semaines de travail, et ils vivent dans des dossiers que rien ne sauvegarde par défaut. Les skills personnels vivent sous `~/.claude/skills/`, ceux d’un projet sous `.claude/skills/` [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills). Les agents suivent le même partage, sous `~/.claude/agents/` et `.claude/agents/` [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sub-agents). Les réglages sont dans `~/.claude/settings.json` et dans le dossier `.claude` du projet [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings). Ce guide propose une règle : une copie automatique, incrémentale, hors du poste, et dont la restauration a été essayée.

**Ce qui se sauvegarde.** Ce qui est sous git se sauvegarde le plus simplement par un paquet de tout l’historique, `git bundle create sauvegarde.bundle --all`, contrôlé par `git bundle verify`, qui vérifie que le paquet est valide et s’applique au dépôt [\[156\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-git-bundle). Le paquet ne garde que les références et leurs commits : ni l’index, ni l’arbre de travail, ni les anciens stashs, ni la configuration, ni les hooks [\[156\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-git-bundle). Le dernier stash, lui, est rangé dans la référence `refs/stash` [\[188\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-git-stash) : `--all` l’emporte, avec son contenu, même si la documentation de `git bundle` dit le paquet sans stash. Avant l’envoi, `git bundle list-heads sauvegarde.bundle` liste les références que le paquet emporte. Ce qui n’est pas sous git, comme vos réglages personnels, se copie en plus, fichier par fichier.

**Ce qui ne se sauvegarde pas avec le reste.** Vos identifiants de connexion sont enregistrés dans le trousseau chiffré de macOS, dans `~/.claude/.credentials.json` sous Linux, avec les droits `0600`, que seuls votre compte et les comptes d’administration de la machine peuvent lire ([section C.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-c-4)), et dans `%USERPROFILE%\.claude\.credentials.json` sous Windows [\[27\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-authentication). Les transcriptions de session, sous `~/.claude/projects/`, sont des données qui suivent la classification de ce qu’elles contiennent ([section 23.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-1)). Ni l’un ni les autres n’ont leur place dans une copie qui quitte le poste.

> **⚠️ Attention**
>
> Une copie qui quitte le poste emporte tout ce qu’elle contient. Excluez de la sauvegarde le fichier des identifiants et les transcriptions, chiffrez ce qui vous appartient en propre, et vérifiez d’abord que la destination vous est permise : sur un stockage fourni par une organisation, ce sont ses règles qui s’appliquent ([section 23.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-1)).

> **💡 Conseil**
>
> Planifiez la copie, par exemple chaque jour, et faites-la incrémentale : seuls les changements partent. Puis restaurez une fois par mois dans un dossier neuf, et lancez-y vos contrôles ([section 21.11](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-11)). Une sauvegarde jamais restaurée n’est qu’une promesse.

Chez Passerelle, Amadou tient le dossier, et c’est lui qui tient la sauvegarde. Chaque soir, un paquet du dépôt (le skill, l’agent, le hook, le lexique, la suite d’évaluation, les décisions) part vers le stockage de l’association. Aucun vrai courrier n’y est, puisqu’aucun n’entre dans le dépôt ([chapitre 11](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch11)), et Amadou vérifie par `git bundle list-heads` qu’aucun `refs/stash` n’y part. Le premier lundi du mois, il restaure le paquet dans un dossier neuf et lance la suite : elle passe, et il note la date dans le journal de l’association.

**Tableau 21.12 :** La sauvegarde à trois niveaux, proposée par ce guide.

| Si vous… | Faites | Pourquoi |
| --- | --- | --- |
| débutez | un paquet `git bundle` de votre dépôt de skills, vérifié par `git bundle verify`, copié à la main chaque semaine hors du poste | une copie vérifiée vaut mieux qu’aucune |
| êtes à l’aise | une copie planifiée et incrémentale, identifiants et transcriptions exclus, ce qui est à vous chiffré | rien ne repose sur la mémoire de la personne |
| voulez aller plus loin | une restauration mensuelle dans un dossier neuf, suivie de vos contrôles, et sa date notée | seule une restauration prouve la sauvegarde |

> **📏 La limite**
>
> Une sauvegarde protège de la perte, pas de l’erreur : une copie d’un skill cassé reste un skill cassé, et c’est la suite d’évaluation qui le dit ([section 21.12](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-12)).

> **📌 À retenir**
>
> Avant de relire la liste, répondez de mémoire, puis vérifiez votre réponse dans la section indiquée :
>
> 1. Combien d’endroits accueillent une exigence ou une décision, et comment la cite-t-on ailleurs ? ([section 21.9](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-9))
> 2. Quand une sauvegarde compte-t-elle, et à quel rythme ce guide propose-t-il de le vérifier ? ([section 21.13](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-13))
>
> - `CLAUDE.md` est du contexte, pas une configuration. Pour plusieurs outils, `AGENTS.md` porte le commun et `CLAUDE.md` l’importe.
> - Le code 1 n’arrête rien : une garde sort en 2 ou se déclare `onFailure: "block"`, et aucun contrôle indispensable ne repose sur un hook seul.
> - Chaque exigence et chaque décision vivent à un seul endroit, et se citent par identifiant, de la demande jusqu’au test, à la version et au journal.
> - Une version et une entrée de journal à chaque publication, une date de revue lue par une étape que vous lancez.
> - Une évaluation : des cas réels sous git, pass^k sur les cas qui comptent, un évaluateur à base de modèle qui ne bloque jamais seul.
> - Une sauvegarde ne compte qu’une fois restaurée.

> **✏️ Exercice**
>
> **Compétence visée** : relier un skill à une exigence, puis le versionner, l’évaluer et le sauvegarder (partie B). Comptez une séance d’environ une heure, sur le skill de l’exercice A.
>
> 1. Écrivez une exigence EARS que votre skill doit tenir, avec un identifiant, et le test qui la vérifie. Voyez ce test échouer, puis passer après la correction du skill.
> 2. Publiez le skill en 1.0.0 avec une entrée de journal datée, puis en 1.1.0 avec une entrée sous **Added** qui cite l’identifiant de l’exigence.
> 3. Écrivez cinq cas d’évaluation avec leur réponse attendue, rangés sous git, et rejouez chacun trois fois. Notez la part des cas réussis trois fois sur trois.
> 4. Faites un paquet `git bundle` du dépôt, vérifiez-le, puis restaurez-le dans un dossier neuf et rejouez-y vos cas.
>
> Si vous suivez Passerelle, l’exigence est celle de la [section 21.9](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-9), et les cas viennent des courriers fictifs de la vague. Aucun vrai courrier n’entre dans la suite.
>
> **Sans code** : à l’étape 1, écrivez l’exigence et, à la place du test, la liste de ce que vous vérifiez à la main dans le brouillon. Aux étapes 2 et 4, demandez à Claude le journal et les commandes `git bundle`, relisez-les et approuvez-les.
>
> **Critère de réussite** : une exigence avec son identifiant et un test vu rouge puis vert, deux entrées de journal datées, la part des cas réussis trois fois sur trois, et la sortie de `git bundle verify`, qui finit par « is okay », suivie de vos cas rejoués dans le dossier restauré. Par le chemin sans code, la même preuve, sauf le test : à sa place, la liste de vérifications de l’exigence, dont un point échoue sur le brouillon avant la correction du skill et passe après.
>
> **Pour vous corriger**, sans corrigé : relisez votre travail contre ces quatre points. Chacun se voit dans ce que vous avez écrit ou obtenu.
>
> 1. Votre exigence suit un gabarit EARS et porte un identifiant, et son test a été vu échouer avant la correction du skill, puis passer ([section 21.9](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-9)).
> 2. Chaque version a son entrée de journal, datée au format ISO, la plus récente en tête, et l’entrée de la 1.1.0, sous **Added**, cite l’identifiant de l’exigence au lieu de la récrire (sections [21.9](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-9) et [21.10](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-10)).
> 3. Vos cinq cas ont chacun leur réponse attendue et vivent sous git, et la part notée est celle des cas réussis trois fois sur trois ([section 21.12](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-12)).
> 4. Le paquet est vérifié, puis restauré dans un dossier neuf, et vos cas y ont été rejoués : une sauvegarde jamais restaurée n’est qu’une promesse ([section 21.13](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-13)).
>
> Par le chemin sans code, appliquez le premier point à votre liste de vérifications, qui tient la place du test, et les trois autres tels quels, sur le journal et les commandes que vous avez relus avant de les approuver.

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/#toc)

![Illustration : la personne en long manteau violet et son petit compagnon de cristal cyan, étudient le plan holographique d’un système, ses modules et ses liens lumineux, au-dessus d’une table.](https://gmag-dev.github.io/bien-demarrer-claude-code/images/b9bc6045f4ce.avif)
