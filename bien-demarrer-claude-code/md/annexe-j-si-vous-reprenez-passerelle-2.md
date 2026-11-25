> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.2.0 : « Annexe J. Si vous reprenez Passerelle », partie 2 sur 2.
>
> - Précédent : [Annexe J. Si vous reprenez Passerelle (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-j-si-vous-reprenez-passerelle-1.md)
> - Suivant : [Annexe K. Listes des figures et des tableaux (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-k-listes-des-figures-et-des-tableaux-1.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-s-j-4>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

### J.4 Le corpus fictif

**Les courriers.** Le dossier compte dix courriers au [chapitre 1](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch1), `PASS-C-001` à `PASS-C-010`, puis trente au [chapitre 3](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch3), jusqu’à `PASS-C-030`. Au [chapitre 8](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch8) arrive la vague, en une semaine, après un changement de règle du Bureau des aides de Rivelune : soixante courriers arrivent, de `PASS-C-031` à `PASS-C-090`, et le dossier passe à quatre-vingt-dix courriers. Ils sont de quelques types, comme l’aide au logement, l’avis de réexamen ou la demande de pièce ([chapitre 14](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch14)). Deux courriers sont à part : `PASS-C-099`, le courrier piégé du [chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch10), et `PASS-C-091`, écrit au [chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23) d’après le vrai courrier de Josiane, avec d’autres dates, d’autres montants et aucun nom, et avec son accord.

Chaque courrier suit la même forme, celle de `PASS-C-003` au [chapitre 1](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch1) :

```text
Courrier fictif PASS-C-<numéro>, créé pour ce guide.
<Bureau des aides de Rivelune, ou Service logement de la mairie de Rivelune> (organisme fictif)
Objet : <l'objet>

Madame, ou Monsieur,
<le corps : au moins une date, souvent un montant, parfois une pièce à fournir et un délai>
```

**Tableau :** Les dix premiers courriers de Passerelle, tous fictifs.

| Courrier | Émetteur (fictif) | Objet | Dates | Montants |
| --- | --- | --- | --- | --- |
| `PASS-C-001` | Service logement de la mairie de Rivelune | rendez-vous pour une demande de logement | rendez-vous le 9 décembre 2026 à 10 h | aucun |
| `PASS-C-002` | Bureau des aides de Rivelune | trop-perçu à rembourser | avant le 31 janvier 2027 | 86,00 euros |
| `PASS-C-003` | Bureau des aides de Rivelune | réexamen de l’aide au logement | à compter du 1er janvier 2027, réponse avant le 15 décembre 2026 | 212,40 euros par mois |
| `PASS-C-004` | Service logement de la mairie de Rivelune | révision du loyer d’un logement municipal | à compter du 1er février 2027 | 498,70 euros par mois |
| `PASS-C-005` | Bureau des aides de Rivelune | pièce à fournir : une attestation de domicile | avant le 30 novembre 2026, sans quoi le dossier est mis en attente | aucun |
| `PASS-C-006` | Service logement de la mairie de Rivelune | visite du logement | le 3 décembre 2026, entre 9 h et 12 h | aucun |
| `PASS-C-007` | Bureau des aides de Rivelune | aide exceptionnelle de chauffage | versée le 20 décembre 2026 | 150,00 euros |
| `PASS-C-008` | Bureau des aides de Rivelune | fin de droits | aide arrêtée au 31 décembre 2026, recours possible sous deux mois | aucun |
| `PASS-C-009` | Service logement de la mairie de Rivelune | restitution du dépôt de garantie | versée au plus tard le 15 janvier 2027 | 312,00 euros |
| `PASS-C-010` | Bureau des aides de Rivelune | échéancier de remboursement | les 5 janvier, 5 février et 5 mars 2027 | trois versements de 40,00 euros |

**Tableau :** Les trois premiers courriers de la vague, que l’exercice de passage du [chapitre 15](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch15) vérifie, tous fictifs.

| Courrier | Émetteur (fictif) | Objet | Dates | Montants |
| --- | --- | --- | --- | --- |
| `PASS-C-031` | Bureau des aides de Rivelune | réexamen de l’aide au logement après le changement de règle | à compter du 1er février 2027, réponse avant le 20 novembre 2026 | 187,60 euros par mois |
| `PASS-C-032` | Bureau des aides de Rivelune | pièce à fournir : le dernier avis d’imposition | avant le 27 novembre 2026, sans quoi le réexamen est suspendu | aucun |
| `PASS-C-033` | Service logement de la mairie de Rivelune | rendez-vous pour le réexamen d’un dossier | le 1er décembre 2026 à 14 h | aucun |

**Les autres identifiants.** Le brouillon d’un courrier porte son numéro : `PASS-B-003` est le brouillon de `PASS-C-003`. Un numéro qui ressemblerait à un vrai s’écrit visiblement faux, comme `PASS-NIR-0000-0000` pour un numéro de sécurité sociale. Le guide emploie aussi `PASS-DEM-` pour une demande, `PASS-EX-` pour une exigence et `PASS-DEC-` pour une décision. Les chapitres emploient encore `PASS-ADR-` pour une décision d’architecture ([chapitre 21](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch21)), et `PASS-JETON-0000-0000` pour le faux jeton qui doit faire échouer le scanner de secrets ([chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23)).

**Tableau :** Les fichiers et les courriers que les chapitres nomment, et le chapitre qui les introduit.

| Nom | Ce que c’est | Chapitre |
| --- | --- | --- |
| `courriers/`, `brouillons/` | les courriers fictifs et leurs brouillons, sous le même numéro | 1 et 2 |
| `notes/passation.md` | la note de passation | 3 |
| `plans/circuit-courrier.md` | le plan du circuit, corrigé et approuvé | 4 |
| `controle_dates.py`, `tests/` | le contrôle des dates et des montants, et ses tests | 5 |
| `.claude/skills/brouillon-pour-relecture/`, `.claude/hooks/garde_nir.py`, `.claude/hooks/controle_fin_de_tour.py` | le skill et les deux hooks | 7 |
| `pieces/` | le dossier des pièces, hors de git | 11 et 17 |
| `dates.py`, `extraire_dates` | l’extraction des dates, sortie du contrôle | 11 |
| `controle_fidelite.py` | le contrôle étendu aux délais et aux références | 14 |
| `decisions/0004-delais-relatifs.md`, `docs/definition-du-fini.md` | la décision sur les délais relatifs, la définition du fini | 15 |
| `docs/permissions.md` | la raison de chaque règle de permission | 17 |
| `garde_ecriture.py`, `ligne_etat.py`, `outils/serveur_lexique.py` | la garde d’écriture, la ligne d’état, le serveur du lexique | 18 |
| `decisions/` | le dossier des décisions | 20 |
| `scripts/lister_dates.py` | le script que le skill lance pour lister les dates d’un courrier | 21 |
| `PASS-C-003`, `PASS-C-014` | le courrier fictif du [chapitre 1](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch1), le délai écrit en chiffres | 1, 5 et 7 |
| `PASS-C-017`, `PASS-B-017` | un courrier fictif du lot de départ, et son brouillon, qui ajoute un montant de 50 euros absent du courrier, ce que le contrôle trouve ([section 5.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s5-3)) | 5 |
| `PASS-C-021`, `PASS-C-026`, `PASS-C-028` | un délai au sens inversé, un délai relatif, un montant en lettres | 13 et 14 |
| `PASS-C-039`, `PASS-B-047` | le courrier qui manque à un rapport, le brouillon qui a perdu « sous huitaine » | 15 et 16 |
| `PASS-C-031` à `PASS-C-045`, `PASS-C-046` à `PASS-C-060` | les lots 1 et 2 de la vague. Le [chapitre 15](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch15) raconte la vérification du lot 1, le jour 1, et son exercice fait vérifier les deux lots par deux sous-agents. Hors des trois premiers, décrits plus haut, leurs courriers se créent sur le modèle, comme le dit la [section J.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-j-2) : l’exercice se refait sur les vôtres, et son corrigé vaut pour tout contenu | 15 |
| `PASS-C-099`, `PASS-C-091` | le courrier piégé, gardé au [chapitre 11](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch11) comme courrier d’essai du skill, puis le courrier écrit d’après celui de Josiane | 10, 11 et 23 |

**Les contributions du Cahier commun.** Rivelune consulte ses habitantes et ses habitants sur le réaménagement de la place des Tilleuls, et 400 contributions arrivent, de `CAH-001` à `CAH-400`. L’exercice court porte sur les quarante premières, `CAH-001` à `CAH-040`, et l’exercice complet sur les 400. Chaque contribution porte son identifiant, sa date et son texte, court ou long. Le sujet reste la place des Tilleuls : ombre et arbres, jeux pour les enfants, bancs et accès pour les personnes à mobilité réduite, marché, éclairage, circulation.

**Tableau :** Trois contributions du Cahier commun, toutes fictives.

| Contribution | Date | Texte |
| --- | --- | --- |
| `CAH-001` | 2026-10-05 | « Plus d’ombre l’été, et des bancs avec un dossier. » |
| `CAH-002` | 2026-10-05 | « Le marché du samedi doit garder sa place. » |
| `CAH-003` | 2026-10-06 | « Je traverse la place chaque matin avec la poussette. Les pavés autour de la fontaine sont disjoints, et le passage le long du marché est trop étroit quand les étals sont montés. Un cheminement plat, de la rue des Saules à l’école, servirait aussi aux personnes en fauteuil et à celles qui marchent avec une canne. » |

La troisième est plus longue que les deux autres réunies. C’est ce que mesure le [chapitre 13](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch13) : une synthèse équitable cite, pour chaque phrase, les contributions qui la fondent, et ne laisse pas les plus longues prendre toute la place. Elle revient aux habitants avant que le conseil municipal décide.

**Ajouter une pièce au corpus.** Si vous créez vos propres courriers ou contributions, gardez les règles du fil rouge : un préfixe fictif dit tel, un émetteur inventé qui ne rappelle aucun organisme réel, aucune donnée d’une personne réelle, et la mention « créé pour ce guide » en tête.

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/#toc)
