> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.2.2 : « Annexe G. Grille d’auto-évaluation ».
>
> - Précédent : [Annexe F. Grille de relecture experte](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-f-grille-de-relecture-experte.md)
> - Suivant : [Annexe H. Les exemples de code, pièces de Passerelle](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-h-les-exemples-de-code-pieces-de-passerelle.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-ann-g>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## Annexe G. Grille d’auto-évaluation

Cette grille sert à se situer, seule ou en groupe, sur les pratiques de la Partie II, et sur celles de la Partie I ([section G.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-g-7)). C’est une conception de ce guide : elle ne vient d’aucune norme, et elle s’appuie sur les sources citées dans les chapitres qu’elle nomme.

### G.1 Le mode d’emploi

Chaque pratique a quatre niveaux observables, de 0 à 3. Pour revendiquer un niveau, il faut pouvoir montrer une preuve : un fichier, une sortie de commande, un réglage, un journal. On retient le plus haut niveau dont toutes les conditions sont prouvées.

Les niveaux ont toujours le même sens :

- **0, absent** : la pratique n’existe pas,
- **1, dit** : la pratique est connue, ou écrite,
- **2, appliqué** : elle est faite, et on peut le montrer,
- **3, vérifié par un contrôle** : un mécanisme la vérifie, sans dépendre de la mémoire de quiconque.

Le niveau 3 n’est pas un idéal pour tout le monde : sur un petit projet, le niveau 2 peut être le bon. Refaites la grille à date fixe, par exemple chaque trimestre, et gardez chaque note datée. La dernière colonne de chaque tableau donne la question à se poser.

Chez Passerelle 🌉, Bernard se note à 2 sur la pratique A9 : après le brouillon qui avait perdu un délai écrit en toutes lettres, il a livré la correction de l’instance et celle de la classe ([chapitre 16](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch16)). Il passera à 3 quand le cas de test de ces délais tournera dans la porte de commit ([sections E.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-e-3) et E.7).

### G.2 La pratique agentique

**Tableau :** La grille, partie A, la pratique agentique (chapitres [14](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch14) à [16](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch16)). Proposée par ce guide.

| Pratique | 0 : absent | 1 : dit | 2 : appliqué | 3 : vérifié par un contrôle | La question à se poser |
| --- | --- | --- | --- | --- | --- |
| A1. Le modèle propose, l’oracle vérifie, la personne tranche | le modèle juge seul son travail | le principe est écrit | chaque livraison passe un oracle déterministe avant la personne | l’oracle tourne à chaque commit, un échec bloque | qu’est-ce qui, chez moi, dit « non » sans jugement ? |
| A2. Tâches longues : l’état vit dans des fichiers | l’état est dans la conversation | des notes existent | un fichier de progression, une liste de fonctionnalités à état, un script de démarrage | une session reprise à froid depuis les seuls fichiers a réussi, et c’est consigné | si je ferme tout maintenant, que perd-on ? |
| A3. Spécification testable | pas de spécification | une spécification en prose | des exigences à gabarit, EARS ou équivalent, chacune avec un identifiant | un contrôle vérifie qu’aucune exigence marquée « vérifié » n’est sans test lié | laquelle de mes exigences ne peut pas devenir un test ? |
| A4. Évaluations de régression | aucune | des tests manuels | une suite rejouée avant chaque livraison | chaque incident corrigé ajoute un cas, et chaque test a été vu échouer sur une faute plantée | mon dernier incident a-t-il laissé un test ? |
| A5. Évaluations du comportement des consignes | aucune | on relit les skills | des scénarios avec et sans la consigne, en session neuve | des cas « doit déclencher » et « ne doit pas », les réussites sur plusieurs essais suivies dans le temps | sais-je ce que mon skill change, et pas seulement à quoi il ressemble ? |
| A6. Brief de sous-agent | une phrase | l’objectif et le format | un brief écrit, qui dit le rendu, les limites et la preuve attendue ([section 15.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s15-2)) | un rapport sans preuve est noté « non vérifié » et ne sert pas, et c’est déjà arrivé | mon sous-agent sait-il quand s’arrêter, et comment prouver son résultat ? |
| A7. Paralléliser avec mesure | on lance au jugé | un conseil écrit | un test à quatre conditions : fichiers écrits disjoints, indépendance, critère de fin, budget | le coût de chaque éventail est mesuré et comparé à une session seule | ce parallélisme est-il réel, ou partage-t-il tout le contexte ? |
| A8. Revue qui cherche à réfuter | pas de revue | une relecture par l’autrice | un relecteur à contexte neuf, en lecture seule par ses outils | des constats classés et situés, une réponse de l’autrice à chacun, les refus motivés ([section E.8](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-e-8)) | mon relecteur a-t-il lu ma conclusion avant mes artefacts ? |
| A9. Cause racine, instance et classe | on corrige l’instance | la classe est discutée | les deux corrections sont livrées | la correction de classe est portée par un oracle : un test, une porte, une règle | quel contrôle aurait arrêté ce défaut ? |
| A10. Capitaliser les leçons | les leçons restent dans la conversation | une ligne de consignes | une leçon qui se répète reçoit un mécanisme plus solide | le nombre de règles en prose est suivi, et les règles sans exception deviennent des contrôles | combien de mes règles écrites sont des préférences ? |

### G.3 Le harnais

**Tableau :** La grille, partie B, le harnais (chapitres [17](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch17) à [19](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch19)). Proposée par ce guide.

| Pratique | 0 : absent | 1 : dit | 2 : appliqué | 3 : vérifié par un contrôle | La question à se poser |
| --- | --- | --- | --- | --- | --- |
| B1. Couches de réglages connues | on ne sait pas quels réglages s’appliquent | on connaît les couches | on lit les sources chargées après chaque changement | un relevé daté des réglages est comparé à chaque démarrage | quelle couche a écrit ce réglage ? |
| B2. Défense par la structure | seulement des règles par motif | on sait qu’un motif se contourne | des capacités retirées : outils des agents en liste blanche, dossiers de travail, aucun secret sur le poste, pas de dépôt distant quand c’est possible | le contournement d’un motif a été essayé dans un environnement jetable, et la structure a tenu | si le modèle était détourné, que pourrait-il encore faire ? |
| B3. Liste `ask` pour les gestes destructifs | aucune | quelques règles | les gestes destructifs et sortants demandent | la liste est revue à chaque changement de poste ou de mode | quel geste destructif passerait aujourd’hui sans demande ? |
| B4. Hooks | des fonctions dépendent d’un hook qu’on n’a jamais vu tourner | on sait quels hooks tournent (`/hooks`) | chaque hook a sa dernière porte hors de la session | chaque porte déclarée a été vue s’exécuter, et les portes absentes sont écrites | mes portes s’exécutent-elles vraiment ? |
| B5. Serveurs MCP au moindre privilège | n’importe quel serveur, n’importe où | des serveurs locaux | écoute sur la boucle locale ou en entrée standard, outils minimaux | jeton en HTTP, sortie plafonnée, provenance vérifiée | qui d’autre peut parler à mon serveur local ? |
| B6. Tâches planifiées | créées au jugé | on connaît le décalage et l’expiration | on lit l’heure du prochain lancement dans la session qui possède la tâche | après une reprise, on liste, puis on ne recrée que le manquant, et un créneau manqué est détecté | combien de mes tâches tournent en double ? |
| B7. Sessions parallèles | les sessions s’écrasent | une convention orale | une trace durable, des réservations, le commit par chemins nommés, la relecture avant écriture | un contrôle automatique vérifie les règles de coordination | qui tient ce fichier en ce moment, et comment le sais-je ? |
| B8. Un seul écrivain des consignes partagées | tout le monde écrit | un titulaire désigné | les autres proposent, et un remplacement est annoncé | un contrôle automatique vérifie qui écrit | qui a écrit ce skill, et avec quelle décision ? |
| B9. Portes de commit | aucune | un hook partiel | secrets, spécification et tests à chaque commit ([section E.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-e-7)) | les portes sont mesurées, ce qu’elles vérifient vraiment, et leur contournement est interdit et surveillé | que laisse passer ma porte qui porte le nom « secrets » ? |
| B10. Geste humain avant l’irréversible | l’agent pousse et envoie | une règle écrite | push et dépôt distant refusés : l’agent prépare, la personne exécute | chaque acte irréversible arrive sous forme d’un geste décrit, avec sa réversibilité | quel acte irréversible un agent peut-il encore faire seul ? |

> **💡 Conseil**
>
> Là où vos hooks de Claude Code sont éteints, doublez chaque contrôle d’une étape qui ne dépend pas d’eux : la porte de commit, une commande nommée, un script lancé à la main. C’est le même contrôle, par une étape permise.

### G.4 Le pilotage

**Tableau :** La grille, partie C, le pilotage ([chapitre 20](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch20)). Proposée par ce guide.

| Pratique | 0 : absent | 1 : dit | 2 : appliqué | 3 : vérifié par un contrôle | La question à se poser |
| --- | --- | --- | --- | --- | --- |
| C1. Lire son forfait | on découvre la limite en la touchant | on lit l’usage de temps en temps | un journal des lectures, une allure et un écart calculés | un niveau d’alerte, lu avant chaque lot lourd par chaque session et chaque sous-agent | où en suis-je par rapport au rythme prévu, sur la fenêtre et sur la semaine ? |
| C2. Répartir le forfait | chacun consomme | un conseil de modération | une part par session ou par lot | les parts sont suivies, et une session qui atteint sa part s’arrête | qui consomme ma semaine ? |
| C3. Protéger la qualité | on abrège quand le forfait se tend | la règle « pas d’économie sur les contrôles » est écrite | on retarde et on réduit le parallélisme, jamais la profondeur des contrôles | un audit vérifie qu’aucune revue n’a été abrégée sous contrainte | qu’ai-je sacrifié la dernière fois que le forfait s’est tendu ? |
| C4. Décisions en attente | elles vivent dans le fil des messages | une liste à la main | une fiche par décision, options et recommandation écrites ([section 20.8](https://gmag-dev.github.io/bien-demarrer-claude-code/#s20-8)) | chaque fiche cite la source de ses options, et rien de ce qui attend la personne n’est oublié | quelle décision attend depuis le plus longtemps, et pourquoi ? |
| C5. Questions à la personne | chaque session pose les siennes | on évite les doublons | les questions sont rassemblées à un seul endroit, chacune avec une recommandation | aucune question dont la réponse est dans les fichiers, et chaque réponse est notée avec sa date | ai-je déjà posé cette question, ou une autre session ? |
| C6. Point de situation | de mémoire | un résumé | un état écrit, aux nombres mesurés | chaque nombre porte sa source et l’heure de sa lecture | d’où vient chaque nombre de mon point ? |

### G.5 Sécurité et propriété intellectuelle

**Tableau :** La grille, partie D, la sécurité et la propriété intellectuelle ([chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23)). Proposée par ce guide.

| Pratique | 0 : absent | 1 : dit | 2 : appliqué | 3 : vérifié par un contrôle | La question à se poser |
| --- | --- | --- | --- | --- | --- |
| D1. Frontières des données | tout est au même endroit | la frontière est écrite | rien de ce qui appartient à une organisation n’entre dans un outillage personnel | un contrôle refuse par défaut ce qui franchit la frontière | qu’y a-t-il d’une organisation dans mon outillage personnel ? |
| D2. Données synthétiques | des données réelles dans le dépôt | une règle écrite | ce qui est commité est synthétique, et le réel reste hors du dépôt, atteint par une variable | un analyseur de secrets et une liste de refus tournent au commit | que verrait une personne qui lit mon historique ? |
| D3. Règle de deux | on n’y pense pas | elle est connue | chaque agent nomme les propriétés de la triade qu’il réunit | aucun agent ne réunit les trois sans porte humaine, et c’est vérifié sur les définitions | lequel de mes agents lit du web, touche du sensible et écrit ? |
| D4. Hors ligne et télémétrie | réglages par défaut | la règle est écrite | les variables de coupure sont posées, et leur prix est connu | une mesure confirme ce qui sort encore | ma configuration dit-elle ce que dit ma règle ? |
| D5. Contrôle avant envoi | on relit à l’œil | une liste de termes | un contrôle en lecture seule passe sur chaque brouillon avant envoi | le rapport du contrôle ne recopie pas ce qu’il trouve, et l’envoi reste un geste humain | mon dernier message est-il passé par le contrôle avant envoi ? |
| D6. Transcriptions locales | on les ignore | on sait qu’elles sont en clair | une durée de conservation choisie, pas de lecture croisée entre projets | leur classement suit leur contenu, et c’est vérifié | où sont mes transcriptions, et qui peut les lire ? |

### G.6 La progression, seule ou en groupe

**Tableau :** La grille, partie E, la progression. Proposée par ce guide.

| Pratique | 0 : absent | 1 : dit | 2 : appliqué | 3 : vérifié par un contrôle | La question à se poser |
| --- | --- | --- | --- | --- | --- |
| E1. Se situer | aucune grille | on connaît les niveaux | on se note à date fixe | la note est comparée à celle de pairs, et l’écart produit des actions | à quel niveau suis-je, preuve à l’appui ? |
| E2. Les règles et leurs limites | des règles sans raison | des règles avec leur raison | chaque règle dit où elle cède et ce qu’elle suppose du poste ([annexe F](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-f)) | chaque règle propre à un poste cite la mesure datée qui la fonde, relue avant de republier | dans quelle situation ma règle préférée devient-elle fausse ? |

**En groupe.** Chaque personne remplit la grille avec ses preuves. On rassemble les niveaux par pratique, sans classer les personnes. Une pratique où la plupart sont à 0 ou à 1 devient un sujet d’atelier. Une pratique où quelqu’un est à 3 devient une démonstration, faite par cette personne. On refait l’exercice au cycle suivant, et l’on compare les notes datées.

### G.7 Les pratiques de la Partie I

Cette partie de la grille porte sur les gestes de la Partie I, sur la même échelle de 0 à 3. Elle ajoute une colonne, ce que vérifie une tierce personne, parce qu’une note qu’on se donne seule reste une déclaration : la tierce personne refait une vérification courte sur la preuve montrée, au lieu de croire la note sur parole.

**Tableau :** La grille, partie F, les pratiques de la Partie I (chapitres [1](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch1) à [13](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch13)). Proposée par ce guide.

| Pratique | 0 : absent | 1 : dit | 2 : appliqué | 3 : vérifié par un contrôle | Ce que vérifie une tierce personne | La question à se poser |
| --- | --- | --- | --- | --- | --- | --- |
| F1. Le mode Manual pour travailler ([chapitre 2](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch2)) | on ne sait pas dans quel mode tourne la session | on connaît les modes | chaque session de travail se lance en mode Manual, et chaque demande est lue avant d’être acceptée | le mode est écrit dans les réglages du projet, et une session ouverte à froid démarre en mode Manual | elle ouvre une session dans le dossier et voit Claude demander l’accord avant la première modification | qui a accepté la dernière modification : moi, ou un réglage ? |
| F2. Un `CLAUDE.md` court ([section 2.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-2)) | aucun `CLAUDE.md`, ou un fichier que personne ne relit | un `CLAUDE.md` existe | moins de vingt lignes, chacune justifiée par le test du [chapitre 2](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch2) | la porte de commit refuse un `CLAUDE.md` qui dépasse la longueur fixée | elle voit le fichier chargé dans la sortie de `/context`, compte ses lignes, et demande la raison d’une ligne prise au hasard | quelle ligne de mon `CLAUDE.md` Claude devinerait-il en lisant le projet ? |
| F3. La fenêtre de contexte tenue ([section 3.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s3-2)) | une seule conversation, jusqu’à la compaction automatique | on connaît `/clear` et `/compact` | `/context` est relevé, et une note de passation datée précède chaque `/compact` ou `/clear` | une session reprise à froid depuis la seule note a réussi, et c’est consigné | elle trouve la note de passation dans le dépôt, datée à l’heure, et la compare au résumé de la compaction | si la fenêtre se compacte maintenant, que perd-on ? |
| F4. Le plan corrigé avant le code ([section 4.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s4-2)) | Claude code sans plan | on demande un plan | le plan initial est gardé, l’étape corrigée notée, et chaque étape cherchée dans le résultat | le travail commence en mode plan, qui bloque les modifications jusqu’à l’approbation du plan | elle lit le plan initial et le plan corrigé côte à côte, retrouve l’étape corrigée, et cherche une étape du plan dans le résultat | quelle étape de mon dernier plan ai-je corrigée, et pourquoi ? |
| F5. Un test vu en échec ([section 5.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s5-2)) | « vérifié » sur la seule parole de Claude | on demande des tests | chaque correction a une sortie d’échec avant et une sortie de succès après | la suite tourne dans la porte de commit, et chaque test a été vu échouer sur une faute plantée | elle rejoue le test sur le commit précédent et le voit échouer, puis passer sur le commit de la correction. Sans code, elle rejoue la même comparaison | ai-je vu échouer l’oracle qui me rassure ? |
| F6. Une règle deny pour ce qui ne doit pas changer ([chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch10)) | tout passe par l’accord au cas par cas | on sait qu’une règle deny s’applique quoi que décide le modèle | les fichiers à protéger ont leur règle deny, et un refus a été constaté avec son message | un contrôle vérifie, à chaque commit, que les règles deny attendues sont toujours dans les réglages | elle voit la règle parmi les refus de `/permissions`, demande l’écriture visée, voit le refus et son message, puis le fichier inchangé | quel fichier Claude pourrait-il modifier aujourd’hui sans que je l’aie voulu ? |
| F7. Un commit relu ([chapitre 11](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch11)) | des commits que personne n’a relus | on relit quand on y pense | chaque diff est relu par `git diff --staged`, et le message décrit exactement le diff | la porte de commit lance les contrôles, et aucun hook n’est contourné | `git log -1 --stat` ne nomme que les fichiers que le message annonce | mon dernier message de commit décrit-il tout le diff, et rien d’autre ? |

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/#toc)
