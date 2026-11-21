// SPDX-FileCopyrightText: 2026 Gabrielle Magnan
// SPDX-License-Identifier: MIT
// Mod « bilan-outils » : compte les appels d'outils de Claude, par nom d'outil,
// et ajoute la commande /bilan-outils qui affiche le bilan.
//
// Il n'appelle qu'une méthode de l'API des mods, $.command.register : aucun fichier,
// aucun processus, aucun réseau, aucun appel de modèle. `claude plugin validate` doit
// donc lister une seule ligne « calls: $.command.register ».

// Le compte, partagé par les hooks ci-dessous. Il repart de zéro à chaque rechargement.
const parOutil = new Map()

// Claude Code appelle cette fonction une fois, quand le mod se charge.
export function register(on) {
  // Au démarrage de la session (et à chaque rechargement du mod) : déclarer la commande.
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'bilan-outils',
      description: "Affiche le nombre d'appels de chaque outil depuis le chargement du mod",
    })
    // Laisser la session démarrer normalement.
    return next(e)
  })

  // Chaque fois que Claude s'apprête à utiliser un outil : observer, compter, laisser passer.
  on('tool.call', async ($, e, next) => {
    parOutil.set(e.tool, (parOutil.get(e.tool) ?? 0) + 1)
    return next(e)
  })

  // Quand la personne tape /bilan-outils : répondre à la place de Claude Code (pas de next).
  on('command.run', { command: 'bilan-outils' }, async () => {
    if (parOutil.size === 0) {
      return { text: "Aucun appel d'outil depuis le chargement du mod" }
    }
    const lignes = [...parOutil.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([outil, nombre]) => outil + ' : ' + nombre)
    return { text: 'Appels par outil : ' + lignes.join(', ') }
  })
}
