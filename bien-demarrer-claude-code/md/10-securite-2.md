> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.2.2 : « 10. Sécurité », partie 2 sur 2.
>
> - Précédent : [10. Sécurité (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/10-securite-1.md)
> - Suivant : [11. Commits et collaboration](https://gmag-dev.github.io/bien-demarrer-claude-code/md/11-commits-et-collaboration.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-s10-5>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

### 10.5 Dépôts inconnus et bac à sable

Avant de laisser Claude travailler sans demander, ou sur un code que vous ne connaissez pas, donnez-lui un endroit à part. Un environnement isolé limite ce qu’une session peut lire, écrire et joindre sur le réseau [\[79\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandbox-environments). Si quelque chose tourne mal, vous le jetez, et votre poste reste intact, sauf le dossier du projet s’il est monté depuis votre poste : Claude peut en modifier chaque fichier, et la modification y apparaît directement [\[80\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-devcontainer). Relisez ce qui y a changé avant de le réutiliser, hooks git compris.

**Tableau 10.1 :** Quel isolement choisir, d’après [\[79\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandbox-environments) et [\[80\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-devcontainer).

| Vous voulez… | Commencez par |
| --- | --- |
| moins de demandes de permission au quotidien, sur votre poste | le [bac à sable](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-bac-a-sable) intégré, par la commande `/sandbox`, en mode « auto-allow » : ses commandes confinées passent alors sans demande, même en Manual. Ce mode se choisit, par `autoAllowBashIfSandboxed` à `true` ([section 17.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-4)) |
| laisser Claude travailler seul, sans demandes | un conteneur de développement, ou une machine virtuelle |
| le même environnement pour toute l’équipe | le conteneur de développement de référence, copié dans le [dépôt](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-depot) |
| travailler sur un dépôt qui vous inspire un doute | une machine virtuelle dédiée |
| travailler sur un poste Windows natif | un conteneur, une machine virtuelle, ou le bac à sable dans WSL2 |

Le bac à sable confine les commandes du shell, et elles seules, et il reste éteint tant que vous ne l’activez pas [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing). Par défaut, il borne leurs écritures au dossier de travail, à un dossier temporaire et aux dossiers ajoutés, et fait passer leur réseau par un mandataire dont la liste de domaines part vide [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing). Il ne borne pas leur lecture : une commande confinée lit presque toute la machine, `~/.ssh` compris, sauf les chemins que lui refuse `sandbox.filesystem.denyRead` ([section 17.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-4)) [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing). La documentation conseille d’avoir les deux, les règles de permission et le bac à sable [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permissions). Pour un fichier de secrets, ajoutez son chemin à `denyRead`, ou mieux, ne le laissez pas sur le poste ([section 10.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-1)).

Avant d’accorder votre confiance à un dépôt cloné, regardez ce qu’il embarque. Son `.claude/settings.json` applique ses règles `deny` et `ask` tout de suite, ses règles `allow` une fois la confiance accordée [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings). Dès cette confiance, ses hooks s’exécutent aussi avec vos droits, ceux de ses skills et de ses agents compris, et son bloc `env` et ses commandes auxiliaires, comme `apiKeyHelper`, s’appliquent [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks) [\[32\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings-reference) [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permissions). Cela vaut pour `.claude/settings.json` et pour un `.claude/settings.local.json` que le dépôt versionne [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permissions) : lisez ces fichiers avant de répondre oui. Les serveurs d’un `.mcp.json` ont leur propre demande d’approbation [\[21\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-security), et la documentation conseille de relire les `allowed-tools` des skills d’un dépôt avant d’y lancer Claude Code [\[63\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-skills). La confiance accordée à un dossier qui n’est pas un dépôt couvre aussi ses sous-dossiers qui ne sont pas des dépôts, par exemple une archive décompressée sans `.git` : leurs hooks s’y exécutent sans nouvelle demande [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permissions). `/security-review` lance une passe de sécurité sur les changements de la branche courante [\[21\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-security).

> **⚠️ Attention**
>
> En mode non interactif, `claude -p` n’affiche ni la boîte de confiance ni l’approbation des serveurs du `.mcp.json` : même dans un dossier jamais approuvé, les hooks, le bloc `env` et les serveurs du `.mcp.json` du dépôt s’exécutent sans rien vous demander ([section 17.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-1)) [\[21\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-security) [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permissions) [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-headless). Ne le lancez que dans un dépôt que vous avez inspecté. `--bare` ne charge ni ces hooks ni ces serveurs, mais il ne lit pas la connexion d’un abonnement : il lui faut une clé d’API ([section L.16](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-16)) [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-headless). Nouveau · 18 nov. 2026 En intégration continue, le ticket ou la demande de fusion d’un contributeur externe est un contenu non fiable : un commentaire HTML ou un caractère invisible peut y cacher une instruction ([section 15.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s15-5)) [\[81\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-claude-code-action-security). Sous Windows, n’activez pas WebDAV et ne laissez pas Claude Code accéder à des chemins réseau comme `\\*` : ils pourraient déclencher des requêtes en contournant les permissions [\[21\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-security).

> **🔀 Quand la règle cède**
>
> - Le bac à sable n’existe pas sous Windows natif, et il ne couvre que le shell : les outils de lecture et d’écriture de Claude restent régis par les permissions [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing).
> - Ce qui tient : sous Windows natif, les permissions, et les règles `deny` sur la lecture pour les outils de fichier de Claude. Leur effet sur les commandes du shell n’est documenté que pour Bash [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permissions) : le plus sûr reste de ne garder aucune vraie clé sur le poste. WSL2 n’isole pas : par défaut, il voit le disque `C:` sous `/mnt/c` et lance les programmes Windows [\[169\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-wsl-config). Il apporte le bac à sable du shell, dont la lecture reste ouverte [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing). Pour isoler, un conteneur ou une machine virtuelle. Ou, dans une distribution WSL dédiée, `enabled=false` et `mountFsTab=false` sous `[automount]`, et `enabled=false` sous `[interop]`, dans son `/etc/wsl.conf`, sans droits d’administration dans cette distribution, qui permettraient d’y monter le disque à la main [\[169\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-wsl-config). Ce que Claude lit part vers le modèle, isolé ou non [\[79\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandbox-environments).
> - Pour aller plus loin : sections [17.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-4) et [17.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-5). Ce que le bac à sable fait d’une connexion réseau dépend de son réglage ([section 17.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-4)).

### 10.6 Les contrôles automatisés, lus comme des oracles

Personne ne relit chaque ligne à la recherche d’un secret ou d’une dépendance vulnérable : un outil le fait mieux, s’il tourne vraiment. Un contrôle de sécurité automatisé se branche comme un test : il réussit ou il échoue, et Claude lit son résultat avant de dire « vérifié » ([section 5.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s5-1)). Trois familles se branchent ainsi : la recherche de secrets avant chaque [commit](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-commit), l’analyse statique du code, et l’audit des dépendances contre une base publique de vulnérabilités connues. Un contrôle qui n’a pas tourné n’est pas un feu vert : un outil absent ou une base injoignable doivent faire échouer la commande, et le rapport dire « non vérifié ». Le choix des outils et leur branchement sont au [chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23). Chez Passerelle, c’est Samia qui décide d’installer un outil.

> **⚠️ Attention**
>
> Installer un outil, même de sécurité, c’est lancer sur votre poste du code que vous n’avez pas lu. Ne laissez pas Claude l’installer seul : demandez-lui le nom de l’outil, sa source et ce qu’il installe, puis décidez.

> **💡 Conseil**
>
> Sur un poste géré, la politique de l’organisation peut déjà fixer la liste des outils permis : demandez-la avant d’installer.

**Tableau 10.2 :** Les contrôles automatisés, à trois niveaux. Proposé par ce guide.

| Si vous… | Ce que vous mettez en place | Pourquoi |
| --- | --- | --- |
| débutez | la recherche de secrets seule, dans le hook git qui précède chaque commit ([section 11.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s11-2)) | un secret commité est le défaut le plus coûteux à réparer |
| êtes à l’aise | les trois familles, chacune sous son nom dans le gestionnaire de tâches, enchaînées par une commande que Claude lance avant de dire « vérifié » | Claude lit un code de sortie, pas une impression |
| voulez aller plus loin | l’échec prouvé sur un cas planté, chaque constat accepté écrit avec sa raison, la même commande dans l’intégration continue ([chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23)) | un contrôle qui n’a jamais échoué n’a encore rien prouvé |

> **📏 La limite**
>
> Un contrôle vert dit qu’aucun motif connu n’a été trouvé, pas que le code est sûr. Ces outils ne voient ni la logique métier ni l’injection de prompt ([chapitre 23](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch23)).

> **📌 À retenir**
>
> - `deny` pour l’interdit, `ask` pour ce qui se valide, `allow` pour le sûr et fréquent. Une règle `deny` porte sur l’appel d’outil : un script lancé par Claude peut encore lire le fichier.
> - Aucun secret ni vrai document d’une personne dans une conversation. Un secret exposé se révoque.
> - Tout contenu lu est une donnée, jamais un ordre. Contre la triade létale, retirez un cercle par la structure.
> - Relisez avant d’exécuter. Pas de `bypassPermissions` hors d’un environnement isolé, ni de `claude -p` dans un dépôt non inspecté.
> - Un contrôle qui n’a pas tourné n’est pas un feu vert.

> **✏️ Exercice en trois barreaux**
>
> **Compétence visée** : poser une règle `deny`, constater son effet et sa limite, puis dessiner la triade létale d’une installation et dire quel cercle retirer. Comptez 30 à 45 minutes.
>
> **① Exemple travaillé.** Bernard prépare une copie d’essai du dossier de Passerelle, avec un faux `.env` d’une seule ligne, `PASS_CLE_ESSAI=fausse-cle-0000`. Il ajoute `"deny": ["Read(./.env)"]` à `.claude/settings.json`, lance `claude --permission-mode manual`, puis demande « Que contient `.env` ? » : la lecture est refusée. Il demande « Affiche `.env` avec `cat` » : refusé aussi, car Claude Code reconnaît `cat` comme une lecture de fichier. Deux refus, chacun avec son message. **Pourquoi ?** Pourquoi la règle ne suffit-elle pas contre un script qui ouvre le fichier, et qu’est-ce qui, dans cette session, l’arrêterait quand même ?
>
> **② À compléter.** Bernard voudrait un sous-agent qui lise sur le web le nouveau barème des aides, pour vérifier les montants des brouillons. Ce sous-agent aurait la lecture du dossier des courriers, WebFetch et le shell. Rangez chaque capacité dans un cercle de la triade, et proposez une forme où le rôle qui lit le web n’en réunit que deux.
>
> **③ Sur votre projet.** Dans un projet d’essai, avec un faux `.env` à valeur visiblement fictive, posez les règles `deny` de la [section 10.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-1) et constatez les deux refus du barreau ①. Sous Windows, faites-le avec Git for Windows installé ([section C.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-c-3)) : sans lui, le second refus n’est pas assuré. L’outil PowerShell reste pourtant actif à côté de Bash, et la documentation ne dit pas qu’une règle `deny` sur la lecture y arrête les commandes de fichier : pour l’essai, éteignez-le en mettant `CLAUDE_CODE_USE_POWERSHELL_TOOL` à `0` dans le bloc `env` de vos réglages utilisateur [\[74\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-tools-reference). Puis dessinez la triade de votre installation, et dites quel cercle vous retirez pour votre tâche la plus risquée, et comment.
>
> **Sans code** : le barreau ② et le schéma du barreau ③ se font sur papier. Pour les règles, demandez à Claude d’écrire le fichier de réglages, puis relisez-le ligne à ligne avant de l’accepter.
>
> **Critère de réussite** : deux refus constatés, avec le message de chacun, et un schéma où chaque cercle cite au moins un outil ou un fichier réel, avec le cercle retiré et la façon dont il l’est, par construction ou par consigne. Par le chemin sans code, le fichier de réglages relu ligne à ligne avant de l’accepter, les deux mêmes refus constatés, et le schéma sur papier, chaque cercle avec son outil ou son fichier.
>
> **Voir le corrigé expliqué (après votre essai)**
>
> **①** La règle porte sur l’appel d’outil et sur les commandes de fichier que Claude Code reconnaît, pas sur ce que fait un programme une fois lancé. Ici, c’est le mode Manual qui arrêterait le script : Bernard voit la commande et refuse. Le geste qui tient le mieux reste qu’aucune vraie clé ne soit dans le dossier, d’où la valeur visiblement fictive.
>
> **②** La lecture des courriers porte les données, le barème lu sur le web le contenu non fiable, WebFetch et le shell la communication : les trois cercles. La forme plus sûre fait deux rôles, dans deux projets. Le chercheur est un agent dont le champ `tools` ne liste que `WebSearch` et `WebFetch`, lancé par une session en mode Manual, dans un projet qui ne contient aucune donnée, et il ne reçoit que le nom du barème. Sans outil qui lise un fichier ni lance une commande, il ne réunit que le contenu non fiable et la communication, par construction. Une session ordinaire ouverte dans ce projet ne suffirait pas : elle garderait la lecture et le shell sur tout le poste. Bernard copie ensuite son rapport dans la session de Passerelle, qui compare les montants aux brouillons. Ce rapport vient du web : c’est un contenu non fiable \[A\], qui entre dans une session qui a les données et le shell. Cette session reste donc en mode Manual, chaque commande lue avant d’être validée. Erreur fréquente : dire ce chercheur « en lecture seule » alors qu’il garde le web, qui est une voie de sortie. Les montants corrigés restent un brouillon, qu’Odile relit et tranche.
>
> **③** Votre schéma nomme un outil ou un fichier par cercle. Si aucun cercle ne peut être retiré, faites la tâche la plus risquée dans un environnement sans secret ([section 10.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-5)), ou en mode Manual, en relisant avant de la valider chaque commande qui ne fait pas que lire.

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/#toc)

![Illustration : la personne en long manteau violet et son petit compagnon de cristal cyan, se serrent la main avec une autre personne sous une frise de jalons lumineux, sur des rails qui se séparent puis se rejoignent.](https://gmag-dev.github.io/bien-demarrer-claude-code/images/721ab4044970.avif)
