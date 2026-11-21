<!-- SPDX-FileCopyrightText: 2026 Gabrielle Magnan -->
<!-- SPDX-License-Identifier: MIT -->
# Un mod (plugin à module de hooks) : « bilan-outils »

## D'abord, ce qu'est un mod, d'après la doc

Un **plugin** est un dossier de composants que Claude Code charge d'un bloc : skills, agents, hooks, serveurs MCP, avec un manifeste `.claude-plugin/plugin.json`. Un **mod** est un plugin dont le fichier `hooks/hooks.json` porte une clé **`modules`** qui pointe vers un fichier JavaScript ou TypeScript (module ES). Ce fichier exporte `register(on)` ; chaque appel à `on('événement', …)` déclare un gestionnaire, que Claude Code appelle **dans son propre processus** quand l'événement survient. Le gestionnaire peut **observer**, **réécrire** ou **répondre** à la place de Claude Code. Aucun Node.js ni outil de construction : Claude Code charge `.js` et `.ts` directement.

| | Mod | Hook de réglages | Skill | Serveur MCP |
|---|---|---|---|---|
| Ce que c'est | des fonctions dans le processus de Claude Code | une commande lancée sur un événement | des consignes en Markdown | un processus qui donne des outils |
| Peut dessiner dans l'interface | ✅ oui (volet, bande, commande) | ⛔ non | ⛔ non | ⛔ non |
| Quand le choisir | un volet, une commande immédiate, réécrire un événement | bloquer, autoriser, journaliser par un script | des consignes qu'on recolle souvent | atteindre un système externe |

Ce mécanisme est **documenté publiquement** (pages citées plus bas) : l'exemple suit la doc, il n'invente rien. Mais l'API **change vite** : la doc dit elle-même que les fichiers de types que Claude Code écrit pour **votre** version (`.claude-plugin/types/claude-code/index.d.ts`) priment sur toute page, celle-ci comprise.

## Ce que montre l'exemple

```text
bilan-outils/
├── .claude-plugin/
│   └── plugin.json          ← le manifeste : nom, version, description
├── hooks/
│   ├── hooks.json           ← { "modules": ["./register.js"] } : c'est ce qui en fait un mod
│   └── register.js          ← le module de hooks
└── tests/
    └── bilan-outils.test.ts ← tests pour `claude plugin test`
```

`register.js` déclare trois hooks :

| Hook | Ce qu'il fait | Mode |
|---|---|---|
| `session.start` | déclare la commande `/bilan-outils` par `$.command.register` | observe, puis `next(e)` |
| `tool.call` | compte l'appel, par nom d'outil (`e.tool`) | observe, puis `next(e)` |
| `command.run` filtré sur `{ command: 'bilan-outils' }` | rend `{ text: 'Appels par outil : Read : 2, Bash : 1' }` | **répond** (pas de `next`) |

Le mod est **en lecture seule** : il n'appelle qu'une méthode de l'API, `$.command.register`. Ni `$.fs`, ni `$.process`, ni `$.http`, ni `$.model`. C'est vérifiable sans l'exécuter : `claude plugin validate` liste les événements reçus (`hooks:`) et les méthodes appelées (`calls:`).

## Installer et essayer (là où les mods peuvent se charger)

```bash
claude --version                       # 2.1.287 ou plus récent pour les mods dans le terminal
claude plugin validate ./bilan-outils  # attendu : calls: $.command.register, puis « Validation passed »
claude --plugin-dir ./bilan-outils     # charge le mod pour une session, rechargé à chaque sauvegarde
```

Dans la session : demandez quelques lectures de fichiers, puis tapez `/bilan-outils`. `/plugin` (onglet **Installed**) montre les mods chargés. Pour le garder : une place de marché locale, puis `/plugin install bilan-outils@<votre-place-de-marché>` ; une copie installée est mise en cache par version, il faut monter `version` pour qu'une modification arrive.

## Tester

Deux niveaux, qui ne prouvent pas la même chose :

| Commande | Ce qu'elle prouve | Lancée ici ? |
|---|---|---|
| `python -I -B -m unittest discover -s exemples -p "test_*.py"` | La **structure** documentée (`plugin.json`, clé `modules`, export `register`), les règles de l'analyse statique (noms d'événements littéraux, `$` jamais mis dans une variable, pas de `require` ni d'`import()` dynamique), et la **liste blanche** des appels | ✅ oui |
| `claude plugin test` (depuis `bilan-outils/`) | Le **comportement** : le kit `claude-code/testing` envoie de vrais événements dans les hooks, sans session, sans connexion, sans réseau | ✅ oui, le 2026-11-06 (voir ci-dessous) |

### La première exécution de `claude plugin test`

Le fichier `tests/bilan-outils.test.ts` est écrit d'après la page « Test a mod » (mêmes formes d'appel que ses exemples : `$.tool.call({ tool, … })`, `$.command.run({ command, args })`, les deux bouchons prescrits pour `session.start`).

