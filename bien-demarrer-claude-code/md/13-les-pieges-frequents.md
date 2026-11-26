> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.3.0 : « 13. Les pièges fréquents ».
>
> - Précédent : [12. Diagnostiquer, rendre lisible, reformuler](https://gmag-dev.github.io/bien-demarrer-claude-code/md/12-diagnostiquer-rendre-lisible-reformuler.md)
> - Suivant : [14. Le modèle propose, l’oracle vérifie, la personne tranche (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/14-le-modele-propose-l-oracle-verifie-la-personne-tranche-1.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-ch13>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## 13. Les pièges fréquents

> **🪪 Ce chapitre**
>
> **Pour qui** : toute personne qui sort d’une session décevante et s’apprête à réessayer, ou qui suit des conseils lus en ligne.
>
> **Sur quel poste** : n’importe lequel, avec Claude Code installé pour le barreau ③. Le reste se lit et s’exerce sans installation.
>
> **Ce que vous apprenez** : diagnostiquer une session décevante par sa cause, avant de réessayer.
>
> **Deux chemins** : si vous débutez, lisez tout le chapitre et faites les trois barreaux : comptez 20 à 40 minutes pour l’exercice. Si vous répondez juste à la question ci-dessous, lisez les encadrés « Quand la règle cède » et faites le barreau ③.
>
> **Le fil rouge** 🌉 Passerelle : un brouillon change le sens d’un délai, et le contrôle l’a laissé passer. Odile le voit à la relecture, et Bernard cherche ce que le contrôle aurait dû voir. 🏛️ Le Cahier commun : Mei constate que la synthèse donne trop de place aux contributions les plus longues, et cherche ce qui aurait dû le mesurer.
>
> **Où en est Passerelle** : en arrivant, les bénévoles ont un [prompt](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-prompt) de réalisation réutilisable ([section 4.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s4-7)). Pour Le Cahier commun, un sous-agent par thème a lu les contributions, et le niveau d’effort de la synthèse est choisi (chapitres [8](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch8) et [9](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch9)). À la fin du chapitre, le défaut de Passerelle est classé, sa parade appliquée, et la tâche relancée dans une session neuve. La synthèse du Cahier commun mesure la place des contributions longues avant de revenir aux habitants.

Après une session décevante, on est tenté de réessayer tout de suite, avec la même demande un peu reformulée. Le plus souvent, cela redonne le même échec. Ce chapitre, le dernier de la Partie I, aide à nommer ce qui a manqué avant de relancer, puis rassemble les conseils hérités d’anciens modèles qu’il vaut mieux abandonner, et les pièges d’un outil qui change vite.

> **⏭️ Vous pouvez sauter ce chapitre si…**
>
> Claude a annoncé « c’est fait » pour une migration de base de données, et le lendemain une colonne manque dans la base de test. Sans code, la variante : Claude a annoncé « c’est fait » pour la mise à jour d’un tableau de suivi, et le lendemain une colonne y manque. Avant de relancer la tâche, que nommez-vous ? Écrivez votre réponse avant d’ouvrir la réponse attendue.
>
> **Voir la réponse attendue**
>
> La cause, parmi les quatre du [tableau 13.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#tab-13-1) : ici, Claude n’avait aucun moyen de vérifier. La parade est un contrôle qui réussit ou échoue, et sa sortie ([chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch5)), par exemple une requête qui liste les colonnes attendues, ou, pour le tableau, la liste des colonnes attendues comparée à son en-tête. Puis la même tâche se relance dans une session neuve, avec ce que vous avez appris.
>
> Vous avez ces éléments ? Lisez seulement les encadrés « Quand la règle cède » et faites le barreau ③ de l’exercice. Sinon, lisez le chapitre dans l’ordre : il est écrit pour vous.

### 13.1 Quatre symptômes, quatre causes

Avant de réessayer, nommez la cause. Quand une session ne se passe pas comme prévu, la cause est le plus souvent l’une des quatre du [tableau 13.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#tab-13-1) [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices). Chacune a sa parade, et une parade appliquée à la mauvaise cause ne change rien.

**Tableau 13.1 :** Quatre symptômes, leur cause et leur parade, d’après [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices).

| Symptôme | Cause | Parade |
| --- | --- | --- |
| Claude a construit autre chose que prévu, ou redécouvre le même fait à chaque session | il manque une information absente du [dépôt](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-depot) | un prompt précis, `CLAUDE.md`, l’entretien de besoin ([chapitre 2](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch2), sections [4.6](https://gmag-dev.github.io/bien-demarrer-claude-code/#s4-6) et [4.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s4-7)) |
| Claude a dit « fait » et ce ne l’était pas | il n’avait aucun moyen de vérifier | un contrôle qui réussit ou échoue, et sa sortie ([chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch5)) |
| Claude a fait ce qui ne doit jamais arriver, ou sauté une étape obligatoire | une consigne seule ne le garantit pas | un hook ou une règle `deny`, avec leurs limites (chapitres [7](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch7) et [10](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch10)) |
| Le résultat est bon mais a coûté trop de temps, de jetons ou de demandes | un réglage par défaut ne convient pas à la tâche | le mode de permission, l’effort, le modèle, `/usage` (chapitres [2](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch2), [4](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch4) et [9](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch9)) |

Chez Passerelle, le courrier `PASS-C-021` dit « transmettez votre avis d’imposition avant le 15 décembre 2026 ». Son brouillon dit « à partir du 15 décembre 2026 ». Le contrôle est passé : la date y est, à l’identique. Odile a arrêté le brouillon à la relecture : avec « à partir du », une usagère attendrait le 15 décembre pour agir, et perdrait ses droits. Bernard classe le défaut sur la deuxième ligne : rien ne permettait à Claude de vérifier le sens du délai. La parade : le contrôle vérifie désormais le petit mot devant chaque date, « avant », « à compter du », « jusqu’au ». Bernard ajoute d’abord un test qui reproduit `PASS-C-021` et échoue, puis corrige le contrôle, et le test passe. Inès relance la rédaction du brouillon dans une session neuve, avec le prompt de réalisation de la [section 4.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s4-7). Le nouveau brouillon garde « avant le 15 décembre 2026 », et Odile l’accepte.

🏛️ Au même moment, Mei relit la synthèse du Cahier commun sur la place des Tilleuls. Sur les 40 contributions de l’exercice court, trois sont très longues, et ces trois-là portent 40 % des citations de la synthèse. Personne ne l’avait mesuré : c’est un manque de vérification. Le prompt ne disait pas non plus que chaque contribution compte autant : c’est aussi un manque d’information. Mei traite d’abord la vérification : un compte, pour chaque phrase de la synthèse, des contributions qu’elle cite, et la part des citations qui va aux contributions les plus longues. Dans l’exercice complet, le même compte porte sur les 400 contributions. La synthèse rééquilibrée revient ensuite aux habitantes et aux habitants, avec la mesure, avant que le conseil municipal décide.

Dix pièges reviennent souvent, chacun avec un symptôme qui le signale et un geste qui le règle.

**Tableau 13.2 :** Dix pièges fréquents, leur symptôme et le geste qui les règle. Proposé par ce guide, avec les sources de chaque ligne.

| Piège | Symptôme | Le geste | Où lire |
| --- | --- | --- | --- |
| les demandes d’autorisation répétées | Claude demande dix fois la même commande sûre | une règle `allow` précise pour cette commande, et elle seule | sections [2.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-3) et [10.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-1) |
| un serveur [MCP](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-mcp) qui ne revient pas après un redémarrage | ses outils manquent, sans message clair | `/mcp`, pour voir l’état du serveur et le reconnecter [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mcp) | [section 18.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s18-7) |
| un contexte saturé | Claude oublie une consigne du début, ou tourne en rond | `/context`, puis `/clear` ou `/compact` selon ce qui doit survivre | [chapitre 3](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch3) |
| un forfait dépassé sans le voir | la session s’arrête sur une limite d’usage | `/usage`, lu contre le rythme de la semaine | [chapitre 9](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch9) |
| la mémoire du poste saturée | le poste ralentit quand plusieurs sessions tournent | moins de sessions à la fois, et fermer celles qui ne servent plus | [section 8.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s8-3) |
| une correction acceptée sans diagnostic | le défaut revient, ailleurs ou sous une autre forme | le diagnostic d’abord, sans modification | [chapitre 12](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch12) |
| des tests changés pour passer | un test ancien change avec le code, ou le code renvoie en dur la valeur que le test attend | dire que les tests vérifient et ne définissent pas la solution, et qu’un test faux se signale [\[46\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-prompting-best-practices). Relire à part le diff des tests | sections [5.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s5-2) et [11.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s11-1) |
| une version que Claude ne connaît pas | une option disparue, une nouveauté ignorée | Claude ne sait de lui-même que ce qui précède la date de coupure de son modèle [\[89\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-models-overview) : donnez-lui la page ou le fichier de référence | [section 3.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s3-3) |
| l’impression d’aller plus vite | une session fluide, des défauts trouvés après coup | mesurer le temps et les défauts, pas l’impression : en 2025, seize développeurs expérimentés, sur leurs propres dépôts, se croyaient plus rapides avec l’IA et l’étaient moins [\[90\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-metr-uplift-2025) ; début 2026, METR juge probable que le gain soit devenu plus favorable, sans pouvoir le mesurer de façon fiable [\[91\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-metr-uplift-2026) | [chapitre 9](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch9), barreau ③ |
| une règle que vous n’avez pas écrite | une ligne `Co-Authored-By` que vous n’avez pas demandée | Claude Code ajoute ses propres textes à la conversation, et `/context` les montre [\[13\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-how-claude-code-works). Le réglage `attribution.commit` change ou masque cette ligne [\[32\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings-reference) | [section 3.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s3-1) |

> **🔀 Quand la règle cède**
>
> - Deux causes peuvent se mêler, comme dans la synthèse du Cahier commun.
> - Ce qui tient : traitez d’abord la vérification. C’est elle qui dira si l’information manquait aussi.
> - Pour aller plus loin : [section 16.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s16-4).

### 13.2 Les conseils à abandonner

Méfiez-vous des conseils écrits pour d’anciens modèles. Beaucoup de tutoriels datent de modèles qui avaient d’autres faiblesses, et la documentation actuelle liste les conseils devenus inutiles ([tableau 13.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#tab-13-3)) [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices). Pour nettoyer vos propres fichiers, `/doctor prompt-audit` signale les consignes écrites pour d’anciens modèles, celles qui pointent vers des fichiers disparus et celles qui se contredisent [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices).

**Tableau 13.3 :** Les conseils devenus inutiles, d’après [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices).

| Ancien conseil | Pourquoi il est dépassé |
| --- | --- |
| gérer agressivement la fenêtre de contexte | la compaction est automatique, et `/clear` sert au coût ([chapitre 3](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch3)) |
| ajouter IMPORTANT ou des majuscules | l’insistance fait appliquer la règle trop largement ([section 4.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s4-7)) |
| utiliser des sous-agents pour protéger le contexte | manquer de place est rare ([section 3.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s3-4)) |
| déléguer à un sous-agent pour une meilleure réponse | la même tâche déléguée n’en donne pas de meilleure : seul le regard neuf d’un relecteur apporte du nouveau ([section 5.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s5-4)) |
| « réfléchis bien », « sois minutieux » | l’effort règle la réflexion ([section 4.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s4-4)) |
| « continue jusqu’au bout, ne sois pas paresseux » | les modèles actuels poursuivent la tâche : donnez un contrôle à réussir |
| décrire l’architecture et l’arborescence dans `CLAUDE.md` | Claude lit le dépôt lui-même |

Le `CLAUDE.md` de Passerelle avait gardé, d’un tutoriel lu au début, une ligne « IMPORTANT : NE JAMAIS OUBLIER LES DATES ». `/doctor prompt-audit` l’a signalée. Inès l’a retirée : le contrôle des dates, lui, ne l’oublie pas.

> **🔀 Quand la règle cède**
>
> - `/doctor prompt-audit` signale des consignes, il ne décide pas : une consigne signalée se garde si un essai montre qu’elle sert encore.
> - Ce qui tient : une consigne vit tant qu’un cas réel la justifie.
> - Pour aller plus loin : [section 21.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-7).

### 13.3 Un outil qui change vite

Avant de suivre un conseil trouvé en ligne, vérifiez qu’il vaut pour votre version. Les comportements de Claude Code changent avec les mises à jour. `claude --version` donne votre version [\[40\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-costs), et le journal des versions officiel liste chaque changement [\[1\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-changelog).

Claude sait aussi répondre aux questions sur ses propres fonctions en consultant la documentation actuelle, et `/powerup` propose des leçons interactives [\[43\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-common-workflows) :

```text
Comment Claude Code gère-t-il les permissions, dans ma version ?
Qu'est-ce qui a changé dans les hooks depuis le mois dernier ?
```

Bernard avait lu, sur un forum, une option de réglage qui n’existait plus. Il a lancé `claude --version`, puis demandé à Claude ce que disait la documentation actuelle : l’option avait été remplacée. Il a noté la version et la date dans le `CLAUDE.md` de Passerelle, à côté du réglage.

> **🔀 Quand la règle cède**
>
> - Le journal des versions dit ce qui change, pas ce que cela casse chez vous.
> - Ce qui tient : une version qui change un comportement que vous utilisez se reteste sur vos propres cas.
> - Pour aller plus loin : [section 21.11](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-11).

> **📌 À retenir**
>
> - Une session décevante a une cause : une information manque, la vérification manque, une règle n’est pas imposée, ou un réglage ne convient pas. Nommez-la avant de réessayer.
> - Une parade se prouve : la même tâche, relancée dans une session neuve, réussit sur le critère où elle avait échoué.
> - Méfiez-vous des anciens conseils, et faites auditer vos consignes par `/doctor prompt-audit`.
> - Vérifiez votre version, et lisez le journal des versions.

> **✏️ Exercice en trois barreaux**
>
> **Compétence visée** : diagnostiquer une session décevante par sa cause, avant de réessayer. Comptez 20 à 40 minutes.
>
> **① Exemple travaillé.** Un matin pressé, Inès a demandé « Écris le brouillon de PASS-C-005 pour Odile », sans reprendre le prompt de réalisation de la [section 4.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s4-7). Claude a rendu un fichier Markdown avec un tableau et du gras. Odile relit sur papier, et Thomas avec un lecteur d’écran : le tableau s’imprime mal et se lit mal à l’oral. Inès classe la session sur la première ligne du [tableau 13.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#tab-13-1) : une information manquait, le format attendu, que le prompt de la [section 4.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s4-7) porte depuis la contrainte de Thomas. La parade : elle reprend ce prompt, y ajoute « texte simple, sans mise en forme, prêt à imprimer », pour la relecture d’Odile sur papier, et écrit ce format dans `CLAUDE.md`, pour qu’une demande courte le reçoive aussi. Puis elle relance la tâche dans une session neuve. **Pourquoi ?** Pourquoi une session neuve, plutôt qu’une correction de plus dans la même conversation ?
>
> **② À compléter.** Dans une session de Bernard, Claude a supprimé les brouillons de la veille pour « faire de la place », alors que le `CLAUDE.md` dit « Ne supprime jamais un brouillon relu. » Nommez la ligne du [tableau 13.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#tab-13-1), puis écrivez la parade.
>
> **③ Sur votre projet.** Reprenez votre dernière session décevante. Diagnostiquez sa cause en la classant dans une ligne du [tableau 13.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#tab-13-1), appliquez la parade, puis réessayez la même tâche dans une session neuve, en mode Manual :
>
> ```bash
> claude --permission-mode manual
> ```
>
> **Sans code** : les barreaux ① et ② se font en lisant. Le barreau ③ vaut pour toute session, même sur un document.
>
> **Critère de réussite** : la ligne du tableau nommée, la parade écrite, et une différence observée sur le même critère que l’échec, dans la session neuve. Par le chemin sans code, la même preuve sur un document : la ligne du tableau, la parade, et le critère où le premier document échouait, rempli par le second.
>
> **Voir le corrigé expliqué (après votre essai)**
>
> **①** L’essai raté reste dans la conversation, et il tire la réponse suivante vers lui. Une session neuve repart du seul prompt corrigé. C’est le conseil de la [section 3.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s3-2). Le nouveau brouillon, en texte simple, part ensuite à Odile, qui le relit et tranche, et Thomas l’écoute pour dire s’il passe à l’oral.
>
> **②** La troisième ligne : une consigne seule ne garantit pas ce qui ne doit jamais arriver. La parade est une règle imposée, par exemple une règle `deny` sur la suppression dans `brouillons/`, avec sa limite : une autre forme de la commande y échappe ([section 10.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-1)). Erreur fréquente : réécrire la consigne en majuscules, ce qui ne la rend pas plus sûre ([section 13.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s13-2)).
>
> **③** Votre session neuve doit réussir sur le critère précis où la première avait échoué : une colonne présente, un format respecté, une étape faite. Si elle échoue au même endroit, la cause était une autre ligne du tableau : reprenez le classement.

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/#toc)

Partie II

Du jalon Confirmé au jalon Expert

Chapitres [14](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch14) à [23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23)

Ce guide est gratuit, en entier. Le soutenir est libre et facultatif.

Votre soutien aide son autrice à préparer d’autres publications et à mener des projets humanistes.

Le soutien passe par Tipeee, un site tiers : le lien s’ouvre dans un nouvel onglet.

[Soutenir ce guide sur Tipeee](https://fr.tipeee.com/gmag-dev)

![Illustration : la personne en long manteau violet et son petit compagnon de cristal cyan, devant trois postes alignés : un hologramme de proposition, un grand cristal qui le scanne, et une porte où la personne lève la main pour trancher.](https://gmag-dev.github.io/bien-demarrer-claude-code/images/87a6bddbba2f.avif)
