> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.3.0 : « 20. Piloter sa consommation et son projet », partie 2 sur 2.
>
> - Précédent : [20. Piloter sa consommation et son projet (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/20-piloter-sa-consommation-et-son-projet-1.md)
> - Suivant : [21. Écrire des skills, des agents et des artefacts (partie 1 sur 3)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/21-ecrire-des-skills-des-agents-et-des-artefacts-1.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-s20-13>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

### 20.13 Des rendez-vous réguliers, et l’exception

Un journal des décisions ne sert que s’il est lu à heure fixe : donnez-lui des rendez-vous réguliers, où Claude prépare et la personne décide. Le principe qui les relie, adapté par ce guide des méthodes de gestion de projet, est la gestion par exception. Vous fixez à l’avance des [tolérances](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-tolerance), c’est-à-dire des marges admises sur le délai, le coût, le périmètre ou la qualité, par exemple plus ou moins cinq jours sur la date de fin. Tant que le projet reste à l’intérieur, rien ne remonte en dehors des étapes clés. Dès qu’une prévision dit qu’il en sortira, la question remonte, pendant qu’il est encore temps de choisir. Les dates de fin se donnent en P50 et en P80 ([section 20.11](https://gmag-dev.github.io/bien-demarrer-claude-code/#s20-11)).

> **📌 À retenir**
>
> Avant de relire la liste, répondez de mémoire, puis vérifiez votre réponse dans la section indiquée :
>
> 1. Pourquoi un point du jour cite-t-il les deux écarts, celui de la fenêtre et celui de la semaine, et non le seul écart de la fenêtre ? ([section 20.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s20-5))
> 2. Pourquoi la fin d’un backlog se donne-t-elle en deux dates, P50 et P80, et pourquoi la somme des médianes promet-elle une fin trop proche ? ([section 20.11](https://gmag-dev.github.io/bien-demarrer-claude-code/#s20-11))
>
> - Les champs `rate_limits` de la ligne d’état n’existent que sur Pro, Max et Ultra, ou derrière une passerelle à plafond de dépense. L’export OpenTelemetry ne donne pas les limites du forfait, et l’outil `get_usage` de l’application de bureau n’est pas documenté, contrairement à son anneau d’usage [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-desktop).
> - Allure, écart, pente, projection : deux lectures datées suffisent. Citez toujours les deux écarts, fenêtre et semaine, ou celui de la semaine seule sur Ultra.
> - Seuils et coût d’un lancement : des nombres mesurés, des valeurs à calibrer sur votre usage.
> - Une demande courte donne en une réponse ce qui vous attend, le forfait, les sessions et la fraîcheur des documents de référence.
> - Un backlog se planifie par tirage : P50 et P80 par phase, un jalon daté seulement si l’équipe porte toute la phase, et le mot « estimation » partout.
> - Un projet se pilote avec un journal des décisions : chaque décision y entre datée, et le journal se lit à heure fixe.

> **✏️ Exercice**
>
> **Compétence visée** : piloter un forfait et un projet par des nombres calculés, et tenir les décisions dans un journal daté. Comptez une semaine de relevés, à raison de cinq minutes par jour, puis 45 minutes le dernier jour.
>
> 1. Pendant une semaine, notez vos lectures : la ligne d’état si elle est disponible, sinon `/usage` le matin, à midi et le soir, avec l’heure de la lecture et l’heure de remise à zéro. Chaque soir, calculez l’écart de semaine.
> 2. Mesurez cinq lancements d’un même type, calculez leur médiane et leur P80, et déduisez combien en tiennent le lendemain.
> 3. Refaites au tableur l’exemple de la [section 20.11](https://gmag-dev.github.io/bien-demarrer-claude-code/#s20-11), jusqu’à son P50 et son P80. Prenez ensuite deux éléments d’un de vos projets, donnez à chacun une médiane de durée, mesurée si vous le pouvez, sinon estimée et dite comme telle, et refaites les dix tirages avec les mêmes valeurs de z : vous obtenez la fin de ce petit backlog en deux durées, P50 et P80, qui deviennent deux dates une fois le départ fixé.
> 4. Le dernier jour, choisissez vos propres seuils et écrivez pour chacun sa raison.
> 5. Ouvrez un journal des décisions pour un de vos projets, avec deux décisions datées, et relisez-le chaque jour pendant cinq jours.
>
> **Sans code** : tout l’exercice se fait à la main ou dans un tableur. Pour la variante Passerelle, partez des deux lectures du [tableau 20.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#tab-20-3), puis ouvrez le journal des décisions de la vague avec une décision attendue sur un brouillon : sa question, ses options, la recommandation, et une case vide pour la décision d’Odile, qui seule la tranche.
>
> **Critère de réussite** : une semaine de lectures datées, un écart de semaine par soir, une médiane et un P80 sur cinq mesures, le P50 et le P80 de l’exemple de la [section 20.11](https://gmag-dev.github.io/bien-demarrer-claude-code/#s20-11) retrouvés, puis ceux de vos deux éléments avec l’origine de leurs médianes, des seuils écrits avec leur raison, et un journal dont chaque décision porte sa date.
>
> **Pour vous corriger**, sans corrigé : relisez votre travail contre ces cinq points. Chacun se voit dans ce que vous avez écrit ou obtenu.
>
> 1. Chaque lecture porte son heure et l’heure de remise à zéro, chaque soir a son écart de semaine, et quand vous citez un écart, vous citez les deux, fenêtre et semaine, ou celui de la semaine seule sur Ultra ([section 20.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s20-5)).
> 2. Chaque mesure d’un lancement est lue juste avant lui, puis juste après sa fin, un seul lancement à la fois, sinon les coûts se mélangent ([section 20.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s20-7)).
> 3. Pour l’exemple, vous retrouvez les valeurs que donne la section : 7,14 et 8,64 heures au tableur, sans arrondir en route ([section 20.11](https://gmag-dev.github.io/bien-demarrer-claude-code/#s20-11)).
> 4. Pour vos deux éléments, l’origine de chaque médiane est dite, mesurée ou estimée, et tant qu’elles ne viennent pas de vos mesures, le résultat le dit en tête : le P80 n’est alors qu’une hypothèse chiffrée ([section 20.11](https://gmag-dev.github.io/bien-demarrer-claude-code/#s20-11)).
> 5. Chaque décision de votre journal y entre datée, et aucune entrée n’a été réécrite ([section 20.12](https://gmag-dev.github.io/bien-demarrer-claude-code/#s20-12)).
>
> Par le chemin sans code, les cinq points s’appliquent tels quels, puisque tout l’exercice se fait à la main ou dans un tableur. Pour la variante Passerelle, vérifiez en plus que la case de la décision d’Odile est restée vide : elle seule la tranche.

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/#toc)

![Illustration : la personne en long manteau violet et son petit compagnon de cristal cyan, à une enclume de lumière, forgent un outil, à côté d’un établi où attendent des outils et de petites figures de cristal.](https://gmag-dev.github.io/bien-demarrer-claude-code/images/8e59d9d3799c.avif)
