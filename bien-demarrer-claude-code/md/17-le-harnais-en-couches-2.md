> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.2.2 : « 17. Le harnais en couches », partie 2 sur 2.
>
> - Précédent : [17. Le harnais en couches (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/17-le-harnais-en-couches-1.md)
> - Suivant : [18. Hooks, serveurs MCP, ligne d’état et tâches planifiées (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees-1.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-s17-4>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

### 17.4 La défense par la structure

Ce guide propose un principe, la [défense par la structure](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-defense-par-la-structure) : au lieu d’interdire un geste par un motif de texte, on le rend impossible, ou on le met hors de portée. Chaque couche arrête une partie de ce que les autres laissent passer, et aucune ne suffit seule.

*Dessin : La défense par la structure, appliquée au dossier des pièces de Passerelle. Schéma : la description suit.*

**Figure 17.1 :** La défense par la structure, appliquée au dossier des pièces de Passerelle. En gris la consigne, en bleu ce qui compare un texte, en vert ce qui tient par construction, en tirets le geste d’une personne. Chaque couche arrête une partie de ce que les autres laissent passer. Conception de ce guide, d’après [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permissions), [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing) et [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings).

La même défense, en texte, de la plus fragile à la plus solide :

1. Une consigne de `CLAUDE.md`, que le modèle suit presque toujours.
2. Des règles `deny` sur `Read` et `Edit`, qui arrêtent les outils de fichier et les commandes de fichier reconnues.
3. Un hook avant l’appel d’outil, qui compare un texte comme une règle `deny`.
4. Le bac à sable, qui borne au niveau du système les écritures et le réseau du shell et de ses scripts, et leur lecture là où `denyRead` la refuse.
5. L’organisation du travail : rien de réel dans le dossier, aucun secret sur le poste.
6. Le geste d’une personne : Amadou décide de ce qui entre dans le dossier.

**Tableau 17.5 :** Les mécanismes de la défense par la structure, ce qu’ils garantissent, et leur limite exacte.

| Niveau | Mécanisme | Ce qu’il garantit, et sa limite | Source |
| --- | --- | --- | --- |
| système | bac à sable (`/sandbox`) : écritures et réseau confinés pour les commandes Bash, PowerShell et Monitor et leurs processus enfants, lecture bornée par `denyRead` seulement | une fois actif, et avec `allowUnsandboxedCommands: false`, le confinement de ces commandes tient pour les écritures, et pour les lectures que `denyRead` refuse, même si une [injection de prompt](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-injection-de-prompt) détourne le modèle. Sans cette clé, une commande que le bac à sable bloque peut être relancée hors de lui, sous les seules règles de permission. Pour le réseau, il faut aussi la liste stricte (plus bas). Désactivé par défaut, absent sous Windows natif | [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing) |
| harnais | les deux clés de répertoire de la [section 17.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-1), pour l’écriture et pour la lecture hors des répertoires de travail | les outils de fichier refusent d’agir hors des répertoires de travail, dans tous les modes. Une commande shell n’est pas couverte | [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings) [\[1\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-changelog) |
| harnais | chemins protégés (`.git`, `.claude`, `.mcp.json`, fichiers de démarrage du shell…) | une écriture vous est demandée en mode Manual et en `acceptEdits`, refusée en `dontAsk`, permise en `bypassPermissions`. En mode auto, le classificateur en décide seul, sans vous le demander. En mode plan, elle peut être permise quand `bypassPermissions` est disponible dans le terminal | [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permission-modes) |
| harnais | champ `tools` d’un sous-agent | un relecteur dont le champ `tools` ne liste que `Read`, `Grep` et `Glob` ne peut pas modifier un fichier, quoi qu’il décide. Une liste d’exclusion oublierait un outil, comme PowerShell sous Windows natif | [\[44\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sub-agents) |
| organisation du travail | un worktree par session, aucun secret dans le dossier, aucune clé de production sur le poste | ce qui n’est pas à portée ne peut pas fuir | conception de ce guide |

Un [hook](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-hook) `PreToolUse` complète ces mécanismes, sans en faire partie : votre logique, avant l’exécution, qui ne lève jamais un `deny`, sauf l’exception du mod ([section 17.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-1)). Mais il compare un texte, comme une règle `deny`, si bien qu’une autre forme de la commande peut passer ([chapitre 18](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch18)) [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permissions).

Voici le bac à sable que Bernard ajoute au `.claude/settings.local.json` du poste de la permanence, sous Linux. Sur le portable d’Inès, sous Windows natif, il ne protégerait rien ([section 17.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-5)) :

```json
{
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "autoAllowBashIfSandboxed": false,
    "allowUnsandboxedCommands": false,
    "network": {
      "allowedDomains": []
    },
    "filesystem": {
      "denyRead": ["./pieces"]
    }
  }
}
```

Avec `failIfUnavailable` à `true`, Claude Code refuse de démarrer si le bac à sable ne peut pas démarrer : sans cette clé, les commandes tourneraient hors du bac à sable ([section 17.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-5)) [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing). Avant de compter sur lui pour `pieces/`, vérifiez aussi par `/sandbox` qu’il est actif [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing).

Nouveau · 21 nov. 2026 Depuis la version 2.1.325, une commande confinée par le bac à sable suit par défaut le circuit normal des permissions [\[1\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-changelog). La clé `autoAllowBashIfSandboxed` à `true` choisit l’autre mode : la commande confinée passe alors sans demande, même en mode Manual [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing). Bernard l’écrit à `false`, ce qui vaut aussi sur une version plus ancienne, pour que le shell reste sous la garde d’une personne. Les règles `deny` et les règles `ask` à motif, comme `Bash(git push *)`, restent appliquées, mais une règle `ask` nue sur `Bash` est sautée pour une commande confinée [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permissions).

Avec le bac à sable actif, une connexion du shell vers un hôte absent de `allowedDomains` n’est plus jugée sur le texte de la commande. Selon le mode, elle est demandée (Manual et `acceptEdits`), refusée en `dontAsk`, refusée en mode auto sauf si la commande nomme l’hôte et que le classificateur l’approuve, ou permise (`bypassPermissions`). Pour la refuser dans tous les modes, il faut la liste stricte du bac à sable, `sandbox.network.strictAllowlist`, qui compte aussi les domaines des règles `WebFetch(domain:…)` autorisées, ou une clé des réglages gérés ([section 17.6](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-6)) [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing). La liste stricte se pose dans vos réglages utilisateur, dans les réglages gérés ou par `--settings`, jamais dans le `.claude/settings.json` du dépôt, où elle est sans effet, et elle demande la version 2.1.219 ou plus [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing). C’est ce qui manquait à `Bash(curl *)`. Le bac à sable ne couvre pas pour autant les outils de fichier et de web, `Read`, `Edit`, `Write`, `WebFetch` et `WebSearch`, qui suivent les règles de permission : `denyRead` n’arrête pas `Read`, et `allowedDomains` ne limite pas `WebFetch` [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing). Les deux couches se complètent : chez Passerelle, la règle `deny` arrête l’outil `Read` sur `pieces/`, et `denyRead` arrête le script que le shell lancerait.

### 17.5 Les limites exactes

La défense par la structure n’est solide que si l’on sait exactement ce que chaque mécanisme ne fait pas. Quatre limites comptent plus que les autres :

- **Le bac à sable est désactivé par défaut.** Il faut l’activer par `/sandbox` ou par `sandbox.enabled`. S’il ne peut pas démarrer, les commandes s’exécutent sans lui, sauf si `sandbox.failIfUnavailable` est à `true` : Claude Code refuse alors de démarrer. Il ne confine pas non plus les hooks, les serveurs [MCP](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-mcp) locaux, les serveurs de langage de l’éditeur, la commande de ligne d’état, les moniteurs de greffons ni `apiKeyHelper`, qui tournent avec tous vos droits [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing).
- **Il n’existe pas sous Windows natif.** Le bac à sable fonctionne sous macOS, Linux et WSL2. Sous Windows natif, Claude Code exécute les commandes hors bac à sable, et la documentation renvoie vers WSL2 [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing). Sur ce poste, `sandbox.enabled` ne protège rien.
- **`blockWritesOutsideWorkingDirectories` ne couvre pas le shell.** La clé fait refuser aux outils d’écriture de fichier, `Write`, `Edit` et `NotebookEdit`, tout chemin hors des répertoires de travail, dans tous les modes. Une commande Bash ou PowerShell, elle, peut encore écrire partout où votre compte le peut [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings) [\[1\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-changelog).
- **Les chemins protégés restent modifiables en `bypassPermissions`.** Une écriture dans `.git`, `.claude`, `.mcp.json` ou un fichier de démarrage du shell est demandée en Manual et en `acceptEdits`, soumise au classificateur en mode auto, refusée en mode `dontAsk`, mais permise en mode `bypassPermissions` [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permission-modes). D’où la ligne `"disableBypassPermissionsMode": "disable"` des réglages de Passerelle.

Ce guide en déduit une conséquence pour un poste Windows sans WSL2 : la défense ne repose plus sur le système, mais sur le harnais et sur l’organisation du travail. Puisque les clés de répertoire ne couvrent que les outils de fichier, une commande shell peut lire et écrire partout où le compte le peut. Ce sont alors les règles `ask`, le mode Manual et l’absence de toute donnée sensible sur le poste qui font la différence. Chez Passerelle, le portable d’Inès est sous Windows natif : le dossier `pieces/` n’y existe pas, et elle ne travaille que sur les courriers fictifs du dépôt.

> **⚠️ Attention**
>
> Copier un `settings.json` avec `"sandbox": { "enabled": true }` sur un poste Windows natif, et se croire confiné. Rien ne s’affiche : les commandes s’exécutent simplement hors bac à sable [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing). Vérifiez par `/sandbox` sur votre plateforme avant de compter sur lui, et retirez du poste ce qu’il devait protéger.

### 17.6 Sous des réglages gérés par une organisation

Ce guide décrit Claude Code sans réglages gérés. Les réglages gérés sont pourtant une couche publique des réglages, la plus forte de la précédence ([section 17.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-1)), qu’une organisation déploie sur ses postes, et qu’aucun fichier personnel ne remplace [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings) [\[82\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-managed-settings). Sur une installation sans réglages gérés, rien de ce qui suit ne s’applique, et `/status` montre les sources chargées [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings). Pour qui travaille sur un poste géré, ce qui change tient dans un Conseil.

> **💡 Conseil**
>
> Sur un poste géré, voici ce qui changerait si votre organisation activait telle ou telle clé :
>
> - un `deny` géré ne pourrait être levé par rien, pas même par `--allowedTools` [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-permissions),
> - avec `allowManagedPermissionRulesOnly`, seules les règles de permission des réglages gérés s’appliqueraient, et les vôtres seraient ignorées [\[32\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings-reference),
> - avec `allowManagedHooksOnly`, vos hooks et votre ligne d’état personnelle ne tourneraient plus ([chapitre 18](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch18)) [\[32\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings-reference),
> - avec `allowManagedMcpServersOnly`, seule la liste `allowedMcpServers` des réglages gérés serait retenue, alors que `deniedMcpServers` fusionnerait depuis toutes les sources [\[82\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-managed-settings),
> - avec `allowManagedDomainsOnly`, une connexion du shell vers un hôte hors des domaines autorisés serait refusée dans tous les modes [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing),
> - un mode de départ, que `--permission-mode` peut encore changer pour une session, un plafond d’effort, ou l’interdiction des modes `bypassPermissions` et auto pourraient vous être imposés [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings) [\[82\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-managed-settings).
>
> Dans tous ces cas, ce qui est géré l’emporte, et c’est voulu. Construisez vos contrôles sur ce qui reste disponible : les règles de permission que vous pouvez encore ajouter, un hook git, une étape explicite que vous lancez vous-même. Demandez à l’organisation ce qui manque, plutôt que de chercher un chemin de traverse.

> **📌 À retenir**
>
> Avant de relire la liste, répondez de mémoire, puis vérifiez votre réponse dans la section indiquée :
>
> 1. Dans quel ordre Claude Code évalue-t-il les listes `deny`, `ask` et `allow`, et une règle plus précise gagne-t-elle pour autant ? ([section 17.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-2))
> 2. Pourquoi `/usr/bin/curl https://example.com` échappe-t-il à la règle `Bash(curl *)`, et que devient la commande en mode Manual ? ([section 17.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-3))
>
> - Cinq couches, de la gérée à l’utilisateur, mais les listes fusionnent, et un `deny` de n’importe quelle couche gagne, sauf devant un mod, sur une machine sans réglages gérés ni compte Team ou Enterprise.
> - `deny`, puis `ask`, puis `allow` : la première règle qui correspond décide. Chaque règle large porte sa raison écrite, et chaque changement de réglage sa copie.
> - Une règle `Bash` compare un texte. Le même programme, écrit autrement, lui échappe.
> - La défense par la structure rend le geste impossible : bac à sable, clés de répertoire, champ `tools` en [liste blanche](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-liste-blanche), rien de sensible à portée.
> - Ses limites exactes : bac à sable désactivé par défaut et absent sous Windows natif, clés de répertoire sans effet sur le shell, chemins protégés ouverts en `bypassPermissions`.

> **✏️ Exercice**
>
> **Compétence visée** : régler les permissions d’un projet, constater ce qu’une règle par motif n’arrête pas, et ce que le bac à sable ajoute. Comptez 30 à 45 minutes.
>
> **Où le faire** : dans un environnement jetable seulement, un conteneur ou une machine virtuelle que vous pouvez détruire, avec une copie de Passerelle sans aucun secret. Jamais sur un poste géré, ni contre la politique de votre employeur : l’exercice fait passer volontairement une commande à côté d’une règle.
>
> **Sur Passerelle.** Copiez le bloc `permissions` de la [section 17.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-2) dans `.claude/settings.json`. Lancez Claude Code par `claude --permission-mode manual`, et vérifiez par `/status` que le fichier est chargé. Demandez à Claude de lancer `curl https://example.com` : la règle le refuse. Demandez-lui de lancer `/usr/bin/curl https://example.com` : la règle ne le voit pas, et la commande retombe sur une demande de permission. Refusez-la, et notez ce que vous avez observé. Sous macOS, Linux ou WSL2, ajoutez la partie `sandbox`, vérifiez son état par `/sandbox`, puis refaites l’essai : le bac à sable intercepte la connexion et, en mode Manual, vous demande la permission. Refusez-la, et notez la différence. Sous Windows natif, notez que cette voie n’existe pas, et listez ce qui vous protège à la place.
>
> **Sur votre projet.** Écrivez le tableau « outil, liste, raison » de votre projet, sur le modèle de celui de Passerelle, et faites-le relire par la personne qui décide de ce qui entre dans le dossier.
>
> **Sans code** : sur papier, à partir du bloc `permissions` de la [section 17.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-2), rangez chaque règle dans sa liste, écrivez sa raison, puis dites pour la règle `Bash(curl *)` deux formes de la commande qu’elle n’arrête pas, et la couche qui les arrêterait.
>
> **Critère de réussite** : la sortie de `/status` qui montre le fichier chargé, vos notes des deux essais, le refus de la règle, puis la demande de permission, et, sur un système qui l’a, la différence avec le bac à sable. Votre tableau des permissions, relu. Par le chemin sans code : chaque règle du bloc rangée dans sa liste avec sa raison écrite, deux formes de la commande que `Bash(curl *)` n’arrête pas, et la couche qui les arrêterait.
>
> **Pour vous corriger**, sans corrigé : relisez votre travail contre ces cinq points. Chacun se voit dans ce que vous avez écrit ou obtenu.
>
> 1. Vos notes séparent les deux essais : `curl https://example.com` refusé par la règle, puis `/usr/bin/curl https://example.com`, qui ne correspond plus au motif et retombe sur une demande de permission, que vous avez refusée ([section 17.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-3)).
> 2. Sous macOS, Linux ou WSL2, l’état du bac à sable est vérifié par `/sandbox` avant le dernier essai, et vos notes disent ce qu’il a intercepté. Sous Windows natif, votre liste nomme ce qui protège à la place : les règles `ask`, le mode Manual et l’absence de toute donnée sensible sur le poste ([section 17.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-5)).
> 3. Chaque règle de votre tableau porte sa raison écrite : une règle `allow` large sans raison écrite ne passe pas la relecture ([section 17.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-2)).
> 4. Chaque règle `allow` du shell est la plus petite qui couvre sa commande, et aucune ne lance un fichier que Claude peut écrire, comme un script du dossier ou une suite de tests ([section 17.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-2)).
> 5. Votre tableau a été relu par la personne qui décide de ce qui entre dans le dossier, et ce qui doit être impossible n’y repose pas sur une seule règle `deny` par motif : chaque couche arrête une partie de ce que les autres laissent passer, et aucune ne suffit seule ([section 17.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-4)).
>
> Par le chemin sans code, appliquez le troisième point à chaque règle du bloc, et vérifiez vos deux formes contre le tableau 17.4 : la couche que vous nommez ne doit pas comparer un texte, comme le fait la règle ([section 17.4](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-4)).

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/#toc)

![Illustration : la personne en long manteau violet et son petit compagnon de cristal cyan, dans une salle de contrôle aux horloges flottantes et au ruban d’état lumineux, où des câbles de lumière relient un pupitre à des tours lointaines.](https://gmag-dev.github.io/bien-demarrer-claude-code/images/5ddb5fdfc4cd.avif)
