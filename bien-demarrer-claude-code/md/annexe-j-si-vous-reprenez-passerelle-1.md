> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.2.3 : « Annexe J. Si vous reprenez Passerelle », partie 1 sur 2.
>
> - Précédent : [Annexe I. Réponses et corrigés](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-i-reponses-et-corriges.md)
> - Suivant : [Annexe J. Si vous reprenez Passerelle (partie 2 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-j-si-vous-reprenez-passerelle-2.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-ann-j>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## Annexe J. Si vous reprenez Passerelle

Vous pouvez prendre le fil rouge en route, sans avoir fait les exercices des chapitres précédents. Cette annexe dit où en est Passerelle 🌉 à la fin de chaque chapitre, comment reconstituer ce point de reprise sur votre poste, où agit chaque personnage, et ce que contient le corpus fictif : les courriers `PASS-` de Passerelle et les contributions `CAH-` du Cahier commun 🏛️. Tout y est inventé : l’association, la commune de Rivelune, les organismes qui écrivent, les personnes, les courriers et les contributions.

### J.1 L’état du projet à chaque chapitre

L’état de Passerelle à la fin d’un chapitre est celui où commence le suivant : c’est son [point de reprise](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-point-de-reprise). L’encadré « Ce chapitre », en tête de chaque chapitre de la Partie I, le redit en arrivant.

*Dessin : Passerelle, de chapitre en chapitre, dans la Partie I. Schéma : la description suit.*

**Figure :** Passerelle, de chapitre en chapitre, dans la Partie I. En gris le projet, en bleu une décision de pilotage, en vert un contrôle qui tient, en rouge ce qui est refusé ou retiré, en tirets le geste d’une personne. Schéma proposé par ce guide.

Le même parcours, en texte : dix courriers et la première règle (1), un `CLAUDE.md` court (2), trente courriers et une note de passation (3), le plan du circuit et le prompt réutilisable (4), le contrôle des dates et des montants (5), chaque gêne et son extension (6), le skill et les deux hooks (7), la vague et deux branches (8), les relevés d’usage (9), la triade dessinée, les secrets refusés et les outils web retirés (10), l’historique propre (11), le diagnostic et la vague rendue lisible (12), le défaut classé (13). Après la treizième étape, une dernière case, en tirets, dit le geste d’Odile, qui vaut pour toutes : chaque brouillon, elle le relit et tranche.

**Tableau :** L’état de Passerelle à la fin de chaque chapitre de la Partie I. Proposé par ce guide.

| Chapitre | Ce qui se passe | Ce que contient le projet à la fin |
| --- | --- | --- |
| 1 | Inès fait expliquer un premier courrier par Claude. Samia pose la première règle : l’outil n’envoie jamais rien | un dossier de projet, dix courriers fictifs `PASS-C-001` à `PASS-C-010`, et la règle « ne jamais envoyer » nommée comme règle imposée, à poser au [chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch10) |
| 2 | Le `CLAUDE.md` de Passerelle : à qui s’adresse l’outil, les règles de rédaction des brouillons, les interdits. Les modes de permission, essayés sur le dossier des courriers | un `CLAUDE.md` de moins de vingt lignes, chargé et vérifié par `/context` |
| 3 | Le dossier passe à trente courriers, et le lot sature la conversation. Les bénévoles compactent avec une note de passation, et un sous-agent lit les pièces jointes | trente courriers, `PASS-C-001` à `PASS-C-030`, et une note de passation datée, `notes/passation.md` |
| 4 | Le circuit courrier, brouillon, relecture, planifié en mode plan, après l’entretien de besoin avec Samia, puis les quatre ingrédients du prompt de réalisation : le contexte, le but, les contraintes, et un critère de fin vérifiable | un plan du circuit, corrigé par Samia et approuvé, dans `plans/circuit-courrier.md`, et un prompt de réalisation, réutilisé pour chaque courrier |
| 5 | Bernard écrit le contrôle : aucune date ni aucun montant perdu ou ajouté entre le courrier et le brouillon, et un lexique des mots à expliquer | un contrôle qui a échoué sur le brouillon `PASS-B-003`, qui avait perdu un délai, et le correctif enregistré par un premier commit relu. Le brouillon `PASS-B-017`, qui ajoutait un montant, est corrigé au barreau ② : le contrôle passe sur les trente brouillons |
| 6 | Trois gênes, et l’extension la plus légère pour chacune : un skill pour le prompt retapé, un hook pour le contrôle oublié, un serveur en lecture seule sur le lexique | chaque gêne avec son extension choisie et la preuve attendue, et le serveur du lexique branché, par la déclaration de la [section 18.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s18-3), lue en avance |
| 7 | Un skill « brouillon pour relecture », un hook qui bloque un numéro qui ressemble à un vrai numéro de sécurité sociale, et le contrôle imposé à chaque fin de tour | le skill, prouvé par un brouillon produit et contrôlé, la garde, prouvée par un refus constaté, et le hook `Stop`, prouvé par un échec voulu qui renvoie Claude au travail. Les deux hooks sont dans le `.claude/settings.local.json` de chaque poste, et ce qu’ils lancent se relit avant chaque session ([section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-2)) |
| 8 | La vague de courriers : un sous-agent par courrier, et deux worktrees, l’un pour le skill, l’autre pour une correction urgente du lexique. 🏛️ Le Cahier commun : un sous-agent par thème | deux branches relues, aucun fichier écrit par les deux, et une première synthèse du Cahier commun par thème, chaque phrase avec ses sources |
| 9 | Le coût de la vague, relevé chaque soir. 🏛️ Le Cahier commun : le coût de l’éventail, et le niveau d’effort de sa synthèse | une semaine de relevés, et le niveau d’effort retenu, avec sa raison |
| 10 | Un courrier piégé demande d’ignorer les consignes et d’envoyer le dossier. Les bénévoles rangent les outils de Passerelle dans les trois cercles de la triade, retirent les outils web, et laissent le shell sous la garde d’une personne | des réglages partagés qui refusent la lecture des secrets et retirent les outils web, et un schéma de ce qui porte et de ce qui retire chaque cercle de la triade |
| 11 | Aucun vrai courrier n’entre dans git. Un diff retire le dossier des pièces du `.gitignore`, sous un message trompeur | un historique propre, vérifié sur toute sa longueur avant un premier dépôt distant |
| 12 | Le diagnostic avant la correction sur un brouillon refusé, l’état de la vague rendu à Samia pour la réunion du jeudi, et la dictée reformulée avant d’agir | l’état de la vague en schéma et en texte, et deux lignes de `CLAUDE.md` qui demandent une reformulation et un désaccord motivé |
| 13 | Un brouillon change le sens d’un délai. 🏛️ Le Cahier commun : la synthèse donne trop de place aux contributions longues | le défaut classé, sa parade appliquée, la tâche relancée dans une session neuve, et une synthèse qui mesure la place des contributions longues |

La Partie II reprend Passerelle tel que la Partie I le laisse. Ses chapitres ont aussi leur encadré « Ce chapitre », mais leurs exercices sont simples et sans corrigé. Ce guide ne fournit pas d’état tout prêt de Passerelle à la fin de la Partie I : faites donc les exercices de la Partie II sur un projet personnel, ou sur des données inventées et marquées comme telles. Passerelle n’y sert que d’illustration. Pour les faire malgré tout sur Passerelle, reconstituez d’abord son point de reprise ([section J.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-j-2)).

**Tableau :** Ce que contient Passerelle à la fin de chaque chapitre de la Partie II. Proposé par ce guide.

| Chapitre | Ce que contient le projet à la fin |
| --- | --- |
| 14 | les exigences du contrôle, écrites et approuvées par Samia. Le contrôle, devenu `controle_fidelite.py`, couvre aussi les délais, les références et les ajouts, et le hook `Stop`, la règle `ask` du [chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch10), la recette du `justfile` et le `README.md` l’appellent sous ce nom. Chaque tâche finit par une issue nommée, et aucun brouillon ne sert sans l’accord d’Odile |
| 15 | un brief de vérification rangé dans le dépôt, et deux rapports de sous-agents vérifiés avant usage. 🏛️ La répartition du Cahier commun par thème, aux comptes vérifiés |
| 16 | le brouillon fautif corrigé et relu par Odile, un contrôle qui reconnaît les délais écrits en toutes lettres, un cas de régression, et un retour d’expérience écrit |
| 17 | des réglages partagés qui donnent à chaque outil sa liste, `allow`, `ask` ou `deny`, avec sa raison, et les règles du [tableau 17.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#tab-17-3) ([section 17.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-2)) pour ce qui s’exécute sans demande. Une règle `deny` et le bac à sable protègent le dossier `pieces/` |
| 18 | un hook avant écriture, chargé par la seule session de rédaction, qui refuse ses écritures hors de `brouillons/`, `decisions/` et `tableau/`, une ligne d’état qui suit le lot en cours, et une tâche du matin qui survit à un redémarrage |
| 19 | un seul écrivain par fichier partagé, une trace écrite que toutes les sessions relisent, et une nuit de rédaction préparée, avec ses limites et les gestes qui restent à Samia et à Odile |
| 20 | une semaine de relevés, des seuils avec leur raison, un backlog estimé, et un journal avec deux décisions. 🏛️ Les jalons de la consultation |
| 21 | le skill avec sa suite de cas, sa version et son journal, un agent de relecture en lecture seule, une exigence EARS liée à son test, et une sauvegarde vérifiée |
| 22 | les trois réponses écrites de chaque agent, et l’agent qui lisait à la fois le web et les courriers coupé en deux, sa moitié web rangée dans un projet à part, sans données. 🏛️ Une recherche par thème dans Le Cahier commun |
| 23 | la règle de deux dessinée pour chaque session et chaque agent, des contrôles de sécurité branchés à la porte de commit, et un message de partage relu avant qu’Amadou l’envoie lui-même |

### J.2 Reconstituer un point de reprise

Pour reprendre au chapitre de votre choix, reconstituez sur votre poste l’état de la fin du chapitre précédent. Ce guide propose quatre étapes :

1. **le dossier** : créez un dossier `passerelle/`, avec ses sous-dossiers `courriers/` et `brouillons/`, puis `git init`. Git doit être installé et connaître votre nom et votre adresse électronique, par `git config user.name` et `git config user.email`, avant le premier commit,
2. **les courriers** : créez les courriers fictifs dont le chapitre a besoin, dix avant le [chapitre 3](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch3), trente ensuite, quatre-vingt-dix à partir du [chapitre 8](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch8), sur le modèle de la [section J.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-j-4),
3. **les pièces** : reprenez, depuis le chapitre qui la construit, chaque pièce que le tableau de la [section J.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-j-1) nomme avant votre point de reprise : le `CLAUDE.md` du [chapitre 2](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch2), la note `notes/passation.md` du [chapitre 3](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch3), le plan du [chapitre 4](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch4), le contrôle du [chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch5), le skill et les deux hooks du [chapitre 7](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch7), et, pour la Partie II, la définition du fini `docs/definition-du-fini.md`, d’après le gabarit de la [section E.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-e-5), et la décision `decisions/0004-delais-relatifs.md`, qui tient en une règle : un délai relatif se garde tel que le courrier l’écrit, sans date calculée ([chapitre 15](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch15)),
4. **le point de départ** : committez cet état, pour pouvoir y revenir.

Sans écrire de code, vous pouvez faire créer les courriers par Claude. Claude n’a pas ce guide sous les yeux : copiez d’abord le tableau des dix premiers courriers de la [section J.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-j-4) dans un fichier `corpus.md`, à la racine du dossier. Lancez ensuite Claude dans le dossier par `claude --permission-mode manual`, puis donnez-lui une demande comme celle-ci :

```text
Crée dans courriers/ dix courriers fictifs, de PASS-C-001 à PASS-C-010, d'après le tableau de @corpus.md.
Chaque courrier commence par la ligne « Courrier fictif PASS-C-<numéro>, créé pour ce guide. »
Les émetteurs sont le Bureau des aides de Rivelune ou le Service logement de la mairie de Rivelune, tous deux fictifs.
N'écris aucun nom, aucune adresse ni aucun numéro réel.
Puis liste, pour chaque courrier, ses dates et ses montants, et vérifie-les contre le tableau de @corpus.md.
```

> **⚠️ Attention**
>
> Un point de reprise ne se reconstitue jamais avec de vrais documents. N’y mettez ni un vrai courrier, ni le nom, l’adresse ou les revenus d’une personne réelle, même pour essayer : ce que Claude lit part vers le modèle ([section 1.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s1-3)). Gardez les préfixes `PASS-` et `CAH-`, qui disent que tout est inventé.

### J.3 Où agit chaque personnage

La troupe des personnages est présentée une fois, dans la section « Apprendre avec ce guide ». Ce tableau ne la redit pas : il donne quelques chapitres où l’on retrouve chacune et chacun, pour retrouver une scène.

**Tableau :** Quelques chapitres où l’on retrouve chaque personnage. Proposé par ce guide.

| Personnage (fictif) | Où le retrouver |
| --- | --- |
| Samia | [chapitre 1](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch1), la première règle, [chapitre 4](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch4), l’entretien de besoin, [chapitre 14](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch14), les exigences approuvées, [chapitre 16](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch16), le retour d’expérience |
| Inès | [chapitre 1](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch1), le premier courrier expliqué, [chapitre 8](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch8), la vague, [chapitre 4](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch4), le prompt de réalisation, [chapitre 12](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch12), la dictée reformulée, [chapitre 14](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch14), le contrôle de fidélité étendu aux délais, [chapitre 19](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch19), la session de relecture qu’elle lance, et chaque barreau sans code |
| Bernard | [chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch5), le contrôle des dates et des montants, [chapitre 9](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch9), les relevés du soir, chapitres [15](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch15) et [16](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch16), la vérification et la correction de classe |
| Amadou | [chapitre 1](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch1), la règle du dossier, [chapitre 9](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch9), le tableau de la semaine, [chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23), le message de partage qu’il envoie lui-même |
| Odile | chaque exercice du circuit courrier, brouillon, relecture : elle relit et tranche |
| Josiane | [chapitre 1](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch1), la règle qui la protège d’un envoi avant relecture, chapitres [10](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch10) et [14](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch14), elle décide de ce qu’elle fait de son courrier, et [chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23), son vrai courrier, qu’elle garde, et `PASS-C-091`, le courrier fictif écrit d’après le sien |
| Thomas | [chapitre 3](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch3), la page des horaires lue au lecteur d’écran, [chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch5), le délai qui ne passait pas à l’oral |
| Mei | Le Cahier commun 🏛️, aux chapitres [8](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch8), [9](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch9), [13](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch13), [15](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch15), [19](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch19), [20](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch20) et [22](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch22) |

Dans toutes les scènes, la personne concernée a le dernier mot : Odile tranche sur chaque brouillon, et la destinataire décide de ce qu’elle fait de son courrier. L’outil n’envoie rien.

Le tableau suivant fait foi pour le fil rouge. Si un chapitre dit autre chose, c’est le chapitre qui se corrige.

**Tableau :** Qui écrit quoi dans le fil rouge, et les faits qui font foi. Proposé par ce guide.

| Élément | Ce qui fait foi | Chapitres |
| --- | --- | --- |
| Les sessions de la vague | trois sessions, sur une même machine, le poste Linux de la permanence, celui qui a le bac à sable. La session de rédaction écrit les brouillons. La session de relecture, lancée par Inès, prépare la relecture d’Odile. La session de Bernard écrit le lexique, et Samia la désigne comme session principale pendant la vague | 19 et 22 |
| Les sous-agents de rédaction | au [chapitre 8](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch8), au premier jour de la vague, chaque sous-agent écrit le seul brouillon de son courrier et lance le contrôle. Au [chapitre 22](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch22), Bernard leur retire l’écriture : la fille de rédaction lit et propose le brouillon dans son rapport, et la session de rédaction écrit le fichier | 8, 19 et 22 |
| Le lexique, `lexique.md` | la session de Bernard est la seule à l’écrire. Une autre session propose une définition au tableau, et Odile relit la phrase avant qu’elle entre au lexique | 19 |
| Les postes | le portable d’Inès, sous Windows natif, sans bac à sable. Le poste de la permanence de l’association, sous Linux, qui a le bac à sable. Aucun poste du fil rouge n’est sous macOS | 2, 10 et 17 |
| La vague | soixante courriers, de `PASS-C-031` à `PASS-C-090`, arrivés en une semaine au [chapitre 8](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch8). Le dossier passe alors à quatre-vingt-dix courriers | 8, 9, 19 et 20 |
| `PASS-C-003` | un courrier fictif, créé pour ce guide, avec deux dates (le 1er janvier 2027 et le 15 décembre 2026), un délai (l’avis d’imposition à transmettre avant le 15 décembre 2026) et un montant (212,40 euros par mois). Ce n’est pas le courrier de Josiane | 1, 4, 5 et 14 |
| `PASS-C-091` | un courrier fictif, écrit par Inès d’après le vrai courrier de Josiane, avec son accord, avec d’autres dates, d’autres montants et aucun nom. Le vrai courrier n’entre pas dans l’outil : Inès le lit avec Josiane, sur papier, et Josiane le garde | 23 |
| `PASS-DEC-001` | la fiche de l’ordre de la vague, dans `decisions/`. La session de rédaction la pose, et Samia la tranche | 19 et 20 |
| Le contrôle de fidélité | Bernard écrit le contrôle des dates et des montants au [chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch5). Inès l’étend aux délais au [chapitre 14](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch14) | 5 et 14 |
| `PASS-B-017` | le brouillon qui ajoute un montant de 50 euros absent de `PASS-C-017`. Le contrôle le trouve au [chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch5), et il est corrigé au barreau ② du même chapitre : à la fin du [chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch5), le contrôle passe sur les trente brouillons | 5 et 14 |
| `PASS-B-047` | le brouillon qui a perdu « sous huitaine ». C’est Odile qui signale le défaut, en relisant | 16 |
| Les scripts | un seul nom chacun : `controle_dates.py` ([chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch5)), devenu `controle_fidelite.py` ([chapitre 14](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch14)), `dates.py` ([chapitre 11](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch11)), `garde_nir.py` et `controle_fin_de_tour.py` ([chapitre 7](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch7)), `garde_ecriture.py`, `ligne_etat.py` et `serveur_lexique.py` ([chapitre 18](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch18)), `lister_dates.py` ([chapitre 21](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch21)) | 5, 7, 11, 14, 18 et 21 |
| Les lots de la vague | quatre lots de quinze courriers, traités dans l’ordre. Le lot 1 va de `PASS-C-031` à `PASS-C-045`. Le lot 2 va de `PASS-C-046` à `PASS-C-060`. Le lot 3 va de `PASS-C-061` à `PASS-C-075`. Le lot 4 va de `PASS-C-076` à `PASS-C-090`. Les brouillons d’un lot portent les numéros de ses courriers. La frise de la vague, après ce tableau, dit quand chaque lot passe | 8, 15, 16, 19 et 20 |
| Les thèmes du Cahier commun | cinq thèmes au départ : les arbres et l’ombre, les jeux d’enfants, la circulation, le marché du samedi, les bancs et l’accès pour toutes et tous. Au [chapitre 15](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch15), la contribution `CAH-027` n’entre dans aucun : Mei ajoute un sixième thème, l’éclairage. À partir du [chapitre 15](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch15), le Cahier commun a donc six thèmes, une session ou un sous-agent par thème | 8, 15 et 19 |
| L’en-tête du brouillon | la ligne « Brouillon pour relecture » ouvre chaque brouillon : c’est sa première ligne, jamais la dernière. La garde d’écriture refuse un nouveau brouillon qui ne commence pas par elle | 2, 7, 12 et 18 |
| Les mots d’issue | les mots fixés d’avance ([section 14.10](https://gmag-dev.github.io/bien-demarrer-claude-code/#s14-10)), et eux seuls, nomment la fin d’une tâche. « Fini » n’en fait pas partie : il reste le mot de la recette | 14 et 15 |

La vague n’est pas racontée d’un seul tenant. La Partie I la traverse une première fois, aux chapitres [8](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch8) à [13](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch13). La Partie II la reprend en détail : le [chapitre 14](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch14) se passe la semaine d’avant, les chapitres [15](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch15) à [20](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch20) pendant, et les chapitres [21](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch21) à [23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23) après. La frise suivante fait foi pour cet ordre. Un chapitre qu’elle place pendant la vague ne dit pas « après la vague », et un numéro de courrier ou de brouillon reste dans son lot.

**Tableau :** La frise de la vague, jour par jour. Les dates sont inventées pour ce guide, elles suivent celles des chapitres [9](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch9) et [19](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch19).

| Quand | Lot | Courriers | Chapitres | Ce qui se passe |
| --- | --- | --- | --- | --- |
| avant la vague | aucun | `PASS-C-001` à `PASS-C-030` | 1 à 7, et 14 | avant : le circuit se construit (chapitres [1](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch1) à [7](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch7)). La semaine d’avant, Samia approuve les exigences du contrôle ([chapitre 14](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch14)) |
| lundi 2026-11-02, jour 1 | lot 1 | `PASS-C-031` à `PASS-C-045` | 8, 9 et 15 | pendant : Bernard lance la vague à 9 heures ([chapitre 9](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch9)), un sous-agent par courrier, du premier au dixième ([chapitre 8](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch8)), et la vérification du lot 1 par des sous-agents, où `PASS-C-039` manque au rapport ([chapitre 15](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch15)) |
| mercredi 2026-11-04, jour 3 | lot 2 | `PASS-C-046` à `PASS-C-060` | 9 et 16 | pendant : les brouillons du lot 2 imprimés pour Odile ([annexe E](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-e)), qui signale `PASS-B-047`, et le prémortem du lot 2, avant de le clore ([chapitre 16](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch16)). Le soir, la barre d’usage de Bernard est à 55 % ([chapitre 9](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch9)) |
| jeudi 2026-11-05, jour 4 | lot 3 | `PASS-C-061` à `PASS-C-075` | 12 et 19 | pendant : l’état de la vague pour la réunion du jeudi ([chapitre 12](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch12)), le message « lot 3 prêt pour relecture » au tableau, et la question de l’ordre du lot 4 posée dans le dossier des décisions ([chapitre 19](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch19)) |
| samedi 2026-11-07 | aucun | aucun nouveau | 20 | pendant : Samia tranche `PASS-DEC-001`, l’ordre des types de courriers du lot 4 |
| mardi 2026-11-10, et la nuit qui suit | lot 4 | `PASS-C-076` à `PASS-C-090` | 19 et 20 | pendant : Bernard lit l’état du forfait avant le lot 4 ([chapitre 20](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch20)), puis la nuit de rédaction rédige les quinze brouillons du lot 4 ([chapitre 19](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch19)) |
| de jour en jour, du lot 1 au lot 4 | tous | `PASS-C-031` à `PASS-C-090` | 10, 11, 13, 17 et 18 | pendant, sans jour fixé : les courriers renommés et le courrier piégé ([chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch10)), les commits ([chapitre 11](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch11)), le délai au sens inversé de `PASS-C-021`, un courrier d’avant la vague, relu pendant ([chapitre 13](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch13)), les réglages en couches ([chapitre 17](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch17)), la garde, la ligne d’état et la tâche du matin ([chapitre 18](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch18)) |
| à partir du mercredi 2026-11-11 | aucun | les quatre-vingt-dix courriers traités | 21, 22 et 23 | après : le skill versionné et sa suite de cas ([chapitre 21](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch21)), l’architecture qui n’a servi que pendant la vague ([chapitre 22](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch22)), le lot de dix courriers fictifs et le courrier de Josiane ([chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23)) |

Le retour d’expérience d’un lot se tient après ce lot, et celui de la vague après la vague : un chapitre que la frise place pendant la vague peut l’annoncer, pas le raconter comme fait.
