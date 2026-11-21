<!-- SPDX-FileCopyrightText: 2026 Gabrielle Magnan -->
<!-- SPDX-License-Identifier: MIT -->
# Le dossier d'essai : trois documents inventés et le contrôle de référence

## Ce que contient le dossier

Le dossier de votre premier projet avec Claude Code, prêt à copier (section 2.1 du guide, et l'annexe A). Rien n'y est réel : les organismes, les dates et les montants sont inventés, et aucun document ne porte de nom de personne.

| Fichier | Ce que c'est |
|---|---|
| `documents/ESSAI-C-001.txt` | un courrier fictif de la Médiathèque de Rivelune : une cotisation à régler, et un montant sans centimes que le contrôle ne voit pas (le défaut à corriger) |
| `documents/ESSAI-C-002.txt` | un courrier fictif de la Caisse des écoles de Rivelune : un nouveau tarif de cantine |
| `documents/ESSAI-C-003.txt` | un courrier fictif de la Régie de l'eau de Rivelune : un échéancier, avec des dates écrites en chiffres |
| `controle_dates.py` | le contrôle de référence, pour le chemin avec code : il compare les dates et les montants de chaque document à ceux de son explication |
| `test_controle_dates.py` | ses tests, qui montrent le contrôle en échec sur des cas faux avant de le croire vert |

Rivelune est la commune fictive du fil rouge du guide, celle de l'association Passerelle. Les documents ont la forme de ses courriers, avec un préfixe à eux, `ESSAI-` : ils ne se mêlent pas aux courriers `PASS-` de Passerelle.

## Copier le dossier

Copiez le dossier entier dans votre dossier personnel, sous le nom `mon-essai`.

**Avec le terminal**, depuis le dossier où vous avez rangé le guide, qui contient `exemples/`. Placez-vous-y par `cd` suivi de son chemin, par exemple `cd ~/Downloads/guide-claude-code-v<version>`, en remplaçant `<version>`, chevrons compris, par la version écrite sur la page de titre du guide. Si ce dossier ne contient pas `exemples/`, mais un dossier du même nom que le paquet, entrez d'abord dans ce dernier. Puis :

```bash
cp -R exemples/mon-essai ~/mon-essai
```

Sous Windows, dans PowerShell :

```powershell
Copy-Item -Recurse exemples\mon-essai $HOME\mon-essai
```

Si un dossier `mon-essai` existe déjà dans votre dossier personnel, ces commandes copient le nouveau à l'intérieur, en `mon-essai/mon-essai` : renommez d'abord l'ancien, ou copiez sous un autre nom, comme `~/mon-essai-2`, et employez ce nom dans la suite.

**Sans le terminal**, avec l'Explorateur de fichiers ou le Finder : copiez le dossier `mon-essai`, puis collez-le dans votre dossier personnel.

Puis, dans le terminal, `cd ~/mon-essai`, et la suite de la section 2.1 : l'identité de git, `git init -b main`, le premier commit, puis `claude --permission-mode manual`.

## Le travail proposé

1. Demandez à Claude, en mode plan, l'explication d'un document dans un fichier, en phrases simples. Le jour 3 de l'annexe A le fait pour `ESSAI-C-002` : « /plan Explique-moi en phrases simples documents/ESSAI-C-002.txt, dans explications/ESSAI-E-002.md, en recopiant chaque date et chaque montant tels que le document les écrit. » Le jour 4 sans code fait de même pour `ESSAI-C-001`, dans `explications/ESSAI-E-001.md`.
2. Vérifiez l'explication.
   - **Sans code** : pour `ESSAI-C-001`, écrivez d'abord vous-même, sans Claude, la liste de ses dates et de ses montants, un par ligne, tels que le document les écrit, dans `liste-ESSAI-C-001.txt`. Puis lancez vous-même la comparaison, qui cherche chaque ligne de la liste dans l'explication, sans demander l'avis du modèle (annexe A, section A.2). Elle nomme chaque ligne absente de l'explication, et n'affiche rien si toutes y sont. Sous macOS et Linux :

     ```bash
     while IFS= read -r l || [ -n "$l" ]; do l=${l%$'\r'}; grep -qF -- "$l" explications/ESSAI-E-001.md || echo "absent de l'explication : $l"; done < liste-ESSAI-C-001.txt
     ```

     Sous Windows, dans PowerShell :

     ```powershell
     Get-Content -Encoding UTF8 liste-ESSAI-C-001.txt | Where-Object { $_ -and -not (Select-String -Quiet -SimpleMatch -Encoding UTF8 -Pattern $_ -Path explications\ESSAI-E-001.md) } | ForEach-Object { "absent de l'explication : $_" }
     ```

   - **Avec code** : lancez vous-même le contrôle de référence, ou laissez Claude le lancer après votre accord :

     ```bash
     python3 -I -B controle_dates.py ESSAI-C-002
     ```

     Sous Windows, dans PowerShell :

     ```powershell
     python -I -B controle_dates.py ESSAI-C-002
     ```

3. **Voyez la vérification échouer une fois.** Retirez une date de l'explication, relancez la même vérification, et lisez l'absence qu'elle signale. Remettez la date, et relancez : elle passe. Une vérification qu'on n'a jamais vue échouer ne prouve rien (section 5.1).

Avant toute explication, `controle_dates.py --tous`, qui contrôle tous les documents, échoue sur les trois, « explication absente » : c'est attendu.

## Le défaut à corriger

Le contrôle de référence a un défaut, laissé exprès pour le jour 4 de l'annexe A et l'exercice de passage du chapitre 5 : il ne voit pas un montant écrit sans centimes. `documents/ESSAI-C-001.txt` dit « Une carte perdue est remplacée pour 3 euros. » Une explication qui perd ces 3 euros passe pourtant le contrôle, sans un mot. Le même défaut joue dans l'autre sens : une explication juste qui écrit « 12 euros » au lieu de « 12,00 euros » échoue, jusqu'à la correction.

1. Demandez d'abord un seul test, ajouté à `test_controle_dates.py`, qui échoue sur ce cas : une explication de `ESSAI-C-001` sans les 3 euros doit être signalée, par le message « montant du document absent de l'explication : 3,00 euros ». Faites-le lancer, et regardez-le échouer : 10 tests, FAILED (failures=1).
2. Puis la correction, dans `controle_dates.py`, et la sortie de tous les tests, qui passent : 10 tests, OK.
3. Relisez le diff, et committez vous-même, en nommant les fichiers : `git add controle_dates.py test_controle_dates.py`, en y ajoutant tout fichier de test neuf que `git status` liste, puis `git commit -m "Lit un montant sans centimes, et son test"`.

Les 9 tests livrés passent avant la correction : c'est bien le défaut, aucun d'eux ne regarde un montant sans centimes.

## Le hook `Stop`, après la correction

Facultatif, et seulement après la correction du défaut : l'annexe A ne le fait pas installer. Le hook `Stop` de la section 7.2 lance la commande `controle_dates.py --tous` à chaque fin de tour, par le script `.claude/hooks/controle_fin_de_tour.py` que donne cette section. Il la lance sans rien vous demander, avec tous vos droits, hors du bac à sable : il contourne la demande d'accord de la dernière ligne de ce fichier, et lancerait sans vous un contrôle que Claude vient de modifier. D'où la relecture du point 3.

1. Installez-le seulement après le dernier changement prévu du contrôle, c'est-à-dire après la correction du défaut ci-dessus, et quand le contrôle `--tous` passe déjà. Sur le chemin avec code, à la fin de la semaine, seul `ESSAI-C-002` a son explication : faites d'abord expliquer les trois documents, `ESSAI-C-001` et `ESSAI-C-003` comme `ESSAI-C-002` au jour 3, jusqu'à ce que le contrôle `--tous` passe. Sinon il renverrait Claude au travail à chaque fin de tour.
2. Mettez-le dans `.claude/settings.local.json`. Sous macOS et Linux, son réglage nomme `python3` au lieu de `python`. Ajoutez sa clé `"Stop"` dans l'objet `"hooks"` du fichier s'il en a déjà un. Ce dossier ne livre pas de `.gitignore` : si vous créez ce fichier à la main, ajoutez vous-même la ligne `.claude/settings.local.json` à `.gitignore`.
3. Appliquez la règle de la section 7.2 : avant chaque session, relisez ce qui a changé depuis le dernier commit relu, par `git log`, `git status` et `git diff HEAD`, `controle_dates.py` compris. Hors de git, `.claude/settings.local.json` se relit par `/hooks`.
4. Une modification directe du fichier est normalement prise en compte sans relancer la session. Relisez le hook avec `/hooks` : s'il n'y est pas, relancez la session. Puis prouvez le hook par un échec voulu : retirez vous-même une date d'une explication, et posez à Claude une question simple. À la fin de son tour, Claude doit être renvoyé au travail, avec pour motif la sortie du contrôle qui nomme la date absente. C'est la preuve. S'il propose alors de remettre la date, vous pouvez accepter cette écriture : le contrôle repasse, et le tour se termine. Ou refusez-la, arrêtez le tour par Échap, et remettez la date vous-même.

## Tester le contrôle

```bash
python3 -I -B -m unittest -v
```

Sous Windows, dans PowerShell :

```powershell
python -I -B -m unittest -v
```

Résultat attendu : 9 tests, OK. Le dossier n'a pas de fichier `__init__.py` : la commande qui lance tous les tests de `exemples/` ne descend pas dans ce dossier, qui se teste depuis lui-même.

## Les limites

- Le contrôle compare des formes écrites, pas des valeurs. Il reconnaît les dates en lettres avec leur année (« 1er janvier 2027 ») et en chiffres (« 15/01/2027 »), et les montants suivis de « euros » ou de « € », s'ils ont des centimes (« 12,00 euros ») et, au-delà de 999, une espace entre les milliers (« 1 234,56 euros ») : un montant sans centimes lui échappe, c'est le défaut à corriger. Une date écrite autrement, comme « le 15 du mois prochain », ou un montant sans espace entre les milliers, comme « 1234,56 euros », lui échappe aussi.
- Une explication juste peut donc échouer : une date sans son année (« avant le 31 janvier »), une année dite une seule fois pour plusieurs dates (« le 15 janvier, le 15 février et le 15 mars 2027 »), un montant sans ses centimes (« 12 euros », jusqu'à la correction du défaut) ou écrit avec un point (« 12.00 euros »). Le message peut alors nommer un montant que l'explication n'écrit pas, comme « 0,00 euros ». Lisez le message : s'il nomme une date ou un montant que l'explication dit bien, sous une autre forme, l'explication n'est pas fausse. Demandez alors à Claude de recopier les dates et les montants tels que le document les écrit. Avec le hook `Stop` installé, un tel échec renvoie Claude au travail, et il réécrit une explication juste pour satisfaire le contrôle.
- Une date impossible (« 01/13/2027 »), un fichier qui n'est pas enregistré en UTF-8, ou un dossier `documents/` vide arrêtent le contrôle en code 2, avec un message : ce n'est pas un verdict sur l'explication.
- Il compare des dates et des montants, pas le sens : une explication peut les garder tous et rester confuse. Une personne relit encore.
- Laissez la commande du contrôle demander votre accord. Claude peut modifier `controle_dates.py` : une règle `allow` qui le lance lui laisserait exécuter sans vous un script qu'il vient d'écrire (section 17.2).