- **Version de Claude Code testée : 2.1.318**, le 2026-11-06, sur une installation sans restriction.
- `claude plugin test exemples/mod/bilan-outils` : **3 tests passent, 0 échec** (`/bilan-outils compte les appels par outil`, `sans aucun appel, le bilan le dit`, `le démarrage de session enregistre la commande sans erreur`).
- `claude plugin validate exemples/mod/bilan-outils` : **validation passée**. Ses contrôles propres au catalogue des plugins (README et licence dans le dossier du plugin, icône) ne concernent qu'une soumission à ce catalogue.
- Le résultat dépend du poste : si les mods ne peuvent pas se charger dans le shell, la commande affiche une ligne commençant par `claude plugin test: hooks modules are turned off` et sort avec le statut 1.

## Limites et sécurité

- ⚠️ **Votre organisation décide.** Si les réglages gérés posent `allowManagedHooksOnly`, les hooks et mods des plugins installés par l'utilisateur sont **bloqués** ; seuls les mods de l'organisation et ceux intégrés à Claude Code tournent. L'option `allowManagedModsOnly` du garde intégré bloque aussi les mods des utilisateurs, et `disableAllHooks` arrête les mods que vous avez installés. Dans ces cas, le reste du plugin (skills, agents, serveurs MCP) se charge quand même.
- **Un mod tourne avec vos droits, sans bac à sable** : il peut lire et écrire vos fichiers, lancer des programmes, faire des requêtes réseau, lire vos variables d'environnement, voir chaque prompt et chaque appel d'outil, et appeler un modèle sur votre forfait. Si le bac à sable est actif, il confine les commandes de Claude, pas un processus lancé par un mod.
- **Avant d'installer le mod de quelqu'un d'autre** : `claude plugin validate ./le-mod`, puis lisez `hooks:` et `calls:`. Méfiance devant `$.http`, `$.process`, `$.model`, `$.env.get`, `$.prompt.submit`, `$.session.send`, et devant un hook qui peut refuser une action sans `.catch` (ligne `gating hook without .catch`) : un hook qui lève une erreur ou dépasse son temps avant d'appeler `next` est **sauté**, et l'action passe comme sans le mod ; une garde doit donc fermer par un `.catch`.
- ⚠️ **Un mod passe devant un `deny`.** Sur une machine sans réglages gérés ni compte Team ou Enterprise, un mod qui répond à `tool.check` peut approuver un appel qu'une règle `deny` refuse. Et `--plugin-dir` recharge le mod à chaque sauvegarde : si Claude réécrivait `register.js`, `hooks/hooks.json` ou `.claude-plugin/plugin.json`, le mod chargerait sans vous le code qu'il vient d'écrire. D'où la règle `deny` `Edit(./exemples/mod/bilan-outils/**)` de [`../reglages/exemple.settings.json`](../reglages/README.md), et la ligne du mod au tableau 17.3 du guide (section 17.2). Modifiez le mod vous-même, dans votre éditeur, puis relisez son diff.
- Un mod ne peut pas changer ce qu'affiche l'**invite de permission**.
- Les mods intégrés à Claude Code (dont un mod de télémétrie actif là où l'analytique est active) ne s'arrêtent ni par `disableAllHooks`, ni par `--bare`, ni par `--safe-mode` ; chacun a son propre interrupteur dans `/plugin`.

## Sources lues le 2026-11-02

- Claude Code, [Plugins overview](https://code.claude.com/docs/en/plugins.md) : ce qu'est un plugin, ses composants, le « hooks module » qui en fait un mod, portées d'installation.
- Claude Code, [Mods overview](https://code.claude.com/docs/en/plugins/mods/overview.md) : définition, exemple complet, où les mods tournent, versions minimales (2.1.287 terminal, 2.1.286 app), ce qu'un mod peut atteindre, `claude plugin validate`, mods intégrés, interrupteurs.
- Claude Code, [Create a mod](https://code.claude.com/docs/en/plugins/mods/create.md) : `plugin.json`, `hooks.json` et sa clé `modules`, `register(on)`, `$.command.register` et `command.run`, `--plugin-dir`, types générés, règles de l'analyse statique, nom en `claude-` refusé, version testée à inscrire dans le README.
- Claude Code, [React to events with a mod](https://code.claude.com/docs/en/plugins/mods/events.md) : observer, réécrire, répondre ; `e.tool` ; filtres ; ordre de la chaîne ; hook qui échoue et `.catch`.
- Claude Code, [Test a mod](https://code.claude.com/docs/en/plugins/mods/test.md) : kit `claude-code/testing`, bouchons, règles du kit, message et statut quand les mods sont coupés.
- Claude Code, [Settings reference](https://code.claude.com/docs/en/settings-reference.md) : *What runs under `allowManagedHooksOnly`*, `disableAllHooks` et les mods.
- Lue le 2026-11-09 : Claude Code, [Configure permissions](https://code.claude.com/docs/en/permissions.md), section « Precedence among rules, hooks, and mods » : sans réglages gérés ni `/login` Team ou Enterprise, un mod qui répond à `tool.check` peut approuver un appel qu'une règle `deny` refuse.
