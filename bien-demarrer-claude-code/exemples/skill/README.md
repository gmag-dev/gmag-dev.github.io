<!-- SPDX-FileCopyrightText: 2026 Gabrielle Magnan -->
<!-- SPDX-License-Identifier: MIT -->
# Un skill complet : « résumer un journal de tests »

## Ce que montre l'exemple

```text
resumer-journal-tests/
├── SKILL.md                  ← le point d'entrée : frontmatter + étapes courtes
├── references/
│   └── formats.md            ← chargé seulement quand il sert
└── scripts/
    └── resumer_journal.py    ← exécuté, jamais chargé dans le contexte
```

| Élément | Ce qu'il illustre |
|---|---|
| `name` | Le nom de la commande `/resumer-journal-tests` ; par défaut, c'est le nom du dossier. Le test vérifie qu'ils sont égaux. |
| `description` | Ce que fait le skill **et quand l'utiliser**, cas principal en premier : c'est le seul texte que Claude voit en permanence pour décider de charger le skill. La liste des skills tronque `description` + `when_to_use` à **1 536 caractères**. |
| `argument-hint` | L'aide affichée à l'autocomplétion : `[chemin-du-journal]`. |
| `$ARGUMENTS` | Remplacé par ce que l'utilisateur tape après `/resumer-journal-tests`. |
| `${CLAUDE_SKILL_DIR}` | Le dossier du `SKILL.md` : le script se trouve quel que soit le dossier courant. |
| `references/formats.md` | Le détail, sorti du corps : chargé à la demande (« divulgation progressive »). La doc conseille un `SKILL.md` de moins de 500 lignes. |
| `scripts/resumer_journal.py` | Le travail déterministe (compter, extraire) fait par du code plutôt que par le modèle ; il traite le journal comme une **donnée non fiable**. |

Le skill **n'a pas de `allowed-tools`** : ce champ accorde des outils **sans demande** pendant le tour où le skill s'exécute. Pour un exemple destiné à des débutants, la demande de permission avant `python` reste visible ; ajoutez-le seulement quand vous savez ce que vous accordez.

## Installer

Copiez le dossier `resumer-journal-tests/` (pas ce README) dans l'un de ces emplacements :

| Emplacement | Portée |
|---|---|
| `~/.claude/skills/resumer-journal-tests/` | Vous, dans tous vos projets |
| `.claude/skills/resumer-journal-tests/` à la racine d'un projet | Toute l'équipe, si le dossier est versionné |

Puis, dans une session : `/resumer-journal-tests chemin/du/journal.txt`, ou simplement « résume ce journal de tests », et Claude charge le skill de lui-même grâce à la description.

## Tester

```bash
python -I -B -m unittest discover -s exemples -p "test_*.py"
```

`test_resumer_journal.py` teste le script sur des journaux unittest (vert et rouge) et pytest, le format inconnu (code 2), la lecture sur stdin, et vérifie qu'une phrase « injectée » dans le journal ne ressort pas dans le résumé. Il vérifie aussi la forme du `SKILL.md` : nom égal au dossier, longueur de la description, liens et script présents, moins de 500 lignes.

Le script se lance aussi seul :

```bash
python -I -B resumer-journal-tests/scripts/resumer_journal.py journal.txt
python -I -B resumer-journal-tests/scripts/resumer_journal.py journal.txt --json
```

## Limites

- Deux formats seulement (unittest, pytest) ; les autres sortent en code 2, et le skill demande alors un résumé manuel annoncé comme tel.
- **Non testé ici** : le déclenchement par Claude (que la description fasse charger le skill au bon moment). Cela se vérifie en session, par quelques demandes réelles, et par `/skills` pour voir le coût en contexte.
- Les champs `name`, `description`, `argument-hint` sont reconnus par Claude Code. Hors de Claude Code (téléversement sur claude.ai, API Skills), seuls `name`, `description`, `license`, `compatibility`, `metadata` et `allowed-tools` sont admis : `argument-hint` y provoquerait une erreur.

## Sources lues le 2026-11-02

- Claude Code, [Extend Claude with skills](https://code.claude.com/docs/en/skills.md) : emplacements, champs du frontmatter, limite de 1 536 caractères, substitutions `$ARGUMENTS`, `$N`, `$nom`, `${CLAUDE_SKILL_DIR}`, fichiers d'appui, conseil des 500 lignes, champs admis hors de Claude Code.
