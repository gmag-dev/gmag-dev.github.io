> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.2.0 : « 20. Piloter sa consommation et son projet », partie 1 sur 2.
>
> - Précédent : [19. Plusieurs sessions en parallèle](https://gmag-dev.github.io/bien-demarrer-claude-code/md/19-plusieurs-sessions-en-parallele.md)
> - Suivant : [20. Piloter sa consommation et son projet (partie 2 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/20-piloter-sa-consommation-et-son-projet-2.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-ch20>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## 20. Piloter sa consommation et son projet

> **🪪 Ce chapitre**
>
> **Pour qui** : les personnes qui lisent déjà `/usage` ([chapitre 9](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch9)) et veulent prévoir avant un lot lourd, puis tenir les décisions d’un projet sans en perdre une.
>
> **Sur quel poste** : un abonnement Pro, Max ou Ultra pour les barres du forfait. Un compte Team ou Enterprise lit d’abord la [section 20.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s20-1). Les formules se calculent à la main ou dans un tableur, sans rien installer. État décrit : la documentation de Claude Code 2.1.318 [\[1\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-changelog).
>
> **Ce que vous apprenez** : tirer de deux lectures datées l’[allure](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-allure), l’écart, la pente et la projection, en tirer vos propres seuils, dire quand un backlog sera vide par deux dates, [P50 et P80](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-p50-p80), et tenir les décisions d’un projet dans un journal daté.
>
> **Deux chemins** : si un encadré « Quand la règle cède » vous a envoyée ici, lisez la section qu’il cite, puis revenez à votre chapitre. Sinon, lisez le chapitre dans l’ordre, puis faites l’exercice.
>
> **Le fil rouge** 🌉 Passerelle : Bernard lit l’état du forfait avant chaque lot de la vague, et note le backlog des types de courriers pour dire quand la vague sera traitée. 🏛️ Le Cahier commun : Mei pose les jalons de la consultation jusqu’au conseil municipal, et vérifie que le retour aux habitants tient avant.
>
> **Où en est Passerelle** : en arrivant, trois sessions se coordonnent par une trace écrite et un seul écrivain par fichier, et une nuit de rédaction a eu lieu, avec son rapport ([chapitre 19](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch19)). À la fin du chapitre, Passerelle a une semaine de relevés, ses propres seuils avec leur raison, un backlog estimé en P50 et P80, et un journal avec deux décisions.

Le [chapitre 9](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch9) a posé les bases : les deux compteurs d’un forfait, le lissage sur la semaine, la lecture de `/usage` et les habitudes qui économisent. Ce chapitre ne les répète pas. Il montre où lire les chiffres que Claude Code expose, comment en tirer quelques grandeurs simples, et comment en tirer vos propres seuils et le coût d’un lancement. Ses dernières sections passent de la consommation au projet : un backlog et ses jalons, un journal des décisions, et ses rendez-vous. Les formules sont données sous forme générale. Toutes les valeurs chiffrées sont des exemples, à calibrer sur votre propre usage.

### 20.1 Pour qui c’est valable

Sur un abonnement Pro, Max ou Ultra, deux sources donnent vos chiffres de forfait : `/usage`, sans rien installer, et la ligne d’état avec ses champs `rate_limits`, une fois son script configuré ([section 18.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s18-4)). `/context` dit ce qui occupe la fenêtre de contexte, pas le forfait. Les formules de ce chapitre s’appliquent aux deux premières. Sur Ultra, sans fenêtre de cinq heures ([section 9.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s9-1)), seules les formules de la semaine s’appliquent [\[70\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-usage-limits).

Le détail dépend du compte. Les champs `rate_limits` de la ligne d’état n’existent que sur les abonnements Pro, Max et Ultra, ou derrière une passerelle, un service que l’organisation place entre Claude Code et l’API et qui fixe un plafond de dépense. Ils n’apparaissent qu’après la première réponse de l’API dans la session [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-statusline). `/usage` affiche les barres du forfait sur Pro, Max et Ultra. Sur Team et Enterprise, la page consultée ne promet que la répartition de l’usage [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-costs). 🟡 À vérifier sur votre compte.

**Tableau 20.1 :** Ce qui fonctionne selon le compte, d’après [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-statusline), [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-costs), [\[8\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-data-usage) et [\[140\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-monitoring-usage).

| Source | Abonnement personnel (Pro, Max, Ultra) | Compte Team ou Enterprise |
| --- | --- | --- |
| ligne d’état, champs `rate_limits` | oui, après la première réponse de l’API | non, sans passerelle à plafond |
| `/usage` | oui | la répartition est documentée. Les barres du forfait : 🟡 À vérifier sur votre compte |
| `/context` | oui | oui |
| transcriptions locales | oui, sur votre machine | oui, et elles suivent la classification de leur contenu ([chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23)) |
| export OpenTelemetry | oui, si vous l’activez | selon l’organisation : des réglages gérés peuvent en fixer la destination |
| anneau d’usage de l’application de bureau | oui, sous la zone de saisie : l’usage du forfait, partagé entre toutes les surfaces [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-desktop). L’outil `get_usage` de la [section 20.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s20-3), lui, n’est pas documenté | la page ne distingue pas les forfaits. 🟡 À vérifier sur votre compte |

**Pourquoi piloter, plutôt que regarder.** Le [chapitre 9](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch9) conseille de regarder `/usage` chaque jour. Regarder dit où vous en êtes. Piloter dit où vous allez, et quoi faire avant le prochain lot lourd. Il suffit pour cela de deux lectures datées et de quelques soustractions.

> **💡 Conseil**
>
> Sur un compte de l’employeur et un poste géré, si l’organisation active `allowManagedHooksOnly`, la ligne d’état personnalisée disparaît sans avertissement : seule une ligne d’état venue des réglages gérés s’exécute [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-statusline) [\[32\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings-reference). La source réaliste est alors `/usage`, relevé à la main, par exemple le matin, à midi et le soir, si votre compte y affiche les barres du forfait. Les formules de ce chapitre restent valables. Seule leur automatisation par la ligne d’état ne l’est plus.

### 20.2 Les sources documentées

Au début, une seule source suffit : `/usage`, que vous lisez à la main. Sur Pro, Max et Ultra, la ligne d’état, une fois configurée, affiche la part utilisée de vos fenêtres, et l’export OpenTelemetry, un format standard pour envoyer des mesures à un autre outil, sert si vous voulez automatiser. Le [tableau 20.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#tab-20-2) dit ce que chacune permet, et ce qu’elle ne dit pas.

**Tableau 20.2 :** Les sources documentées de chiffres et de métadonnées, d’après [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-statusline), [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-costs), [\[8\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-data-usage) et [\[140\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-monitoring-usage).

| Source | Ce qu’on y lit | Limites |
| --- | --- | --- |
| ligne d’état | le JSON envoyé au script : modèle, dossier, part de la fenêtre de contexte, et dans `rate_limits` le pourcentage utilisé et l’heure de remise à zéro des fenêtres de cinq heures (`five_hour`) et de sept jours (`seven_day`) | Pro, Max et Ultra, ou derrière une passerelle à plafond, seulement. Chaque fenêtre peut manquer, et une fenêtre est retirée dès que son `resets_at` est passé |
| `/usage` | les barres du forfait, une répartition de l’usage récent par skill, sous-agent, plugin et serveur MCP, des recommandations | les chiffres de la répartition sont approximatifs. Ses barres, là où elles s’affichent, comptent tout l’usage du compte. Partout, sa répartition et ses recommandations ne comptent que cette machine |
| `/context` | ce qui occupe la fenêtre de contexte : consignes, conversation, fichiers, outils | une photographie de la session courante, pas du forfait |
| `cost.total_cost_usd` (ligne d’état) | le coût de la session au prix catalogue | une estimation, différente de la facture |
| transcriptions locales | chaque session, en clair, sous `~/.claude/projects/` | effacées après 30 jours par défaut |
| export OpenTelemetry | des métriques et des événements : sessions, jetons, coût estimé, décisions d’outils | à activer. Aucune métrique de limite de forfait documentée |

**La portée de `/usage`, partie par partie.** Les barres du forfait comptent tout l’usage du compte, mais la répartition et les recommandations ne comptent que l’historique de cette machine : l’usage d’autres appareils ou de claude.ai n’y figure pas, alors qu’il compte sur le même forfait [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-costs) [\[70\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-usage-limits). `/cost`, comme `/stats`, est un alias de `/usage` [\[67\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-commands).

**Les transcriptions locales.** Chaque session est enregistrée en clair sous `~/.claude/projects/` et conservée 30 jours par défaut. La clé `cleanupPeriodDays` règle ce délai. Les sessions démarrées ou reprises en dernier dans l’application de bureau ou dans [Cowork](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-cowork) sont exemptées de cette limite par défaut [\[8\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-data-usage). Ce guide déconseille de bâtir un outil durable sur le format interne de ces fichiers, que la documentation ne présente pas comme une interface stable.

**L’export OpenTelemetry.** Il s’active par `CLAUDE_CODE_ENABLE_TELEMETRY=1`, puis par un exportateur par signal : `OTEL_METRICS_EXPORTER` (`otlp`, `prometheus`, `console`) et `OTEL_LOGS_EXPORTER` (`otlp`, `console`). Il émet notamment le nombre de sessions, les jetons et un coût estimé, que la page dit approché. Les invites et les paramètres d’outils sont masqués par défaut, mais l’adresse électronique du compte est incluse quand elle est disponible. Des réglages gérés peuvent fixer la destination de l’export [\[140\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-monitoring-usage). La page consultée ne documente aucune métrique de limite de forfait : l’export complète la ligne d’état et `/usage`, il ne les remplace pas.

### 20.3 L’usage dans l’application de bureau, et un accès non documenté

Si vous débutez, vous pouvez passer cette section. Dans l’application de bureau, la ligne d’état ne s’affiche pas forcément : la documentation la décrit dans l’interface du terminal [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-statusline). La voie documentée y est l’anneau d’usage, sous la zone de saisie : un clic montre l’usage du forfait, partagé entre toutes les surfaces de Claude Code [\[29\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-desktop). Ce guide signale en plus un accès que l’application offre à la session, parce qu’il sert à mesurer.

L’application met à la disposition de la session un outil de gestion de session, nommé `get_usage` à la date de l’observation, le 2 novembre 2026, qui renvoie l’usage du forfait. Il ne figure dans aucune page publique de la documentation consultée. On y lit la fenêtre de cinq heures, la ou les fenêtres de la semaine, chacune avec son pourcentage et sa remise à zéro, et l’état des crédits d’usage : la part utilisée, la somme dépensée et la limite du mois. Cette forme a été relevée dans l’application le 24 octobre 2026. Ces deux dates sont propres à cette section, parce que l’outil n’a pas de page de documentation qui le date.

> **⚠️ Attention**
>
> S’appuyer sur un outil non documenté. Son nom et sa forme peuvent changer à n’importe quelle version, sans annonce. Vérifiez la forme de la réponse avant chaque calcul, et gardez toujours le repli sur `/usage`. Il n’existe que dans l’application de bureau : ni le terminal ni l’extension VS Code ne le garantissent. Chaque lecture est un appel d’outil, qui coûte un peu de contexte, et une tâche planifiée qui le lit consomme le forfait à chaque exécution. Citez chaque lecture avec son heure, et ne faites reposer aucun contrôle bloquant sur lui. Sur un compte de l’employeur, sa présence n’a pas été vérifiée.

### 20.4 Allure, écart, pente, projection

Pour savoir si vous consommez trop vite, comparez deux pourcentages : la part de la fenêtre déjà utilisée, et la part du temps déjà écoulé, que ce guide appelle l’allure. Si vous avez utilisé 45 % alors que 60 % du temps est passé, vous êtes en réserve. Si c’est l’inverse, ralentissez. Les formules qui suivent rendent ce coup d’œil exact, et y ajoutent la vitesse à laquelle vous consommez.

Notez *u* le pourcentage utilisé d’une fenêtre, *r* l’instant de sa remise à zéro, *t* l’instant de la lecture et *H* la durée de la fenêtre, cinq heures pour la limite de cinq heures. La fenêtre de cinq heures démarre au premier message et se remet entièrement à zéro cinq heures plus tard [\[70\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-usage-limits). Les grandeurs sont d’usage courant : une comparaison à une droite, et une extrapolation linéaire.

```text
part écoulée        f = (H − (r − t)) / H, bornée entre 0 et 1
allure              a = 100 × f (en %)
écart               e = u − a (en points, positif : en avance sur l'allure)
pente               s = (u(t) − u(t0)) / (t − t0) (en points par heure)
                    t0 : une lecture précédente de la même fenêtre (même r),
                    assez ancienne pour que la différence ait un sens
projection en r     P = u + max(s, 0) × (r − t)
temps avant 100 %   T = (100 − u) / s si s > 0, sinon « non atteint »
```

Chez Passerelle, Bernard relève la fenêtre avant le lot 4 de la vague ([tableau 20.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#tab-20-3)). Les valeurs sont inventées pour ce guide.

**Tableau 20.3 :** Deux lectures d’une fenêtre de cinq heures, de 9 h à 14 h. Valeurs d’exemple.

| Lecture | Heure | Utilisé *u* | Part écoulée *f* | Allure *a* | Écart *e* |
| --- | --- | --- | --- | --- | --- |
| précédente | 11 h 30 | 33 % | 0,5 | 50 % | −17 points |
| actuelle | 12 h 00 | 45 % | 0,6 | 60 % | −15 points |

L’écart est négatif : Bernard est en réserve. Mais la pente vaut 24 points par heure, la projection à la remise à zéro 93 %, et le temps avant 100 %, environ 2 h 17, dépasse à peine les deux heures restantes. Cette projection appelle la prudence malgré un écart en réserve : c’est l’intérêt de lire la pente, et pas seulement le niveau. Une lecture ne vaut que pour la fenêtre où elle a été faite : citez-la toujours avec son heure.

**Tableau 20.4 :** Le même coup d’œil, à trois niveaux. Proposé par ce guide.

| Si vous… | Faites | Pourquoi |
| --- | --- | --- |
| débutez | une lecture et l’heure, comme dans l’ouverture de cette section | l’écart dit déjà si vous êtes en avance ou en réserve |
| êtes à l’aise | deux lectures datées, d’où la pente, en points par heure | la vitesse prévient avant que le niveau ne le dise |
| voulez aller plus loin | la projection à la remise à zéro, le temps avant 100 % et vos propres seuils ([section 20.6](https://gmag-dev.github.io/bien-demarrer-claude-code/#s20-6)) | une décision se prend sur ce qui va arriver, pas sur ce qui est arrivé |

> **📏 La limite**
>
> La projection suppose que vous continuerez au même rythme. Un lot lourd lancé après la lecture la rend fausse : relisez la fenêtre à la fin du lot.

### 20.5 L’étalement sur la semaine et le mois

Le [chapitre 9](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch9) conseille de viser environ un septième de la limite de la semaine par jour ([section 9.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s9-2)). Une semaine ne s’emprunte pas sur la suivante, puisque chaque semaine se remet à zéro : étaler le mois revient à étaler chaque jour. L’unité proposée ici est le point de semaine, soit 1 % de la limite de la semaine.

```text
budget de semaine   B (en % de la limite, moins de 100 pour une réserve)
allocation du jour  A = B / 7 (ou B / 5 si d compte les jours ouvrés, de 0 à 5)
début de semaine    W0 = remise à zéro de la semaine − 7 jours
jours écoulés       d = (t − W0) en jours, de 0 à 7
cible lissée        c = A × d
écart de semaine    g = u_semaine − c
reste du jour       A × (jours écoulés à la fin du jour) − u_semaine
```

Valeurs d’exemple. Avec un budget de 90 %, l’allocation vaut 12,86 points par jour. Après deux jours et demi, la cible lissée vaut 32,1 %. Si la semaine affiche 40 %, l’écart est de +7,9 points : vous êtes en avance, et la fin de semaine devra ralentir.

Un piège guette même une personne confirmée : lire un bon écart sur la fenêtre de cinq heures comme « tout va bien », alors que la semaine court loin devant sa cible. Un point du jour ou un rapport de la semaine cite donc les deux écarts, celui de la fenêtre et celui de la semaine, ou le seul de la semaine sur Ultra.

Si votre forfait autorise des crédits d’usage et que vous choisissez de vous en servir, la même logique s’applique au mois : une allocation par jour égale au plafond mensuel que vous vous fixez, divisé par le nombre de jours du mois, et une cible égale à ce plafond multiplié par la part écoulée du mois.

> **⚠️ Attention**
>
> Ouvrir les crédits d’usage sans plafond. Leur dépense s’ajoute à votre abonnement, et un lot qui tourne la nuit peut la faire monter sans personne pour le voir. Ce guide recommande que leur usage reste désactivé par défaut, ne s’ouvre que par un réglage explicite, avec un plafond du mois que vous fixez vous-même, et qu’une dépense inattendue compte parmi vos alertes ([section 20.6](https://gmag-dev.github.io/bien-demarrer-claude-code/#s20-6)).

### 20.6 Résumer l’état du forfait

Les grandeurs de la [section 20.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s20-4) se résument en un petit nombre de niveaux, pour décider vite avant un lot lourd : attendre la remise à zéro, avancer à petits pas, ou lancer. Chaque niveau se dit toujours par un mot, et par une icône quand l’affichage le permet : une information ne passe jamais par la couleur seule [\[87\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-wcag22).

Fixez vos propres seuils, et notez la raison de chacun. Calibrez-les au bout d’une ou deux semaines de lectures : ils dépendent de votre forfait, de votre modèle et de votre façon de travailler.

### 20.7 Le coût d’un lancement

Une question pratique revient avant chaque lot : combien de lancements de ce type tiennent encore aujourd’hui ? Pour y répondre, mesurez. Lisez le niveau du forfait juste avant un lancement, puis juste après sa fin, un seul lancement à la fois, sinon les coûts se mélangent. Résumez ensuite chaque type de lancement par sa médiane et par son [P80](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-p50-p80), la valeur que 80 % des lancements ne dépassent pas. Avec peu de mesures, dites que l’échantillon est faible.

### 20.8 Un seul endroit pour les décisions

Quand plusieurs sessions travaillent pour vous, leurs questions se perdent dans le fil des messages. Rassemblez-les dans un seul dossier, avec un fichier par décision attendue : la question, ses options, une recommandation, puis la décision de la personne ([section 19.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s19-4)). La personne tranche depuis cet endroit, et non depuis l’onglet de la session qui a posé la question.

Chez Passerelle, ce dossier s’appelle `decisions/`.

### 20.9 Ce qui attend la personne

Gardez sous les yeux ce qui attend la personne : ses décisions ouvertes, les demandes sans réponse, les gestes qu’elle seule peut faire. Ce qui attend depuis le plus longtemps se traite d’abord.

### 20.10 L’état d’un projet, en une demande

Une demande courte peut rendre dans la conversation l’état d’un projet : ce qui attend la personne, le forfait avec l’heure de sa lecture, et les travaux en cours. Une telle réponse ne lance rien : elle lit, calcule et dit.

Une pratique des équipes de documentation la complète : chaque document porte la date de sa dernière revue, et un outil le signale passé un seuil d’environ trois mois [\[141\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-swe-book-documentation) [\[142\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hve-core-doc-maintenance). La [section 21.11](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-11) décrit cette pratique en détail.

### 20.11 Noter un backlog et planifier ses jalons

Pour dire quand un backlog, la liste des travaux en attente, sera vide, ne donnez pas une date mais deux : celle que vous avez une chance sur deux de tenir, le P50, et celle que vous avez quatre chances sur cinq de tenir, le P80. Pour les obtenir, on rejoue le planning un grand nombre de fois, avec des durées tirées au hasard dans des fourchettes réalistes : c’est un tirage de [Monte-Carlo](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-monte-carlo). Tous les nombres qui en sortent sont des estimations, et se disent comme telles. Une estimation ne se dit jamais « vérifié ».

**La notation.**

- Une table de notation à part, une ligne par élément ouvert du backlog, renvoie à son identifiant dans le registre des demandes. Elle ne recopie rien du registre : chaque information vit à un seul endroit, et aucune copie ne peut s’écarter de l’original. Elle ne porte que ce qui sert au calcul, et sa tête porte la mention « estimé ».
- Ses colonnes : la phase, c’est-à-dire l’étape clé à laquelle l’élément appartient, l’effort en trois tailles S, M ou L, la criticité et la difficulté, chacune de 1 à 3, le porteur (vous, une session, une autre équipe), et une phrase qui dit pourquoi.
- Avant tout calcul, une jointure de contrôle : chaque ligne notée renvoie à un élément ouvert du registre, et chaque élément ouvert a sa note. Sinon, le calcul refuse de tourner et nomme les lignes en défaut.

Chez Passerelle, Bernard note le backlog de la vague par type de courrier ([tableau 20.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#tab-20-7)). Les deux premières phases sont portées par l’équipe, la troisième attend Odile.

**Tableau 20.7 :** Le backlog de la vague de Passerelle, estimé. Valeurs d’exemple.

| Élément | Phase | Effort | Criticité | Difficulté | Porteur | Pourquoi |
| --- | --- | --- | --- | --- | --- | --- |
| réexamen d’une aide au logement, 22 courriers | 1, délais courts | L | 3 | 2 | l’équipe | un délai au 15 décembre |
| pièce manquante à fournir, 14 courriers | 1, délais courts | M | 3 | 1 | l’équipe | un délai de quinze jours |
| inscription à la cantine, 12 courriers | 2, sans délai | M | 2 | 1 | l’équipe | aucun délai écrit |
| attestation de transport scolaire, 12 courriers | 2, sans délai | S | 1 | 1 | l’équipe | un modèle déjà relu |
| relecture des 60 brouillons | 3, relecture | L | 3 | 2 | Odile | seule la relectrice concernée tranche |

**Le tirage.**

- La [loi lognormale](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-loi-lognormale), celle d’une grandeur dont le logarithme suit la courbe en cloche de la loi normale, convient à une durée : elle reste positive et garde une longue traîne à droite, celle des retards. Chaque ligne portée par l’équipe tire une durée selon une loi lognormale : une médiane propre à sa taille d’effort, multipliée par un coefficient de difficulté, et une dispersion.
- Tout le tirage est ensuite multiplié par un facteur commun, lui aussi lognormal, de médiane 1. Il représente ce qui ralentit tout à la fois : une semaine chargée, un outil qui change. Sans lui, des durées tirées indépendamment se compensent, et le P80 sort faussement étroit.
- Les lignes s’additionnent dans une phase, et les phases se suivent dans l’ordre. La fin d’une phase se lit sur la somme cumulée jusqu’à elle, au P50 et au P80. On ne somme jamais des percentiles : le P80 d’une somme n’est pas la somme des P80.

```text
pour chaque tirage k = 1 … N :
  f = exp(σc · z0)                                facteur commun, médiane 1
  pour chaque ligne i portée par l'équipe :
    d_i = f · exp(ln(m_taille · c_difficulté) + σ · z_i)
  fin de la phase p = somme des d_i des phases 1 à p
P50, P80 de la phase p = percentiles 50 et 80 des N fins de phase p
(z0, z_i : tirages indépendants d'une loi normale centrée réduite)
```

**Un exemple à refaire au tableur.** Les valeurs sont d’exemple, arrondies pour se suivre à la main. Un backlog d’une seule phase, porté par l’équipe, compte deux éléments : un M, de médiane 2 heures, et un L, de médiane 4 heures, tous deux de difficulté 1, donc de coefficient 1. La dispersion vaut σ = 0,5 pour chaque ligne, et σc = 0,2 pour le facteur commun. Chaque tirage prend trois valeurs de la loi normale centrée réduite : z0 pour le facteur commun, z1 pour le M, z2 pour le L. Elles sont fixées ici, pour que vous retrouviez les mêmes résultats. Comme exp(ln(m) + σ · z) vaut m × exp(σ · z), chaque durée est sa médiane multipliée par deux facteurs.

Le premier tirage, en détail : z0 = 0,5, z1 = −0,4, z2 = 0,2. Le facteur commun vaut f = exp(0,2 × 0,5) = exp(0,1), soit environ 1,105. Le M dure 1,105 × 2 × exp(0,5 × (−0,4)) = 1,105 × 2 × 0,819, soit environ 1,8 heure. Le L dure 1,105 × 4 × exp(0,5 × 0,2) = 1,105 × 4 × 1,105, soit environ 4,9 heures. La phase finit après 1,8 + 4,9 = 6,7 heures. Les neuf autres tirages se calculent de la même façon :

```text
tirage    z0     z1     z2      f      M (h)   L (h)   fin (h)
  1      0,5   −0,4    0,2   1,105    1,8     4,9      6,7
  2     −1,0    0,6   −0,8   0,819    2,2     2,2      4,4
  3      0,0    1,2    0,4   1,000    3,6     4,9      8,5
  4      1,5   −0,2    0,0   1,350    2,4     5,4      7,8
  5     −0,5   −1,0   −0,4   0,905    1,1     3,0      4,1
  6      0,5    0,2    1,4   1,105    2,4     8,9     11,3
  7     −1,5    0,0   −0,2   0,741    1,5     2,7      4,2
  8      1,0   −0,6    0,8   1,221    1,8     7,3      9,1
  9      0,0    0,4   −1,2   1,000    2,4     2,2      4,6
 10     −0,5    0,8    0,6   0,905    2,7     4,9      7,6
```

Triez les dix fins, et comptez leurs positions à partir de zéro : la plus courte est en position 0, la plus longue en position 9. Le P50 se lit en position 0,5 × 9 et le P80 en position 0,8 × 9, en interpolant entre les deux fins voisines :

```text
fins triées : 4,1  4,2  4,4  4,6  6,7  7,6  7,8  8,5  9,1  11,3
P50 : position 4,5, donc 6,7 + 0,5 × (7,6 − 6,7) = 7,15 heures
P80 : position 7,2, donc 8,5 + 0,2 × (9,1 − 8,5) = 8,62 heures
```

Au tableur, sans arrondir en route, vous lirez 7,14 et 8,64 heures : l’écart vient des arrondis du tableau. Une chance sur deux de finir en un peu plus de 7 heures de travail, quatre chances sur cinq en un peu plus de 8 h 30. La somme des deux médianes, 6 heures, promettait moins : la traîne à droite de chaque durée pousse la fin plus loin. Dix tirages montrent le mécanisme, ils ne suffisent pas pour décider : le calcul réel rejoue le planning un grand nombre de fois.

**Les jalons.**

- Une phase reçoit une date de jalon seulement quand l’équipe porte toutes ses lignes. Si une seule ligne attend quelqu’un d’autre, une décision ou une autre équipe, la phase affiche la fin du travail de l’équipe et la liste des gestes en attente, sans date : on ne devine pas le rythme des autres. Chez Passerelle, la phase 3 n’a pas de date : elle attend Odile, qui relit à son rythme.
- Les médianes se calibrent sur vos propres mesures, comme les coûts de la [section 20.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s20-7). Refaites le calcul quand le backlog ou vos mesures changent, et gardez la graine du tirage : un même jeu d’entrées doit donner le même résultat.

🏛️ Le Cahier commun suit la même règle. Mei pose quatre jalons : la lecture des contributions, la synthèse vérifiée, le retour aux habitants, le conseil municipal. Seules les deux premières phases sont portées par son équipe. Le retour aux habitants dure le temps que la commune leur laisse pour réagir, et la date du conseil est fixée par la commune. Le plan doit donc dire si le P80 de la synthèse, plus la durée du retour, tombe avant le conseil ([figure 20.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#fig-20-3)).

*Dessin : Les jalons du Cahier commun, jusqu’au conseil. Schéma : la description suit.*

**Figure 20.3 :** Les jalons du Cahier commun, jusqu’au conseil. En gris les phases portées par l’équipe, en bleu la question du plan, en vert le plan qui tient, en ambre l’exception, en tirets les phases qui attendent d’autres personnes. Schéma proposé par ce guide.

Le même flux, en texte :

1. Les phases 1 et 2, portées par l’équipe de Mei, reçoivent un P50 et un P80.
2. Le plan vérifie que le P80 de la synthèse, plus la durée du retour aux habitants, tombe avant le conseil.
3. Si oui, le plan tient. Sinon, une exception remonte à Mei ([section 20.13](https://gmag-dev.github.io/bien-demarrer-claude-code/#s20-13)).
4. Le retour aux habitants n’a pas de date d’équipe : il attend leurs réactions.
5. Le conseil municipal décide, après le retour.

**Tableau 20.8 :** Le même calcul, à trois niveaux. Proposé par ce guide.

| Si vous… | Faites | Pourquoi |
| --- | --- | --- |
| débutez | comptez les éléments S, M et L, multipliez chacun par une durée typique, et ajoutez une marge | un ordre de grandeur vaut mieux qu’une date au hasard |
| êtes à l’aise | un P50 et un P80 par phase, sans jamais additionner des percentiles | deux dates disent l’incertitude, une seule la cache |
| voulez aller plus loin | le facteur commun lognormal, un jalon daté seulement si l’équipe porte toute la phase, et la graine du tirage conservée | les retards se corrèlent, et un calcul se rejoue |

> **📏 La limite**
>
> Le tirage ne vaut que par ses médianes. Tant qu’elles ne viennent pas de vos mesures, le P80 n’est qu’une hypothèse chiffrée : dites-le en tête du résultat.

### 20.12 Un journal des décisions

Pour piloter un projet avec Claude, tenez une seule page qui répond à deux questions : qu’est-ce qui attend une décision ou un geste de ma part, et qu’est-ce qui a déjà été décidé, par qui et quand ? Quand les décisions sont éparpillées entre des messages, des comptes rendus et plusieurs sessions, trois choses arrivent : une même question est posée deux fois, une décision prise est oubliée, et personne ne sait ce qui bloque.

Tenez cette page comme un journal : chaque décision y entre datée, et une entrée ne se réécrit pas. L’enregistrement de décision en donne une forme publique : le contexte et le problème, les options envisagées, la décision retenue [\[110\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-madr) [\[152\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-nygard-adr). La [section 14.8](https://gmag-dev.github.io/bien-demarrer-claude-code/#s14-8) en montre l’usage.
