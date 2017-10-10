const Immutable = require('immutable')

const TranslationTable = Immutable.fromJS({ 

  methodologyLinks: {
    en: 'data/Incident Data Methodology_EN.pdf',
    fr: 'data/Incident Data Methodology_FR.pdf',
  },

  learnMoreLinks: {
    en: 'neb-one.gc.ca/sftnvrnmnt/sft/dshbrd/nfgrphc/index-eng.html',
    fr: 'neb-one.gc.ca/sftnvrnmnt/sft/dshbrd/nfgrphc/index-fra.html',
  },

  aboutText: {
    title: {
      en: 'ABOUT THIS PROJECT',
      fr: 'À PROPOS',
    },
    p1: {
      en: 'This Incidents at NEB-Regulated Pipeline and Facilities interactive online tool is part of the National Energy Board’s (NEB) Data Visualization Initiative (DVI). The DVI is a three-year initiative to transform how the NEB structures and shares data. The objective is to enable evidence-based decision making and remove barriers to understanding Canada’s energy and pipeline systems through the use of user-friendly interactive visualizations. This visualization is based on NEB data from 2008 to current for incidents reported under the Onshore Pipeline Regulations and the Processing Plant Regulation. In the months and years to come we will use this innovative format to share our pipeline safety data, energy data series, energy infrastructure information, and a host of other topical data. In addition, other online tools can be found in the ',
      fr: 'L’outil interactif « Incidents impliquant des installations et des pipelines réglementés » fait partie de l’initiative de visualisation des données de l’Office national de l’énergie. Échelonnée sur trois ans, cette initiative vise à transformer la manière dont l’Office structure et diffuse ses données. Elle a pour objectif de favoriser un processus décisionnel fondé sur la preuve et de faciliter la compréhension des questions liées aux réseaux énergétiques et pipeliniers du Canada, grâce à un outil de visualisation interactif, facile à utiliser. L’outil présente les données recueillies par l’Office de 2008 à aujourd’hui en ce qui concerne les incidents signalés en application du Règlement de l’Office national de l’énergie sur les pipelines terrestres et du Règlement sur les usines de traitement. Au cours des mois et des années à venir, l’Office utilisera cet outil novateur pour diffuser ses données sur la sécurité des pipelines et sur l’énergie, l’information qu’il possède sur l’infrastructure énergétique et une foule d’autres renseignements spécialisés. Par ailleurs, le portail ',
    },
    safetyPerformancePortalText: {
      en: 'NEB Safety Performance Portal',
      fr: 'Rendement en matière de sécurité',
    },
    safetyPerformancePortalLink: {
      en: 'https://www.neb-one.gc.ca/sftnvrnmnt/sft/dshbrd/index-eng.html',
      fr: 'https://www.neb-one.gc.ca/sftnvrnmnt/sft/dshbrd/index-fra.html',
    },
    p1_2: {
      en: '',
      fr: ' comporte d’autres outils interactifs en ligne.',
    },
    p2: {
      en: 'If you want to use the data for research and undertake your own review, all the data is downloadable and shareable. The chart images are also downloadable, and if you are interested in the source code for the visualizations, it is available on the government’s Open Government portal: ',
      fr: 'Si vous souhaitez utiliser les données pour vos recherches ou pour en faire votre propre analyse, vous pouvez les télécharger et les partager. Les graphiques peuvent aussi être téléchargés. Quant au code source des visualisations, il est accessible sur le portail du « gouvernement ouvert » à l’adresse ',
    },
    openCanadaText: {
      en: 'open.canada.ca',
      fr: 'ouvert.canada.ca',
    },
    openCanadaLink: {
      en: 'http://open.canada.ca/',
      fr: 'http://ouvert.canada.ca/',
    },
    p3: {
      en: 'We hope we are hitting the mark. Your feedback is essential.',
      fr: 'Nous espérons avoir atteint notre objectif. Votre rétroaction est essentielle.',
    },
    p4: {
      en: 'Email us with your comments and ideas: ',
      fr: 'Vous pouvez nous la faire parvenir, ainsi que vos suggestions, à l’adresse ',
    },
    emailText: {
      en: 'energyindesign@neb-one.gc.ca',
      fr: 'conceptionenergie@neb-one.gc.ca',
    },
    emailLink: {
      en: 'mailto:energyindesign@neb-one.gc.ca',
      fr: 'mailto:conceptionenergie@neb-one.gc.ca',
    },
    p4_2: {
      en: '. We look forward to hearing from you.',
      fr: '. Votre opinion compte.',
    },
    contributers: {
      en: 'CONTRIBUTORS',
      fr: 'LES CONTRIBUTEURS',
    },
    dataSourceTitle: {
      en: 'DATA SOURCE:',
      fr: 'SOURCE DES DONNÉES',
    },
    dataSourceContent: {
      en: 'Andrew Benson, Karen Duckworth, Randy Cooke',
      fr: 'Andrew Benson, Karen Duckworth, Randy Cooke',
    },
    coordinationTitle: {
      en: 'COORDINATION:',
      fr: 'COORDINATION:',
    },
    coordinationContent: {
      en: 'Annette Hester (Concept and Coordination); Katherine Murphy (Project Manager); Faiza Hussain (Administrative support); Stephen Chow (Data Coordination)',
      fr: 'Annette Hester (conception et coordination); Katherine Murphy (gestionnaire de projet); Faiza Hussain (Soutien administratif); Stephen Chow (coordination des données)',
    },
    dataVisualizationTitle: {
      en: 'DATA VISUALIZATION:',
      fr: 'VISUALISATION DES DONNÉES',
    },
    dataVisualizationContent: {
      leadDesign: {
        en: 'Lead Design Research: Sheelagh Carpendale and Wesley Willett, iLab, University of Calgary.',
        fr: 'Recherche conceptuelle sous la direction de Sheelagh Carpendale et Wesley Willett, iLab, Université de Calgary',
      },
      design: {
        en: 'Design: Jagoda Walny Nix, Bon Ariel Asiniero, Søren Knudsen, Mieka West, Doris Kosminsky, Lien Quach, Peter Buk, Shreya Chopra, Katrina Tabuli and Claudia Maurer',
        fr: 'Conception : Jagoda Walny Nix, Bon Ariel Asiniero, Søren Knudsen, Mieka West, Doris Kosminsky, Lien Quach, Peter Buk, Shreya Chopra, Katrina Tabuli and Claudia Maurer',
      },
      leadTechnical: {
        en: 'Lead Technical: VizworX',
        fr: 'Chef technique à VizworX',
      },
      technical: {
        en: 'Technical: Patrick King, Alaa Azazi, Charlie Cheung, Abhishek Sharma, and Ben Cousins',
        fr: 'Aspect technique : Patrick King, Alaa Azazi, Charlie Cheung, Abhishek Sharma, and Ben Cousins',
      },
    },
  },

  stories: {
    'provinces-and-pipeline-incident': {
      title: {
        en: 'Provinces and Pipeline Incident',
        fr: '<TODO>',
      },
      backgroundImage: {
        en: 'images/stories/provinces-and-pipeline-incident-EN.jpg',
        fr: '<TODO>',
      },
      tutorialImages: {
        en: [
          'images/stories/placeholder-1.png',
          'images/stories/placeholder-2.png',
          'images/stories/placeholder-3.png',
        ],
        fr: [
          'images/stories/placeholder-1.png',
          'images/stories/placeholder-2.png',
          'images/stories/placeholder-3.png',
        ],
      },
    },
    'how-big-are-most-gas-releases': {
      title: {
        en: 'How Big Are Most Gas Releases?',
        fr: '<TODO>',
      },
      backgroundImage: {
        en: 'images/stories/how-big-are-most-gas-releases-EN.jpg',
        fr: '<TODO>',
      },
      tutorialImages: {
        en: [
          'images/stories/placeholder-1.png',
          'images/stories/placeholder-2.png',
          'images/stories/placeholder-3.png',
        ],
        fr: [
          'images/stories/placeholder-1.png',
          'images/stories/placeholder-2.png',
          'images/stories/placeholder-3.png',
        ],
      },
    },
    'when-do-incidents-usually-occur': {
      title: {
        en: 'When Do Incidents Usually Occur?',
        fr: '<TODO>',
      },
      backgroundImage: {
        en: 'images/stories/when-do-incidents-usually-occur-EN.jpg',
        fr: '<TODO>',
      },
      tutorialImages: {
        en: [
          'images/stories/placeholder-1.png',
          'images/stories/placeholder-2.png',
          'images/stories/placeholder-3.png',
        ],
        fr: [
          'images/stories/placeholder-1.png',
          'images/stories/placeholder-2.png',
          'images/stories/placeholder-3.png',
        ],
      },
    },
  },

  tooltips: {
    pinColumn: {
      title: {
        en: 'INCIDENTS',
        fr: 'INCIDENTS',
      },
      description: {
        en: 'The unique identifier – or label – the NEB assigns to each incident.',
        fr: 'L’identificateur unique, l’étiquette que l’Office appose aux différents incidents.',
      },
      detail: {
        en: [],
        fr: [],
      },
    },
    incidentTypes: {
      title: {
        en: 'INCIDENT TYPE',
        fr: 'TYPE D’INCIDENT',
      },
      description: {
        en: '',
        fr: '',
      },
      detail: {
        en: [
          {overview:'Adverse Environmental Effects', expanded:'When any chemical substance is released at a concentration or volume that has the potential to change the ambient environment in a manner that would cause harm to human life, wildlife or vegetation (e.g., glycol, potassium carbonate, methanol, methanol mix from hydrostatic testing, etc.).'},
          {overview:'Explosion', expanded:'An unintended explosion'},
          {overview:'Fatality', expanded:'Any death involving employees, contractors or members of the public related to the construction, operation, maintenance or abandonment of pipelines'},
          {overview:'Fire', expanded:'An unintended fire'},
          {overview:'Operation Beyond Design Limits', expanded:'Includes situations, such as: ○ over-pressures – i.e., pressures that are higher than the maximum the equipment was designed to safely handle○ vibration beyond design limits;○ slope movements causing movement in the pipeline beyond design limits;○ pipe exposures in rivers or streams; and○ introduction of an inappropriate product (e.g., sour gas in excess of CSA limits). Operation beyond design limit is typically linked to an over-pressure of the product in the pipe; however, if a pipe was exposed to excessive vibration and was not designed for this, this could be considered operation beyond design limits. Operation beyond design limits does not include equipment contacting the pipe, or corrosion pits, etc.'},
          {overview:'Release of Substance', expanded:'Any time a product is unintentionally released. (Releases of non-gas low pressure products in volumes of less than 1.5 cubic metres are exempt from reporting.)'},
          {overview:'Serious Injury (NEB or Transportation Safety Board)', expanded:'Any serious injury involving employees, contractors or members of the public related to the construction, operation or maintenance of pipelines.'},
        ],
        fr: [
          {overview:'Effets négatifs sur l’environnement', expanded:'Lorsqu’il y a rejet d’une substance chimique à une concentration ou dans une quantité suffisante pour modifier l’environnement ambiant et mettre en danger la vie humaine, la faune ou la végétation (p. ex., glycol, carbonate de potassium, méthanol, mélange de méthanol provenant d’un essai hydrostatique, etc.).'},
          {overview:'Explosion', expanded:'Une explosion non intentionnelle.'},
          {overview:'Décès', expanded:'Le décès d’un employé, d’un entrepreneur ou d’un membre du public en rapport avec la construction, le fonctionnement, l’entretien ou la cessation d’exploitation d’un pipeline.'},
          {overview:'Incendie', expanded:'Un incendie non intentionnel.'},
          {overview:'Exploitation au-delà des tolérances de conception', expanded:'De telles situations comprennent notamment les suivantes :○ cas de surpression, soit lorsque les pressions sont supérieures aux limites établies pour un fonctionnement sans danger de l’équipement;○ vibration supérieure aux tolérances de conception;○ mouvements du sol à l’origine d’un déplacement du pipeline plus grand que celui autorisé selon les limites de conception;○ affleurement d’une conduite dans une rivière ou un ruisseau;○ présence d’un produit inapproprié (p. ex., gaz acide au-delà des limites établies par les normes CSA).L’exploitation au-delà des tolérances de conception est habituellement liée à une surpression causée par le produit dans la canalisation. Cependant, si cette dernière est soumise à une vibration excessive pour laquelle elle n’a pas été conçue, il pourrait s’agir là encore d’un type d’exploitation au-delà des tolérances de conception, qui n’inclut toutefois pas les chocs avec la conduite, les piqûres de corrosion, etc.'},
          {overview:'Rejet d’une substance', expanded:'Tout rejet non intentionnel d’un produit. (Les rejets à basse pression de produits autres que du gaz d’un volume inférieur à 1,5 mètre cube n’ont pas à être signalés.)'},
          {overview:'Blessure grave (Office ou Bureau de la sécurité des transports)', expanded:'Toute blessure grave causée à un employé, un entrepreneur ou un membre du public en rapport avec la construction, l’exploitation ou l’entretien d’un pipeline.'},
        ],
      },
    },
    year: {
      title: {
        en: 'REPORTED DATE/YEAR',
        fr: 'ANNÉE DU SIGNALEMENT',
      },
      description: {
        en: 'The date the company reported the incident to the NEB. This date may differ from when the incident occurred or was discovered.',
        fr: 'La date à laquelle la société a signalé l’incident à l’Office. Cette date peut être différente de celle à laquelle l’incident en question est survenu ou a été découvert.',
      },
      detail: {
        en: [],
        fr: [],
      },
    },
    company: {
      title: {
        en: 'COMPANY',
        fr: 'SOCIÉTÉ',
      },
      description: {
        en: 'The company that holds the regulatory instrument on the pipeline/facility where the incident took place.',
        fr: '',
      },
      detail: {
        en: [
          {overview:'2193914 Canada Limited', expanded:null}, 
          {overview:'Alliance Pipeline Ltd.', expanded:null},
          {overview:'Burlington Resources Canada (Hunter) Ltd.', expanded:null},
          {overview:'Centra Transmission Holdings Inc.', expanded:null},
          {overview:'Cochin Pipe Lines Ltd.', expanded:null},
          {overview:'Emera Brunswick Pipeline Company Ltd.', expanded:null},
          {overview:'Enbridge G and P Canada Pipelines Inc.', expanded:null},
          {overview:'Enbridge Pipelines (NW) Inc.', expanded:null},
          {overview:'Enbridge Pipelines (Westspur) Inc.', expanded:null},
          {overview:'Enbridge Pipelines Inc.', expanded:null},
          {overview:'EnCana Corporation', expanded:null},
          {overview:'Ethane Shippers Joint Venture', expanded:null},
          {overview:'Express Pipeline Ltd.', expanded:null},
          {overview:'ExxonMobil Canada Properties', expanded:null},
          {overview:'Foothills Pipe Lines (Saskatchewan) Ltd.', expanded:null},
          {overview:'Foothills Pipe Lines Ltd.', expanded:null},
          {overview:'Husky Oil Limited', expanded:null},
          {overview:'Kinder Morgan Cochin ULC', expanded:null},
          {overview:'Many Islands Pipe Lines (Canada) Limited', expanded:null},
          {overview:'Maritimes & Northeast Pipeline Management Ltd.', expanded:null},
          {overview:'Niagara Gas Transmission Limited', expanded:null},
          {overview:'NOVA Chemicals (Canada) Ltd.', expanded:null},
          {overview:'NOVA Gas Transmission Ltd.', expanded:null},
          {overview:'Pembina Energy Services Inc.', expanded:null},
          {overview:'Plains Marketing Canada, L.P.', expanded:null},
          {overview:'Plains Midstream Canada ULC', expanded:null},
          {overview:'Pouce Coupé Pipe Line Ltd. as agent and general partner of the Pembina North Limited Partnership', expanded:null},
          {overview:'Provident Energy Pipeline Inc.', expanded:null},
          {overview:'Spectra Energy Empress Management Inc. as General Partner and Agent for Spectra Energy Empress L.P.', expanded:null},
          {overview:'Trans Mountain Pipeline ULC', expanded:null},
          {overview:'TransCanada Keystone Pipeline GP Ltd.', expanded:null},
          {overview:'TransCanada Pipelines Limited', expanded:null},
          {overview:'TransCanada Pipelines Limited B.C. System', expanded:null},
          {overview:'Trans-Northern Pipelines Inc.', expanded:null},
          {overview:'Tundra Energy Marketing Limited', expanded:null},
          {overview:'Twin Rivers Paper Company Inc.', expanded:null},
          {overview:'Westcoast Energy Inc., carrying on business as Spectra Energy Transmission', expanded:null},

        ],
        fr: [
          {overview:'2193914 Canada Limited', expanded:null},
          {overview:'Alliance Pipeline Ltd.', expanded:null},
          {overview:'Burlington Resources Canada (Hunter) Ltd.', expanded:null},
          {overview:'Centra Transmission Holdings Inc.', expanded:null},
          {overview:'Cochin Pipe Lines Ltd.', expanded:null},
          {overview:'Emera Brunswick Pipeline Company Ltd.', expanded:null},
          {overview:'Enbridge G and P Canada Pipelines Inc.', expanded:null},
          {overview:'Enbridge Pipelines (NW) Inc.', expanded:null},
          {overview:'Enbridge Pipelines (Westspur) Inc.', expanded:null},
          {overview:'Enbridge Pipelines Inc.', expanded:null},
          {overview:'EnCana Corporation', expanded:null},
          {overview:'Ethane Shippers Joint Venture', expanded:null},
          {overview:'Express Pipeline Ltd.', expanded:null},
          {overview:'ExxonMobil Canada Properties', expanded:null},
          {overview:'Foothills Pipe Lines (Saskatchewan) Ltd.', expanded:null},
          {overview:'Foothills Pipe Lines Ltd.', expanded:null},
          {overview:'Husky Oil Limited', expanded:null},
          {overview:'Kinder Morgan Cochin ULC', expanded:null},
          {overview:'Many Islands Pipe Lines (Canada) Limited', expanded:null},
          {overview:'Maritimes & Northeast Pipeline Management Ltd.', expanded:null},
          {overview:'Niagara Gas Transmission Limited', expanded:null},
          {overview:'NOVA Chemicals (Canada) Ltd.', expanded:null},
          {overview:'NOVA Gas Transmission Ltd.', expanded:null},
          {overview:'Pembina Energy Services Inc.', expanded:null},
          {overview:'Plains Marketing Canada, L.P.', expanded:null},
          {overview:'Plains Midstream Canada ULC', expanded:null},
          {overview:'Pouce Coupé Pipe Line Ltd. as agent and general partner of the Pembina North Limited Partnership', expanded:null},
          {overview:'Provident Energy Pipeline Inc.', expanded:null},
          {overview:'Spectra Energy Empress Management Inc. as General Partner and Agent for Spectra Energy Empress L.P.', expanded:null},
          {overview:'Trans Mountain Pipeline ULC', expanded:null},
          {overview:'TransCanada Keystone Pipeline GP Ltd.', expanded:null},
          {overview:'TransCanada Pipelines Limited', expanded:null},
          {overview:'TransCanada Pipelines Limited B.C. System', expanded:null},
          {overview:'Trans-Northern Pipelines Inc.', expanded:null},
          {overview:'Tundra Energy Marketing Limited', expanded:null},
          {overview:'Twin Rivers Paper Company Inc.', expanded:null},
          {overview:'Westcoast Energy Inc., carrying on business as Spectra Energy Transmission', expanded:null},
        ],
      },
    },
    status: {
      title: {
        en: 'STATUS',
        fr: 'ÉTAT',
      },
      description: {
        en: 'The current stage of the incident investigation.',
        fr: 'L’étape à laquelle en est l’enquête sur l’incident.',
      },
      detail: {
        en: [
          {overview:'Initially Submitted', expanded:'The company has notified the NEB that an incident has occurred and provided preliminary information. An investigation is has been initiated.'},
          {overview:'Submitted', expanded:'The company has submitted all of the required information and the NEB is reviewing the incident.'},
          {overview:'Closed', expanded:'The NEB’s incident review has been completed and the file is closed.'},
        ],
        fr: [
          {overview:'Initialement soumis', expanded:'La société a informé l’Office qu’un incident était survenu et a fourni les renseignements préliminaires sur celui-ci. Une enquête est en cours.'},
          {overview:'Soumis', expanded:'La société a fourni tous les renseignements exigés et l’Office examine ce qui s’est produit.'},
          {overview:'Fermé', expanded:'L’Office a terminé l’examen de l’incident et a clos le dossier.'},
        ],
      },
    },
    province: {
      title: {
        en: 'PROVINCES',
        fr: 'PROVINCES',
      },
      description: {
        en: 'The province where the incident occurred.',
        fr: 'La province où l’incident est survenu.',
      },
      detail: {
        en: [],
        fr: [],
      },
    },
    substance: {
      title: {
        en: 'SUBSTANCE',
        fr: 'SUBSTANCE',
      },
      description: {
        en: 'The product released in a Release of Substance incident.',
        fr: 'Le produit en cause dans un incident de rejet d’une substance.',
      },
      detail: {
        en: [
          {overview:'Amine', expanded: null},
          {overview:'Calcium carbonate', expanded: null},
          {overview:'Casing cement', expanded: null},
          {overview:'Chlorodifluoromethane', expanded: null},
          {overview:'Contaminated water', expanded: null},
          {overview:'Corrosion inhibitor', expanded: null},
          {overview:'Drilling fluid', expanded: null},
          {overview:'Drip oil', expanded: null},
          {overview:'Glycol', expanded: null},
          {overview:'Grey water (sewage)', expanded: null},
          {overview:'Hydraulic fluid', expanded: null},
          {overview:'Hydrogen sulphide', expanded: null},
          {overview:'Lube oil', expanded: null},
          {overview:'Methanol', expanded: null},
          {overview:'Methyl tert-Butyl ether', expanded: null},
          {overview:'Morphysorb', expanded: null},
          {overview:'Oil well effluent', expanded: null},
          {overview:'Polychlorinated biphenyls', expanded: null},
          {overview:'Potassium carbonate', expanded: null},
          {overview:'Potassium hydroxide (caustic solution)', expanded: null},
          {overview:'Produced water', expanded: null},
          {overview:'Sulphur dioxide', expanded: null},
          {overview:'Toluene', expanded: null},
          {overview:'Waste oil', expanded: null},
          {overview:'Water', expanded: null},
          {overview:'Butane', expanded: null},
          {overview:'Mixed HVP hydrocarbons', expanded: null},
          {overview:'Natural gas liquids', expanded: null},
          {overview:'Propane', expanded: null},
          {overview:'Condensate', expanded: null},
          {overview:'Crude oil - sour', expanded: null},
          {overview:'Crude oil - sweet', expanded: null},
          {overview:'Crude oil - synthetic', expanded: null},
          {overview:'Diesel fuel', expanded: null},
          {overview:'Gasoline', expanded: null},
          {overview:'Isooctane', expanded: null},
          {overview:'Jet fuel', expanded: null},
          {overview:'Carbon dioxide', expanded: null},
          {overview:'Sulphur', expanded: null},
          {overview:'Natural gas - sweet', expanded: null},
          {overview:'Natural gas - sour', expanded: null},
          {overview:'Odourant', expanded: null},
          {overview:'Pulp slurry', expanded: null},
        ],
        fr: [
          {overview:'Amine', expanded:null},
          {overview:'Carbonate de calcium', expanded:null},
          {overview:'Ciment de tubage', expanded:null},
          {overview:'Chlorodifluorométhane', expanded:null},
          {overview:'Eau contaminée', expanded:null},
          {overview:'Inhibiteur de corrosion', expanded:null},
          {overview:'Fluide de forage', expanded:null},
          {overview:'Condensat', expanded:null},
          {overview:'Glycol', expanded:null},
          {overview:'Eaux grises (eaux usées)', expanded:null},
          {overview:'Fluide hydraulique', expanded:null},
          {overview:'sulfure d’hydrogène', expanded:null},
          {overview:'Huile lubrifiante', expanded:null},
          {overview:'Méthanol', expanded:null},
          {overview:'Éther tert-butylique méthylique', expanded:null},
          {overview:'Morphysorb®', expanded:null},
          {overview:'Effluents de puits de pétrole', expanded:null},
          {overview:'Diphényles polychlorés', expanded:null},
          {overview:'Carbonate de potassium', expanded:null},
          {overview:'Hydroxyde de potassium (solution caustique)', expanded:null},
          {overview:'Eau produite', expanded:null},
          {overview:'Dioxyde de soufre.', expanded:null},
          {overview:'Toluène', expanded:null},
          {overview:'Huile usée', expanded:null},
          {overview:'Eau', expanded:null},
          {overview:'Butane', expanded:null},
          {overview:'Mélange d’hydrocarbures à HPV', expanded:null},
          {overview:'Liquides de gaz naturel', expanded:null},
          {overview:'Propane', expanded:null},
          {overview:'Condensats', expanded:null},
          {overview:'Pétrole brut sulfureux', expanded:null},
          {overview:'Pétrole brut non corrosif', expanded:null},
          {overview:'Pétrole brut synthétique', expanded:null},
          {overview:'Carburant diesel', expanded:null},
          {overview:'Essence', expanded:null},
          {overview:'Isooctane', expanded:null},
          {overview:'Carburéacteur', expanded:null},
          {overview:'Dioxyde de carbone', expanded:null},
          {overview:'Soufre', expanded:null},
          {overview:'Gaz naturel non corrosif', expanded:null},
          {overview:'Gaz naturel sulfureux', expanded:null},
          {overview:'Odorisant', expanded:null},
          {overview:'Pâte liquide au bisulfite', expanded:null},
        ],
      },
    },
    releaseType: {
      title: {
        en: 'RELEASE TYPE',
        fr: 'TYPE DE REJET / DÉVERSEMENT',
      },
      description: {
        en: 'This is the primary product being transported in the pipeline. Examples of the substance types applicable to each category are as follows:',
        fr: 'Le principal produit transporté par le pipeline. Voici des exemples de types de substances de chaque catégorie.',
      },
      detail: {
        en: [
          {overview:'Gas', expanded:'substances such as natural gas, sweet gas, fuel gas, and acid gas'},
          {overview:'Liquid', expanded:'substances such as low-vapour pressure hydrocarbons, crude oil, natural gas liquids, and jet fuel'},
          {overview:'Miscellaneous', expanded:'substances such as mechanical pulp slurry, steam, effluent, processed water, and fresh water'},
          {overview:'Not Applicable', expanded:'incidents that do not involve a release of substance'},
        ],
        fr: [
          {overview:'Gaz', expanded:'Gaz naturel, non corrosif, combustible, acide, etc.'},
          {overview:'Liquide', expanded:'Hydrocarbures à BPV, pétrole brut, liquides de gaz naturel, carburéacteur, etc.'},
          {overview:'Divers', expanded:'Pâte liquide au sulfite résultant d’un procédé mécanique, vapeur, effluents, eau de procédé, eau fraîche, etc.'},
          {overview:'Sans objet', expanded:'Aucun rejet de substance.'},
        ],
      },
    },
    whatHappened: {
      title: {
        en: 'WHAT HAPPENED',
        fr: 'CE QUI S’EST PASSÉ',
      },
      description: {
        en: 'The circumstances that directly led to the incident.',
        fr: 'Les circonstances directement à l’origine de l’incident.',
      },
      detail: {
        en: [
          {overview:'Defect and Deterioration', expanded:'Defects in manufacturing processes or materials, or deterioration as a result of damage or service life limitations, lack of inspection or maintenance'},
          {overview:'Corrosion and Cracking', expanded:'External corrosion or cracking caused by damage to coating systems or failed coating systems; weld cracking as a result of stress or workmanship issues; or internal corrosion as a result of contaminates in products'},
          {overview:'Equipment Failure', expanded:'A failure of the pipeline’s equipment components. Examples of equipment include valves, electrical power systems and control systems'},
          {overview:'Incorrect Operation', expanded:'Typically, personnel fail to follow procedures or use equipment improperly'},
          {overview:'External interference', expanded:'External activities that cause damage to the pipeline or components. Examples include excavation damage and vandalism'},
          {overview:'Natural Force Damage', expanded:'Damage caused by natural forces, such as earthquakes, landslides and wash-outs'},
          {overview:'Other Causes', expanded:'All other causes or when an incident’s circumstances could not be determined'},
        ],
        fr: [
          {overview:'Défectuosité et détérioration', expanded:'Défectuosité au niveau des matériaux ou des processus de fabrication et détérioration attribuable à des dommages, au dépassement de la durée de vie utile, à l’absence d’inspection ou à un manque d’entretien.'},
          {overview:'Corrosion et fissuration', expanded:'Corrosion externe ou fissuration du revêtement, en raison de dommages ou d’une défaillance, fissuration au niveau des soudures attribuable à des problèmes de contrainte ou de fabrication et corrosion interne due à la présence de contaminants dans les produits.'},
          {overview:'Défaillance d’équipement', expanded:'Défaillance d’une des composantes de l’équipement associées au pipeline comme, par exemple, les vannes, l’alimentation électrique ou les systèmes de contrôle.'},
          {overview:'Erreur d’exploitation', expanded:'En général, le personnel ne respecte pas les marches à suivre ou utilise l’équipement d’une manière non appropriée.'},
          {overview:'Interférences extérieures', expanded:'Activités extérieures à l’origine de dommages au pipeline ou à ses composantes comme, par exemple, des travaux d’excavation ou du vandalisme.'},
          {overview:'Forces de la nature', expanded:'Dommages pouvant être causés, par exemple, par un tremblement de terre, un glissement de terrain ou l’érosion.'},
          {overview:'Autres causes', expanded:'Toutes les autres causes ou lorsqu’il est impossible de déterminer les circonstances de l’incident.'},
        ],
      },
    },
    whyItHappened: {
      title: {
        en: 'WHY IT HAPPENED',
        fr: 'CAUSES',
      },
      description: {
        en: 'The underlying reasons for the incident.',
        fr: 'Les causes sous-jacentes de l’incident.',
      },
      detail: {
        en: [
          {overview:'Engineering and Planning', expanded:'Failures of assessment, planning or monitoring that may be related to inadequate specifications or design criteria, evaluation of change, or implementation of controls'},
          {overview:'Maintenance', expanded:'Inadequate preventive maintenance or repairs, and excessive wear and tear'},
          {overview:'Inadequate Procurement', expanded:'Failures in the purchasing, handling, transport and storage of materials'},
          {overview:'Tools and Equipment', expanded:'Tools and equipment that are inadequate for the task or used improperly'},
          {overview:'Standards and Procedures', expanded:'Inadequate development, communication, maintenance or monitoring of standards and procedures'},
          {overview:'Failure in communication', expanded:'Loss of communication with automatic devices, equipment or people'},
          {overview:'Inadequate Supervision', expanded:'Lack of oversight of a contractor or employee during construction or maintenance activities'},
          {overview:'Human Factors', expanded:'Individual conduct or capability, or physical and psychological factors'},
          {overview:'Natural or Environmental Forces', expanded:'External natural or environmental conditions'},
        ],
        fr: [
          {overview:'Ingénierie et planification', expanded:'Défaillances au niveau de l’évaluation, de la planification ou de la surveillance pouvant être en rapport avec le caractère non approprié des données techniques, des critères de conception, de l’évaluation de changements ou de la mise en œuvre de contrôles.'},
          {overview:'Entretien', expanded:'Entretien préventif inadéquat ou réparations mal effectuées ainsi qu’usure et détérioration excessives.'},
          {overview:'Approvisionnement inadéquat', expanded:'Problèmes au niveau des achats, de la manutention des matériaux, de leur transport ou de leur entreposage.'},
          {overview:'Outils et équipement', expanded:'Outils et équipement qui ne permettent pas d’accomplir la tâche voulue ou dont l’utilisation n’est pas appropriée.'},
          {overview:'Normes et procédures', expanded:'Élaboration, communication, mise à jour ou surveillance inadéquate des normes et procédures.'},
          {overview:'Problème de communication', expanded:'Perte de contact avec des dispositifs automatisés, de l’équipement ou des personnes.'},
          {overview:'Supervision insuffisante', expanded:'Manque de surveillance d’un entrepreneur ou d’un employé pendant les travaux, qu’ils soient de construction ou d’entretien.'},
          {overview:'Facteurs humains', expanded:'Facteurs liés à la conduite ou aux capacités d’une personne, qui peuvent par ailleurs être physiques ou psychologiques.'},
          {overview:'Forces de la nature ou environnement', expanded:'Conditions relatives à l’environnement ou au milieu naturel.'},
        ],
      },
    },
    pipelinePhase: {
      title: {
        en: 'PIPELINE PHASE',
        fr: 'ÉTAPE DU CYCLE DE VIE',
      },
      description: {
        en: 'The type of activity at time of the incident',
        fr: 'Le type d’activité qui se déroulait au moment de l’incident.',
      },
      detail: {
        en: [
          {overview:'Operation', expanded:'typical operation of the pipeline or facility'},
          {overview:'Construction', expanded:'the building of a pipeline or facility'},
          {overview:'Maintenance', expanded:'work done to maintain the pipeline or facility'},
          {overview:'Abandonment', expanded:'the work required to abandon a pipeline or facility'},
        ],
        fr: [
          {overview:'Fonctionnement', expanded:'Exploitation normale du pipeline ou de l’installation.'},
          {overview:'Construction', expanded:'Construction du pipeline ou de l’installation.'},
          {overview:'Entretien', expanded:'Travaux effectués dans le cadre de l’entretien du pipeline ou de l’installation.'},
          {overview:'Cessation d’exploitation', expanded:'Travaux requis pour cesser l’exploitation du pipeline ou de l’installation.'},
        ],
      },
    },
    volumeCategory: {
      title: {
        en: 'APPROX VOL RELEASED',
        fr: 'VOLUME APPROXIMATIF REJETÉ/DÉVERSÉ',
      },
      description: {
        en: 'The amount released, in cubic metres',
        fr: 'Volume du rejet/déversement en mètres cubes.',
      },
      detail: {
        en: [],
        fr: [],
      },
    },
    pipelineSystemComponentsInvolved: {
      title: {
        en: 'SYSTEM COMPONENT INVOLVED',
        fr: 'COMPOSANTE DU RÉSEAU EN CAUSE',
      },
      description: {
        en: 'The type of equipment or components involved in the incident. Data available from 2015 to current. Components in this case refer to a segment of the piping that is designed to maintain pipe pressure but is not the main body of the pipe. Examples include a pipe elbow or flange.',
        fr: 'Type d’équipement ou composantes qui sont en cause dans l’incident. Données disponibles de 2015 à aujourd’hui. Dans ce cas, les composantes désignent une section de tuyauterie conçue pour supporter la pression à l’intérieur de la conduite, sans être le corps principal de la canalisation comme, par exemple, un coude ou une bride.',
      },
      detail: {
        en: [
          {overview:'Compression station', expanded:null},
          {overview:'Metering station', expanded:null},
          {overview:'Pigging', expanded:null},
          {overview:'Pipeline', expanded:null},
          {overview:'Power generation', expanded:null},
          {overview:'Processing plant', expanded:null},
          {overview:'Pumping station', expanded:null},
          {overview:'Regulating facility', expanded:null},
          {overview:'Storage facility', expanded:null},
          {overview:'Vehicle/Mobile equipment', expanded:null},
        ],
        fr: [
          {overview:'Station de compression', expanded:null},
          {overview:'Station de comptage', expanded:null},
          {overview:'Installation de raclage', expanded:null},
          {overview:'Pipeline', expanded:null},
          {overview:'Installation de production d’énergie', expanded:null},
          {overview:'Usine de traitement', expanded:null},
          {overview:'Station de pompage', expanded:null},
          {overview:'Installation de régulation', expanded:null},
          {overview:'Installation de stockage', expanded:null},
          {overview:'Véhicule ou équipement mobile', expanded:null},
        ],
      },
    },   
  },

  columnHeadings: {
    pinColumn: {
      en: 'INCIDENTS',
      fr: 'INCIDENTS',
    },
    incidentTypes: {
      en: 'INCIDENT TYPE',
      fr: 'TYPE D’INCIDENT',
    },
    year: {
      en: 'REPORTED DATE/YEAR',
      fr: 'ANNÉE DU SIGNALEMENT',
    },
    company: {
      en: 'COMPANY',
      fr: 'SOCIÉTÉ',
    },
    status: {
      en: 'STATUS',
      fr: 'ÉTAT',
    },
    province: {
      en: 'PROVINCES',
      fr: 'PROVINCES',
    },
    substance: {
      en: 'SUBSTANCE',
      fr: 'SUBSTANCE',
    },
    releaseType: {
      en: 'RELEASE TYPE',
      fr: 'TYPE DE REJET / DÉVERSEMENT',
    },
    whatHappened: {
      en: 'WHAT HAPPENED',
      fr: 'CE QUI S’EST PASSÉ',
    },
    whyItHappened: {
      en: 'WHY IT HAPPENED',
      fr: 'CAUSES',
    },
    pipelinePhase: {
      en: 'PIPELINE PHASE',
      fr: 'ÉTAPE DU CYCLE DE VIE',
    },
    volumeCategory: {
      en: 'APPROX VOL RELEASED',
      fr: 'VOLUME APPROX. REJETÉ/DÉVERSÉ',
    },
    pipelineSystemComponentsInvolved: {
      en: 'SYS. COMP. INVOLVED',
      fr: 'COMPOSANTES EN CAUSE',
    },
    map: {
      en: 'MAP',
      fr: 'CARTE',
    }
  },




  shown: {
    en: 'shown',
    fr: 'affiché(s)',
  },

  showOnly: {
    en: 'SHOW ONLY',
    fr: 'AFFICHER SEULEMENT',
  },
  hide: {
    en: 'HIDE ',
    fr: 'CACHER ',
  },
  reset: {
    en: 'RESET',
    fr: 'RÉINITIALISER',
  },


  near: {
    en: 'Near',
    fr: 'Près de'
  },
  reportedDate: {
    en: 'Reported Date:',
    fr: 'Date du signalement : '
  },

  seeEmptyCategories: {
    en: 'see empty categories',
    fr: 'Voir les catégories vides',
  },
  hideEmptyCategories: {
    en: 'Show empty categories',
    fr: 'Montrer les catégories vides',
  },


  applicationPath: {
    en: '/incident-visualization/',
    fr: '/incident-visualization/',
    // TODO: for now, use the same path, as the IIS app has not been prepared
    // with this alternate path. eventually, we should use something
    // properly localized for this path fragment.
    // fr: '/visualisation-des-incidents/',
  },


  mainHeading: {
    en: 'Incidents At NEB-Regulated Pipelines And Facilities',
    fr: 'Incidents impliquant des installations et des pipelines réglementés par l’Office'
  },

  mainSubheading: {
    en: 'The information presented here is based on NEB data from 2008 to current for incidents reported under the Onshore Pipeline Regulations and the Processing Plant Regulations. New data is added quarterly. The last update was: yyyy-mm-dd. ',
    fr: 'L’information présentée ici provient des données de l’Office de 2008 à aujourd’hui et vise les incidents signalés en application du Règlement de l’Office national de l’énergie sur les pipelines terrestres et du Règlement sur les usines de traitement. De nouvelles données sont ajoutées tous les trois mois. De nouvelles données ont été ajoutées le aaaa-mm-jj. ',
  },

  dataCollectionSubheading: {
    en: ' on how data collection has evolved since the NEB was established in 1959.',
    fr: ' sur l’évolution des méthodes de collecte de données depuis la création de l’Office en 1959.'
  },

  incidentResponseSubheading: {
    en: ' the NEB responds to incidents at the pipelines and facilities it regulates.',
    fr: ' l’Office intervient en cas d’incident lié à des installations ou à des pipelines soumis à sa réglementation.'
  },

  learnMore: {
    en: 'Learn more',
    fr: 'Obtenez plus d’information'
  },

  discoverHow: {
    en: 'Discover how',
    fr: 'Découvrez comment'
  },

  dataDisclaimer: {
    en: 'Data disclaimer',
    fr: 'Avertissement concernant les données'
  },

  disclaimerText: {
    en: 'The incident data shown represents a single point in time and is subject to change. As investigations are completed or as new information becomes available, the incident record is updated. This may result in changes to the incident record including whether the incident remains reportable under the applicable regulations.',
    fr: 'Les données portant sur les incidents correspondent à un événement ponctuel et peuvent changer. À mesure que des enquêtes sont conclues ou que de nouveaux renseignements sont accessibles, le dossier d’incident est mis à jour. Dans ce cas, certains éléments peuvent être modifiés, notamment le caractère obligatoire du signalement de l’incident aux termes des règlements applicables.'
  },

  noCategorySelection: {
    en: 'No category selected. Select a category from a column to see related incidents.',
    fr: 'Vous n’avez pas choisi de catégorie. Choisissez une catégorie dans une colonne pour voir les incidents reliés. ',
  },

  resetAll: {
    en: 'Reset All',
    fr: 'Réinitialiser',
  },

  hideIncidentList: {
    en: 'hide incident list',
    fr: 'Cacher la liste des incidents',
  },

  showIncidentList: {
    en: 'show incident list',
    fr: 'Voir la list des incidents'
  },

  storiesAboutIncidents: {
    en: 'Stories About Pipeline Incidents',
    fr: 'Description des incidents pipeliniers',
  },

  incidentsRelatedTo: {
    en: 'incidents related to',
    fr: 'incidents liés a la catégorie',
  },

  methodology: { 
    en: 'METHODOLOGY',
    fr: 'MÉTHODOLOGIE',
  },

  storiesBarHeading: {
    en: 'STORIES ABOUT PIPELINE INCIDENTS',
    fr: 'DESCRIPTION DES INCIDENTS PIPELINIERS',
  },

  tellMeAStory: {
    en: 'Tell me a story',
    fr: 'Une histoire à raconter?',
  },

  aboutThisProject: {
    en: 'About this project',
    fr: 'Le projet',
  },

  categories: {
    incidentTypes: {
      release: {
        en: 'Release of Substance',
        fr: 'Déversement de substance'
      },
      environmentalEffects: {
        en: 'Adverse Environmental Effects',
        fr: 'Effets environnementaux négatifs'
      },
      fatality: {
        en: 'Fatality',
        fr: 'Décès'
      },
      fire: {
        en: 'Fire',
        fr: 'Incendie'
      },
      seriousInjury: {
        en: 'Serious Injury (NEB or TSB)',
        fr: 'Blessure grave (Office ou BST)'
      },
      obdl: {
        en: 'Operation Beyond Design Limits',
        fr: 'Exploitation au-delà des tolérances de fabrication'
      },
      explosion: {
        en: 'Explosion',
        fr: 'Explosion'
      },
    },
    status: {
      closed: {
        en: 'Closed',
        fr: 'Fermé'
      },
      submitted: {
        en: 'Submitted',
        fr: 'Soumis'
      },
      initiallySubmitted: {
        en: 'Initially Submitted',
        fr: 'Initialement Soumis'
      },
    },
    province: {
      AB: {
        en: 'Alberta',
        fr: 'Alberta'
      },
      BC: {
        en: 'British Columbia',
        fr: 'Colombie-Britannique'
      },
      MB: {
        en: 'Manitoba',
        fr: 'Manitoba'
      },
      NB: {
        en: 'New Brunswick',
        fr: 'Nouveau-Brunswick'
      },
      NL: {
        en: 'Newfoundland and Labrador',
        fr: 'Terre-Neuve-et-Labrador'
      },
      NT: {
        en: 'Northwest Territories',
        fr: 'Territoires du Nord-Ouest'
      },
      NS: {
        en: 'Nova Scotia',
        fr: 'Nouvelle-Écosse'
      },
      NU: {
        en: 'Nunavut',
        fr: 'Nunavut'
      },
      ON: {
        en: 'Ontario',
        fr: 'Ontario'
      },
      PE: {
        en: 'Prince Edward Island',
        fr: 'Île-du-Prince-Édouard'
      },
      QC: {
        en: 'Quebec',
        fr: 'Québec'
      },
      SK: {
        en: 'Saskatchewan',
        fr: 'Saskatchewan'
      },
      YT: {
        en: 'Yukon',
        fr: 'Yukon'
      },
    },
    substance: {
      notApplicable: {
        en: 'Not Applicable',
        fr: 'Sans objet'
      },
      amine: {
        en: 'Amine',
        fr: 'Amine',
      },
      calciumCarbonate: {
        en: 'Calcium Carbonate',
        fr: 'Carbonate de calcium',
      },
      casingCement: {
        en: 'Casing Cement',
        fr: 'Ciment de tubage',
      },
      chlorodifluoromethane: {
        en: 'Chlorodifluoromethane',
        fr: 'Chlorodifluorométhane',
      },
      contaminatedWater: {
        en: 'Contaminated Water',
        fr: 'Eau contaminée',
      },
      corrosionInhibitor: {
        en: 'Corrosion Inhibitor',
        fr: 'Inhibiteur de corrosion',
      },
      drillingFluid: {
        en: 'Drilling Fluid',
        fr: 'Fluide de forage',
      },
      dripOil: {
        en: 'Drip Oil',
        fr: 'Condensat',
      },
      glycol: {
        en: 'Glycol',
        fr: 'Glycol',
      },
      greyWater: {
        en: 'Grey Water (Sewage)',
        fr: 'Eaux grises (eaux usées)',
      },
      hydraulicFluid: {
        en: 'Hydraulic Fluid',
        fr: 'Fluide hydraulique',
      },
      hydrogenSulphide: {
        en: 'Hydrogen Sulphide',
        fr: "Sulfure d'hydrogène",
      },
      lubeOil: {
        en: 'Lube Oil',
        fr: 'Huile lubrifiante',
      },
      methanol: {
        en: 'Methanol',
        fr: 'Méthanol',
      },
      methylTertButylEther: {
        en: 'Methyl Tert-butyl Ether',
        fr: 'Éther tert-butylique méthylique',
      },
      morphysorb: {
        en: 'Morphysorb',
        fr: 'Morphysorb',
      },
      oilWellEffluent: {
        en: 'Oil Well Effluent',
        fr: 'Effluents de puits de pétrole',
      },
      polychlorinatedBiphenyls: {
        en: 'Polychlorinated Biphenyls',
        fr: 'Diphényles polychlorés',
      },
      potassiumCarbonate: {
        en: 'Potassium Carbonate',
        fr: 'Carbonate de potassium',
      },
      potassiumHydroxide: {
        en: 'Potassium Hydroxide (caustic solution)',
        fr: 'Hydroxyde de potassium (solution caustique)',
      },
      producedWater: {
        en: 'Produced Water',
        fr: 'Eau produite',
      },
      sulphurDioxide: {
        en: 'Sulphur Dioxide',
        fr: 'Dioxyde de soufre',
      },
      toluene: {
        en: 'Toluene',
        fr: 'Toluène',
      },
      wasteOil: {
        en: 'Waste Oil',
        fr: 'Huile usée',
      },
      water: {
        en: 'Water',
        fr: 'Eau',
      },
      butane: {
        en: 'Butane',
        fr: 'Butane',
      },
      mixedHydrocarbons: {
        en: 'Mixed HVP Hydrocarbons',
        fr: "Mélange d'hydrocarbures à HPV",
      },
      naturalGasLiquids: {
        en: 'Natural Gas Liquids',
        fr: 'Liquides de gaz naturel',
      },
      propane: {
        en: 'Propane',
        fr: 'Propane',
      },
      condensate: {
        en: 'Condensate',
        fr: 'Condensat',
      },
      crudeOilSour: {
        en: 'Crude Oil - Sour',
        fr: 'Pétrole brut sulfureux',
      },
      crudeOilSweet: {
        en: 'Crude Oil - Sweet',
        fr: 'Pétrole brut non sulfureux',
      },
      crudeOilSynthetic: {
        en: 'Crude Oil - Synthetic',
        fr: 'Pétrole brut synthétique',
      },
      dieselFuel: {
        en: 'Diesel Fuel',
        fr: 'Carburant diesel',
      },
      gasoline: {
        en: 'Gasoline',
        fr: 'Essence',
      },
      isoOctane: {
        en: 'Iso-octane',
        fr: 'Isooctane',
      },
      jetFuel: {
        en: 'Jet Fuel',
        fr: 'Carburant aviation',
      },
      carbonDioxide: {
        en: 'Carbon Dioxide',
        fr: 'Dioxyde de carbone',
      },
      sulphur: {
        en: 'Sulphur',
        fr: 'Soufre',
      },
      fuelGas: {
        en: 'Fuel Gas',
        fr: 'Gaz combustible',
      },
      naturalGasSweet: {
        en: 'Natural Gas - Sweet',
        fr: 'Gaz Naturel - non sulfureux',
      },
      naturalGasSour: {
        en: 'Natural Gas - Sour',
        fr: 'Gaz naturel - sulfureux',
      },
      odourant: {
        en: 'Odourant',
        fr: 'Odorisant',
      },
      pulpSlurry: {
        en: 'Pulp slurry',
        fr: 'Pâte liquide',
      },

    },
    releaseType: {
      gas: {
        en: 'Gas',
        fr: 'Gaz'
      },
      liquid: {
        en: 'Liquid',
        fr: 'Liquide'
      },
      miscellaneous: {
        en: 'Miscellaneous',
        fr: 'Divers'
      },
      notApplicable: {
        en: 'Not Applicable',
        fr: 'Sans objet'
      },
    },
    whatHappened: {
      defectDeterioration: {
        en: 'Defect & Deterioration',
        fr: 'Défectuosité et détérioration ',
      },
      corrosionCracking: {
        en: 'Corrosion & Cracking',
        fr: 'Corrosion et fissuration',
      },
      equipmentFailure: {
        en: 'Equipment Failure',
        fr: ' Défaillance d’équipement'
      },
      incorrectOperation: { 
        en: 'Incorrect Operation',
        fr: 'Erreur d’exploitation',
      },
      externalInterference: {
        en: 'External interference',
        fr: 'Interférences extérieures ',
      },
      naturalForceDamage: {
        en: 'Natural Force Damage',
        fr: 'Forces de la nature',
      },
      otherCauses: {
        en: 'Other Causes',
        fr: 'Autres causes',
      },
      tbd: {
        en: 'To be determined',
        fr: 'À déterminer'
      },
    },
    whyItHappened: {
      engineeringAndPlanning: {
        en: 'Engineering and Planning',
        fr: 'Ingénierie et planification',
      },
      maintenance: {
        en: 'Maintenance',
        fr: 'Entretien',
      },
      inadequateProcurement: {
        en: 'Inadequate Procurement',
        fr: 'Approvisionnement inadéquat',
      },
      toolsAndEquipment: {
        en: 'Tools and Equipment',
        fr: 'Outils et équipement',
      },
      standardsAndProcedures: {
        en: 'Standards and Procedures',
        fr: 'Normes et procédures',
      },
      failureInCommunication: {
        en: 'Failure in communication',
        fr: 'Problème de communication',
      },
      inadequateSupervision: {
        en: 'Inadequate Supervision',
        fr: 'Supervision insuffisante',
      },
      humanFactors: {
        en: 'Human Factors',
        fr: 'Facteurs humains',
      },
      naturalOrEnvironmentalForces: {
        en: 'Natural or Environmental Forces',
        fr: 'Forces de la nature ou environnement',
      },
      tbd: {
        en: 'To be determined',
        fr: 'À déterminer'
      },
    },
    pipelinePhase: {
      construction: {
        en: 'Construction',
        fr: 'Construction'
      },
      operation: {
        en: 'Operation',
        fr: 'Exploitation'
      },
      maintenance: {
        en: 'Maintenance',
        fr: 'Entretien'
      },
      abandonment: {
        en: 'Abandonment',
        fr: "Cessation d'exploitation"
      },
    },
    pipelineSystemComponentsInvolved: {
      pipeline: {
        en: 'Pipeline',
        fr: 'Pipeline',
      },
      processingPlant: {
        en: 'Processing Plant',
        fr: 'Usine de traitement',
      },
      compressionStation: {
        en: 'Compression Station',
        fr: 'Station de compression',
      },
      meteringStation: {
        en: 'Metering Station',
        fr: 'Station de comptage',
      },
      pigging: {
        en: 'Pigging',
        fr: 'Installation de raclage',
      },
      pumpingStation: {
        en: 'Pumping Station',
        fr: 'Station de pompage',
      },
      powerGeneration: {
        en: 'Power Generation',
        fr: 'Installation de production d’énergie',
      },
      regulatingFacility: {
        en: 'Regulating Facility',
        fr: 'Installation de régulation',
      },
      storageFacility: {
        en: 'Storage Facility',
        fr: 'Installation de stockage',
      },
      vehicleMobileEquipment: {
        en: 'Vehicle/Mobile Equipment',
        fr: 'Véhicule ou équipement mobile',
      },

      notApplicable: {
        'en': 'Not Applicable',
        'fr': 'Sans objet'
      },
      unknown: {
        'en': 'Unknown',
        'fr': 'Inconnu'
      }
    },

    'volumeCategory': {
      notApplicable: {
        en: 'Not Applicable',
        fr: 'Sans objet'
      },
      notProvided: {
        en: 'Not Provided',
        fr: 'Non fourni'
      },
      lessThanOne: {
        en: 'Less Than 1 m³',
        fr: 'Moins de 1 m3',
      },
      lessThanOneThousand: {
        en: '1 m³ to 1,000 m³',
        fr: '1 m³ à 1 000 m³',
      },
      lessThanOneMillion: {
        en: '1,000 m³ to 1,000,000 m³',
        fr: '1 000 m³ à 1 000 000 m³',
      },
      moreThanOneMillion: {
        en: 'More than 1,000,000 m³',
        fr: 'Plus de 1 000 000 m³',
      },
    },
  },










})

module.exports = TranslationTable