> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.2.1 : « 7. Écrire ses premières extensions : skills et hooks », partie 2 sur 2.
>
> - Précédent : [7. Écrire ses premières extensions : skills et hooks (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/7-ecrire-ses-premieres-extensions-1.md)
> - Suivant : [8. Le travail en parallèle (partie 1 sur 2)](https://gmag-dev.github.io/bien-demarrer-claude-code/md/8-le-travail-en-parallele-1.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/#h-s7-2>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

### 7.2 Les hooks, ce qui arrive à chaque fois

Une consigne, dans `CLAUDE.md` ou dans un skill, Claude la suit presque toujours, pas toujours. Ce qui ne souffre aucune exception demande un automatisme [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices). Un hook en est un : une commande que Claude Code exécute lui-même à un point fixe de son cycle de vie. L’action arrive à chaque fois, au lieu de dépendre du choix du modèle [\[59\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks-guide). Il sert, par exemple, à formater chaque fichier modifié ou à refuser une écriture dangereuse. Le plus simple est de le demander en français à Claude, puis de le relire avec `/hooks` avant de l’accepter [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices). Relire veut dire lire le script lui-même : si vous ne lisez pas le code, faites-le relire, ou préférez une règle `deny` ([section 10.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-1)). Les événements utiles pour commencer sont ceux de la [figure 6.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#fig-6-1), plus `Notification`, quand Claude attend votre réponse ou une permission [\[59\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks-guide) [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks). Sur les événements qui le permettent, sortir avec le code 2 bloque l’action : un hook [PreToolUse](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-pretooluse) bloque l’appel d’outil, un hook `UserPromptSubmit` rejette le prompt [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks). Les hooks de type `prompt` ou `agent` font décider un autre modèle et ne sont donc pas déterministes : pour une garantie, prenez un hook `command` ou `http` [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices).

> **⚠️ Attention**
>
> Un hook de commande s’exécute avec toutes vos permissions d’utilisatrice ou d’utilisateur : il peut lire, modifier ou supprimer tout ce que votre compte atteint. Relisez et essayez chaque commande avant de l’ajouter. La documentation demande de valider les entrées, de mettre les variables entre guillemets, de refuser les chemins qui contiennent `..`, d’employer des chemins absolus et d’éviter les fichiers sensibles comme `.env` ou `.git/` [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks).

Chez Passerelle, Amadou a posé une règle du dossier : aucun numéro qui a la forme d’un numéro de sécurité sociale n’entre dans un fichier, même par erreur. Les courriers fictifs n’en portent que des faux, visiblement faux, `PASS-NIR-0000-0000`. Bernard en a fait un hook `PreToolUse` sur les outils `Write` et `Edit`, dans le `.claude/settings.local.json` de chaque poste (la raison suit), sous la forme qu’emploie la documentation pour une commande et ses arguments [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks) :

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
            "args": ["-I", "-B", "${CLAUDE_PROJECT_DIR}/.claude/hooks/garde_nir.py"],
            "timeout": 10,
            "onFailure": "block"
          }
        ]
      }
    ]
  }
}
```

Le hook lance `garde_nir.py` à chaque écriture, sans rien demander, avec tous vos droits : si Claude réécrivait ce script, le hook lancerait sans vous un code qu’il vient d’écrire. Ce guide propose une seule règle pour tout ce qui s’exécute ainsi :

**Ce qui s’exécute sans vous demander, comme ce hook ou le serveur du lexique du [chapitre 6](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch6), lance un fichier que Claude peut écrire. Avant chaque session, relisez ce qui a changé depuis le dernier commit relu : `git log` pour les commits, `git status` et `git diff HEAD` pour le reste, dans `.claude/`, `.mcp.json`, `outils/` et chaque script lancé.**

En mode Manual, chaque écriture de Claude vous est en plus demandée avant d’avoir lieu ([section 2.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-3)) : lisez-la quand elle touche l’un de ces fichiers. Le fichier `.claude/settings.local.json` reste hors de git : Claude Code l’en exclut quand il le crée. Si vous le créez à la main, ajoutez-le vous-même à `.gitignore` [\[33\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings). `git diff` ne le montre donc pas : `/hooks` montre les hooks qu’il déclare. Une modification directe du fichier de réglages est normalement prise en compte sans relancer la session [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks) : vérifiez par `/hooks` que le hook ajouté y figure, ou que le hook retiré n’y est plus, et relancez la session s’il n’a pas changé.

Avec `args`, `command` ne nomme que l’exécutable, lancé directement, sans passer par un shell, et `args` lui passe ses arguments un par un [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks). Sous macOS et Linux, où la commande s’appelle souvent `python3` (« Prérequis »), écrivez `"command": "python3"` : le nom doit être celui de votre poste. Si l’équipe mêle les systèmes, ce guide propose que chaque personne mette le hook dans son `.claude/settings.local.json`, avec le nom de son Python. Chez Passerelle, le portable d’Inès est sous Windows. Le poste de la permanence est sous Linux : chacun a son `python` ou son `python3`, et seuls les scripts des hooks, dans `.claude/hooks/`, se partagent par git. Le champ `onFailure` à `"block"` fait aussi bloquer l’action quand le hook lui-même échoue autrement [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks). Le script, `.claude/hooks/garde_nir.py`, lit l’appel d’outil sur son entrée et sort en 2 au moindre doute :

```python
"""Garde de Passerelle : refuse d'écrire un numéro qui a la forme d'un numéro de sécurité sociale."""
import json
import re
import sys

