> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.4.2 : « 1. Ce qu’est Claude Code ».
>
> - Précédent : [Prérequis](https://gmag-dev.github.io/bien-demarrer-claude-code/md/prerequis.md)
> - Suivant : [2. Bien démarrer (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/2-bien-demarrer-1.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/1-ce-qu-est-claude-code.html#h-ch1>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## 1. Ce qu’est Claude Code

> **🪪 Ce chapitre**
>
> **Pour qui** : toute personne qui ouvre Claude Code pour la première fois, ou qui s’en sert sans avoir séparé ce que le modèle décide de ce que le logiciel impose.
>
> **Sur quel poste** : n’importe lequel, sans installation. Seul le barreau ③ de l’exercice demande Claude Code : faites-le après le [chapitre 2](https://gmag-dev.github.io/bien-demarrer-claude-code/2-bien-demarrer.html#ch2) s’il le faut.
>
> **Ce que vous apprenez** : distinguer une consigne d’une règle imposée, et reconnaître les trois phases de la boucle agentique dans une vraie session.
>
> **Deux chemins** : si vous débutez, lisez tout le chapitre et faites les trois barreaux : comptez 20 à 30 minutes pour l’exercice. Si vous répondez juste à la question ci-dessous, lisez les encadrés « Quand la règle cède » et faites le barreau ③.
>
> **Le fil rouge** 🌉 Passerelle : Inès fait expliquer un premier courrier par Claude, et Samia pose la première règle de l’association : l’outil n’envoie jamais rien. Reste à savoir si cette règle est une consigne ou une règle imposée.
>
> **Où en est Passerelle** : en arrivant, rien n’existe encore. À la fin du chapitre, l’association a un dossier de projet avec dix courriers fictifs, `PASS-C-001` à `PASS-C-010`, et sa première règle est nommée comme une règle imposée, à poser au [chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#ch10).

Avant de donner une première consigne, il faut savoir à qui l’on parle. Un assistant de complétion propose la ligne suivante dans le fichier ouvert. Claude Code, lui, voit tout le projet, lance des commandes, lit leurs résultats et enchaîne des dizaines d’actions pour atteindre un but [\[13\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-how-claude-code-works). Ce chapitre décrit ses composants, sa façon de travailler, ce à quoi il a accès, et la distinction la plus utile pour bien commencer : ce que Claude décide, et ce que le logiciel impose.

> **⏭️ Vous pouvez sauter ce chapitre si…**
>
> Vous voulez que Claude ne lise jamais votre fichier `.env`, qui contient des mots de passe. Que mettez-vous en place, et pourquoi pas une simple ligne dans `CLAUDE.md` ? Écrivez votre réponse avant d’ouvrir la réponse attendue.
>
> **Voir la réponse attendue**
>
> Une ligne de `CLAUDE.md` est une consigne : le modèle la lit et la suit presque toujours, sans garantie. Ce qui doit arriver toujours, ou jamais, relève d’une règle imposée, que le logiciel applique lui-même : ici une règle `deny` sur la lecture de `.env`, posée dans vos réglages ([section 10.1](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#s10-1)). Une réponse d’experte dit aussi la limite de cette règle : elle porte sur l’appel d’outil, et un script lancé par Claude peut encore ouvrir le fichier [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permissions).
>
> Vous avez ces éléments ? Lisez seulement les encadrés « Quand la règle cède » et faites le barreau ③ de l’exercice. Sinon, lisez le chapitre dans l’ordre : il est écrit pour vous.

### 1.1 Un modèle, un harnais, des outils

Pour savoir ce que vous pouvez attendre de Claude, et ce qu’il faut lui imposer, il faut savoir qui fait quoi. Claude Code réunit trois choses : un modèle qui raisonne, des outils qui agissent, et une couche de logiciel qui relie les deux [\[13\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-how-claude-code-works). Le **modèle**, Claude, lit le code, raisonne et choisit la prochaine étape. Les **outils** agissent : lire un fichier, le modifier, lancer une commande, chercher sur le web. Claude Code est la couche qui entoure le modèle, lui fournit ces outils et gère ce qu’il voit. C’est ce qu’on appelle le [harnais](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-harnais).

Dans ce guide, « Claude décide » veut dire que le modèle raisonne. « Claude Code applique » veut dire que le harnais exécute.

*Dessin : Architecture de Claude Code. Schéma : la description suit.*

**Figure 1.1 :** L’architecture : vous, le harnais, le modèle et votre machine. Le modèle ne touche jamais directement votre machine : il demande un appel d’outil, que le harnais exécute après le contrôle des permissions. D’après [\[13\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-how-claude-code-works) et [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permissions).

Le même schéma, en texte :

1. Vous envoyez un [prompt](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-prompt) au harnais, qui tient le contexte, les permissions et les outils.
2. Le harnais envoie le contexte au modèle, qui répond par des appels d’outils.
3. Les outils agissent sur votre machine après le contrôle des permissions : fichiers, [terminal](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-terminal), [git](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-git).

Les outils intégrés se rangent en cinq catégories, chacune une forme d’action ([tableau 1.1](https://gmag-dev.github.io/bien-demarrer-claude-code/1-ce-qu-est-claude-code.html#tab-1-1)). S’y ajoutent des outils d’organisation, comme lancer un [sous-agent](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-sous-agent), une autre instance de Claude qui travaille dans son propre contexte et rend un résumé, ou vous poser une question [\[13\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-how-claude-code-works).

**Tableau 1.1 :** Les cinq catégories d’outils intégrés, d’après [\[13\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-how-claude-code-works).

| Catégorie | Ce que Claude peut faire | Chez Passerelle 🌉 |
| --- | --- | --- |
| Opérations sur les fichiers | lire, modifier, créer, renommer et réorganiser des fichiers | lire un courrier, écrire un brouillon |
| Recherche | trouver des fichiers par leur nom, chercher dans leur contenu | retrouver les courriers qui citent une date |
| Exécution | lancer des commandes, les tests, git | le contrôle des dates ([chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#ch5)) |
| Web | chercher sur le web, lire une page | aucun usage, et c’est voulu ([chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#ch10)) |
| Intelligence de code | voir les erreurs de typage, aller à une définition (avec un greffon dédié) | aucun usage au départ |

Pourquoi cette distinction compte : le modèle peut se tromper ou oublier une consigne, alors que le harnais applique mécaniquement ce que vous configurez. Bien travailler avec Claude Code, c’est pour une large part confier au harnais ce qui ne doit jamais dépendre d’un oubli.

Un projet avec Claude Code réunit plus que ces trois pièces, et savoir laquelle fait quoi évite deux erreurs : attendre du modèle une garantie qu’il ne peut pas donner, et oublier que ce sont les outils qui agissent sur votre poste, avec vos droits. La [figure 1.2](https://gmag-dev.github.io/bien-demarrer-claude-code/1-ce-qu-est-claude-code.html#fig-1-2) montre l’ensemble. Vous demandez et décidez. Le harnais fournit les outils, gère le contexte du modèle et applique les permissions [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permissions). Le modèle propose. Votre projet apporte ses fichiers, ses consignes et ses réglages, et des extensions s’y ajoutent quand une gêne revient [\[13\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-how-claude-code-works) [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-features-overview). Chaque pièce sera reprise : les consignes au [chapitre 2](https://gmag-dev.github.io/bien-demarrer-claude-code/2-bien-demarrer.html#ch2), les extensions au [chapitre 6](https://gmag-dev.github.io/bien-demarrer-claude-code/6-choisir-ses-extensions.html#ch6), les permissions au [chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#ch10).

*Dessin : L'architecture d'un projet avec Claude Code : qui fait quoi, et pourquoi. Schéma : la description suit.*

**Figure 1.2 :** L’architecture d’un projet avec Claude Code : qui fait quoi, et pourquoi. En tirets vos gestes, en bleu ce que le harnais applique, en gris ce que le modèle lit ou propose, en ambre ce qui s’exécute avec vos droits, en vert ce qui travaille dans un contexte à part. Chaque bloc dit son rôle en mots, et son pourquoi en italique. Schéma proposé par ce guide, d’après [\[13\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-how-claude-code-works), [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices), [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permissions), [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory), [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-features-overview) et [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sandboxing).

Le même schéma, en texte :

1. Vous demandez, décidez et interrompez par Échap : le but et le dernier mot sont à vous.
2. Claude Code, le harnais, appelle le modèle, lui fournit ses outils et applique les permissions, pour que ce qui doit tenir ne dépende pas d’un oubli du modèle.
3. Le modèle, Claude, lit le contexte que le harnais lui envoie et propose l’étape suivante. Il raisonne, mais peut se tromper ou oublier.
4. Si c’est permis, le harnais exécute les outils : lire, écrire, shell, web. Ce sont eux qui agissent, avec les droits de votre terminal.
5. Ce qui sort, une réponse, des fichiers modifiés, un commit, vous revient : vous relisez et gardez la main.
6. Votre projet apporte ses fichiers, lus et modifiés par les outils, ses consignes, `CLAUDE.md`, lu à chaque session et suivi presque toujours, et ses réglages et permissions, appliqués par le harnais quoi que décide le modèle.
7. Les extensions s’ajoutent quand une gêne revient : les skills, une procédure chargée quand elle sert, les hooks, ce qui arrive à chaque fois, les sous-agents, une tâche dans un contexte à part, et les serveurs MCP, un système que Claude ne voit pas.
8. Où chaque fichier est rangé, et s’il se partage : [annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#ann-l), [section L.1](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-1).

### 1.2 La boucle agentique

Pour savoir quand intervenir, il faut voir où en est Claude. Face à une tâche, il traverse trois phases : **réunir le contexte**, **agir**, **vérifier les résultats** [\[13\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-how-claude-code-works). Ces phases se mêlent : Claude se sert de ses outils tout du long, et chaque résultat nourrit sa décision suivante. On parle de [boucle agentique](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-boucle-agentique). Une simple question peut ne demander que la première phase. Une correction les parcourt plusieurs fois.

*Dessin : La boucle agentique. Schéma : la description suit.*

**Figure 1.3 :** La boucle agentique : trois phases qui se répètent jusqu’à la fin de la tâche. Vous restez dans la boucle et pouvez l’infléchir à tout moment. D’après [\[13\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-how-claude-code-works).

Le même flux, en texte :

1. Votre demande ouvre la boucle : Claude réunit le contexte, agit, puis vérifie.
2. Si la tâche est finie, la boucle s’arrête. Sinon, elle repart vers le contexte.
3. À tout moment, Échap ou une correction de votre part l’infléchit.

Pour « corrige les [tests](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-test) qui échouent », Claude peut lancer les tests, lire l’erreur, chercher et lire les fichiers en cause, les modifier, puis relancer les tests pour vérifier [\[13\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-how-claude-code-works).

Chez Passerelle, Inès fait le même chemin sans écrire une ligne de code. Elle demande : « Explique-moi en phrases simples le courrier PASS-C-003, puis liste ses dates et ses montants. » Claude lit le courrier (le contexte), écrit l’explication (agir), puis relit le courrier pour comparer sa liste (vérifier). Voici ce courrier, inventé comme tous ceux de Passerelle :

```text
Courrier fictif PASS-C-003, créé pour ce guide.
Bureau des aides de Rivelune (organisme fictif)
Objet : réexamen de votre aide au logement

Madame,
À la suite du réexamen de votre dossier, le montant de votre aide est fixé à 212,40 euros par mois à compter du 1er janvier 2027.
Pour conserver vos droits, vous devez nous transmettre votre avis d'imposition avant le 15 décembre 2026.
Sans réponse de votre part à cette date, le versement sera suspendu.
```

Vous faites partie de la boucle : Échap arrête Claude tout de suite, et une correction tapée pendant qu’il travaille est mise en file, puis lue dès la fin des appels d’outils en cours [\[13\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-how-claude-code-works).

Pour voir la boucle tourner sans risque, lancez Claude Code dans le dossier de votre projet en [mode Manual](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-mode-manual), où il vous demande avant de modifier un fichier ou de lancer une commande [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permission-modes) :

```bash
claude --permission-mode manual
```

Les lignes qui défilent montrent chaque outil employé. Le [chapitre 2](https://gmag-dev.github.io/bien-demarrer-claude-code/2-bien-demarrer.html#ch2) dit comment régler ce mode dans l’extension de votre éditeur et dans l’application.

> **🔀 Quand la règle cède**
>
> - La boucle s’arrête quand Claude juge la tâche finie, et ce jugement est celui du modèle. Sans un contrôle qui peut échouer, « fini » veut dire « a l’air fini » : c’est l’objet du [chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#ch5).
> - Ce qui tient : vous restez dans la boucle, et Échap l’interrompt à tout moment.
> - Pour aller plus loin : [section 14.1](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-1).

### 1.3 Ce à quoi Claude a accès

Ce que Claude peut toucher décide de ce qui peut mal tourner, et de ce que vous devez garder hors de sa portée. En une phrase : lancé depuis un dossier, Claude a les pouvoirs de votre terminal. Il accède [\[13\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-how-claude-code-works) :

- aux fichiers du projet et de ses sous-dossiers, et à d’autres fichiers avec votre permission,
- à votre terminal : toute commande que vous pourriez lancer vous-même,
- à l’état de git : la [branche](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-branche) courante, les modifications non enregistrées, l’historique récent,
- à vos fichiers `CLAUDE.md` ([chapitre 2](https://gmag-dev.github.io/bien-demarrer-claude-code/2-bien-demarrer.html#ch2)) et à sa mémoire automatique,
- aux extensions que vous configurez : les serveurs [MCP](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-mcp), des connecteurs vers des outils externes, les [skills](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-skill), des instructions que Claude charge à la demande, et les sous-agents (chapitres [6](https://gmag-dev.github.io/bien-demarrer-claude-code/6-choisir-ses-extensions.html#ch6) à [8](https://gmag-dev.github.io/bien-demarrer-claude-code/8-le-travail-en-parallele.html#ch8)).

Chaque session est enregistrée sur votre poste, message par message, dans un fichier texte au format [JSONL](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-jsonl). C’est ce qui permet de reprendre une session ou de revenir en arrière. Les sessions sont indépendantes : chacune démarre avec une [fenêtre de contexte](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-fenetre-de-contexte) vide, sans l’historique des précédentes [\[13\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-how-claude-code-works).

Ce que Claude lit entre dans son contexte, que le harnais envoie au modèle [\[13\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-how-claude-code-works). Chez Passerelle, Amadou en a tiré la règle du dossier : n’y entrent que des courriers inventés, préfixés `PASS-`. Un vrai courrier contient un nom, une adresse, des revenus, parfois la santé de la personne. Il reste dans l’armoire de la permanence.

> **⚠️ Attention**
>
> Ce que Claude lit part vers le modèle. Ne lui donnez donc jamais une donnée de client ou d’employeur, ni le vrai courrier d’une personne, dans une IA personnelle, c’est-à-dire un compte ou un outil que vous avez ouvert vous-même. Sur un compte commercial fourni par une organisation, Team, Enterprise ou API, ce sont ses règles qui s’appliquent. Un abonnement Pro, Max ou Ultra reste un compte personnel au sens de ce guide, même payé par l’employeur ([section 23.1](https://gmag-dev.github.io/bien-demarrer-claude-code/23-securite-et-propriete-intellectuelle-en-entreprise.html#s23-1)). Travaillez sur des données inventées et marquées comme telles, et gardez les vraies hors du dossier du projet.

> **🔀 Quand la règle cède**
>
> - Les pouvoirs du terminal valent aussi pour ce qui étend Claude : un [hook](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-hook), une commande que Claude Code lance à un moment fixe, s’exécute avec toutes vos permissions ([section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/7-ecrire-ses-premieres-extensions.html#s7-2)).
> - Ce qui tient : le moindre privilège se règle par la structure, les outils permis et les dossiers ouverts, pas par une consigne.
> - Pour aller plus loin : [chapitre 17](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#ch17).

### 1.4 Consigne ou règle imposée

Une règle qui ne souffre aucune exception ne peut pas dépendre d’un modèle qui, parfois, oublie. D’où la distinction la plus utile pour commencer. Toute instruction donnée à Claude Code est de l’une de deux natures [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Une [consigne](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-consigne), comme votre prompt, `CLAUDE.md` ou le contenu d’un skill, est lue par le modèle, qui décide quoi en faire : il la suit presque toujours, sans garantie. Une [règle imposée](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-regle-imposee), comme un hook, une [règle deny](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-regle-deny) ou un réglage géré par une organisation, est appliquée par le harnais, quoi que décide le modèle : elle tient [par construction](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-par-construction), dans ses limites [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permissions) [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks).

**Tableau 1.2 :** Consignes et règles imposées, d’après [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices).

| Question | Consigne (Claude décide) | Règle imposée (le harnais applique) |
| --- | --- | --- |
| Que faire ? | le prompt, `CLAUDE.md`, un skill, même réservé à votre commande : Claude lit ses étapes et décide | un hook |
| Que peut-il toucher ? | le jugement de Claude, et en mode auto un second modèle qui filtre les actions, sans garantie ([section 2.3](https://gmag-dev.github.io/bien-demarrer-claude-code/2-bien-demarrer.html#s2-3)) | les règles `deny`, le bac à sable, les réglages gérés |
| Quand est-ce fini ? | une demande de preuve | les tests, un hook qui relance le travail tant qu’un contrôle échoue ([chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#ch5)) |
| Qui a le dernier mot ? | le résumé de Claude | une personne qui relit et approuve |

La plupart du temps, mieux vaut laisser Claude décider : presque toute règle a ses exceptions, et le modèle, qui a le projet sous les yeux, juge souvent mieux qu’une règle écrite d’avance. Les règles imposées se réservent à ce qui doit arriver toujours, ou jamais [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Si vous insistez de plus en plus sur une ligne de `CLAUDE.md` sans résultat, elle relève sans doute d’une règle imposée.

Chez Passerelle, Samia a posé la première règle : l’outil n’envoie jamais rien, ni courriel, ni formulaire, ni message. Écrite dans `CLAUDE.md`, elle ne serait qu’une consigne. Or elle ne souffre aucune exception : un brouillon parti avant la relecture d’Odile, c’est peut-être un délai mal compris par Josiane. Elle relève donc d’une règle imposée, posée au [chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#ch10) avec ses limites ([section 10.3](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#s10-3)).

*Dessin : Consigne ou règle imposée, la première règle de Passerelle. Schéma : la description suit.*

**Figure 1.4 :** Consigne ou règle imposée, la première règle de Passerelle. En gris le projet, en bleu la question, en ambre la règle à imposer, en vert ce qui tient, en tirets le geste d’une personne. Schéma proposé par ce guide.

Le même choix, en texte :

1. Pour la règle « l’outil n’envoie jamais rien », une seule exception serait-elle grave ?
2. Si non, une consigne suffit. Si oui, il faut une règle imposée, que le [chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#ch10) pose.
3. Dans tous les cas, Odile relit chaque brouillon et décide s’il sort.

> **🔀 Quand la règle cède**
>
> - Un skill reste une consigne, à une exception près. Ses commandes injectées, le harnais les exécute avant que Claude lise le skill ([annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#ann-l), [section L.2](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-2)).
> - Une règle imposée tient dans ses propres limites. Une règle `deny` porte sur le texte de l’appel d’outil, pas sur l’intention : un script lancé par Claude peut encore lire le fichier qu’elle protège [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permissions). Un hook a ses cas où il ne bloque pas ([chapitre 18](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#ch18)).
> - Ce qui tient : ce qui doit tenir à coup sûr se place aussi là où le poste ne peut pas l’atteindre, comme la protection d’une branche sur le serveur, ou l’intégration continue quand sa définition est elle-même protégée (chapitres [11](https://gmag-dev.github.io/bien-demarrer-claude-code/11-commits-et-collaboration.html#ch11) et [17](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#ch17)).
> - Pour aller plus loin : [section 17.3](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#s17-3) et [chapitre 18](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#ch18).

> **📌 À retenir**
>
> - Le modèle raisonne, les outils agissent, le harnais organise et contrôle.
> - La boucle : réunir le contexte, agir, vérifier, recommencer. Vous pouvez l’interrompre à tout moment par Échap.
> - Claude a les pouvoirs de votre terminal, et ce qu’il lit part vers le modèle : aucune donnée réelle d’une personne dans le dossier.
> - Une consigne est suivie presque toujours. Une règle imposée est appliquée par le harnais, dans ses limites. Ce qui ne souffre aucune exception devient une règle imposée.

> **✏️ Exercice en trois barreaux**
>
> **Compétence visée** : reconnaître les trois phases de la boucle agentique dans une session, et distinguer une consigne d’une règle imposée. Comptez 20 à 30 minutes.
>
> **① Exemple travaillé.** Inès a demandé : « Explique-moi en phrases simples le courrier PASS-C-003 dans le fichier explication-003.md, puis vérifie que chaque date et chaque montant du courrier y figure. » La session a affiché ces appels d’outils, dans cet ordre :
>
> ```text
> 1. Glob     courriers/PASS-C-*.txt
> 2. Read     courriers/PASS-C-003.txt
> 3. Write    explications/explication-003.md
> 4. Grep     "1er janvier 2027", "15 décembre 2026", "212,40 euros", un par un, dans explications/explication-003.md
> 5. Edit     explications/explication-003.md (ajout du 1er janvier 2027)
> 6. Grep     "1er janvier 2027", "15 décembre 2026", "212,40 euros", un par un, dans explications/explication-003.md
> ```
>
> Rangées par phase : les lignes 1 et 2 réunissent le contexte, la ligne 3 agit, la ligne 4 cherche une à une chaque date et chaque montant du courrier et trouve que le 1er janvier 2027 manque, la ligne 5 agit de nouveau, la ligne 6 vérifie encore. La boucle a tourné deux fois. Côté règles, un exemple travaillé aussi : écrite dans `CLAUDE.md`, la ligne « ne lis jamais `.env` » n’est qu’une consigne. Pour tenir quoi que décide le modèle, elle devient une règle `deny`, que le harnais applique dans ses limites ([section 1.4](https://gmag-dev.github.io/bien-demarrer-claude-code/1-ce-qu-est-claude-code.html#s1-4)). **Pourquoi ?** Que se serait-il passé si la ligne 6 avait manqué ?
>
> **② À compléter.** Bernard a demandé : « Fais la liste des montants des dix courriers dans montants.md. » Voici sa session :
>
> ```text
> 1. Glob     courriers/PASS-C-*.txt
> 2. Read     courriers/PASS-C-001.txt … courriers/PASS-C-010.txt
> 3. Write    montants.md
> 4. Grep     chaque montant lu à la ligne 2, un par un, dans montants.md
> 5. Edit     montants.md (ajout du montant de PASS-C-007)
> 6. Edit     montants.md (correction du montant de PASS-C-002)
> 7. Grep     chaque montant lu à la ligne 2, un par un, dans montants.md
> ```
>
> Reconnaissez la phase de chaque ligne, rangez-la, et dites pourquoi « agir » revient deux fois de suite. Puis une question de plus : Samia écrit dans `CLAUDE.md` « N’envoie jamais rien ». Distinguez : est-ce une consigne ou une règle imposée, et que faudrait-il pour qu’elle tienne quoi que décide le modèle ?
>
> **③ Sur votre projet.** En mode Manual, lancé par `claude --permission-mode manual` depuis le dossier de votre projet, cassez volontairement un test, puis demandez « corrige les tests qui échouent ». Notez les outils dans l’ordre où ils s’affichent, et rangez chaque ligne dans une phase.
>
> **Sans code** : faites le barreau ③ sur un document de votre projet. Demandez à Claude de le résumer dans un fichier, puis de vérifier que chaque date du document figure dans le résumé, et rangez les outils de la même façon.
>
> **Critère de réussite** : une liste écrite des outils, dans l’ordre affiché, chaque ligne rangée dans une phase, chaque modification suivie d’une vérification, et la sortie de la dernière vérification, qui passe. Par le chemin sans code, la même liste, faite sur votre document, et la sortie de la dernière recherche, qui retrouve chaque date du document dans le résumé.
>
> **Voir le corrigé expliqué (après votre essai)**
>
> **①** Sans la ligne 6, l’ajout de la date n’aurait pas été vérifié : la tâche aurait eu l’air finie sans l’être, et une faute de frappe dans la date serait passée. Une modification se suit d’une vérification, et le [chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#ch5) en fait une règle. La boucle ne finit d’ailleurs pas chez Claude : à la permanence, Odile relit l’explication de ce courrier fictif et décide si elle sert.
>
> **②** Lignes 1 et 2 : le contexte. Ligne 3 : agir. Ligne 4 : vérifier, et la recherche trouve deux écarts. Lignes 5 et 6 : agir deux fois, pour deux défauts distincts, un montant manquant et un montant faux. Ligne 7 : vérifier les deux corrections. Erreur fréquente : ranger la ligne 4 dans le contexte, alors qu’elle contrôle l’action qui la précède. La phrase de Samia dans `CLAUDE.md` est une consigne. Pour tenir quoi que décide le modèle, elle doit devenir une règle imposée ([chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#ch10)). Et un brouillon ne sort que si Odile le décide.
>
> **③** Votre liste montre au moins une modification suivie d’un lancement des tests, et la sortie du dernier lancement, qui passe. Si Claude a modifié sans relancer les tests, demandez-lui de le faire et de vous montrer la sortie. En mode Manual, c’est vous qui avez validé chaque lancement des tests.

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/guide-en-une-page.html#toc)

![Illustration : la personne en long manteau violet et son petit compagnon de cristal cyan, devant une porte en forme de fenêtre de terminal, une première ligne de lumière tracée dans l’air, un parchemin posé sur un socle.](https://gmag-dev.github.io/bien-demarrer-claude-code/images/fdb2bb057dad.avif)
