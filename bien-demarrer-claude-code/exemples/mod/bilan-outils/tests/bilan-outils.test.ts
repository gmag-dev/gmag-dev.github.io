// SPDX-FileCopyrightText: 2026 Gabrielle Magnan
// SPDX-License-Identifier: MIT
// Tests du mod, pour `claude plugin test` (kit « claude-code/testing », sans session ni réseau).
// Lancer depuis le dossier bilan-outils/ : claude plugin test
import { expect, test } from 'claude-code/testing'

test('/bilan-outils compte les appels par outil', async ($, on) => {
  // Répondre à chaque appel d'outil à la place de Claude Code : aucun outil ne s'exécute.
  on('tool.call', () => ({ result: 'ok' }))

  await $.tool.call({ tool: 'Read', file_path: 'README.md' })
  await $.tool.call({ tool: 'Bash', command: 'ls' })
  await $.tool.call({ tool: 'Read', file_path: 'index.json' })

  const reponse = await $.command.run({ command: 'bilan-outils', args: '' })
  expect(reponse.text).toBe('Appels par outil : Read : 2, Bash : 1')
})

test('sans aucun appel, le bilan le dit', async ($, on) => {
  const reponse = await $.command.run({ command: 'bilan-outils', args: '' })
  expect(reponse.text).toBe("Aucun appel d'outil depuis le chargement du mod")
})

test('le démarrage de session enregistre la commande sans erreur', async ($, on) => {
  // Les deux bouchons que la page « Test a mod » prescrit pour un hook session.start.
  on('session.start', () => ({ cwd: '/work' }))
  on('command.register', () => ({ value: undefined }))
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work' })

  const reponse = await $.command.run({ command: 'bilan-outils', args: '' })
  expect(reponse.text).toBe("Aucun appel d'outil depuis le chargement du mod")
})
