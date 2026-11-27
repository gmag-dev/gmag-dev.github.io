> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.5.0 : « 4. La méthode de travail », partie 2 sur 2.
>
> - Précédent : [4. La méthode de travail (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/4-la-methode-de-travail-1.md)
> - Suivant : [5. Vérification et tests](https://gmag-dev.github.io/bien-demarrer-claude-code/md/5-verification-et-tests.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#h-s4-8>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

### 4.8 Poser la bonne question avant le prompt

Nouveau · 18 nov. 2026 Un prompt soigné sur une mauvaise question donne une bonne réponse à un problème que vous n’avez pas, et un contrôle qui vérifie la réponse contre la demande ne le verra pas : il ne vérifie pas la question. Avant le prompt de réalisation de la [section 4.7](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-7), ce guide propose donc trois temps, dans cet ordre :

1. **La question.** Ce qu’il faut résoudre, pour qui, et à quoi l’on saura que c’est résolu. C’est la posture de l’ingénieur : nommer le problème, pas encore sa solution.
2. **Les réponses possibles.** Deux ou trois façons d’y répondre, chacune avec ce qu’elle coûte et les options qu’elle exclut. C’est la posture de l’architecte : choisir entre des réponses, et garder la raison du choix.
3. **Le prompt.** Il vient en dernier, pour la réponse choisie, avec ses quatre ingrédients ([section 4.7](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-7)).

Ces trois temps précèdent le cycle de la [section 4.1](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-1) : ils décident de ce que vous allez explorer et planifier. La question se nourrit de ce que vous savez déjà faire : vous faire interroger par Claude ([section 4.3](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-3)), interroger une personne sur des faits passés ([section 4.6](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-6)). 💡 Conseil : l’ordre en trois temps est une proposition de ce guide. Les outils qui suivent aident à tenir le premier.

**Le problème XY.** Un [problème XY](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-probleme-xy), c’est une demande d’aide sur la solution qu’on a tentée, plutôt que sur son problème réel [\[51\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-xy-problem). « Comment mettre les dates en gras dans le brouillon ? » est une solution tentée. Le problème réel était peut-être ailleurs : la relecture ne voit pas qu’une date manque. Devant votre propre demande, posez-vous la question : est-ce mon problème, ou ma première idée pour le résoudre ?

**Produire des questions avant d’en choisir une.** La technique de formulation des questions (Question Formulation Technique, QFT), du Right Question Institute, part d’un sujet donné et fait produire autant de questions que possible. On ne s’arrête pas pour discuter des questions, les juger ou y répondre. On note chacune telle qu’elle a été dite, et l’on change toute affirmation en question [\[52\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-rqi-qft). On les améliore ensuite, en changeant des questions fermées en ouvertes et l’inverse, puis on choisit celles qui comptent [\[52\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-rqi-qft).

**« Comment pourrions-nous… ».** Bien posée, une question de cette forme ne suggère aucune solution particulière, sans être trop large pour autant [\[53\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hmw-design-kit). « Comment pourrions-nous faire qu’aucune date du courrier ne se perde dans le brouillon ? » laisse ouverts le gras, le contrôle et la relecture.

**L’arbre de questions.** Il décompose la question d’ensemble en sous-questions auxquelles on peut répondre, sans recouvrement ni oubli [\[54\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-issue-trees) [\[55\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-wp-issue-tree). Ce guide en tire un conseil : soignez sa racine, car une question qui ne saisit pas le problème réel fait chercher au mauvais endroit, d’un bout à l’autre de l’arbre.

**Une réponse, ou une expérience ?** Parmi ses domaines, le cadre Cynefin, que présentent David Snowden et Mary Boone, distingue les situations compliquées, où au moins une bonne réponse existe, des situations complexes, où les bonnes réponses ne se trouvent pas d’avance. Dans une situation complexe, on mène des expériences qui peuvent échouer sans danger : on sonde d’abord, puis on observe, puis on répond [\[56\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-snowden-boone-2007) [\[57\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-wp-cynefin). Si votre question est de la seconde sorte, ne demandez pas la réponse à Claude : demandez-lui un petit essai qui peut échouer sans dommage.

**Faire proposer par Claude.** Claude peut tenir les deux premiers temps avec vous, en mode plan, où il ne modifie pas vos sources ([section 4.2](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-2)). Le premier message demande les formulations, et s’arrête :

```text
Voici ma demande : « … ». Propose trois formulations du problème qu'elle cache, chacune avec l'hypothèse qu'elle suppose. Puis arrête-toi, et attends mon choix.
```

Le second message vient après votre choix :

```text
Pour la formulation 2, propose trois réponses possibles, chacune avec son coût, les options qu'elle exclut et la façon de la vérifier.
```

Vous choisissez la formulation, puis la réponse. Quand le choix engage, un enregistrement de décision garde les options écartées et leur raison ([section 14.8](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-8)). Quand la question se pose à une personne, posez-la comme le dit la [section 19.4](https://gmag-dev.github.io/bien-demarrer-claude-code/19-plusieurs-sessions-en-parallele.html#s19-4).

Chez Passerelle, Inès allait demander de mettre les dates en gras dans les brouillons. Elle fait d’abord proposer à Claude trois formulations du problème. Elle retient la deuxième avec Samia : « Odile n’a aucun moyen sûr de voir qu’une date du courrier manque au brouillon. » Des trois réponses proposées (le gras, une liste des dates en tête du brouillon, un contrôle qui compare le brouillon au courrier), elles gardent la troisième : le gras ne dit pas ce qui manque. C’est le contrôle que Bernard construit au [chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#ch5).

**Une hypothèse de ce guide.** Ce guide fait une hypothèse, qu’aucune étude trouvée au 18 novembre 2026 ne mesure : l’habitude de lire un texte de près et de douter d’une formulation aide à tenir ce premier temps, quel que soit le parcours qui l’a donnée. Repérer ce qu’une phrase suppose, reformuler un problème, distinguer une hypothèse d’un fait : c’est ce que demande la question avant le prompt, et ce qu’exercent les outils de cette section. Pour mettre cette hypothèse à l’épreuve sur votre pratique, notez, demande après demande, ce que la relecture de votre demande a changé à la question : la note vaut mieux que l’impression.

> **🔀 Quand la règle cède**
>
> - Le premier temps peut s’éterniser. Une question qui bouge encore après deux tours se tranche souvent par un essai, pas par une formulation de plus.
> - Ce qui tient : nommer le problème avant la solution, et garder la raison du choix entre les réponses.
> - Pour aller plus loin : sections [14.4](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-4), [14.5](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-5) et [19.4](https://gmag-dev.github.io/bien-demarrer-claude-code/19-plusieurs-sessions-en-parallele.html#s19-4), et [chapitre 16](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#ch16). Quand la question se pose à plusieurs, la [section 14.4](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-4) la fait mûrir avec les parties prenantes. Et quand une réponse semble acquise, le prémortem du [chapitre 16](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#ch16), appliqué à la réponse choisie, cherche d’avance pourquoi elle échouerait.

> **📌 À retenir**
>
> - Explorer, planifier en mode plan, coder, vérifier. Revenir au code tant que le contrôle échoue.
> - Lisez et corrigez le plan avant de l’approuver, et continuez en validant chaque modification.
> - Si le besoin est flou, faites-vous interroger, écrivez `SPEC.md`, puis construisez dans une session neuve.
> - Avancez par petits incréments vérifiés. Réglez l’effort plutôt que d’insister dans le prompt.
> - Sur un code inconnu, la carte d’abord, chaque affirmation avec sa source, chaque lacune en question.
> - En entretien, la phrase de la personne mot pour mot, et des questions sur des faits passés.
> - Un prompt de réalisation : contexte, but, contraintes, critère de fin vérifiable. Le test du collègue, la raison de chaque contrainte, l’ampleur dite sans insister.
> - Avant le prompt, la question, puis les réponses possibles. Une demande peut cacher une solution tentée : nommez d’abord le problème.

> **✏️ Exercice en trois barreaux**
>
> **Compétence visée** : planifier avant de coder, corriger le plan plutôt que le code, et écrire un prompt de réalisation avec ses quatre ingrédients. Comptez 35 à 45 minutes.
>
> **① Exemple travaillé.** Inès a lancé `/plan` pour le circuit d’un courrier. Claude propose :
>
> ```text
> 1. Lire courriers/PASS-C-003.txt et relever ses dates et ses montants.
> 2. Écrire brouillons/PASS-B-003.md selon CLAUDE.md et regles-redaction.md.
> 3. Comparer les dates et les montants du brouillon à ceux du courrier, et signaler chaque écart.
> 4. Marquer le brouillon « validé » et le placer dans envoi/.
> ```
>
> Samia arrête la lecture à l’étape 4 : un brouillon n’est jamais validé par l’outil, et Passerelle n’envoie rien. Inès la réécrit avant d’approuver :
>
> ```text
> 4. Placer le brouillon dans a-relire/ et s'arrêter. Odile le relit et décide s'il sert. Rien n'est envoyé.
> ```
>
> Pour garder les deux versions, Inès a ouvert le plan par `Ctrl+G` avant de le corriger, et en a copié le texte dans `plans/circuit-courrier.md`, sous « Plan initial ». Après la correction, elle y ajoute le plan corrigé, sous « Plan corrigé ». Elle approuve ensuite en choisissant de valider chaque modification. Claude écrit le brouillon, puis montre la comparaison : deux dates, un délai et un montant dans le courrier, les mêmes dans le brouillon. **Pourquoi ?** Pourquoi corriger l’étape 4 sur le plan plutôt qu’après l’écriture du code ?
>
> **② À compléter.** Inès lance `/plan` pour le courrier PASS-C-004, une révision de loyer de 498,70 euros par mois. Claude propose :
>
> ```text
> 1. Lire courriers/PASS-C-004.txt et relever ses dates et ses montants.
> 2. Écrire brouillons/PASS-B-004.md selon CLAUDE.md et regles-redaction.md.
> 3. Arrondir les montants à l'euro, pour des phrases plus simples.
> 4. Placer le brouillon dans a-relire/ et s'arrêter. Odile le relit et décide s'il sert.
> ```
>
> Trouvez l’étape qui contredit une règle du `CLAUDE.md` de Passerelle ([section 2.2](https://gmag-dev.github.io/bien-demarrer-claude-code/2-bien-demarrer.html#s2-2)), et réécrivez-la. Puis ajoutez l’étape qui manque pour qu’un écart se voie avant la relecture d’Odile.
>
> **③ Sur votre projet.** Choisissez une petite fonctionnalité. Écrivez d’abord sa demande en prompt de réalisation, avec ses quatre ingrédients ([section 4.7](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-7)), et faites-le lire à une personne qui ne connaît pas le projet. Faites-la ensuite planifier par `/plan`, gardez le plan initial comme Inès, par `Ctrl+G` et une copie dans un fichier de `plans/` (créez le dossier s’il manque), corrigez une étape, approuvez en validant chaque modification, puis comparez le résultat au plan initial. En option, sur un dépôt que vous ne connaissez pas : faites dresser la carte de la [section 4.5](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-5), et vérifiez à la main trois affirmations, une « code », une « doc », une « déduction ».
>
> **Sans code** : les barreaux ① et ② se font de tête ou sur papier. Pour le barreau ③, écrivez le prompt de réalisation de la réorganisation d’un document long, faites-la planifier, corrigez une étape, et comparez.
>
> **Critère de réussite** : le prompt de réalisation, ses quatre ingrédients repérés et la remarque de la personne qui l’a lu, le plan initial gardé, l’étape corrigée notée, chaque étape du plan cherchée dans le résultat, avec l’écart trouvé et sa cause, ou le constat écrit qu’il n’y en a pas, et la sortie de la vérification. Pour l’option, le compte des affirmations justes, comparé à la confiance annoncée. Par le chemin sans code, le plan initial et le plan corrigé du document, gardés côte à côte, et la liste de ses parties réorganisées, chacune cochée contre le plan.
>
> **Voir le corrigé expliqué (après votre essai)**
>
> **①** Sur le plan, la correction coûte une ligne. Après le code, il faudrait retirer un dossier `envoi/`, défaire un statut « validé », et vérifier qu’aucun brouillon n’est parti. Le plan est le moment où une erreur de compréhension coûte le moins. Samia approuve le plan corrigé, et chaque brouillon reste à la décision d’Odile, qui le relit avant qu’il serve. Le dossier `a-relire/` ne retire pas pour autant tout moyen d’envoyer : c’est l’objet du [chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#ch10).
>
> **②** L’étape 3 contredit la règle « Il garde chaque date et chaque montant du courrier » : 498,70 euros deviendrait 499 euros. Réécrite : « 3. Recopier chaque date et chaque montant tels que le courrier les écrit. » L’étape qui manque est la comparaison de l’exemple ① : « Comparer les dates et les montants du brouillon à ceux du courrier, et signaler chaque écart », placée avant l’étape 4. Erreur fréquente : approuver, puis corriger le montant dans le brouillon : l’étape fautive reste alors dans le plan, que Claude suit pour la suite du travail. Samia relit le plan corrigé avant l’approbation, et Odile relit le brouillon avant qu’il serve.
>
> **③** Si la personne qui a lu votre prompt s’est perdue, corrigez ce passage avant de lancer `/plan` : Claude se serait perdu au même endroit. Vos deux plans sont gardés côte à côte, et chaque étape a été cherchée dans le résultat. Un écart trouvé est nommé avec sa cause, par exemple une étape ajoutée par Claude pendant l’écriture. Si chaque étape s’y retrouve, notez-le : c’est un résultat, pas un échec de l’exercice. Pour l’option, des « déductions » plus souvent fausses que le reste, c’est ce que la confiance annoncée laissait prévoir.

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/guide-en-une-page.html#toc)

![Illustration : la personne en long manteau violet et son petit compagnon de cristal cyan, observent une arche qui scanne un colis sur un convoyeur, à côté d’un banc de test et d’un panneau holographique.](https://gmag-dev.github.io/bien-demarrer-claude-code/images/05ccbd17a3c0.avif)
