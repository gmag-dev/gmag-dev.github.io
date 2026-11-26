> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.4.1 : « 14. Le modèle propose, l’oracle vérifie, la personne tranche », partie 2 sur 2.
>
> - Précédent : [14. Le modèle propose, l’oracle vérifie, la personne tranche (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/14-le-modele-propose-l-oracle-verifie-la-personne-tranche-1.md)
> - Suivant : [15. Déléguer (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/15-deleguer-1.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#h-s14-7>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

### 14.7 Les travaux longs, sur plusieurs fenêtres de contexte

Quand un travail dure plusieurs sessions, ne comptez pas sur la conversation pour s’en souvenir. À la fin de chaque session, faites écrire par Claude où il en est dans une [note de passation](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-note-de-passation), et commencez la session suivante par la relire.

Anthropic présente le travail cohérent d’un agent sur plusieurs [fenêtres de contexte](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-fenetre-de-contexte) comme un problème encore ouvert, et décrit un dispositif à deux agents. Un **agent d’initialisation** prépare un dépôt git, un fichier de progression, une liste de fonctionnalités dont chacune porte un champ d’état « passe », et un script de démarrage. Un **agent de code** avance d’une fonctionnalité à la fois, et ne modifie dans la liste que le champ d’état. Chacun de ces fichiers pare un échec observé : la victoire déclarée trop tôt, l’environnement laissé cassé, la fonctionnalité marquée « passe » sans test soigneux, le temps perdu à relancer l’application [\[108\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-effective-harnesses). L’état du travail vit dans les fichiers, la conversation n’en est qu’un tampon : le [chapitre 3](https://gmag-dev.github.io/bien-demarrer-claude-code/3-la-fenetre-de-contexte.html#ch3) dit pourquoi le contexte est une ressource finie [\[109\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-context-engineering).

Chez Passerelle, la vague de soixante courriers tient sur plusieurs sessions. Bernard a écrit au départ la liste des types de courrier, chacun avec son champ « passe », que seul un contrôle de fidélité vert fait passer à vrai. La note `notes/passation.md` ([chapitre 3](https://gmag-dev.github.io/bien-demarrer-claude-code/3-la-fenetre-de-contexte.html#ch3)) dit le dernier commit, ce qui reste et ce qui attend Odile. Elle dit ce que la session précédente croyait : elle se vérifie contre le dépôt ([section 15.3](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-3)).

#### Compacter au bon moment

La [section 3.2](https://gmag-dev.github.io/bien-demarrer-claude-code/3-la-fenetre-de-contexte.html#s3-2) donne les bons moments pour compacter et ce qui survit à la [compaction](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-compaction). Voici le détail qui sert sur un travail long.

**Tableau 14.3 :** Les mauvais moments pour compacter. Pratique du guide, déduite des sources citées dans chaque ligne.

| Le moment | Pourquoi l’éviter |
| --- | --- |
| en pleine tâche, une fusion ou une mesure | le résumé peut perdre le détail dont l’étape suivante a besoin [\[13\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-how-claude-code-works) |
| au retour d’une pause plus longue que le cache | le résumé relit tout l’historique au plein tarif. Si l’historique ne sert plus, `/clear` et une note coûtent moins [\[31\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-prompt-caching) |
| quand une sortie d’outil énorme remplit la fenêtre | la compaction automatique s’arrête après quelques essais, sur une erreur [\[13\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-how-claude-code-works). Déléguez la lecture à un [sous-agent](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-sous-agent) ou découpez-la |
| quand l’état n’existe que dans la conversation | identifiants, empreintes de commit, heures et décisions non écrits peuvent se perdre au résumé. Écrivez-les d’abord (pratique du guide) |
| pour abandonner un chemin raté | `/rewind` revient à un début de conversation déjà en cache, ce qui coûte moins qu’un résumé [\[31\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-prompt-caching) |

**La compaction au repos.** À la date de consultation, le 2026-11-07, une session interactive laissée au repos environ une heure, sur le cache d’une heure et au-delà de 200 000 jetons par défaut, est compactée d’elle-même. Elle se coupe par `"idleCompaction": false` ou dans `/config` [\[32\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-settings-reference), et `/usage` peut afficher « Compact before you step away » [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-costs).

Ce guide propose un ordre, autour d’une compaction manuelle. **Avant** : une coupure (une tâche vérifiée, le travail commité), l’état écrit dans la note de passation datée à l’heure, la liste de tâches et le plan à jour, qui survivent à la compaction [\[30\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-context-window) [\[36\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-interactive-mode), et les règles qui doivent tenir dans le `CLAUDE.md` racine, rechargé [\[31\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-prompt-caching). **La commande** : `/compact garde l'état décrit dans notes/passation.md, et les identifiants et les empreintes tels quels`. **Après** : relisez la note et `git log`, relancez `/context` et `/usage` plutôt que de croire le résumé, et vérifiez par `/tasks` ce qui tourne encore en arrière-plan avant de rien relancer [\[30\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-context-window).

> **💡 Conseil**
>
> Un hook `SessionStart` peut réinjecter la note après chaque compaction ([chapitre 18](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#ch18)). Si vos hooks ne tournent pas, ce que `/hooks` montre, demandez à Claude de relire la note juste après `/compact` : c’est le même geste, fait à la main.

### 14.8 La boucle de livraison et ses traces

Une trace sert à ce qu’une autre personne, ou une session suivante, puisse reprendre ou vérifier le travail sans vous. Une pratique experte enchaîne les pratiques de ce chapitre et des chapitres [15](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#ch15) et [16](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#ch16) en une boucle où chaque étape laisse une trace relisible, à adapter à votre projet.

**Tableau 14.4 :** Chaque étape de la boucle et la trace qu’elle laisse. Proposé par ce guide.

| Étape | Trace laissée | Section |
| --- | --- | --- |
| étudier avant de choisir | un dossier de recherche : sources classées, affirmations étiquetées, passe de réfutation | 15.8 |
| décider ce qui engage | un enregistrement de décision | 14.8 |
| écrire les exigences | des exigences EARS, chacune avec un identifiant et la phrase de la demande d’où elle vient | 14.5 |
| faire contester les exigences | les constats d’un modèle d’une autre famille, chacun vérifié ou rejeté avec sa raison | 14.11 |
| écrire les tests d’abord | des tests qui échouent, liés aux exigences | 14.6 |
| mener chaque tâche | le test vu rouge puis vert, la sortie de la vérification, l’issue nommée | 14.10 |
| faire proposer, faire vérifier | la sortie de l’oracle, refus intermédiaires compris | 14.2 |
| faire relire | un rapport de relecture, constats classés par gravité | 16.3 |
| recetter avant « fini » | la demande mot pour mot, les sorties de la non-régression et du bout en bout, les notes du parcours réel | 14.9 |
| analyser un défaut | l’analyse de cause, les corrections d’instance et de classe, le cas de régression | 16.4 |
| capitaliser | une consigne versionnée, une entrée du journal des changements, un retour d’expérience | 16.5, 16.6 et 21.10 |

Les décisions s’écrivent une par fichier. [MADR](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-madr) (*Markdown Architectural Decision Records*) en donne la forme : le contexte et le problème, les options envisagées et la décision retenue, puis, en option, les conséquences et la confirmation [\[110\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-madr). La [section 21.9](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-9) en donne le détail et la rubrique de confirmation. Voici une décision de Samia, abrégée :

```text
# Garder les délais relatifs tels que le courrier les écrit

## Contexte et problème
Le courrier PASS-C-026 dit « dans les 15 jours suivant la réception ».
Un brouillon l'a rendu par une date calculée, fausse, que le contrôle n'a pas vue.

## Options envisagées
- Calculer la date limite dans le brouillon
- Garder le délai tel qu'il est écrit, et dire d'où il part

## Décision retenue
Garder le délai tel qu'il est écrit : l'outil ne connaît pas la date de
réception, et le contrôle peut retrouver le délai mot pour mot.

## Conséquences
- Une exigence EARS et un test couvrent les délais relatifs.
- La personne qui accompagne calcule la date avec l'usagère, si elle le souhaite.
```

Les consignes elles-mêmes, `CLAUDE.md`, skills et définitions d’agents, se versionnent comme du code, avec un journal des changements qui permet, après une régression, de retrouver la ligne qui l’a introduite ([section 21.10](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-10)).

### 14.9 La recette avant « fini », la demande mot pour mot, les documents d’un dépôt

La boucle de la [section 14.8](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-8) a besoin d’une porte à chaque bout : en entrée, la demande exacte, et en sortie, une [recette](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-recette), la vérification que le livrable fait ce qui était demandé, avant que quiconque dise « fini ». C’est le seul sens que ce guide donne à ce mot.

**En entrée : la demande, mot pour mot.** Recopiez la demande entre guillemets, avec sa date et sa source, avant toute reformulation et avant que le travail commence. Reformulez-la ensuite en exigences ([section 14.5](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-5)), et relisez les deux côte à côte : une exigence sans phrase d’origine est une invention, une phrase sans exigence est un oubli.

**Avant la construction : la base approuvée.** Ce guide propose qu’aucun lot ne démarre sur une base restée brouillon : la personne qui porte le projet approuve les exigences, la conception et le plan avant la construction. Chez Passerelle, Samia a relu les exigences du contrôle avant la vague de courriers : « D’accord pour la version 0.3, sauf l’exigence sur l’impression, à revoir avec Odile. » Le lot de l’impression a attendu, les autres ont démarré.

**En sortie : la recette, en trois temps, dans cet ordre.**

1. **La non-régression** : toute la suite de tests passe, pas seulement les nouveaux tests.
2. **Le bout en bout** : des tests parcourent l’outil par son point d’entrée réel, comme le ferait une bénévole, du fichier du courrier au brouillon et à la sortie du contrôle. Sans point d’entrée, ce temps est sauté, avec sa raison écrite.
3. **Le parcours réel** : l’outil est lancé et utilisé, et chaque exigence est relue contre ce qu’on voit ([section 5.3](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#s5-3)).

L’agent fait les trois et montre leurs preuves, et au début vous refaites le parcours réel vous-même. Un temps qui n’a pas pu se faire est dit « non vérifié », jamais « fini ». Chez Passerelle, Samia prononce la recette d’une version de l’outil, et Odile tranche chaque brouillon : une version recettée ne dispense d’aucune relecture.

**Les documents minimaux d’un dépôt.** Ce guide en propose sept, courts, chacun avec un seul rôle : le [README](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-readme), les exigences avec leur demande d’origine, la conception, les décisions, les tests, le glossaire et la [définition du fini](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-definition-du-fini). L’[annexe E](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-e-gabarits.html#ann-e) donne le gabarit de la définition du fini ([section E.5](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-e-gabarits.html#s-e-5)). Cette dernière dit ce qu’une version et une tâche doivent montrer, chaque condition nommant le contrôle qui la vérifie. Une seule commande, écrite dans le README, lance toute la vérification : les tests, les contrôles de sécurité ([chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/23-securite-et-propriete-intellectuelle-en-entreprise.html#ch23)) et l’oracle de spécification ([section 19.6](https://gmag-dev.github.io/bien-demarrer-claude-code/19-plusieurs-sessions-en-parallele.html#s19-6)).

Une recette prouve que le livrable fait ce qui était écrit, pas que ce qui était écrit était le bon besoin : celui-ci se cherche avant, par l’entretien ([section 14.5](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-5)).

### 14.10 La discipline par tâche et ses issues d’arrêt

Chaque tâche de code suit sa propre petite boucle. Deux motifs publics la décrivent, et ce guide les a déjà posés : explorer, planifier, coder, vérifier ([section 4.1](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-1)), et le test d’abord, vu échouer puis passer ([section 5.2](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#s5-2)). La preuve dépend du changement : rouge puis vert pour un comportement neuf ou un bogue ([section 5.1](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#s5-1)), une suite verte et un ancien nom introuvable pour un renommage, une trace avant la correction d’un bogue intermittent ([section 5.2](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#s5-2)). « Vérifié » se lit dans le code de sortie de la commande de vérification ([section 14.9](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-9)).

**Un arrêt a un nom.** Une tâche ne finit pas toujours par « vérifié ». Nommez d’avance les autres fins possibles, par exemple « non vérifié » quand le contrôle n’a pas tourné, ou « incomplet » quand il a tourné et échoue : l’arrêt devient un résultat, et non un silence. Ce qui touche l’intention, une demande qui sort du périmètre ou une exigence qui se lit de deux façons, remonte à la personne. « Fini » reste le mot de la recette, que prononce la personne ([section 14.9](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-9)).

La discipline par tâche prouve chaque pas, pas que la suite des pas mène au bon produit : cela reste l’affaire de la recette et de la personne.

### 14.11 L’avis d’une autre famille de modèles

Faites contester ce qui engage (exigences, conception, décision) par un modèle d’une autre famille, et traitez sa critique comme une piste, jamais comme un vote. C’est une proposition de ce guide, sans mesure publiée : un modèle proche risque de partager les angles morts du premier, une autre famille en a d’autres.

La règle tient en quatre points :

1. **Ce qui part est non confidentiel**, relu avant envoi : l’autre modèle est souvent chez un autre éditeur. Chez Passerelle, les exigences et les courriers fictifs s’y prêtent. Un vrai courrier, jamais.
2. **Chaque constat est une donnée à vérifier** ([section 15.3](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-3)) : confirmé contre le fichier, un test ou une source, ou rejeté avec sa raison écrite.
3. **La porte se franchit quand aucun constat grave ne reste ouvert** après cette vérification. L’accord des deux modèles ne prouve rien, leur désaccord non plus.
4. **Ce qui reste contesté revient à la personne**, avec les deux lectures. Elle tranche.

Chez Passerelle, Bernard soumet les six exigences du contrôle et trois courriers fictifs à un modèle d’une autre famille. Trois constats reviennent. Le premier, « aucune exigence ne couvre un montant écrit en lettres », se confirme : le courrier synthétique `PASS-C-028` dit « deux cents euros », et le contrôle ne le voit pas. Il devient une exigence et un test qui échoue. Le deuxième, « le brouillon devrait calculer la date limite », contredit la décision de la [section 14.8](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-8) : Bernard le rejette, avec ce renvoi. Le troisième, « le contrôle devrait refuser les phrases de plus de quinze mots », mêle un fait et un goût. Le compte des mots se vérifie : il va à l’oracle. Le seuil est un goût : Samia le fixe avec Odile.

> **⚠️ Attention**
>
> Copier un extrait vers un modèle d’un autre éditeur, c’est envoyer des données hors de votre poste. Relisez l’extrait avant de l’envoyer : ni nom, ni adresse, ni donnée d’usager, ni donnée de client ou d’employeur. Pour un travail d’employeur, n’utilisez que les outils que votre organisation autorise ([chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/23-securite-et-propriete-intellectuelle-en-entreprise.html#ch23)).

> **📌 À retenir**
>
> Avant de relire la liste, répondez de mémoire, puis vérifiez votre réponse dans la section indiquée :
>
> 1. Dans le motif à trois rôles, qui propose, qui vérifie, qui tranche, et pourquoi un modèle ne se vérifie-t-il pas lui-même ? ([section 14.2](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-2))
> 2. Pour livrer, pourquoi ce guide retient-il k réussites sur k essais plutôt qu’au moins une réussite en k essais ? ([section 14.3](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-3))
>
> - Le modèle propose, un oracle vérifie le vérifiable, une personne tranche l’intention et l’irréversible. Chez Passerelle, la personne qui tranche est une personne concernée.
> - Un évaluateur à base de modèle relit. Il ne sert jamais seul de porte.
> - Une exigence EARS se traduit en test. Pour livrer, visez k réussites sur k essais, sur des données synthétiques reproductibles.
> - Sur un travail long, l’état vit dans des fichiers relus au démarrage, et se vérifie après chaque compaction.
> - La demande se garde mot pour mot, la base s’approuve avant la construction, et « fini » se dit après la recette.
> - Chaque tâche finit par un mot d’issue fixé d’avance. L’avis d’une autre famille de modèles se vérifie, il ne vote pas.
> - Avant le pipeline, cadrez avec les parties prenantes sur un tableau blanc et un doc clé, mis à jour à chaque tour, tant que la question bouge.

> **✏️ Exercice**
>
> **Compétence visée** : construire la boucle proposer, vérifier, trancher sur un cas réel, et nommer son issue. Comptez 45 à 60 minutes, et 30 minutes par le chemin sans code.
>
> **① Exemple travaillé.** Inès étend le contrôle de Bernard aux délais. Elle n’écrit pas de Python : elle écrit les exigences et les prompts, et lit les sorties. Ses trois exigences : « Le contrôle de fidélité doit rendre la liste des délais du courrier » (permanente), « Quand un brouillon est écrit, le contrôle doit vérifier que chaque délai du courrier s’y retrouve tel qu’il est écrit » (événement), « Si un délai du courrier manque au brouillon, alors le contrôle doit échouer et nommer ce délai » (comportement indésirable). En mode Manual, elle demande : « Traduis ces trois exigences en tests, sur PASS-C-003 et PASS-C-026, lance-les et montre-moi qu’ils échouent. N’écris pas encore le code. » Les trois tests échouent. Elle fait ensuite implémenter. L’oracle, la suite de tests, renvoie le travail une fois : l’ancien test du petit mot devant chaque date ([chapitre 13](https://gmag-dev.github.io/bien-demarrer-claude-code/13-les-pieges-frequents.html#ch13)) échoue, parce que le nouveau code lisait « avant le 15 décembre 2026 » comme un délai et ne vérifiait plus le mot « avant ». Sa sortie revient à Claude, et le second essai passe toute la suite. Inès finit son rapport par « vérifié », sortie à l’appui. Odile relit `PASS-B-003` et écrit : « D’accord, la date limite est en premier. » **Pourquoi ?** Chaque exigence est devenue un test vu rouge avant le code, le refus de l’oracle est revenu avec sa raison, et la décision sur le brouillon est restée à Odile.
>
> **Sur Passerelle.** Refaites le geste d’Inès pour la référence : la dernière phrase du brouillon renvoie au courrier `PASS-C-003` par sa référence ([section 14.2](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-2)). Écrivez trois exigences EARS, une permanente, une déclenchée par un événement, un comportement indésirable. Dans le dossier de votre copie de Passerelle, lancez Claude Code en [mode Manual](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-mode-manual), par `claude --permission-mode manual`. Faites traduire les exigences en tests, et constatez qu’ils échouent avant toute implémentation. Faites ensuite implémenter, demandez la sortie de l’oracle qui passe, et notez combien de fois il a renvoyé le travail, et pourquoi. Le brouillon vérifié ne sert qu’après un accord : faites-le relire par une autre personne, ou à défaut par une session neuve de Claude qui n’a pas vu votre travail, et notez l’avis reçu, votre décision et sa raison.
>
> **Sur votre projet.** Refaites le geste sur une petite fonction de votre projet, et terminez votre rapport par un mot d’issue, avec sa preuve.
>
> **Sans code** : sur papier, listez chaque date, chaque montant, chaque délai et la référence de `PASS-C-003`, puis cochez chacun dans un brouillon que vous écrivez vous-même. Écrivez ensuite les trois exigences de la référence en phrases EARS, sur le modèle de celles d’Inès, sans les traduire en tests.
>
> **Critère de réussite** : trois exigences écrites, la sortie d’un test qui échoue avant l’implémentation et passe après, le compte des refus de l’oracle, l’issue nommée, et la décision écrite de la relecture, avec sa raison. Par le chemin sans code : la liste écrite des dates, des montants, des délais et de la référence de `PASS-C-003`, chacun coché dans votre brouillon ou noté absent, et les trois exigences de la référence en phrases EARS, une permanente, une déclenchée par un événement, un comportement indésirable.
>
> **Pour vous corriger**, sans corrigé : relisez votre travail contre ces cinq points. Chacun se voit dans ce que vous avez écrit ou obtenu.
>
> 1. Chaque exigence suit son gabarit du tableau 14.2 : la permanente dit « Le \<système> doit », celle déclenchée par un événement commence par « Quand », le comportement indésirable par « Si…, alors » ([section 14.5](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-5)).
> 2. Chaque exigence a son test, et vous avez sa sortie en échec, obtenue avant l’implémentation, puis une sortie où toute la suite passe, pas seulement les nouveaux tests (sections [14.5](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-5) et [14.9](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-9)).
> 3. Chaque renvoi de l’oracle que vous avez compté a sa raison, tirée de la sortie de l’oracle, comme l’ancien test du petit mot dans l’exemple d’Inès ([section 14.2](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-2)).
> 4. Votre mot d’issue correspond à sa preuve : « vérifié » se lit dans le code de sortie de la commande de vérification, sortie montrée, « non vérifié » dit que le contrôle n’a pas tourné, « incomplet » qu’il a tourné et échoue ([section 14.10](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-10)).
> 5. L’avis sur le brouillon vient d’une autre personne ou d’une session neuve qui n’a pas vu votre travail, et la décision écrite, avec sa raison, est la vôtre : un évaluateur à base de modèle relit, il ne sert jamais seul de porte ([section 14.3](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-3)).
>
> Par le chemin sans code, appliquez le premier point à vos trois phrases, et vérifiez que chaque élément coché se retrouve dans votre brouillon tel que le courrier l’écrit.

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/guide-en-une-page.html#toc)

![Illustration : la personne en long manteau violet et son petit compagnon de cristal cyan, tendent une enveloppe lumineuse à de petits compagnons qui partent vers plusieurs postes de travail.](https://gmag-dev.github.io/bien-demarrer-claude-code/images/49503ceaf730.avif)
