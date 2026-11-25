> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.2.2 : « 8. Le travail en parallèle », partie 2 sur 2.
>
> - Précédent : [8. Le travail en parallèle (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/8-le-travail-en-parallele-1.md)
> - Suivant : [9. Usage et coût sans crédits d’usage](https://gmag-dev.github.io/bien-demarrer-claude-code/md/9-usage-et-cout-sans-credits-d-usage.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-s8-4>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

### 8.4 Une session qui pilote les autres

Nouveau · 18 nov. 2026 Dès que des sous-agents et des sessions parallèles travaillent pour vous, leurs résultats arrivent de partout. Ce qu’ils ont appris ne sert pas au lot suivant tant que personne ne l’a écrit là où il le lira, et la même erreur peut revenir. Ce guide propose donc de désigner une session, celle où vous travaillez, qui intègre et capitalise pour les autres. C’est une pratique de ce guide, pas une fonction du produit. Dans sa forme légère, elle tient en cinq gestes, toujours les mêmes :

1. **Déléguer.** Un brief par élément du lot, à un sous-agent ([section 8.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s8-1)), ou à une autre session que vous ouvrez dans son worktree, avec le brief pour premier prompt ([section 8.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s8-2)).
2. **Intégrer.** Chaque rapport se vérifie avant de servir ([section 8.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s8-1)), puis les branches s’intègrent l’une après l’autre, un seul écrivain par fichier ([section 8.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s8-2)).
3. **Capitaliser.** Ce qu’un lot a appris devient une ligne écrite là où la session suivante la lira : le `CLAUDE.md` pour une règle du projet ([chapitre 2](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch2)), un skill pour une façon de faire (chapitres [6](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch6) et [7](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch7)).
4. **Améliorer la méthode.** Un défaut trouvé reçoit sa correction, puis la [correction de sa classe](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-correction-de-classe), avec un contrôle qui l’aurait vu ([section 16.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s16-4)).
5. **Superviser.** Savoir quels worktrees et quelles sessions sont ouverts, ce qui attend votre décision, et ce que coûte le tout ([section 8.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s8-3) et [chapitre 9](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch9)).

Puis l’on recommence, au lot suivant, avec un `CLAUDE.md` et des skills un peu meilleurs. Tant que vos sessions sont courtes, que vous les suivez vous-même et qu’elles ne partagent ni fichier ni ressource hors du dépôt, ces cinq gestes suffisent : le `CLAUDE.md`, les skills et, pour l’état du lot, une [note de passation](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-note-de-passation) ([chapitre 3](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch3)) gardent ce qu’il faut. Dès que plusieurs sessions longues partagent un arbre de fichiers ou une ressource, le [chapitre 19](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch19) en donne les principes, et sa [section 19.9](https://gmag-dev.github.io/bien-demarrer-claude-code/#s19-9) dit ce que coûte une session de coordination, et les cas où s’en passer.

Chez Passerelle, pendant la vague, Samia désigne la session de Bernard comme session principale. Cette session vérifie, par `git status` et par le contrôle, les rapports des sous-agents qui rédigent les courriers ([section 8.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s8-1)). Elle intègre la branche du skill et celle du lexique l’une après l’autre, après avoir vérifié que leurs listes de fichiers ne se recoupent pas ([section 8.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s8-2)). Et le mot « barème », qui revenait dans chaque courrier, s’explique désormais dans le skill « brouillon pour relecture » ([section 8.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s8-2)) : le lot suivant reçoit l’explication dès que son brief fait lire le skill, sans qu’on la redise.

> **🔀 Quand la règle cède**
>
> - Une session principale concentre le contexte : sa fenêtre peut se remplir plus vite que celle des autres, et une compaction peut perdre ce qu’elle n’a pas écrit. Surveillez-la par `/context` ([chapitre 3](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch3)), et gardez ce qu’elle sait dans des fichiers.
> - Ce qui tient : un seul endroit qui intègre et capitalise, et ce qu’il apprend écrit dans le `CLAUDE.md` ou un skill.
> - Pour aller plus loin : [section 19.9](https://gmag-dev.github.io/bien-demarrer-claude-code/#s19-9).

> **📌 À retenir**
>
> - Un sous-agent sert au parallélisme, à la sortie bruyante, au regard neuf et aux outils restreints. Il n’est pas plus intelligent.
> - Un fichier, un seul écrivain. Un rapport de sous-agent se vérifie avant de servir.
> - Une borne d’outils s’écrit en liste blanche dans le champ `tools` : elle tient par construction, pour les capacités qu’aucun outil listé ne porte. Ce que dit le brief tient par consigne.
> - Une session par worktree, jamais deux sur la même copie de travail.
> - Tout parallélisme se paie sur le même quota et sur la même machine : mesurez avant d’élargir.
> - Une session pilote les autres : elle délègue, intègre, capitalise dans le `CLAUDE.md` et les skills, améliore la méthode et supervise.

> **✏️ Exercice en trois barreaux**
>
> **Compétence visée** : confier un lot à des sous-agents et vérifier leurs rapports, puis isoler deux travaux parallèles dans deux worktrees et vérifier qu’ils ne se recoupent pas. Comptez 35 à 45 minutes.
>
> **① Exemple travaillé.** Inès confie les trois courriers suivants de la vague à trois sous-agents, avec le prompt de la [section 8.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s8-1). Trois lignes reviennent, chacune finie par `OK`. Avant de s’en servir, elle vérifie leurs rapports, d’abord par la liste des fichiers changés :
>
> ```text
> git status --short
> ?? brouillons/PASS-B-041.md
> ?? brouillons/PASS-B-042.md
> ?? brouillons/PASS-B-043.md
>  M lexique.md
> ```
>
> Aucun rapport ne parlait de `lexique.md`. Inès lit `git diff lexique.md` : un sous-agent y a ajouté une définition de « barème ». Elle copie la ligne dans une note pour Bernard, remet le fichier dans son état commité par `git restore lexique.md`, puis relance elle-même le contrôle sur les trois brouillons. **Pourquoi ?** Pourquoi ne garde-t-elle pas la ligne du lexique, même si elle paraît juste ?
>
> **② À compléter.** Inès et Bernard ont isolé leurs deux travaux dans deux worktrees ([section 8.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s8-2)), et Bernard a committé sa correction du lexique dans le sien. Imaginez qu’Inès, pour expliquer « barème », ait aussi ajouté une ligne à `lexique.md` dans son worktree, puis l’ait committée sur sa branche. Les deux commandes de la [section 8.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s8-2) rendent alors :
>
> ```text
> git diff --name-only main...worktree-skill-bareme
> .claude/skills/brouillon-pour-relecture/SKILL.md
> lexique.md
> git diff --name-only main...worktree-lexique-urgent
> lexique.md
> ```
>
> Écrivez ce que vous concluez de ces deux listes, la commande qui montre ce que chaque branche a changé dans `lexique.md`, et ce qu’Inès et Bernard font avant toute intégration.
>
> **③ Sur votre projet.** Confiez un petit lot à deux ou trois sous-agents, un élément chacun, et vérifiez leurs rapports : `git status --short` ne doit lister que les fichiers attendus, et vous relisez vous-même chaque résultat contre sa source. Puis isolez deux petites tâches indépendantes dans deux worktrees, une session par worktree. Relevez `/usage` avant et après. Dans chaque worktree, relisez le diff, puis committez vous-même sur sa branche. Avant toute intégration, comparez les deux listes de `git diff --name-only main...worktree-<nom>` : chacune nomme les fichiers de sa tâche, et aucune ligne n’est commune.
>
> **Sans code** : faites le barreau ③ sur des documents de votre projet. Confiez à chaque sous-agent le résumé d’un document, puis isolez deux documents, par exemple une page d’accueil et une foire aux questions, un par worktree.
>
> **Critère de réussite** : un rapport par sous-agent vérifié contre `git status --short` et contre sa source, deux branches, chacune avec son commit relu, deux listes de fichiers changés, chacune avec les fichiers de sa tâche et sans aucune ligne commune, et la consommation relevée dans `/usage`. Par le chemin sans code, un résumé par document dont vous avez retrouvé chaque affirmation dans le document lui-même, un `git status --short` qui ne liste aucun fichier écrit par les sous-agents, puis deux branches de documents, chacune avec son commit relu, dont les listes de fichiers changés n’ont aucune ligne commune.
>
> **Voir le corrigé expliqué (après votre essai)**
>
> **①** Un fichier, un seul écrivain : le lexique est l’affaire de la session de Bernard ([section 8.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s8-2)), et aucun sous-agent n’avait à y écrire. Un rapport de sous-agent est une affirmation : les trois lignes disaient vrai sur les brouillons, mais taisaient le quatrième fichier, que seul `git status` a montré. Inès transmet la définition à Bernard, et chaque brouillon va ensuite chez Odile, qui décide s’il sert. Erreur fréquente : croire les trois lignes `OK` et committer le tout, lexique compris.
>
> **②** `lexique.md` figure dans les deux listes : les deux branches se recoupent. `git diff main...worktree-skill-bareme -- lexique.md`, puis la même commande avec `worktree-lexique-urgent`, montre ce que chaque branche y a changé. La règle d’un seul écrivain par fichier tranche : le lexique est l’affaire de la session de Bernard. Inès retire sa ligne de sa branche et propose la définition à Bernard, qui la reprend, et Odile relit la phrase avant qu’elle entre au lexique. Erreur fréquente : intégrer les deux branches l’une après l’autre parce que git ne signale aucun conflit. Deux changements à des endroits éloignés du même fichier se fusionnent sans conflit, sans que personne ait relu leur ensemble.
>
> **③** Chaque rapport se vérifie deux fois : par `git status --short`, qui ne liste que les fichiers que vous attendiez, et par la source, où vous retrouvez ce que le rapport affirme. Un fichier inattendu, ou une affirmation introuvable, se traite avant tout commit. Les deux listes des worktrees doivent n’avoir aucune ligne en commun. Une liste vide ne prouve rien : `git diff --name-only main...worktree-<nom>` ne voit que les commits, et une branche sans commit n’y montre aucun fichier, d’où le commit avant la comparaison. Si un fichier figure dans les deux, relisez les deux diffs avant toute intégration, et décidez lequel l’emporte. Si `/usage` montre un écart net entre les sous-agents et les sessions, notez ce qui a le plus coûté : le [chapitre 9](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch9) en fait une décision.

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/#toc)

![Illustration : la personne en long manteau violet et son petit compagnon de cristal cyan, devant un pupitre, tournent une molette de consommation à côté d’une grande jauge de lumière et d’un sablier d’énergie.](https://gmag-dev.github.io/bien-demarrer-claude-code/images/3599d6458262.avif)
