> Morceau de la version Markdown de **Bien démarrer avec Claude Code**, version 3.5.0 : « Prérequis ».
>
> - Précédent : [Apprendre avec ce guide](https://gmag-dev.github.io/bien-demarrer-claude-code/md/apprendre-avec-ce-guide.md)
> - Suivant : [1. Ce qu’est Claude Code](https://gmag-dev.github.io/bien-demarrer-claude-code/md/1-ce-qu-est-claude-code.md)
> - Sommaire : [llms.txt](https://gmag-dev.github.io/bien-demarrer-claude-code/llms.txt), tous les morceaux dans l'ordre de lecture
> - Page en ligne : <https://gmag-dev.github.io/bien-demarrer-claude-code/prerequis.html#h-prerequis>
> - Licence du texte : <https://creativecommons.org/licenses/by-nc-nd/4.0/>

---

## Prérequis

Ce guide sert dans deux situations. Repérez la vôtre : elle dit ce que vous lisez sur cette page.

- **Chez vous, sur votre propre ordinateur, avec votre propre compte.** C’est vous qui décidez : il n’y a personne à qui demander, et les deux encadrés qui suivent ne vous concernent pas. Il vous faut un abonnement qui donne accès à Claude Code : la liste plus bas les nomme, et l’offre gratuite n’en fait pas partie [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-setup). Deux précautions sont un minimum. Lisez le réglage d’amélioration des modèles avant votre première session : la même liste dit où le trouver. Et ne confiez à ce compte que ce qui est à vous : jamais un document de votre employeur, d’un client ou d’une autre personne ([section 23.1](https://gmag-dev.github.io/bien-demarrer-claude-code/23-securite-et-propriete-intellectuelle-en-entreprise.html#s23-1)). Si ce compte doit servir à une activité professionnelle, lisez d’abord ses conditions d’utilisation, car celles des consommateurs de l’Espace économique européen et de la Suisse prévoient un usage non commercial [\[190\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-consumer-terms). Allez ensuite à cette liste, après les deux encadrés.
- **Sur un ordinateur fourni par votre employeur ou par une autre organisation.** Lisez les deux encadrés qui suivent avant toute installation : ils passent avant le reste de la page.

> **⚠️ Attention**
>
> Sur un ordinateur fourni par votre employeur ou par une autre organisation, n’installez rien de ce guide avant son accord : ni git, ni Python, ni Claude Code. Posez d’abord quatre questions à la personne qui gère le poste. Claude Code y est-il permis ? Avec quel compte ? Pouvez-vous installer vous-même un logiciel, Git for Windows et Python compris ? Le réseau de l’organisation demande-t-il un réglage, un proxy par exemple ? Ses règles passent avant ce guide ([section 23.1](https://gmag-dev.github.io/bien-demarrer-claude-code/23-securite-et-propriete-intellectuelle-en-entreprise.html#s23-1) du guide). Des données de votre employeur ne passent que par le compte que votre organisation vous fournit pour cela, un compte commercial Team, Enterprise ou API : jamais par un compte que vous avez ouvert vous-même, ni par un abonnement Pro, Max ou Ultra, même payé par votre employeur. Qu’une installation passe sans droits d’administration ne veut pas dire qu’elle est permise. Si un installeur demande des droits que vous n’avez pas, si PowerShell refuse un script, ou si la connexion échoue sur le réseau de l’organisation, ne contournez rien : arrêtez-vous et posez la question.

Avant le jour 1, ouvrez la page « Préparez votre poste », [`preparez-votre-poste.html`](https://gmag-dev.github.io/bien-demarrer-claude-code/preparez-votre-poste.html), livrée avec ce guide. Elle est pour vous : elle reprend cet encadré et le message ci-dessous. Envoyez ce message, et non la page, à la personne qui gère votre poste.

> **💡 Conseil**
>
> Le message à transmettre à la personne qui gère votre poste, à copier tel quel :
>
> ```text
> Bonjour,
> Je voudrais essayer Claude Code, l'outil d'Anthropic, avec un guide de prise en main. Avant d'installer quoi que ce soit sur mon poste, pouvez-vous me dire :
> 1. Claude Code est-il permis sur ce poste, et avec quel compte de l'organisation (Team, Enterprise ou API) ?
> 2. Puis-je installer moi-même git (Git for Windows sous Windows) et Python 3, ou devez-vous le faire ?
> 3. Le réseau demande-t-il un réglage, un proxy par exemple ?
> 4. Quelles données de l'organisation ai-je le droit de lui confier ?
> Merci.
> ```

Avant le [chapitre 1](https://gmag-dev.github.io/bien-demarrer-claude-code/1-ce-qu-est-claude-code.html#ch1), vérifiez ces quatre points. Sautez cette liste si vous avez déjà un abonnement qui donne accès à Claude Code, un système assez récent, un terminal et, pour le chemin avec code, Python. Sur un poste fourni par une organisation, ne sautez jamais les deux encadrés qui la précèdent.

- **L’abonnement** : Pro, Max, Ultra, Team ou Enterprise, ou un compte de la console Anthropic. L’offre gratuite de claude.ai ne donne pas accès à Claude Code [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-setup). Ce que coûte chaque offre change souvent, et ce guide n’en donne aucun montant : la page des tarifs d’Anthropic le dit [\[6\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-tarifs). Sur un compte fourni par votre organisation, le coût est celui de son contrat. Sur un compte personnel, lisez avant votre première session le réglage d’amélioration des modèles, parmi les réglages de confidentialité de claude.ai, `claude.ai/settings/data-privacy-controls` : activé, il permet l’entraînement des modèles sur vos sessions, Claude Code compris ([section 23.1](https://gmag-dev.github.io/bien-demarrer-claude-code/23-securite-et-propriete-intellectuelle-en-entreprise.html#s23-1)) [\[8\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-data-usage).
- **Le système** : macOS 13.0, Windows 10 version 1809, Ubuntu 20.04 ou Debian 10, ou plus récents. La liste complète est à la [section C.1](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-c-installer-par-systeme.html#s-c-1) [\[7\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-setup).
- **Un [terminal](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-b-glossaire.html#g-terminal)**, la fenêtre où l’on tape des commandes. Sous Windows, tapez « PowerShell » dans le menu Démarrer. Sous macOS, tapez « Terminal » dans Spotlight (`Cmd+Espace`). Sous Ubuntu, `Ctrl+Alt+T` [\[9\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-ubuntu-terminal).
- **Python 3**, pour le chemin avec code seulement, dont les contrôles sont de petits scripts, à partir du [chapitre 5](https://gmag-dev.github.io/bien-demarrer-claude-code/5-verification-et-tests.html#ch5) et dès le jour 2 de l’[annexe A](https://gmag-dev.github.io/bien-demarrer-claude-code/annexe-a-ma-premiere-semaine.html#ann-a). `python --version` affiche un numéro qui commence par 3. Sous Linux et macOS, la commande s’appelle souvent `python3` : tapez-la là où le guide écrit `python` [\[10\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-python-unix) [\[11\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-python-mac). Sous Windows, si `python --version` n’affiche pas de numéro, installez le gestionnaire d’installation de Python (Python install manager), depuis le Microsoft Store ou depuis la page de téléchargement de python.org : les deux versions sont identiques [\[12\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-python-windows). Puis ouvrez une nouvelle fenêtre PowerShell et retapez la commande. Si elle ne répond toujours pas, vérifiez que la commande `py` répond, comme le conseille la page d’aide de Python [\[12\]](https://gmag-dev.github.io/bien-demarrer-claude-code/sources.html#src-python-windows). Si seule `py` répond, tapez `py` là où le guide écrit `python`, y compris dans la commande d’un hook ([section 7.2](https://gmag-dev.github.io/bien-demarrer-claude-code/7-ecrire-ses-premieres-extensions.html#s7-2)). Si aucune des deux ne répond, ou si l’installation demande des droits que vous n’avez pas, demandez à la personne qui gère le poste (encadré en tête de cette page).

Le chemin sans code ne demande pas Python. « Sans code » veut dire : sans programmer, mais avec un terminal, où vous tapez les commandes que donne le guide, git, et deux fichiers de réglages à modifier.

Le dossier d’essai et git se préparent au début du [chapitre 2](https://gmag-dev.github.io/bien-demarrer-claude-code/2-bien-demarrer.html#ch2), [section 2.1](https://gmag-dev.github.io/bien-demarrer-claude-code/2-bien-demarrer.html#s2-1).

[Retour au sommaire](https://gmag-dev.github.io/bien-demarrer-claude-code/guide-en-une-page.html#toc)

Partie I

Bien démarrer et bien travailler

Chapitres [1](https://gmag-dev.github.io/bien-demarrer-claude-code/1-ce-qu-est-claude-code.html#ch1) à [13](https://gmag-dev.github.io/bien-demarrer-claude-code/13-les-pieges-frequents.html#ch13)

Ce guide est gratuit, en entier. Le soutenir est libre et facultatif.

Votre soutien m’aide à préparer d’autres publications et à mener des projets humanistes.

Le soutien passe par Tipeee, un site tiers : le lien s’ouvre dans un nouvel onglet.

[Soutenir ce guide sur Tipeee](https://fr.tipeee.com/gmag-dev)

![Illustration : la personne en long manteau violet et son petit compagnon de cristal cyan, devant un noyau lumineux tenu dans un cadre de rails, entouré d’outils flottants reliés par des fils de lumière.](https://gmag-dev.github.io/bien-demarrer-claude-code/images/4f56525102f0.avif)
