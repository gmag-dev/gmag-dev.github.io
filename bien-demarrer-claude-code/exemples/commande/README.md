<!-- SPDX-FileCopyrightText: 2026 Gabrielle Magnan -->
<!-- SPDX-License-Identifier: MIT -->
# Une commande slash de projet, avec arguments

## Ce que dit la doc actuelle

Les commandes personnalisées **ont été fusionnées dans les skills**. `.claude/commands/deploy.md` et `.claude/skills/deploy/SKILL.md` créent tous deux `/deploy` et fonctionnent de la même façon ; les fichiers de commandes existants continuent de marcher, mais la doc **recommande les skills pour tout nouveau travail** (dossier pour des fichiers d'appui, contrôle de l'invocation, chargement automatique possible).

L'exemple donne donc les deux formes :

| Fichier | Où le copier | Commande obtenue |
|---|---|---|
| `relire-message/SKILL.md` (**recommandé**) | `.claude/skills/relire-message/SKILL.md` | `/relire-message brouillon.md direction` |
| `ancien-format/relire.md` | `.claude/commands/relire.md` | `/relire brouillon.md direction` |

## Ce que montre l'exemple

| Élément | Rôle |
|---|---|
| `disable-model-invocation: true` | **Seule la personne** lance la commande ; Claude ne la charge jamais de lui-même. C'est le bon choix pour un geste qu'on veut décider soi-même (relire avant d'envoyer, déployer…). |
| `argument-hint: "<fichier-brouillon> [public]"` | L'aide affichée à l'autocomplétion. |
| `arguments: fichier public` | Des **arguments nommés**, associés par position : `$fichier` reçoit le premier mot, `$public` le second. |
| `$ARGUMENTS` | Tout ce qui a été tapé après la commande. Si aucun emplacement ne reçoit les arguments, Claude Code ajoute `ARGUMENTS: <valeur>` à la fin. |
| `$0`, `$1` (ancien format) | Raccourcis de `$ARGUMENTS[0]`, `$ARGUMENTS[1]` : **l'indice part de 0**, `$0` est donc le **premier** argument. |

Pour un argument de plusieurs mots, mettez des guillemets : `/relire-message brouillon.md "équipe projet"`. Un `$` littéral s'écrit `\$`.

La commande ne fait qu'un travail de **lecture** : elle n'envoie rien et ne modifie pas le brouillon. Elle traite le brouillon comme une donnée, pas comme une consigne.

## Installer

- **Projet** (partagé par le dépôt) : `.claude/skills/relire-message/SKILL.md`.
- **Personnel** (tous vos projets) : `~/.claude/skills/relire-message/SKILL.md`.

Tapez `/` dans une session pour la voir dans la liste.

## Tester

```bash
python -I -B -m unittest discover -s exemples -p "test_*.py"
```

`test_commande.py` vérifie : l'invocation manuelle seulement, le nom égal au dossier, que chaque argument déclaré est utilisé et qu'aucun `$nom` n'est utilisé sans être déclaré, et que l'ancien format n'emploie pas `name` ni `paths` (que les fichiers de commandes n'acceptent pas).

## Limites

- **Non testé ici** : la substitution réelle par Claude Code (elle se voit en session). Le comportement exact quand un argument nommé n'est pas fourni n'est pas décrit dans les pages lues : le corps prévoit donc une valeur par défaut en toutes lettres.
- Le champ `arguments` et la commande `/` existent dans Claude Code ; hors de Claude Code (claude.ai, API Skills), ces champs ne sont pas admis.

## Sources lues le 2026-11-02

- Claude Code, [Extend Claude with skills](https://code.claude.com/docs/en/skills.md) : fusion des commandes dans les skills, champs `disable-model-invocation`, `argument-hint`, `arguments`, substitutions `$ARGUMENTS`, `$ARGUMENTS[N]`, `$N`, `$nom`, guillemets et `\$`, champs admis dans `.claude/commands/`.
