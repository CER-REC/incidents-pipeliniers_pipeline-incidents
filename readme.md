La version française suit.

# [Pipeline Incident Visualization](https://apps2.cer-rec.gc.ca/pipeline-incidents)

## About

This Incidents at CER-Regulated Pipeline and Facilities interactive online tool is part of the Canada Energy Regulator’s (CER) Data Visualization Initiative (DVI). The DVI is a three-year initiative to transform how the CER (formerly the National Energy Board) structures and shares data. The objective is to enable evidence-based decision making and remove barriers to understanding Canada’s energy and pipeline systems through the use of user-friendly interactive visualizations. This visualization is based on CER data from 2008 to current for incidents reported under the Onshore Pipeline Regulations and the Processing Plant Regulation. In the months and years to come we will use this innovative format to share our pipeline safety data, energy data series, energy infrastructure information, and a host of other topical data. In addition, other online tools can be found in the [CER Safety Performance Portal](https://www.cer-rec.gc.ca/sftnvrnmnt/sft/dshbrd/index-eng.html).

If you want to use the data for research and undertake your own review, all the data is downloadable and shareable. The chart images are also downloadable

We hope we are hitting the mark. Your feedback is essential.

Email us with your comments and ideas: energyindesign@cer-rec.gc.ca. We look forward to hearing from you.

## About this Repository
This repository includes the code and data needed to run a local version of the incident visualization app.

You can download and run the application code to see how it was built and explore the data on your own computer. (If you only want to explore the visualization, you may want to [view the app](https://apps2.cer-rec.gc.ca/pipeline-incidents) on the CER's website.)

## Prerequisites

- [Node + NPM](https://nodejs.org/en/) > v6.10
- Git
- *optional* [Screenshot Service](https://github.com/NEBGitHub/screenshot-service_service-copie-d-ecran) application

## Installing and Running

Follow these instructions at the command line tool on your computer (Powershell or CMD on Windows, Terminal on MacOS, Konsole or similar on GNU/Linux).

- Download a local copy of the source code: `git clone git@github.com:NEBGitHub/incidents-pipeliniers_pipeline-incidents.git incidents`
- Change into the incidents directory: `cd incidents`
- Install project dependencies: `npm install`
- Run the development server: `npm run start`
- Visit [http://localhost:3001/pipeline-incidents]() in your browser.

## Building for deployment

The deployment build of the incident visualization is intended for use with the CER's hosting environment, and may not be of much interest to the public. In the project folder, run:

- `npm run build`

This produces `public/script/bundle.js`, a single file version of the app. If this file is present, it is used pereferentially by the development server rather than the code under `app/`.

## Contributors

### Data Source

Andrew Benson, Karen Duckworth, Randy Cooke

### Coordination

Annette Hester (Concept and Coordination); Katherine Murphy (Project Manager); Faiza Hussain (Administrative support); Stephen Chow (Data Coordination)

### Data Visualization

Lead Design Research: Sheelagh Carpendale and Wesley Willett, iLab, University of Calgary.

Design: Bon Adriel Aseniero, Peter Buk, Shreya Chopra, Søren Knudsen, Doris Kosminsky, Claudia Maurer, Lien Quach, Katrina Tabuli, Annie Tat, Jo Vermeulen, Jagoda Walny Nix, and Mieka West.

### Lead Technical: Vizworx

Technical: Patrick King, Alaa Azazi, Charlie Cheung, Abhishek Sharma, and Ben Cousins

## Contact Us

We're the development team with VizworX who put this project together for the CER. We aren't able to provide extensive support for this project, but you're welcome to reach out with questions and thoughts!

* Patrick King - patrick.king@vizworx.com
* Alaa Azazi - alaa.azazi@vizworx.com
* Charlie Cheung - charlie.cheung@vizworx.com
* Ben Cousins - ben.cousins@vizworx.com

## License
All of the project materials are licensed under the [Open Government License - Canada](http://open.canada.ca/en/open-government-licence-canada).

## Third Party Licenses

Fonts: Fira fonts used under the Open Font License Version 1.1.

[Map of Canada](http://www.arcgis.com/home/item.html?id=dcbcdf86939548af81efbd2d732336db)
 © 2003 Government of Canada with permission from Natural Resources Canada.

Map: “Map showing provinces and territories reporting 2009 swine flu (H1N1) cases in Canada” by Fonadier from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:H1N1_Canada_map.svg). Licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/deed.en). (Re-coloured and rotated from original.)

Tell Me A Story icon: by Bon Adriel Aseniero. Licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).

Methodology icon: [Process by Rflor](https://thenounproject.com/rflor/collection/infography-circles/?oq=methodology&cidx=0&i=363475) from [thenounproject.com](http://thenounproject.com/). Licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/deed.en).

Reset icon: [Reset by Mooms](https://thenounproject.com/search/?q=reset&i=1033424) from [thenounproject.com](http://thenounproject.com/). Licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/deed.en).

Facebook icon: By Elegant Themes from [www.flaticon.com](https://www.flaticon.com). Licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/deed.en).


# [Visualisation des incidents pipeliniers](https://apps2.cer-rec.gc.ca/incidents-pipeliniers/)

## Le Projet

L’outil interactif « Incidents impliquant des installations et des pipelines réglementés » fait partie de l’initiative de visualisation des données de la Régie de l’énergie du Canada. Échelonnée sur trois ans, cette initiative vise à transformer la manière dont la Régie (anciennement appelée l’Office national de l’énergie) structure et diffuse ses données. Elle a pour objectif de favoriser un processus décisionnel fondé sur la preuve et de faciliter la compréhension des questions liées aux réseaux énergétiques et pipeliniers du Canada, grâce à un outil de visualisation interactif, facile à utiliser. L’outil présente les données recueillies par la Régie de 2008 à aujourd’hui en ce qui concerne les incidents signalés en application du Règlement de la Régie de l’énergie du Canada sur les pipelines terrestres et du Règlement sur les usines de traitement. Au cours des mois et des années à venir, la Régie utilisera cet outil novateur pour diffuser ses données sur la sécurité des pipelines et sur l’énergie, l’information qu’il possède sur l’infrastructure énergétique et une foule d’autres renseignements spécialisés. Par ailleurs, le portail [Rendement en matière de sécurité](https://www.cer-rec.gc.ca/sftnvrnmnt/sft/dshbrd/index-fra.html) comporte d’autres outils interactifs en ligne.

Si vous souhaitez utiliser les données pour vos recherches ou pour en faire votre propre analyse, vous pouvez les télécharger et les partager. Les graphiques peuvent aussi être téléchargés.

Nous espérons avoir atteint notre objectif. Votre rétroaction est essentielle.

Vous pouvez nous la faire parvenir, ainsi que vos suggestions, à l’adresse : conceptionenergie@cer-rec.gc.ca. Votre opinion compte.


## Le référentiel

Le référentiel contient le code et les données nécessaires à l’utilisation d’une version locale de l’application de visualisation des incidents.
Vous pouvez télécharger et exécuter le code d’application pour voir comment il a été construit et examiner les données sur votre propre ordinateur. (Si vous voulez simplement explorer les possibilités de visualisation, vous pouvez [voir l’application](http://apps2.cer-rec.gc.ca/incidents-pipeliniers) sur le site Web de la Régie.)

## Produits préalables

- [Node + NPM](https://nodejs.org/fr/) > v6.10
- Git
- *facultatif* [Service de prise d’instantané d’écran](https://github.com/NEBGitHub/screenshot-service_service-copie-d-ecran)

## Installation et utilisation

Suivez les instructions à partir de la ligne de commande de votre ordinateur (Powershell ou CMD dans Windows, Terminal dans MacOS, Konsole ou l’équivalent dans GNU/Linux).

- Téléchargez le code source pour en avoir une copie locale : `git clone git@github.com:NEBGitHub/incidents-pipeliniers_pipeline-incidents.git incidents`
- Passez au répertoire des incidents : `cd incidents`
- Installez les dépendances : `npm install`
- Lancez le serveur de développement : `npm run start`
- Dans votre navigateur, allez à la page [http://localhost:3001/pipeline-incidents]().

## Développement en vue du déploiement

La version de déploiement de l’application de visualisation des incidents est conçue pour être utilisée avec l'environnement hôte de la Régie et pourrait ne pas être d’un grand intérêt pour le public. Dans le dossier du projet, exécutez la commande suivante :

- `npm run build`

Une version de l’application à un seul fichier sera créée (`public/script/bundle.js`). Lorsque ce fichier est présent, le serveur de développement l’utilise de préférence au code sous `app/`.

## Les contributeurs

### Source des données

Andrew Benson, Karen Duckworth, Randy Cooke

### Coordination

Annette Hester (conception et coordination); Katherine Murphy (gestionnaire de projet); Faiza Hussain (Soutien administratif); Stephen Chow (coordination des données)

### Visualisation des données

Recherche conceptuelle sous la direction de Sheelagh Carpendale et Wesley Willett, iLab, Université de Calgary

Conception : Bon Adriel Aseniero, Peter Buk, Shreya Chopra, Søren Knudsen, Doris Kosminsky, Claudia Maurer, Lien Quach, Katrina Tabuli, Annie Tat, Jo Vermeulen, Jagoda Walny Nix, and Mieka West.

### Chef technique à Vizworx

Aspect technique : Patrick King, Alaa Azazi, Charlie Cheung, Abhishek Sharma, and Ben Cousins


## Contactez-nous

Nous sommes l’équipe de développement de VizworX qui a réalisé le projet pour le compte de la Régie. Nous ne sommes pas en mesure d’assurer un soutien complet du projet, mais vos questions et vos suggestions sont les bienvenues!

* Patrick King, patrick.king@vizworx.com
* Alaa Azazi, alaa.azazi@vizworx.com
* Charlie Cheung, charlie.cheung@vizworx.com
* Ben Cousins, ben.cousins@vizworx.com

## Licence

Toutes les composantes du projet sont visées par la [licence du gouvernement ouvert – Canada](http://ouvert.canada.ca/fr/licence-du-gouvernement-ouvert-canada).

## Licence accordée par un tiers

Police : Police Fira, en vertu de la licence de police de caractères libre (version 1.1)

[Carte du Canada](http://www.arcgis.com/home/item.html?id=dcbcdf86939548af81efbd2d732336db) © 2003 Gouvernement du Canada, avec la permission de Ressources naturelles Canada

Carte : Carte produite par Fonadier illustrant les provinces et territoires selon les signalements de cas de grippe A (H1N1), tirée de [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:H1N1_Canada_map.svg) et portant la licence [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/deed.en). (L’original a été recoloré et pivoté.)

Icône Une histoire à raconter? : Créée par Bon Adriel Aseniero et portant la licence [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).

Icône Méthodologie : [Créée par Rflor](https://thenounproject.com/rflor/collection/infography-circles/?oq=methodology&cidx=0&i=363475), tirée de [thenounproject.com](http://thenounproject.com/) et portant la licence [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/deed.en).

Icône réinitialiser : [Créée par Mooms](https://thenounproject.com/search/?q=reset&i=1033424), tirée de [thenounproject.com](http://thenounproject.com/) et portant la licence [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/deed.en).

Icône Facebook : Créée par Elegant Themes, tirée de [www.flaticon.com](https://www.flaticon.com) et portant la licence [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/deed.en).
