> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.4.2 : « 3. La fenêtre de contexte ».
>
> - Précédent : [2. Bien démarrer (partie 2 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/2-bien-demarrer-2.md)
> - Suivant : [4. La méthode de travail (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/4-la-methode-de-travail-1.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/3-la-fenetre-de-contexte.html#h-ch3>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## 3. La fenêtre de contexte

> **🪪 Ce chapitre**
>
> **Pour qui** : toute personne qui garde la même conversation d’une tâche à l’autre, ou qui voit Claude oublier une consigne du matin.
>
> **Sur quel poste** : n’importe lequel, avec Claude Code installé ([chapitre 2](https://gmag-dev.github.io/bien-demarrer-claude-code/2-bien-demarrer.html#ch2)). Les commandes `/clear`, `/compact` et `/context` sont les mêmes dans le terminal et dans l’extension de l’éditeur.
>
> **Ce que vous apprenez** : choisir entre `/clear` et `/compact` selon ce qui doit survivre, et le vérifier par `/context`.
>
> **Deux chemins** : si vous débutez, lisez tout le chapitre et faites les trois barreaux : comptez 20 à 35 minutes pour l’exercice. Si vous répondez juste à la question ci-dessous, lisez les encadrés « Quand la règle cède » et faites le barreau ③.
>
> **Le fil rouge** 🌉 Passerelle : vingt courriers de plus arrivent. Bernard les traite en une longue conversation, qui s’alourdit. Il écrit une note de passation avant de compacter, et un sous-agent lit les longues notices jointes.
>
> **Où en est Passerelle** : en arrivant, un `CLAUDE.md` de moins de vingt lignes, chargé et vérifié par `/context`. Le dossier compte désormais trente courriers fictifs, `PASS-C-001` à `PASS-C-030`. À la fin du chapitre, une note de passation datée, `notes/passation.md`, est dans le dépôt de Passerelle.

Une session de Claude Code ne garde pas en tête que votre dernière demande. Elle garde tout ce qui s’est dit et lu depuis son début, et le relit avant chaque réponse. Au fil d’une journée, des tâches sans rapport s’empilent, chaque réponse coûte un peu plus, et une consigne donnée tôt peut se perdre. Ce chapitre dit ce qui occupe cette mémoire de travail, comment la vider ou la résumer sans perdre l’essentiel, comment y faire entrer le bon contenu, et ce que les sous-agents y changent.

> **⏭️ Vous pouvez sauter ce chapitre si…**
>
> Vous venez de terminer une correction de bogue dans une session. Vous passez à une tâche sans rapport, la mise à jour de la documentation. Que tapez-vous d’abord, et que devient votre `CLAUDE.md` ? Écrivez votre réponse avant d’ouvrir la réponse attendue.
>
> **Voir la réponse attendue**
>
> `/clear`, qui repart d’une conversation vide et ne coûte rien : la tâche suivante ne paie plus pour l’historique de la précédente [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). `CLAUDE.md` reste chargé, puisqu’il est lu au début de chaque session et rechargé depuis le disque [\[30\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-context-window). Une réponse d’experte ajoute le cas inverse : si le même travail continuait, `/compact` avec une consigne, à une coupure, après avoir écrit l’état dans une note, et avant une pause plutôt qu’au retour [\[31\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-prompt-caching).
>
> Vous avez ces éléments ? Lisez seulement les encadrés « Quand la règle cède » et faites le barreau ③ de l’exercice. Sinon, lisez le chapitre dans l’ordre : il est écrit pour vous.

### 3.1 Ce qui occupe la fenêtre

Une consigne du matin oubliée l’après-midi, des réponses qui coûtent de plus en plus : les deux viennent de ce que la session garde en mémoire. Un sujet, une conversation. La [fenêtre de contexte](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-fenetre-de-contexte) est comme un bureau : tout ce que Claude a lu ou écrit pendant la session y reste posé, et il le relit en entier avant chaque réponse. Plus le bureau est encombré, plus chaque réponse coûte, et plus vos consignes du début risquent de se perdre. Ce bureau se mesure en [jetons](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-jeton), l’unité dans laquelle le modèle compte le texte.

La fenêtre contient l’historique de la conversation, les fichiers lus, les sorties des commandes, les fichiers `CLAUDE.md`, la mémoire automatique, les skills chargés et les instructions du système [\[13\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-how-claude-code-works). Avant même votre premier message, s’y trouvent déjà `CLAUDE.md`, les règles de `.claude/rules/` sans `paths`, la mémoire automatique, les noms des outils des serveurs [MCP](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-mcp) et les descriptions des skills [\[30\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-context-window) [\[17\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-memory). `/context` montre cette répartition à tout moment.

La plupart des modèles actuels ont une fenêtre d’un million de jetons, et la conversation est résumée automatiquement à l’approche de la limite : on manque rarement de place [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Mais on paie le contexte inutile. Chaque requête renvoie toute la conversation : une conversation qui a accumulé trois tâches sans rapport les relit toutes à chaque tour de la quatrième [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Le [cache de prompt](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-cache-de-prompt) rend cette relecture moins chère tant qu’il est chaud : environ une heure sur un abonnement, dans les limites du forfait, et cinq minutes avec une clé d’[API](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-api) [\[31\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-prompt-caching).

Chez Passerelle, Bernard a traité les dix premiers courriers, puis une mise à jour des règles de rédaction, puis vingt courriers neufs, dans la même conversation. `/context` lui montre une conversation qui pèse bien plus que les courriers du jour.

> **🔀 Quand la règle cède**
>
> - Le seuil de la compaction automatique et la durée du cache dépendent du modèle, de la version et du mode de paiement. 🕘 À la version 2.1.319, du 6 novembre 2026, les modèles à fenêtre native d’un million (les modèles Fable, Sonnet 5 et suivants, Haiku 5.5, Opus 4.7 et suivants) compactent vers 967 000 jetons par défaut, et `/autocompact` règle ce seuil [\[39\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-model-config).
> - Ce qui tient : on paie le contexte inutile, quelle que soit la taille de la fenêtre.
> - Pour aller plus loin : [section 14.7](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-7) et [annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#ann-l), [section L.13](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-13).

### 3.2 Vider, compacter, et ce qui survit

Une conversation qui s’allonge coûte plus à chaque tour, et ses consignes du début peuvent se perdre : il faut savoir la vider, ou la résumer sans perdre l’essentiel. Nouveau sujet, nouvelle conversation, avec `/clear`. Si le même travail continue et que la conversation s’allonge, `/compact` la résume en gardant l’essentiel.

`/clear` repart d’une conversation vide. Il ne coûte rien, et la tâche suivante ne paie plus pour l’historique de la précédente. Nommez d’abord la session par `/rename` si vous voulez y revenir [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices) [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-costs).

`/compact` remplace la conversation par un résumé structuré : c’est la [compaction](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-compaction). Donnez-lui une consigne, sinon il devine ce qui compte [\[13\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-how-claude-code-works) [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-costs) [\[30\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-context-window) :

```text
/compact garde l'état décrit dans notes/passation.md, et les identifiants des courriers tels quels
```

Le résumé est une requête à part [\[31\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-prompt-caching). Cache chaud, elle lit l’historique dans le cache et coûte une fraction de ce que la taille du contexte laisse penser. Après une pause plus longue que le cache, elle relit tout l’historique au plein tarif. D’où la règle : compactez avant la pause, pas au retour.

Tout ne survit pas de la même façon (skills et règles : [annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#ann-l), [section L.13](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-13)) [\[30\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-context-window) :

- le `CLAUDE.md` racine, la mémoire automatique et le plan écrit en mode plan sont rechargés depuis le disque,
- jusqu’à cinq des fichiers les plus récemment modifiés sont relus,
- la conversation est résumée, et avec elle les consignes que vous avez données en cours de route : elles peuvent se perdre.

Conséquence : une règle qui doit tenir toute la session va dans le `CLAUDE.md` racine, pas dans la conversation [\[30\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-context-window). Ce guide en tire la même règle pour la langue de travail : écrite dans `CLAUDE.md`, elle tient après une compaction et dans chaque nouvelle session, alors qu’une demande faite en cours de conversation peut se perdre au résumé. Et quand Claude a échoué deux fois à la même correction, ne tentez pas une troisième : un `/clear` suivi d’un seul prompt qui intègre ce que vous avez appris marche presque toujours mieux [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices).

*Dessin : Vider ou compacter, selon ce qui doit survivre. Schéma : la description suit.*

**Figure 3.1 :** Vider ou compacter, selon ce qui doit survivre. En gris la situation, en bleu la question, en tirets votre geste, en ambre la compaction, qui peut perdre un détail, en vert ce qui tient. Schéma proposé par ce guide, d’après [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices) et [\[30\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-context-window).

Le même choix, en texte :

1. Une tâche se termine, ou la conversation s’allonge : la suite reprend-elle le même travail ?
2. Si non, `/clear`. La conversation repart à vide, et `CLAUDE.md` reste chargé.
3. Si oui, écrivez l’état dans une note de passation, puis lancez `/compact` avec une consigne qui la nomme, avant la pause.
4. Après la compaction, relisez la note et relancez `/context`.

La [note de passation](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-note-de-passation) est une pratique de ce guide : un fichier daté à l’heure, qui dit le dernier commit, ce qui est fait, ce qui reste et ce qui attend une personne. Chez Passerelle, avant la pause de midi, Bernard fait écrire `notes/passation.md` : « 12 h 05. Courriers PASS-C-011 à PASS-C-022 : brouillons écrits. PASS-C-023 à PASS-C-030 : à faire. PASS-C-017 : un montant douteux, à vérifier avec Amadou. Odile n’a relu aucun brouillon du lot. » Puis il compacte, avec la consigne ci-dessus. Au retour, il relit la note, pas le résumé.

> **🎓 Fonctions avancées et bonnes pratiques : les sessions**
>
> - **Reprendre.** Par `claude --continue --permission-mode manual`, ou par `/resume` dans la session, mais les drapeaux comme `--settings` ou `--add-dir` ne reviennent pas : repassez-les [\[41\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sessions).
> - **Copier.** `/branch` copie la conversation et vous y fait passer, l’original restant intact [\[41\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sessions).
> - **Les points de contrôle.** Chaque message qui ouvre un tour en crée un, et `/rewind` ou `Esc` deux fois restaure le code, la conversation ou les deux [\[42\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-checkpointing).
> - **Les transcriptions.** Elles sont gardées 30 jours dans `~/.claude/projects/<projet>/` (`cleanupPeriodDays`), et `/export` les rend lisibles [\[41\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sessions).
> - **Le piège.** `/rewind` ne restaure ni un fichier changé seulement par Bash, ni les modifications d’un sous-agent : ce n’est pas un gestionnaire de versions [\[42\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-checkpointing).
>
> Toutes les fonctions avancées, les bonnes pratiques et les pièges : [annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#ann-l), [section L.13](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-13).

> **🔀 Quand la règle cède**
>
> - Compacter garde l’essentiel, pas tout : les consignes données en cours de conversation peuvent se perdre au résumé [\[30\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-context-window), et un résumé lancé après une pause plus longue que le cache relit tout l’historique au plein tarif [\[31\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-prompt-caching).
> - Ce qui tient : une règle qui doit tenir toute la session va dans le `CLAUDE.md` racine, rechargé depuis le disque, et l’état du travail dans une note de passation, relue au retour.
> - Pour aller plus loin : quand compacter coûte cher ou perd l’essentiel, la compaction au repos et les hooks qui réinjectent une note, [section 14.7](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-7) et [chapitre 18](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#ch18).

### 3.3 Donner le bon contenu

Un fichier décrit de mémoire, ou une demande vague, font chercher Claude, et chaque lecture de plus remplit la fenêtre ([section 3.1](https://gmag-dev.github.io/bien-demarrer-claude-code/3-la-fenetre-de-contexte.html#s3-1)). Donnez à Claude ce qu’il lui faut, plutôt que de le lui décrire [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices) :

- un fichier : tapez `@` suivi de son chemin. `@dossier` donne la liste des fichiers, pas leur contenu (taille admise : [annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#ann-l), [section L.13](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-13)) [\[43\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-common-workflows),
- une image : collez la capture, par `Ctrl+V`, ou `Alt+V` sous Windows et WSL [\[43\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-common-workflows),
- une sortie de commande : collez-la, ou demandez à Claude de lancer la commande lui-même.

La précision compte autant. Une demande vague comme « améliore ce code » lance un balayage large du projet, alors qu’une demande précise permet à Claude de travailler avec peu de lectures [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-costs). Chez Passerelle, Inès n’écrit plus « regarde le courrier sur la suspension de l’aide », mais :

```text
Explique en phrases simples le courrier @courriers/PASS-C-014.txt, puis liste ses dates et ses montants.
```

> **⚠️ Attention**
>
> Coller la photo d’un vrai courrier, ou un document d’une personne, l’envoie au modèle avec tout ce qu’il contient : nom, adresse, revenus. N’y collez que des documents inventés et marqués comme tels. Les vrais restent hors du projet ([section 1.3](https://gmag-dev.github.io/bien-demarrer-claude-code/1-ce-qu-est-claude-code.html#s1-3) et [chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/23-securite-et-propriete-intellectuelle-en-entreprise.html#ch23)).

> **🔀 Quand la règle cède**
>
> - Ce que vous donnez à lire peut contenir des instructions : un journal, une page ou un courrier venus d’ailleurs sont des contenus non fiables ([section 10.3](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#s10-3)).
> - Ce qui tient : traitez ce que vous donnez à lire comme une donnée, jamais comme un ordre, et retirez à Claude ses moyens de sortie quand ce contenu vient d’ailleurs ([chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#ch10)).
> - Pour aller plus loin : [section 23.4](https://gmag-dev.github.io/bien-demarrer-claude-code/23-securite-et-propriete-intellectuelle-en-entreprise.html#s23-4).

### 3.4 Sous-agents et contexte

Une longue notice lue dans votre conversation y reste jusqu’au bout, et chaque tour la relit. Déléguer sa lecture à un sous-agent l’en tient à l’écart. 💡 Conseil : au début, la session principale suffit dans la plupart des cas. Les raisons sont dans cette section.

Un [sous-agent](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-sous-agent) travaille dans sa propre fenêtre de contexte. Ses lectures et ses appels d’outils restent hors de la vôtre, et seul son résumé revient [\[13\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-how-claude-code-works). La page des coûts le conseille pour une recherche large, ou une sortie verbeuse que vous ne relirez pas [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-costs).

La page des bonnes pratiques, elle, range « utiliser des sous-agents pour protéger sa fenêtre » parmi les conseils dépassés : manquer de place est devenu rare, et chaque sous-agent consomme des jetons sur le même forfait que vous [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Restez dans la session principale pour un petit changement ciblé, une tâche qui demande des allers-retours, ou quand la rapidité compte : un sous-agent neuf doit d’abord réunir un contexte que vous aviez déjà [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents).

Chez Passerelle, cinq courriers du lot arrivent avec une notice fictive de dix à vingt pages, comme `courriers/PASS-C-021-notice.txt`. Bernard n’en veut que les dates et les pièces demandées :

```text
Utilise un sous-agent pour lire les notices jointes aux courriers PASS-C-021 à PASS-C-025. Rends-moi, pour chacune, les dates et les pièces demandées, avec la ligne où tu les as lues.
```

Le sous-agent rend cinq lignes, et la conversation de Bernard ne porte pas les cent pages. Bernard vérifie deux lignes au hasard dans les notices avant de s’en servir.

> **🔀 Quand la règle cède**
>
> - Un sous-agent ne reçoit de la conversation que le message que Claude compose pour lui : ni vos échanges, ni vos décisions non écrites, ni les fichiers déjà lus [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents). Son rapport revient comme une affirmation à vérifier.
> - Ce qui tient : le message de délégation dit ce que le sous-agent doit savoir, et sa preuve se relit.
> - Pour aller plus loin : sections [15.1](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-1) et [15.3](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-3).

> **📌 À retenir**
>
> - Chaque requête renvoie toute la conversation : un contexte ciblé coûte moins et répond mieux.
> - `/clear` entre deux tâches sans rapport. `/compact` avec une consigne quand le même travail continue, avant la pause.
> - Les règles durables, langue de travail comprise, vont dans le `CLAUDE.md` racine.
> - Après deux corrections ratées : `/clear` et un meilleur prompt.
> - Donnez le fichier, l’image ou la sortie elle-même, jamais un document réel d’une personne.
> - 💡 Conseil : écrivez l’état dans une note avant de compacter, et relisez la note, pas le résumé.

> **✏️ Exercice en trois barreaux**
>
> **Compétence visée** : choisir entre `/clear` et `/compact` selon ce qui doit survivre, et le vérifier par `/context`. Comptez 20 à 35 minutes.
>
> **① Exemple travaillé.** Inès a vérifié les dates des brouillons PASS-B-001 à PASS-B-010. Sa tâche suivante est sans rapport : rendre la page des horaires de la permanence lisible au lecteur d’écran, avec Thomas. Elle relève `/context`, tape `/clear`, puis relève `/context` de nouveau. Voici ses deux relevés, simplifiés par ce guide et recopiés à la main : les libellés de votre version peuvent différer.
>
> ```text
> 14 h 10, avant /clear
>   Fichiers de mémoire (CLAUDE.md)    1 200 jetons
>   Messages de la conversation       96 000 jetons
>
> 14 h 11, après /clear
>   Fichiers de mémoire (CLAUDE.md)    1 200 jetons
>   Messages de la conversation            0 jeton
> ```
>
> La conversation est repartie à vide, et la page des horaires ne paiera pas pour les dix brouillons. **Pourquoi ?** Pourquoi `CLAUDE.md` est-il encore chargé, alors que la conversation est vide ?
>
> **② À compléter.** Bernard en est au milieu du lot, et la permanence ferme pour midi dans dix minutes. Sa note de passation est écrite. Choisissez pour lui entre `/clear` et `/compact`, écrivez la commande qu’il tape maintenant, avec sa consigne, et dites pourquoi il la lance avant de partir plutôt qu’au retour.
>
> **③ Sur votre projet.** À la fin d’une tâche qui continue, choisissez de compacter plutôt que de vider, et faites une compaction guidée : `/context` avant, une note de passation écrite dans le dépôt, `/compact` avec une consigne qui la nomme, `/context` après. Comparez ensuite le résumé à la note.
>
> **Sans code** : les trois barreaux se font sans écrire de code. Le barreau ③ marche sur un dossier de documents.
>
> **Critère de réussite** : deux relevés de `/context` notés avec l’heure, une note de passation qui existe dans le dépôt, et l’écart entre le résumé et la note, ou le constat qu’il n’y en a pas. Par le chemin sans code, la même preuve sur votre dossier de documents : les deux relevés de `/context` notés avec l’heure, la note de passation enregistrée dans ce dossier, et votre liste des écarts entre le résumé et la note.
>
> **Voir le corrigé expliqué (après votre essai)**
>
> **①** `CLAUDE.md` n’est pas dans la conversation : il est lu au début de chaque session et rechargé depuis le disque [\[30\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-context-window). `/clear` vide la conversation, pas ce qui est chargé au démarrage. La page ne se termine pas chez Claude : c’est Thomas qui dit, avec son lecteur d’écran, si elle passe.
>
> **②** `/compact garde l'état décrit dans notes/passation.md, et les identifiants des courriers tels quels`. Il la lance avant la pause parce que le cache est encore chaud : le résumé lit l’historique dans le cache et coûte une fraction du plein tarif. Au retour d’une pause plus longue que le cache, il relirait tout au plein tarif [\[31\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-prompt-caching). Erreur fréquente : compacter sans consigne, et laisser le résumé deviner que PASS-C-017 attend Amadou. Au retour, Bernard relit la note, et aucun brouillon du lot ne sert avant qu’Odile l’ait relu.
>
> **③** Votre note est dans le dépôt, et vos deux relevés montrent une conversation plus légère après la compaction. Si le résumé contredit la note, croyez la note, et corrigez la consigne de votre prochain `/compact`. Si un chiffre du résumé vous sert, mesurez-le de nouveau : un résumé peut garder un chiffre périmé.

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/guide-en-une-page.html#toc)

![Illustration : la personne en long manteau violet et son petit compagnon de cristal cyan, au centre d’une boucle lumineuse reliant quatre postes : une lanterne, une table de cartes, un établi et une arche de contrôle.](https://gmag-dev.github.io/bien-demarrer-claude-code/images/b1224b2285c4.avif)
