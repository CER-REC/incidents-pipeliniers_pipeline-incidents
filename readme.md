La version française suit.

# [Pipeline Incident Visualization](https://apps2.neb-one.gc.ca/pipeline-incidents)

## About

This Incidents at NEB-Regulated Pipeline and Facilities interactive online tool is part of the National Energy Board’s (NEB) Data Visualization Initiative (DVI). The DVI is a three-year initiative to transform how the NEB structures and shares data. The objective is to enable evidence-based decision making and remove barriers to understanding Canada’s energy and pipeline systems through the use of user-friendly interactive visualizations. This visualization is based on NEB data from 2008 to current for incidents reported under the Onshore Pipeline Regulations and the Processing Plant Regulation. In the months and years to come we will use this innovative format to share our pipeline safety data, energy data series, energy infrastructure information, and a host of other topical data. In addition, other online tools can be found in the [NEB Safety Performance Portal](https://www.neb-one.gc.ca/sftnvrnmnt/sft/dshbrd/index-eng.html).

If you want to use the data for research and undertake your own review, all the data is downloadable and shareable. The chart images are also downloadable

We hope we are hitting the mark. Your feedback is essential.

Email us with your comments and ideas: energyindesign@neb-one.gc.ca. We look forward to hearing from you.

## About this Repository
This repository includes the code and data needed to run a local version of the incident visualization app. 

You can download and run the application code to see how it was built and explore the data on your own computer. (If you only want to explore the visualization, you may want to [view the app](https://apps2.neb-one.gc.ca/pipeline-incidents) on the NEB's website.) 

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

The deployment build of the incident visualization is intended for use with the NEB's hosting environment, and may not be of much interest to the public. In the project folder, run:

- `npm run build`

This produces `public/script/bundle.js`, a single file version of the app. If this file is present, it is used pereferentially by the development server rather than the code under `app/`.


## Contact Us
We're the development team with VizworX who put this project together for the NEB. We aren't able to provide extensive support for this project, but you're welcome to reach out with questions and thoughts!

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


# [Visualisation des incidents pipeliniers](https://apps2.neb-one.gc.ca/incidents-pipeliniers/)

## Le Projet

L’outil interactif « Incidents impliquant des installations et des pipelines réglementés » fait partie de l’initiative de visualisation des données de l’Office national de l’énergie. Échelonnée sur trois ans, cette initiative vise à transformer la manière dont l’Office structure et diffuse ses données. Elle a pour objectif de favoriser un processus décisionnel fondé sur la preuve et de faciliter la compréhension des questions liées aux réseaux énergétiques et pipeliniers du Canada, grâce à un outil de visualisation interactif, facile à utiliser. L’outil présente les données recueillies par l’Office de 2008 à aujourd’hui en ce qui concerne les incidents signalés en application du Règlement de l’Office national de l’énergie sur les pipelines terrestres et du Règlement sur les usines de traitement. Au cours des mois et des années à venir, l’Office utilisera cet outil novateur pour diffuser ses données sur la sécurité des pipelines et sur l’énergie, l’information qu’il possède sur l’infrastructure énergétique et une foule d’autres renseignements spécialisés. Par ailleurs, le portail [Rendement en matière de sécurité](https://www.neb-one.gc.ca/sftnvrnmnt/sft/dshbrd/index-fra.html) comporte d’autres outils interactifs en ligne.

Si vous souhaitez utiliser les données pour vos recherches ou pour en faire votre propre analyse, vous pouvez les télécharger et les partager. Les graphiques peuvent aussi être téléchargés.

Nous espérons avoir atteint notre objectif. Votre rétroaction est essentielle.
  
Vous pouvez nous la faire parvenir, ainsi que vos suggestions, à l’adresse : conceptionenergie@neb-one.gc.ca. Votre opinion compte.


