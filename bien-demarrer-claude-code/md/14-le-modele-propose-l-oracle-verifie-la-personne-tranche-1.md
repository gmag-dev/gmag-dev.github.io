> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.4.2 : « 14. Le modèle propose, l’oracle vérifie, la personne tranche », partie 1 sur 2.
>
> - Précédent : [13. Les pièges fréquents](https://gmag-dev.github.io/bien-demarrer-claude-code/md/13-les-pieges-frequents.md)
> - Suivant : [14. Le modèle propose, l’oracle vérifie, la personne tranche (partie 2 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/14-le-modele-propose-l-oracle-verifie-la-personne-tranche-2.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#h-ch14>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## 14. Le modèle propose, l’oracle vérifie, la personne tranche

> **🪪 Ce chapitre**
>
> **Pour qui** : la personne confirmée qui fait déjà vérifier le travail de Claude par un test ([chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#ch5)), et qui veut organiser tout un projet autour de cette vérification.
>
> **Sur quel poste** : n’importe lequel. Les pratiques de ce chapitre ne dépendent ni de l’offre ni du système. Les exemples de code sont en Python, et l’exercice a une variante sans code. État décrit : la documentation de Claude Code 2.1.319 [\[1\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-changelog), sauf le passage marqué 🆕, écrit à la date de son badge.
>
> **Ce que vous apprenez** : construire la boucle où le modèle propose, un [oracle](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-oracle) vérifie et une personne tranche, écrire des exigences qu’un programme peut lire, et nommer l’issue de chaque tâche.
>
> **Deux chemins** : si un encadré « Quand la règle cède » vous a envoyée ici, lisez la section qu’il cite, puis revenez à votre chapitre. Sinon, lisez le chapitre dans l’ordre, puis faites l’exercice.
>
> **Le fil rouge** 🌉 Passerelle : le cœur de l’outil. Claude propose un brouillon, le [contrôle de fidélité](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-controle-de-fidelite), qu’Inès étend aux délais, vérifie que chaque date, chaque montant, chaque délai et chaque référence du courrier s’y retrouvent et que rien ne s’y ajoute, puis Odile relit et tranche. Samia approuve les exigences avant la vague de courriers, et Bernard les fait contester par un modèle d’une autre famille.
>
> **Où en est Passerelle** : en arrivant, l’outil a son skill « brouillon pour relecture » et son contrôle des dates et des montants ([chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#ch5)), et le délai au sens inversé du [chapitre 13](https://gmag-dev.github.io/bien-demarrer-claude-code/13-les-pieges-frequents.html#ch13) est paré. À la fin du chapitre, les exigences du contrôle sont approuvées, le contrôle couvre les délais et les références, et chaque tâche finit par une issue nommée.

Un modèle de langage produit vite un plan, un diff ou un brouillon, mais il ne sait pas prouver que ce qu’il produit est juste. Chez Passerelle, un brouillon clair qui a perdu un délai est pire que pas de brouillon du tout, parce qu’il inspire confiance. Ce chapitre organise le travail autour de cette limite : un programme vérifie ce qui se vérifie, une personne décide du reste, et l’état d’un travail long vit dans des fichiers plutôt que dans la conversation.

### 14.1 Workflows, agents et vérité du terrain

Cherchez d’abord la solution la plus simple. Un **workflow** fait passer le modèle et les outils par des chemins de code fixés d’avance. Un **agent** dirige lui-même son processus et l’usage de ses outils [\[92\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-building-effective-agents).

Un agent doit tirer de son environnement, à chaque étape, une « vérité du terrain » : le résultat d’un appel d’outil, l’exécution du code. C’est elle, et non son propre jugement, qui lui dit s’il progresse. On lui fixe aussi des conditions d’arrêt, comme un nombre maximal d’itérations [\[92\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-building-effective-agents). En mode non interactif, `claude -p`, ce sont `--max-turns` et `--max-budget-usd` [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-best-practices). Aucune boîte de confiance ne s’y affiche, et les hooks du dépôt s’exécutent ([section 17.1](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#s17-1)) : réservez ce mode à un dépôt inspecté.

Le circuit de Passerelle est un workflow : lire le courrier, écrire le brouillon, lancer le contrôle, remettre le brouillon à Odile. Claude n’agit en agent qu’à l’étape du brouillon, et sa vérité du terrain y est la sortie du contrôle de fidélité, pas sa phrase « j’ai gardé toutes les dates ». C’est la réponse à la limite de la [section 1.2](https://gmag-dev.github.io/bien-demarrer-claude-code/1-ce-qu-est-claude-code.html#s1-2) : le jugement « fini » de Claude ne vaut que s’il s’appuie sur un contrôle qui peut échouer.

### 14.2 Le motif à trois rôles

Faites vérifier par un programme tout ce qui se vérifie, et gardez pour une personne ce qui engage. Kambhampati et ses coauteurs soutiennent qu’un modèle autorégressif ne peut, seul, ni planifier ni vérifier son travail, et le couplent à des vérificateurs externes, dans des cadres « LLM-Modulo » [\[93\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-llm-modulo). Ce guide en tire un motif à trois rôles :

- **le modèle propose** : un plan, un diff, une spécification, un brouillon,
- **l’oracle vérifie** : un programme qui répond oui ou non, sans jugement, et qui donne toujours la même réponse à la même entrée. Tests, typage, validation d’un schéma, recherche de secrets, contrôle de fidélité. Un échec renvoie au modèle, avec la sortie de l’oracle,
- **la personne tranche** : ce que l’oracle ne peut pas dire (est-ce le bon besoin, le texte se comprend-il ?) et ce qui ne se reprend pas (un envoi, une suppression, une publication).

Pourquoi trois rôles ? Un modèle qui se vérifie lui-même tire l’erreur et sa vérification de la même source. L’oracle apporte une réponse indépendante, la personne l’intention.

#### Le cœur de Passerelle

Passerelle applique le motif à chaque courrier ([figure 14.1](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#fig-14-1)). Le contrôle de fidélité est le contrôle des dates et des montants de Bernard (chapitres [5](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#ch5) et [13](https://gmag-dev.github.io/bien-demarrer-claude-code/13-les-pieges-frequents.html#ch13)), qu’Inès a étendu aux délais et aux références, renommé `controle_fidelite.py`. Renommer un script fait chercher tous ses appelants : le même jour, Bernard remplace l’ancien nom dans le script du hook `Stop`, `.claude/hooks/controle_fin_de_tour.py`, dans la règle `ask` du [chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#ch10), qui devient `Bash(py*controle_fidelite.py*)`, dans la recette `dates` du `justfile` ([annexe E](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-e-gabarits.html#ann-e)) et dans la ligne du `README.md` qui dit comment lancer le contrôle ([chapitre 11](https://gmag-dev.github.io/bien-demarrer-claude-code/11-commits-et-collaboration.html#ch11)). Sans cela, le hook ne trouverait plus le contrôle, sortirait en 2 et bloquerait chaque fin de tour ([section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/7-ecrire-ses-premieres-extensions.html#s7-2)), et la règle ne demanderait plus rien. Chaque poste relit ces changements avant sa session suivante, comme le veut la règle de la [section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/7-ecrire-ses-premieres-extensions.html#s7-2) : le nouveau contrôle, et `dates.py`, qu’il importe, sont lancés sans demande par le hook. Le [tableau 17.3](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#tab-17-3), en [section 17.2](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#s17-2), dit comment se protège chaque fichier lancé. Le contrôle sort en 0 ou en 1, et liste ce qu’il a trouvé, ici sur le brouillon corrigé du courrier du [chapitre 1](https://gmag-dev.github.io/bien-demarrer-claude-code/1-ce-qu-est-claude-code.html#ch1) :

```text
python -I controle_fidelite.py PASS-C-003
OK     PASS-B-003 : 2 dates, 1 délai, 1 montant, 1 référence retrouvés, aucun ajout
1 brouillon contrôlé, 0 en échec (code de sortie 0)
```

Pourquoi un contrôle dédié ? Les règles du [FALC](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-falc) demandent d’éviter les grands nombres [\[3\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-inclusion-europe-information-for-all), mais dans un courrier administratif une date limite ou un montant est le cœur du message : le brouillon les garde tels quels, et le contrôle le vérifie. Il vérifie aussi la phrase finale, qui renvoie au courrier original par sa référence : ce guide applique ainsi le principe, posé par le canton du Valais, que la version simplifiée ne remplace pas l’original [\[5\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-valais-langage-facile). Comme la liste de vérification de l’Unapei [\[94\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-unapei-liste-verification), il ne remplace pas la relecture par une [personne concernée](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-personne-concernee) (« Apprendre avec ce guide ») : il dit qu’aucune date ne s’est perdue, pas que le brouillon se comprend.

*Dessin : Le motif à trois rôles, appliqué à un courrier de Passerelle. Schéma : la description suit.*

**Figure 14.1 :** Le motif à trois rôles, appliqué à un courrier de Passerelle. En bleu ce que fait la machine, en rouge l’échec de l’oracle, en ambre le retour demandé par la relectrice, en vert ce qui tient, en tirets le geste d’une personne. Chaque retour vers le modèle porte sa raison. Motif proposé par ce guide, d’après [\[93\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-llm-modulo) et [\[92\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-building-effective-agents).

Le même flux, en texte :

1. **Claude propose** le brouillon `PASS-B-003` à partir du courrier `PASS-C-003`, avec le [skill](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-skill) « brouillon pour relecture » du [chapitre 7](https://gmag-dev.github.io/bien-demarrer-claude-code/7-ecrire-ses-premieres-extensions.html#ch7).
2. **Le contrôle de fidélité vérifie** que chaque date, chaque montant, chaque délai et la référence du courrier se retrouvent dans le brouillon, et que rien ne s’y ajoute. S’il échoue, sa sortie revient au modèle, qui propose de nouveau.
3. **Odile relit et tranche** : elle seule dit si le brouillon se comprend. Elle répond « d’accord » ou « à reprendre », avec sa raison écrite, qui revient au modèle.
4. Si elle est d’accord, le brouillon revient à la permanence, et la destinataire décide de ce qu’elle fait de son courrier. L’outil n’envoie rien.

Un oracle ne vérifie que ce qu’on lui a dit de chercher. Un délai écrit en toutes lettres que le script ne reconnaît pas passe sans bruit : c’est le cas que traite la [section 16.4](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#s16-4). Son voisin, un montant écrit en lettres, est celui de la [section 14.11](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-11). Pour faire de l’oracle une porte de commit dont le refus revient au modèle, voyez la [section 19.6](https://gmag-dev.github.io/bien-demarrer-claude-code/19-plusieurs-sessions-en-parallele.html#s19-6).

### 14.3 Trois sortes d’évaluateurs

Un travail peut être évalué par un programme, par un autre modèle ou par une personne [\[95\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-demystifying-evals). Ce guide donne à chacun un rôle dans le motif.

**Tableau 14.1 :** Les trois sortes d’évaluateurs, d’après [\[95\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-demystifying-evals). Les deux dernières colonnes sont une proposition de ce guide.

| Évaluateur | Forces | Faiblesses | Rôle dans le motif | Chez Passerelle 🌉 |
| --- | --- | --- | --- | --- |
| À base de code | rapide, peu coûteux, objectif, reproductible, facile à déboguer | rigide devant une variante valide, peu nuancé | l’oracle : il tranche le vérifiable | le contrôle de fidélité |
| À base de modèle | souple, nuancé, à l’aise avec le texte libre | non déterministe, plus coûteux, à calibrer sur des jugements humains | une relecture d’appoint, jamais une porte à lui seul | un Claude neuf qui signale les phrases difficiles à suivre |
| Humain | la référence de qualité, le jugement d’expert | cher et lent | la porte : l’intention, l’irréversible, ce qui ne se spécifie pas | Odile, qui tranche |

Un [évaluateur à base de modèle](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-evaluateur-a-base-de-modele) se calibre d’abord sur des jugements humains, et ne sert jamais seul de porte : il bloque avec un contrôle déterministe ou une personne [\[95\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-demystifying-evals). Chez Passerelle, Bernard a comparé les avis du Claude relecteur à ceux d’Odile sur vingt brouillons avant de s’en servir ([section 21.12](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-12)). Ses signalements aident Odile à relire, ils ne décident de rien.

Mieux vaut noter ce que l’agent a produit que le chemin suivi. Et pass@k mesure au moins une réussite en k essais, [pass^k](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-pass-k) k réussites sur k [\[95\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-demystifying-evals) : ce guide retient la seconde pour livrer, car un brouillon fidèle une fois sur trois n’est pas livrable.

> **💡 Conseil**
>
> Un [hook](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-hook) de type `prompt` ou `agent` fait décider un autre modèle : ce n’est pas un oracle. Pour un contrôle reproductible, prenez un hook de type `command` ou `http` qui lance votre programme [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks).

### 14.4 Cadrer avec les parties prenantes, avant le pipeline

Nouveau · 18 nov. 2026 Des exigences approuvées trop tôt peuvent figer une question que personne n’avait encore vraiment posée. Les parties prenantes, les personnes que le résultat touche ou qui en décident, précisent souvent leur besoin en voyant les réponses envisagées, ou un premier essai, et un document détaillé écrit avant ce moment risque d’être à refaire. C’est la conviction de ce guide, qui propose donc de cadrer d’abord avec elles, sur deux supports partagés et légers :

- **un tableau blanc**, où chacune et chacun pose ses idées, ses questions et ses flux, sans ordre imposé,
- **un doc clé**, une seule page vivante : la question retenue, les réponses envisagées et leurs raisons, ce qui reste ouvert, et les phrases des personnes, mot pour mot et datées (sections [4.6](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-6) et [14.9](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-9)).

Les deux se mettent à jour à chaque tour de discussion, et l’on itère tant que la question bouge. Si elle bouge encore après deux tours, tranchez par un petit essai qui peut échouer sans dommage ([section 4.8](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-8)). Les documents détaillés, exigences, conception et tests, viennent ensuite, dans le pipeline de ce chapitre : la boucle qui va de la décision à la recette (sections [14.5](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-5) à [14.11](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-11)). Quand un choix est fait, l’enregistrement de décision ([section 14.8](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-8)) reprend du doc clé les réponses écartées et leurs raisons.

*Dessin : Cadrer avant le pipeline. Schéma : la description suit.*

**Figure 14.2 :** Cadrer avant le pipeline. Les trois premières étapes tournent avec les parties prenantes, sur les supports partagés, tant que la question bouge. Le pipeline détaillé, en vert, ne commence qu’ensuite. Schéma proposé par ce guide.

Le même schéma, en texte :

1. Cadrer avec les parties prenantes.
2. Poser la bonne question ([section 4.8](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-8)).
3. Lister les réponses possibles ([section 4.8](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-8)).
4. Écrire le prompt ([section 4.7](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-7)).
5. Le pipeline détaillé : décisions, exigences, tests et recette (sections [14.5](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-5) à [14.11](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-11)).

Sur le côté, le tableau blanc et le doc clé servent aux trois premières étapes, et se mettent à jour à chaque tour tant que la question bouge.

La pratique ne dépend d’aucun outil : le tableau blanc peut être celui de la salle, en papier, et le doc clé un fichier. Dans l’application Claude (web, bureau, mobile), et non dans Claude Code, deux outils servent aussi, l’un au tableau, l’autre au doc clé, chacun avec sa date 🕘 :

- **Claude Whiteboards** est en bêta depuis le 10 novembre 2026 [\[96\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-whiteboards-annonce). On parle, on tape ou l’on dessine, et Claude range les idées en diagrammes, en flux et en groupes [\[97\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-whiteboards-aide). Chacune et chacun ajoute ses notes, Claude peut les regrouper par thème et rédiger les actions de chaque personne, puis faire du tableau un doc ou un deck [\[96\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-whiteboards-annonce). Au 18 novembre 2026, la page d’aide le donne sur les offres Pro, Max, Ultra, Team et Enterprise, sur le web, l’application de bureau et le mobile, coupé par défaut sur Enterprise tant que l’administration ne l’active pas [\[97\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-whiteboards-aide). Le billet d’annonce dit « toutes les offres payantes » [\[96\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-whiteboards-annonce), et la page des prix ne le coche pas pour l’offre gratuite [\[6\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-tarifs) : les trois concordent ce jour-là, mais une bêta change vite. Vérifiez qu’il apparaît sur votre compte avant d’organiser une séance autour de lui.
- **Claude Docs**, annoncé en bêta le 16 septembre 2026 [\[98\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-docs-annonce), est sorti de bêta le 8 octobre 2026, sur toutes les offres, l’offre gratuite comprise [\[99\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-docs-disponible). Un doc est d’abord privé. Les personnes qui ont le droit de le modifier y travaillent en même temps que vous et que Claude, et l’on demande une modification à Claude en le mentionnant, `@Claude`, dans un commentaire [\[100\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-docs-aide).

Chez Passerelle, la semaine d’avant la vague, une question attend : faut-il étendre le contrôle des dates et des montants ([chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#ch5)) ? Samia réunit Odile, Thomas, Bernard et Inès autour du tableau blanc de la permanence, en papier, et chacune et chacun y colle ses notes. Inès les recopie, sans nom, dans le doc clé, un fichier `cadrage.md` du dépôt, où chaque phrase porte un rôle et une date, et demande à Claude de les regrouper par thème : les délais, les références, la lecture à voix haute, qui relit. Thomas lit le doc clé avec son lecteur d’écran : le tableau en papier ne lui est pas lisible. Au deuxième tour, la question change : non plus « faut-il étendre le contrôle ? », mais « comment être sûr qu’aucun délai ni aucune référence ne se perd ? ». Au troisième, elle ne bouge plus, et Inès écrit les exigences : c’est la section suivante.

> **⚠️ Attention**
>
> Un tableau blanc en ligne ou un doc en ligne est un service distant : ce qu’on y pose part chez Anthropic, comme une conversation. La règle de la [section 23.1](https://gmag-dev.github.io/bien-demarrer-claude-code/23-securite-et-propriete-intellectuelle-en-entreprise.html#s23-1) s’y applique telle quelle : sur un compte personnel, aucune donnée d’usager, ni nom, ni phrase qu’on pourrait lui attribuer, ni photo de notes qui en portent. C’est pourquoi le tableau de Passerelle reste en papier, et son doc clé, un fichier sans nom d’usager. Pour un travail d’employeur, n’utilisez que les outils que votre organisation autorise ([chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/23-securite-et-propriete-intellectuelle-en-entreprise.html#ch23)).

> **🔀 Quand la règle cède**
>
> - Un regroupement fait par Claude reste une proposition : il se relit avec les personnes, comme le rapport d’un sous-agent ([section 15.3](https://gmag-dev.github.io/bien-demarrer-claude-code/15-deleguer.html#s15-3)).
> - Ce qui tient : la question et les réponses envisagées se stabilisent avec les parties prenantes avant le premier document détaillé, et le doc clé garde leurs mots, datés.
> - Pour aller plus loin : sections [4.8](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-8), [14.9](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#s14-9) et [19.4](https://gmag-dev.github.io/bien-demarrer-claude-code/19-plusieurs-sessions-en-parallele.html#s19-4).

### 14.5 Écrire des exigences qu’un oracle peut lire

Un oracle ne vérifie que ce qui est écrit clairement : d’abord l’entretien de besoin, puis la forme des exigences.

#### L’entretien de besoin, au-delà de « interroge-moi »

La [section 4.6](https://gmag-dev.github.io/bien-demarrer-claude-code/4-la-methode-de-travail.html#s4-6) a posé la règle de l’entretien : la phrase de la personne gardée mot pour mot, avec sa date, et des questions sur des faits passés. Ce guide y ajoute trois gestes, dans cet ordre :

1. **Chercher le travail à accomplir** : ce que la personne essaie d’obtenir, dans quelle situation, et ce qu’elle utilise aujourd’hui à la place. La théorie des travaux à accomplir (*jobs to be done*) se présente comme un prisme sur les circonstances qui poussent à agir [\[101\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-jtbd).
2. **Écrire ses hypothèses, puis les mettre à l’épreuve** : une phrase numérotée chacune, et une question suivante qui cherche ce qui la contredirait.
3. **Passer aux exigences**, chacune reliée à la phrase d’origine.

Chez Passerelle, Inès demande à Josiane, qui a accepté l’entretien : « Racontez-moi le dernier courrier du Bureau des aides que vous avez reçu. Qu’avez-vous regardé en premier ? » Josiane cherche d’abord la date limite, puis le montant. L’hypothèse « HYP-1 : la date limite est la première chose cherchée », que confirment deux autres entretiens, rejoint la règle du FALC de mettre l’information importante au début [\[3\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-inclusion-europe-information-for-all). Elle devient une exigence : là où le courrier fixe un délai, le brouillon le donne dans sa première phrase. Claude peut aussi relire vos questions et signaler celles qui suggèrent leur réponse.

> **⚠️ Attention**
>
> Les notes d’un entretien réel parlent d’une personne réelle : son courrier, ses revenus, parfois sa santé. Ne les collez jamais dans une [IA](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-ia) personnelle, ni dans le dossier du projet. N’en sortez que des faits reformulés et anonymes, relus par la personne interrogée si elle le souhaite.

#### Les gabarits EARS

La syntaxe [EARS](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-ears) (*Easy Approach to Requirements Syntax*), publiée en 2009, propose cinq gabarits simples, plus un gabarit complexe qui les combine [\[102\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-ears). La [section 21.9](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-9) dit la place d’une exigence parmi les artefacts d’un skill.

**Tableau 14.2 :** Les gabarits EARS, d’après [\[102\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-ears). Les exemples, pour le contrôle et l’outil de Passerelle, sont de ce guide.

| Gabarit | Forme | Exemple chez Passerelle 🌉 |
| --- | --- | --- |
| Permanent | Le \<système> doit \<réponse>. | Le contrôle de fidélité doit rendre la liste des dates, montants, délais et références du courrier. |
| Dépendant d’un état | Tant que \<état>, le \<système> doit \<réponse>. | Tant qu’Odile n’a pas donné son accord, l’outil doit marquer le brouillon « brouillon pour relecture ». |
| Déclenché par un événement | Quand \<déclencheur>, le \<système> doit \<réponse>. | Quand un brouillon est écrit, le contrôle doit vérifier que chaque date et chaque montant du courrier s’y retrouvent. |
| Fonction optionnelle | Là où \<fonction présente>, le \<système> doit \<réponse>. | Là où la page de relecture est installée, l’outil doit montrer le courrier et le brouillon côte à côte. |
| Comportement indésirable | Si \<déclencheur>, alors le \<système> doit \<réponse>. | Si le brouillon contient un montant absent du courrier, alors le contrôle doit échouer et nommer ce montant. |
| Complexe | une combinaison des formes précédentes | Tant que le brouillon n’est pas relu, quand une bénévole l’imprime, l’outil doit écrire « brouillon pour relecture » en tête de page. |

Une exigence écrite ainsi se traduit presque mot pour mot en cas de test : l’état devient la préparation, le déclencheur l’action, la réponse l’assertion. Ce rapprochement est une inférence de ce guide. Pour l’exigence de comportement indésirable :

```python
def test_montant_ajoute_fait_echouer_le_controle():
    courrier = "Le montant de votre aide est fixé à 212,40 euros par mois."
    brouillon = "Votre aide est de 212,40 euros par mois. Vous recevrez aussi 50 euros."
    resultat = controler_fidelite(courrier, brouillon)
    assert not resultat.passe
    assert "50 euros" in resultat.ajouts
```

### 14.6 Les tests d’abord, à l’échelle d’un projet

À l’échelle d’un projet, le test d’abord du [chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#ch5) se dédouble : les évaluations de capacité démarrent à un taux de réussite bas, celles de régression restent proches de 100 % [\[95\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-demystifying-evals). Une vingtaine de cas représentatifs suffit pour commencer [\[103\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-multi-agent-research-system), et la [section 21.12](https://gmag-dev.github.io/bien-demarrer-claude-code/21-ecrire-des-skills-des-agents-et-des-artefacts.html#s21-12) dit comment la suite se tient dans la durée. Chaque défaut corrigé y laisse un cas de régression ([section 16.5](https://gmag-dev.github.io/bien-demarrer-claude-code/16-relire-pour-refuter-corriger-l-instance-et-la-classe.html#s16-5)) : chez Passerelle, le délai mal rendu du [chapitre 13](https://gmag-dev.github.io/bien-demarrer-claude-code/13-les-pieges-frequents.html#ch13) a été le premier.

#### Des courriers synthétiques et reproductibles

Testez avec des données inventées, jamais avec des données réelles. Des [données synthétiques](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-donnees-synthetiques) ont la forme des vraies, mais aucune ligne ne décrit une personne qui existe, et le même script les reproduit à l’identique : un échec se rejoue partout. Ce guide propose quatre points, que suit le générateur des courriers de Passerelle :

1. **Une [graine](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-graine) fixée** dans le code : la même graine redonne les mêmes soixante courriers, et un test qui échoue aujourd’hui échoue encore demain.
2. **Des identifiants à préfixe fictif** : `PASS-C-`, `PASS-B-`, et un numéro visiblement faux, comme `PASS-NIR-0000-0000`.
3. **L’intégrité entre les fichiers** : `PASS-B-017` renvoie à `PASS-C-017`, qui existe. Sinon, un test échoue sur un défaut du jeu, pas de l’outil.
4. **Des cas limites voulus**, chacun nommé : une date au 29 février 2028, un montant à zéro euro, un délai relatif (« dans les 15 jours suivant la réception »), une date en chiffres (« 15/12/2026 »), deux montants dans la même phrase.

Un contrôle échoue s’il trouve dans le jeu ce qui ressemble à une donnée personnelle, et un résumé dit la graine, les cas limites et ce résultat.

```text
Écris un générateur de courriers fictifs pour Passerelle : graine fixée dans le code,
identifiants PASS-C- et PASS-B-, chaque brouillon renvoie à un courrier qui existe,
et cinq cas limites nommés. Ajoute un contrôle qui échoue s'il trouve une donnée qui
ressemble à une donnée personnelle, et un résumé du jeu. Lance le générateur deux fois
et montre-moi que les deux sorties sont identiques.
```

La graine ne vaut qu’avec les mêmes versions du générateur et de ses bibliothèques : épinglez-les. Le contrôle cherche des motifs, il ne voit pas un vrai nom dans un champ libre, et les tournures des vrais courriers échappent au jeu : la relecture d’Odile les rattrape.

> **⚠️ Attention**
>
> Le geste risqué est de « rendre le jeu plus réaliste » en y recopiant un passage d’un vrai courrier. Ce passage entre alors dans le dépôt, puis dans le contexte de Claude. Inventez les tournures, et gardez les vrais courriers dans l’armoire de la permanence.

#### L’accessibilité du brouillon comme oracle

Si Passerelle montre ses brouillons dans une page web locale, pour qu’Odile lise le courrier et le brouillon côte à côte, l’accessibilité de cette page se vérifie comme le reste. Prenez pour cible les règles [WCAG](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-wcag) 2.2 de niveau [AA](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-aa), qui comprend tous les critères du niveau A [\[87\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-wcag22), et demandez à Claude dès le premier écran :

- **axe-core dans les tests**, réglé sur `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa` et `wcag22aa`, sur chaque écran et dans chaque état : le test échoue si la liste des violations n’est pas vide [\[104\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-axe-core) [\[105\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-axe-core-api),
- **le clavier** : tout se fait au clavier, le focus n’est jamais piégé et reste visible [\[87\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-wcag22), et dans des onglets ou un menu, les flèches se déplacent dans le composant [\[106\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-wai-keyboard-interface),
- **le mouvement réduit**, lu par `prefers-reduced-motion` [\[107\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-mdn-prefers-reduced-motion) : ce guide propose d’arrêter alors toute animation non essentielle,
- **les états vide, chargement et erreur, écrits dans la spécification** : un état non décrit, Claude l’invente. Une erreur est décrite en texte, et un message d’état est annoncé sans prendre le focus [\[87\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-wcag22).

Écrits en EARS, les trois états de la page de relecture deviennent trois tests :

- Tant qu’aucun brouillon n’attend de relecture, la page doit afficher « Aucun brouillon à relire pour l’instant ».
- Tant que le brouillon se charge, la page doit annoncer « Chargement » sans déplacer le focus.
- Si le brouillon ne s’ouvre pas, alors la page doit dire en texte ce qui a échoué et proposer « Réessayer ».

Le contrôle automatique est un plancher : selon son éditeur, axe-core trouve en moyenne 57 % des problèmes WCAG [\[104\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-axe-core). Chez Passerelle, la passe humaine est celle de Thomas, qui écoute chaque nouvelle forme de brouillon avec son lecteur d’écran.
