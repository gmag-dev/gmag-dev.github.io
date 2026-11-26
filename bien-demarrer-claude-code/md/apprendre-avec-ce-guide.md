> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.3.0 : « Apprendre avec ce guide ».
>
> - Précédent : [Comment lire ce guide](https://gmag-dev.github.io/bien-demarrer-claude-code/md/comment-lire-ce-guide.md)
> - Suivant : [Prérequis](https://gmag-dev.github.io/bien-demarrer-claude-code/md/prerequis.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-apprendre>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## Apprendre avec ce guide

Ce guide s’adresse à des personnes de tous niveaux, et un même conseil ne se lit pas de la même façon par chacune. Les deux chemins de chaque chapitre et leur forme commune sont dans « Comment lire ce guide ». Cette section dit comment il fait apprendre : une scène pour commencer, une progression en quatre jalons, un projet qui sert de fil rouge, et ses réponses à qui décide ou forme.

### Une scène pour commencer : la brigade

Nouveau · 18 nov. 2026 Une enseignante demande à ses élèves de cinquième, des collégiens de douze ou treize ans, ce qu’ils savent cuisiner. Qui commande un plat sur une application de livraison et dit l’avoir fait soi-même ne sera pas cru par ses parents : pas d’ingrédients, pas de vaisselle sale. Des devoirs rendus tout faits par une IA ressemblent à ce plat. Et l’on n’apprend pas à cuisiner en se faisant livrer tous les soirs.

Quand on sait déjà faire, la scène se retourne en partie : déléguer n’est pas tricher. Une cheffe de brigade ne cuisine pas tout elle-même, ses commis le font, et c’est leur métier. Mais pour diriger une brigade, il faut savoir ce qu’est un bon plat et comment il se fait, même sans tenir la poêle :

- **la cheffe sait pour qui elle cuisine et ce que la tablée attend** : c’est la bonne question, avant le choix du plat et avant tout prompt ([section 4.8](https://gmag-dev.github.io/bien-demarrer-claude-code/#s4-8)),
- **les commis cuisinent** : ce sont Claude et ses sous-agents, dès le [chapitre 1](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch1), et plusieurs à la fois au [chapitre 8](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch8),
- **la cheffe ne sert rien sans preuve** : avant de servir, elle exige un contrôle qui peut échouer, plutôt que la parole du commis. C’est la vérification ([chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch5)).

Une cheffe qui ne sait pas ce qu’est un bon plat sert ce qu’on lui apporte. Quand on apprend, la scène des élèves vaut telle quelle : c’est pourquoi chaque jalon de ce guide se valide par un exercice de passage, qui produit une preuve. Les trois gestes de la cheffe s’apprennent dès les premiers chapitres, et la progression ci-dessous, en quatre jalons, dit comment on les tient de mieux en mieux, des règles nettes à leurs limites.

Cette scène est une situation type, inspirée d’une publication en ligne que ce guide n’a pas pu retrouver. Le premier paragraphe en reprend l’idée à la façon de ce guide, et la brigade est de ce guide, qui prolonge la scène.

### Une progression en quatre jalons

Stuart Dreyfus décrit cinq stades de l’acquisition d’une compétence chez l’adulte [\[2\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-dreyfus-2004) :

- **novice** : la personne reconnaît des traits sans contexte et applique des règles pour agir,
- **débutant avancé** : l’expérience lui fait reconnaître des aspects de la situation, et elle suit des maximes,
- **compétence** : devant la surcharge, elle choisit un plan ou une perspective qui dit ce qui compte, et se sent responsable du résultat,
- **maîtrise** : elle voit ce qui se passe, mais décide encore en délibérant,
- **expertise** : elle voit aussi, tout de suite, comment atteindre le but.

Dreyfus note que qui cherche la sécurité des règles ne dépasse pas le stade de la compétence [\[2\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-dreyfus-2004). Ce guide s’en inspire pour sa forme : la Partie I, du [chapitre 1](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch1) au [chapitre 13](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch13), donne des **règles nettes**, chacune avec sa limite marquée en fin de section, et la Partie II, du [chapitre 14](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch14) au [chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23), développe **les limites de ces règles**, et les situations où elles cèdent.

Ce guide s’inspire de ces cinq stades sans les mesurer. Il les regroupe en quatre **jalons**, des points de passage qui suivent l’ordre de ses chapitres. Chaque jalon se valide par un exercice de passage, qui produit une preuve vérifiable : une sortie de commande, un [diff](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-diff), un fichier. Cette preuve montre qu’un geste est tenu une fois, sur un cas. Elle ne prouve pas un stade : un stade se construit par une pratique répétée, sur des situations variées, et aucun exercice ne le certifie. Le tableau suivant dit où se trouve chaque exercice de passage. Pour la première semaine, l’[annexe A](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-a) donne une liste d’actions à cocher, jour après jour.

**Tableau :** Quatre jalons, le stade de Dreyfus que chacun vise à terme, et leur exercice de passage, d’après [\[2\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-dreyfus-2004). Le regroupement, la correspondance avec les stades et la répartition des chapitres sont proposés par ce guide.

| Jalon | Stade visé à terme | Les gestes du jalon | Chapitres | Exercice de passage |
| --- | --- | --- | --- | --- |
| Débutant | novice, débutant avancé | lancer une session en mode Manual, un `CLAUDE.md` court, `/clear` et `/rewind`, le mode plan, les prompts précis, une règle `deny` sur vos secrets, le [test](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-test) qui échoue d’abord, la preuve qu’une correction est vérifiée | 1 à 5 | à la fin du [chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch5), puis au jour 5 de l’[annexe A](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-a) : corriger un défaut réel, et garder les sept preuves de l’exercice de passage, du `CLAUDE.md` chargé au [commit](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-commit) relu |
| Confirmé | compétence | les skills, les hooks, un serveur local, les sous-agents, le travail en parallèle, la lecture de `/usage`, la sécurité de base, les commits | 6 à 11 | à la fin du [chapitre 11](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch11) : écrire un relecteur qui ne peut que lire, l’appliquer à son propre diff contre une spécification, relier chaque constat à une exigence |
| Avancé | maîtrise | le diagnostic d’une session décevante, le modèle qui propose et le contrôle qui vérifie, la délégation par des briefs | 12 à 15 | à la fin du [chapitre 15](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch15) : lancer un même travail sur trois fichiers par un script, avec des outils permis d’avance et un plafond de tours, puis corriger le prompt avant la suite |
| Expert | expertise | la revue qui cherche à réfuter, les couches de réglages et la défense par la structure, l’analyse de cause, plusieurs sessions, le pilotage chiffré, la posture d’entreprise | 16 à 23 | à la fin du [chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23) : conduire un lot complet, des exigences écrites, un contrôle qui peut échouer, deux sous-agents sur des fichiers distincts, une relecture par un regard neuf, l’analyse de cause d’un défaut, un point de pilotage chiffré |

*Dessin : Quatre jalons et les stades de Dreyfus. Schéma : la description suit.*

**Figure :** Quatre jalons et les stades de Dreyfus. Les stades viennent de [\[2\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-dreyfus-2004). Leur regroupement en quatre jalons, la correspondance avec les stades et la répartition des chapitres sont proposés par ce guide : la correspondance oriente, elle ne mesure pas.

Le même escalier, en texte, chaque jalon suivi du stade qu’il vise à terme : débutant (novice et débutant avancé, chapitres [1](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch1) à [5](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch5)), confirmé (compétence, chapitres [6](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch6) à [11](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch11)), avancé (maîtrise, chapitres [12](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch12) à [15](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch15)), expert (expertise, chapitres [16](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch16) à [23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23)). De marche en marche, on va des règles nettes vers leurs limites.

**Pourquoi quatre jalons et non cinq stades.** Quatre jalons suivent la structure du guide : les chapitres [1](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch1) à [5](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch5) pour qui débute, 6 à 11 pour qui est à l’aise, 12 à 15 pour aller plus loin, et 16 à 23 pour l’expertise. Les cinq stades de la source restent l’inspiration : le jalon débutant de ce guide vise le novice et le débutant avancé. Les jalons ne suivent pas tout à fait les parties : le jalon avancé commence en fin de Partie I, aux chapitres [12](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch12) et [13](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch13), et s’achève en Partie II, aux chapitres [14](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch14) et [15](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch15). Son exercice de passage, à la fin du [chapitre 15](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch15), est le premier de la Partie II.

> **🔀 Quand la règle cède**
>
> - Relire la Partie I avec un regard expert, c’est garder la règle nette et marquer sa limite. Une règle trop nette ne se nuance pas sur place : sa limite va dans l’encadré « Quand la règle cède » de sa section, ou dans l’encadré « La limite » sous un tableau à trois niveaux, et son développement en Partie II. La relecture suit les six questions de la grille de l’[annexe F](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-f).
> - Ce qui tient : un contrôle placé sur le poste peut être contourné depuis le poste. Un contrôle qui doit tenir se place aussi là où le poste ne peut pas l’atteindre (sections [10.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-5) et [11.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s11-2)).
> - Pour aller plus loin : [annexe F](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-f).

### Le fil rouge : Passerelle et Le Cahier commun

Les exercices suivent un projet fictif, au service d’une cause largement partagée : l’accès de chacune et de chacun à ses droits.

🌉 **Passerelle** est une association d’accueil de la commune fictive de Rivelune. Les personnes qu’elle accueille reçoivent des courriers administratifs écrits dans une langue difficile, où un délai, un montant ou une pièce à fournir se perdent vite. Chapitre après chapitre, ses bénévoles construisent avec Claude un outil local qui fait trois choses :

1. il tire de chaque courrier un brouillon en langage facile,
2. il vérifie qu’aucune date et aucun montant ne s’est perdu ni ajouté en route,
3. il remet le brouillon à une personne concernée, qui relit et tranche.

L’outil ne décide de rien et n’envoie rien. Dans la Partie I, les barreaux ① et ② de chaque exercice reprennent l’état du projet, et le barreau ③ revient au vôtre. Dans tout le guide, chaque exercice a un chemin sans code. Plus loin dans le guide, une « vague » de soixante courriers en une semaine, après un changement de règle, met l’outil à l’épreuve du travail en parallèle et du pilotage.

![Schéma : la description suit](https://gmag-dev.github.io/bien-demarrer-claude-code/images/f75a8a98e03a.avif)

**Figure :** Passerelle en quatre cases, du courrier difficile à la décision de la personne qui le reçoit. Image générée avec un outil d’IA (ChatGPT) pour ce guide, d’après un récit proposé par ce guide. Tout y est fictif.

L’histoire de Passerelle en quatre cases, en texte :

1. Le soir, chez elle, une usagère de la permanence lit un courrier administratif dense, et s’inquiète.
2. Au guichet de Passerelle, une bénévole s’assied à côté d’elle, et elles lisent le courrier ensemble.
3. L’écran du portable montre un brouillon court, en langage facile, et l’usagère est soulagée.
4. Une relectrice vérifie avec elle les dates sur un calendrier, et l’usagère tient elle-même le stylo : c’est elle qui décide de ce qu’elle fait de son courrier.

*Dessin : Passerelle, le déroulé complet, du chapitre 1 au chapitre 23. Schéma : la description suit.*

**Figure :** Passerelle, le déroulé complet, du [chapitre 1](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch1) au [chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23). En gris le projet, en bleu une décision de pilotage, en vert un contrôle qui tient, en rouge ce qui est refusé ou retiré, en ambre ce qui sort, en tirets le geste d’une personne. Schéma proposé par ce guide, d’après l’[annexe J](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-j).

Le même déroulé, en texte :

1. Débutant, chapitres [1](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch1) à [5](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch5) : dix courriers fictifs et la règle « ne jamais envoyer » (1), un `CLAUDE.md` court, chargé et vérifié (2), trente courriers et une note de passation (3), le plan du circuit, corrigé et approuvé par Samia, et un prompt de réalisation réutilisé pour chaque courrier (4), le contrôle des dates et des montants, écrit par Bernard (5).
2. Confirmé, chapitres [6](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch6) à [11](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch11) : chaque gêne et son extension choisie (6), le skill et les deux hooks, chacun prouvé (7), la vague de soixante courriers et deux branches relues (8), les relevés d’usage et l’effort retenu (9), un courrier piégé, la triade et les outils web retirés (10), un historique propre, sans aucun vrai courrier (11).
3. Avancé, chapitres [12](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch12) à [15](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch15) : le diagnostic avant la correction, et l’état de la vague rendu lisible pour Samia (12), un défaut classé, sa parade et la tâche relancée (13), des exigences approuvées et le contrôle étendu aux délais (14), un brief de vérification et deux rapports vérifiés avant usage (15).
4. Expert, chapitres [16](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch16) à [23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23) : le brouillon `PASS-B-047`, signalé par Odile, corrigé avec un cas de régression (16), une liste pour chaque outil et une règle `deny` qui protège le dossier `pieces/` (17), une garde d’écriture et une ligne d’état (18), trois sessions et un seul écrivain par fichier partagé (19), des seuils, un backlog et un journal des décisions (20), le skill versionné et un agent de relecture (21), l’agent qui lisait le web et les courriers, coupé en deux (22), la règle de deux, et le message de partage qu’Amadou envoie lui-même (23).
5. À chaque brouillon et à chaque chapitre, deux gestes : Odile relit et tranche, rien ne sert sans son accord, puis la destinataire décide de ce qu’elle fait de son courrier. L’outil ne décide de rien et n’envoie rien.

**Pourquoi un brouillon, et pas du « FALC ».** Le [FALC](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-falc), « facile à lire et à comprendre », est une méthode d’écriture née de règles européennes, écrites dans un projet piloté par Inclusion Europe [\[3\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-inclusion-europe-information-for-all). L’Unapei, qui la diffuse en France, fait de la participation des personnes concernées la première règle de la méthode [\[4\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-unapei-falc). C’est une pratique que recommandent les associations, et non une obligation légale : selon le guide du canton du Valais, l’appellation n’est pas protégée, et les logiciels qui simplifient un texte ne remplacent pas une relecture humaine [\[5\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-valais-langage-facile). Passerelle en tire sa pratique : l’outil produit un **brouillon pour relecture**, jamais un texte présenté comme du FALC, et une [personne concernée](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-personne-concernee) le relit avant qu’il serve. Ce guide n’enseigne pas le FALC. Il montre comment un outil aide sans décider à la place des personnes.

🏛️ **Le Cahier commun** est le second cas, plus court, dans la même commune. Rivelune consulte ses habitantes et ses habitants sur le réaménagement de la place des Tilleuls, et 400 contributions arrivent. Une synthèse en est tirée, dont chaque phrase renvoie aux contributions qui la fondent, puis elle revient aux habitants avant que le conseil municipal décide. Il sert là où il faut plusieurs travaux à la fois : le travail en parallèle, la consommation, les pièges, la délégation, plusieurs sessions, le pilotage et l’architecture (chapitres [8](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch8), [9](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch9), [13](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch13), [15](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch15), [19](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch19), [20](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch20) et [22](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch22)). L’exercice court porte sur 40 contributions, l’exercice complet sur 400.

![Schéma : la description suit](https://gmag-dev.github.io/bien-demarrer-claude-code/images/5bd2d8f85063.avif)

**Figure :** Le Cahier commun en quatre cases, des contributions des habitants à la synthèse qui leur revient. Image générée avec un outil d’IA (ChatGPT) pour ce guide, d’après un récit proposé par ce guide. Tout y est fictif.

L’histoire du Cahier commun en quatre cases, en texte :

1. Sur la place des Tilleuls, des habitantes et des habitants de tous âges déposent leurs contributions dans un grand cahier commun.
2. Dans une petite salle, Mei et un bénévole trient les contributions en quelques piles, une par thème.
3. Un tableau de synthèse montre cinq lignes, et un fil relie chaque ligne aux contributions dont elle vient.
4. Le soir, sur la place, Mei présente la synthèse aux habitants, avant que le conseil municipal se réunisse et décide.

*Dessin : Le Cahier commun, le déroulé complet, des contributions au conseil. Schéma : la description suit.*

**Figure :** Le Cahier commun, le déroulé complet, des contributions au conseil. En gris le projet, en bleu une décision de pilotage, en vert un contrôle qui tient, en rouge ce qui est retiré, en tirets le geste d’une personne, en ambre et en tirets la trace de chaque phrase jusqu’à ses contributions. Schéma proposé par ce guide, d’après les chapitres [8](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch8), [9](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch9), [13](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch13), [15](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch15), [19](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch19), [20](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch20) et [22](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch22).

Le même déroulé, en texte :

1. Au départ, 400 contributions sur la place des Tilleuls, 40 dans l’exercice court et 400 dans l’exercice complet.
2. [Chapitre 8](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch8) : Mei confie chaque thème à un sous-agent, et une première synthèse donne, pour chaque phrase, ses sources.
3. [Chapitre 9](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch9) : le coût de l’éventail est relevé, et le niveau d’effort de la synthèse retenu, avec sa raison.
4. [Chapitre 13](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch13) : les contributions longues prenaient trop de place, et la synthèse mesure désormais leur place.
5. [Chapitre 15](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch15) : un brief par thème, et des comptes vérifiés avant usage.
6. [Chapitre 19](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch19) : six sessions de thème, une par thème depuis l’ajout de l’éclairage au [chapitre 15](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch15), écrivent chacune leur fichier, et une seule écrit la synthèse, celle de Mei.
7. [Chapitre 20](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch20) : quatre jalons jusqu’au conseil, et le retour aux habitants doit tenir avant.
8. [Chapitre 22](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch22) : des agents de thème qui ne peuvent rien envoyer, et la session de Mei vérifie chaque citation.
9. Puis deux gestes : Mei rend la synthèse et les habitants la relisent avant le conseil, puis le conseil municipal décide. Tout au long, chaque phrase de la synthèse remonte aux contributions `CAH-` qui la fondent.

**Pourquoi deux fils, et pas un seul.** Les deux cas n’apprennent pas la même chose. Passerelle apprend à construire un outil et à le tenir : un courrier donne un brouillon, ce brouillon se vérifie contre son seul courrier, et une personne concernée le relit avant qu’il serve. Pendant la vague, Passerelle travaille aussi en parallèle, mais chaque brouillon reste l’affaire d’un seul courrier, et se vérifie seul. Le Cahier commun pose un autre problème : une seule synthèse, tirée de beaucoup de contributions. Le travail s’y partage par thème, entre plusieurs sous-agents puis plusieurs sessions, sa consommation se mesure, et chaque phrase de la synthèse doit remonter aux contributions qui la fondent, sans que les plus longues prennent toute la place. Un seul fil ne suffirait pas. Passerelle seul ne montrerait pas une phrase qui dépend de dizaines de documents, ni la façon d’en garder la trace. Le Cahier commun seul n’aurait pas de personne concernée qui tranche, document par document, sur ce qui la touche. Les deux fils se rejoignent sur un point : l’outil propose, et des personnes décident, Odile et la destinataire pour un courrier, les habitants puis le conseil municipal pour la place des Tilleuls.

**Tableau :** Les personnages du fil rouge. Tous sont fictifs.

| Personnage (fictif) | Qui elle ou il est | Ce qu’elle ou il fait dans le guide |
| --- | --- | --- |
| Samia | coordinatrice bénévole de la permanence de Passerelle, infirmière à mi-temps | fixe les règles de l’association et décrit ce dont la permanence a besoin |
| Inès | étudiante en droit, bénévole | débute avec Claude Code et suit le chemin sans code |
| Bernard | ancien comptable, bénévole | écrit le contrôle des dates et des montants, sur le chemin avec code |
| Amadou | trésorier de l’association, conducteur de bus | tient le dossier des courriers et décide de ce qui y entre |
| Odile | aide à domicile, accompagnée par la permanence il y a trois ans | relit chaque brouillon et tranche : rien ne sert sans son accord |
| Josiane | usagère de la permanence | lit lentement, préfère les phrases courtes, gère ses papiers elle-même, et décide de ce qu’elle fait de son courrier |
| Thomas | usager, malvoyant, technicien du son | lit avec un lecteur d’écran, et dit quand un brouillon ne passe pas à l’oral |
| Mei | chargée de participation de la commune de Rivelune | porte Le Cahier commun et rend la synthèse aux habitants |

Tout est inventé : l’association, la commune, les organismes qui écrivent, les courriers, les contributions et les personnes. Les identifiants le disent par leur préfixe, `PASS-` pour Passerelle et `CAH-` pour Le Cahier commun. Un numéro qui ressemblerait à un vrai s’écrit visiblement faux. Aucune donnée réelle n’entre dans le projet, et les exercices vous demandent la même discipline sur le vôtre.

Chaque chapitre dit, dans son encadré « Ce chapitre », où en est Passerelle quand vous arrivez. Vous pouvez donc prendre le projet en route, sans avoir fait les exercices précédents. L’[annexe J](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-j) donne l’état du projet chapitre par chapitre, et la liste des courriers et des contributions.

### Décider ou former avec ce guide

Qui forme ou décide répond aux questions des autres avant d’avoir tout lu. Chaque réponse renvoie à sa section, et chaque ajout porte « ce guide propose ».

Si vous formez un groupe, quatre questions reviennent.

**La durée et l’ordre.** Pour la première semaine, ce guide propose les six séances de l’[annexe A](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-a), le jour 1 en deux : une demi-heure à une heure chacune, et davantage pour le jour 4, de trois à un peu plus de six heures en tout. Aucun essai n’a encore mesuré ces durées. Ensuite, les jalons se suivent, chacun clos par son exercice de passage. Chaque exercice dit son temps dans sa ligne « Compétence visée ».

**Un groupe mêlé.** Tout le groupe travaille le même chapitre, par deux chemins. En Partie I, la question de placement oriente chaque personne d’après une vraie tâche : le chemin débutant suit le chapitre et ses trois barreaux, le chemin court lit les encadrés « Quand la règle cède », puis fait le barreau ③ sur son propre projet. Qui ne code pas prend le chemin sans code. En Partie II, chacune lit le chapitre dans l’ordre, puis fait l’exercice (« Comment lire ce guide »), et la [section G.6](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-g-6), sous « En groupe », met en commun la grille d’auto-évaluation, sans classer personne. Au-delà de la première semaine, le guide ne propose pas de plan de séance.

**Les postes.** Sur des postes fournis par une organisation, envoyez d’abord à la personne qui les gère le message de la page « Préparez votre poste », et non la page, puis attendez ses réponses avant toute installation. Vérifiez ensuite, pour chaque personne, les « Prérequis » et git ([section 2.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-1)). Le dossier d’essai vient du paquet : sans lui, la [section A.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-a-3) ne permet que la semaine sans code ([section C.9](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-c-9)). Des données de l’organisation ne passent que par un compte commercial qu’elle fournit, Team, Enterprise ou API, selon ses règles, jamais par un abonnement Pro, Max ou Ultra, même payé par elle ([section 23.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-1)).

**Ce que la licence permet.** En résumé, pour cette version : le guide se partage tel quel, sans modification ni usage commercial. Une formation interne peut s’appuyer sur lui en citant son titre, son autrice et sa licence, une formation payante se demande, et seuls les extraits de code s’adaptent. Le texte qui fait foi, avec son lien officiel daté, est au bloc « Licence et permissions », où mène la page de titre.

Si vous décidez pour une équipe, quatre questions reviennent.

**Le gain, et quand.** Ce guide ne promet aucun gain chiffré. La semaine de l’[annexe A](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-a) finit sur un premier lot relu et enregistré dans git, avec les preuves du jalon Débutant : des preuves de savoir-faire, pas de gain. Le gain se mesure : la [section 13.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s13-1) demande de mesurer le temps et les défauts, pas l’impression d’aller plus vite.

**Le coût pour une équipe.** Ce guide ne donne aucun montant : les prix changent, et le [chapitre 9](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch9) renvoie à la page des tarifs [\[6\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-tarifs). Le compte commercial coûte ce que prévoit le contrat de l’organisation (« Les postes »). S’y ajoutent le temps de formation et la consommation, que lit la commande `/usage` (chapitres [9](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch9) et [20](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch20)). Sur un compte Team ou Enterprise, ce qu’elle affiche reste à vérifier sur votre compte ([section 20.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s20-1)). Ses barres, là où elles s’affichent, comptent tout l’usage du compte. Partout, sa répartition et ses recommandations ne comptent que cette machine ([section 20.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s20-2)).

**Les risques que vous acceptez.** Le [chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch10) les nomme pour un poste, avec leurs parades. Pour une organisation, lisez aussi la [section 23.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-1) sur ses données et la [section 23.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-4) sur la règle de deux.

**Savoir au bout d’un mois.** Avant de commencer, écrivez en [tolérances](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-tolerance) ce qui dira que l’adoption marche ([section 20.13](https://gmag-dev.github.io/bien-demarrer-claude-code/#s20-13)). Le guide donne trois mesures :

- les preuves des exercices de passage, personne par personne,
- `/usage`, noté chaque jour ([section 9.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s9-3)) sur Pro, Max ou Ultra, ou si votre compte d’organisation affiche les barres du forfait ([section 20.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s20-1)), puis lu par le pilotage chiffré du [chapitre 20](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch20),
- le temps et les défauts d’une même tâche, avant et après.

Par exemple, ce guide propose : au moins la moitié de l’équipe a fini seule la première semaine, avec ses preuves. Au bout du mois, tranchez sur ces mesures : continuer, arrêter ou refaire le plan.

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/#toc)
