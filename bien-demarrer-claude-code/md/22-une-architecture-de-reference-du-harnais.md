> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.2.1 : « 22. Une architecture de référence du harnais ».
>
> - Précédent : [21. Écrire des skills, des agents et des artefacts (partie 3 sur 3)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/21-ecrire-des-skills-des-agents-et-des-artefacts-3.md)
> - Suivant : [23. Sécurité et propriété intellectuelle en entreprise (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/23-securite-et-propriete-intellectuelle-en-entreprise-1.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-ch22>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## 22. Une architecture de référence du harnais

> **🪪 Ce chapitre**
>
> **Pour qui** : la personne qui travaille avec plusieurs projets, plusieurs sessions et quelques agents, et qui veut une architecture qu’elle peut justifier agent par agent.
>
> **Sur quel poste** : tout poste où Claude Code tourne. Les hooks et le bac à sable dépendent du système et des réglages : la [section 22.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s22-4) dit comment adapter. État décrit : la documentation de Claude Code 2.1.319 [\[1\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-changelog).
>
> **Ce que vous apprenez** : concevoir votre architecture en posant trois questions à chaque agent : que lit-il, que peut-il changer, qui agit sur son rapport.
>
> **Deux chemins** : si un encadré « Quand la règle cède » vous a envoyée ici, lisez la section qu’il cite, puis revenez à votre chapitre. Sinon, lisez le chapitre dans l’ordre, puis faites l’exercice. Les sections à lire d’abord, si vous travaillez sur un seul projet : 22.2 et 22.4.
>
> **Le fil rouge** 🌉 Passerelle : Bernard passe chaque agent de Passerelle aux trois questions, et en trouve un qui en fait trop. Inès cherche dans le lexique et les courriers types, sans index d’abord. 🏛️ Le Cahier commun : Mei fait regrouper les 400 contributions par thème, par des agents qui ne peuvent rien envoyer, et ne construit un graphe des thèmes que si la recherche simple échoue.
>
> **Où en est Passerelle** : en arrivant, le skill, l’agent de relecture, l’exigence et la sauvegarde du [chapitre 21](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch21). À la fin du chapitre, chaque agent de Passerelle a ses trois réponses écrites, et l’agent qui lisait à la fois le web et les courriers est coupé en deux. Le Cahier commun a sa recherche par thème, mesurée sur trente questions.

Les chapitres [14](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch14) à [21](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch21) ont décrit des pièces : des sessions, des sous-agents, des skills, des réglages, des hooks, des portes. Les assembler pose une question que chaque pièce, seule, laisse ouverte : qui peut faire quoi, avec quelles données, et qui en répond. Ce chapitre propose une **architecture de référence**. C’est une architecture proposée par ce guide, et non une prescription d’Anthropic : aucune source publique ne la décrit telle quelle. Elle rassemble des principes sourcés, le moindre privilège, le contexte neuf d’un sous-agent, le rapport traité comme une donnée, l’écrivain unique, la réservation à durée limitée. Plutôt qu’un inventaire d’agents à recopier, elle donne une méthode, que vous appliquerez à vos propres agents. Les combinaisons de composants elles-mêmes, un skill qui lance des sous-agents ou un hook qui agit par un outil MCP par exemple, sont rassemblées avec leur effet et leur limite dans la [section L.19](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-19).

### 22.1 Une vue d’ensemble, à adapter

En une phrase : le modèle propose, un contrôle vérifie, et la personne tranche.

L’architecture repose sur un partage des rôles posé par la recherche sur la planification avec des modèles de langage : le modèle propose, et des vérificateurs externes contrôlent ses propositions [\[93\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-llm-modulo). Ce guide y ajoute la personne, qui tranche ce qu’aucun contrôle ne peut trancher, et qui garde les gestes qu’on ne défait pas.

*Dessin : Une architecture de référence du harnais, proposée par ce guide. Schéma : la description suit.*

**Figure 22.1 :** Une architecture de référence du harnais. La personne garde les gestes, en tirets. Les sessions briefent des agents, dont les rapports reviennent comme des données. Tout tourne dans le harnais, en bleu, et passe des portes avant de sortir, en ambre. Conception de ce guide, appuyée sur [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sub-agents), [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings), [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permissions), [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks), [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing), [\[112\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-cross-session-messaging), [\[136\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-kleppmann-locking) et [\[137\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-single-writer).

La même architecture, en texte :

1. La personne est en haut : elle seule décide, pousse, publie, envoie et redémarre. Elle écrit ses décisions.
2. La session de coordination lit ces décisions et tient à jour, seule, les fichiers communs : skills, agents, réglages [\[137\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-single-writer).
3. Les sessions de travail, une par projet ou par lot, se coordonnent par une couche commune : la messagerie native entre sessions pour l’immédiat [\[112\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-cross-session-messaging), un tableau durable d’un fichier par message pour la trace, et des réservations à échéance pour les ressources partagées [\[136\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-kleppmann-locking).
4. Chaque session briefe des agents, et leurs rapports reviennent comme des données à vérifier. Sessions et agents chargent des skills, où vit la connaissance.
5. Toutes les sessions et tous les agents tournent dans le [harnais](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-harnais) : des réglages en couches [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings), des permissions évaluées dans l’ordre refus, demande, autorisation [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permissions), des hooks si la politique les permet [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks), un bac à sable si le système l’offre [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing).
6. Avant de sortir, le travail passe des portes : le commit, puis un contrôle avant tout envoi ([section 23.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-7)). Ce qui reste à faire revient à la personne sous la forme d’un bloc de geste.
7. Le pilotage lit l’usage et les décisions, et produit la liste de ce qui attend la personne ([chapitre 20](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch20)).

Trois idées portent l’ensemble. **Les gestes irréversibles restent humains** : pousser, publier, envoyer, redémarrer ([chapitre 11](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch11) et [section 19.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s19-7)). **Un rôle, un contrat** : chaque agent a un rôle, des outils au moindre privilège, et trois réponses écrites ([section 22.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s22-2)). **Une donnée n’est pas un ordre** : un rapport d’agent ou un message d’une autre session se vérifie avant de servir, et ne vaut jamais consentement [\[112\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-cross-session-messaging).

Chez Passerelle, la personne qui garde les gestes n’est pas toujours la même : Amadou pousse et sauvegarde, Samia tranche les règles, Odile décide de chaque brouillon. L’architecture le dit en écrivant, pour chaque geste, qui le fait.

> **🔀 Quand la règle cède**
>
> - Pour un seul projet et une seule session, la couche de coordination n’a rien à coordonner, et la tenir coûte plus qu’elle ne rapporte.
> - Ce qui tient : les trois idées, qui valent dès un seul agent.
> - Pour aller plus loin : [section 22.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s22-4), qui dit comment réduire, et [section 19.9](https://gmag-dev.github.io/bien-demarrer-claude-code/#s19-9), qui pèse ce que coûte une session de coordination.

### 22.2 Trois questions par agent

La règle : avant d’écrire un agent, et avant d’en garder un, écrivez trois réponses.

1. **Que lit-il ?** Des données privées : le dépôt, un dossier de pièces, un serveur branché sur des données internes ? Un contenu non fiable : un document d’origine non maîtrisée, une page web, un courrier venu d’un tiers, la réponse d’un serveur ?
2. **Que peut-il changer ?** Des fichiers, un état, un système ? Peut-il communiquer vers l’extérieur, par le web, un serveur qui sort, ou un autre agent qu’il lancerait ? La réponse se lit dans son champ `tools`, pas dans son brief.
3. **Qui agit sur son rapport ?** La session qui l’a lancé, qui relit une preuve avant de s’en servir ? La personne, qui tranche ? Un autre agent, qui l’exécuterait sans relecture ?

Pourquoi ces trois questions : les deux premières sont exactement les trois propriétés de la [règle de deux](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-regle-de-deux), que la [section 10.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-3) définit, que la [section 23.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-4) applique, et que ce chapitre ne redit pas. La troisième dit où se tient la porte humaine. Un agent qui réunit les trois propriétés sans porte humaine est un défaut d’architecture, quel que soit le soin de son brief.

Comment y répondre. La deuxième réponse se lit dans la liste `tools` : ce qui n’y est pas listé est retiré de la définition de l’agent, et le harnais l’applique, pas un prompt [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sub-agents). C’est la parade directe à l’agentivité excessive que décrit l’OWASP [\[78\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-owasp-excessive-agency). Écrivez chaque réponse avec sa force : [par construction](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-par-construction) quand le harnais l’applique, [par consigne](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-par-consigne) quand seul un texte la pose. Un champ `tools` qui ne liste que les outils voulus coupe une propriété par construction, quand aucun outil restant ne la porte. Une phrase du brief, comme « ne lis que ce dossier », ne la coupe que par consigne ([section 23.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-4)).

Trois règles en découlent :

- **Un agent, un rôle.** Jamais un agent qui cumule deux rôles aux frontières opposées : produire et auditer, ou coordonner et construire. Un agent qui relit n’a que des outils de lecture, et ne peut donc pas « corriger en passant ».
- **Trois propriétés réunies : couper, ou superviser.** Si les réponses 1 et 2 réunissent les trois propriétés, coupez l’agent en deux, ou gardez le travail dans une session supervisée, en mode Manual ([section 23.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-4)).
- **Personne n’agit sur le rapport : l’agent ne sert à rien, ou une porte manque.** Un rapport que personne ne relit est soit inutile, soit dangereux.

Chez Passerelle, Bernard passe les agents aux trois questions. La première version de l’agent du lexique cherchait sur le web la définition d’un mot administratif, et lisait aussi les courriers pour vérifier le contexte : un contenu non fiable, des données du dossier, et une sortie, puisqu’une adresse web peut emporter ce qu’il a lu. Bernard le coupe en deux, et range la moitié web dans un projet à part, sans données, puisque les réglages de Passerelle refusent les outils web ([chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch10)). Le tableau qui suit est l’application de la méthode, pas une liste d’agents à recopier.

**Tableau 22.1 :** Les trois questions appliquées aux agents de Passerelle et du Cahier commun, proposées par ce guide.

| Agent | Que lit-il ? | Que peut-il changer ? | Qui agit sur son rapport ? | Ce qui tient |
| --- | --- | --- | --- | --- |
| rédaction d’un brouillon, une fille (un sous-agent que lance une session hôte) | le courrier fictif, contenu non fiable, et le lexique, donnée du dossier | rien : `tools: Read, Grep, Glob`. Le brouillon revient dans son rapport | la session de rédaction, en mode Manual, écrit le fichier après lecture, puis Odile tranche | deux propriétés sur trois, par construction |
| relecture des brouillons | le brouillon et son courrier | rien : `tools: Read, Grep, Glob` | Bernard corrige, Odile tranche | deux propriétés sur trois, par construction |
| recherche web du lexique, dans un projet à part | le web, contenu non fiable, et les seuls mots à définir qu’Inès lui donne | aucun fichier : `tools: WebSearch, WebFetch`. Le web lui sert aussi de sortie | Inès relit les définitions, Samia décide de ce qui entre au lexique, Odile relit la phrase avant qu’elle y entre, et la session de Bernard l’écrit | aucune lecture de fichier par construction, et aucune donnée de Passerelle dans le projet à part. Les mots qu’il reçoit sont non confidentiels par consigne, relus avant envoi |
| un agent par thème du Cahier commun | les contributions `CAH-001` à `CAH-400`, écrites par des habitantes et des habitants, donc non fiables, et parfois porteuses d’un nom | rien : `tools: Read, Grep, Glob`. Sa synthèse cite les contributions par identifiant | la session de Mei vérifie chaque citation, puis les habitants relisent avant le conseil | deux propriétés sur trois, par construction |

Le motif de la première ligne revient souvent : la fille lit et propose, et la session où travaille la personne écrit. C’est aussi celui du chercheur web : un agent dont le champ `tools` ne liste que `WebSearch` et `WebFetch`, lancé par une session en mode Manual, dans un projet à part qui ne contient aucune donnée, et qui ne reçoit que des extraits non confidentiels, relus avant envoi. Une session ordinaire ouverte dans ce projet ne suffirait pas : elle garderait la lecture et le shell sur tout le poste ([section 10.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-3)). Son rapport est un contenu non fiable \[A\]. Il n’entre au lexique de Passerelle qu’après la relecture d’Inès, la décision de Samia et la relecture de la phrase par Odile.

> **🔀 Quand la règle cède**
>
> - La règle cède quand un travail demande les trois propriétés et qu’aucun outil ne peut être retiré.
> - Ce qui tient : la session supervisée que propose ce guide, en mode Manual, où la personne valide chaque commande à risque, avec ses limites. Le mode auto n’en est pas une.
> - Pour aller plus loin : [section 23.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-4).

### 22.3 Les rôles de session

Un rôle de session n’est **pas** un agent : c’est une session longue, ouverte dans un onglet, avec sa responsabilité. Un sous-agent naît d’un brief et rend un rapport. Une session vit des heures, reçoit des messages et parle à la personne. La messagerie entre sessions sert justement à transmettre un constat, à dire ce qui a atterri ou à rendre compte d’un travail long [\[112\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-cross-session-messaging). Les trois questions valent aussi pour une session : ce qu’elle lit, ce qu’elle peut changer, et qui agit sur ce qu’elle produit.

### 22.4 Adapter l’architecture à son poste, ou s’en passer

L’architecture est une carte, pas un plan de construction. Ce guide propose de l’adapter en quatre questions :

- **Quels agents vous servent vraiment ?** Commencez par deux : un chercheur web dont le champ `tools` ne liste que `WebSearch` et `WebFetch`, lancé par une session en mode Manual dans un projet à part sans vos données ([section 10.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-3)), et un agent de relecture en lecture seule. Ajoutez un agent quand une tâche revient et que ses trois réponses sont claires ([chapitre 6](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch6)).
- **Vos hooks tournent-ils ?** `/hooks` liste ceux que Claude Code a pris en compte [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks). Chaque porte de l’architecture qui repose sur un hook doit y figurer.
- **Votre système offre-t-il le bac à sable ?** S’il ne l’offre pas, la défense repose sur les permissions et sur la structure : les outils retirés aux agents, et l’absence de secret sur le poste [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing) [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permissions).
- **Combien de sessions faites-vous tourner ?** Avec une seule, la couche de coordination disparaît. Dès deux sessions sur un même dépôt, il faut des fichiers disjoints, des commits par chemins explicites, et un seul écrivain des consignes partagées [\[68\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-worktrees) [\[137\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-single-writer).

> **💡 Conseil**
>
> Là où les réglages de votre organisation n’autorisent que ses propres hooks, remplacez chaque porte de l’architecture par une étape explicite, une commande nommée de votre gestionnaire de tâches ou un hook git, et écrivez quelles portes sont absentes. C’est le même contrôle, par une étape permise.

**Quand ne pas l’adopter.** Une architecture à plusieurs sessions coûte : des messages à lire, des réservations à tenir, une session de coordination qui travaille pour les autres. Pour un projet seul, mené par une personne dans une session, elle n’apporte rien que les trois idées de la [section 22.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s22-1) n’apportent déjà. La [section 19.9](https://gmag-dev.github.io/bien-demarrer-claude-code/#s19-9) en donne les coûts et les risques. Passerelle, la plupart des semaines, tourne avec une session et deux agents. La couche de coordination n’a servi que pendant la vague.

**Tableau 22.3 :** L’architecture à trois niveaux, proposée par ce guide.

| Si vous… | Faites | Pourquoi |
| --- | --- | --- |
| travaillez sur un projet, dans une session | deux agents, chacun avec ses trois réponses écrites, et rien d’autre | les trois idées valent dès un agent |
| menez deux sessions sur un dépôt | des fichiers disjoints, des commits par chemins explicites, un seul écrivain des consignes | deux écrivains d’un même fichier se perdent l’un l’autre |
| menez plusieurs projets et plusieurs sessions | la couche de coordination entière, une session de relecture, un pilotage qui dit ce qui attend la personne | ce qui se coordonne de tête ne passe plus l’échelle |

> **📏 La limite**
>
> Une architecture se juge à ce qu’elle empêche, pas à son schéma : tant qu’un agent n’a pas ses trois réponses écrites, il n’est pas dans l’architecture. La grille de l’[annexe G](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-g) aide à situer chaque pratique, preuve à l’appui.

### 22.5 Donner à Claude le contexte d’un projet : recherche, RAG et graphes

Pour qu’une session connaisse un projet, la première réponse n’est pas un index. Claude Code cherche lui-même dans les fichiers, avec Grep, Glob et Read, sans base vectorielle. Anthropic explique qu’un index construit d’avance reflète le code tel qu’il était, alors que la recherche lit le code tel qu’il est [\[157\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-large-codebases). Pour du code et des notes en Markdown, c’est le bon point de départ.

Un index se justifie là où cette recherche échoue : des documents que Grep lit mal (DOCX, PDF, diapositives), des comptes rendus où la même idée revient sous d’autres mots, un mélange de français et d’anglais, ou des questions qui relient beaucoup de documents. C’est le [RAG](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-rag) : on retrouve d’abord les passages utiles, puis le modèle répond à partir d’eux, en les citant.

Ce guide propose de décider par la mesure, en quatre marches. On ne monte d’une marche que si la précédente échoue sur des questions réelles :

1. La recherche agentique seule (Grep, Glob, Read), avec un `CLAUDE.md` qui dit où sont les documents.
2. Un miroir en Markdown des documents que Grep lit mal : un convertisseur local les transforme une fois, et la recherche agentique reprend la main. Le portage en Rust de Docling lit le DOCX, le HTML et le Markdown sans accès au réseau, mais le PDF lui demande encore un modèle d’analyse de la mise en page [\[158\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-docling-rs).
3. Un index local hybride, par mots-clés ([BM25](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-bm25)) et par vecteurs, servi à Claude par un serveur MCP en lecture seule ([section 18.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s18-3)), qui renvoie des passages courts avec leur source [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mcp).
4. Un graphe, seulement pour les questions qui traversent beaucoup de documents. GraphRAG, de Microsoft, construit avec un modèle un graphe d’entités et des résumés par communauté, utiles aux questions d’ensemble, au prix d’une indexation coûteuse [\[159\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-graphrag). Pour « qu’a-t-on décidé, et quand ? », une date et un statut sur chaque compte rendu passent avant tout graphe.

Avant la marche 2, écrivez une trentaine de questions réelles, avec la source attendue de chaque réponse. C’est le contrôle qui dira si une marche apporte quelque chose ([chapitre 14](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch14)). Comptez les réponses justes par type de question, et ne gardez une marche que si elle en gagne au moins deux sans en perdre.

Chez Passerelle, le lexique et les courriers types sont en Markdown. Inès demande : « Quels courriers types parlent d’un réexamen, et quel mot du lexique explique "forclusion" ? » La recherche agentique trouve, et la marche 1 suffit. Les modèles de courrier que le Bureau des aides de Rivelune diffuse en PDF passent à la marche 2 : un miroir en Markdown, converti une fois sur le poste.

🏛️ Pour Le Cahier commun, Mei écrit trente questions, comme « qu’ont dit les habitants sur l’ombre de la place ? ». Les contributions disent « ombrage », « fraîcheur », « les tilleuls l’été » : la même idée sous d’autres mots, et la recherche par mots-clés en manque une partie. Un index hybride, la marche 3, en gagne quatre sans en perdre : Mei le garde. Le graphe des thèmes, la marche 4, ne gagne rien sur ses trente questions : elle ne le construit pas. La synthèse mesure aussi la place prise par les contributions longues, pour qu’une voix qui écrit beaucoup ne compte pas plus qu’une autre, et revient aux habitants avant que le conseil municipal décide.

> **💡 Conseil**
>
> Limitez ce que le serveur renvoie. Claude Code prévient au-delà de 10 000 jetons par résultat d’outil, et plafonne par défaut à 25 000, réglable par `MAX_MCP_OUTPUT_TOKENS` [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mcp).

> **⚠️ Attention**
>
> Brancher un index en le croyant sûr parce qu’il est local expose la session à tout ce qu’il contient. Un document indexé est une donnée, jamais une consigne : une phrase piégée dans une contribution arrive au modèle comme le reste. Une session qui lit un index privé, des documents de tiers et le web réunit la [triade létale](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-triade-letale) [\[73\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-willison-lethal-trifecta). Passez chaque serveur d’index aux trois questions de la [section 22.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s22-2), et rappelez-vous que ce qu’il renvoie part vers le modèle : un index local ne rend pas une donnée confidentielle partageable.

> **📌 À retenir**
>
> Avant de relire la liste, répondez de mémoire, puis vérifiez votre réponse dans la section indiquée :
>
> 1. Pourquoi ces trois questions à chaque agent : à quoi correspondent les deux premières, et que dit la troisième ? ([section 22.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s22-2))
> 2. Pour qu’une session connaisse un projet, pourquoi commencer par la recherche dans les fichiers plutôt que par un index ? ([section 22.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s22-5))
>
> - Une architecture proposée par ce guide, à adapter : le modèle propose, un contrôle vérifie, la personne tranche et garde les gestes.
> - Trois questions par agent : que lit-il, que peut-il changer, qui agit sur son rapport. Chaque réponse dit si elle tient par construction ou par consigne.
> - Trois propriétés réunies : on coupe l’agent, ou l’on garde le travail dans une session supervisée en mode Manual.
> - Un rôle de session n’est pas un agent : une session longue, avec sa responsabilité et ce qu’elle ne fait jamais.
> - Pour un projet seul, une session et deux agents suffisent. Pour le contexte, la recherche d’abord, un index seulement s’il gagne sur des questions réelles.

> **✏️ Exercice**
>
> **Compétence visée** : concevoir son architecture par trois questions par agent. Comptez 45 minutes à une heure.
>
> Listez les agents que vous avez écrits, ou ceux que vous comptez écrire. Pour chacun, écrivez ses trois réponses : ce qu’il lit, ce qu’il peut changer d’après son champ `tools`, et qui agit sur son rapport, chaque réponse avec sa force, par construction ou par consigne. Marquez ceux qui réunissent les trois propriétés de la règle de deux ([section 23.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-4)). Corrigez-en un : coupez-le en deux, ou ramenez son travail dans une session en mode Manual. Puis essayez-le sur une petite tâche dont vous connaissez la réponse, dans une session neuve ([section 21.6](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-6)).
>
> Si vous suivez le fil rouge, faites-le sur l’agent de thème du Cahier commun : sa synthèse ne sert qu’après la relecture des habitants, et c’est le conseil municipal qui décide.
>
> **Sans code** : les trois réponses s’écrivent en phrases, sur les agents que vous comptez écrire ou sur ceux du tableau de la [section 22.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s22-2). La correction est une ligne `tools` réécrite, et l’essai se fait par une demande en mots.
>
> **Critère de réussite** : chaque agent a ses trois réponses écrites, chacune marquée « par construction » ou « par consigne ». Chaque réponse « par construction » se vérifie sur le champ `tools` de l’agent. L’agent corrigé ne réunit plus les trois propriétés, ou travaille dans une session en mode Manual, et son essai rend la réponse que vous connaissiez.
>
> **Pour vous corriger**, sans corrigé : relisez votre travail contre ces quatre points. Chacun se voit dans ce que vous avez écrit ou obtenu.
>
> 1. Chaque réponse porte sa force : « par construction » quand le harnais l’applique, « par consigne » quand seul un texte la pose ([section 22.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s22-2)).
> 2. La deuxième réponse de chaque agent se lit dans sa liste `tools` : ce qui n’y est pas listé est retiré de sa définition, et toute réponse « par construction » s’y vérifie ([section 22.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s22-2)).
> 3. Chaque agent a un seul rôle : aucun ne cumule produire et auditer, ou coordonner et construire, et un agent qui relit n’a que des outils de lecture ([section 22.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s22-2)).
> 4. L’agent corrigé ne réunit plus les trois propriétés, parce que vous l’avez coupé en deux ou que son travail est revenu dans une session supervisée en mode Manual, et chaque rapport a quelqu’un qui agit dessus : un rapport que personne ne relit est soit inutile, soit dangereux ([section 22.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s22-2)).
>
> Par le chemin sans code, les quatre points s’appliquent à vos réponses en phrases, et le deuxième à la ligne `tools` que vous avez réécrite.

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/#toc)

![Illustration : la personne en long manteau violet et son petit compagnon de cristal cyan, devant un coffre gardé au sceau lumineux, une paroi de lumière séparant une haute tour d’entreprise d’une bibliothèque personnelle.](https://gmag-dev.github.io/bien-demarrer-claude-code/images/6ec4307be923.avif)
