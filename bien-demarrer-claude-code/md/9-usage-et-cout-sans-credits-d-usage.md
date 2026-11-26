> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.4.1 : « 9. Usage et coût sans crédits d’usage ».
>
> - Précédent : [8. Le travail en parallèle (partie 2 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/8-le-travail-en-parallele-2.md)
> - Suivant : [10. Sécurité (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/10-securite-1.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/9-usage-et-cout-sans-credits-d-usage.html#h-ch9>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## 9. Usage et coût sans crédits d’usage

> **🪪 Ce chapitre**
>
> **Pour qui** : toute personne qui travaille avec un abonnement Pro, Max ou Ultra, sans crédits d’usage activés, et qui ne veut pas tomber à court au milieu d’une semaine.
>
> **Sur quel poste** : n’importe lequel. `/usage` se tape dans Claude Code, et la même consommation se lit sur claude.ai, dans Settings, puis Usage.
>
> **Ce que vous apprenez** : lire `/usage` contre le rythme lissé, et en tirer une décision.
>
> **Deux chemins** : si vous débutez, lisez tout le chapitre et faites les trois barreaux : comptez 20 à 30 minutes pour les barreaux ① et ②, puis une semaine de relevés pour le barreau ③, une minute par jour. Si vous répondez juste à la question ci-dessous, lisez les encadrés « Quand la règle cède », puis faites le barreau ③.
>
> **Le fil rouge** 🌉 Passerelle : Bernard relève chaque soir ce que coûte la vague de courriers, et Amadou, le trésorier, tient le tableau de la semaine. 🏛️ Le Cahier commun : Mei mesure ce qu’a coûté son éventail de sous-agents, et choisit le niveau d’effort de la synthèse.
>
> **Où en est Passerelle** : en arrivant, deux branches relues, aucun fichier écrit par les deux, et la vague de soixante courriers en cours ([chapitre 8](https://gmag-dev.github.io/bien-demarrer-claude-code/8-le-travail-en-parallele.html#ch8)). À la fin du chapitre, une semaine de relevés, et pour Le Cahier commun un niveau d’effort retenu, avec sa raison.

Sur un abonnement, Claude Code ne se paie pas à la requête : il consomme un quota limité dans le temps. Ce guide ne donne aucun prix, parce qu’ils changent : la page des tarifs les donne, offre par offre, avec ce que chacune comprend de Claude Code [\[6\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-tarifs). Sans crédits d’usage activés, atteindre une limite veut dire attendre sa réinitialisation [\[69\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-plan-usage) [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-costs). Pour une association en pleine vague de courriers, une semaine bloquée au troisième jour, ce sont des personnes qui attendent leur brouillon. Ce chapitre explique les compteurs, une façon de répartir la consommation sur la semaine, la lecture de `/usage`, et les habitudes qui économisent.

> **⏭️ Vous pouvez sauter ce chapitre si…**
>
> Votre semaine d’usage a commencé il y a un jour et demi, et `/usage` montre 60 % de la limite hebdomadaire, sur un forfait sans crédits d’usage. Que faites-vous ? Écrivez votre réponse avant d’ouvrir la réponse attendue.
>
> **Voir la réponse attendue**
>
> Comparer au rythme lissé, environ un septième de la semaine par jour : à un jour et demi, environ 21 % étaient attendus, vous êtes très au-dessus. Puis chercher ce qui consomme, dans la répartition et les recommandations de `/usage`, et appliquer les habitudes qui économisent : `/clear` entre deux tâches, des sessions courtes, des prompts précis, les boucles arrêtées. Une réponse d’experte sait aussi que changer de modèle ne rétablit pas l’accès une fois une limite commune atteinte, mais le rétablit quand seule la limite des modèles Fable l’est, et que monter l’effort n’est pas une parade.
>
> Vous avez ces éléments ? Lisez seulement les encadrés « Quand la règle cède » et faites le barreau ③ de l’exercice. Sinon, lisez le chapitre dans l’ordre : il est écrit pour vous.

### 9.1 Deux compteurs communs, et un troisième

Pour ne pas tomber à court au milieu d’une semaine, il faut savoir quels compteurs avancent quand vous travaillez, et quand chacun repart. Les forfaits Pro et Max ont deux limites qui s’appliquent en même temps : une [fenêtre de cinq heures](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-fenetre-de-cinq-heures), quelle que soit la session, et une [limite hebdomadaire](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-limite-hebdomadaire). Ultra n’a que la limite hebdomadaire : un compte Ultra vérifié n’a pas de fenêtre de cinq heures. Ce sont les deux compteurs communs. Max et Ultra en ont un troisième, une limite de la semaine qui ne compte que l’usage des modèles [Fable](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-fable), une famille de modèles de Claude [\[69\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-plan-usage) [\[70\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-usage-limits).

**Tableau 9.1 :** Les compteurs d’un forfait Pro, Max ou Ultra, d’après [\[70\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-usage-limits), [\[69\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-plan-usage) et [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-costs).

| Propriété | Fenêtre de cinq heures (Pro et Max) | Limite hebdomadaire (Pro, Max et Ultra) |
| --- | --- | --- |
| Durée | cinq heures | une semaine |
| Point de départ | votre premier message, et une réinitialisation complète cinq heures plus tard | un jour et une heure fixes, attribués à votre compte, qui ne dépendent pas de votre usage |
| Ce qui compte | Claude sur le web, sur le bureau et sur le mobile, et Claude Code : tout pèse sur le même total | la même chose |
| Où la suivre | sur claude.ai, Settings, Usage, rubrique « Current session ». Dans Claude Code, `/usage` | les mêmes endroits |
| Une fois atteinte | changer de modèle avec `/model` ne rétablit pas l’accès, et le message donne l’heure de réinitialisation | la même chose |
| Modèles Fable | sans objet | sur Max et Ultra, une troisième limite, d’une semaine, ne compte que l’usage des modèles Fable |

Les [crédits d’usage](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-credits-d-usage) permettent de continuer après une limite. Sans eux, il faut attendre [\[69\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-plan-usage) [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-costs). Anthropic ne publie pas le volume exact de ces limites, seulement une fenêtre de cinq heures et une limite hebdomadaire [\[69\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-plan-usage). Ce guide n’en donne donc aucun chiffre : fiez-vous à `/usage`.

> **⚠️ Attention**
>
> Activer les crédits d’usage fait payer ce qui dépasse votre forfait. Ne les activez que sur une décision prise d’avance, pour un travail et une période nommés, avec un plafond et une date de fin que vous fixez vous-même, et relevez la dépense le jour même.

Chez Passerelle, Bernard lance la vague un lundi à 9 heures : sa fenêtre de cinq heures court jusqu’à 14 heures, quelles que soient ses sessions. Sa limite hebdomadaire repart chaque lundi matin, avant l’ouverture, à l’heure que lui donne `/usage` : le lundi est le jour 1 de sa semaine.

> **🔀 Quand la règle cède**
>
> - Le volume des limites n’est pas publié, et il évolue : un pourcentage ne se compare qu’à lui-même, d’un jour à l’autre.
> - Ce qui tient : `/usage`, relu chaque jour, plutôt qu’un chiffre trouvé en ligne.
> - 🕘 Depuis la version 2.1.234, Claude Code peut attendre la réinitialisation, puis reprendre seul la tâche interrompue [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-costs).
> - Pour aller plus loin : [section 20.2](https://gmag-dev.github.io/bien-demarrer-claude-code/20-piloter-sa-consommation-et-son-projet.html#s20-2).

### 9.2 Lisser sur la semaine et le mois

Sans crédits d’usage, la question n’est pas « combien cela coûte », mais « vais-je tomber à court avant la réinitialisation ». Un mois compte quatre à cinq cycles hebdomadaires : lisser chaque semaine suffit donc à lisser le mois.

💡 Conseil : visez environ un septième de la limite hebdomadaire par jour, ou un cinquième par jour ouvré si vous ne travaillez pas le week-end. C’est ce que ce guide appelle le [rythme lissé](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-rythme-lisse). Regardez `/usage` en début et en milieu de journée. Placez les grosses tâches au début d’une fenêtre de cinq heures plutôt qu’à sa fin, et gardez une marge pour les imprévus de la fin de semaine.

Le [tableau 9.2](https://gmag-dev.github.io/bien-demarrer-claude-code/9-usage-et-cout-sans-credits-d-usage.html#tab-9-2) compare deux semaines. Dans la première, la consommation suit le rythme lissé. Dans la seconde, tout est lancé dès le premier jour.

**Tableau 9.2 :** Deux rythmes sur une semaine, en part cumulée de la limite hebdomadaire. Valeurs illustratives. Le fonctionnement de la limite vient de [\[70\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-usage-limits), le rythme lissé est un conseil de ce guide.

| Jour | Rythme lissé | Rythme concentré | Ce qui se passe dans la semaine concentrée |
| --- | --- | --- | --- |
| 1 | 14 % | 45 % | tout est lancé en même temps |
| 2 | 29 % | 85 % | la marge a disparu |
| 3 | 43 % | 100 % | limite atteinte : attente |
| 4 | 57 % | 100 % | bloqué jusqu’à la réinitialisation |
| 5 | 71 % | 100 % | bloqué |
| 6 | 86 % | 100 % | bloqué |
| 7 | 100 % | 100 % | réinitialisation à l’heure fixe |

Chez Passerelle, lisser ne veut pas dire traiter les courriers au hasard : la permanence prend d’abord ceux dont le délai est le plus proche. C’est Samia qui fixe cet ordre, pas l’outil.

> **🔀 Quand la règle cède**
>
> - Le septième par jour suppose une charge régulière. Une semaine de livraison concentre l’effort : placez la pointe au début d’une fenêtre de cinq heures, et gardez la marge pour elle.
> - Ce qui tient : la consommation de chaque jour se compare à la même référence, et une pointe se décide d’avance.
> - Pour aller plus loin : sections [20.4](https://gmag-dev.github.io/bien-demarrer-claude-code/20-piloter-sa-consommation-et-son-projet.html#s20-4) et [20.5](https://gmag-dev.github.io/bien-demarrer-claude-code/20-piloter-sa-consommation-et-son-projet.html#s20-5).

### 9.3 Lire /usage

Au début, `/usage` sert à répondre à une seule question : où en suis-je de ma semaine ? Regardez la barre hebdomadaire chaque jour et comparez-la au rythme lissé ([section 9.2](https://gmag-dev.github.io/bien-demarrer-claude-code/9-usage-et-cout-sans-credits-d-usage.html#s9-2)). La répartition et les recommandations servent ensuite, quand vous cherchez ce qui consomme le plus.

Sur les forfaits Pro, Max et Ultra, `/usage` affiche les barres d’usage du forfait. Sur ces forfaits comme sur Team et Enterprise, il donne aussi une répartition de votre consommation récente par [skill](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-skill), [sous-agent](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-sous-agent), plugin et serveur MCP [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-costs). Il propose des recommandations, une par ligne, pour tout comportement qui pèse au moins 10 % de votre usage récent, comme un contexte long ou des ratés du cache : un cache expiré fait tout relire au plein tarif. Les touches `d` et `w` basculent entre les 24 dernières heures et les 7 derniers jours. Quand le pied de page l’indique, `f` fait appliquer les recommandations qui peuvent l’être, en vous montrant chaque changement avant de le faire [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-costs). Les chiffres de la répartition sont approximatifs. Les barres du forfait comptent tout l’usage du compte, mais la répartition et les recommandations ne comptent que l’historique de cette machine : l’usage d’autres appareils ou de claude.ai n’y figure pas [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-costs) [\[70\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-usage-limits). `/cost` est un autre nom de `/usage` [\[67\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-commands).

La [figure 9.1](https://gmag-dev.github.io/bien-demarrer-claude-code/9-usage-et-cout-sans-credits-d-usage.html#fig-9-1) donne la décision à prendre après chaque relevé.

*Dessin : Que faire d’un relevé de /usage. Schéma : la description suit.*

**Figure 9.1 :** Que faire d’un relevé de `/usage`. En gris le relevé, en bleu la comparaison, en vert ce qui continue, en ambre ce qui demande d’agir, en rouge ce qui bloque, en tirets la décision d’une personne. Schéma proposé par ce guide, d’après [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-costs) et [\[70\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-usage-limits).

La même décision, en texte :

1. Notez la barre hebdomadaire avec le jour et l’heure, puis comparez-la au rythme lissé.
2. Sous le rythme ou juste au-dessus : continuez, et relisez le soir.
3. Nettement au-dessus : lisez la répartition et les recommandations, appliquez les habitudes de la [section 9.4](https://gmag-dev.github.io/bien-demarrer-claude-code/9-usage-et-cout-sans-credits-d-usage.html#s9-4), reportez ce qui peut attendre.
4. Limite atteinte : regardez d’abord quel compteur est épuisé. Si c’est la seule limite des modèles Fable, passez à un autre modèle, qui reste dans le forfait, ou continuez avec des crédits d’usage [\[185\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-fable-plan). Si c’est une limite commune, attendez la réinitialisation : changer de modèle ne rétablit pas l’accès.
5. Dans tous les cas, c’est vous qui décidez de la suite.

Chez Passerelle, le mercredi soir, la barre de Bernard est à 55 %, pour 43 % attendus. Sur les 7 derniers jours, `/usage` montre que les sous-agents de la vague pèsent plus de la moitié de son usage, et signale des contextes longs. 🏛️ Mei fait la même lecture : son éventail de cinq sous-agents sur 40 contributions a pris environ 4 % de sa semaine, relevé fictif. Pour les 400, elle décide d’avancer thème par thème, sur plusieurs jours.

> **🔀 Quand la règle cède**
>
> - La répartition ne compte que l’historique de cette machine : un usage sur claude.ai ou sur un autre appareil n’y figure pas, alors qu’il pèse sur la même limite.
> - Ce qui tient : avant de conclure qu’un skill ou un sous-agent consomme trop, comparez sur les mêmes jours, depuis la même machine.
> - Pour aller plus loin : [section 20.2](https://gmag-dev.github.io/bien-demarrer-claude-code/20-piloter-sa-consommation-et-son-projet.html#s20-2). Autres commandes de suivi, dont `/insights` : [annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#ann-l), [section L.6](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-6).

### 9.4 Les habitudes qui économisent

Le coût suit la taille du contexte : plus Claude traite de contexte, plus il consomme [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-costs). Une session ouverte depuis des heures peut consommer bien plus que votre activité ne le laisse croire : contexte long, ratés du cache après une pause, tâches planifiées, vérifications d’objectifs, sous-agents [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-costs). Le [tableau 9.3](https://gmag-dev.github.io/bien-demarrer-claude-code/9-usage-et-cout-sans-credits-d-usage.html#tab-9-3) rassemble les habitudes qui répondent à chacune de ces causes.

**Tableau 9.3 :** Les habitudes qui économisent l’usage, d’après [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-costs), [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices) et [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config).

| Habitude | Pourquoi elle économise |
| --- | --- |
| `/clear` entre deux tâches sans rapport | la tâche suivante ne paie plus pour l’historique de la précédente, et `/clear` ne coûte rien |
| des sessions courtes, une session neuve après une longue pause | après l’expiration du cache, environ une heure sur abonnement, le premier message retraite tout le contexte |
| des prompts précis, qui nomment le fichier et la fonction | ils évitent le balayage large du dépôt |
| filtrer un journal avant de le donner, par exemple `grep -n ERROR app.log > erreurs.txt`, puis faire lire `erreurs.txt` | un journal de 10 000 lignes réduit à ses lignes d’erreur passe de dizaines de milliers de jetons à quelques centaines |
| un plugin d’intelligence de code pour les langages typés | un « aller à la définition » remplace une recherche suivie de plusieurs lectures |
| la ligne de commande plutôt qu’un serveur MCP, et les serveurs inutilisés désactivés | moins de listes d’outils dans le contexte |
| un `CLAUDE.md` sous 200 lignes, les procédures déplacées dans des skills | les skills ne se chargent qu’à la demande |
| un modèle léger pour les sous-agents simples, et le [niveau d’effort](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-niveau-d-effort) adapté | la réflexion, réglée par l’effort, est facturée comme des jetons de sortie |
| arrêter les `/loop`, les objectifs de `/goal` et les sous-agents devenus inutiles | ils envoient des requêtes quand vous ne tapez rien, même la nuit ([annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#ann-l), [section L.15](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-15)) |

Le niveau d’effort règle combien Claude réfléchit et vérifie avant de répondre. Les niveaux sont `low`, `medium`, `high`, `xhigh` et `max`, et sur Opus 5.5 le défaut est `medium` [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config). 💡 Conseil : pour commencer, ne réglez rien, le défaut convient à la plupart des tâches, et choisissez le modèle et l’effort en début de session. Monter ou baisser l’effort : [section 4.4](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-4). Ce qui protège d’une erreur, ce sont les tests, git et la relecture, pas une réflexion plus longue.

Chez Passerelle, Bernard a appliqué deux habitudes dès le jeudi : `/clear` entre deux courriers, puisque chaque brouillon est indépendant, et les sous-agents lancés trois par trois. 🏛️ Mei, elle, a fait la même synthèse des 40 contributions deux fois, en `medium` puis en `high`. Relevés fictifs : environ 3 % de sa semaine en `medium`, 5 % en `high`, et dans les deux cas deux phrases à reprendre, l’une qui citait une contribution inexistante, l’autre qui disait « beaucoup » pour trois personnes. Le niveau plus haut n’a pas fait moins d’erreurs, et ces erreurs-là, la vérification des citations et sa relecture les attrapent. Elle garde `medium`, avec cette raison écrite dans le dossier, et note qu’un seul essai n’est qu’une indication. La synthèse reviendra aux habitantes et aux habitants avant que le conseil municipal décide.

> **🔀 Quand la règle cède**
>
> - Filtrer un journal avant de le donner peut retirer la ligne qui explique l’erreur.
> - Ce qui tient : filtrer pour lire, garder le journal entier pour chercher la cause.
> - Pour aller plus loin : [section 16.4](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#s16-4). Les défauts des autres modèles, où régler l’effort de façon durable, par modèle et par agent, et quand repartir d’une session neuve : [section 15.4](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-4).

> **📌 À retenir**
>
> - Pro et Max ont deux compteurs simultanés, la fenêtre de cinq heures et la semaine. Ultra n’a que la semaine. Max et Ultra ont en plus la semaine des modèles Fable.
> - Sans crédits d’usage, une limite commune atteinte veut dire attendre : lissez, environ un septième par jour. À la seule limite des modèles Fable, un autre modèle reste dans le forfait.
> - Relisez `/usage` chaque jour contre le rythme lissé. Sa répartition et ses recommandations servent ensuite, pour trouver ce qui consomme.
> - Un contexte court, des prompts précis, un modèle adapté, des boucles arrêtées.
> - Le niveau d’effort par défaut convient à la plupart des tâches. Le rayon d’impact d’une erreur se borne par les tests, git et la relecture, pas par la réflexion.

> **✏️ Exercice en trois barreaux**
>
> **Compétence visée** : lire `/usage` contre le rythme lissé, et en tirer une décision. Comptez 20 à 30 minutes pour les barreaux ① et ②, puis une semaine de relevés pour le barreau ③, une minute par jour.
>
> **① Exemple travaillé.** Voici les relevés du soir de Bernard pendant la vague, que tient Amadou, avec le rythme lissé à côté. Les valeurs sont fictives.
>
> ```text
> Jour 1   12 %   attendu 14 %
> Jour 2   27 %   attendu 29 %
> Jour 3   55 %   attendu 43 %   dix sous-agents lancés à la fois
> Jour 4   63 %   attendu 57 %   trois par trois, /clear entre deux courriers
> Jour 5   72 %   attendu 71 %
> Jour 6   80 %   attendu 86 %
> Jour 7   88 %   attendu 100 %
> ```
>
> Le jour 3, Bernard est à 12 points au-dessus du rythme. Il lit la répartition, voit le poids des sous-agents, change sa façon de les lancer, et reporte au jour 4 les courriers dont le délai est le plus lointain. La semaine finit avec une marge. **Pourquoi ?** Pourquoi comparer au rythme du jour plutôt qu’au total restant ?
>
> **② À compléter.** Trois relevés du soir : 20 % le jour 1, 41 % le jour 2, 60 % le jour 3. Calculez le jour où la limite tomberait si le rythme restait le même, puis tirez-en votre décision : écrivez ce que vous changez le jour 4, et dans quel ordre.
>
> **③ Sur votre projet.** Pendant une semaine, notez chaque soir la part hebdomadaire que montre `/usage`, avec l’heure, et comparez-la au rythme lissé. Le dernier jour, relevez la recommandation de `/usage` qui pèse le plus. Puis faites une même tâche réelle deux fois, en `medium` puis en `high`, relevez la consommation des deux et comptez les défauts trouvés à la relecture, et choisissez votre niveau par défaut.
>
> **Sans code** : tout l’exercice se fait sans code. Les relevés tiennent dans un tableau, sur papier ou dans un tableur.
>
> **Critère de réussite** : sept relevés datés, comparés au rythme lissé, la recommandation de `/usage` qui pèse le plus, deux relevés de consommation et deux comptes de défauts, et le niveau d’effort retenu, avec sa raison écrite. Par le chemin sans code, la même preuve tient dans votre tableau, sur papier ou dans un tableur : sept lignes datées avec le rythme lissé à côté, la décision écrite face au relevé qui l’a fait prendre, et la même tâche sur un document, faite deux fois, avec ses deux relevés et ses défauts comptés.
>
> **Voir le corrigé expliqué (après votre essai)**
>
> **①** Le total restant rassure à tort : le jour 3, il reste 45 %, ce qui semble beaucoup. Mais au rythme du jour 3, 28 points en un jour, la limite tombait le jour 5. Le rythme du jour dit tout de suite si la limite tiendra jusqu’à la réinitialisation. Lisser ne change rien au circuit des courriers : chaque brouillon de la vague attend la relecture d’Odile, qui décide s’il sert.
>
> **②** Le rythme est d’environ 20 points par jour : la limite tomberait vers la fin du jour 5, deux jours avant la réinitialisation. Le jour 4, lisez d’abord la répartition et les recommandations de `/usage`, puis appliquez les habitudes qui visent ce qui pèse, comme `/clear` entre deux tâches ou les boucles arrêtées, et reportez ce qui peut attendre. Erreur fréquente : changer de modèle avec `/model`, qui ne rétablit pas l’accès une fois une limite commune atteinte, ou monter l’effort par prudence, qui consomme davantage.
>
> **③** Chaque relevé porte un jour et une heure. Si votre courbe dépasse le rythme lissé deux jours de suite, la recommandation la plus lourde est votre première piste. Pour l’effort, comparez les défauts comptés, pas votre impression : si le niveau plus haut ne les réduit pas, gardez le défaut. Un seul essai reste une indication.

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/guide-en-une-page.html#toc)

![Illustration : la personne en long manteau violet et son petit compagnon de cristal cyan, dans un laboratoire où un bras mécanique travaille sous un dôme de verre, entre des portes à champ de force et des casiers verrouillés.](https://gmag-dev.github.io/bien-demarrer-claude-code/images/c26a47938759.avif)
