> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.4.1 : « 18. Hooks, serveurs MCP, ligne d’état et tâches planifiées », partie 1 sur 2.
>
> - Précédent : [17. Le harnais en couches (partie 2 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/17-le-harnais-en-couches-2.md)
> - Suivant : [18. Hooks, serveurs MCP, ligne d’état et tâches planifiées (partie 2 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees-2.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#h-ch18>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## 18. Hooks, serveurs MCP, ligne d’état et tâches planifiées

> **🪪 Ce chapitre**
>
> **Pour qui** : les personnes qui ont déjà choisi leurs extensions ([chapitre 6](https://gmag-dev.github.io/bien-demarrer-claude-code/6-choisir-ses-extensions.html#ch6)) et écrit un hook ([chapitre 7](https://gmag-dev.github.io/bien-demarrer-claude-code/7-ecrire-ses-premieres-extensions.html#ch7)), et qui veulent des automatismes sur lesquels on peut compter le jour où ils échouent.
>
> **Sur quel poste** : tout poste où Claude Code tourne dans le terminal. Les exemples sont en Python et se lancent par `python -I -B`. La [ligne d’état](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-ligne-d-etat) décrite est celle du terminal. Ses champs de forfait n’existent que sur les abonnements Pro, Max et Ultra, ou derrière une passerelle à plafond de dépense [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-statusline). État décrit : la documentation de Claude Code 2.1.318 [\[1\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-changelog) et la révision 2026-07-28 de la spécification MCP [\[127\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-mcp-specification).
>
> **Ce que vous apprenez** : écrire un hook en échec fermé et dire ce qu’il ne voit pas, déclarer un serveur MCP au moindre privilège, écrire une ligne d’état qui ne plante jamais, planifier une tâche en tenant compte de son décalage, de son expiration et de sa reprise, et garder un navigateur piloté à part de vos comptes.
>
> **Deux chemins** : si un encadré « Quand la règle cède » vous a envoyée ici, lisez la section qu’il cite, puis revenez à votre chapitre. Sinon, lisez le chapitre dans l’ordre, puis faites l’exercice.
>
> **Le fil rouge** 🌉 Passerelle : Bernard écrit, pour la session de rédaction, un hook qui refuse toute écriture hors de ses brouillons, du dossier des décisions et du dossier des messages. Inès fait écrire une ligne d’état qui affiche « lot 3 sur 4 ». Une tâche du matin liste les brouillons qui attendent la relecture d’Odile, et n’envoie rien.
>
> **Où en est Passerelle** : en arrivant, chaque outil de Passerelle a ses permissions, et une règle `deny` protège le dossier des pièces ([chapitre 17](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#ch17)). À la fin du chapitre, un hook avant écriture refuse, preuve à l’appui, un brouillon écrit hors de `brouillons/`, la ligne d’état suit le lot en cours, et la tâche du matin survit à un redémarrage sans tourner en double.

Le [chapitre 6](https://gmag-dev.github.io/bien-demarrer-claude-code/6-choisir-ses-extensions.html#ch6) a fait choisir une extension pour chaque gêne, et le [chapitre 7](https://gmag-dev.github.io/bien-demarrer-claude-code/7-ecrire-ses-premieres-extensions.html#ch7) a écrit un skill et un [hook](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-hook). Ce chapitre reprend les hooks, puis déclare un serveur [MCP](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-mcp) ([section 18.3](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-3)), une ligne d’état ([section 18.4](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-4)) et une tâche planifiée (sections [18.5](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-5) et [18.6](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-6)). Il traite surtout du jour où ces automatismes ne font pas ce qu’on croit : un hook qui plante et laisse passer, un serveur qui ne revient pas après un redémarrage, une ligne d’état sans données, une tâche qui part en retard ou tourne deux fois. Ce guide propose une idée qui les traverse tous : un automatisme qui protège se ferme quand il doute, et dit ce qu’il ne voit pas.

### 18.1 Hooks : événements, codes de sortie, échec fermé

Un hook qui protège dit non par le code de sortie 2, le nombre que le script renvoie en finissant. Le code 1, qui semble pourtant signaler une erreur, laisse passer l’action. Le champ `onFailure` à `"block"`, sur un hook de type command ou http, fait bloquer en plus un hook qui échoue, à partir de la version 2.1.295 [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks). Retenez cette règle avant la liste des événements, qui sert de référence.

La référence des hooks liste 33 événements à la date de consultation, le 6 novembre 2026 : le démarrage (`SessionStart`, `Setup`), les outils (`PreToolUse`, `PermissionRequest`, `PostToolUse`, `PostToolUseFailure`), les sous-agents (`SubagentStart`, `SubagentStop`), la compaction (`PreCompact`, `PostCompact`), les worktrees, les changements de fichiers ou de configuration, et la fin de session (`SessionEnd`) [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks). Chaque hook reçoit sur son entrée standard un objet JSON aux champs communs (`session_id`, `transcript_path`, `cwd`, `permission_mode`, `hook_event_name`), puis des champs propres à l’événement, comme `tool_name` et `tool_input` [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks).

Le sens du code de sortie dépend de l’événement ([tableau 18.1](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#tab-18-1)).

**Tableau 18.1 :** Les codes de sortie d’un hook, d’après [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks).

| Code | Sens | Sur `PreToolUse` | Sur `PostToolUse` | Sur `SessionStart` |
| --- | --- | --- | --- | --- |
| 0 | succès : le JSON écrit sur la sortie standard s’applique | l’outil continue, ou la décision JSON s’applique | rien | la sortie standard s’ajoute au contexte |
| 2 | bloque, là où l’événement peut l’être, et la sortie d’erreur donne la raison | l’appel est bloqué | ne bloque pas, l’outil a déjà tourné, et la raison est montrée à Claude | ne bloque pas, la raison est montrée à la personne seulement |
| autre | erreur non bloquante : l’action continue | l’appel passe, sauf si le hook porte `onFailure: "block"` | l’action continue | l’action continue |

D’où la règle de la documentation : un hook qui fait respecter une politique sort avec le code 2, jamais avec le code 1 [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks). Ce guide en tire une règle de plus pour le script lui-même : une garde qui ne comprend pas ce qu’elle reçoit ferme au lieu d’ouvrir. C’est l’[échec fermé](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-echec-ferme).

Au lieu d’un code, un hook `PreToolUse` peut écrire une décision JSON : `permissionDecision` vaut `allow`, `deny`, `ask` ou `defer`, ce dernier seulement en mode non interactif. Quand plusieurs hooks répondent, l’ordre est `deny`, `defer`, `ask`, puis `allow` [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks). Mais un hook ne lève jamais une règle, sauf l’exception du mod décrite en [section 17.1](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#s17-1), sur une machine sans réglages gérés ni compte Team ou Enterprise : les règles `deny` et `ask` des réglages s’appliquent quoi que le hook réponde, même `allow` [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permissions).

Chez Passerelle, Bernard écrit la garde avant écriture de la session de rédaction. Elle laisse passer une écriture dans les trois dossiers où cette session écrit : `brouillons/`, le dossier des décisions `decisions/` et le dossier des messages `tableau/` ([chapitre 19](https://gmag-dev.github.io/bien-demarrer-claude-code/19-plusieurs-sessions-en-parallele.html#ch19)). Elle exige qu’un nouveau brouillon commence par « Brouillon pour relecture », et ferme sur tout le reste, entrée illisible comprise :

```python
"""Garde avant écriture de la session de rédaction : un hook PreToolUse pour Write et Edit.

Laisse passer (code 0) une écriture dans brouillons/, decisions/ ou tableau/ seulement. Ferme (code 2)
sur tout le reste, y compris une entrée qu'elle ne comprend pas. Elle ne voit ni le shell,
ni PowerShell, ni NotebookEdit.
"""
import json
import os
import sys

ENTETE = "Brouillon pour relecture"
PERMIS = ("brouillons", "decisions", "tableau")  # les seuls dossiers où la session de rédaction écrit


def refuser(raison):
    print(f"garde_ecriture : {raison}. Écriture refusée.", file=sys.stderr)
    return 2


def main():
    try:
        donnees = json.loads(sys.stdin.buffer.read().decode("utf-8"))
        outil = donnees["tool_name"]
        entree = donnees["tool_input"]
        chemin = entree["file_path"]
        racine = os.environ.get("CLAUDE_PROJECT_DIR") or donnees["cwd"]
        if not (isinstance(outil, str) and isinstance(chemin, str) and isinstance(racine, str)):
            raise ValueError("champ qui n'est pas du texte")
    except (UnicodeDecodeError, ValueError, KeyError, TypeError) as err:
        return refuser(f"entrée illisible ({err})")
    if outil not in ("Write", "Edit"):
        return refuser(f"outil inattendu {outil}")
    cible = os.path.realpath(os.path.join(racine, chemin))
    dossier = None
    for nom in PERMIS:
        base = os.path.realpath(os.path.join(racine, nom))
        try:
            if os.path.commonpath([base, cible]) == base and cible != base:
                dossier = nom
        except ValueError:
            pass
    if dossier is None:
        return refuser(f"{chemin} est hors de brouillons/, decisions/ et tableau/")
    if outil == "Write" and dossier == "brouillons":
        texte = entree.get("content")
        if not isinstance(texte, str) or not texte.startswith(ENTETE):
            return refuser(f"le brouillon doit commencer par « {ENTETE} »")
    return 0


if __name__ == "__main__":
    sys.exit(main())
```

La garde ne vaut que pour la session de rédaction. Les autres sessions écrivent ailleurs : celle de Bernard est la seule à écrire `lexique.md`, et elle corrige le contrôle ([section 19.5](https://gmag-dev.github.io/bien-demarrer-claude-code/19-plusieurs-sessions-en-parallele.html#s19-5) et exercice du [chapitre 11](https://gmag-dev.github.io/bien-demarrer-claude-code/11-commits-et-collaboration.html#ch11)). Déclarée dans `.claude/settings.json`, que toutes les sessions du projet chargent, la garde refuserait leurs écritures. La garde se déclare dans `.claude/redaction.json`, un fichier de réglages que seule la session de rédaction charge, à son lancement : `claude --settings .claude/redaction.json --permission-mode manual` ([section 17.1](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#s17-1)). À la reprise, repassez l’option : `--settings` ne revient pas avec la session [\[41\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sessions). La garde s’y écrit sous la forme « exec », une commande et ses arguments, sans shell intermédiaire. `${CLAUDE_PROJECT_DIR}` désigne la racine du projet, `timeout` se compte en secondes, et `onFailure` à `"block"` ferme aussi la porte si le script plante ou dépasse son délai [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks). Sous macOS et Linux, `command` nomme `python3`, le nom du Python du poste ([section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/7-ecrire-ses-premieres-extensions.html#s7-2)) :

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "python",
            "args": ["-I", "-B", "${CLAUDE_PROJECT_DIR}/.claude/hooks/garde_ecriture.py"],
            "timeout": 10,
            "onFailure": "block"
          }
        ]
      }
    ]
  }
}
```

C’est le fichier `.claude/redaction.json` en entier. La garde lance son script à chaque écriture, sans demande, et Claude ne doit pouvoir réécrire ni ce script ni le fichier qui la déclare. Les deux règles `deny` qui l’en empêchent ne vont pas ici, mais dans le `.claude/settings.json` partagé : posées dans un fichier passé par `--settings`, elles ne vaudraient que pour la session qui le charge [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-settings), et une autre session pourrait réécrire la garde. Le [tableau 17.3](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#tab-17-3), en [section 17.2](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#s17-2), les donne.

Bernard l’essaie d’abord à la main, sans Claude Code, depuis le dossier `.claude/hooks`. Sous PowerShell, le code se lit dans `$LASTEXITCODE`, car `$?` n’y vaut que True ou False :

```bash
echo '{"tool_name":"Write","tool_input":{"file_path":"courriers/PASS-C-012.txt","content":"x"},"cwd":"."}' | python -I -B garde_ecriture.py
echo $?    # 2 : hors de brouillons/
echo '{pas du json' | python -I -B garde_ecriture.py
echo $?    # 2 : entrée illisible
```

Ce guide a fait tourner la garde sur dix-sept cas, dont neuf entrées mal formées ou détournées : un JSON cassé, des octets illisibles, une liste à la place d’un objet, un champ manquant, un chemin qui n’est pas du texte, une remontée `brouillons/../courriers/`, un dossier voisin `brouillons-bis/`, un autre outil, un brouillon sans son en-tête. Chacun sort en code 2, et les écritures légitimes en code 0, une fiche dans `decisions/` et un message dans `tableau/` compris.

*Dessin : La garde avant écriture de Passerelle. Schéma : la description suit.*

**Figure 18.1 :** La garde avant écriture de Passerelle. En bleu les questions, en rouge le refus, en vert ce qui passe, en tirets le geste d’une personne. Schéma proposé par ce guide, d’après les codes de sortie de [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks).

Le même flux, en texte :

1. Claude demande d’écrire ou de modifier un fichier.
2. Si l’entrée ne se lit pas, la garde refuse.
3. Si le chemin n’est ni dans `brouillons/`, ni dans `decisions/`, ni dans `tableau/`, elle refuse.
4. Si un nouveau brouillon ne commence pas par son en-tête, elle refuse. Sinon, l’écriture passe.
5. Un brouillon écrit reste un brouillon : Odile le relit et tranche.

> **⚠️ Attention**
>
> Prendre une garde de hook pour une frontière de sécurité. La garde lit le texte d’un appel d’outil, comme une règle `deny` : elle ne voit ni une redirection dans le shell (`echo … > courriers/x.txt`), ni l’outil PowerShell, ni NotebookEdit, ni l’outil d’un serveur MCP qui écrirait. Les hooks s’exécutent en outre hors du bac à sable, avec vos droits [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sandboxing). Doublez-la donc d’une règle `deny` sur les dossiers à protéger ([chapitre 17](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#ch17)), et laissez le confinement au bac à sable pour le shell.

**Tableau 18.2 :** Le même besoin, empêcher l’écriture hors de `brouillons/`, à trois niveaux. Proposé par ce guide.

| Si vous… | Faites | Pourquoi |
| --- | --- | --- |
| débutez | une règle `deny` sur les dossiers à protéger ([section 10.1](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#s10-1)), ou un hook que Claude vous montre dans la conversation, que vous relisez, puis copiez vous-même : les réglages partagés lui refusent l’écriture des hooks ([tableau 17.3](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#tab-17-3), [section 17.2](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#s17-2)) | la règle `deny` est appliquée par le harnais, sans script à maintenir |
| êtes à l’aise | un hook `PreToolUse` qui lit le chemin et sort avec le code 2 | il refuse ce que la règle ne sait pas dire, comme un brouillon sans son en-tête |
| voulez aller plus loin | `onFailure: "block"`, une entrée illisible qui ferme, et une suite de cas mal formés, comme la garde de Bernard | une garde qui plante ne laisse plus passer |

> **📏 La limite**
>
> Chacun des trois niveaux lit le texte d’un appel d’outil. Aucun ne voit un script qui écrit à sa place : ce qui doit tenir à coup sûr se place aussi hors de la session ([section 18.2](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-2)).

> **🎓 Fonctions avancées et bonnes pratiques : les hooks**
>
> - **Cinq types.** Un hook est `command`, `http`, `mcp_tool`, qui appelle l’outil d’un serveur MCP, `prompt` ou `agent`, ce dernier expérimental [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks).
> - **Le filtre `if`.** Une expression de règle de permission, comme `"Bash(git *)"`, affine le `matcher`, et n’est évaluée que sur les événements d’outil et de permission [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks).
> - **Les hooks asynchrones.** `"async": true` lance la commande en arrière-plan sans bloquer, et `"asyncRewake": true` réveille Claude si elle sort en 2 [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks).
> - **Les sorties JSON.** Au-delà du code 2, `updatedInput` réécrit les arguments d’un outil avant son exécution, `additionalContext` ajoute un rappel au contexte, et `continue: false` arrête Claude [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks).
> - **Le piège.** Les hooks tournent hors du bac à sable, avec tous vos droits [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-sandboxing).
>
> Toutes les fonctions avancées, les bonnes pratiques et les pièges : [annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#ann-l), [section L.4](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-4).

### 18.2 Les hooks de session et leur dernière porte

Aucun contrôle indispensable ne repose sur un hook de Claude Code seul. Un hook est déterministe tant qu’il tourne, mais il peut être éteint par un réglage, et il ne voit que des textes. Ce guide propose donc, pour chaque contrôle qui compte, une dernière porte hors de la session : un hook git `pre-commit` ([section 19.6](https://gmag-dev.github.io/bien-demarrer-claude-code/19-plusieurs-sessions-en-parallele.html#s19-6)), une intégration continue dont la définition est protégée ([section 11.2](https://gmag-dev.github.io/bien-demarrer-claude-code/11-commits-et-collaboration.html#s11-2)), ou une commande nommée lancée à la main.

Dans ces limites, les hooks de session rendent deux services. Le premier : démarrer chaque session de la même façon. Un hook `SessionStart` tourne au démarrage, à la reprise, après `/clear` et après une compaction, et sa sortie standard s’ajoute au contexte [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks). Il peut y mettre ce que toute session doit lire avant d’agir : les derniers commits, la note de passation, la liste des questions qui attendent une personne.

Le second : traverser une compaction sans rien perdre. Trois hooks y servent, à la date de consultation, le 6 novembre 2026 [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-hooks) :

- `PreCompact` tourne avant la compaction, avec le filtre `manual` pour `/compact` et `auto` pour la compaction automatique ou au repos. Il peut la bloquer par le code 2. S’il sort en 0 sans bloquer, sa sortie standard devient une consigne pour le résumé, 10 000 caractères au plus par hook, le reste étant coupé,
- `SessionStart`, avec le filtre `compact`, tourne après la compaction, et sa sortie est ajoutée au contexte compacté : il peut y remettre la note de passation et les derniers commits ([section 3.2](https://gmag-dev.github.io/bien-demarrer-claude-code/3-la-fenetre-de-contexte.html#s3-2)),
- `PostCompact` reçoit le résumé dans le champ `compact_summary`, par exemple pour l’archiver.

Chez Passerelle, pendant le lot de 30 courriers, la note de passation vit dans `notes/passation.md` ([chapitre 3](https://gmag-dev.github.io/bien-demarrer-claude-code/3-la-fenetre-de-contexte.html#ch3)). Inès ajoute à `.claude/settings.local.json` un hook qui remet les cinq derniers commits dans le contexte après chaque compaction, et demande à Claude de relire la note juste après :

```json
{
  "hooks": {
    "SessionStart": [
      { "matcher": "compact",
        "hooks": [
          { "type": "command", "command": "git log --oneline -5" }
        ] }
    ]
  }
}
```

Un hook sert aussi à ajouter une consigne à chaque demande. Un praticien a mesuré, avec le vrai binaire de Claude Code, l’effet d’un hook qui oblige Claude à dire pour chaque skill s’il s’applique : sur quatre skills et 22 demandes, le déclenchement passe d’environ la moitié des cas à tous, et retombe aux trois quarts sur des demandes plus dures [\[128\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-spence-skill-activation). C’est une mesure unique, et ce hook n’ajoute qu’une [consigne](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-consigne) : il ne garantit rien sur le choix du modèle.

> **💡 Conseil**
>
> Sur un poste dont l’organisation gère les réglages, vérifiez d’abord ce qu’elle laisse actif : `/status` montre les sources de réglages, et `/hooks` les hooks pris en compte. Si les réglages gérés posent `allowManagedHooksOnly: true`, Claude Code n’exécute plus que les hooks gérés, ceux de l’Agent SDK et ceux des plugins que l’organisation force. Les hooks de l’utilisatrice, du projet, les hooks locaux, ceux du frontmatter d’un agent, et les hooks et mods des autres plugins sont bloqués. La ligne d’état et la suggestion de fichiers ne viennent plus que des réglages gérés [\[32\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-settings-reference), et une ligne d’état personnalisée disparaît sans avertissement [\[124\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-statusline). La clé `disableAllHooks` éteint d’un coup hooks, ligne d’état et suggestion de fichiers personnalisée, et n’éteint les hooks gérés que posée dans les réglages gérés [\[32\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-settings-reference). Les serveurs MCP et les tâches planifiées restent alors disponibles. Doublez chaque contrôle d’une étape qui ne dépend pas des hooks de Claude Code : une commande nommée du gestionnaire de tâches lancée en premier, qui fait la routine de démarrage, un hook git, ou, juste après `/compact`, une demande à Claude de relire la note de passation.

### 18.3 Serveurs MCP au moindre privilège

Un serveur MCP local est un programme qui tourne avec vos droits : traitez-le comme un logiciel que vous installez. Gardez-en le moins possible, donnez à chacun le moins d’outils possible, et tenez pour non fiable tout serveur qui va chercher du contenu sur le web ([section 6.1](https://gmag-dev.github.io/bien-demarrer-claude-code/6-choisir-ses-extensions.html#s6-1)).

Un serveur a trois portées : locale, projet (un `.mcp.json` versionné) et utilisateur ([annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#ann-l), [section L.5](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-5)). En session interactive, Claude Code demande votre accord avant d’utiliser un serveur déclaré par un `.mcp.json` de projet. Mais `claude -p`, l’Agent SDK et certaines sessions du cloud ne peuvent pas demander, et chargent ces serveurs sans accord. On en exclut un par `disabledMcpjsonServers`, `--setting-sources` ou `--strict-mcp-config` [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-mcp). Une sortie d’outil MCP déclenche un avertissement au-delà de 10 000 jetons et s’arrête à 25 000 par défaut, valeur réglable par `MAX_MCP_OUTPUT_TOKENS` [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-mcp).

Les bonnes pratiques de sécurité du protocole décrivent comment un serveur local se compromet : une commande de démarrage malveillante, une charge cachée, un serveur laissé ouvert sur `localhost` et atteint par rebinding DNS, une attaque qui change l’adresse derrière un nom de site pour qu’une page web atteigne un serveur de votre machine. Pour un client qui installe un serveur local en un clic, elles exigent un consentement explicite qui affiche la commande complète. Elles demandent une exécution en bac à sable avec des privilèges minimaux, le transport [stdio](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-stdio), l’entrée et la sortie standard du programme, pour que seul le client parle au serveur, ou, en HTTP, un jeton d’autorisation et un canal restreint, des portées minimales, et elles interdisent de relayer un jeton qui n’a pas été émis pour le serveur [\[129\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-mcp-security-best-practices). Ce guide en tire une règle : un serveur local parle en stdio ou écoute sur `127.0.0.1`, n’expose que les outils dont la tâche a besoin, et un serveur qui récupère du contenu externe compte comme une source non fiable ([chapitre 10](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#ch10)).

Chez Passerelle, le serveur du lexique du [chapitre 6](https://gmag-dev.github.io/bien-demarrer-claude-code/6-choisir-ses-extensions.html#ch6) suit cette règle. Sa déclaration de projet tient en un serveur, en stdio, avec un bloc `env` vide, et `python3` à la place de `python` sous macOS et Linux ([section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/7-ecrire-ses-premieres-extensions.html#s7-2)). Ce bloc vide ne transmet aucune variable de plus, mais le serveur hérite de l’environnement du terminal qui lance Claude Code. Pour qu’il ne reçoive qu’un socle sûr, exportez `CLAUDE_CODE_MCP_ALLOWLIST_ENV=1` dans ce terminal. `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1` retire aussi les identifiants de l’environnement des serveurs stdio [\[184\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-env-vars) ([section 10.2](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#s10-2)). La déclaration :

```json
{
  "mcpServers": {
    "lexique": {
      "type": "stdio",
      "command": "python",
      "args": ["-I", "-B", "outils/serveur_lexique.py"],
      "env": {}
    }
  }
}
```

Claude Code nomme chaque outil MCP `mcp__<serveur>__<outil>`. Une règle `allow` à joker n’est acceptée qu’après un préfixe littéral `mcp__<serveur>__` : `mcp__*` en `allow` n’approuve rien, et une règle `mcp__` avec parenthèses est ignorée au chargement [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permissions). Bernard autorise donc l’outil par son nom exact, `mcp__lexique__lire_definition`, et rien d’autre. Un serveur stdio démarre avec la session ([section 18.7](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#s18-7)) : une fois le serveur approuvé, `outils/serveur_lexique.py` se lance sans rien demander, et ce script comme `.mcp.json` ont leur règle au [tableau 17.3](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#tab-17-3) ([section 17.2](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#s17-2)).

Beaucoup d’outils coûtent du contexte, même inutilisés. Claude Code applique aux outils MCP le principe « chercher avant de choisir » : au démarrage, seuls les noms des outils se chargent, et leurs schémas complets restent différés jusqu’à ce qu’une tâche les demande ([section 6.1](https://gmag-dev.github.io/bien-demarrer-claude-code/6-choisir-ses-extensions.html#s6-1)) [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-features-overview). Ce chargement différé est actif par défaut, et la variable `ENABLE_TOOL_SEARCH=false` le coupe. Les modèles antérieurs et Foundry hébergé sur Azure chargent tous les schémas au démarrage, et le seuil de 10 % du contexte ne joue qu’en mode `ENABLE_TOOL_SEARCH=auto` [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-mcp).

**La révision du protocole.** La spécification en vigueur à la date de consultation, le 6 novembre 2026, est la révision 2026-07-28 [\[127\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-mcp-specification). Elle supprime la poignée de main `initialize` : chaque requête porte sa version et les capacités du client dans `params._meta`, et le serveur doit répondre à `server/discover`. La révision précédente, 2025-11-25, garde la poignée de main [\[130\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-mcp-changelog-2026-07-28). Claude Code embarque deux moteurs MCP : le moteur « v2 » ajoute la révision 2026-07-28, et la variable `MCP_SDK_GENERATION` choisit l’un ou l’autre [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-mcp). Un serveur écrit pour durer sert les deux révisions.

> **⚠️ Attention**
>
> Se fier aux annotations d’un outil. `readOnlyHint` et `openWorldHint` sont des indices : la spécification dit qu’un client ne doit pas s’y fier quand ils viennent d’un serveur non fiable [\[131\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-mcp-tools-2026-07-28). Chez Passerelle, c’est le code du serveur du lexique qui garantit la lecture seule : il n’a aucun outil qui écrit, et refuse tout chemin qui sort de son dossier. Lisez le code d’un serveur avant de croire son annotation.

> **🎓 Fonctions avancées et bonnes pratiques : les serveurs MCP**
>
> - **La précédence.** Local, puis projet, puis utilisateur, puis plugin, puis connecteurs claude.ai, et l’entrée gagnante est prise en entier, sans fusion de champs [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-mcp).
> - **Les variables de `.mcp.json`.** `${VAR}` et `${VAR:-défaut}` s’étendent dans `command`, `args`, `env`, `url` et `headers`, mais les variables d’identifiants valent vide dans l’adresse et les en-têtes d’un serveur distant [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-mcp).
> - **Les délais.** `MCP_TIMEOUT` au démarrage, `MCP_TOOL_TIMEOUT` par appel, et un appel encore en cours après deux minutes passe en tâche d’arrière-plan [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-mcp).
> - **Le coût et la sortie.** Mesurez le coût de chaque outil par `/context all`, et lancez `claude mcp logout` avant `claude mcp remove`, qui efface les jetons locaux sans les révoquer chez le serveur [\[15\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-features-overview) [\[60\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-mcp).
> - **Le piège.** `claude -p` charge et connecte les serveurs du `.mcp.json` d’un dossier jamais approuvé, sans demande, sauf en mode `--bare` [\[64\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-headless).
>
> Toutes les fonctions avancées, les bonnes pratiques et les pièges : [annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#ann-l), [section L.5](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-l-fiches-des-composants.html#s-l-5).
