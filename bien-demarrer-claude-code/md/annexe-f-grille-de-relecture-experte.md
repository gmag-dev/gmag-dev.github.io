> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.4.0 : « Annexe F. Grille de relecture experte ».
>
> - Précédent : [Annexe E. Gabarits](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-e-gabarits.md)
> - Suivant : [Annexe G. Grille d’auto-évaluation](https://gmag-dev.github.io/bien-demarrer-claude-code/md/annexe-g-grille-d-auto-evaluation.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-f-grille-de-relecture-experte.html#h-ann-f>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## Annexe F. Grille de relecture experte

Cette grille sert à relire un chapitre de la Partie I avec des yeux d’experte. Elle ne retire aucune règle : elle cherche où chaque règle cède, et range la réponse au bon endroit, dans l’encadré « Quand la règle cède » de la section ou en Partie II, avec un renvoi. C’est la relecture que décrit l’encadré « Quand la règle cède » de « Apprendre avec ce guide ». La grille est proposée par ce guide.

### F.1 Les six questions

Une règle débutante trop nette ne se nuance pas sur place : elle reste nette, et sa limite se marque à la fin de sa section. La grille pose six questions à chaque règle, dans cet ordre.

**Tableau :** La grille de relecture experte. Proposée par ce guide.

| Question | Ce qu’on cherche | Preuve attendue |
| --- | --- | --- |
| 1. La règle tient-elle encore ? | la source citée dit-elle toujours la même chose, à la date du jour ? | la source relue, sa date, la version de Claude Code |
| 2. Où cède-t-elle ? | la situation qui contredit la règle : un mode, une option, une autre forme de commande, un autre système | la situation décrite, et si possible un essai reproductible dans un environnement jetable |
| 3. Le « pourquoi » est-il donné ? | la raison de la règle, sans laquelle elle se perd à la première exception | la phrase qui donne la raison, ou son absence notée |
| 4. Que suppose-t-elle du poste ? | le système (Windows natif, macOS, Linux, WSL 2), des réglages gérés par une organisation, le forfait | la marque 🟡 À vérifier ajoutée quand la règle dépend de la configuration |
| 5. L’exercice prouve-t-il la compétence ? | une preuve que la lectrice peut constater : une sortie, un diff, un fichier | la preuve que l’exercice produit, ou le constat qu’il n’en produit pas |
| 6. Rien de trop ? | un détail d’expert hors de l’encadré « Quand la règle cède » | le passage à déplacer dans l’encadré de la section, ou vers la Partie II |

Une réponse à la question 2 qui ne s’appuie sur aucune source ni aucun essai reste une hypothèse : elle ne va pas dans le guide comme un fait.

### F.2 La note d’expert

Chaque situation trouvée à la question 2 donne une [note d’expert](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-note-d-expert). Elle tient en six lignes. Sa forme courte va dans l’encadré « Quand la règle cède » de la section, en trois puces : la situation où la règle cède, ce qui tient alors, le renvoi. Sa forme longue va en Partie II.

**Tableau :** La forme d’une note d’expert, avec un exemple tiré de la [section 1.4](https://gmag-dev.github.io/bien-demarrer-claude-code/1-ce-qu-est-claude-code.html#s1-4). Proposée par ce guide.

| Champ | Contenu | Exemple |
| --- | --- | --- |
| Règle relue | la règle et sa section | ce qui ne souffre aucune exception devient une règle imposée, que le harnais applique ([section 1.4](https://gmag-dev.github.io/bien-demarrer-claude-code/1-ce-qu-est-claude-code.html#s1-4)). Chez Passerelle 🌉 : « l’outil n’envoie jamais rien » |
| Vérification | la date et la version de Claude Code | le jour de la relecture, avec la version affichée par `claude --version` |
| Où elle cède | la situation qui la contredit | une règle `deny` porte sur le texte de l’appel d’outil, pas sur l’intention : un script lancé par Claude peut encore lire le fichier qu’elle protège [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permissions) |
| Ce qui tient alors | la parade qui reste vraie dans cette situation | ce qui doit tenir à coup sûr se place aussi là où le poste ne peut pas l’atteindre, comme la protection d’une branche sur le serveur. Pour Passerelle, aucun outil web ni serveur qui sort. Le shell sort encore : sa sortie est réduite, sous garde humaine, en mode Manual (sections [10.3](https://gmag-dev.github.io/bien-demarrer-claude-code/10-securite.html#s10-3) et [17.4](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#s17-4)) |
| Source | la source publique relue | la page des permissions de Claude Code [\[14\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-permissions) |
| Renvoi | le renvoi posé dans le chapitre débutant, ou « aucun » | « Pour aller plus loin : [section 17.3](https://gmag-dev.github.io/bien-demarrer-claude-code/17-le-harnais-en-couches.html#s17-3) et [chapitre 18](https://gmag-dev.github.io/bien-demarrer-claude-code/18-hooks-serveurs-mcp-ligne-d-etat-et-taches-planifiees.html#ch18) », à la fin de la [section 1.4](https://gmag-dev.github.io/bien-demarrer-claude-code/1-ce-qu-est-claude-code.html#s1-4) |

**Pour vous exercer.** Appliquez la grille à une section de la Partie I que vous utilisez souvent. Pour chaque situation trouvée à la question 2, écrivez une note d’expert dans la forme du tableau, et vérifiez que son renvoi mène bien à une section qui existe. Une note dont la source n’a pas été relue ce jour-là porte la marque 🟡 À vérifier.

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/guide-en-une-page.html#toc)
