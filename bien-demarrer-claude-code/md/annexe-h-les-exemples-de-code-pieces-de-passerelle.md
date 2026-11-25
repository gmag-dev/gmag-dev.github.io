> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.2.2 : « Annexe H. Les exemples de code, pièces de Passerelle ».
>
> - Précédent : [Annexe G. Grille d’auto-évaluation](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-g-grille-d-auto-evaluation.md)
> - Suivant : [Annexe I. Réponses et corrigés](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-i-reponses-et-corriges.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-ann-h>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## Annexe H. Les exemples de code, pièces de Passerelle

Le dossier `exemples/`, livré à côté de ce guide, contient neuf exemples minimaux, commentés en français et testés, un dossier par artefact : une commande, un skill, un agent, des réglages, un serveur [MCP](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-mcp) et son client, des hooks, une ligne d’état et un [mod](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-mod). Chacun a son propre README : ce qu’il montre, comment l’installer, comment le tester, ses limites, et les pages de documentation lues le 2 novembre 2026. Cette annexe les décrit tels qu’ils sont livrés, puis dit quelle pièce de Passerelle 🌉 chacun annonce, et ce qu’il faut changer pour l’en faire une.

### H.1 Le dossier et sa commande de test

Les scripts et les tests sont écrits en Python, avec la seule bibliothèque standard, sauf le mod : un mod est un module JavaScript ou TypeScript, et celui de l’exemple est écrit en JavaScript [\[125\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mods-overview). Le choix de Python tient à la portabilité : ces exemples doivent tourner tels quels sur chaque poste, sans chaîne de compilation à installer. Pour un outillage local durable, un langage compilé comme Rust est une option, que ce guide propose sans l’imposer. Les exemples n’ont aucune donnée réelle : leur catalogue d’exemple est synthétique, avec des identifiants `FICHE-` et `RESP-` inventés.

Depuis le dossier qui contient `exemples/`, une seule commande lance tous les tests :

```bash
python -I -B -m unittest discover -s exemples -p "test_*.py"
```

`-I` lance Python en mode isolé : ni le dossier courant ni les variables `PYTHON*` n’influencent les imports. `-B` n’écrit aucun fichier `.pyc`. Chaque dossier d’exemple contient un `__init__.py` vide, sans lequel la découverte des tests ne descend pas dans le dossier.

Le résultat attendu est « 91 tests, OK », dont un test sauté là où le système ne permet pas de créer un lien symbolique, c’est-à-dire sous Windows sans mode développeur. Mesuré par ce guide le 21 novembre 2026, sous Windows : 91 tests lancés, `OK (skipped=1)`. Pour ne lancer qu’un exemple, remplacez le motif par le nom de son fichier de test, donné dans le tableau de la [section H.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-h-2).

### H.2 Les neuf exemples et la pièce de Passerelle de chacun

Les exemples sont livrés avec leurs propres données et leur propre but, sans rien de Passerelle. Le tableau dit ce que chacun montre, et la pièce de Passerelle qu’il annonce, dans le chapitre où le fil rouge la construit. Les exemples se lisent dans cet ordre, du plus simple au plus avancé.

**Tableau :** Les neuf exemples de `exemples/`, leurs tests, et la pièce de Passerelle que chacun annonce. D’après les README du dossier, lus le 7 novembre 2026.

| Dossier | Ce qu’il montre | Fichier de test (nombre de tests) | La pièce de Passerelle | Ce qu’il faut changer |
| --- | --- | --- | --- | --- |
| `commande/` | une commande à arguments nommés, `/relire-message <fichier-brouillon> [public]`, en skill que seule la personne lance, et l’ancien format `.claude/commands/` | `test_commande.py` (5) | la commande qui relit un brouillon avant qu’Inès le remette à Odile ([chapitre 7](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch7)) | le public visé, et la liste de ce qu’elle vérifie : dates, montants, mots du lexique |
| `skill/` | un skill complet : une description qui déclenche, un dossier `references/` lu à la demande, un script appelé par `${CLAUDE_SKILL_DIR}` | `test_resumer_journal.py` (11) | le skill « brouillon pour relecture » ([chapitre 7](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch7)) | la description, le lexique des mots à expliquer dans `references/`, et le script du contrôle des dates, `controle_dates.py` ([chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch5)) |
| `agent/` | un sous-agent relecteur qui cherche à réfuter, avec les seuls outils `Read, Grep, Glob` et un rapport à gabarit fixe | `test_agent.py` (6) | le relecteur qui compare un brouillon à son courrier sans rien modifier, `exemples/agent/relecteur-adversarial.md` (chapitres [15](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch15) et [16](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch16)) | le gabarit du rapport : chaque date et chaque montant, retrouvé ou non |
| `reglages/` | un `settings.json` de projet commenté : `allow`, `ask`, `deny`, le bac à sable, et pourquoi un `deny` par motif ne suffit pas | `test_reglages.py` (10) | la règle `deny` sur le dossier des pièces ([chapitre 17](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch17)) | les chemins protégés, ceux du dossier `pieces/` de Passerelle, et leur raison dans `docs/permissions.md` |
| `mcp-serveur/` | un serveur MCP qui parle en entrée et sortie standard, un outil en lecture seule, le refus des chemins hors de sa racine, deux révisions du protocole | `test_serveur_catalogue.py` (18, dont 1 sauté sous Windows sans mode développeur) | le serveur en lecture seule sur le lexique ([section 18.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s18-3)) | le catalogue de fiches devient le lexique, entrée par entrée |
| `mcp-consommateur/` | le `.mcp.json` d’un projet, `claude mcp add`, les règles `mcp__<serveur>__<outil>`, un client de test qui joue l’hôte | `test_client_hote.py` (8) | la déclaration du serveur du lexique dans le projet de Passerelle ([section 18.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s18-3)) | le nom du serveur, `outils/serveur_lexique.py` ([section 18.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s18-3)), et la règle qui permet son seul outil |
| `hooks/` | un `PreToolUse` qui bloque, par le code 2 ou une décision [JSON](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-json), un `PostToolUse` qui contrôle, un `SessionStart` qui ajoute du contexte, et leur bloc de réglages | `test_hooks.py` (17) | le hook `garde_nir.py` qui bloque un numéro qui ressemble à un vrai numéro de sécurité sociale ([chapitre 7](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch7)), la garde `garde_ecriture.py` qui refuse un brouillon écrit hors de `brouillons/` ([chapitre 18](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch18)), et la note de passation chargée au démarrage ([chapitre 3](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch3)) | le motif à bloquer, et l’outil visé : l’écriture d’un brouillon, plus une commande shell |
| `ligne-etat/` | une ligne d’état qui lit le modèle, le contexte et les limites d’usage quand ils sont présents, avec un mot pour chaque niveau | `test_ligne_etat.py` (8) | la ligne d’état « lot 3 sur 4 » pendant la vague de courriers ([chapitre 18](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch18)) | le compteur du lot, lu dans le fichier de progression, comme le fait `ligne_etat.py` |
| `mod/` | un mod en lecture seule : un compteur d’appels d’outils et la commande `/bilan-outils` | `test_mod.py` (8) | le bilan des outils employés pendant un lot de la vague ([chapitre 18](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch18)) | rien d’autre que son nom : il ne lit ni n’écrit aucun courrier |

Le total des tests du tableau fait 91. Dans chaque ligne, les données de l’exemple restent les siennes : les pièces de Passerelle se construisent dans les chapitres, sur des courriers `PASS-C-`, jamais sur un vrai courrier.

### H.3 Ce que les exemples prouvent, et ce qu’ils ne prouvent pas

Les tests prouvent le contrat documenté : les formats d’entrée et de sortie, la structure des fichiers. Ils ne prouvent pas le comportement de Claude Code lui-même, et chaque README dit ce qui reste à vérifier en session. Les limites communes, que rappelle `exemples/README.md` :

- **rien ne s’installe tout seul** : les fichiers de configuration s’appellent `exemple.*.json`, et ouvrir le dossier dans Claude Code n’active ni serveur, ni hook, ni réglage. On copie, on relit, puis on active,
- **la sûreté** : le serveur MCP parle en entrée et sortie standard et n’ouvre aucun port. Aucun exemple ne fait d’appel réseau, n’emploie de réseau de diffusion de contenu ni de télémétrie, et aucun ne contient de secret, même factice,
- **les chemins** : relatifs, ou commençant par `~`. Sous Windows, écrivez-les avec `/` dans les commandes des réglages, car Git Bash, quand il est installé, retire les barres obliques inverses,
- **la documentation évolue vite** : avant de recopier un nom de champ dans un vrai projet, relisez la page du jour.

Quatre limites propres à un exemple, à garder en tête :

- **la garde des hooks n’est pas une frontière de sécurité.** Elle reconnaît des textes de commande, et ne voit ni une commande assemblée dans une variable, ni un script qui fait le travail. Elle est en échec fermé : une entrée illisible ou mal formée la fait bloquer, ses tests le prouvent, et son bloc de réglages porte `onFailure: "block"`, qui fait bloquer un hook qui échoue [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks). Elle ne couvre que l’outil `Bash` : l’outil `PowerShell` a son propre nom, et elle ne le voit pas,
- **l’agent n’a pas de plafond de tours.** Son arrêt passe par son brief, avec son critère de fin et son budget ([section 15.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s15-2)). Son moindre privilège vient de son champ `tools`, en liste blanche, pas de ce plafond [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sub-agents),
- **le mod suit une interface qui change vite.** Le 6 novembre 2026, avec Claude Code 2.1.318, `claude plugin test` a passé ses 3 tests, et `claude plugin validate` a passé. Un mod tourne avec vos droits, hors du bac à sable [\[125\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mods-overview),
- **le serveur MCP** n’a ni pagination ni abonnements, et le chargement réel par Claude Code du client et de la ligne d’état n’est pas testé ici.

> **💡 Conseil**
>
> Sur un poste dont les réglages gérés posent `allowManagedHooksOnly`, les hooks, la ligne d’état et le mod de ces exemples ne tournent pas. Les skills, la commande, l’agent, le serveur MCP et les règles de permission restent utilisables [\[32\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings-reference). Vérifiez ce qui s’applique par `/status`, à la ligne `Setting sources`.

### H.4 Faire d’un exemple une pièce de Passerelle

Ce guide propose cinq étapes, dans cet ordre, pour chaque pièce :

1. **copier** le dossier de l’exemple dans le projet de Passerelle, sans toucher à l’original,
2. **remplacer** les données de l’exemple par des données de Passerelle, toutes fictives et préfixées `PASS-`. Un numéro qui ressemblerait à un vrai s’écrit visiblement faux, comme `PASS-NIR-0000-0000`,
3. **adapter** ce que dit la dernière colonne du tableau de la [section H.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-h-2), puis relancer les tests de l’exemple et lire leur sortie,
4. **relire** le fichier de configuration avant de l’activer, comme vous reliriez un script,
5. **prouver** que la pièce agit : un refus constaté pour un hook ou une règle `deny`, une réponse de l’outil pour le serveur, une ligne affichée pour la ligne d’état.

> **⚠️ Attention**
>
> Un hook et un mod s’exécutent avec vos droits, hors du bac à sable [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks) [\[125\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-mods-overview). Avant d’activer une pièce, relisez son code ligne par ligne. N’activez jamais un exemple dont vous ne comprenez pas une commande, et ne lui donnez jamais à lire un vrai courrier.

Bernard, qui suit le chemin avec code, part de `hooks/` pour le hook des numéros, et de `skill/` pour le contrôle des dates. Inès, sans code, part de `commande/` : elle n’en change que le texte. Dans les deux cas, Odile relit les brouillons que ces pièces aident à produire, et décide s’ils servent.

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/#toc)