# 1 ou 2, puis quatorze chiffres, groupés par des espaces ou non.
FORME = re.compile(r"\b[12](?:\s?\d){14}\b")


def main() -> int:
    try:
        appel = json.load(sys.stdin)
        entree = appel["tool_input"]
        textes = [entree.get("content", ""), entree.get("new_string", "")]
    except (ValueError, KeyError, TypeError, AttributeError) as err:
        print(f"garde_nir : entrée illisible ({err}), écriture refusée par prudence", file=sys.stderr)
        return 2
    for texte in textes:
        if FORME.search(str(texte)):
            print("garde_nir : ce texte contient un numéro qui a la forme d'un numéro de sécurité sociale. "
                  "Passerelle n'écrit que des numéros visiblement faux, comme PASS-NIR-0000-0000.",
                  file=sys.stderr)
            return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
```

Bernard l’essaie d’abord à la main, sans Claude Code, avec une entrée fabriquée. Le numéro d’essai n’est écrit nulle part : la première commande le fabrique, un 1 suivi de quatorze zéros. Il a la forme qui déclenche la garde, sans qu’aucun numéro de cette forme figure en clair dans le guide ni dans le dépôt :

```bash
python -I -c "import json; print(json.dumps({'tool_name': 'Write', 'tool_input': {'file_path': 'essai.md', 'content': 'Numéro : 1' + '0' * 14}}))" | python -I -B .claude/hooks/garde_nir.py
echo $?
```

La sortie affiche le message de la garde, puis `2`. Sous PowerShell, la seconde ligne s’écrit `$LASTEXITCODE`. Une entrée qui n’est pas du JSON, comme `echo 'pas du json'`, sort aussi en 2 : c’est l’[échec fermé](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-echec-ferme), une garde qui ne comprend pas ce qu’elle reçoit ferme au lieu d’ouvrir.

La garde dit aussi ce qu’elle ne voit pas. Elle ne regarde que les outils `Write` et `Edit` : un fichier écrit par une commande du shell, par l’outil `Bash` ou par l’outil PowerShell, lui échappe, comme un numéro coupé en deux écritures ou écrit en lettres. Elle reconnaît une forme, pas une intention. Elle ne reconnaît aussi que les numéros faits de chiffres : un numéro de personne née en Corse porte 2A ou 2B à la place des deux chiffres du département [\[189\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-cle-nir), et lui échappe. La règle qui protège vraiment reste celle du [chapitre 1](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch1) : aucune donnée réelle dans le dossier. Une simple préférence, comme « préférer des phrases au présent », a trop d’exceptions pour un hook : elle reste dans `CLAUDE.md` [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices).

Le contrôle de Bernard, au [chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch5), s’impose par le même moyen. Un [hook Stop](https://gmag-dev.github.io/bien-demarrer-claude-code/#g-hook-stop) s’exécute chaque fois que Claude veut terminer son tour. S’il sort avec le code 2, Claude est renvoyé au travail, avec pour motif ce que la commande a écrit sur la sortie d’erreur [\[16\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-best-practices) [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks). Sans shell, un hook ne peut ni rediriger une sortie ni changer un code de sortie. Bernard confie donc ce travail à un petit script, `.claude/hooks/controle_fin_de_tour.py`, qui lance le contrôle et sort en 2 s’il échoue :

```python
"""Hook Stop de Passerelle : lance le contrôle des dates et des montants, et renvoie Claude au travail s'il échoue."""
import subprocess
import sys
from pathlib import Path

