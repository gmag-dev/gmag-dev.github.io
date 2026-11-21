<!-- SPDX-FileCopyrightText: 2026 Gabrielle Magnan -->
<!-- SPDX-License-Identifier: MIT -->
# Ligne d'état en Python (bibliothèque standard)

## Ce que montre l'exemple

`ligne_etat.py` lit le JSON que Claude Code envoie sur stdin et affiche **une ligne** :

```text
Opus | projet | contexte 8 % ok | 5 h 24 % ok (remise 17:00) | 7 j 91 % critique (remise 06/02 17:00)
```

| Segment | Champ lu | Quand il manque |
|---|---|---|
| Modèle | `model.display_name`, sinon `model.id` | « Claude » |
| Dossier | `workspace.current_dir`, sinon `cwd` (nom du dossier seulement) | omis |
| Contexte | `context_window.used_percentage` | « contexte — » (la doc : peut être `null` en début de session) |
| 5 h | `rate_limits.five_hour.used_percentage`, `resets_at` (secondes Unix) | omis |
| 7 j | `rate_limits.seven_day.used_percentage`, `resets_at` | omis |

- **Chaque niveau a son mot** : `ok` (moins de 70 %), `attention` (70 à 90 %), `critique` (90 % et plus) : des valeurs d'exemple, à calibrer. La couleur (`--couleur`, ignorée si `NO_COLOR` est défini) ne fait que doubler le mot, jamais le remplacer.
- **`rate_limits` est souvent absent** : la doc dit qu'il n'apparaît que pour les abonnés Pro, Max et Ultra (ou derrière une passerelle qui fixe un plafond de dépense), seulement après la première réponse de l'API, que chaque fenêtre peut manquer seule, et que Claude Code retire une fenêtre dès que son `resets_at` est passé.
- **La largeur** vient de la variable `COLUMNS`, que Claude Code fixe avant de lancer le script (un script ne peut pas lire la taille du terminal lui-même).
- **Jamais de plantage** : une entrée illisible donne `Claude | état indisponible`.

## Installer

1. Copiez `ligne_etat.py` dans `~/.claude/ligne_etat.py`.
2. Ajoutez le bloc de `exemple.settings.json` à vos réglages utilisateur, `~/.claude/settings.json`, le fichier que ses deux règles protègent :

   ```json
   {
     "statusLine": {
       "type": "command",
       "command": "python -I -B ~/.claude/ligne_etat.py",
       "padding": 0,
       "refreshInterval": 60
     },
     "permissions": {
       "ask": ["Edit(~/.claude/ligne_etat.py)", "Edit(~/.claude/settings.json)"]
     }
   }
   ```

   - **Les deux règles `ask`** : la ligne lance son script à chaque mise à jour, sans rien demander, avec tous vos droits, hors du bac à sable. Si Claude réécrivait le script ou le fichier qui le déclare sans que vous le voyiez, elle lancerait sans vous le code qu'il vient d'écrire. Ces deux règles font demander votre accord avant chaque écriture de l'un ou de l'autre, même en mode auto (tableau 17.3 du guide, section 17.2) : lisez le changement, puis acceptez ou refusez. Un `deny` empêcherait `/statusline`, qui écrit un script dans `~/.claude/` et met à jour vos réglages. Si le fichier a déjà un objet `"permissions"`, ajoutez-y ces deux règles au lieu d'en coller un second. Si vous déclarez plutôt la ligne dans les réglages d'un projet, la règle sur `~/.claude/settings.json` ne protège plus le bon fichier : visez alors celui du projet.
   - `refreshInterval` (secondes, minimum 1) relance le script même quand la session est inactive : utile pour une heure de remise. Sans lui, le script ne tourne que sur événement (nouveau message, fin de `/compact`, changement de mode…), avec un anti-rebond de 300 ms.
   - **macOS et Linux** : la commande s'appelle souvent `python3` ; écrivez alors `python3 -I -B ~/.claude/ligne_etat.py`.
   - **Windows** : Claude Code passe la commande par Git Bash s'il est installé, sinon par PowerShell. Git Bash traite les `\` comme des caractères d'échappement : écrivez les chemins avec des `/`, ou avec `~`, qui désigne votre dossier personnel. La doc montre `~` avec Git Bash ; sans Git Bash, la commande passe par PowerShell, où ce cas n'a pas été vérifié ici : écrivez alors le chemin complet, comme `C:/Users/<vous>/.claude/ligne_etat.py`.

Claude Code recharge les réglages tout seul ; la ligne apparaît au prochain événement.

## Tester

```bash
python -I -B -m unittest discover -s exemples -p "test_*.py"
```

`test_ligne_etat.py` envoie l'extrait du **schéma complet** de la doc, l'entrée minimale que la doc propose pour un essai, un début de session (`used_percentage: null`, pas de `rate_limits`), une seule fenêtre présente, une entrée illisible, une largeur de 30 colonnes, et vérifie que la couleur est toujours doublée d'un mot.

Un essai à la main :

```bash
echo '{"model":{"display_name":"Opus"},"workspace":{"current_dir":"/home/user/project"},"context_window":{"used_percentage":25},"session_id":"test-session-abc"}' | python -I -B ligne_etat.py
```

## Limites

- ⚠️ **Votre organisation peut l'éteindre.** Si les réglages gérés posent `allowManagedHooksOnly`, la ligne d'état personnalisée **disparaît sans avertissement** : seule une `statusLine` des réglages gérés s'exécute. `disableAllHooks` (hors réglages gérés) a le même effet. Vérifiez par `/status`, ligne `Setting sources`.
- La page lue décrit la ligne d'état dans l'interface du terminal. Son affichage dans le panneau graphique de l'extension VS Code ou dans l'app de bureau n'a pas été vérifié ici : ne comptez pas sur elle là-bas sans essai.
- `cost.total_cost_usd` est une estimation au prix catalogue (sauf table `modelPricing`), pas la facture : l'exemple ne l'affiche pas.
- La ligne `$schema` sert à l'éditeur ; il peut la télécharger : retirez-la sur un poste hors ligne.
- **Non testé ici** : le rendu dans un vrai terminal Claude Code (cela demanderait de modifier une configuration réelle).

## Sources lues le 2026-11-02

- Claude Code, [Customize your status line](https://code.claude.com/docs/en/statusline.md) : bloc `statusLine` (`type`, `command`, `padding`, `refreshInterval`), déclencheurs et anti-rebond, sortie (lignes multiples, ANSI, liens), `COLUMNS`, tableau des champs et schéma complet, champs absents ou `null`, configuration Windows, dépannage (`disableAllHooks`, `allowManagedHooksOnly`).
- Claude Code, [Settings reference](https://code.claude.com/docs/en/settings-reference.md), section *What runs under `allowManagedHooksOnly`*.
- Lues le 2026-11-09 : Claude Code, [Customize your status line](https://code.claude.com/docs/en/statusline.md) (« Claude Code generates a script file in `~/.claude/` and updates your settings automatically », et la clé `statusLine` admise dans les réglages utilisateur ou de projet) ; [Permission modes](https://code.claude.com/docs/en/permission-modes.md) (« Explicit ask rules still force a prompt » en mode auto).
