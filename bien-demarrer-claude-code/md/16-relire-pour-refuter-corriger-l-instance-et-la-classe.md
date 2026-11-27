> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.5.0 : « 16. Relire pour réfuter, corriger l’instance et la classe, capitaliser ».
>
> - Précédent : [15. Déléguer (partie 2 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/15-deleguer-2.md)
> - Suivant : [17. Le harnais en couches (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/17-le-harnais-en-couches-1.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#h-ch16>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## 16. Relire pour réfuter, corriger l’instance et la classe, capitaliser

> **🪪 Ce chapitre**
>
> **Pour qui** : la personne qui fait déjà relire son travail par un regard neuf ([section 5.4](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#s5-4)), et veut que la relecture trouve ce qui est faux, puis que chaque leçon reste apprise.
>
> **Sur quel poste** : n’importe lequel, avec Claude Code. Le relecteur de l’[annexe H](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-h-les-exemples-de-code-pieces-de-passerelle.html#ann-h) est un fichier d’agent à copier dans `.claude/agents/`. État décrit : la documentation de Claude Code 2.1.319 [\[1\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-changelog).
>
> **Ce que vous apprenez** : mener un [prémortem](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-premortem) et une analyse de cause jusqu’à la classe du défaut, puis ranger la leçon à la bonne hauteur et en tirer un [retour d’expérience](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-retour-d-experience).
>
> **Deux chemins** : si un encadré « Quand la règle cède » vous a envoyée ici, lisez la section qu’il cite, puis revenez à votre chapitre. Sinon, lisez le chapitre dans l’ordre, puis faites l’exercice.
>
> **Le fil rouge** 🌉 Passerelle : Odile signale un brouillon pas clair sur le délai. Avant de clore le lot 2, l’équipe suppose qu’une usagère a raté un délai à cause d’un brouillon, et le prémortem montre après coup que ce défaut était prévisible. Bernard corrige l’instance, puis la classe. Le lot 2 relu, Samia réunit l’équipe, Odile comprise, pour un retour d’expérience.
>
> **Où en est Passerelle** : en arrivant, les rapports des sous-agents se vérifient avant usage ([chapitre 15](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#ch15)). À la fin du chapitre, le brouillon fautif est corrigé et relu par Odile, le contrôle reconnaît les délais écrits en toutes lettres, un cas de régression garde la leçon, et un retour d’expérience écrit dit ce que l’équipe garde et change.

Un travail relu par la personne qui l’a écrit garde ses angles morts. Un défaut corrigé une fois revient s’il est corrigé à la main. Et une leçon dite en réunion se perd à la réunion suivante. Ce chapitre organise la relecture pour qu’elle cherche à réfuter, traite chaque défaut à deux niveaux, l’instance et la classe, et transforme chaque leçon en une règle qui ne se perd plus.

### 16.1 Un regard neuf contre l’ancrage

Faites relire par un regard qui n’a ni écrit le travail, ni lu votre conclusion. La [section 5.4](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#s5-4) a montré qu’un [sous-agent](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-sous-agent) neuf relit sans être influencé par le raisonnement qui a produit le code [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). La documentation des équipes d’agents décrit une autre forme du même biais, l’ancrage : une enquête menée pas à pas reste attirée par la première théorie explorée. Des enquêteurs indépendants, chargés chacun de réfuter les théories des autres, font émerger la cause qui survit [\[111\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-agent-teams).

Vous n’avez pas besoin d’une équipe pour appliquer l’idée. Deux ou trois sous-agents en lecture seule, chacun avec une hypothèse différente et la consigne de chercher ce qui la contredit, suffisent souvent. Chez Passerelle, Bernard se demande pourquoi le brouillon `PASS-B-047` a été signalé par Odile comme « pas clair sur le délai ». Il lance deux sous-agents. Le premier part de l’hypothèse « le skill coupe mal les phrases longues », le second de « le contrôle ne voit pas un délai écrit en toutes lettres ». Chacun doit chercher ce qui contredit la sienne. Le premier la réfute : la phrase en cause est courte. Le second ne la réfute pas, et cite la ligne du courrier.

> **💡 Conseil**
>
> Donnez aux relecteurs les mêmes fichiers, mais pas votre conclusion. Un regard neuf cesse de l’être dès qu’il lit votre verdict.

### 16.2 Le prémortem

Avant de livrer, supposez que le lot a déjà échoué, et cherchez pourquoi. Gary Klein propose le prémortem : avant de lancer un projet, l’équipe suppose qu’il vient d’échouer, puis produit les raisons plausibles de cet échec [\[119\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-klein-2007). Ce guide y voit l’intérêt d’un changement de question : au lieu de « qu’est-ce qui pourrait mal tourner ? », on demande « qu’est-ce qui a mal tourné ? ».

Appliqué à une livraison, ce guide propose de faire écrire par un sous-agent neuf, avant le commit, les raisons pour lesquelles le lot « a échoué », puis de vérifier chacune dans le code. Chez Passerelle, la question est concrète, et l’équipe la pose avant de clore le lot 2, au milieu de la vague :

```text
Utilise un sous-agent en lecture seule. Suppose que, le mois prochain, une usagère de
Passerelle a raté un délai à cause d'un brouillon du lot PASS-C-046 à PASS-C-060.
Liste les cinq raisons les plus plausibles, chacune avec le fichier et la ligne
du code, du skill ou d'un brouillon qui la rendent possible. Ne corrige rien.
```

Le sous-agent rend cinq raisons. Bernard les vérifie une à une. Quatre ne tiennent pas : le fichier cité ne fait pas ce que la raison suppose. La troisième tient : le contrôle reconnaît les dates et les délais écrits en chiffres, comme « dans les 15 jours » ([section 14.8](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-8)), mais pas « sous huitaine » ni « dans les quinze jours ». C’est le défaut du brouillon `PASS-B-047`, qu’Odile avait signalé en relisant ([section 16.1](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#s16-1)) : le délai « sous huitaine » du courrier y est devenu « rapidement », et le contrôle est resté vert. Personne n’a raté de délai, grâce à sa relecture. Le prémortem ne l’a pas découvert : il montre après coup que ce défaut était prévisible, et qu’il pouvait toucher d’autres brouillons du lot. C’est l’objet de la [section 16.4](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#s16-4).

Le prémortem appartient à une famille plus large : élargir les options avant de choisir. Une idéation outillée, qui fait produire des options sous plusieurs angles avant d’en garder une, et garde la trace des idées écartées, sert aussi avant un choix de conception. Ce guide la mentionne sans la détailler : la règle reste de vérifier chaque idée retenue, comme chaque raison d’un prémortem.

### 16.3 Réfuter par défaut

Demandez au relecteur de chercher ce qui est faux, pas de confirmer que tout va bien. Ce guide propose une discipline de relecture en cinq points :

1. le relecteur reçoit la spécification et le livrable, pas la conversation,
2. ses outils sont limités à la lecture par la définition de l’agent, une borne que le harnais applique [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents),
3. il lit les artefacts avant les conclusions de l’auteur,
4. il classe ses constats par gravité, et chaque constat cite un fichier et une ligne,
5. la personne qui a produit le travail répond constat par constat. Un constat rejeté l’est avec sa raison écrite.

L’[annexe H](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-h-les-exemples-de-code-pieces-de-passerelle.html#ann-h) donne un tel relecteur, `exemples/agent/relecteur-adversarial.md`. Son en-tête limite ses outils à la lecture, en [liste blanche](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-liste-blanche) :

```yaml
---
name: relecteur-adversarial
description: Relecteur adversarial en lecture seule. À utiliser après une modification et avant un commit, quand on veut une relecture indépendante qui cherche à réfuter le travail (bogues, cas oubliés, affirmations non prouvées) plutôt qu'à le valider. Rend un rapport classé par gravité, sans rien modifier.
tools: Read, Grep, Glob
model: sonnet
---
```

Un relecteur dont le champ `tools` ne liste que `Read`, `Grep` et `Glob` ne peut pas modifier un fichier, quoi qu’il décide [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents) : cette borne tient [par construction](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-par-construction). Sa méthode commence par la règle qui protège de l’ancrage : lire le code, les tests et la documentation avant le résumé de l’auteur.

**Tableau 16.1 :** Les niveaux de gravité d’un constat, d’après le relecteur de l’[annexe H](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-h-les-exemples-de-code-pieces-de-passerelle.html#ann-h). Les deux dernières colonnes sont une proposition de ce guide.

| Gravité | Sens | Suite donnée |
| --- | --- | --- |
| P0 bloquant | le livrable est faux ou dangereux | on corrige avant tout commit, une fois le constat confirmé par un oracle ou par la personne |
| P1 important | un défaut réel, sans danger immédiat | on corrige dans le lot, ou on le note avec sa raison |
| P2 mineur | une amélioration possible | on décide, et on note la décision |

Un relecteur à qui l’on demande des problèmes en trouvera toujours, et corriger chaque remarque ajoute des couches d’abstraction et des tests pour des cas impossibles [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Demandez les constats qui touchent la justesse, et une preuve pour chacun. À l’inverse, une absence de constat n’est pas une preuve de qualité : le rapport dit aussi ce qui n’a pas été relu. Chez Passerelle, un constat P0 se reconnaît vite : tout ce qui peut faire perdre un délai ou un montant à une usagère.

### 16.4 L’analyse de cause : l’instance et la classe

Quand un défaut est trouvé, corrigez-le, puis demandez-vous ce qui l’a laissé passer. La première correction répare ce cas, la seconde empêche les suivants. Si vous connaissez mal le sujet, demandez d’abord à Claude de reconstituer la chaîne des « pourquoi », sans rien corriger, et relisez-la avec lui.

**Tableau 16.2 :** Corriger l’instance et la classe. Proposé par ce guide, d’après [\[120\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sre-postmortem-culture) et [\[95\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-demystifying-evals).

| Correction | Question | Chez Passerelle 🌉 |
| --- | --- | --- |
| Instance | qu’est-ce qui est faux ici ? | le brouillon `PASS-B-047` redit « sous huitaine », puis repasse le contrôle et la relecture d’Odile |
| Classe | quel mécanisme a laissé passer ce défaut, et quel contrôle l’aurait arrêté ? | le contrôle reconnaît les délais écrits en toutes lettres, une exigence [EARS](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-ears) les nomme, et un cas de régression synthétique couvre « sous huitaine » |

Le livre de Google sur l’ingénierie de la fiabilité définit le postmortem comme un écrit sur un incident : son impact, les actions menées pour le résoudre, ses causes, et les actions préventives qui réduisent la probabilité ou l’impact d’une récidive. Il est sans reproche : il suppose la bonne intention de chaque personne [\[120\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sre-postmortem-culture). Pour trouver la classe, on remonte la chaîne des « pourquoi » jusqu’à un mécanisme que l’on peut changer, une règle, un gabarit, un contrôle, une porte, jamais jusqu’à une personne. Chez Passerelle, la chaîne ne s’arrête pas sur Odile, qui a d’ailleurs signalé le brouillon : elle s’arrête sur l’exigence qui ne nommait pas les délais en toutes lettres.

*Dessin : La chaîne des « pourquoi » du brouillon PASS-B-047. Schéma : la description suit.*

**Figure 16.1 :** La chaîne des « pourquoi » du brouillon `PASS-B-047`. En rouge le défaut, en bleu les questions, en gris les réponses, en vert le mécanisme à changer, en tirets le rôle d’une personne. La correction de classe s’arrête sur un mécanisme, jamais sur une personne. Proposé par ce guide, d’après [\[120\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sre-postmortem-culture).

La même chaîne, en texte :

1. Le défaut : « sous huitaine » est devenu « rapidement » dans le brouillon `PASS-B-047`.
2. Pourquoi le contrôle est-il resté vert ? Il ne cherche que les dates et les délais écrits en chiffres.
3. Pourquoi ceux-là seulement ? L’exigence ne nommait pas les délais en toutes lettres.
4. Pourquoi l’exigence les oubliait-elle ? Le jeu synthétique n’avait aucun cas de ce genre.
5. Le mécanisme à changer : l’exigence, le contrôle, et un cas limite nommé dans le générateur. Pas une personne : la relecture d’Odile a signalé le défaut.

Ce guide considère la [correction de classe](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-correction-de-classe) terminée quand un oracle la porte : un test, un contrôle avant commit, une règle `deny`, ou un script qui échoue quand une rubrique obligatoire d’un gabarit est vide. Chez Passerelle, elle est terminée quand le test du cas « sous huitaine » a été vu rouge, puis vert, et qu’il tourne dans la suite.

**Tableau 16.3 :** Le même défaut, un délai perdu, à trois niveaux. Proposé par ce guide.

| Si vous… | Faites | Pourquoi |
| --- | --- | --- |
| débutez | « Explique-moi pourquoi ce délai a disparu du brouillon PASS-B-047, et à quelle étape l’erreur est entrée. Ne corrige rien. » | le diagnostic avant la correction |
| êtes à l’aise | vous corrigez l’instance, puis la classe : le contrôle reconnaît les délais en toutes lettres, et la classe sera fermée quand un test le prouvera | le défaut ne revient pas par la même porte |
| voulez aller plus loin | la correction de classe portée par un oracle, un cas de régression, et la leçon rangée à sa hauteur ([section 16.5](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#s16-5)) | la leçon devient une règle imposée |

> **📏 La limite**
>
> La chaîne des « pourquoi » a souvent plusieurs branches. En suivre une seule laisse les autres ouvertes : notez celles que vous n’avez pas suivies, et pourquoi.

### 16.5 Capitaliser une leçon

Une leçon apprise tient d’autant mieux que ce qui la porte est solide. Une correction dans la conversation se perd à la compaction ou au `/clear`. Une ligne de `CLAUDE.md` devient une consigne, suivie la plupart du temps : ajoutez-la dès qu’il a fallu corriger deux fois la même chose [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Quand la règle ne souffre aucune exception, confiez-la à un contrôle déterministe, un hook par exemple [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Et pour que la leçon ne se perde plus, gardez-en un cas de régression : si le défaut revient, la suite échoue [\[95\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-demystifying-evals).

Le [chapitre 6](https://gmag-dev.github.io/bien-demarrer-claude-code/6-choisir-ses-extensions.html#ch6) donne le déclencheur de chaque extension.

### 16.6 Prendre du recul, faire relire, tirer le retour d’expérience

Prenez du recul à des moments fixes, sans attendre qu’on vous le demande, et commencez chaque fois par relire ce que le projet a déjà écrit. Ce guide propose quatre moments : avant de présenter un plan, avant de dire qu’un lot est prêt, à chaque point d’étape, et après un incident. Le premier geste est de relire les décisions, les retours d’expérience et la [définition du fini](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-definition-du-fini) du projet : la réponse y est souvent déjà, et une conclusion qui les contredit se voit tout de suite. Le second est de se demander ce qui manque au plan, pas seulement ce qui y est. Ces moments peuvent se demander à Claude par une ligne de `CLAUDE.md` : une consigne, qui se vérifie comme les autres.

**La [revue experte](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-revue-experte) se dimensionne par la destination.** Un document qui reste dans l’équipe passe par un regard neuf, une fois. Un livrable qui sort, un rapport, un guide, une spécification remise à d’autres, passe par une revue adversariale plus large, avant d’être dit prêt, et seulement sans constat bloquant ouvert. La revue est demandée par la personne qui livre, de sa propre initiative, pas par celle qui reçoit. L’[annexe E](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-e-gabarits.html#ann-e) donne un gabarit de revue.

**Le retour d’expérience** se tient après un lot ou un incident, sans reproche, et tient en quatre questions : qu’attendions-nous, que s’est-il passé, pourquoi l’écart, et que garder ou changer. Chaque réponse à la dernière question devient une leçon, rangée à sa hauteur comme le dit la [section 16.5](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#s16-5). Une fois par mois, ou avant un nouveau lot, relisez les derniers retours d’expérience, et listez les leçons devenues des règles et celles qui ont été manquées. Une leçon écrite deux fois sans être appliquée demande un mécanisme plus solide.

Chez Passerelle, le lot 2 relu, Samia réunit Bernard, Inès, Amadou et Odile. Le retour d’expérience tient sur une page. Attendu : les quinze brouillons du lot, justes du premier coup. Constaté : treize, et deux repris après la relecture d’Odile. L’écart : les délais en toutes lettres, qu’Odile a signalés et que le prémortem a expliqués, et un mot du lexique, « forclusion », que le skill gardait sans l’expliquer. À garder : le prémortem avant la fin d’un lot. À changer : Odile demande que chaque brouillon repris lui revienne avec la phrase qu’elle avait signalée, pour qu’elle voie ce qui a changé. Sa demande devient une exigence EARS, et un test. En relisant le retour d’expérience du lot 1, Inès trouve une leçon déjà écrite et jamais appliquée : relire le lexique à chaque changement de règle. Elle passe dans le skill.

Les pratiques de cette section sont des propositions de ce guide : elles ne s’appuient pas sur une mesure publiée, et leur valeur se juge sur vos propres retours d’expérience.

> **📌 À retenir**
>
> Avant de relire la liste, répondez de mémoire, puis vérifiez votre réponse dans la section indiquée :
>
> 1. Que faites-vous de chaque raison rendue par un prémortem avant de la garder, et combien des cinq raisons du lot de Passerelle ont tenu ? ([section 16.2](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#s16-2))
> 2. Jusqu’où remonte la chaîne des « pourquoi », et quand la correction de classe est-elle terminée ? ([section 16.4](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#s16-4))
>
> - Le relecteur reçoit la spécification et le livrable, pas la conversation. Il cherche à réfuter, et ses outils sont en liste blanche.
> - Le prémortem suppose l’échec, puis vérifie chaque raison dans le code.
> - Chaque constat cite un fichier et une ligne. Chaque rejet a sa raison écrite.
> - Deux corrections, toujours : l’instance et la classe. La correction de classe est terminée quand un oracle la porte.
> - Une leçon qui se répète demande un mécanisme plus solide.
> - Du recul à des moments fixes, une revue à la mesure de la destination, et un retour d’expérience après chaque lot, relu avant le suivant.

> **✏️ Exercice**
>
> **Compétence visée** : mener un prémortem et une analyse de cause jusqu’à la classe, puis ranger la leçon. Comptez 30 à 45 minutes.
>
> **Sur Passerelle.** Dans votre copie de Passerelle, lancez Claude Code en [mode Manual](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-mode-manual), par `claude --permission-mode manual`, et faites le prémortem de la [section 16.2](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#s16-2) sur dix brouillons. Vérifiez chaque raison rendue dans le fichier cité, et gardez celle qui tient. Écrivez son analyse en une page : ce qui s’est passé, la chaîne des « pourquoi », le mécanisme en cause. Livrez la correction d’instance, la correction de classe et le cas de régression, puis faites relire le tout par le relecteur de l’[annexe H](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-h-les-exemples-de-code-pieces-de-passerelle.html#ann-h), et répondez à chacun de ses constats. Le brouillon corrigé retourne à la relectrice, qui tranche : notez sa décision.
>
> **Sur votre projet.** Prenez un défaut réel corrigé récemment, et refaites l’analyse jusqu’à la classe, puis rangez la leçon à sa hauteur ([section 16.5](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#s16-5)).
>
> **Sans code** : sur papier, écrivez la chaîne des « pourquoi » d’un défaut de votre travail, sans code, par exemple un courriel parti avec une mauvaise date, jusqu’à un mécanisme que vous pouvez changer, puis la forme que vous donnez à la leçon.
>
> **Critère de réussite** : une analyse d’une page, une chaîne qui s’arrête sur un mécanisme et non sur une personne, la correction d’instance et la correction de classe, le cas de régression vu rouge puis vert, et la forme donnée à la leçon, avec sa raison. Par le chemin sans code : la chaîne des « pourquoi » écrite, qui s’arrête sur un mécanisme que vous pouvez changer et non sur une personne, et la forme donnée à la leçon, avec sa raison.
>
> **Pour vous corriger**, sans corrigé : relisez votre travail contre ces cinq points. Chacun se voit dans ce que vous avez écrit ou obtenu.
>
> 1. Chaque raison du prémortem que vous gardez a été vérifiée dans le fichier cité, et ce fichier fait bien ce que la raison suppose ([section 16.2](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#s16-2)).
> 2. Votre chaîne des « pourquoi » s’arrête sur un mécanisme que vous pouvez changer, une règle, un gabarit, un contrôle, une porte, et jamais sur une personne ([section 16.4](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#s16-4)).
> 3. Votre correction de classe est portée par un oracle, un test, un contrôle avant commit, une règle `deny` ou un script, et son cas de régression a été vu rouge, puis vert, et tourne dans la suite ([section 16.4](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#s16-4)).
> 4. Chaque constat du relecteur a sa réponse, et chaque constat rejeté l’est avec sa raison écrite ([section 16.3](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#s16-3)).
> 5. La leçon a sa raison : une règle qui ne souffre aucune exception est confiée à un contrôle qui l’impose, pas à une simple consigne, et le défaut corrigé garde son cas de régression ([section 16.5](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#s16-5)).
>
> Par le chemin sans code, appliquez le deuxième point à votre chaîne, puis le cinquième à la leçon que vous en tirez.

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/guide-en-une-page.html#toc)

![Illustration : la personne en long manteau violet et son petit compagnon de cristal cyan, devant un noyau lumineux entouré d’anneaux de boucliers concentriques, chacun d’un néon différent, aux portes alignées.](https://gmag-dev.github.io/bien-demarrer-claude-code/images/7660c4091baf.avif)