racine = Path(sys.argv[1])  # le dossier du projet, que le hook passe en argument
controle = subprocess.run([sys.executable, "-I", "-B", str(racine / "controle_dates.py"), "--tous"],
                          cwd=racine, capture_output=True, text=True)
if controle.returncode != 0:
    print(controle.stdout + controle.stderr, file=sys.stderr)  # le motif que Claude lira
    sys.exit(2)
```

Il le branche sur l’événement `Stop`, sous la même forme que la garde, une commande et ses arguments, `python3` sous macOS et Linux :

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python",
            "args": ["-I", "-B", "${CLAUDE_PROJECT_DIR}/.claude/hooks/controle_fin_de_tour.py", "${CLAUDE_PROJECT_DIR}"]
          }
        ]
      }
    ]
  }
}
```

Bernard l’installe comme la garde, dans le `.claude/settings.local.json` de chaque poste, pour la même raison, dite plus haut. Il l’essaie d’abord sur le poste de la permanence, puis l’installe sur le portable d’Inès. Seul son script, `.claude/hooks/controle_fin_de_tour.py`, est relu puis commité pour toute l’équipe. Ce fichier de réglages a déjà une racine `"hooks"`, celle de la garde : coller ce bloc à la suite ferait deux objets, un JSON invalide, que Claude Code ignore en bloc ([annexe L](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-l), [section L.8](https://gmag-dev.github.io/bien-demarrer-claude-code/#s-l-8)). Bernard ajoute donc la seule clé `"Stop"` dans l’objet `"hooks"` existant, après `"PreToolUse"` et une virgule. De même, si votre `.claude/settings.local.json` existe déjà, ajoutez-y la clé `"hooks"` dans son objet. `/hooks` doit ensuite montrer les deux hooks, l’un sous `PreToolUse`, l’autre sous `Stop`.

> **⚠️ Attention**
>
> Ce hook lance `controle_dates.py` à chaque fin de tour sans rien vous demander, avec tous vos droits, hors du bac à sable [\[18\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-sandboxing). Or Claude peut modifier ce script, et le hook ne passe pas par la règle `ask` qui fait demander votre accord avant chaque lancement du contrôle ([section 10.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-1)) : il lancerait sans vous un code que Claude vient d’écrire. La règle de ce qui s’exécute sans vous demander vaut donc pour lui, contrôle et modules qu’il importe compris. Le plus simple est de n’installer le hook qu’après le dernier changement prévu du contrôle : dans le dossier d’essai, après la correction du défaut. L’[annexe A](https://gmag-dev.github.io/bien-demarrer-claude-code/#ann-a) fait faire cette correction au jour 4, sans installer de hook : le hook `Stop` reste un geste de ce chapitre, à faire après le jour 4 si vous le voulez.
>
> Sur un dépôt dont le contrôle échoue déjà, ce hook `Stop` bloquerait chaque fin de tour, jusqu’au plafond, et un contrôle introuvable le fait aussi sortir en 2 : un script renommé, comme au [chapitre 14](https://gmag-dev.github.io/bien-demarrer-claude-code/#ch14), se met à jour dans le script du hook avant que le hook revienne. Installez-le seulement sur un projet dont le contrôle `--tous` passe déjà. Dans le dossier d’essai, faites d’abord expliquer les trois documents, jusqu’à ce que `python -I -B controle_dates.py --tous` passe. Relisez le hook avec `/hooks`, puis prouvez-le par un échec voulu : retirez vous-même une date d’un brouillon ou d’une explication, et posez à Claude une question simple. À la fin de son tour, Claude doit être renvoyé au travail, avec pour motif la sortie du contrôle qui nomme la date absente. C’est la preuve. Renvoyé au travail, Claude proposera sans doute de remettre la date : vous pouvez accepter cette écriture, que le mode Manual vous demande, et c’est le comportement attendu. Le contrôle repasse, et son tour se termine. Vous pouvez aussi la refuser, arrêter le tour par Échap, et remettre la date vous-même : le tour suivant se termine. Installez-le ensuite, de la même façon, sur les autres postes.

> **💡 Conseil**
>
> Si `/hooks` ne montre pas votre hook, `/status` donne les sources de réglages qui l’expliquent. Sur un poste dont l’organisation active `allowManagedHooksOnly`, seuls s’exécutent les hooks qu’elle déploie, et ceux du SDK Agent [\[32\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-settings-reference) : les vôtres, comme celui de l’exercice, ne tournent pas. Faites alors le même contrôle par une étape permise, un hook git `pre-commit` ou l’intégration continue ([section 18.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s18-2)), et l’exercice sur une machine personnelle ou dans un environnement jetable.

> **🔀 Quand la règle cède**
>
> - La relecture avant chaque session cède quand Claude modifie un fichier lancé pendant la session elle-même, comme le contrôle que le hook `Stop` lance à chaque fin de tour, ou quand le mode ne vous demande plus chaque écriture, comme le mode auto ([section 2.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#s2-3)).
> - Ce qui tient alors : une règle `deny` sur l’écriture du fichier lancé et du fichier qui le déclare, ou une règle `ask` quand Claude doit pouvoir l’écrire avec votre accord. Pour ajouter ou changer un hook ainsi protégé, faites-le vous-même dans votre éditeur. Chaque automatisme de ce guide a sa règle, et le fichier où elle va, au [tableau 17.3](https://gmag-dev.github.io/bien-demarrer-claude-code/#tab-17-3) ([section 17.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-2)).
> - Si le hook `Stop` bloque huit fins de tour d’affilée sans appel d’outil entre elles, Claude Code laisse le tour se terminer, à la date de consultation, le 6 novembre 2026, et la variable `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` relève ce plafond [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks).
> - Le champ `args` est présent 🕘 depuis la version 2.1.139 [\[1\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-changelog), le champ `onFailure` 🕘 depuis la version 2.1.295 [\[20\]](https://gmag-dev.github.io/bien-demarrer-claude-code/#src-hooks).
> - Pour aller plus loin : [section 17.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s17-2).

> **📌 À retenir**
>
> - Un skill est un prompt enregistré, chargé à la demande. `disable-model-invocation: true` le réserve à votre commande.
> - Un skill reste une consigne. Ce qui doit arriver à chaque fois va dans un hook de type `command` ou `http`.
> - Un hook s’exécute avec vos permissions : relisez-le avec `/hooks`, essayez-le à la main, et faites-le fermer quand il doute.
> - Sans shell, un hook nomme son exécutable dans `command` et ses arguments dans `args`, les chemins par `${CLAUDE_PROJECT_DIR}`.
> - Une extension est prouvée par son effet constaté, pas par sa présence dans une liste.

> **✏️ Exercice en trois barreaux**
>
> **Compétence visée** : écrire un skill réservé à votre commande et un hook qui ferme quand il doute, puis prouver que chacun agit par son effet constaté. Comptez 30 à 45 minutes.
>
> **① Exemple travaillé.** Inès a fait de son prompt du matin le skill `brouillon-pour-relecture` de la [section 7.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-1), réservé à sa commande. Elle lance Claude depuis le dossier de Passerelle :
>
> ```bash
> claude --permission-mode manual
> ```
>
> Puis elle tape `/brouillon-pour-relecture PASS-C-014`. Claude lit le seul courrier `PASS-C-014`, demande son accord pour écrire `brouillons/PASS-B-014.md`, puis pour lancer le contrôle, et montre la sortie `OK PASS-B-014`. Le skill a agi : un brouillon écrit, un contrôle lancé, une sortie montrée. **Pourquoi ?** Pourquoi réserver ce skill à sa commande, alors qu’il n’envoie rien ?
>
> **② À compléter.** Pour la garde que Bernard a installée en [section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-2), écrivez les deux vérifications qui prouveront qu’elle marche dans une vraie session, et ce que chacune doit montrer. Puis Inès veut un second skill, qui relit un seul brouillon et ne modifie rien : par la [figure 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#fig-7-2), dites s’il garde le défaut ou prend l’un des trois champs, et pourquoi.
>
> **③ Sur votre projet.** Écrivez un skill réservé à votre commande pour une procédure que vous répétez, et lancez-le. Puis écrivez un hook `PreToolUse` qui refuse toute écriture dans un dossier protégé de votre projet. Prouvez-le par les deux vérifications du barreau ②, puis appliquez la règle de la [section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-2) avant la session suivante.
>
> **Sans code** : un skill est un texte d’instructions, sans code. Pour le dossier protégé, n’installez pas un hook que vous ne savez pas relire : il s’exécuterait avec tous vos droits, et `/hooks` montre qu’il est chargé, pas ce qu’il fait ([section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-2)). Écrivez à la place, dans `.claude/settings.local.json`, une règle `deny` d’une ligne, `Edit(./protege/**)`, que le harnais applique sans script ([section 10.1](https://gmag-dev.github.io/bien-demarrer-claude-code/#s10-1)). Ou faites relire le hook, ligne par ligne, par une personne qui lit le code, avant de l’ajouter. Puis faites vous-même les deux vérifications, avec `/permissions` à la place de `/hooks`, et le message de refus de la règle.
>
> **Critère de réussite** : le skill lancé par sa commande et son résultat visible, `/hooks` qui montre le hook, une demande d’écriture refusée avec le message du hook, et le fichier inchangé dans `git status` et `git diff`. Avant la session suivante, la règle de la [section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-2) appliquée : les sorties de `git status` et de `git diff HEAD`, relues. Par le chemin sans code, vous constatez trois choses : `/permissions` montre la règle `Edit(./protege/**)` parmi les refus, la demande d’écriture dans `protege/` est refusée avec le message de la règle, et le fichier visé, rouvert, n’a pas changé.
>
> **Voir le corrigé expliqué (après votre essai)**
>
> **①** Pour qu’il parte quand Inès le décide, pas quand Claude juge qu’un courrier aurait besoin d’un brouillon, et sa description ne coûte plus rien en contexte. Le brouillon `PASS-B-014` n’est qu’un brouillon : Odile le relit et décide s’il peut servir, et la destinataire décide de ce qu’elle fait de son courrier.
>
> **②** Première vérification : `/hooks` montre le hook sous `PreToolUse`, avec le `matcher` `Write|Edit`. Elle prouve qu’il est chargé, pas qu’il refuse. Seconde vérification : demander à Claude, en mode Manual, d’écrire dans un brouillon le numéro d’essai, décrit en mots dans la demande : un 1 suivi de quatorze zéros. Le message de `garde_nir` doit s’afficher, et `git status` ne doit montrer aucun fichier nouveau ni modifié. Erreur fréquente : s’arrêter à `/hooks`. Le second skill garde le défaut : il ne modifie rien (question 1), Inès le lance elle-même (question 2), et la relecture d’un seul brouillon n’inonde pas la conversation (question 3). Pour un lot de dix brouillons, `context: fork` deviendrait la bonne réponse.
>
> **③** Vous devez voir le résultat du skill, puis le refus du hook avec son message, et un `git diff` vide sur le dossier protégé. Si le hook ne refuse rien, vérifiez son `matcher` et son code de sortie, 2 et non 1. S’il n’apparaît pas dans `/hooks`, lisez le Conseil de la [section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/#s7-2). Si votre poste n’admet que les hooks de l’organisation, la ligne du [tableau 6.5](https://gmag-dev.github.io/bien-demarrer-claude-code/#tab-6-5) vous envoie vers une règle `deny`, un hook git ou l’intégration continue : c’est la bonne réponse, pas un échec.

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/#toc)

![Illustration : la personne en long manteau violet et son petit compagnon de cristal cyan, à un pupitre sur une terrasse de nuit, envoient trois compagnons vers trois bâtiments de la ville, où ils travaillent en même temps.](https://gmag-dev.github.io/bien-demarrer-claude-code/images/2be248907780.avif)
