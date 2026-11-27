> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.5.0 : « 18. Hooks, serveurs MCP, ligne d’état et tâches planifiées », partie 2 sur 2.
>
> - Précédent : [18. Hooks, serveurs MCP, ligne d’état et tâches planifiées (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees-1.md)
> - Suivant : [19. Plusieurs sessions en parallèle](https://gmag-dev.github.io/bien-demarrer-claude-code/md/19-plusieurs-sessions-en-parallele.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#h-s18-4>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

### 18.4 La ligne d’état et ses champs

La ligne d’état sert à voir en permanence où vous en êtes, sans taper `/usage`. C’est une commande que Claude Code lance, et à laquelle il envoie sur son entrée un objet JSON qui décrit la session. La commande affiche une ligne [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-statusline). C’est l’accès documenté aux métadonnées de la session et aux limites du forfait ([tableau 18.3](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#tab-18-3)).

**Tableau 18.3 :** Les champs de la ligne d’état utiles au pilotage, d’après [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-statusline).

| Champ | Ce qu’il donne, et quand il manque |
| --- | --- |
| `model.display_name`, `model.id` | le modèle de la session |
| `workspace.current_dir` | le dossier courant de la session |
| `context_window.used_percentage` | la part de la fenêtre de contexte utilisée, qui peut valoir `null` en début de session |
| `rate_limits.five_hour.used_percentage` et `resets_at` | l’usage de la fenêtre de cinq heures, de 0 à 100, et l’heure de remise à zéro, en secondes Unix |
| `rate_limits.seven_day.used_percentage` et `resets_at` | les mêmes valeurs pour la fenêtre de sept jours |
| `rate_limits.spend_limit` | le plafond de dépense, derrière une passerelle qui en fixe un |
| `cost.total_cost_usd` | une estimation au prix catalogue (sauf table `modelPricing`), différente de la facture |

Les champs `rate_limits` manquent souvent : ils n’existent que sur les abonnements Pro, Max et Ultra, ou derrière une passerelle à plafond de dépense, et seulement après la première réponse de l’API dans la session. Chaque fenêtre peut manquer seule, et Claude Code retire une fenêtre dès que son `resets_at` est passé [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-statusline). Un script de ligne d’état traite donc chaque champ comme facultatif, et ne plante jamais.

**Le rythme.** La commande se relance sur événement (un nouveau message, la fin d’une compaction, un changement de mode), avec un anti-rebond de 300 ms. `refreshInterval`, d’au moins une seconde, ajoute un minuteur, utile quand la session est inactive. La largeur disponible arrive par la variable `COLUMNS`. Sous Windows, la commande passe par Git Bash s’il est installé, sinon par PowerShell : écrivez les chemins avec des `/` [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-statusline).

Chez Passerelle, Inès demande à Claude une ligne d’état qui dise quel lot de la vague est en cours. Le traitement de la vague tient à jour un petit fichier, `lot-en-cours.json`, par exemple `{"lot": 3, "total": 4}`, et la ligne le lit :

```python
"""Ligne d'état de Passerelle : le lot en cours, le contexte et la fenêtre de cinq heures.

Chaque champ est facultatif : un champ absent s'affiche « ? », et le script ne plante jamais.
"""
import json
import os
import sys


def lire(d, *cles):
    for c in cles:
        if not isinstance(d, dict):
            return None
        d = d.get(c)
    return d


def main():
    try:
        s = json.loads(sys.stdin.buffer.read().decode("utf-8"))
    except Exception:
        s = {}
    morceaux = ["Passerelle"]
    try:
        dossier = lire(s, "workspace", "current_dir") or "."
        with open(os.path.join(dossier, "lot-en-cours.json"), encoding="utf-8") as f:
            lot = json.load(f)
        morceaux.append(f"lot {int(lot['lot'])} sur {int(lot['total'])}")
    except Exception:
        morceaux.append("aucun lot")
    ctx = lire(s, "context_window", "used_percentage")
    morceaux.append(f"contexte {ctx:.0f} %" if isinstance(ctx, (int, float)) else "contexte ?")
    cinq = lire(s, "rate_limits", "five_hour", "used_percentage")
    if isinstance(cinq, (int, float)):
        mot = "plein" if cinq >= 90 else "attention" if cinq >= 70 else "normal"
        morceaux.append(f"5 h : {cinq:.0f} % ({mot})")
    else:
        morceaux.append("5 h : non lu")
    print(" · ".join(morceaux))
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception:
        print("Passerelle · ligne d'état indisponible")
        sys.exit(0)
```

Les seuils 70 et 90 sont des valeurs d’exemple, à calibrer sur votre usage ([chapitre 20](https://gmag-dev.github.io/bien-demarrer-claude-code/20-piloter-sa-consommation-et-son-projet.html#ch20)). Chaque niveau se dit par un mot, et une couleur, si vous en ajoutez une, ne fait que le doubler : une information ne passe jamais par la couleur seule [\[87\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-wcag22). La ligne se déclare dans vos réglages utilisateur, `~/.claude/settings.json`, avec `python3` sous macOS et Linux. Le fichier entier, s’il ne contient rien d’autre :

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

Si le fichier existe déjà, ajoutez la clé `"statusLine"` dans son objet, et les deux règles dans son objet `"permissions"`, au lieu de coller un second objet. La ligne lance ce script à chaque mise à jour, sans rien demander. Ses deux règles `ask`, celles du [tableau 17.3](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#tab-17-3) ([section 17.2](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#s17-2)), font demander votre accord avant toute écriture du script ou du fichier qui la déclare, même en mode auto [\[19\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permission-modes). Une règle `deny` empêcherait `/statusline`, qui écrit un script dans `~/.claude/` et met à jour vos réglages [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-statusline). Elles vont dans vos réglages utilisateur, comme la ligne : elles valent dans tous vos projets. Sous Windows, la documentation dit que `~` se développe en votre dossier personnel, et le montre avec Git Bash [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-statusline). Sans Git Bash, la commande passe par PowerShell, où ce guide ne l’a pas vérifié : écrivez alors le chemin complet, avec des `/`, comme `C:/Users/<vous>/.claude/ligne_etat.py`. Les règles gardent leur forme `~/`, qu’une règle de permission lit comme votre dossier personnel [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permissions).

Essai à la main, sans Claude Code, dans un dossier qui contient le script et `lot-en-cours.json`. Les sorties attendues sont `Passerelle · lot 3 sur 4 · contexte 41 % · 5 h : 37 % (normal)`, puis, avec `{}` sur l’entrée, `Passerelle · lot 3 sur 4 · contexte ? · 5 h : non lu`. Sans le fichier du lot, « lot 3 sur 4 » devient « aucun lot » :

```bash
echo '{"workspace":{"current_dir":"."},"context_window":{"used_percentage":41},"rate_limits":{"five_hour":{"used_percentage":37}}}' | python -I -B ligne_etat.py
echo '{}' | python -I -B ligne_etat.py
```

> **🎓 Fonctions avancées et bonnes pratiques : la ligne d’état**
>
> - **`/statusline`** écrit le script à partir d’une description en langage courant, et `/statusline delete` la retire [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-statusline).
> - **Le rythme.** Un anti-rebond de 300 ms regroupe les changements, et un script encore en cours est annulé par la mise à jour suivante [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-statusline).
> - **Des champs d’expert.** `effort.level`, `worktree.name`, `output_style.name`, `exceeds_200k_tokens`, et `session_id`, à mettre dans le nom du cache d’un calcul lent, comme l’état git [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-statusline).
> - **Le piège.** Une ligne d’état personnelle masque la plupart des aides du pied de page, dont « esc to interrupt » [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-statusline).
>
> Toutes les fonctions avancées, les bonnes pratiques et les pièges : [annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#ann-l), [section L.11](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-11).

> **🔀 Quand la règle cède**
>
> - La ligne d’état n’existe que dans l’interface du terminal, et ses champs de forfait manquent hors des abonnements Pro, Max et Ultra, ou derrière une passerelle sans plafond. Une ligne qui affiche « non lu » dit la vérité : elle ne devine pas.
> - Ce qui tient : `/usage` reste lisible à la main, et les formules de pilotage s’y appliquent de la même façon.
> - Pour aller plus loin : sections [20.1](https://gmag-dev.github.io/bien-demarrer-claude-code/20-piloter-sa-consommation-et-son-projet.html#s20-1) et [20.2](https://gmag-dev.github.io/bien-demarrer-claude-code/20-piloter-sa-consommation-et-son-projet.html#s20-2).

### 18.5 Tâches planifiées et crons de session

Claude Code offre trois façons de lancer un prompt à heure fixe ([tableau 18.4](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#tab-18-4)) [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-scheduled-tasks). Les tâches du cloud tournent sans votre machine. Celles de l’application de bureau tournent sur votre machine, sans session ouverte, mais seulement quand l’application est ouverte et la machine éveillée. Au réveil, une seule exécution rattrape le dernier créneau manqué des sept derniers jours [\[132\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-desktop-scheduled-tasks). Les crons de session, créés par `/loop` ou par l’outil `CronCreate`, vivent dans une session ouverte.

**Tableau 18.4 :** Les trois façons de planifier, d’après [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-scheduled-tasks).

| Critère | Cloud | Bureau | `/loop` et crons de session |
| --- | --- | --- | --- |
| Où la tâche tourne | l’infrastructure d’Anthropic | votre machine | votre machine |
| Votre machine doit être allumée | non | oui | oui |
| Une session doit être ouverte | non | non | oui |
| Survit au redémarrage | oui | oui | restaurée à la reprise de sa session, avec des exceptions ([section 18.6](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-6)) |
| Intervalle minimal | une heure | une minute quand Claude fixe l’intervalle, une heure dans les formulaires | une minute |

Une session porte au plus 50 tâches, et `CLAUDE_CODE_DISABLE_CRON=1` coupe le planificateur [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-scheduled-tasks).

Ce guide propose une règle pour toute tâche récurrente : une seule tâche par objet. Une tâche du matin qui existe en deux exemplaires tourne deux fois, consomme deux fois, et écrit deux fois dans le même fichier.

Chez Passerelle, Samia veut que personne n’oublie un brouillon. Inès crée, dans l’application de bureau, une tâche de chaque jour ouvré à 9 h 10, à une minute qui n’est pas ronde : « Liste les brouillons de `relecture/a-relire/` qui attendent Odile depuis plus de deux jours, dans `relecture/rappel.md`, avec leur identifiant `PASS-B-` et leur date. N’envoie rien. » La tâche écrit un fichier. C’est Samia qui le lit, et Odile qui relit les brouillons et tranche.

> **⚠️ Attention**
>
> Une [tâche planifiée](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-tache-planifiee) travaille quand personne ne regarde, et chaque exécution consomme le même forfait que vos sessions. Avant d’en créer une, écrivez son prompt, sa fréquence et sa durée de vie, et vérifiez qu’elle ne fait rien de sortant : ni envoi, ni publication, ni suppression. Un geste de ce type reste celui d’une personne ([section 19.7](https://gmag-dev.github.io/bien-demarrer-claude-code/19-plusieurs-sessions-en-parallele.html#s19-7)).

> **🎓 Fonctions avancées et bonnes pratiques : les tâches planifiées**
>
> - **Les formes de `/loop`.** Avec un intervalle, la boucle tourne à rythme fixe, et sans intervalle, Claude choisit après chaque tour une attente d’une minute à une heure [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-scheduled-tasks).
> - **Plutôt que de sonder.** L’outil Monitor suit un script en continu et coûte souvent moins de jetons qu’un prompt relancé [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-scheduled-tasks).
> - **Le rattrapage.** Au réveil, une tâche de l’application de bureau lance une seule exécution, pour la dernière heure manquée des sept derniers jours [\[132\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-desktop-scheduled-tasks).
> - **Des gardes de temps.** Mettez-les dans le prompt, puisqu’une tâche de 9 h peut partir à 23 h après une veille [\[132\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-desktop-scheduled-tasks).
> - **Le piège.** Un outil MCP marqué `requiresUserInteraction` arrête la tâche à chaque appel [\[132\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-desktop-scheduled-tasks).
>
> Toutes les fonctions avancées, les bonnes pratiques et les pièges : [annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#ann-l), [section L.15](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-15).

### 18.6 Décalage, expiration, reprise

Après tout redémarrage, une règle suffit : lister d’abord les tâches planifiées, puis recréer seulement ce qui manque. Trois règles de la planification trompent même une personne confirmée [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-scheduled-tasks).

**Le décalage.** Une tâche récurrente démarre en retard d’au plus la moitié de sa période, plafonné à 30 minutes, pour étaler la charge, sauf une tâche toutes les cinq minutes, qui n’est pas décalée ([tableau 18.5](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#tab-18-5)). Une tâche ponctuelle prévue à :00 ou :30 peut partir jusqu’à 90 secondes en avance. L’heure du prochain lancement se lit sur la ligne « next run » qu’affichent `CronCreate` et `CronList`, à partir de la version 2.1.299 [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-scheduled-tasks). Ce guide propose d’en tirer deux habitudes : lire cette heure dans la session qui possède la tâche, au lieu de la recalculer depuis l’expression cron, et ne dire une exécution « manquée » qu’après l’heure annoncée plus une marge.

**Tableau 18.5 :** Le retard possible d’une tâche récurrente selon sa période, d’après [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-scheduled-tasks).

| Période | Retard au départ |
| --- | --- |
| toutes les 10 minutes | de 0 à 5 minutes |
| toutes les 30 minutes | de 0 à 15 minutes |
| toutes les heures, ou moins souvent | de 0 à 30 minutes |

**L’expiration à 30 jours.** Depuis la version 2.1.330 du 20 novembre 2026, une tâche récurrente expire 30 jours après sa création, après un dernier lancement [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-scheduled-tasks) [\[1\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-changelog). Avant cette version, la limite était de 7 jours, et une tâche créée sous une version antérieure la garde. Une surveillance qui doit durer plus longtemps s’annule puis se recrée avant l’échéance, pour ne pas tourner en double, ou passe à une tâche de l’application de bureau ou du cloud.

**La reprise, sans rattrapage.** Une exécution manquée pendant une longue requête part une seule fois, quand Claude redevient inactif. À la reprise d’une session, Claude Code restaure les tâches créées par `CronCreate`, sauf les récurrentes expirées et les ponctuelles dont l’heure est passée. Une boucle `/loop` dont Claude choisit lui-même le rythme n’est pas restaurée. Une tâche restaurée ne rattrape pas les exécutions manquées pendant que la session était fermée : sa prochaine exécution est la première due après la reprise, décalage compris [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-scheduled-tasks).

Ce guide en tire la règle de l’ouverture de section. Recréer à l’aveugle une tâche déjà restaurée double chaque exécution.

*Dessin : Après un redémarrage, lister puis recréer. Schéma : la description suit.*

**Figure 18.2 :** Après un redémarrage, lister puis recréer. En bleu les étapes de contrôle, en vert ce qui reste, en ambre la seule création permise, en tirets le geste d’une personne. Schéma proposé par ce guide, d’après les règles de reprise de [\[126\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-scheduled-tasks).

Le même flux, en texte :

1. La session reprend : elle liste ses tâches avant toute autre chose.
2. Une tâche attendue et présente se garde telle quelle, sans rattrapage.
3. Une tâche attendue et absente se recrée, une seule fois.
4. Une tâche qui figure deux fois se signale à la personne, qui décide laquelle garder.

Chez Passerelle, l’ordinateur de la permanence a redémarré pendant la nuit. Inès rouvre la session par `claude --resume --permission-mode manual`, puis demande la liste des tâches. Le cron de session qui relançait le lot toutes les heures est revenu, et Claude ne le recrée pas. La tâche du matin, celle de l’application de bureau, n’a pas bougé.

> **🔀 Quand la règle cède**
>
> - La règle « lister d’abord » suppose que la liste est complète. Une tâche de l’application de bureau ou du cloud ne figure pas dans la liste des crons d’une session.
> - Ce qui tient : chaque façon de planifier se liste là où elle vit, et une tâche ne se recrée qu’après les trois lectures.
> - Pour aller plus loin : [section 19.8](https://gmag-dev.github.io/bien-demarrer-claude-code/19-plusieurs-sessions-en-parallele.html#s19-8).

### 18.7 Navigateurs séparés et connexions MCP qui tiennent

Un navigateur que pilote Claude a son propre profil, vide de vos comptes au départ. Sans `--isolated`, ce profil est persistant : ce que Claude y connecte y reste d’une session à l’autre [\[133\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-playwright-mcp). Vos comptes personnels et ceux de votre organisation vivent dans des profils séparés, que Claude ne pilote pas. La séparation tient alors par la configuration du serveur, qui choisit le profil, et non par construction : le harnais ne l’impose pas, et un shell resté dans la session pourrait encore lire sur le disque les fichiers des autres profils.

Un serveur MCP de navigateur ouvre un profil de navigateur, avec ses cookies et ses sessions ouvertes. S’il ouvre celui où vous êtes connectée à votre messagerie, Claude agit avec ce compte. Le serveur Playwright de Microsoft offre deux choix : un dossier de profil de votre choix, par `--user-data-dir`, ou un profil isolé, par `--isolated`, gardé en mémoire et effacé à la fermeture [\[133\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-playwright-mcp).

**Tableau 18.6 :** Trois mondes, trois profils. Proposé par ce guide.

| Profil | Ce qu’il contient | Qui le pilote |
| --- | --- | --- |
| personnel | vos comptes à vous, votre messagerie | vous seule |
| organisation | les comptes de l’employeur ou de l’association | vous seule, dans le cadre de l’organisation |
| piloté | rien au départ, ou un profil isolé effacé à la fin | le serveur MCP, pour une tâche nommée |

Ce guide propose trois règles de plus :

- **Un navigateur partagé se réserve.** Deux sessions qui pilotent le même profil se gênent sans le savoir. Chacune le réserve avant le premier usage, ferme le navigateur et nettoie ce qu’il a laissé, puis le libère ([section 19.3](https://gmag-dev.github.io/bien-demarrer-claude-code/19-plusieurs-sessions-en-parallele.html#s19-3)).
- **Une page de connexion ou de consentement arrête le travail.** La session le dit à la personne, et ne tape jamais un identifiant ni un mot de passe. Le clic qui accepte une mention légale ou un consentement reste celui de la personne.
- **Les connexions se vérifient au démarrage.** Un serveur stdio démarre avec la session. Un serveur qui tourne à part, en HTTP sur `127.0.0.1`, doit déjà tourner quand la session démarre. Après un redémarrage, `/mcp` montre l’état de chaque serveur [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-mcp). 🟡 À vérifier : c’est là qu’on reconnecterait celui qui n’est pas revenu. Une commande nommée, lancée à l’ouverture de la session, peut démarrer les serveurs qui tournent à part et tester qu’ils répondent sur leur port, avant le premier usage.

Chez Passerelle, Bernard vérifie l’accessibilité de la page locale qui affiche les brouillons, servie sur `127.0.0.1` ([chapitre 14](https://gmag-dev.github.io/bien-demarrer-claude-code/14-le-modele-propose-l-oracle-verifie-la-personne-tranche.html#ch14)). Le serveur de navigateur ouvre un profil vide, réservé à cette tâche. Sa messagerie reste dans son profil personnel, et le compte de l’association sur le portail de la commune dans un troisième profil, que Claude ne pilote jamais. Le contrôle automatique ne suffit pas : Thomas écoute ensuite la page avec son lecteur d’écran et dit si un brouillon passe à l’oral.

> **⚠️ Attention**
>
> Un navigateur piloté est une voie de sortie : une page qu’il ouvre peut porter des instructions, et il peut envoyer ce que la session lui donne. Ne le confiez pas à une session qui lit des données réelles ([chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#ch10) et [section 23.4](https://gmag-dev.github.io/bien-demarrer-claude-code/23-securite-et-propriete-intellectuelle-en-entreprise.html#s23-4)). Chez Passerelle, la session qui pilote le navigateur ne voit que des brouillons fictifs.

> **📌 À retenir**
>
> Avant de relire la liste, répondez de mémoire, puis vérifiez votre réponse dans la section indiquée :
>
> 1. Par quel code de sortie un hook qui fait respecter une politique refuse-t-il, et que fait une garde qui ne comprend pas ce qu’elle reçoit ? ([section 18.1](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-1))
> 2. Après un redémarrage, quelle règle suit-on pour les tâches planifiées, et une tâche restaurée rattrape-t-elle les exécutions manquées ? ([section 18.6](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-6))
>
> - Un hook qui fait respecter une politique sort avec le code 2, `onFailure: "block"` ferme aussi sur un échec, et une garde qui ne comprend pas son entrée ferme. Un hook ne lève jamais une règle, sauf l’exception du mod ([section 17.1](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#s17-1)).
> - Aucun contrôle indispensable ne repose sur un hook de Claude Code seul : il a une dernière porte hors de la session.
> - Un serveur MCP local tourne avec vos droits : stdio ou `127.0.0.1`, le moins d’outils possible, une autorisation par nom exact, et la révision du protocole vérifiée.
> - Les champs `rate_limits` de la ligne d’état sont facultatifs : la ligne dit « non lu » au lieu de planter.
> - Une tâche récurrente part en retard d’au plus la moitié de sa période, plafonné à 30 minutes, expire à 30 jours (7 si elle a été créée avant la version 2.1.330) et ne rattrape rien. Après un redémarrage : lister, puis recréer ce qui manque, une tâche par objet.
> - Un navigateur piloté a son propre profil, vide de vos comptes, et une page de connexion se rend à la personne.

> **✏️ Exercice**
>
> **Compétence visée** : prouver qu’un hook ferme sur une entrée mal formée, et qu’une tâche restaurée ne tourne pas en double. Comptez 30 à 45 minutes.
>
> Sur une copie d’essai du dossier de Passerelle, ou sur votre projet :
>
> 1. Copiez la garde de la [section 18.1](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-1). Lancez-la à la main sur trois entrées : une écriture dans `brouillons/` qui commence par son en-tête, une écriture dans `courriers/`, et le texte `{pas du json`. Notez les trois codes de sortie.
> 2. Déclarez-la vous-même dans `.claude/redaction.json`, comme en [section 18.1](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-1), puis lancez `claude --settings .claude/redaction.json --permission-mode manual`, vérifiez par `/hooks` qu’elle est prise en compte, et demandez à Claude d’écrire un brouillon dans `courriers/`. Notez le refus et sa raison.
> 3. Dans une session d’essai, créez une tâche horaire, par exemple « toutes les heures, résume `git log` depuis la dernière exécution ». Lisez sa ligne « next run » et comparez-la à l’expression cron. Fermez la session, rouvrez-la par `claude --resume --permission-mode manual`, listez les tâches, et vérifiez qu’elle est revenue sans rejouer d’exécution. Supprimez-la ensuite.
>
> **Sans code** : faites les étapes 2 et 3 seulement. Pour l’étape 2, demandez à Claude de vous montrer, dans la conversation, le script et le bloc de réglages de la [section 18.1](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-1), relisez-les avec lui, puis copiez-les vous-même : les réglages partagés refusent à Claude l’écriture des scripts des hooks et de `.claude/redaction.json` ([tableau 17.3](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#tab-17-3), [section 17.2](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#s17-2)).
>
> **Critère de réussite** : les trois codes notés (0, 2 et 2), le refus affiché dans la session, et la liste des tâches avant et après la reprise, avec une seule tâche horaire. Par le chemin sans code : la garde listée par `/hooks`, le refus affiché dans la session avec sa raison, et la liste des tâches avant et après la reprise, avec une seule tâche horaire. Un brouillon accepté par la garde reste un brouillon : chez Passerelle, Odile le relit et tranche.
>
> **Pour vous corriger**, sans corrigé : relisez votre travail contre ces quatre points. Chacun se voit dans ce que vous avez écrit ou obtenu.
>
> 1. Le texte `{pas du json` sort en code 2, comme l’écriture dans `courriers/` : la garde ferme sur ce qu’elle ne comprend pas, et refuse par le code 2, jamais par le code 1 ([section 18.1](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-1)).
> 2. La garde est déclarée dans `.claude/redaction.json`, et non dans `.claude/settings.json`, que toutes les sessions chargent, et `/hooks` la liste dans la session lancée avec ce fichier ([section 18.1](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-1)).
> 3. L’heure du prochain lancement est lue sur la ligne « next run », dans la session qui possède la tâche, et non recalculée depuis l’expression cron. Pour une tâche horaire, elle tombe au plus une demi-heure après l’heure de l’expression ([section 18.6](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-6)).
> 4. Après la reprise, la liste des tâches est lue avant toute autre chose, la tâche horaire y figure une seule fois, et aucune exécution n’a été rejouée pour le temps où la session était fermée ([section 18.6](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-6)).
>
> Par le chemin sans code, les points 2 à 4 s’appliquent tels quels. Vérifiez en plus que le script et le bloc de réglages ont été copiés par vous, et que Claude n’a fait que les montrer.

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/guide-en-une-page.html#toc)

![Illustration : la personne en long manteau violet et son petit compagnon de cristal cyan, dans l’une des pièces d’un bâtiment vu en coupe, chaque pièce avec son poste, toutes reliées entre elles.](https://gmag-dev.github.io/bien-demarrer-claude-code/images/32cd37f1a1ed.avif)
