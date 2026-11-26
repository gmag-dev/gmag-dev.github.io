> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.3.0 : « 23. Sécurité et propriété intellectuelle en entreprise », partie 2 sur 2.
>
> - Précédent : [23. Sécurité et propriété intellectuelle en entreprise (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/23-securite-et-propriete-intellectuelle-en-entreprise-1.md)
> - Suivant : [Annexe A. Ma première semaine](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-a-ma-premiere-semaine.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-s23-6>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

### 23.6 Moindre privilège, hors ligne, pas de CDN à l’exécution

Trois règles ouvrent cette section : donner le moins d’accès possible, ne laisser sortir que le trafic indispensable, et ne charger aucune ressource en ligne au moment de l’exécution.

**Moindre privilège.** Le [chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch10) en donne les règles. Un serveur MCP local est un programme qui s’exécute avec vos privilèges. Les bonnes pratiques du protocole exigent, d’un client qui installe un serveur local en un clic, un consentement explicite avec la commande complète affichée. Elles demandent aussi des privilèges minimaux, le transport `stdio` pour limiter l’accès au seul client, ou en HTTP un jeton d’autorisation, et des portées minimales élevées progressivement [\[129\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mcp-security-best-practices). Ce guide en tire une règle : un serveur local écoute sur `127.0.0.1` ou en `stdio`, et n’expose que les outils dont la tâche a besoin. Le serveur du lexique de Passerelle est de ce type : en `stdio`, en lecture seule, un seul outil. Il hérite pourtant de l’environnement du terminal qui lance Claude Code, sauf si ce terminal exporte `CLAUDE_CODE_MCP_ALLOWLIST_ENV=1` ([section 18.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s18-3)) [\[184\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-env-vars).

**Hors ligne.** Plusieurs variables coupent le trafic non indispensable : `DISABLE_TELEMETRY=1` pour les métriques, `DISABLE_ERROR_REPORTING=1` pour les rapports d’erreur, `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` pour tout le trafic non essentiel [\[8\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-data-usage). `DISABLE_TELEMETRY` et `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` ont un effet de bord documenté : elles coupent aussi l’évaluation des drapeaux de fonctions, ce qui peut rendre [Remote Control](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-remote-control) indisponible [\[8\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-data-usage).

**Ce qui sort quand même.** Avant un `WebFetch` vers un hôte qui n’a pas été vérifié dans les cinq dernières minutes, le nom d’hôte demandé, et lui seul, part vers `api.anthropic.com` pour un contrôle de liste de blocage, quel que soit le fournisseur et même avec le trafic non essentiel coupé. La clé `skipWebFetchPreflight` le désactive [\[8\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-data-usage). Un poste qui veut ne laisser sortir que le trafic indispensable doit le savoir.

**Pas de [CDN](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-cdn) à l’exécution.** Ce guide propose qu’un outil local (une page de pilotage, une vue, une figure) n’appelle aucune ressource en ligne quand il s’affiche : tout ce qu’il montre est embarqué. Une page qui charge une bibliothèque depuis un CDN révèle votre usage à un tiers, et casse dès que le réseau manque. Chez Passerelle, la page locale qui montre le brouillon à Odile, à côté du courrier, ne charge rien en ligne : ses polices et ses styles sont dans le fichier.

> **🔀 Quand la règle cède**
>
> - La règle « hors ligne » cède dès qu’une session emploie WebFetch, dont le contrôle préalable fait sortir le nom d’hôte demandé (cette section).
> - Ce qui tient : la liste exacte de ce qui sort, écrite, et la règle de deux, qui dit quelle session a le droit de sortir ([section 23.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-4)).
> - Pour aller plus loin : [chapitre 17](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch17), sur le bac à sable et ses modes.

### 23.7 Le contrôle avant envoi, pour tout message

Ce guide propose un [contrôle avant envoi](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-controle-avant-envoi) simple, pour tout envoi hors de la session : un courriel, un message d’équipe, un ticket, un message vers une autre machine. Un programme en **lecture seule** examine le corps du message et signale ce qui ne doit pas sortir : un secret, un identifiant interne, un chemin de fichier, un terme sensible. Un contrôle qui n’a pas pu s’exécuter ne vaut jamais un feu vert.

Deux principes le bornent. Il ne réécrit jamais le message : il signale, la personne corrige. Et il ne remplace pas le geste humain d’envoi ([section 19.7](https://gmag-dev.github.io/bien-demarrer-claude-code/#s19-7)). Il s’appuie sur des parades reconnues : la divulgation d’informations sensibles figure au Top 10 OWASP des applications à base de modèles de langage [\[71\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-owasp-llm02). Le classificateur du mode auto cherche à bloquer l’envoi de données sensibles vers l’extérieur [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permission-modes), et il peut se tromper : ce n’est pas une supervision ([section 23.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-4)). Le réglage `isolatePeerMachines` exige votre accord avant tout message qui sort de la machine [\[112\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-cross-session-messaging).

Pour commencer sans écrire de programme, un skill réservé à votre commande (`disable-model-invocation: true`, [section 21.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-3)) relit un brouillon de message en lecture seule, signale ce qui ne doit pas sortir, et n’envoie rien.

> **⚠️ Attention**
>
> Laisser Claude envoyer un message à votre place, c’est faire sortir un texte que personne n’a relu au moment où il part. Passez chaque message au contrôle, corrigez vous-même ce qu’il signale, et envoyez-le vous-même.

La première règle de Passerelle veut que l’outil n’envoie jamais rien, et le [chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch10) lui donne sa forme imposée ([section 10.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-3)). Mais les bénévoles écrivent, eux, à l’association voisine. Samia rédige le message qui partage le motif du skill. Le contrôle signale un chemin de fichier de son poste, `C:\Users\…`, et un lien vers le dossier interne de la permanence. Elle les retire. Les identifiants `PASS-C-` qui restent sont fictifs, et le disent. Puis Samia relit encore, et c’est Amadou, qui tient la relation avec l’association voisine, qui envoie le message lui-même.

### 23.8 Des contrôles automatisés, et un cadre de référence : le SSDF

Un contrôle de sécurité se branche comme un test : il réussit ou il échoue, et Claude lit son résultat ([section 5.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s5-1)). Trois familles de contrôles se branchent de la même façon :

- **Les secrets, avant chaque commit.** Un scanner cherche les mots de passe, les clés et les jetons dans ce qui va être commité, par exemple gitleaks [\[83\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-gitleaks), branché à la porte de commit ([section 19.6](https://gmag-dev.github.io/bien-demarrer-claude-code/#s19-6)).
- **L’analyse statique**, ou [SAST](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-sast) : un outil lit le code sans l’exécuter et signale des motifs dangereux, comme une requête construite en collant des chaînes. Par exemple semgrep, ou les règles de sécurité du linter de votre langage.
- **Les dépendances vulnérables.** L’outil d’audit de votre écosystème compare les versions de vos dépendances à une base publique de vulnérabilités connues, où chacune porte un identifiant, souvent un [CVE](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-cve). Par exemple cargo-audit pour Rust, pip-audit pour Python, `npm audit` pour JavaScript.

Les outils nommés sont des logiciels libres, cités en exemple, et la liste n’est pas fermée. Prenez ceux de votre langage, et lisez leur documentation.

**Les brancher pour que Claude les lise.** Ce guide propose ces gestes :

1. Une commande par contrôle dans le gestionnaire de tâches du projet, l’outil qui donne un nom court à chaque commande, et une commande qui les enchaîne.
2. La même commande dans le hook git `pre-commit` ([section 19.6](https://gmag-dev.github.io/bien-demarrer-claude-code/#s19-6)) : un commit qui ne passe pas ne se fait pas.
3. Une ligne dans `CLAUDE.md` : « Avant de dire vérifié, lance la commande de contrôle et montre sa sortie » ([section 5.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s5-3)).
4. Claude lit le code de sortie : zéro veut dire « rien trouvé », une autre valeur « trouvé » ou « erreur ». Lisez dans la documentation de chaque outil ce qu’il renvoie, car certains ne signalent un constat par leur code de sortie qu’avec une option.

**Un contrôle qui n’a pas tourné n’est pas un feu vert.** Un outil absent, une base de vulnérabilités injoignable, un dossier exclu par erreur : le contrôle n’a rien dit, ce qui ne veut pas dire qu’il n’y a rien. La commande doit alors échouer, et le rapport dire « non vérifié » ([section 14.10](https://gmag-dev.github.io/bien-demarrer-claude-code/#s14-10)). Essayez-la une fois sur un cas qui doit échouer, par exemple un faux secret dans un fichier d’essai.

**Ce qu’ils ne voient pas.** Ces outils cherchent des motifs connus. Ils ne savent pas qu’une personne accueillie ne doit pas voir le dossier d’une autre : la logique métier reste aux tests écrits contre les exigences ([chapitre 14](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch14)) et à la relecture. Ils ne voient pas non plus l’injection de prompt : une phrase piégée dans un courrier n’est pas un motif de code ([section 10.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-3)).

**Demander avant d’installer.** Un outil de sécurité est un programme de plus sur votre poste, avec ses propres dépendances. Claude propose l’outil et sa source, et vous décidez de l’installer. Pour un outil local que vous écrivez vous-même, un contrôle, une garde, un langage compilé qui livre un seul exécutable sans interpréteur, comme Rust, est une option, que ce guide propose sans l’imposer : il y a moins à installer sur le poste, et un seul fichier à vérifier.

> **💡 Conseil**
>
> Sur un poste fourni par une organisation, sa politique peut déjà fixer la liste des outils permis ([section 17.6](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-6)) : demandez-la avant d’installer, et proposez un outil de la liste quand il fait le même contrôle.

Chez Passerelle, Bernard branche le scanner de secrets à la porte de commit, et l’audit des dépendances de son contrôle des dates avant chaque nouvelle version. Il a demandé à Samia avant d’installer quoi que ce soit, et essayé le scanner sur un faux jeton, `PASS-JETON-0000-0000`, qui doit le faire échouer. Les règles par défaut de gitleaks ne reconnaissent pas ce jeton fait de zéros. Bernard lui ajoute donc une règle, dans un fichier `.gitleaks.toml` qui garde les règles par défaut (`useDefault = true`) [\[83\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-gitleaks), puis vérifie que le commit du témoin échoue.

**Un cadre de référence.** Le [SSDF](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-ssdf) (*Secure Software Development Framework*) du [NIST](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-nist), SP 800-218 version 1.1 de février 2022, regroupe les pratiques de développement sécurisé en quatre familles : préparer l’organisation (PO), protéger le logiciel (PS), produire un logiciel bien sécurisé (PW), répondre aux vulnérabilités (RV) [\[163\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-nist-sp-800-218) [\[164\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-nist-ssdf). Un projet de version 1.2 a été publié le 17 décembre 2025, sans version finale à la date de consultation [\[165\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-nist-sp-800-218r1). Le profil 800-218A, de juillet 2024, ajoute des pratiques propres au développement de modèles d’IA générative [\[166\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-nist-sp-800-218a). Il ne traite pas directement du développement assisté par un agent. 💡 Conseil : servez-vous de ce cadre pour montrer, famille par famille, que vos pratiques couvrent ce que demande un développement sécurisé.

**Tableau 23.5 :** Le SSDF, d’après [\[163\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-nist-sp-800-218), et les pratiques de ce guide, une correspondance proposée.

| Famille | Pratiques du guide |
| --- | --- |
| PO, préparer l’organisation | couches de réglages et réglages gérés, rôles clairs : le modèle propose, un contrôle vérifie, une personne tranche |
| PS, protéger le logiciel | détection de secrets avant le commit, aucun secret dans les prompts, dépôts sans données réelles |
| PW, produire un logiciel bien sécurisé | spécification d’abord, tests d’abord, relecture par un regard neuf, éventail maîtrisé |
| RV, répondre aux vulnérabilités | analyse de cause, correction de l’instance et de la classe, test de régression ([annexe E](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-e)) |

> **🔀 Quand la règle cède**
>
> - Un contrôle vert dit qu’aucun motif connu n’a été trouvé, pas que le code est sûr : la logique métier et l’injection de prompt lui échappent (cette section).
> - Ce qui tient : les tests écrits contre les exigences, la relecture par un regard neuf, et la règle de deux pour ce qu’aucun motif ne voit.
> - Pour aller plus loin : la [section 10.6](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-6) donne ces contrôles à trois niveaux, et le [chapitre 14](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch14) les tests contre les exigences.

> **📌 À retenir**
>
> Avant de relire la liste, répondez de mémoire, puis vérifiez votre réponse dans la section indiquée :
>
> 1. Quelle règle garde la frontière des données, même pour un simple essai, et quelles règles s’appliquent sur un compte fourni par une organisation ? ([section 23.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-1))
> 2. Pourquoi retirer la sortie réseau d’une session ne suffit-il pas à lui retirer la propriété \[C\] ? ([section 23.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-4))
>
> - Aucune donnée de client, d’employeur ou d’usager dans un compte ou un outillage personnel, même pour essayer.
> - Les couches de réglages disent qui contrôle quoi : rien d’une organisation ni d’une personne accueillie n’entre dans vos fichiers personnels.
> - On partage des motifs et des exemples synthétiques, après un passage du scanner sur tout l’historique. Réécrire et pousser restent vos gestes, et un secret publié se révoque.
> - Règle de deux : jamais les trois propriétés dans une session sans supervision. Ce guide propose le mode Manual comme session supervisée, avec ses limites. Le mode auto n’en est pas une, une fille ne doit jamais les réunir, et le rapport d’un agent est un contenu non fiable.
> - Serveurs locaux sur `127.0.0.1` ou en `stdio`, aucune ressource en ligne à l’affichage, un contrôle avant tout envoi, et des contrôles automatisés lus par leur code de sortie.
> - Une posture opérationnelle, pas un avis juridique.

> **✏️ Exercice**
>
> **Compétence visée** : appliquer la règle de deux à une tâche réelle, et tenir la frontière des données. Comptez 45 minutes.
>
> Prenez une tâche réelle que vous confiez à Claude Code, et dessinez sa règle de deux : quelles entrées non fiables \[A\], quelles données privées ou quels systèmes sensibles \[B\], quels changements d’état ou quels canaux vers l’extérieur \[C\] ? Pour chaque session et chaque agent, notez si chaque borne tient par construction ou par consigne. Si les trois propriétés sont réunies, découpez la tâche en deux, et écrivez le champ `tools` en liste blanche qui retire la troisième propriété à chacune, ou gardez-la dans une session en mode Manual. Relisez ensuite votre dossier `~/.claude/`, et notez ce qui appartient à une organisation, à un client ou à une personne accueillie et n’a rien à y faire.
>
> Si vous suivez le fil rouge, faites-le sur la session de la vague de Passerelle : le brouillon qui en sort ne sert qu’après la relecture d’Odile, qui décide s’il est remis à la personne, et c’est la personne qui décide de ce qu’elle fait de son courrier.
>
> **Sans code** : tout l’exercice se fait sur papier. Les trois propriétés se dessinent, et un champ `tools` est une ligne de texte que vous écrivez sans programmer.
>
> **Critère de réussite** : chaque session et chaque agent de la tâche a ses trois propriétés notées, chaque borne marquée « par construction » ou « par consigne ». Une borne « par construction » se vérifie sur le champ `tools` : aucun outil restant ne porte la propriété retirée (tableau de la [section 23.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-4)). Aucune session hors du mode Manual, et aucun agent, ne réunit \[A\], \[B\] et \[C\]. Votre relecture de `~/.claude/` donne une liste écrite, même vide.
>
> **Pour vous corriger**, sans corrigé : relisez votre travail contre ces cinq points. Chacun se voit dans ce que vous avez écrit ou obtenu.
>
> 1. Pour chaque session et chaque agent, \[C\] compte tout changement d’état, et pas seulement la sortie réseau : un outil comme `Bash` ou `Write` le porte ([section 23.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-4)).
> 2. Chaque borne « par construction » se vérifie sur un champ `tools` écrit en liste blanche, et non en `disallowedTools`, qui oublie facilement un outil : aucun outil restant ne porte la propriété retirée, d’après le tableau 23.3 ([section 23.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-4)).
> 3. Si vous avez découpé la tâche en filles, chacune rend son rapport dans son message final, sans `Write`, qui lui rendrait \[C\] ([section 23.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-4)).
> 4. Aucune session en mode auto ne réunit \[A\], \[B\] et \[C\] : un travail qui demande les trois sans qu’un outil puisse être retiré reste dans une session supervisée, en mode Manual ([section 23.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-4)).
> 5. Votre liste nomme tout ce qui, dans vos réglages ou vos fichiers personnels, appartient à une organisation, à un client ou à une personne accueillie ([section 23.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-2)).
>
> Par le chemin sans code, les cinq points s’appliquent tels quels à votre dessin et à la ligne `tools` que vous avez écrite.

> **✏️ Exercice**
>
> **Compétence visée** : conduire un lot complet, du besoin écrit à la décision de la personne. C’est l’exercice de passage du jalon Expert (« Apprendre avec ce guide ») : ses preuves montrent qu’un lot complet a été conduit une fois, sur un cas, pas qu’un stade est atteint. Comptez une demi-journée, en deux ou trois séances.
>
> **① Exemple travaillé.** Après la vague, Inès conduit un lot de dix courriers fictifs de Passerelle. Ses six preuves, dans l’ordre :
>
> 1. Les exigences écrites : `PASS-EX-004` et `PASS-EX-005`, en EARS, chacune avec sa source ([section 21.9](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-9)).
> 2. Un contrôle qui peut échouer : elle retire elle-même une date d’une copie d’un brouillon, voit le contrôle des dates et des montants échouer en la nommant, puis passer sur le vrai brouillon ([section 5.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s5-2)).
> 3. Deux sous-agents sur des fichiers distincts : deux filles `tools: Read, Grep, Glob`, l’une sur les cinq premiers courriers, l’autre sur les cinq suivants. Elles rendent leurs brouillons dans leur rapport, et la session d’Inès, en mode Manual, les écrit après lecture ([chapitre 15](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch15) et [section 23.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-4)).
> 4. Une relecture par un regard neuf : l’agent `relecture-brouillons`, qui ne reçoit pas la conversation de la rédaction (sections [16.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s16-1) et [21.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-5)).
> 5. L’analyse de cause d’un défaut : la relecture signale un délai adouci, et Inès en cherche la cause, puis corrige l’instance et la classe ([section 16.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s16-4) et [annexe E](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-e)).
> 6. Un point de pilotage chiffré et daté : dix brouillons écrits, un corrigé, dix en attente d’Odile, et la part du forfait lue à l’heure du point ([section 20.10](https://gmag-dev.github.io/bien-demarrer-claude-code/#s20-10)).
>
> Odile relit ensuite les dix brouillons, un par un, et décide de ceux qui servent. **Pourquoi ?** Pourquoi Inès retire-t-elle elle-même une date avant de faire confiance au contrôle ?
>
> **② À compléter.** Le défaut du point 5 : le courrier écrit « vous devez répondre avant le 15 décembre 2026 », le brouillon « vous pouvez répondre avant le 15 décembre 2026 ». Le contrôle des dates passe, puisque la date y est. Écrivez la cause, la correction de l’instance, la correction de la classe et le cas de régression qui la prouve.
>
> **③ Sur votre projet.** Conduisez un lot complet sur votre projet, ou sur des données inventées et marquées comme telles : les six preuves de ①, et le dessin de la règle de deux de chaque session et de chaque agent du lot.
>
> **Sans code** : tout le lot se conduit en phrases. Les exigences, les briefs, les champs `tools`, l’analyse de cause et le point s’écrivent sans programmer. Le contrôle peut être celui du [chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch5), sans code : une liste de dates et de montants écrite à la main, que vous comparez vous-même au brouillon, ligne par ligne, ou qu’une commande compare pour vous. Le contrôle échoue tant qu’il en manque une, et son résultat ne dépend de l’avis d’aucun modèle.
>
> **Critère de réussite** : six preuves que vous pouvez montrer, une sortie, un fichier ou un diff chacune. Les exigences ont un identifiant. Le contrôle a une sortie d’échec, puis une sortie de succès, et aucune des deux ne dépend de l’avis d’un modèle. Les deux sous-agents ne traitent aucun élément du lot en commun, et n’écrivent aucun fichier. La relecture neuve a rendu un rapport dont vous avez relu au moins une preuve. L’analyse de cause porte sur le premier défaut trouvé, ou, s’il n’y en a aucun, sur un défaut que vous avez planté dans une copie. Chaque nombre du point se recompte à sa source. Et aucune session hors du mode Manual, ni aucun agent, ne réunit \[A\], \[B\] et \[C\].
>
> **Voir le corrigé expliqué (après votre essai)**
>
> **①** Un contrôle qu’on n’a jamais vu échouer ne prouve pas qu’il détecte le défaut ([section 5.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s5-2)) : la date retirée le prouve. Les filles n’ont aucun outil pour écrire ni sortir, et leurs rapports arrivent à la session d’Inès comme des contenus non fiables \[A\] : c’est pourquoi elle est en mode Manual. Ni la relecture ni le point ne décident : Odile tranche chaque brouillon, puis chaque personne décide de ce qu’elle fait de son courrier.
>
> **②** La cause : le contrôle compare des dates et des montants, pas le verbe qui fait l’obligation, et le skill ne demandait pas de le garder. L’instance : le brouillon reprend « vous devez ». La classe se corrige par un contrôle, pas par une consigne : le contrôle des dates et des montants relève aussi les mots d’obligation du courrier, comme « devez » ou « obligatoire », et échoue si l’un d’eux manque au brouillon. La règle du skill « garde le verbe d’obligation du courrier » s’y ajoute, mais seule, elle ne serait qu’une consigne. La preuve : un cas de régression, la copie du brouillon fautif, sur laquelle le contrôle échoue en nommant « devez », puis passe sur le brouillon corrigé. Un cas de plus dans la suite d’évaluation ([section 21.12](https://gmag-dev.github.io/bien-demarrer-claude-code/#s21-12)) suit en outre la règle du skill. Le brouillon corrigé repart chez Odile, qui tranche.
>
> **③** Erreurs fréquentes : deux sous-agents qui touchent le même fichier, une relecture faite dans la session qui a rédigé, un point dont un nombre ne se recompte pas, ou une session en mode auto qui lit les courriers, a le dossier et écrit. Dans ce dernier cas, le lot n’est pas passé : découpez la session, ou repassez-la en mode Manual ([section 23.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s23-4)).

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/#toc)

Annexes

Ce guide est gratuit, en entier. Le soutenir est libre et facultatif.

Votre soutien aide son autrice à préparer d’autres publications et à mener des projets humanistes.

Le soutien passe par Tipeee, un site tiers : le lien s’ouvre dans un nouvel onglet.

[Soutenir ce guide sur Tipeee](https://fr.tipeee.com/gmag-dev)
