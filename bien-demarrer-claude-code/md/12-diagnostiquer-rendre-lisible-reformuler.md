> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.4.2 : « 12. Diagnostiquer, rendre lisible, reformuler ».
>
> - Précédent : [11. Commits et collaboration](https://gmag-dev.github.io/bien-demarrer-claude-code/md/11-commits-et-collaboration.md)
> - Suivant : [13. Les pièges fréquents](https://gmag-dev.github.io/bien-demarrer-claude-code/md/13-les-pieges-frequents.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/12-diagnostiquer-rendre-lisible-reformuler.html#h-ch12>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## 12. Diagnostiquer, rendre lisible, reformuler

> **🪪 Ce chapitre**
>
> **Pour qui** : toute personne qui écrit déjà des [prompts](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-prompt) de réalisation ([section 4.7](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-7)), qu’elle code ou non, et qui bute sur un sujet qu’elle connaît mal, sur un rapport que personne d’autre ne comprend, ou sur une dictée mal transcrite.
>
> **Sur quel poste** : n’importe lequel. Le chapitre se lit et s’exerce sans installation, sauf le barreau ③, qui demande Claude Code ou l’application Claude.
>
> **Ce que vous apprenez** : demander un diagnostic avant une correction, puis faire rendre un état lisible par une personne qui n’était pas là, avec un schéma et son repli en texte.
>
> **Deux chemins** : si vous débutez, lisez tout le chapitre et faites les trois barreaux : comptez 25 à 40 minutes pour l’exercice. Si vous répondez juste à la question ci-dessous, lisez les encadrés « Quand la règle cède » et « La limite », puis faites le barreau ③.
>
> **Le fil rouge** 🌉 Passerelle : Bernard demande un diagnostic sur un brouillon que le contrôle refuse, avant toute correction. Samia demande l’état de la vague de courriers pour la réunion du jeudi, et Inès dicte une demande que Claude reformule avant d’agir.
>
> **Où en est Passerelle** : en arrivant, l’historique du projet est propre et vérifié avant son premier dépôt distant ([chapitre 11](https://gmag-dev.github.io/bien-demarrer-claude-code/11-commits-et-collaboration.html#ch11)), et les bénévoles reprennent pour chaque courrier le prompt de réalisation du [chapitre 4](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#ch4). À la fin du chapitre, l’état de la vague est rendu à Samia en schéma et en texte, et le `CLAUDE.md` porte deux lignes qui demandent une reformulation et un désaccord motivé.

Le prompt de réalisation du [chapitre 4](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#ch4) suppose que vous savez ce que vous voulez obtenir. Trois situations le mettent en défaut : un sujet que vous connaissez mal, où vous ne savez pas encore quoi demander, un résultat qu’une autre personne devra lire sans avoir suivi la session, et vos propres mots, quand une dictée ou une phrase tapée vite les a changés. Ce chapitre donne un geste pour chacune.

> **⏭️ Vous pouvez sauter ce chapitre si…**
>
> Des personnes signalent que l’export PDF d’un rapport sort vide depuis hier, dans un module que vous ne connaissez pas. Sans code, la variante : une date d’un compte rendu que vous n’avez pas écrit ne correspond plus aux notes de la réunion. Écrivez votre premier prompt, pour l’un des deux cas. Écrivez votre réponse avant d’ouvrir la réponse attendue.
>
> **Voir la réponse attendue**
>
> Une réponse d’experte commence par se situer : sur un code qu’on connaît mal, le premier prompt demande un diagnostic, sans modification. Ce qui se passe probablement, les fichiers en jeu, et comment Claude l’a vérifié. Une fois la cause connue, le prompt de réalisation réunit quatre ingrédients ([section 4.7](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-7)) : le contexte (le fichier, le symptôme), le but, les contraintes et le critère de fin, par exemple un test qui échoue puis passe. Sur le compte rendu, même début : demander où le compte rendu et les notes divergent, ligne par ligne, sans rien réécrire. Le critère de fin de la correction : chaque date du compte rendu retrouvée dans les notes.
>
> Vous avez ces éléments ? Lisez seulement les encadrés « Quand la règle cède » et « La limite », puis faites le barreau ③ de l’exercice. Sinon, lisez le chapitre dans l’ordre : il est écrit pour vous.

### 12.1 Le diagnostic avant la correction

Sur un sujet que vous connaissez mal, une correction demandée trop tôt soigne souvent le symptôme et laisse la cause, qui revient ailleurs. Un bon prompt commence alors simplement : dites ce que vous voulez obtenir, avec vos mots, comme à une ou un collègue, et ne demandez pas tout de suite une correction. Demandez d’abord un diagnostic : ce qui se passe, pourquoi, quelles pistes existent, avec les fichiers et les sources que Claude a consultés. Vous choisissez ensuite la correction en connaissance de cause, et vous la faites vérifier. Le mode plan ([section 4.2](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-2)) est fait pour ce premier temps : Claude lit et propose, sans rien modifier.

**Tableau 12.1 :** Le même problème, à trois niveaux. Proposé par ce guide, d’après [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices).

| Si vous… | Ce que vous demandez | Exemple de prompt |
| --- | --- | --- |
| ne connaissez pas ce code | un diagnostic et des recherches, rien n’est modifié | « Le contrôle refuse le brouillon PASS-B-014 alors que ses dates me semblent justes. Ne modifie rien pour l’instant. Explique-moi ce qui se passe probablement, montre-moi les fichiers en jeu, et dis-moi comment tu l’as vérifié. » |
| le connaissez un peu | des options, puis votre choix | « Le contrôle refuse PASS-B-014. Cherche la cause dans l’extraction des dates, propose-moi deux corrections avec leurs risques, et attends mon choix avant de toucher au code. » |
| le connaissez bien | une consigne précise | « Le contrôle refuse PASS-B-014 : la date "1er décembre" n’est pas reconnue. Regarde extraire\_dates dans dates.py, écris un test qui échoue et reproduit le problème, puis corrige-le. » |

> **📏 La limite**
>
> Un diagnostic reste une hypothèse tant qu’un contrôle ne l’a pas confirmé : demandez toujours comment Claude l’a vérifié ([chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#ch5)).

### 12.2 Des visuels, un lecteur qui n’était pas là, et toujours le lien

Un rapport juste ne sert à rien si la personne qui le lit ne le comprend pas, ou doit chercher les fichiers qu’il cite. Cette section parle donc de la forme de ce que Claude vous rend, et de ce que vous transmettez ensuite à d’autres.

**Demander un visuel.** Une architecture, un parcours, un état ou une décision se lisent plus vite en schéma qu’en paragraphes. Demandez-le, avec trois exigences :

- un format texte : un diagramme [Mermaid](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-mermaid), qu’un outil dessine à partir d’une description écrite proche du Markdown [\[86\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-mermaid-intro), ou une figure SVG. Les deux se relisent dans un diff et se gardent dans le dépôt,
- un repli en texte : la même information en quelques lignes, pour qui lit dans un terminal, ne voit pas le schéma ou utilise un outil qui ne l’affiche pas,
- l’état dit par la couleur, une icône et un mot, jamais par la couleur seule. « ✓ Vérifié », « ⚠️ Non vérifié », « ⛔ Bloqué » se lisent encore en noir et blanc, et par qui ne distingue pas les couleurs. Les règles d’accessibilité du web le demandent : critère 1.4.1 des [WCAG](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-wcag) [\[87\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-wcag22).

Samia a demandé l’état de la vague de courriers pour la réunion du jeudi. Claude a rendu ce schéma, puis son repli en texte ([figure 12.1](https://gmag-dev.github.io/bien-demarrer-claude-code/12-diagnostiquer-rendre-lisible-reformuler.html#fig-12-1)).

*Dessin : L’état de la vague de courriers, pour la réunion du jeudi. Schéma : la description suit.*

**Figure 12.1 :** L’état de la vague de courriers. Chaque état porte une couleur, une icône et un mot : en vert vérifié, en ambre non vérifié, en rouge bloqué, en tirets le geste d’Odile. Schéma proposé par ce guide.

Le même état, en texte :

1. ✓ Vérifié : 41 brouillons, contrôle passé, remis à Odile, qui relit et tranche.
2. ⚠️ Non vérifié : 12 brouillons, dont le contrôle n’a pas encore été lancé.
3. ⛔ Bloqué : 7 courriers sans date lisible.

**Écrire pour une personne qui n’était pas là.** Un message, une note ou un rapport sera lu par quelqu’un qui n’a pas suivi la session. Ce guide propose trois règles, dans l’ordre de lecture :

- le résumé et le geste demandé d’abord : ce qui est vérifié, ce qui reste, ce que la personne qui lit doit faire et pour quand,
- le détail ensuite, pour qui veut vérifier : les preuves, les options écartées, l’historique,
- aucun mot propre à la session : un sigle interne, un fichier temporaire ou « comme convenu » n’ont de sens que pour qui était là.

Un rapport de sous-agent est une donnée, pas un livrable. Il s’adresse à la session qui l’a lancé : elle le vérifie ([section 15.3](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-3)), puis écrit pour la personne. **Toujours le lien** : chaque ressource citée porte son lien, le chemin complet d’un fichier, l’adresse d’une page, l’identifiant d’un commit. « Voir le rapport » sans lien envoie la personne chercher, et peut-être trouver le mauvais.

```text
Résume l'état de la vague de courriers pour Samia, qui n'a pas suivi la session.
D'abord ce qu'elle a à décider, et pour quand. Puis l'état de chaque lot, avec une icône, un mot et une couleur.
Ajoute un schéma Mermaid avec sa version en texte. Mets le chemin complet de chaque fichier cité.
```

Ce que Claude rend arrive souvent en Markdown, avec des tableaux et des schémas, que le terminal montre en texte brut. Les façons de le lire avec son rendu complet, leurs pour et leurs contre, sont à l’[annexe D](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-d-la-version-web.html#ann-d).

> **⚠️ Attention**
>
> Coller un fichier dans un site de rendu ou un éditeur en ligne, c’est l’envoyer à ce site, et certains liens de partage portent le contenu dans leur adresse. Ne le faites jamais pour du code, un document confidentiel ou une donnée de personne. Lisez le rendu sur votre poste ([annexe D](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-d-la-version-web.html#ann-d)).

**Tableau 12.2 :** La même demande, à trois niveaux. Proposé par ce guide.

| Si vous… | Ce que vous demandez | Pourquoi |
| --- | --- | --- |
| débutez | « Commence par ce que je dois faire. » Puis le lien de chaque fichier cité | vous agissez sans chercher |
| êtes à l’aise | un schéma Mermaid avec son repli en texte, les états en couleur, icône et mot, le résumé et le geste en tête | la même information se lit d’un coup d’œil, ou à l’oral |
| voulez aller plus loin | une forme fixe pour tout écrit qui sort de la session, inscrite dans un skill ([chapitre 21](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#ch21)), et une relecture à froid par une session neuve qui n’a pas suivi le travail ([chapitre 16](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#ch16)) | la forme ne dépend plus de votre mémoire |

> **📏 La limite**
>
> Un schéma clair peut être faux : il se relit contre le code ou les faits, comme un texte ([chapitre 16](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#ch16)).

### 12.3 Dictée, reformulation et contradiction

Une dictée vocale, une phrase tapée vite sur un téléphone ou un mot mal choisi peuvent changer ce qui sera fait, sans que vous le voyiez. Quand vos mots peuvent être faux, demandez donc à Claude de les reformuler avant d’agir. Demandez aussi à Claude de vous contredire quand il n’est pas d’accord, avec sa raison : une erreur de dictée ne doit pas devenir une décision.

Ce guide propose deux lignes de `CLAUDE.md` :

```text
Si un mot de ma demande est douteux et change ce que tu vas faire, ou avant un geste coûteux ou irréversible, reformule ma demande en une ligne et attends ma réponse.
Si tu n'es pas d'accord avec ma demande, dis-le avec ta raison avant d'agir.
```

Inès dicte sur son téléphone : « Retire la phrase sur le loyer du brouillon PASS-B-012. » La dictée écrit « foyer ». Claude répond : « Je comprends : retirer la phrase sur le foyer. Le brouillon n’en a pas, mais il a une phrase sur le loyer. Laquelle retirer ? » Puis Inès demande de couper la phrase qui fixe le délai, pour raccourcir. Claude n’est pas d’accord, et le dit : ce délai est une date du courrier, et le critère de fin demande de garder chaque date. Inès garde la phrase. Odile, à la relecture, trouve le brouillon plus clair avec elle.

Nouveau · 18 nov. 2026 **La voix, aussi comme atout.** La dictée n’est pas seulement un risque. À voix haute, on pense en parlant : on hésite, on se reprend, on change d’avis au milieu d’une phrase, et le vrai besoin peut apparaître là. Gardez donc les hésitations, et corrigez seulement les mots mal transcrits. Puis demandez à Claude ce qu’il a compris avant d’agir : sa reformulation fait le tri entre la pensée qui cherche et la demande qui reste. Pour que l’arrêt ne dépende pas d’une consigne, dictez en mode plan ([section 4.2](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-2)). 💡 Conseil : cet usage est une proposition de ce guide. Une reformulation en une ligne suffit pour un mot douteux, cinq lignes servent pour une réflexion à voix haute.

```text
Je réfléchis à voix haute : mes hésitations font partie de ma réflexion, ne les exécute pas. Reformule en cinq lignes au plus ce que tu as compris de ma demande, ce que j'ai écarté en chemin et ce qui reste à trancher. N'agis pas avant ma réponse.
```

Dans Claude Code, `/voice` active la dictée [\[88\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-voice-dictation). Par défaut, on garde `Espace` enfoncée pendant qu’on parle, et au relâchement Claude Code insère la transcription et attend que vous appuyiez sur `Entrée` : vous la relisez avant qu’elle parte [\[88\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-voice-dictation). Avec `/voice tap`, on appuie une fois pour commencer et une seconde fois pour envoyer : la transcription part seule dès qu’elle compte au moins trois mots [\[88\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-voice-dictation). Pour relire avant l’envoi, gardez donc le mode par défaut. La touche se change dans `~/.claude/keybindings.json` [\[88\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-voice-dictation). La transcription est réglée pour le vocabulaire du code, et le nom du projet et celui de la branche git lui sont donnés comme indices [\[88\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-voice-dictation). Sa langue suit le réglage `language`, que l’on change par `/config`, et le français fait partie des langues prises en charge [\[88\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-voice-dictation). La transcription ne consomme ni messages ni jetons, et ne compte pas dans les limites que montre `/usage` [\[88\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-voice-dictation).

Chez Passerelle, Inès dicte un soir dans Claude Code, seule à la permanence : « Pour PASS-C-068, fais le brouillon… non, attends. D’abord les délais, parce que la dernière fois… enfin, liste les délais, et le brouillon après. » Claude reformule : « Je comprends : lister d’abord les délais de PASS-C-068, puis écrire le brouillon. Vous avez écarté de commencer par le brouillon. Reste à trancher : vous avez commencé « parce que la dernière fois… » sans finir. Faut-il en tenir compte pour la liste ? » Inès répond : « Oui. La dernière fois, une date de rendez-vous manquait : liste aussi les rendez-vous. » Elle relit la liste avant la suite.

> **⚠️ Attention**
>
> Ce que vous dictez entre dans la session comme ce que vous tapez, et part en plus en audio : il est transcrit sur les serveurs d’Anthropic, pas sur votre poste [\[88\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-voice-dictation). La même règle vaut donc : ni nom d’usager, ni contenu confidentiel, ni donnée de client ou d’employeur. Le micro capte aussi les voix de la pièce : ne dictez pas quand une autre personne parle près de vous. C’est pourquoi Inès dicte seule.

> **💡 Conseil**
>
> Lisez la reformulation, en une ligne ou en cinq, avant de répondre « oui » : c’est elle, et non votre phrase dictée, que Claude va exécuter. Si elle ne dit pas ce que vous vouliez, corrigez-la en une phrase.

> **🔀 Quand la règle cède**
>
> - Les deux lignes du `CLAUDE.md` sont des consignes : Claude les suit presque toujours, sans garantie.
> - Ce qui tient : pour un geste qu’on ne défait pas, le mode Manual, où vous validez chaque modification et les commandes qui ne font pas que lire. Pour que l’arrêt avant d’agir ne dépende pas d’une consigne, le mode plan.
> - Pour `/voice`, il faut un compte Claude.ai : la dictée n’est pas disponible quand Claude Code passe par une clé d’API d’Anthropic, Amazon Bedrock, l’Agent Platform de Google Cloud ou Microsoft Foundry [\[88\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-voice-dictation). Il faut aussi un micro sur le poste : elle ne marche ni dans une session cloud ni par SSH [\[88\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-voice-dictation).
> - Pour aller plus loin : sections [1.4](https://gmag-dev.github.io/bien-demarrer-claude-code/1-ce-qu-est-claude-code.html#s1-4) et [4.2](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-2).

> **📌 À retenir**
>
> - Sur un sujet que vous connaissez mal, demandez le diagnostic avant la correction, et comment Claude l’a vérifié.
> - Le prompt de réalisation, avec ses quatre ingrédients, est à la [section 4.7](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-7). Il sert une fois la cause connue.
> - Un schéma avec son repli en texte, l’état en couleur, icône et mot. Le résumé et le geste demandé d’abord, le lien de chaque ressource toujours.
> - Quand vos mots peuvent être faux, demandez une reformulation en une ligne, et le désaccord avec sa raison.
> - Pensez à voix haute si cela vous aide, hésitations comprises, puis relisez la reformulation. Ne dictez rien de confidentiel : l’audio quitte le poste.

> **✏️ Exercice en trois barreaux**
>
> **Compétence visée** : demander un diagnostic avant une correction, puis faire rendre un état lisible par une personne qui n’était pas là. Comptez 25 à 40 minutes.
>
> **① Exemple travaillé.** Le contrôle refuse le brouillon `PASS-B-014`, et Bernard ne connaît pas la partie du code qui lit les dates. Il ne demande pas de correction. Il demande un diagnostic :
>
> ```text
> Le contrôle refuse le brouillon PASS-B-014 alors que ses dates me semblent justes. Ne modifie rien pour l'instant. Explique-moi ce qui se passe probablement, montre-moi les fichiers en jeu, et dis-moi comment tu l'as vérifié.
> ```
>
> Claude répond que la date « 1er décembre » n’est pas reconnue, montre la ligne qui cherche les dates, et dit l’avoir vérifié en relançant le contrôle sur une copie du brouillon où la date est écrite « 1 décembre », qui passe. `git status` ne montre aucun fichier modifié. Bernard écrit ensuite son prompt de réalisation ([section 4.7](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-7)), avec un test qui échoue d’abord. Puis Samia demande l’état de la vague pour la réunion du jeudi, avec la demande de la [section 12.2](https://gmag-dev.github.io/bien-demarrer-claude-code/12-diagnostiquer-rendre-lisible-reformuler.html#s12-2) : elle reçoit d’abord ce qu’elle a à décider, puis le schéma et son repli en texte, et le chemin complet de chaque fichier cité. **Pourquoi ?** Pourquoi Bernard n’a-t-il pas demandé tout de suite la correction ?
>
> **② À compléter.** Samia veut, pour la réunion des bénévoles, un résumé des remarques d’Odile sur les brouillons de la semaine. Amadou, qui sera absent, le lira seul le lendemain. La demande commence ainsi :
>
> ```text
> Résume les remarques d'Odile, qui sont dans relectures/semaine-46.md, pour la réunion des bénévoles de jeudi.
> ```
>
> Complétez-la pour qu’Amadou puisse agir sans avoir suivi la session : faites mettre en tête ce qu’il a à faire, demandez l’état de chaque brouillon en icône et en mot, et le lien de chaque fichier cité.
>
> **③ Sur votre projet.** Prenez un défaut ou une incohérence que vous ne comprenez pas encore. Demandez d’abord un diagnostic, sans modification, avec les fichiers en jeu et la façon dont Claude l’a vérifié, puis vérifiez par `git status` que rien n’a changé. Faites ensuite rendre l’état de votre travail pour une personne qui n’était pas là, avec un schéma et son repli en texte, et faites-le lire à cette personne.
>
> **Sans code** : les barreaux ① et ② se lisent et se complètent sur papier. Pour le barreau ③, demandez où un compte rendu et ses notes divergent, ligne par ligne, sans rien réécrire, puis faites résumer le document pour une personne absente.
>
> **Critère de réussite** : la demande de diagnostic et sa réponse, qui nomme les fichiers en jeu et la façon dont Claude a vérifié, `git status` sans fichier modifié après elle, et le résumé pour une personne absente : le geste demandé en tête, chaque fichier cité avec son chemin complet, un schéma avec son repli en texte, chaque état dit par un mot, et la remarque de la personne qui l’a lu. Par le chemin sans code, la liste des écarts entre le compte rendu et ses notes, le document inchangé, et le résumé qui commence par ce que la personne absente doit faire.
>
> **Voir le corrigé expliqué (après votre essai)**
>
> **①** Bernard connaît mal ce code : une correction demandée tout de suite aurait pu soigner ce brouillon et laisser la cause, qui aurait refusé le prochain « 1er » d’un autre courrier. Le diagnostic, vérifié par une copie qui passe, lui donne la cause. La correction vient ensuite, avec son test qui échoue d’abord. Le brouillon repart chez Odile, qui tranche.
>
> **②** Par exemple : « Commence par ce qu’Amadou doit faire, et pour quand. Puis, pour chaque brouillon, une ligne avec son numéro, l’état en icône et en mot (✓ Vérifié, ⚠️ Non vérifié, ⛔ Bloqué) et la remarque d’Odile, sans le nom d’aucune usagère ni d’aucun usager. Mets le chemin complet de chaque fichier cité. » Erreur fréquente : un résumé qui dit « voir le fichier des remarques » sans son chemin, ou des états dits par la seule couleur, illisibles en noir et blanc et au lecteur d’écran de Thomas.
>
> **③** Votre diagnostic nomme les fichiers en jeu et dit comment Claude l’a vérifié, et `git status` ne montre rien de modifié. Si la personne qui a lu votre résumé a dû vous demander quoi faire, le geste n’était pas en tête : corrigez la demande, pas seulement le résumé.

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/guide-en-une-page.html#toc)

![Illustration : la personne en long manteau violet et son petit compagnon de cristal cyan, éclairent d’un rayon trois pièges marqués de triangles d’alerte dans un atelier : une trappe, un câble emmêlé et une fausse porte.](https://gmag-dev.github.io/bien-demarrer-claude-code/images/f27673fa5907.avif)
