> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.5.0 : « 15. Déléguer », partie 2 sur 2.
>
> - Précédent : [15. Déléguer (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/15-deleguer-1.md)
> - Suivant : [16. Relire pour réfuter, corriger l’instance et la classe, capitaliser](https://gmag-dev.github.io/bien-demarrer-claude-code/md/16-relire-pour-refuter-corriger-l-instance-et-la-classe.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#h-s15-6>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

### 15.6 Quand ne pas paralléliser

Ce guide propose un test en quatre questions. On parallélise seulement si les quatre réponses sont « oui » :

1. Les sous-tâches écrivent-elles dans des fichiers disjoints ? La lecture partagée est permise.
2. Chacune peut-elle démarrer sans le résultat d’une autre ?
3. Chacune a-t-elle son propre critère de fin, vérifiable ?
4. Le budget de la journée le permet-il ([chapitre 9](https://gmag-dev.github.io/bien-demarrer-claude-code/9-usage-et-cout-sans-credits-d-usage.html#ch9)) ?

Le parallélisme a un coût. Dans les données d’Anthropic sur son système de recherche, publiées en juin 2025, un agent consomme environ 4 fois les jetons d’un simple échange sans outils, et un système multi-agents environ 15 fois. Sur l’évaluation BrowseComp, l’usage de jetons explique à lui seul 80 % de la variance de performance [\[103\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-multi-agent-research-system). Ces ordres de grandeur valent pour ce système, pas pour une session de Claude Code.

Certaines tâches s’y prêtent mal :

- celles où tous les agents doivent partager le même contexte, ou qui ont de fortes dépendances entre agents. La plupart des tâches de code offrent moins de parallélisme réel que la recherche [\[103\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-multi-agent-research-system),
- les tâches séquentielles, les modifications d’un même fichier et le travail très dépendant, pour lesquels une seule session ou des sous-agents valent mieux qu’une équipe [\[111\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-agent-teams),
- les allers-retours fréquents, un petit changement ciblé, ou une tâche où la latence compte : restez alors dans la session principale [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents).

*Dessin : Paralléliser ou non, le test en quatre questions. Schéma : la description suit.*

**Figure 15.1 :** Paralléliser ou non, le test en quatre questions. En bleu les questions, en vert la voie du parallélisme, en rouge l’arrêt : un seul « non » suffit pour rester en une session. Test proposé par ce guide, d’après [\[103\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-multi-agent-research-system), [\[111\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-agent-teams) et [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents).

Le même test, en texte :

1. Les sous-tâches écrivent-elles dans des fichiers disjoints ? Si non, restez en une session.
2. Chacune démarre-t-elle sans le résultat d’une autre ? Si non, restez en une session.
3. Chacune a-t-elle son critère de fin ? Si non, restez en une session.
4. Le budget du jour le permet-il ? Si oui aux quatre, parallélisez, un brief par part.

Chez Passerelle, la vérification des dates passe le test : chaque lot de courriers est disjoint, et le rapport revient dans la réponse. La mise à jour du lexique ne le passe pas : tous les brouillons en dépendent, et il n’a qu’un écrivain. Elle reste dans la session de Bernard.

> **💡 Conseil**
>
> Dans le doute, restez en une session. Paralléliser coûte plus de jetons et ne fait gagner du temps que si les morceaux sont vraiment indépendants. Un seul « non » au test suffit pour renoncer.

### 15.7 Les équipes d’agents, une fonction expérimentale

Vous n’avez pas besoin des équipes d’agents pour bien déléguer : les sous-agents des sections précédentes suffisent dans la plupart des cas. Claude Code propose pourtant des équipes d’agents, une fonction expérimentale et désactivée par défaut, qui s’active par la variable d’environnement `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`. Une équipe se compose d’un chef d’équipe fixe et de coéquipiers qui ont chacun leur propre contexte. Ils partagent une liste de tâches, dont la prise utilise un verrou de fichier, et chaque agent a sa boîte aux lettres [\[111\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-agent-teams).

Les limites actuelles sont nettes : une équipe par session, pas d’équipes imbriquées, pas de reprise des coéquipiers qui tournent dans le même processus. Un coéquipier ne peut ni approuver une permission, ni passer à un autre une action refusée pour qu’elle passe quand même. Le coût croît avec le nombre de coéquipiers, et la documentation suggère trois à cinq coéquipiers, et cinq à six tâches par coéquipier [\[111\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-agent-teams).

**Tableau 15.6 :** Sous-agents et équipe d’agents, d’après [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sub-agents) et [\[111\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-agent-teams).

| Critère | Sous-agents | Équipe d’agents |
| --- | --- | --- |
| Statut | fonction standard | expérimentale, désactivée par défaut |
| Contexte | neuf et isolé, seul un résumé revient | propre à chaque coéquipier |
| Coordination | par la session principale | liste de tâches partagée, boîtes aux lettres |
| Permissions | remontent dans la session principale | un coéquipier n’en approuve aucune |
| Mauvais cas | allers-retours fréquents, petit changement ciblé | tâches séquentielles, même fichier, travail très dépendant |

Les équipes d’agents changent vite : avant de vous en servir, relisez leur page de documentation et le journal des versions de votre version de Claude Code [\[111\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-agent-teams) [\[1\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-changelog).

### 15.8 Une recherche documentée, et une étude avant tout choix d’architecture

Avant de choisir une bibliothèque, une base de données ou une architecture, une recherche documentée évite de décider sur un souvenir. Anthropic décrit son propre système de recherche : un agent principal coordonne le travail et délègue à des sous-agents spécialisés qui travaillent en parallèle [\[103\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-multi-agent-research-system). Ce guide propose six étapes, dans cet ordre :

1. **Chercher d’abord ce qui existe.** Un dossier de recherche sur la même question existe peut-être déjà dans le projet. S’il existe, relisez sa date et ce qu’il couvre, puis ne recherchez que la différence : ce qui a changé depuis, et ce qu’il ne couvre pas.
2. **Proportionner l’étude à l’enjeu.** Un choix facile à défaire mérite une heure. Un choix d’architecture, coûteux à défaire, mérite une étude écrite avant la décision, que citera l’enregistrement de décision ([section 14.8](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-8)).
3. **Lancer un éventail de recherches.** Plusieurs questions indépendantes, chacune confiée à un sous-agent, avec le dosage de la [section 15.4](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-4).
4. **Classer les sources par niveau.** La documentation officielle, une norme ou un article relu passent avant un billet de blog, qui passe avant un forum. La même source raconte que ses premiers agents choisissaient des pages optimisées pour les moteurs de recherche plutôt que des sources qui font autorité [\[103\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-multi-agent-research-system).
5. **Étiqueter chaque affirmation.** Chacune porte sa source et sa confiance : vérifiée à la source, rapportée par une seule source, ou déduite.
6. **Faire une passe de réfutation avant la synthèse.** Un relecteur en contexte neuf cherche ce qui contredit les affirmations clés ([section 16.3](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#s16-3)). La synthèse vient ensuite, et dit ce qui reste incertain.

**Quand déléguer à un moteur externe.** Un moteur de recherche approfondie, hors de Claude Code, convient à une question large et publique, qui demande beaucoup de lectures. Il ne voit pas votre projet. Son brief porte donc la question, la décision qu’elle sert, ce qui est déjà connu, les sources à préférer et à exclure, et la forme du rapport attendu. Le brief ne contient rien de confidentiel. Le rapport revenu est une donnée, à vérifier comme celui d’un sous-agent ([section 15.3](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-3)).

**Le chercheur lit du [contenu non fiable](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-contenu-non-fiable).** Une page web peut porter une [injection de prompt](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-injection-de-prompt). L’agent qui cherche n’a donc que la recherche et la lecture web : une définition dont le champ `tools` ne liste que `WebSearch` et `WebFetch`, sans lecture des fichiers ni shell. Il lit le web et rend son dossier dans sa réponse, rien d’autre. La session principale lit elle-même le dossier existant, et ne lui confie que des extraits non confidentiels, relus avant envoi ([section 23.4](https://gmag-dev.github.io/bien-demarrer-claude-code/23-securite-et-propriete-intellectuelle-en-entreprise.html#s23-4)). Le dossier qui revient est une donnée \[A\], du contenu non fiable, et il entre dans une session qui a le shell. Ce montage ne protège donc que si cette session hôte est supervisée, en mode Manual ([section 23.4](https://gmag-dev.github.io/bien-demarrer-claude-code/23-securite-et-propriete-intellectuelle-en-entreprise.html#s23-4)), et ce qu’elle tire du dossier se vérifie comme le rapport d’un sous-agent ([section 15.3](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-3)).

Chez Passerelle, Bernard doit choisir comment le contrôle reconnaîtra les dates et les montants écrits en lettres, après le constat de la [section 14.11](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-11). Les réglages de Passerelle refusent le web, sous-agents compris ([section 17.2](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#s17-2)). Il lance donc l’étude dans un projet à part, qui ne contient aucune donnée de Passerelle :

```text
Avant de choisir comment le contrôle de Passerelle reconnaît les dates et les montants
écrits en lettres, en français, cherche dans recherches/ un dossier sur ce sujet.
S'il existe, ne recherche que ce qui a changé depuis sa date.
Sinon, lance trois sous-agents chercheurs, définis avec WebSearch et WebFetch pour seuls
outils, un par option. Ne leur donne que la question, sans aucun fichier du projet.
Classe les sources par niveau et étiquette chaque affirmation.
Avant la synthèse, fais relire les conclusions par un contexte neuf qui cherche à les réfuter.
```

**Tableau 15.7 :** La même étude, à trois niveaux. Proposé par ce guide.

| Si vous… | Demandez | Pourquoi |
| --- | --- | --- |
| débutez | une comparaison de deux ou trois options, chaque affirmation avec le lien de sa source, avant de choisir | vous jugez sur des sources, pas sur un souvenir |
| êtes à l’aise | les six étapes, un dossier daté gardé dans le projet, et la décision écrite qui le cite | la prochaine étude repart de celle-ci |
| voulez aller plus loin | un éventail de chercheurs qui n’ont que le web, une passe de réfutation par un contexte neuf, et un brief écrit pour un moteur externe quand la question est large et publique | chaque rôle n’a que ce qu’il lui faut |

> **📏 La limite**
>
> Un dossier dit ce que les sources affirment à une date, pas ce qui marchera dans votre projet : un essai court sur votre propre code tranche ce que les sources laissent ouvert.

> **📌 À retenir**
>
> Avant de relire la liste, répondez de mémoire, puis vérifiez votre réponse dans la section indiquée :
>
> 1. Pourquoi un sous-agent chargé de vérifier les dates signalerait-il comme absente une date qu’un brouillon a eu raison de ne pas calculer ? ([section 15.1](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-1))
> 2. Le rapport du lot 031 à 045 finit par « vérifié : aucune date absente ». Qu’a compté Bernard avant de le croire, et quel signal d’alarme a-t-il trouvé ? ([section 15.3](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-3))
>
> - Un sous-agent part de zéro : tout ce qu’il doit savoir est dans le brief, ou dans un fichier qu’il lira, décisions comprises.
> - Un brief dit ce que le sous-agent doit rendre, ce qu’il ne doit pas toucher, et la preuve attendue. Ce qui doit tenir à coup sûr va dans le champ `tools`, en liste blanche.
> - Un rapport est une donnée : relisez sa preuve avant de vous en servir, et comptez ce qu’il couvre.
> - L’effort se règle par agent, et le rayon d’impact se borne par les tests, git et les relectures, pas par la réflexion.
> - Parallélisez seulement avec des fichiers écrits disjoints, des tâches indépendantes, un critère de fin pour chacune, et le budget pour le faire.
> - Avant un choix d’architecture : chercher le dossier existant, puis une recherche en éventail, des sources classées, une passe de réfutation.

> **✏️ Exercice**
>
> **Compétence visée** : écrire un brief qu’un sous-agent suit sans vous, puis vérifier son rapport avant de s’en servir. Comptez 30 à 45 minutes.
>
> **Sur Passerelle.** Dans le dossier de votre copie de Passerelle, lancez Claude Code en [mode Manual](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-mode-manual), par `claude --permission-mode manual`. Briefez deux sous-agents sur des lots disjoints de la vague, `PASS-C-031` à `PASS-C-045` et `PASS-C-046` à `PASS-C-060`, avec un brief court ([section 15.2](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-2)) : vérification des dates seulement, lecture seule, rapport dans la réponse, un mot d’issue à la fin. Quand les rapports reviennent, vérifiez chaque affirmation avec le tableau de la [section 15.3](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-3), et notez ce que vous auriez cru à tort sans cette vérification. Les brouillons vérifiés vont ensuite à Odile, et aucun ne sert sans son accord : notez sa décision, ou celle de la personne qui joue son rôle.
>
> **Sur votre projet.** Refaites le geste avec deux sous-tâches réelles qui passent le test de la [section 15.6](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-6).
>
> **Sans code** : faites le second cas. Sur papier, écrivez le brief d’un thème du Cahier commun, puis la liste des trois vérifications des comptes de la [section 15.4](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-4), et appliquez-les à la main sur dix contributions que vous inventez, `CAH-001` à `CAH-010`.
>
> **Critère de réussite** : deux briefs écrits, deux rapports, chaque affirmation des rapports cochée contre sa preuve, et au moins un écart trouvé ou l’assurance écrite qu’il n’y en avait aucun, avec ce que vous avez compté pour le dire.
>
> **Pour vous corriger**, sans corrigé : relisez votre travail contre ces cinq points. Chacun se voit dans ce que vous avez écrit ou obtenu.
>
> 1. Chaque brief dit ce que le sous-agent doit rendre, ce qu’il ne doit pas toucher, et la preuve qui montrera que c’est vérifié ([section 15.2](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-2)).
> 2. Chaque brief porte la décision des délais relatifs, ou le chemin du fichier qui la contient : ce qui n’est ni dans le brief ni dans un fichier que le sous-agent lira n’existe pas pour lui ([section 15.1](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-1)).
> 3. Chaque affirmation des rapports est cochée contre la preuve que le tableau 15.3 lui associe, et une affirmation sans preuve est notée « non vérifié » ([section 15.3](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-3)).
> 4. Pour chaque rapport, vous avez compté les courriers couverts contre ceux du lot : un courrier qui manque sans un mot est le signal « périmètre plus petit que celui du brief » ([section 15.3](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-3)).
> 5. Sur votre projet, vos deux sous-tâches répondent oui aux quatre questions du test : elles écrivent dans des fichiers disjoints, chacune démarre sans le résultat de l’autre, chacune a son critère de fin, et le budget du jour le permet ([section 15.6](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-6)).
>
> Par le chemin sans code, appliquez le premier point à votre brief, et vérifiez vos dix contributions contre les trois points de Mei : chaque identifiant et chaque phrase cités existent, aucune contribution n’est oubliée, une contribution rangée sous deux thèmes est comptée dans les deux ([section 15.4](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-4)).

> **✏️ Exercice**
>
> **Exercice de passage du jalon Avancé** (section « Apprendre avec ce guide »). **Compétence visée** : lancer un même travail sur trois fichiers par un script, avec des outils permis d’avance et un plafond de tours, puis corriger le prompt avant la suite. Comptez 45 à 60 minutes.
>
> **Ce qu’il prouve** : que vous avez mené une fois, de bout en bout, un travail lancé par un script, sans personne à la session. Vous l’avez borné d’avance, vous avez vérifié ce qui est revenu, et vous avez corrigé la consigne avant de continuer. Un jalon marque une étape du parcours : il montre qu’un geste est tenu, il ne mesure pas un stade d’expertise.
>
> **Où le faire** : dans votre copie de Passerelle, un dépôt que vous avez inspecté. `claude -p` n’affiche ni la boîte de confiance ni l’approbation des serveurs du `.mcp.json` : les hooks, le bloc `env` et ces serveurs du dépôt s’exécutent sans rien vous demander ([section 17.1](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#s17-1)) [\[21\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-security).
>
> **Sur Passerelle.** Prenez trois courriers de la vague, `PASS-C-031` à `PASS-C-033`. Écrivez un seul prompt : vérifier que chaque date du courrier se retrouve dans son brouillon, ne rien modifier, citer pour chaque date la ligne du brouillon ou écrire « absente », et finir par un mot d’issue. Lancez-le par un script, une session non interactive par courrier :
>
> ```bash
> mkdir -p rapports
> for n in 031 032 033; do
>   claude -p "Vérifie que chaque date de courriers/PASS-C-$n.txt se retrouve dans brouillons/PASS-B-$n.md. Ne modifie rien. Pour chaque date, donne la ligne du brouillon, ou « absente ». Termine par l'un des mots d'issue de docs/definition-du-fini.md." \
>     --permission-mode dontAsk \
>     --tools "Read,Grep,Glob" \
>     --allowedTools "Read,Grep,Glob" \
>     --disallowedTools "mcp__*" \
>     --max-turns 10 \
>     > "rapports/PASS-C-$n.txt"
> done
> ```
>
> Sous Windows natif, la même boucle s’écrit en PowerShell avec `foreach`. Vérifiez les trois rapports avec le tableau de la [section 15.3](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-3). Corrigez ensuite le prompt d’après ce que vous avez trouvé, et écrivez la raison de la correction avant tout lancement sur le reste du lot. Les brouillons vont ensuite à Odile, et aucun ne sert sans son accord.
>
> **Sans code** : sur papier, écrivez le prompt unique, les outils permis avec la raison de chacun, le plafond de tours et ce qui se passe quand il est atteint, puis ce que vous relirez dans chacun des trois rapports avant de lancer la suite.
>
> **Critère de réussite** : la commande lancée, avec ses outils permis et son plafond, trois rapports finis chacun par un mot d’issue et cochés contre le tableau de la [section 15.3](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-3), et une correction du prompt écrite avec sa raison, avant la suite. Par le chemin sans code : ces quatre éléments écrits, et une correction du prompt proposée.
>
> **Voir le corrigé expliqué (après votre essai)**
>
> **Les outils permis.** `Read`, `Grep` et `Glob` : la tâche ne fait que lire. `--tools "Read,Grep,Glob"` ne laisse à la session que ces trois outils intégrés, sans shell ni outil web. `--allowedTools` les laisse passer sans demande, mais ne retire aucun outil à lui seul [\[115\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-cli-reference). Avec `--permission-mode dontAsk`, un outil qui n’est pas approuvé d’avance est refusé sans demande [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permission-modes). Dans votre copie de Passerelle, un dossier que vous avez approuvé, les règles `allow` des réglages du projet s’appliquent aussi en `claude -p`, celle du shell, pour `git status`, comme celle de l’outil du lexique (sections [17.1](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#s17-1) et [17.2](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#s17-2)) [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permissions). `--tools` ne touche pas aux outils MCP : `--disallowedTools "mcp__*"` les retire tous [\[115\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-cli-reference). Sans shell, ni outil web, ni outil MCP, la session n’a plus que des outils de lecture ([section 10.3](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#s10-3)). Les hooks du dépôt, eux, ne sont pas des outils que Claude appelle : Claude Code les lance de lui-même, et ils tournent quand même, d’où un dépôt inspecté. Le rapport revient par la sortie du script, pas par un fichier que Claude écrirait.
>
> **Le plafond.** Une dizaine de tours suffit pour lire deux fichiers et les comparer. Une session qui atteint le plafond s’arrête avant d’avoir fini : son issue est « incomplet », pas « vérifié » ([section 14.10](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-10)).
>
> **La correction du prompt.** Deux corrections reviennent souvent. La première vaut pour la suite : les trois courriers n’ont que des dates écrites, mais le reste du lot peut porter un délai relatif, comme « dans les 15 jours suivant la réception » de `PASS-C-026` ([section 14.8](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-8)). Un rapport dirait « absente » la date que le brouillon avait raison de ne pas calculer : le prompt ne donnait pas la décision des délais relatifs, et l’on ajoute « Un délai relatif se garde tel que le courrier l’écrit (decisions/0004-delais-relatifs.md). » Un rapport finit par « vérifié » sans citer de ligne : l’on ajoute « Sans ligne citée, l’issue est non vérifié. »
>
> **Avant la suite.** Les trois rapports se lisent comme ceux de sous-agents ([section 15.3](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-3)) : on compte les courriers couverts, et l’on relit dans le brouillon une ligne citée. C’est le geste que décrit la documentation : essayer sur quelques fichiers, corriger le prompt, puis lancer le reste [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices).
>
> **La décision.** Un rapport « vérifié » ne fait servir aucun brouillon : Odile relit chacun et tranche.

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/guide-en-une-page.html#toc)

![Illustration : la personne en long manteau violet et son petit compagnon de cristal cyan, devant des miroirs et une table où un plan lumineux est examiné et réparé, rangent la pièce corrigée sur une étagère d’outils.](https://gmag-dev.github.io/bien-demarrer-claude-code/images/5fe469aacdb6.avif)
