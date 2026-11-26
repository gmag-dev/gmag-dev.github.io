> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.4.2 : « 15. Déléguer », partie 1 sur 2.
>
> - Précédent : [14. Le modèle propose, l’oracle vérifie, la personne tranche (partie 2 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/14-le-modele-propose-l-oracle-verifie-la-personne-tranche-2.md)
> - Suivant : [15. Déléguer (partie 2 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/15-deleguer-2.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#h-ch15>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## 15. Déléguer

> **🪪 Ce chapitre**
>
> **Pour qui** : la personne qui a déjà lancé des sous-agents ([chapitre 8](https://gmag-dev.github.io/bien-demarrer-claude-code/8-le-travail-en-parallele.html#ch8)) et veut leur confier une vraie part du travail, sans perdre la main sur ce qui revient.
>
> **Sur quel poste** : n’importe lequel, avec Claude Code. Seules les [équipes d’agents](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-equipe-d-agents) de la [section 15.7](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-7) sont une fonction expérimentale, désactivée par défaut [\[111\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-agent-teams). État décrit : la documentation de Claude Code 2.1.319 [\[1\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-changelog), sauf les passages marqués 🆕, écrits à la date de leur badge.
>
> **Ce que vous apprenez** : écrire un brief qu’un sous-agent peut suivre sans vous, doser l’effort, et lire son rapport comme une donnée à vérifier.
>
> **Deux chemins** : si un encadré « Quand la règle cède » vous a envoyée ici, lisez la section qu’il cite, puis revenez à votre chapitre. Sinon, lisez le chapitre dans l’ordre, puis faites l’exercice.
>
> **Le fil rouge** 🌉 Passerelle : pendant la vague de courriers, Bernard confie à des sous-agents la vérification « chaque date du courrier est dans le brouillon », lot par lot, puis vérifie leurs rapports avant de s’en servir. 🏛️ Le Cahier commun : Mei confie un brief par thème des contributions sur la place des Tilleuls, et vérifie que les comptes tombent juste.
>
> **Où en est Passerelle** : en arrivant, les exigences du contrôle de fidélité sont approuvées, et chaque tâche finit par une issue nommée ([chapitre 14](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#ch14)). À la fin du chapitre, un brief de vérification est rangé dans le dépôt, deux rapports de sous-agents ont été vérifiés avant usage, et Le Cahier commun a sa répartition par thème, comptes vérifiés.

Déléguer, c’est confier une partie du travail à un [sous-agent](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-sous-agent), qui part d’un contexte vierge. Le [chapitre 8](https://gmag-dev.github.io/bien-demarrer-claude-code/8-le-travail-en-parallele.html#ch8) a montré quand cela rapporte. Celui-ci montre comment écrire la consigne qui part, comment lire ce qui revient, combien d’effort y mettre, et quand s’abstenir. Chez Passerelle, l’enjeu est simple à dire : un sous-agent qui annonce « aucune date perdue » sur quinze brouillons sans l’avoir prouvé ferait entrer quinze erreurs possibles dans le travail d’Odile.

### 15.1 Ce que reçoit un sous-agent

Imaginez une personne qui n’était pas à la réunion : elle ne sait que ce que vous lui écrivez. Un sous-agent est dans cette situation. Il démarre dans une [fenêtre de contexte](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-fenetre-de-contexte) neuve et isolée. Il ne voit ni l’historique de votre conversation, ni les skills déjà invoqués, ni les fichiers déjà lus : Claude compose un message de délégation, le [brief](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-brief), qui résume la tâche, et seul le résumé final revient [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents).

Trois règles du [harnais](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-harnais) complètent ce portrait [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents) :

- un sous-agent peut en lancer d’autres, par défaut jusqu’à trois niveaux sous la session principale. La variable `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH` règle cette profondeur,
- un sous-agent en arrière-plan fait remonter chacune de ses demandes de permission dans la session principale,
- avec `isolation: worktree`, il travaille dans une copie isolée du dépôt, créée par défaut depuis la branche par défaut et non depuis le commit sur lequel travaille la session principale, et supprimée s’il ne modifie rien.

Le piège est de croire que le sous-agent « sait ce qu’on a dit ». Ce qui n’est ni dans le brief, ni dans un fichier qu’il lira, n’existe pas pour lui. Chez Passerelle, la session de Bernard sait que les délais relatifs se gardent tels que le courrier les écrit ([section 14.8](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-8)). Un sous-agent chargé de vérifier les dates ne le sait pas : sans cette ligne dans son brief, il signalerait comme absente la date qu’un brouillon a eu raison de ne pas calculer. Il en va de même pour le code : avec `isolation: worktree`, une copie partie de la branche par défaut ne contient pas les commits de votre branche en cours.

### 15.2 Le brief

Un sous-agent ne sait que ce que vous lui écrivez. Ce guide propose de commencer par un brief de trois lignes : ce qu’il doit rendre, ce qu’il ne doit pas toucher, et la preuve qui montrera que c’est vérifié ([section 14.10](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-10)).

Anthropic a constaté, en construisant son système de recherche, qu’un sous-agent a besoin d’un objectif, d’un format de sortie, d’indications sur les outils et les sources à utiliser, et de limites claires. Sans description détaillée, les agents dupliquent le travail, laissent des trous ou ne trouvent pas l’information [\[103\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-multi-agent-research-system). Un sous-agent peut aussi écrire son travail dans un fichier et ne renvoyer qu’une référence légère, ce qui évite les pertes d’une transmission de bouche à oreille [\[103\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-multi-agent-research-system).

**Tableau 15.2 :** Le même brief, à trois niveaux. Proposé par ce guide.

| Si vous… | Faites | Pourquoi |
| --- | --- | --- |
| débutez | « Liste les dates du courrier PASS-C-031 absentes de son brouillon. Ne modifie rien. Pour chacune, donne la ligne du courrier. » | trois lignes : ce qu’il rend, ce qu’il ne touche pas, la preuve |
| êtes à l’aise | les éléments relevés par Anthropic : un objectif, un format de sortie, des outils et des sources, des limites | le sous-agent n’a plus de question à poser |
| voulez aller plus loin | un brief complet, et un agent défini avec son champ `tools` en liste blanche | la borne la plus forte ne dépend plus d’un texte |

> **📏 La limite**
>
> Un brief complet ne remplace pas la vérification de ce qui revient. Il la rend seulement bon marché, en exigeant d’avance la bonne preuve ([section 15.3](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-3)).

### 15.3 Le rapport est une donnée à vérifier

Un rapport de sous-agent dit ce que le sous-agent croit avoir fait. Ce guide propose de le traiter comme une donnée, pas comme une vérité : la session principale relit la preuve, le fichier, le diff, la sortie de commande, avant de s’appuyer sur le rapport, et un rapport sans preuve est noté « non vérifié ». Le harnais applique déjà ce principe à un cas voisin : un message reçu d’une autre session ne vaut jamais votre consentement, n’exécute aucune commande, et les demandes de permission du destinataire s’appliquent toujours [\[112\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-cross-session-messaging).

La vérification coûte peu si le brief a exigé la bonne preuve. Quatre affirmations reviennent souvent.

**Tableau 15.3 :** Vérifier un rapport avant de s’en servir. Proposé par ce guide.

| Affirmation du rapport | Preuve à relire | Signal d’alarme |
| --- | --- | --- |
| « Les tests passent » | la commande exacte et les dernières lignes de sa sortie [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices) | aucune commande citée, un décompte de tests sans sortie |
| « Fichier écrit » | le chemin, la taille, un extrait relu dans le fichier | un chemin hors de ceux qu’il devait écrire |
| « Rien trouvé » | ce qui a été parcouru, et comment | un périmètre plus petit que celui du brief |
| « Corrigé » | le diff, et le test qui échouait avant | un diff qui touche des fichiers non demandés |

Chez Passerelle, le rapport du lot 031 à 045 finit par « vérifié : aucune date absente ». Bernard compte les tableaux : quatorze, pour quinze courriers. `PASS-C-039` manque, sans un mot. Le rapport n’est pas faux sur ce qu’il montre, il est muet sur un courrier : c’est le signal « périmètre plus petit que celui du brief ». Bernard relance la vérification sur ce seul courrier, qui trouve une date absente du brouillon. Le brouillon retourne au skill, puis au contrôle, puis à Odile.

Recopier un rapport dans un livrable, un commit ou un message sans relire sa preuve fait de l’erreur du sous-agent votre erreur, sous votre nom.

### 15.4 L’éventail et le dosage de l’effort

Lancer plusieurs sous-agents en même temps, en [éventail](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-eventail), fait gagner du temps quand les sous-tâches sont vraiment indépendantes. Pour son système de recherche, Anthropic donne des ordres de grandeur qui aident à doser l’effort [\[103\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-multi-agent-research-system).

**Tableau 15.4 :** Doser l’effort, d’après le système de recherche d’Anthropic [\[103\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-multi-agent-research-system).

| Tâche | Agents | Appels d’outils |
| --- | --- | --- |
| recherche factuelle simple | un agent | 3 à 10 |
| comparaison directe | 2 à 4 sous-agents | 10 à 15 chacun |
| recherche complexe | plus de 10 sous-agents, aux responsabilités nettement séparées | non précisé |

L’éventail peut aussi se faire par script, avec une session non interactive par fichier. La documentation décrit une boucle qui lance `claude -p` sur chaque fichier, avec des outils approuvés d’avance, `--permission-mode dontAsk` et `--max-turns`. On la teste d’abord sur trois fichiers, on corrige le prompt, puis on lance le reste [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Le mode `dontAsk` refuse tout outil qui n’a pas été approuvé d’avance, sans rien demander [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permission-modes). Avec `claude -p`, aucune boîte de confiance ne s’affiche et les hooks du dépôt s’exécutent ([section 17.1](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#s17-1)) : réservez la boucle à un dépôt que vous avez inspecté.

**Un sous-agent d’arrière-plan qui se tait.** Il travaille pendant que votre conversation continue, et chacune de ses demandes de permission remonte dans la session principale ([section 15.1](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-1)). Si personne ne la voit, il attend sans bruit. Ce guide propose trois gestes, dans cet ordre :

1. lisez ce qu’il a fait : sa transcription, ou à défaut les fichiers qu’il devait produire. Cherchez d’abord une demande de permission restée sans réponse,
2. décidez : s’il attend une permission juste, accordez-la. S’il tourne en rond ou sort de son périmètre, arrêtez-le, corrigez le brief et relancez-le,
3. ne l’attendez jamais en silence : une session qui attend un sous-agent le dit, avec l’heure du lancement et ce qu’elle a déjà vérifié.

**Quand le modèle change, relisez les consignes.** La définition d’un agent a été écrite et essayée avec un modèle. Les modèles récents suivent une consigne écrite simplement, et une insistance écrite pour un modèle plus ancien peut les pousser à trop appliquer la règle ([section 4.7](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-7)). Après un changement de modèle, essayez de nouveau l’agent ([section 21.6](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-6)).

#### Le niveau d’effort

Pour commencer, ne réglez rien : le niveau par défaut convient à la plupart des tâches ([section 9.4](https://gmag-dev.github.io/bien-demarrer-claude-code/9-usage-et-cout-sans-credits-d-usage.html#s9-4)). Voici le détail, pour qui règle ses agents.

Le [niveau d’effort](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-niveau-d-effort) règle combien Claude réfléchit et vérifie avant de répondre. Les niveaux sont `low`, `medium`, `high`, `xhigh` et `max`. Sur Opus 5.5, le défaut est `medium`. Dans les tests d’Anthropic sur le code et le travail intellectuel, Opus 5.5 à ce niveau égale ou dépasse Opus 5 réglé en `high`. Dans des tests sur Opus 5.5 et Fable 5.1, Claude, à un niveau plus haut, a examiné plus de cas limites et vérifié davantage son travail avant de répondre. Il a aussi pris plus de décisions seul. `max` peut montrer des rendements décroissants et tend à trop réfléchir : testez-le avant de l’adopter largement [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config). Dans Claude Code, le défaut est aussi `medium` sur Sonnet 5.5 et Haiku 5.5, `xhigh` sur Opus 4.7, et `high` sur les autres modèles qui le prennent [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config). Nouveau · 16 nov. 2026 D’après la documentation lue le 16 novembre 2026, à une version plus récente que celle de ce guide, Fable 5.2 est aussi en `medium` [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config). L’[API](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-api) d’Anthropic, un autre produit, met Sonnet 5.5 en `high` par défaut : un défaut lu dans sa documentation ne vaut pas forcément dans Claude Code [\[113\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-effort-api). L’effort agit sur tous les jetons de sortie, le texte, les appels d’outils et la réflexion [\[113\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-effort-api), et la réflexion est facturée comme des jetons de sortie [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-costs). 💡 Conseil : choisissez le modèle et l’effort en début de session. D’après la page du cache, lue le 16 novembre 2026, changer de modèle en cours de session fait relire toute la conversation sans le cache, et changer d’effort aussi, sauf sur Fable 5.1 et suivants, Opus 5.5, Sonnet 5.5 et Haiku 5.5, avec un abonnement ou une clé d’API [\[31\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-prompt-caching).

Le niveau d’effort se règle, ou se module pour un tour, notamment ainsi [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config) :

- `/effort`, sans argument, ouvre un curseur : Entrée y enregistre le niveau pour les sessions suivantes, la touche `s` le limite à la session en cours. Un niveau tapé après la commande, comme `/effort high`, est enregistré aussi. Dans le même curseur, Tab puis Entrée active ou coupe [`ultracode`](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-ultracode), un réglage distinct du niveau d’effort ([annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#ann-l), [section L.6](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-6)) [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config). Coupez-le par `/effort ultracode off` une fois le travail lourd fini : un flux consomme plus de jetons que la même demande sans flux [\[114\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-workflows),
- [`ultrathink`](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-ultrathink) dans un message demande plus de réflexion pour ce seul tour, sans toucher au réglage,
- dans `~/.claude/settings.json`, par modèle, sous `modelSettings`. La clé `effortLevel` placée en haut du fichier utilisateur est l’ancienne forme, qu’Opus 5.5 ignore [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config). D’après la documentation lue le 16 novembre 2026, la même clé, placée en haut d’un fichier de projet, local ou géré, ou d’un fichier passé par `--settings`, vaut pour tous les modèles [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config). `max` ne vaut que pour la session en cours, sauf par la variable `CLAUDE_CODE_EFFORT_LEVEL`,
- dans la définition d’un sous-agent ou d’un skill, par le champ `effort`. Sans ce champ, un sous-agent du même modèle tourne au niveau de la session. Sur un autre modèle, le niveau de la session ne s’applique pas : écrivez le champ dans sa définition. La variable `CLAUDE_CODE_EFFORT_LEVEL` l’emporte sur tous ces réglages, champ `effort` compris.

```json
{
  "modelSettings": {
    "claude-opus-5-5": { "effortLevel": "high" }
  }
}
```

Le modèle d’un sous-agent, lui, se choisit dans cet ordre, d’après la documentation lue le 16 novembre 2026 : celui que Claude demande au lancement, puis le champ `model` de sa définition (`sonnet`, `opus`, `haiku`, `fable`, un identifiant complet ou `inherit`), puis la variable `CLAUDE_CODE_SUBAGENT_MODEL`, puis le modèle de la conversation [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents). Seule, cette variable ne change pas le modèle des agents intégrés Explore et Plan [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents).

Le piège est de monter l’effort par peur de l’erreur. Le rayon d’impact d’une erreur se borne par la structure : des tests rouges puis verts, git et les [worktrees](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-worktree), les règles `ask`, une relecture à contexte neuf. La profondeur de réflexion n’y suffit pas. Un défaut élevé se défend pour un travail de fond. Baissez alors l’effort dans la définition des agents de tâche mécanique, sinon chaque sous-agent du même modèle que la session paie le niveau de la session. Chez Passerelle, le vérificateur des dates a son champ `effort` à `low` : il compare des listes, il ne rédige rien.

#### Repartir de zéro

Compacter, vider ou repartir de zéro se choisit selon ce qui doit survivre :

- `/clear` quand le sujet change : il ne coûte rien [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-costs),
- `/compact` suivi d’une consigne quand le même travail continue et que la session porte un état utile, comme une liste de tâches ou un plan ouvert, qui survivent à la [compaction](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-compaction) (sections [3.2](https://gmag-dev.github.io/bien-demarrer-claude-code/3-la-fenetre-de-contexte.html#s3-2) et [14.7](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-7)),
- une session neuve pour une relecture qui ne doit pas reprendre les conclusions précédentes, ou quand l’état vit déjà dans des fichiers : un brief court suffit.

#### Le Cahier commun, un brief par thème

🏛️ Mei a reçu les contributions à la consultation sur la place des Tilleuls : 40 dans l’exercice court, `CAH-001` à `CAH-040`, et 400 dans l’exercice complet. Elle lance un sous-agent par thème, l’ombre et les arbres, les jeux, le marché, la circulation, les bancs et l’accès pour toutes et tous. Chaque brief dit la même chose, sauf le thème : relève les contributions qui parlent de ce thème, cite pour chacune son identifiant et la phrase qui le montre, ne résume rien, et dis à part ce qui est ambigu.

Les comptes se vérifient avant toute synthèse. Mei vérifie trois choses par un petit script, ou à la main sur 40 contributions :

1. chaque identifiant cité existe, et chaque phrase citée se trouve bien dans sa contribution,
2. chaque contribution est rangée sous au moins un thème, ou dans « sans thème », et aucune n’est oubliée,
3. une contribution rangée sous deux thèmes est comptée dans les deux, et la liste le dit.

Dans l’exercice court, le premier essai donne 45 rangements pour 40 contributions : six contributions parlent de deux thèmes, ce qui est juste, mais une, `CAH-027`, n’est rangée nulle part. Mei la relit : elle parle de l’éclairage, un thème que personne n’avait prévu. Elle l’ajoute. La synthèse revient ensuite aux habitantes et aux habitants avant que le conseil municipal décide.

**Tableau 15.5 :** Le même dosage de l’effort, à trois niveaux, d’après [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config).

| Si vous… | Réglez | Pourquoi |
| --- | --- | --- |
| débutez | rien : le défaut | il convient à la plupart des tâches |
| êtes à l’aise | un niveau plus haut le temps d’une session difficile, choisi dans le curseur de `/effort` avec la touche `s` | le réglage ne survit pas à la session |
| voulez aller plus loin | `modelSettings` par modèle, et le champ `effort` dans la définition de chaque agent | chaque agent paie l’effort de sa tâche, pas celui de la session |

> **📏 La limite**
>
> L’effort change la profondeur d’un raisonnement, pas la preuve qu’il est juste. Un agent réglé en `max` rend un rapport qui se vérifie comme les autres ([section 15.3](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-3)).

### 15.5 Une session sans personne : `claude -p` en script et en CI

Nouveau · 18 nov. 2026 Une relecture à chaque demande de fusion, un contrôle chaque nuit, le même travail sur cent fichiers : personne n’est là pour répondre à une demande de permission, et une session qui attend une réponse attend pour rien. Le [mode non interactif](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-mode-non-interactif) fait ce travail sans personne : `-p`, ou `--print`, lance n’importe quelle commande `claude` sans interface, et la réponse sort sur la sortie standard [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless). La règle tient en une phrase : décidez d’avance, dans la commande, tout ce que la session peut faire. Sans `--bare`, des fichiers du dépôt en décident aussi, et même avec lui, ses réglages comptent encore (ci-dessous).

**Ce qu’elle peut faire.** Depuis la version 2.1.302, une session `claude -p` démarre en mode Manual quand rien ne fixe le mode, et un appel qui demanderait votre accord y est refusé, sauf si un hook `PermissionRequest` ou un outil passé par `--permission-prompt-tool` l’approuve [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless). Quatre drapeaux disent le reste [\[115\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-cli-reference) :

- `--tools` restreint les outils intégrés que Claude peut employer, en liste blanche : `--tools "Read,Grep,Glob"` ne laisse que la lecture,
- `--allowedTools` laisse passer sans demande les appels qu’il nomme, dans la syntaxe des règles de permission. La documentation écrit `Bash(git diff *)`, avec une espace avant le joker : sans elle, `Bash(git diff*)` attraperait aussi `git diff-index` [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless),
- `--permission-mode dontAsk` refuse tout appel qui aurait demandé un accord, ce que la documentation juge utile pour une intégration continue verrouillée, et `--permission-prompts none` se passe quand personne ne peut répondre : un appel qui attendrait une réponse est alors refusé [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless) [\[115\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-cli-reference).

**Ce qu’elle charge.** Sans `--bare`, une session `claude -p` exécute les hooks du `.claude/settings.json` du dossier et connecte les serveurs de son `.mcp.json`, même dans un dossier jamais approuvé : elle n’affiche ni boîte de confiance ni demande par serveur [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless). `--bare` saute la découverte des hooks, skills, commandes, sous-agents, plugins, serveurs MCP, de la mémoire automatique et de `CLAUDE.md`, et la documentation le recommande pour les scripts et l’intégration continue, où il donne le même résultat sur chaque machine [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless) [\[115\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-cli-reference). `--bare` lit pourtant encore les fichiers de réglages et leurs règles de permission [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless). Le bloc `env` des réglages du projet s’applique toujours, de même que des commandes d’aide comme `awsAuthRefresh`. Dans un dépôt que vous n’avez pas inspecté, la documentation propose d’abord `--setting-sources user`, qui ne lit ni les réglages du projet ni son `.mcp.json` [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permissions). Exception : les skills du dossier `.claude/skills/` d’un dossier passé par `--add-dir` se chargent, mais pas ses commandes ni ses agents. La session n’en reçoit pourtant pas la liste : nommez dans le prompt le skill à employer [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless). En mode `--bare`, Claude Code ne lit jamais la connexion d’un abonnement ni le trousseau du système : sur l’API d’Anthropic, il lui faut `ANTHROPIC_API_KEY` dans l’environnement, ou un `apiKeyHelper` dans le JSON passé par `--settings` [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless).

**Ce qu’elle rend.** `--output-format` vaut `text`, le défaut, `json`, qui donne le résultat, l’identifiant de session et des métadonnées, ou `stream-json`, un objet JSON par ligne [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless). Avec `--json-schema`, la réponse porte une sortie structurée dans le champ `structured_output`, absent si la session n’a pas pu la produire, par exemple après un refus : vérifiez sa présence avant de vous en servir [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless). Le code de sortie vaut 0 en cas de succès et autre chose en cas d’échec, et un arrêt par SIGTERM sort en 143 [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless). Un serveur MCP ou un plugin qui n’a pas démarré ne change pas ce code : la fiche ci-dessous dit comment le voir. Dans l’exemple qui suit, `set -euo pipefail` arrête le script si `claude` échoue, et `jq -e` l’arrête si la réponse n’a pas d’identifiant de session. La seconde demande reprend la session par cet identifiant, et retrouve donc la liste de la première :

```bash
set -euo pipefail
session_id=$(claude -p "Liste chaque date de brouillons/PASS-B-031.md" --permission-mode dontAsk \
  --tools "Read,Grep,Glob" --allowedTools "Read,Grep,Glob" --output-format json | jq -er '.session_id')
claude -p "Pour chaque date listée, cite sa ligne dans courriers/PASS-C-031.txt" --permission-mode dontAsk \
  --tools "Read,Grep,Glob" --allowedTools "Read,Grep,Glob" --resume "$session_id"
```

`--fork-session` reprend sous un nouvel identifiant, `--session-id` impose votre propre identifiant, un UUID, et `--no-session-persistence`, en mode `-p` seulement, n’enregistre pas la session sur le disque : elle ne pourra pas être reprise [\[115\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-cli-reference).

**Ses bornes, et ce qu’elles valent.** `--max-turns` borne les tours, sans limite par défaut [\[115\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-cli-reference). `--max-budget-usd` arrête la session quand la dépense estimée atteint son montant, mais l’estimation se fait côté client, peut différer de la facture, et la dépense peut dépasser le plafond : gardez de la marge [\[115\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-cli-reference). Son tour fini, une session `claude -p` peut rester ouverte pour attendre le travail d’arrière-plan que Claude a lancé. Tant qu’une commande d’arrière-plan lancée par la conversation principale tourne, elle l’attend. Sinon, après dix minutes d’attente sans activité, elle arrête ce qui tourne encore et en perd le résultat partiel. `CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS` change ce plafond de dix minutes, et à `0` la session attend sans plafond [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless). L’entrée standard est plafonnée à 10 Mo : au-delà, écrivez le contenu dans un fichier et donnez son chemin [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless).

**En intégration continue.** Sur GitHub, l’action `anthropics/claude-code-action@v1` fait tourner Claude Code dans un workflow. `/install-github-app`, lancé depuis Claude Code, installe l’application GitHub, ajoute le secret et prépare le workflow, sur un dépôt de github.com dont vous êtes administratrice [\[116\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-github-actions). L’action a deux modes : sans entrée `prompt`, elle attend la mention `@claude` dans un ticket ou une demande de fusion. Avec une entrée `prompt`, elle tourne sans mention [\[116\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-github-actions). Elle s’authentifie par une clé d’API, `ANTHROPIC_API_KEY`, par un jeton d’abonnement Pro, Max, Ultra, Team ou Enterprise, `CLAUDE_CODE_OAUTH_TOKEN`, que crée `claude setup-token` sur votre poste, ou par une fédération d’identité OIDC, sans secret statique dans le dépôt [\[116\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-github-actions). Un job qui lance `claude -p --bare` ne lit aucune connexion d’abonnement : sur l’API d’Anthropic, il lui faut une clé d’API, ou un `apiKeyHelper` [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless). Chaque exécution consomme des minutes de GitHub Actions et des jetons du modèle [\[116\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-github-actions). Sur GitLab, l’intégration est en bêta et maintenue par GitLab : un job lance `claude -p` [\[117\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-gitlab-ci-cd).

> **⚠️ Attention**
>
> Une intégration continue qui fait lire à Claude un ticket ou une demande de fusion réunit souvent la triade létale : les secrets du job, un contenu écrit par n’importe qui, et le droit de pousser ou de commenter ([section 10.3](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#s10-3)). Un contributeur externe peut y cacher une instruction dans un commentaire HTML, un caractère invisible ou un attribut caché. L’action en retire une partie, mais de nouvelles techniques peuvent passer : relisez le contenu brut d’un contributeur externe avant de le faire traiter [\[81\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-claude-code-action-security). Les déclencheurs `pull_request_target` et `workflow_run` tournent avec les secrets du dépôt de base : ne récupérez pas (`checkout`) le code d’une demande de fusion non fiable à la racine de l’espace de travail avant l’action. Si l’action accepte des personnes sans accès en écriture (`allowed_non_write_users`), n’employez pas de jeton d’accès personnel de GitHub, statique, qu’une injection pourrait faire sortir peu à peu. Laissez `show_full_output` coupé, comme il l’est par défaut : sur un dépôt public, ces journaux sont publics [\[81\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-claude-code-action-security). La documentation conseille de ne pas envoyer directement à Claude un contenu non fiable par un tube (`|`) [\[21\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-security), et de relire ses changements avant la fusion [\[116\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-github-actions). Enfin, le workflow n’est une dernière porte que si sa définition est protégée, par une revue obligatoire de ses fichiers et la protection de la branche ([section 11.2](https://gmag-dev.github.io/bien-demarrer-claude-code/11-commits-et-collaboration.html#s11-2)).

Chez Passerelle, Bernard ne branche pas Claude sur les demandes de fusion : le dépôt reçoit des contributions de bénévoles, et rien ne doit sortir sans Odile. Il garde `claude -p` pour la boucle du lot, sur sa copie inspectée, avec les seuls outils de lecture, gardés par `--tools` et approuvés d’avance, et sans outil MCP, comme dans l’exercice de passage en fin de chapitre : les outils intégrés de la session ne peuvent ni écrire ni lancer de commande.

> **🎓 Fonctions avancées et bonnes pratiques : le mode non interactif et l’Agent SDK**
>
> - **Le mode `--bare`.** Il ne lance aucun hook et ne découvre ni commandes, ni sous-agents, ni plugins, ni serveurs MCP, ni mémoire automatique, ni `CLAUDE.md`, et des skills seulement ceux d’un dossier passé par `--add-dir`, sans en donner la liste à Claude. On passe ce qu’il faut par drapeau, comme `--settings` ou `--mcp-config` [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless).
> - **Les sorties.** `--output-format` vaut `text`, `json` ou `stream-json`, et `--json-schema` rend une sortie structurée dans `structured_output`, dont on vérifie la présence avant de s’en servir [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless).
> - **Les portes d’intégration continue.** Un tableau `plugin_errors` ou `mcp_server_errors` non vide dans l’événement `system/init` doit faire échouer la chaîne, puisque le lancement, lui, sort proprement [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless).
> - **Le SDK.** Il offre les mêmes outils, la même boucle et la même gestion du contexte, avec des hooks en fonctions, des sous-agents, MCP et les permissions [\[118\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-agent-sdk-overview).
> - **Le piège.** Sans `--bare`, `claude -p` exécute les hooks du `.claude/settings.json` d’un dossier jamais approuvé, sans dialogue [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless).
>
> Toutes les fonctions avancées, les bonnes pratiques et les pièges : [annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#ann-l), [section L.16](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-16).
