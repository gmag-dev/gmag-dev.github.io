> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.5.0 : « Comment lire ce guide ».
>
> - Précédent : [Avant-propos](https://gmag-dev.github.io/bien-demarrer-claude-code/md/avant-propos.md)
> - Suivant : [Apprendre avec ce guide](https://gmag-dev.github.io/bien-demarrer-claude-code/md/apprendre-avec-ce-guide.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/comment-lire-ce-guide.html#h-lire>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## Comment lire ce guide

> **🚪 Par où commencer**
>
> Vous débutez, avec ou sans code ? Commencez par l’[annexe A](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-a-ma-premiere-semaine.html#ann-a), « Ma première semaine », et non par le début du guide : son entrée dit le temps à prévoir.
>
> Pendant la première semaine, chaque ligne de l’[annexe A](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-a-ma-premiere-semaine.html#ann-a) nomme les sections à lire pour son geste, et seulement celles-là.
>
> - **Avant le jour 1**, sur un poste fourni par une organisation : envoyer le message de la page « Préparez votre poste » à la personne qui gère le poste, et attendre ses réponses.
> - **Jour 1**, en deux séances : copier le dossier d’essai, installer git, faire du dossier un dépôt, installer Claude Code. Puis le lancer en mode Manual et vous connecter, écrire vos réglages de départ ([section A.1](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-a-ma-premiere-semaine.html#s-a-1)).
> - **Jour 2** : un `CLAUDE.md` court, une règle `deny` sur un faux secret.
> - **Jour 3** : `/clear` entre deux tâches, une tâche en mode plan, l’explication de `ESSAI-C-002`.
> - **Jour 4** : essayer `/rewind`, corriger le défaut du dossier d’essai, par un test qui échoue d’abord. Sans code, faire échouer, puis passer la comparaison à votre liste ([section A.2](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-a-ma-premiere-semaine.html#s-a-2)).
> - **Jour 5** : relire le diff, puis committer, une relecture par une session neuve. Sans code, faire lire l’explication par une personne.
>
> Vous codez déjà avec un assistant : la question en tête de chaque chapitre de la Partie I vous dit ce que vous pouvez sauter. Vous décidez pour une équipe, ou vous formez : d’abord « Décider ou former avec ce guide », la dernière section d’« Apprendre avec ce guide », pour le coût d’une équipe. Puis le [chapitre 9](https://gmag-dev.github.io/bien-demarrer-claude-code/9-usage-et-cout-sans-credits-d-usage.html#ch9) pour les compteurs d’un abonnement individuel, le [chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#ch10) pour la sécurité, la [section 23.1](https://gmag-dev.github.io/bien-demarrer-claude-code/23-securite-et-propriete-intellectuelle-en-entreprise.html#s23-1) pour les données de l’organisation, et « Apprendre avec ce guide » pour les quatre jalons et leurs preuves.

Ce guide a deux parties. La Partie I, du [chapitre 1](https://gmag-dev.github.io/bien-demarrer-claude-code/1-ce-qu-est-claude-code.html#ch1) au [chapitre 13](https://gmag-dev.github.io/bien-demarrer-claude-code/13-les-pieges-frequents.html#ch13), donne des règles nettes, chacune avec sa limite. La Partie II, du [chapitre 14](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#ch14) au [chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/23-securite-et-propriete-intellectuelle-en-entreprise.html#ch23), développe ces limites. Cette page dit comment lire un chapitre : deux chemins, une forme commune aux chapitres de la Partie I, les marques du texte, l’option qui masque les exercices, et ce qui est neuf dans cette version.

### Deux chemins dans chaque chapitre

Ce qui guide une personne qui débute peut ralentir une personne qui connaît déjà le sujet, et ce qui suffit à la seconde laisse la première sans prise. Ce guide propose donc deux chemins, chapitre par chapitre, parce qu’on peut connaître un sujet à fond et découvrir le suivant :

- **le chemin débutant** : après la première semaine, le chapitre dans l’ordre. Chaque section qui pose une règle va de la règle simple à sa limite, et l’exercice se fait en entier. Lisez les encadrés « Quand la règle cède » et « La limite » : ils font partie de la section. Sautez les encadrés « Fonctions avancées et bonnes pratiques » : ils servent le jour où le composant devient le vôtre,
- **le chemin court** : les encadrés « Quand la règle cède » et « La limite », les encadrés « Fonctions avancées et bonnes pratiques » des composants que vous utilisez, et la dernière ligne des tableaux à trois niveaux, puis l’exercice sur votre propre projet.

Une question, en tête de chaque chapitre de la Partie I, vous aide à choisir. Elle porte sur la première étape d’une vraie tâche, pas sur l’idée que vous vous faites de votre niveau. Écrivez votre réponse, puis comparez-la à la réponse attendue. La question conseille, elle n’interdit rien : vous pouvez toujours lire tout le chapitre.

Un second choix croise ces deux chemins : avec ou sans code. « Sans code » veut dire : sans programmer, mais avec un terminal, où vous tapez les commandes que donne le guide, git, et deux fichiers de réglages à modifier. Chaque exercice a un chemin sans code, et l’[annexe A](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-a-ma-premiere-semaine.html#ann-a) donne la même semaine sans code ([section A.2](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-a-ma-premiere-semaine.html#s-a-2)). Le chemin avec code lance de petits scripts Python, et lui seul demande Python (« Prérequis ») : il se suit sur le chemin débutant comme sur le chemin court.

Les chapitres de la Partie II n’ont pas de question. Leur aiguillage tient en une phrase : si un encadré « Quand la règle cède » vous a envoyée ici, lisez la section qu’il cite, puis revenez à votre chapitre. Sinon, lisez le chapitre dans l’ordre, puis faites l’exercice. L’encadré « Ce chapitre », en tête, nomme au besoin les sections à lire d’abord.

### La forme de chaque chapitre

Les chapitres de la Partie I ont tous la même forme, dans le même ordre :

1. **Ce chapitre** : pour qui il est écrit, sur quel poste, ce qu’il vous apprend, les deux chemins, et où en est le projet du fil rouge quand vous arrivez.
2. **Vous pouvez sauter ce chapitre si…** : la question et sa réponse attendue. Dans la version web, la réponse est repliée sous « Voir la réponse attendue », qui s’ouvre au clavier par Entrée ou Espace.
3. **Les sections**, de la règle simple à sa limite. En fin de section, l’encadré **🔀 Quand la règle cède** dit la situation où la règle cède, ce qui tient alors, et où le guide le développe. Une section qui présente ses conseils dans un tableau à trois niveaux, « Si vous… », dit sa limite juste en dessous, dans l’encadré **📏 La limite**. Une section qui décrit sans poser de règle, une installation ou le choix d’un système par exemple, n’en porte pas. Un geste risqué porte toujours l’encadré **⚠️ Attention**, avec la conduite à tenir. Dans les deux parties, une section qui présente un composant de Claude Code, un skill, un hook ou un serveur MCP par exemple, porte aussi l’encadré **🎓 Fonctions avancées et bonnes pratiques**, qui en donne l’essentiel et renvoie à la fiche du composant dans l’[annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#ann-l). Le chemin débutant le saute.
4. **À retenir**, en quelques lignes.
5. **L’exercice en trois barreaux** : ① un exemple travaillé, avec une question « pourquoi », ② un exercice à compléter, ③ un exercice sur votre projet, avec un critère de réussite que vous pouvez constater vous-même. Le corrigé expliqué se lit après votre essai, replié sous « Voir le corrigé expliqué ».

Seules la réponse attendue et le corrigé sont repliés : le reste du guide se lit sans rien déplier. Cette version est livrée en page web seulement : le [PDF](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-pdf), qui regroupera réponses et corrigés à l’[annexe I](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-i-reponses-et-corriges.html#ann-i), ne l’accompagne pas encore. Les chapitres de la Partie II, écrits pour des personnes confirmées et expertes, gardent un exercice simple, sans corrigé mais suivi de critères pour vous corriger, hors les exercices de passage des chapitres [15](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#ch15) et [23](https://gmag-dev.github.io/bien-demarrer-claude-code/23-securite-et-propriete-intellectuelle-en-entreprise.html#ch23), qui ont le leur.

### Les marques du texte

Quelques marques reviennent dans tout le guide, avec le même sens partout.

**Tableau :** Les marques du texte. Proposé par ce guide.

| Marque | Ce qu’elle dit |
| --- | --- |
| 💡 Conseil | un avis de pratique, qui ne vient pas d’une source |
| « Ce guide propose » | la même valeur qu’un conseil, dans une phrase |
| « À vérifier », après un rond jaune | une affirmation que ce guide n’a pas encore pu vérifier, ou qui dépend de votre compte ou de votre configuration. Elle est rare, et la plupart des chapitres n’en portent aucune. Une source que ce guide n’a pas encore lue porte, dans la liste des sources, la mention « non consultée » à la place d’une date de consultation |
| 🕘 Fait daté | un fait qui change vite, comme une version, un réglage par défaut ou une commande récente, vrai à la date d’état de la page de titre : vérifiez-le dans la documentation de votre version. La version que décrit ce guide, la 2.1.319, date du 6 novembre 2026, d’après son journal des versions [\[1\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-changelog). Les chapitres [17](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#ch17) à [20](https://gmag-dev.github.io/bien-demarrer-claude-code/20-piloter-sa-consommation-et-son-projet.html#ch20), écrits sur la 2.1.318, le disent dans leur cartouche, et les versions publiées depuis la 2.1.319 ne sont pas encore lues pour ce guide, sauf pour les passages marqués 🆕, écrits à la date de leur badge. Dans cette version du guide, la marque est posée sur les numéros de version de la Partie I, sur l’exception du mod ([section 10.1](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#s10-1)) et sur quatre textes de l’interface : l’alias `manual` et la barre d’état du mode Manual ([section 2.3](https://gmag-dev.github.io/bien-demarrer-claude-code/2-bien-demarrer.html#s2-3)), les choix proposés à l’approbation d’un plan et le défaut de `useAutoModeDuringPlan` ([section 4.2](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-2)). Les autres faits de version, et ceux de la Partie II et des annexes, seront marqués plus tard |
| 🆕 Nouveau | une fonction de Claude Code, ou un fait nouveau, entrés dans le guide depuis soixante jours au plus. La refonte de la version 3 elle-même n’est pas marquée. Chaque badge porte sa date, et la section « Quoi de neuf », ci-dessous, rassemble les nouveautés. Un badge reste soixante jours, puis s’efface à la version suivante du guide |
| 🌉 Passerelle, 🏛️ Le Cahier commun | les deux cas du fil rouge, présentés dans « Apprendre avec ce guide » |

### Masquer les exercices

Dans la version web, la ligne « Exercices » du panneau Options propose « Affichés », le réglage de départ, ou « Masqués : guide seulement ». Masqués, les questions de début de chapitre et les exercices disparaissent. Les règles, les encadrés « Quand la règle cède » et « À retenir » restent : ils sont le guide. Votre choix reste dans ce navigateur, et l’impression le suit. Le PDF, quand il accompagnera le guide, gardera tout.

### Quoi de neuf

Claude Code publie plusieurs versions par semaine : dix entre le 31 octobre et le 17 novembre 2026, d’après son journal des versions [\[1\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-changelog). Un guide déjà lu se relit donc mal à la version suivante. Une fonction de Claude Code, ou un fait nouveau, entrés dans le guide depuis soixante jours au plus portent le badge 🆕 Nouveau, avec leur date. La refonte de la version 3 elle-même n’est pas marquée. Le tableau ci-dessous rassemble les nouveautés, de la plus récente à la plus ancienne. Pour chacune, il donne la version de Claude Code où la fonction ou le modèle est apparu, ou, pour un ajout du guide, la dernière version publiée le jour de son entrée, et l’endroit qui en parle. Il est reconstruit à chaque version du guide : un badge y reste soixante jours après sa date, comptés jusqu’à la date de la version du guide, écrite sur la page de titre, puis s’efface à la version suivante.

La version 3.2.1, du 25 novembre 2026, corrige après une relecture critique des passages sur la sécurité et les permissions : aux chapitres 1, 2, 7, 9, 10, 12, 15, 17, 18, 21 et 23, et aux annexes A, C, E, J et L. Cinq sources s’ajoutent, de \[185\] à \[189\].

La version 3.2.2, du 26 novembre 2026, poursuit ces corrections. Elles portent sur le mode `--bare` dans un dépôt non inspecté (chapitre 15), sur les écritures dans un chemin protégé selon le mode de permission (chapitre 17 et annexe L), sur l’expiration des tâches récurrentes (chapitre 18) et, au chapitre 23, sur les retours envoyés depuis une plateforme tierce, l’usage professionnel d’un compte grand public et le droit de la protection des données. Le chapitre 19 reçoit son exercice. Deux sources s’ajoutent, \[190\] et \[191\]. La version 3.2.3, du même jour, allège deux passages pour une première lecture, aux chapitres 1 et 2, et l’image de partage dit que le guide est indépendant. La version 3.2.4, du même jour, place le rappel du soutien avant cette section et sous chaque intercalaire de partie, ajoute l’entrée Soutenir en tête de la barre de lecture, range la commande Installer dans les options, assombrit le violet du thème clair et précise sur la page de titre qu’il s’agit de l’édition intégrale. La version 3.3.0, du même jour, ajoute la lecture chapitre par chapitre : chaque chapitre et chaque annexe a sa propre page, et un sommaire les relie. La page unique reste disponible. La version 3.4.0, du même jour, ouvre le site sur une page d’accueil plus légère que la page unique, la couverture, qui mène à la première page, au sommaire et au guide débutant ; ses options donnent aussi la page unique et le paquet hors ligne. La page unique change d’adresse, `guide-en-une-page.html`, et les anciens liens vers une section mènent, dans un navigateur qui exécute JavaScript, à la page qui porte la section. Dans les options, chaque choix exclusif se lit comme un groupe de boutons radio et se règle au clavier avec les flèches ; quand le système demande moins de mouvement, les animations restent désactivées et une note le dit. En haut de la couverture et du sommaire, un bouton arrête les animations du décor. La mention de transparence dit désormais comment le guide a été fait : je l’ai rédigé, puis une IA l’a relu et amélioré. La version 3.4.1, du même jour, allège la couverture : ni options ni bouton des animations. Son entrée animée, comme celle de la page unique, joue une fois par jour au plus, puis tout s’immobilise en moins de cinq secondes. Le sommaire et les pages de chapitre s’affichent sans entrée animée ; le bouton des animations reste en haut du sommaire. Le site ne propose plus le guide en téléchargement ; les fichiers d’exercice, le dossier `exemples/` avec le dossier d’essai, se téléchargent à part, au chapitre 2, aux annexes A et C et depuis le sommaire. La version 3.4.2, du 27 novembre 2026, rend à la couverture un espace au-dessus de ses tuiles, égal à la marge des côtés, que le retrait des boutons avait supprimé. La version 3.5.0, du même jour, ajoute à chaque page de chapitre une navigation en haut et en bas : la page précédente, la page suivante, le sommaire et la place de la page dans le guide, sans faire défiler la page. Le fil d’Ariane de chaque page ramène à l’accueil. Le décor revient autour du texte des pages de chapitre et du sommaire, et il reste entier sur la couverture. Sur la couverture, la licence passe avant la mention de transparence, à la largeur des tuiles, et l’espace en haut grandit sur les grands écrans. La mention de transparence précise aussi que l’IA a proposé des passages, que j’ai validés.

**Tableau :** Les nouveautés des soixante derniers jours, la plus récente d’abord, rassemblées depuis les badges 🆕 du texte. Une ligne reste soixante jours après sa date, puis disparaît à la version suivante du guide.

| Entrée dans le guide | Claude Code | Nouveauté | Où la lire |
| --- | --- | --- | --- |
| 2026-11-25 | 2.1.321 | Les alias best et fable depuis la version 2.1.321 | [section L.18](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-18) |
| 2026-11-21 | 2.1.325 | Le bac à sable : une commande confinée suit par défaut le circuit normal des permissions | [section 17.4](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#s17-4) |
| 2026-11-20 | 2.1.329 | La mémoire vive du travail multi-agent : mesurer son poste, et les programmes à fermer | [section 8.3](https://gmag-dev.github.io/bien-demarrer-claude-code/8-le-travail-en-parallele.html#s8-3) |
| 2026-11-18 | 2.1.327 | La scène d’ouverture : la brigade | « Apprendre avec ce guide » |
| 2026-11-18 | 2.1.327 | Poser la bonne question avant le prompt | [section 4.8](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-8) |
| 2026-11-18 | 2.1.327 | Une session qui pilote les autres, dès la Partie I | [section 8.4](https://gmag-dev.github.io/bien-demarrer-claude-code/8-le-travail-en-parallele.html#s8-4) |
| 2026-11-18 | 2.1.327 | L’injection de prompt en intégration continue | [section 10.5](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#s10-5) |
| 2026-11-18 | 2.1.327 | Réfléchir à voix haute : la dictée comme atout | [section 12.3](https://gmag-dev.github.io/bien-demarrer-claude-code/12-diagnostiquer-rendre-lisible-reformuler.html#s12-3) |
| 2026-11-18 | 2.1.327 | Cadrer avec les parties prenantes sur un tableau blanc et un doc clé | [section 14.4](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-4) |
| 2026-11-18 | 2.1.327 | Une session sans personne : claude -p en script et en intégration continue | [section 15.5](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-5) |
| 2026-11-18 | 2.1.323 | Code Mode, une option expérimentale | [section L.8](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-8) |
| 2026-11-18 | 2.1.248 | Le mode restreint, --restricted | [section L.16](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-16) |
| 2026-11-18 | 2.1.327 | L’intégration continue : l’action GitHub, GitLab, les secrets et l’injection | [section L.16](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-16) |
| 2026-11-16 | 2.1.321 | Fable 5.2 et son effort par défaut | [section 15.4](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-4) |
| 2026-11-08 | 2.1.267 | Le réglage maxEffortLevel, le plafond de l’effort | [section L.8](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-8) |
| 2026-11-08 | 2.1.319 | Le réglage denyInsteadOfPrompting | [section L.8](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-8) |
| 2026-11-08 | 2.1.257 | Fable 5.1 dans la fiche de la génération Claude 5 | [section L.18](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-18) |
| 2026-11-07 | 2.1.224 | La messagerie entre sessions, 2.1.234 sous Windows natif | [chapitre 19](https://gmag-dev.github.io/bien-demarrer-claude-code/19-plusieurs-sessions-en-parallele.html#ch19) |
| 2026-11-07 | 2.1.252 | /skill-doctor, le coût et l’usage de chaque skill | [section 21.2](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-2) |
| 2026-11-07 | 2.1.269 | claude plugin eval, les essais d’un plugin | [sections 21.4](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-4) et L.7 |

Dans la version web, la ligne « Nouveautés » du panneau Options propose « Tout le guide », le réglage de départ, ou « Nouveautés seulement ». Ce second choix ne garde que cette section et les sections qui portent un badge, sous le titre de leur chapitre, et le sommaire le suit. Votre choix reste dans ce navigateur, et l’impression le suit. Le badge et ce choix sont des fonctions de la page web : le PDF, quand il accompagnera le guide, gardera le texte, sans badge.

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/guide-en-une-page.html#toc)

![Illustration : la personne en long manteau violet et son petit compagnon de cristal cyan, sur une crête de nuit, consultent une carte holographique, une ville lumineuse au loin.](https://gmag-dev.github.io/bien-demarrer-claude-code/images/d14fcba7cb6e.avif)
