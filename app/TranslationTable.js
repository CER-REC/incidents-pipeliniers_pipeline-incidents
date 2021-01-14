import Immutable from 'immutable'

const TranslationTable = Immutable.fromJS({

  bitlyShare: {
    en: 'Visit this interactive visualization: ',
    fr: 'Visitez cette visualisation interactif: ',
  },
  methodologyLinks: {
    en: 'data/Incident Data Methodology_EN.pdf',
    fr: 'data/Incident Data Methodology_FR.pdf',
  },

  learnMoreLinks: {
    en: 'https://www.cer-rec.gc.ca/en/safety-environment/industry-performance/infographic/index.html',
    fr: 'https://www.cer-rec.gc.ca/fr/securite-environnement/rendement-lindustrie/infographie/index.html',
  },

  aboutText: {
    title: {
      en: 'ABOUT THIS PROJECT',
      fr: 'LE PROJET',
    },
    p1: {
      en: 'This Incidents at CER-Regulated Pipeline and Facilities interactive online tool is part of the Canada Energy Regulator’s (CER) Data Visualization Initiative (DVI). The DVI is a three-year initiative to transform how the CER structures and shares data. The objective is to enable evidence-based decision making and remove barriers to understanding Canada’s energy and pipeline systems through the use of user-friendly interactive visualizations. This visualization is based on CER data from 2008 to current for incidents reported under the Onshore Pipeline Regulations and the Processing Plant Regulation. In the months and years to come we will use this innovative format to share our pipeline safety data, energy data series, energy infrastructure information, and a host of other topical data. In addition, other online tools can be found on the CER\'s ',
      fr: 'L’outil interactif « Incidents impliquant des installations et des pipelines réglementés » fait partie de l’initiative de visualisation des données de la Régie de l’énergie du Canada. Échelonnée sur trois ans, cette initiative vise à transformer la manière dont la Régie structure et diffuse ses données. Elle a pour objectif de favoriser un processus décisionnel fondé sur la preuve et de faciliter la compréhension des questions liées aux réseaux énergétiques et pipeliniers du Canada, grâce à un outil de visualisation interactif, facile à utiliser. L’outil présente les données recueillies par la Régie de 2008 à aujourd’hui en ce qui concerne les incidents signalés en application du Règlement de la Régie de l’énergie du Canada sur les pipelines terrestres et du Règlement sur les usines de traitement. Au cours des mois et des années à venir, la Régie utilisera cet outil novateur pour diffuser ses données sur la sécurité des pipelines et sur l’énergie, l’information qu’il possède sur l’infrastructure énergétique et une foule d’autres renseignements spécialisés. Par ailleurs, la page Web de la ',
    },
    safetyPerformancePortalText: {
      en: 'Industry Performance',
      fr: 'Régie sur le Rendement de l\'industrie',
    },
    safetyPerformancePortalLink: {
      en: 'https://www.cer-rec.gc.ca/en/safety-environment/industry-performance/index.html',
      fr: 'https://www.cer-rec.gc.ca/fr/securite-environnement/rendement-lindustrie/index.html',
    },
    p1_2: {
      en: ' web page.',
      fr: ' comporte d’autres outils interactifs en ligne.',
    },
    p2: {
      en: 'If you want to use the data for research and undertake your own review, all the data is downloadable and shareable. The chart images are also downloadable',
      fr: 'Si vous souhaitez utiliser les données pour vos recherches ou pour en faire votre propre analyse, vous pouvez les télécharger et les partager. Les graphiques peuvent aussi être téléchargés.',
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
      en: 'data.donnees@cer-rec.gc.ca',
      fr: 'data.donnees@cer-rec.gc.ca',
    },
    emailLink: {
      en: 'mailto:data.donnees@cer-rec.gc.ca',
      fr: 'mailto:data.donnees@cer-rec.gc.ca',
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
        en: 'Design: Bon Adriel Aseniero, Peter Buk, Shreya Chopra, Søren Knudsen, Doris Kosminsky, Claudia Maurer, Lien Quach, Katrina Tabuli, Annie Tat, Jo Vermeulen, Jagoda Walny Nix, Mieka West, and Lindsay MacDonald.',
        fr: 'Conception : Bon Adriel Aseniero, Peter Buk, Shreya Chopra, Søren Knudsen, Doris Kosminsky, Claudia Maurer, Lien Quach, Katrina Tabuli, Annie Tat, Jo Vermeulen, Jagoda Walny Nix, Mieka West, et Lindsay MacDonald.',
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
    thirdPartyLicensesTitle:{
      en: 'THIRD PARTY LICENSES',
      fr: 'LICENCES DE TIERS'
    },
    thirdPartyLicensesContent:{
      map:{
        title:{
          en: 'Map:',
          fr: 'Carte:'
        },
        map_1:{
          en: '“Map showing provinces and territories reporting 2009 swine flu (H1N1) cases in Canada” by Fonadier from ',
          fr: 'Carte produite par Fonadier illustrant les provinces et territoires selon les signalements de cas de grippe A (H1N1), tirée de '
        },
        map_2_text:{
          en: 'Wikimedia Commons',
          fr: 'Wikimedia Commons'
        },
        map_2_link:{
          en: 'https://commons.wikimedia.org/wiki/File:H1N1_Canada_map.svg',
          fr: 'https://commons.wikimedia.org/wiki/File:H1N1_Canada_map.svg'
        },
        map_3:{
          en: ' (Re-coloured and rotated from original.)' ,
          fr: ' (L’original a été recoloré et pivoté.)'
        },
      },

      tellMeAStoryIcon:{
        title:{
          en: 'Tell Me A Story icon:',
          fr: 'Icône Une histoire à raconter?:'
        },
        content:{
          en: 'by Bon Adriel Aseniero. Licensed under ',
          fr: 'Créé par Bon Adriel Aseniero et portant la licence '
        },
        link:{
          en: 'https://creativecommons.org/licenses/by-sa/3.0/',
          fr: 'https://creativecommons.org/licenses/by-sa/3.0/'
        },
        link_text: {
          en: 'CC BY-SA 3.0',
          fr: 'CC BY-SA 3.0'
        }
      },
      methodologyIcon:{
        title:{
          en: 'Methodology icon:',
          fr: 'Icône Méthodologie:'
        },
        text1:{
          en: 'Process by Rflor',
          fr: 'Créé par Rflor'
        },
        text1Link:{
          en: 'https://thenounproject.com/rflor/collection/infography-circles/?oq=methodology&cidx=0&i=363475',
          fr: 'https://thenounproject.com/rflor/collection/infography-circles/?oq=methodology&cidx=0&i=363475'
        }
      },
      resetIcon:{
        title:{
          en:'Reset icon:',
          fr:'Icône réinitialiser:'
        },
        text1:{
          en:'Reset by Mooms',
          fr:'Créé par Mooms'
        },
        text1Link:{
          en:'https://thenounproject.com/search/?q=reset&i=1033424',
          fr:'https://thenounproject.com/search/?q=reset&i=1033424'
        }
      },
      facebookIcon:{
        title:{
          en:'Facebook icon:',
          fr:'Icône Facebook:'
        },
        text1:{
          fr:'Créé par Elegant Themes, tirée de ',
          en:'By Elegant Themes from '
        },
        text2:{
          en:'www.flaticon.com',
          fr:'www.flaticon.com'
        },
        text2Link:{
          en:'https://www.flaticon.com/',
          fr:'https://www.flaticon.com/'
        }
      },
      common:{
        licenceUnder:{
          en: '. Licensed under ',
          fr: ' et portant la licence '
        },
        ccByThree:{
          en: 'CC BY 3.0.',
          fr: 'CC BY 3.0.'
        },
        ccByThreeLink:{
          en: 'https://creativecommons.org/licenses/by/3.0/deed.en',
          fr: 'https://creativecommons.org/licenses/by/3.0/deed.en'
        },
        from:{
          en:' from ',
          fr: ' tirée de '
        },
        theNounProject:{
          en:'thenounproject.com',
          fr: 'thenounproject.com'
        },
        theNounProjectLink:{
          en:'http://thenounproject.com/',
          fr: 'http://thenounproject.com/'
        },
      }
    }
  },

  stories: {
    'the-basics-of-incident-visualization': {
      title: {
        en: 'THE BASICS OF INCIDENT VISUALIZATION',
        fr: 'INTRODUCTION À LA VISUALISATION DES DONNÉES RELATIVES AUX INCIDENTS',
      },
      backgroundImage: {
        en: 'images/stories/the-basics-of-incident-visualization-1-EN.jpg',
        fr: 'images/stories/the-basics-of-incident-visualization-1-FR.jpg',
      },
      tutorialImages: {
        en: [
          'images/stories/the-basics-of-incident-visualization-1-EN.jpg',
          'images/stories/the-basics-of-incident-visualization-2-EN.jpg',
          'images/stories/the-basics-of-incident-visualization-3-EN.jpg',
          'images/stories/the-basics-of-incident-visualization-4-EN.jpg',
        ],
        fr: [
          'images/stories/the-basics-of-incident-visualization-1-FR.jpg',
          'images/stories/the-basics-of-incident-visualization-2-FR.jpg',
          'images/stories/the-basics-of-incident-visualization-3-FR.jpg',
          'images/stories/the-basics-of-incident-visualization-4-FR.jpg',
        ],
      },
      // TODO: Change story mode configs to no longer store configuration as
      // URLs. Store configuration that we would like to change to instead.
      config: {
        en: '?columns=province,year&province=7,10,4,5,3,6,9,13,1,8,12,2,11&year=2017,2016,2015,2014,2013,2012,2011,2010,2009,2008',
        fr: '?columns=province,year&province=7,10,4,5,3,6,9,13,1,8,12,2,11&year=2017,2016,2015,2014,2013,2012,2011,2010,2009,2008',
      },
    },
    'how-to-read-the-visualization': {
      title: {
        en: 'HOW TO READ THE VISUALIZATION',
        fr: 'POUR INTERPRÉTER LA VISUALISATION',
      },
      backgroundImage: {
        en: 'images/stories/how-to-read-the-visualization-1-EN.jpg',
        fr: 'images/stories/how-to-read-the-visualization-1-FR.jpg',
      },
      tutorialImages: {
        en: [
          'images/stories/how-to-read-the-visualization-1-EN.jpg',
          'images/stories/how-to-read-the-visualization-2-EN.jpg',
          'images/stories/how-to-read-the-visualization-3-EN.jpg',
          'images/stories/how-to-read-the-visualization-4-EN.jpg',
        ],
        fr: [
          'images/stories/how-to-read-the-visualization-1-FR.jpg',
          'images/stories/how-to-read-the-visualization-2-FR.jpg',
          'images/stories/how-to-read-the-visualization-3-FR.jpg',
          'images/stories/how-to-read-the-visualization-4-FR.jpg',
        ],
      },
      // TODO: Change story mode configs to no longer store configuration as
      // URLs. Store configuration that we would like to change to instead.
      config: {
        en: '?columns=incidentTypes,whatHappened,whyItHappened&whatHappened=3,4,5,2,1,-1,14,6&incidentTypes=8,9,7,5,10,6,4&whyItHappened=12,7,15,9,16,-1,11,8,13,10',
        fr: '?columns=incidentTypes,whatHappened,whyItHappened&whatHappened=3,4,5,2,1,-1,14,6&incidentTypes=8,9,7,5,10,6,4&whyItHappened=12,7,15,9,16,-1,11,8,13,10',
      },
    },
    'getting-the-big-picture': {
      title: {
        en: 'GETTING THE BIG PICTURE',
        fr: 'AVOIR UNE VUE D’ENSEMBLE',
      },
      backgroundImage: {
        en: 'images/stories/getting-the-big-picture-1-EN.jpg',
        fr: 'images/stories/getting-the-big-picture-1-FR.jpg',
      },
      tutorialImages: {
        en: [
          'images/stories/getting-the-big-picture-1-EN.jpg',
          'images/stories/getting-the-big-picture-2-EN.jpg',
          'images/stories/getting-the-big-picture-3-EN.jpg',
          'images/stories/getting-the-big-picture-4-EN.jpg',
        ],
        fr: [
          'images/stories/getting-the-big-picture-1-FR.jpg',
          'images/stories/getting-the-big-picture-2-FR.jpg',
          'images/stories/getting-the-big-picture-3-FR.jpg',
          'images/stories/getting-the-big-picture-4-FR.jpg',
        ],
      },
      config: {
        en: '?columns=map,releaseType,incidentTypes&releaseType=Gas,Not applicable,Liquid,Miscellaneous&incidentTypes=8,7,9,5,10,6,4&map=',
        fr: '?columns=map,releaseType,incidentTypes&releaseType=Gas,Not applicable,Liquid,Miscellaneous&incidentTypes=8,7,9,5,10,6,4&map=',
      },
    },
    'adding-columns-to-dig-deeper': {
      title: {
        en: 'ADDING COLUMNS TO DIG DEEPER',
        fr: 'AJOUTER DES COLONNES POUR APPRONDIR',
      },
      backgroundImage: {
        en: 'images/stories/adding-columns-to-dig-deeper-1-EN.jpg',
        fr: 'images/stories/adding-columns-to-dig-deeper-1-FR.jpg',
      },
      tutorialImages: {
        en: [
          'images/stories/adding-columns-to-dig-deeper-1-EN.jpg',
          'images/stories/adding-columns-to-dig-deeper-2-EN.jpg',
          'images/stories/adding-columns-to-dig-deeper-3-EN.jpg',
          'images/stories/adding-columns-to-dig-deeper-4-EN.jpg',
        ],
        fr: [
          'images/stories/adding-columns-to-dig-deeper-1-FR.jpg',
          'images/stories/adding-columns-to-dig-deeper-2-FR.jpg',
          'images/stories/adding-columns-to-dig-deeper-3-FR.jpg',
          'images/stories/adding-columns-to-dig-deeper-4-FR.jpg',
        ],
      },
      config: {
        en: '?columns=incidentTypes,whatHappened,whyItHappened&whatHappened=4&incidentTypes=4&whyItHappened=6,1,8,3,9,5,7,2,-1,4&pinnedIncidents=INC2008-084,INC2017-123&fbas_columnName=incidentTypes&fbas_categoryName=4',
        fr: '?columns=incidentTypes,whatHappened,whyItHappened&whatHappened=4&incidentTypes=4&whyItHappened=6,1,8,3,9,5,7,2,-1,4&pinnedIncidents=INC2008-084,INC2017-123&fbas_columnName=incidentTypes&fbas_categoryName=4',
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
        en: 'The unique identifier – or label – the CER assigns to each incident.',
        fr: 'L’identificateur unique, l’étiquette que la Régie appose aux différents incidents.',
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
          {
            overview: 'Adverse Environmental Effects',
            expanded: 'When any chemical substance is released at a concentration or volume that has the potential to change the ambient environment in a manner that would cause harm to human life, wildlife or vegetation (e.g., glycol, potassium carbonate, methanol, methanol mix from hydrostatic testing, etc.).',
            categoryName: '10'
          },
          {
            overview: 'Explosion',
            expanded: 'An unintended explosion',
            categoryName: '6'
          },
          {
            overview: 'Fatality',
            expanded: 'Any death involving employees, contractors or members of the public related to the construction, operation, maintenance or abandonment of pipelines',
            categoryName: '4'
          },
          {
            overview: 'Fire',
            expanded: 'An unintended fire',
            categoryName: '7'
          },
          {
            overview: 'Operation Beyond Design Limits',
            expanded: 'Includes situations, such as: \n ○ over-pressures – i.e., pressures that are higher than the maximum the equipment was designed to safely handle○ vibration beyond design limits; \n ○ slope movements causing movement in the pipeline beyond design limits;\n ○ pipe exposures in rivers or streams; and \n ○ introduction of an inappropriate product (e.g., sour gas in excess of CSA limits). \n Operation beyond design limit is typically linked to an over-pressure of the product in the pipe; however, if a pipe was exposed to excessive vibration and was not designed for this, this could be considered operation beyond design limits. Operation beyond design limits does not include equipment contacting the pipe, or corrosion pits, etc.',
            categoryName: '9'
          },
          {
            overview: 'Release of Substance',
            expanded: 'Any time a product is unintentionally released. (Releases of non-gas low pressure products in volumes of less than 1.5 cubic metres are exempt from reporting.)',
            categoryName: '8'
          },
          {
            overview: 'Serious Injury (CER or Transportation Safety Board)',
            expanded: 'Any serious injury involving employees, contractors or members of the public related to the construction, operation or maintenance of pipelines.',
            categoryName: '5'
          }
        ],
        fr: [
          {
            overview: 'Effets négatifs sur l’environnement',
            expanded: 'Lorsqu’il y a rejet d’une substance chimique à une concentration ou dans une quantité suffisante pour modifier l’environnement ambiant et mettre en danger la vie humaine, la faune ou la végétation (p. ex., glycol, carbonate de potassium, méthanol, mélange de méthanol provenant d’un essai hydrostatique, etc.).',
            categoryName: '10',
          },
          {
            overview: 'Explosion',
            expanded: 'Une explosion non intentionnelle.',
            categoryName: '6',
          },
          {
            overview: 'Décès',
            expanded: 'Le décès d’un employé, d’un entrepreneur ou d’un membre du public en rapport avec la construction, le fonctionnement, l’entretien ou la cessation d’exploitation d’un pipeline.',
            categoryName: '4',
          },
          {
            overview: 'Incendie',
            expanded: 'Un incendie non intentionnel.',
            categoryName: '7',
          },
          {
            overview: 'Exploitation au-delà des tolérances de conception',
            expanded: 'De telles situations comprennent notamment les suivantes :\n○ cas de surpression, soit lorsque les pressions sont supérieures aux limites établies pour un fonctionnement sans danger de l’équipement;\n○ vibration supérieure aux tolérances de conception;\n○ mouvements du sol à l’origine d’un déplacement du pipeline plus grand que celui autorisé selon les limites de conception;\n○ affleurement d’une conduite dans une rivière ou un ruisseau;\n○ présence d’un produit inapproprié (p. ex., gaz acide au-delà des limites établies par les normes CSA).\nL’exploitation au-delà des tolérances de conception est habituellement liée à une surpression causée par le produit dans la canalisation. Cependant, si cette dernière est soumise à une vibration excessive pour laquelle elle n’a pas été conçue, il pourrait s’agir là encore d’un type d’exploitation au-delà des tolérances de conception, qui n’inclut toutefois pas les chocs avec la conduite, les piqûres de corrosion, etc.',
            categoryName: '9',
          },
          {
            overview: 'Rejet d’une substance',
            expanded: 'Tout rejet non intentionnel d’un produit. (Les rejets à basse pression de produits autres que du gaz d’un volume inférieur à 1,5 mètre cube n’ont pas à être signalés.)',
            categoryName: '8',
          },
          {
            overview: 'Blessure grave (Office ou Bureau de la sécurité des transports)',
            expanded: 'Toute blessure grave causée à un employé, un entrepreneur ou un membre du public en rapport avec la construction, l’exploitation ou l’entretien d’un pipeline.',
            categoryName: '5',
          }
        ],
      },
    },
    year: {
      title: {
        en: 'REPORTED DATE/YEAR',
        fr: 'ANNÉE DU SIGNALEMENT',
      },
      description: {
        en: 'The date the company reported the incident to the CER. This date may differ from when the incident occurred or was discovered.',
        fr: 'La date à laquelle la société a signalé l’incident à la Régie. Cette date peut être différente de celle à laquelle l’incident en question est survenu ou a été découvert.',
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
        fr: 'La société détentrice de l’instrument réglementaire pour le pipeline/l’installation où l’incident s’est produit.',
      },
      detail: {
        en: [
          {
            'overview': '2193914 Canada Limited',
            'expanded': null,
            'categoryName': '5844'
          },
          {
            'overview': 'Alliance Pipeline Ltd.',
            'expanded': null,
            'categoryName': '3366'
          },
          {
            'overview': 'Burlington Resources Canada (Hunter) Ltd.',
            'expanded': null,
            'categoryName': '5192'
          },
          {
            'overview': 'Centra Transmission Holdings Inc.',
            'expanded': null,
            'categoryName': '3250'
          },
          {
            'overview': 'Cochin Pipe Lines Ltd.',
            'expanded': null,
            'categoryName': '3005'
          },
          {
            'overview': 'Emera Brunswick Pipeline Company Ltd.',
            'expanded': null,
            'categoryName': '5201'
          },
          {
            'overview': 'Enbridge G and P Canada Pipelines Inc.',
            'expanded': null,
            'categoryName': '6468'
          },
          {
            'overview': 'Enbridge Pipelines (NW) Inc.',
            'expanded': null,
            'categoryName': '3416'
          },
          {
            'overview': 'Enbridge Pipelines (Westspur) Inc.',
            'expanded': null,
            'categoryName': '3417'
          },
          {
            'overview': 'Enbridge Pipelines Inc.',
            'expanded': null,
            'categoryName': '3415'
          },
          {
            'overview': 'EnCana Corporation',
            'expanded': null,
            'categoryName': '5137'
          },
          {
            'overview': 'Ethane Shippers Joint Venture',
            'expanded': null,
            'categoryName': '3177'
          },
          {
            'overview': 'Express Pipeline Ltd.',
            'expanded': null,
            'categoryName': '3276'
          },
          {
            'overview': 'ExxonMobil Canada Properties',
            'expanded': null,
            'categoryName': '4405'
          },
          {
            'overview': 'Foothills Pipe Lines (Saskatchewan) Ltd.',
            'expanded': null,
            'categoryName': '3050'
          },
          {
            'overview': 'Foothills Pipe Lines Ltd.',
            'expanded': null,
            'categoryName': '3044'
          },
          {
            'overview': 'Husky Oil Limited',
            'expanded': null,
            'categoryName': '5129'
          },
          {
            'overview': 'Kinder Morgan Cochin ULC',
            'expanded': null,
            'categoryName': '5235'
          },
          {
            'overview': 'Many Islands Pipe Lines (Canada) Limited',
            'expanded': null,
            'categoryName': '3079'
          },
          {
            'overview': 'Maritimes & Northeast Pipeline Management Ltd.',
            'expanded': null,
            'categoryName': '3351'
          },
          {
            'overview': 'Niagara Gas Transmission Limited',
            'expanded': null,
            'categoryName': '3089'
          },
          {
            'overview': 'NOVA Chemicals (Canada) Ltd.',
            'expanded': null,
            'categoryName': '3289'
          },
          {
            'overview': 'NOVA Gas Transmission Ltd.',
            'expanded': null,
            'categoryName': '4909'
          },
          {
            'overview': 'Pembina Energy Services Inc.',
            'expanded': null,
            'categoryName': '6192'
          },
          {
            'overview': 'Pembina Prairie Facilities Ltd.',
            'expanded': null,
            'categoryName': '6353'
          },
          {
            'overview': 'Plains Marketing Canada, L.P.',
            'expanded': null,
            'categoryName': '3505'
          },
          {
            'overview': 'Plains Midstream Canada ULC',
            'expanded': null,
            'categoryName': '5967'
          },
          {
            'overview': 'Pouce Coupé Pipe Line Ltd. as agent and general partner of the Pembina North Limited Partnership',
            'expanded': null,
            'categoryName': '3118'
          },
          {
            'overview': 'Provident Energy Pipeline Inc.',
            'expanded': null,
            'categoryName': '5142'
          },
          {
            'overview': 'Spectra Energy Empress Management Inc. as General Partner and Agent for Spectra Energy Empress L.P.',
            'expanded': null,
            'categoryName': '5222'
          },
          {
            'overview': 'Trans Mountain Pipeline Inc.',
            'expanded': null,
            'categoryName': '5228'
          },
          {
            'overview': 'Trans Mountain Pipeline ULC',
            'expanded': null,
            'categoryName': '5874'
          },
          {
            'overview': 'Trans Québec and Maritimes Pipeline Inc.',
            'expanded': null,
            'categoryName': '3144'
          },
          {
            'overview': 'TransCanada Keystone Pipeline GP Ltd.',
            'expanded': null,
            'categoryName': '5203'
          },
          {
            'overview': 'TransCanada PipeLines Limited',
            'expanded': null,
            'categoryName': '3137'
          },
          {
            'overview': 'TransCanada PipeLines Limited B.C. System',
            'expanded': null,
            'categoryName': '3464'
          },
          {
            'overview': 'Trans-Northern Pipelines Inc.',
            'expanded': null,
            'categoryName': '3138'
          },
          {
            'overview': 'Tundra Energy Marketing Limited',
            'expanded': null,
            'categoryName': '6123'
          },
          {
            'overview': 'Twin Rivers Paper Company Inc.',
            'expanded': null,
            'categoryName': '5946'
          },
          {
            'overview': 'Westcoast Energy Inc., carrying on business as Spectra Energy Transmission',
            'expanded': null,
            'categoryName': '3162'
          }
        ],
        fr: [
          {
            overview: '2193914 Canada Limited',
            expanded: null,
            categoryName: '5844',
          },
          {
            overview: 'Alliance Pipeline Ltd.',
            expanded: null,
            categoryName: '3366',
          },
          {
            overview: 'Burlington Resources Canada (Hunter) Ltd.',
            expanded: null,
            categoryName: '5192',
          },
          {
            overview: 'Centra Transmission Holdings Inc.',
            expanded: null,
            categoryName: '3250',
          },
          {
            overview: 'Cochin Pipe Lines Ltd.',
            expanded: null,
            categoryName: '3005',
          },
          {
            overview: 'Emera Brunswick Pipeline Company Ltd.',
            expanded: null,
            categoryName: '5201',
          },
          {
            overview: 'Enbridge G and P Canada Pipelines Inc.',
            expanded: null,
            categoryName: '6468',
          },
          {
            overview: 'Enbridge Pipelines (NW) Inc.',
            expanded: null,
            categoryName: '3416',
          },
          {
            overview: 'Enbridge Pipelines (Westspur) Inc.',
            expanded: null,
            categoryName: '3417',
          },
          {
            overview: 'Enbridge Pipelines Inc.',
            expanded: null,
            categoryName: '3415',
          },
          {
            overview: 'EnCana Corporation',
            expanded: null,
            categoryName: '5137',
          },
          {
            overview: 'Ethane Shippers Joint Venture',
            expanded: null,
            categoryName: '3177',
          },
          {
            overview: 'Express Pipeline Ltd.',
            expanded: null,
            categoryName: '3276',
          },
          {
            overview: 'ExxonMobil Canada Properties',
            expanded: null,
            categoryName: '4405',
          },
          {
            overview: 'Foothills Pipe Lines (Saskatchewan) Ltd.',
            expanded: null,
            categoryName: '3050',
          },
          {
            overview: 'Foothills Pipe Lines Ltd.',
            expanded: null,
            categoryName: '3044',
          },
          {
            overview: 'Husky Oil Limited',
            expanded: null,
            categoryName: '5129',
          },
          {
            overview: 'Kinder Morgan Cochin ULC',
            expanded: null,
            categoryName: '5235',
          },
          {
            overview: 'Many Islands Pipe Lines (Canada) Limited',
            expanded: null,
            categoryName: '3079',
          },
          {
            overview: 'Maritimes & Northeast Pipeline Management Ltd.',
            expanded: null,
            categoryName: '3351',
          },
          {
            overview: 'Niagara Gas Transmission Limited',
            expanded: null,
            categoryName: '3089',
          },
          {
            overview: 'NOVA Chemicals (Canada) Ltd.',
            expanded: null,
            categoryName: '3289',
          },
          {
            overview: 'NOVA Gas Transmission Ltd.',
            expanded: null,
            categoryName: '4909',
          },
          {
            overview: 'Pembina Energy Services Inc.',
            expanded: null,
            categoryName: '6192',
          },
          {
            overview: 'Pembina Prairie Facilities Ltd.',
            expanded: null,
            categoryName: '6353',
          },
          {
            overview: 'Plains Marketing Canada, L.P.',
            expanded: null,
            categoryName: '3505',
          },
          {
            overview: 'Plains Midstream Canada ULC',
            expanded: null,
            categoryName: '5967',
          },
          {
            overview: 'Pouce Coupé Pipe Line Ltd. as agent and general partner of the Pembina North Limited Partnership',
            expanded: null,
            categoryName: '3118',
          },
          {
            overview: 'Provident Energy Pipeline Inc.',
            expanded: null,
            categoryName: '5142',
          },
          {
            overview: 'Spectra Energy Empress Management Inc. as General Partner and Agent for Spectra Energy Empress L.P.',
            expanded: null,
            categoryName: '5222',
          },
          {
            overview: 'Trans Mountain Pipeline Inc.',
            expanded: null,
            categoryName: '5228',
          },
          {
            overview: 'Trans Mountain Pipeline ULC',
            expanded: null,
            categoryName: '5874',
          },
          {
            overview: 'Trans Québec and Maritimes Pipeline Inc.',
            expanded: null,
            categoryName: '3144',
          },
          {
            overview: 'TransCanada Keystone Pipeline GP Ltd.',
            expanded: null,
            categoryName: '5203',
          },
          {
            overview: 'TransCanada PipeLines Limited',
            expanded: null,
            categoryName: '3137',
          },
          {
            overview: 'TransCanada PipeLines Limited B.C. System',
            expanded: null,
            categoryName: '3464',
          },
          {
            overview: 'Trans-Northern Pipelines Inc.',
            expanded: null,
            categoryName: '3138',
          },
          {
            overview: 'Tundra Energy Marketing Limited',
            expanded: null,
            categoryName: '6123',
          },
          {
            overview: 'Twin Rivers Paper Company Inc.',
            expanded: null,
            categoryName: '5946',
          },
          {
            overview: 'Westcoast Energy Inc., carrying on business as Spectra Energy Transmission',
            expanded: null,
            categoryName: '3162',
          }
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
          {
            overview: 'Initially Submitted',
            expanded: 'The company has notified the CER that an incident has occurred and provided preliminary information. An investigation is has been initiated.',
            categoryName: '2'
          },
          {
            overview: 'Submitted',
            expanded: 'The company has submitted all of the required information and the CER is reviewing the incident.',
            categoryName: '3'
          },
          {
            overview: 'Closed',
            expanded: 'The CER’s incident review has been completed and the file is closed.',
            categoryName: '5'
          }
        ],
        fr: [
          {
            overview: 'Initialement soumis',
            expanded: 'La société a informé la Régie qu’un incident était survenu et a fourni les renseignements préliminaires sur celui-ci. Une enquête est en cours.',
            categoryName: '2',
          },
          {
            overview: 'Soumis',
            expanded: 'La société a fourni tous les renseignements exigés et la Régie examine ce qui s’est produit.',
            categoryName: '3',
          },
          {
            overview: 'Fermé',
            expanded: 'La Régie a terminé l’examen de l’incident et a clos le dossier.',
            categoryName: '5',
          }
        ],
      },
    },
    province: {
      title: {
        en: 'REGION',
        fr: 'RÉGION',
      },
      description: {
        en: 'The region where the incident occurred. ',
        fr: 'La région où l’incident est survenu.',
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
          {
            overview: 'Amine',
            expanded: null,
            categoryName: '1',
          },
          {
            overview: 'Calcium carbonate',
            expanded: null,
            categoryName: '2',
          },
          {
            overview: 'Casing cement',
            expanded: null,
            categoryName: '3',
          },
          {
            overview: 'Chlorodifluoromethane',
            expanded: null,
            categoryName: '4',
          },
          {
            overview: 'Contaminated water',
            expanded: null,
            categoryName: '5',
          },
          {
            overview: 'Corrosion inhibitor',
            expanded: null,
            categoryName: '6',
          },
          {
            overview: 'Drilling fluid',
            expanded: null,
            categoryName: '7',
          },
          {
            overview: 'Drip oil',
            expanded: null,
            categoryName: '8',
          },
          {
            overview: 'Glycol',
            expanded: null,
            categoryName: '9',
          },
          {
            overview: 'Grey water (sewage)',
            expanded: null,
            categoryName: '10',
          },
          {
            overview: 'Hydraulic fluid',
            expanded: null,
            categoryName: '11',
          },
          {
            overview: 'Hydrogen sulphide',
            expanded: null,
            categoryName: '12',
          },
          {
            overview: 'Lube oil',
            expanded: null,
            categoryName: '13',
          },
          {
            overview: 'Methanol',
            expanded: null,
            categoryName: '14',
          },
          {
            overview: 'Methyl tert-Butyl ether',
            expanded: null,
            categoryName: '15',
          },
          {
            overview: 'Morphysorb',
            expanded: null,
            categoryName: '16',
          },
          {
            overview: 'Oil well effluent',
            expanded: null,
            categoryName: '17',
          },
          {
            overview: 'Polychlorinated biphenyls',
            expanded: null,
            categoryName: '18',
          },
          {
            overview: 'Potassium carbonate',
            expanded: null,
            categoryName: '19',
          },
          {
            overview: 'Potassium hydroxide (caustic solution)',
            expanded: null,
            categoryName: '20',
          },
          {
            overview: 'Produced water',
            expanded: null,
            categoryName: '21',
          },
          {
            overview: 'Sulphur dioxide',
            expanded: null,
            categoryName: '22',
          },
          {
            overview: 'Toluene',
            expanded: null,
            categoryName: '23',
          },
          {
            overview: 'Waste oil',
            expanded: null,
            categoryName: '24',
          },
          {
            overview: 'Water',
            expanded: null,
            categoryName: '25',
          },
          {
            overview: 'Butane',
            expanded: null,
            categoryName: '27',
          },
          {
            overview: 'Mixed HVP hydrocarbons',
            expanded: null,
            categoryName: '28',
          },
          {
            overview: 'Natural gas liquids',
            expanded: null,
            categoryName: '29',
          },
          {
            overview: 'Propane',
            expanded: null,
            categoryName: '30',
          },
          {
            overview: 'Condensate',
            expanded: null,
            categoryName: '32',
          },
          {
            overview: 'Crude oil - sour',
            expanded: null,
            categoryName: '33',
          },
          {
            overview: 'Crude oil - sweet',
            expanded: null,
            categoryName: '34',
          },
          {
            overview: 'Crude oil - synthetic',
            expanded: null,
            categoryName: '35',
          },
          {
            overview: 'Diesel fuel',
            expanded: null,
            categoryName: '36',
          },
          {
            overview: 'Gasoline',
            expanded: null,
            categoryName: '37',
          },
          {
            overview: 'Isooctane',
            expanded: null,
            categoryName: '38',
          },
          {
            overview: 'Jet fuel',
            expanded: null,
            categoryName: '39',
          },
          {
            overview: 'Carbon dioxide',
            expanded: null,
            categoryName: '41',
          },
          {
            overview: 'Sulphur',
            expanded: null,
            categoryName: '42',
          },
          {
            overview: 'Natural gas - sweet',
            expanded: null,
            categoryName: '48',
          },
          {
            overview: 'Natural gas - sour',
            expanded: null,
            categoryName: '49',
          },
          {
            overview: 'Odourant',
            expanded: null,
            categoryName: '50',
          },
          {
            overview: 'Pulp slurry',
            expanded: null,
            categoryName: '51',
          }
        ],
        fr: [
          {
            overview: 'Amine',
            expanded: null,
            categoryName: '1',
          },
          {
            overview: 'Carbonate de calcium',
            expanded: null,
            categoryName: '2',
          },
          {
            overview: 'Ciment de tubage',
            expanded: null,
            categoryName: '3',
          },
          {
            overview: 'Chlorodifluorométhane',
            expanded: null,
            categoryName: '4',
          },
          {
            overview: 'Eau contaminée',
            expanded: null,
            categoryName: '5',
          },
          {
            overview: 'Inhibiteur de corrosion',
            expanded: null,
            categoryName: '6',
          },
          {
            overview: 'Fluide de forage',
            expanded: null,
            categoryName: '7',
          },
          {
            overview: 'Condensat',
            expanded: null,
            categoryName: '8',
          },
          {
            overview: 'Glycol',
            expanded: null,
            categoryName: '9',
          },
          {
            overview: 'Eaux grises (eaux usées)',
            expanded: null,
            categoryName: '10',
          },
          {
            overview: 'Fluide hydraulique',
            expanded: null,
            categoryName: '11',
          },
          {
            overview: 'sulfure d’hydrogène',
            expanded: null,
            categoryName: '12',
          },
          {
            overview: 'Huile lubrifiante',
            expanded: null,
            categoryName: '13',
          },
          {
            overview: 'Méthanol',
            expanded: null,
            categoryName: '14',
          },
          {
            overview: 'Éther tert-butylique méthylique',
            expanded: null,
            categoryName: '15',
          },
          {
            overview: 'Morphysorb®',
            expanded: null,
            categoryName: '16',
          },
          {
            overview: 'Effluents de puits de pétrole',
            expanded: null,
            categoryName: '17',
          },
          {
            overview: 'Diphényles polychlorés',
            expanded: null,
            categoryName: '18',
          },
          {
            overview: 'Carbonate de potassium',
            expanded: null,
            categoryName: '19',
          },
          {
            overview: 'Hydroxyde de potassium (solution caustique)',
            expanded: null,
            categoryName: '20',
          },
          {
            overview: 'Eau produite',
            expanded: null,
            categoryName: '21',
          },
          {
            overview: 'Dioxyde de soufre.',
            expanded: null,
            categoryName: '22',
          },
          {
            overview: 'Toluène',
            expanded: null,
            categoryName: '23',
          },
          {
            overview: 'Huile usée',
            expanded: null,
            categoryName: '24',
          },
          {
            overview: 'Eau',
            expanded: null,
            categoryName: '25',
          },
          {
            overview: 'Butane',
            expanded: null,
            categoryName: '27',
          },
          {
            overview: 'Mélange d’hydrocarbures à HPV',
            expanded: null,
            categoryName: '28',
          },
          {
            overview: 'Liquides de gaz naturel',
            expanded: null,
            categoryName: '29',
          },
          {
            overview: 'Propane',
            expanded: null,
            categoryName: '30',
          },
          {
            overview: 'Condensats',
            expanded: null,
            categoryName: '32',
          },
          {
            overview: 'Pétrole brut sulfureux',
            expanded: null,
            categoryName: '33',
          },
          {
            overview: 'Pétrole brut non corrosif',
            expanded: null,
            categoryName: '34',
          },
          {
            overview: 'Pétrole brut synthétique',
            expanded: null,
            categoryName: '35',
          },
          {
            overview: 'Carburant diesel',
            expanded: null,
            categoryName: '36',
          },
          {
            overview: 'Essence',
            expanded: null,
            categoryName: '37',
          },
          {
            overview: 'Isooctane',
            expanded: null,
            categoryName: '38',
          },
          {
            overview: 'Carburéacteur',
            expanded: null,
            categoryName: '39',
          },
          {
            overview: 'Dioxyde de carbone',
            expanded: null,
            categoryName: '41',
          },
          {
            overview: 'Soufre',
            expanded: null,
            categoryName: '42',
          },
          {
            overview: 'Gaz naturel non corrosif',
            expanded: null,
            categoryName: '48',
          },
          {
            overview: 'Gaz naturel sulfureux',
            expanded: null,
            categoryName: '49',
          },
          {
            overview: 'Odorisant',
            expanded: null,
            categoryName: '50',
          },
          {
            overview: 'Pâte liquide au bisulfite',
            expanded: null,
            categoryName: '51',
          }
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
          {
            overview: 'Gas',
            expanded: 'substances such as natural gas, sweet gas, fuel gas, and acid gas',
            categoryName: 'Gas',
          },
          {
            overview: 'Liquid',
            expanded: 'substances such as low-vapour pressure hydrocarbons, crude oil, natural gas liquids, and jet fuel',
            categoryName: 'Liquid',
          },
          {
            overview: 'Miscellaneous',
            expanded: 'substances such as mechanical pulp slurry, steam, effluent, processed water, and fresh water',
            categoryName: 'Miscellaneous',
          },
          {
            overview: 'Not Applicable',
            expanded: 'incidents that do not involve a release of substance',
            categoryName: 'Not applicable',
          }
        ],
        fr: [
          {
            overview: 'Gaz',
            expanded: 'Gaz naturel, non corrosif, combustible, acide, etc.',
            categoryName: 'Gas',
          },
          {
            overview: 'Liquide',
            expanded: 'Hydrocarbures à BPV, pétrole brut, liquides de gaz naturel, carburéacteur, etc.',
            categoryName: 'Liquid',
          },
          {
            overview: 'Divers',
            expanded: 'Pâte liquide au sulfite résultant d’un procédé mécanique, vapeur, effluents, eau de procédé, eau fraîche, etc.',
            categoryName: 'Miscellaneous',
          },
          {
            overview: 'Sans objet',
            expanded: 'Aucun rejet de substance.',
            categoryName: 'Not applicable',
          }
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
          {
            overview: 'Defect and Deterioration',
            expanded: 'Defects in manufacturing processes or materials, or deterioration as a result of damage or service life limitations, lack of inspection or maintenance',
            categoryName: '2',
          },
          {
            overview: 'Corrosion and Cracking',
            expanded: 'External corrosion or cracking caused by damage to coating systems or failed coating systems; weld cracking as a result of stress or workmanship issues; or internal corrosion as a result of contaminates in products',
            categoryName: '1',
          },
          {
            overview: 'Equipment Failure',
            expanded: 'A failure of the pipeline’s equipment components. Examples of equipment include valves, electrical power systems and control systems',
            categoryName: '3',
          },
          {
            overview: 'Incorrect Operation',
            expanded: 'Typically, personnel fail to follow procedures or use equipment improperly',
            categoryName: '5',
          },
          {
            overview: 'External interference',
            expanded: 'External activities that cause damage to the pipeline or components. Examples include excavation damage and vandalism',
            categoryName: '4',
          },
          {
            overview: 'Natural Force Damage',
            expanded: 'Damage caused by natural forces, such as earthquakes, landslides and wash-outs',
            categoryName: '6',
          },
          {
            overview: 'Other Causes',
            expanded: 'All other causes or when an incident’s circumstances could not be determined',
            categoryName: '14',
          }
        ],
        fr: [
          {
            overview: 'Défectuosité et détérioration',
            expanded: 'Défectuosité au niveau des matériaux ou des processus de fabrication et détérioration attribuable à des dommages, au dépassement de la durée de vie utile, à l’absence d’inspection ou à un manque d’entretien.',
            categoryName: '2',
          },
          {
            overview: 'Corrosion et fissuration',
            expanded: 'Corrosion externe ou fissuration du revêtement, en raison de dommages ou d’une défaillance, fissuration au niveau des soudures attribuable à des problèmes de contrainte ou de fabrication et corrosion interne due à la présence de contaminants dans les produits.',
            categoryName: '1',
          },
          {
            overview: 'Défaillance d’équipement',
            expanded: 'Défaillance d’une des composantes de l’équipement associées au pipeline comme, par exemple, les vannes, l’alimentation électrique ou les systèmes de contrôle.',
            categoryName: '3',
          },
          {
            overview: 'Erreur d’exploitation',
            expanded: 'En général, le personnel ne respecte pas les marches à suivre ou utilise l’équipement d’une manière non appropriée.',
            categoryName: '5',
          },
          {
            overview: 'Interférences extérieures',
            expanded: 'Activités extérieures à l’origine de dommages au pipeline ou à ses composantes comme, par exemple, des travaux d’excavation ou du vandalisme.',
            categoryName: '4',
          },
          {
            overview: 'Forces de la nature',
            expanded: 'Dommages pouvant être causés, par exemple, par un tremblement de terre, un glissement de terrain ou l’érosion.',
            categoryName: '6',
          },
          {
            overview: 'Autres causes',
            expanded: 'Toutes les autres causes ou lorsqu’il est impossible de déterminer les circonstances de l’incident.',
            categoryName: '14',
          }
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
          {overview:'Engineering and Planning', expanded:'Failures of assessment, planning or monitoring that may be related to inadequate specifications or design criteria, evaluation of change, or implementation of controls', categoryName: '7'},
          {overview:'Maintenance', expanded:'Inadequate preventive maintenance or repairs, and excessive wear and tear', categoryName: '12'},
          {overview:'Inadequate Procurement', expanded:'Failures in the purchasing, handling, transport and storage of materials', categoryName: '10'},
          {overview:'Tools and Equipment', expanded:'Tools and equipment that are inadequate for the task or used improperly', categoryName: '16'},
          {overview:'Standards and Procedures', expanded:'Inadequate development, communication, maintenance or monitoring of standards and procedures', categoryName: '15'},
          {overview:'Failure in communication', expanded:'Loss of communication with automatic devices, equipment or people', categoryName: '8'},
          {overview:'Inadequate Supervision', expanded:'Lack of oversight of a contractor or employee during construction or maintenance activities', categoryName: '11'},
          {overview:'Human Factors', expanded:'Individual conduct or capability, or physical and psychological factors', categoryName: '9'},
          {overview:'Natural or Environmental Forces', expanded:'External natural or environmental conditions', categoryName: '13'},
        ],
        fr: [
          {
            overview: 'Ingénierie et planification',
            expanded: 'Défaillances au niveau de l’évaluation, de la planification ou de la surveillance pouvant être en rapport avec le caractère non approprié des données techniques, des critères de conception, de l’évaluation de changements ou de la mise en œuvre de contrôles.',
            categoryName: '7',
          },
          {
            overview: 'Entretien',
            expanded: 'Entretien préventif inadéquat ou réparations mal effectuées ainsi qu’usure et détérioration excessives.',
            categoryName: '12',
          },
          {
            overview: 'Approvisionnement inadéquat',
            expanded: 'Problèmes au niveau des achats, de la manutention des matériaux, de leur transport ou de leur entreposage.',
            categoryName: '10',
          },
          {
            overview: 'Outils et équipement',
            expanded: 'Outils et équipement qui ne permettent pas d’accomplir la tâche voulue ou dont l’utilisation n’est pas appropriée.',
            categoryName: '16',
          },
          {
            overview: 'Normes et procédures',
            expanded: 'Élaboration, communication, mise à jour ou surveillance inadéquate des normes et procédures.',
            categoryName: '15',
          },
          {
            overview: 'Problème de communication',
            expanded: 'Perte de contact avec des dispositifs automatisés, de l’équipement ou des personnes.',
            categoryName: '8',
          },
          {
            overview: 'Supervision insuffisante',
            expanded: 'Manque de surveillance d’un entrepreneur ou d’un employé pendant les travaux, qu’ils soient de construction ou d’entretien.',
            categoryName: '11',
          },
          {
            overview: 'Facteurs humains',
            expanded: 'Facteurs liés à la conduite ou aux capacités d’une personne, qui peuvent par ailleurs être physiques ou psychologiques.',
            categoryName: '9',
          },
          {
            overview: 'Forces de la nature ou environnement',
            expanded: 'Conditions relatives à l’environnement ou au milieu naturel.',
            categoryName: '13',
          }
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
          {
            overview: 'Operation',
            expanded: 'Typical operation of the pipeline or facility',
            categoryName: '2',
          },
          {
            overview: 'Construction',
            expanded: 'The building of a pipeline or facility',
            categoryName: '1',
          },
          {
            overview: 'Maintenance',
            expanded: 'Work done to maintain the pipeline or facility',
            categoryName: '3',
          },
          {
            overview: 'Abandonment',
            expanded: 'The work required to abandon a pipeline or facility',
            categoryName: '4',
          }
        ],
        fr: [
          {
            overview: 'Fonctionnement',
            expanded: 'Exploitation normale du pipeline ou de l’installation.',
            categoryName: '2',
          },
          {
            overview: 'Construction',
            expanded: 'Construction du pipeline ou de l’installation.',
            categoryName: '1',
          },
          {
            overview: 'Entretien',
            expanded: 'Travaux effectués dans le cadre de l’entretien du pipeline ou de l’installation.',
            categoryName: '3',
          },
          {
            overview: 'Cessation d’exploitation',
            expanded: 'Travaux requis pour cesser l’exploitation du pipeline ou de l’installation.',
            categoryName: '4',
          }
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
        en: 'The type of equipment involved in the incident. Data available from 2015 to current.',
        fr: 'Type d’équipement qui est en cause dans l’incident. Données disponibles de 2015 à aujourd’hui.',
      },
      detail: {
        en: [
          {overview:'Compression station', expanded:null, categoryName: '52' },
          {overview:'Metering station', expanded:null, categoryName: '54' },
          {overview:'Pigging', expanded:null, categoryName: '55' },
          {overview:'Pipeline', expanded:null, categoryName: '43' },
          {overview:'Power generation', expanded:null, categoryName: '2342' },
          {overview:'Processing plant', expanded:null, categoryName: '46' },
          {overview:'Pumping station', expanded:null, categoryName: '51' },
          {overview:'Regulating facility', expanded:null, categoryName: '53' },
          {overview:'Storage facility', expanded:null, categoryName: '45' },
          {overview:'Vehicle/Mobile equipment', expanded:null, categoryName: '20179' },
        ],
        fr: [
          {
            overview: 'Station de compression',
            expanded: null,
            categoryName: '52',
          },
          {
            overview: 'Station de comptage',
            expanded: null,
            categoryName: '54',
          },
          {
            overview: 'Installation de raclage',
            expanded: null,
            categoryName: '55',
          },
          {
            overview: 'Pipeline',
            expanded: null,
            categoryName: '43',
          },
          {
            overview: 'Installation de production d’énergie',
            expanded: null,
            categoryName: '2342',
          },
          {
            overview: 'Usine de traitement',
            expanded: null,
            categoryName: '46',
          },
          {
            overview: 'Station de pompage',
            expanded: null,
            categoryName: '51',
          },
          {
            overview: 'Installation de régulation',
            expanded: null,
            categoryName: '53',
          },
          {
            overview: 'Installation de stockage',
            expanded: null,
            categoryName: '45',
          },
          {
            overview: 'Véhicule ou équipement mobile',
            expanded: null,
            categoryName: '20179',
          }
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
      en: 'REGION',
      fr: 'RÉGION',
    },
    substance: {
      en: 'SUBSTANCE',
      fr: 'SUBSTANCE',
    },
    releaseType: {
      en: 'RELEASE TYPE',
      fr: 'TYPE DE REJET',
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
      fr: 'VOLUME APPROX REJETÉ',
    },
    pipelineSystemComponentsInvolved: {
      en: 'SYS COMP INVOLVED',
      fr: 'COMPOSANTES EN CAUSE',
    },
    map: {
      en: 'MAP',
      fr: 'CARTE',
    }
  },




  shown: {
    en: 'incident(s) shown',
    fr: 'incident(s) affiché(s)',
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
    en: 'Show empty categories',
    fr: 'Montrer les catégories vides',
  },
  hideEmptyCategories: {
    en: 'Hide empty categories',
    fr: 'Cacher les catégories vides',
  },


  applicationPath: {
    en: '/pipeline-incidents/',
    fr: '/incidents-pipeliniers/',
  },


  mainHeading: {
    en: 'Incidents At CER-Regulated Pipelines And Facilities',
    fr: 'Incidents impliquant des installations et des pipelines réglementés par la Régie'
  },

  mainSubheading: {
    en: 'The information presented here is based on CER data from 2008 to current for incidents reported under the Onshore Pipeline Regulations and the Processing Plant Regulations. New data is added quarterly. The last update was: ',
    fr: 'L’information présentée ici provient des données de la Régie de 2008 à aujourd’hui et vise les incidents signalés en application du Règlement de la Régie de l’énergie du Canada sur les pipelines terrestres et du Règlement sur les usines de traitement. De nouvelles données sont ajoutées tous les trimestres. Plus récente mise à jour : ',
  },

  dataCollectionSubheading: {
    en: ' on how data collection has evolved since the NEB (now the CER) was established in 1959.',
    fr: ' sur l’évolution des méthodes de collecte de données depuis la création de l’Office (maintenant la Régie) en 1959.'
  },

  incidentResponseSubheading: {
    en: ' the CER responds to incidents at the pipelines and facilities it regulates.',
    fr: ' la Régie intervient en cas d’incident lié à des installations ou à des pipelines soumis à sa réglementation.'
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
        en: 'Serious Injury (CER or TSB)',
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
        fr: 'Moins de 1 m³',
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




  shareEmail: {
    subject: {
      en: 'CER Pipeline Incidents Visualization',
      fr: "Visualisation des incidents pipeliniers de la Régie",
    },
    body: {
      en: "This Incidents at CER-Regulated Pipeline and Facilities interactive online tool is part of the Canada Energy Regulator’s (CER) Data Visualization Initiative (DVI). The DVI is a three-year initiative to transform how the CER structures and shares data. The objective is to enable evidence-based decision making and remove barriers to understanding Canada’s energy and pipeline systems through the use of user-friendly interactive visualizations. This visualization is based on CER data from 2008 to current for incidents reported under the Onshore Pipeline Regulations and the Processing Plant Regulation.",
      fr: "L’outil interactif « Incidents impliquant des installations et des pipelines réglementés » fait partie de l’initiative de visualisation des données de la Régie de l’énergie du Canada. Échelonnée sur trois ans, cette initiative vise à transformer la manière dont la Régie structure et diffuse ses données. Elle a pour objectif de favoriser un processus décisionnel fondé sur la preuve et de faciliter la compréhension des questions liées aux réseaux énergétiques et pipeliniers du Canada, grâce à un outil de visualisation interactif, facile à utiliser. L’outil présente les données recueillies par la Régie de 2008 à aujourd’hui en ce qui concerne les incidents signalés en application du Règlement de l’Office national de l’énergie sur les pipelines terrestres et du Règlement sur les usines de traitement.",
    },
  },

  downloadable: {
    csv: {
      en: 'https://www.cer-rec.gc.ca/open/incident/pipeline-incidents-data.csv',
      fr: ' https://www.cer-rec.gc.ca/ouvert/incident/donnees-incidents-pipelines.csv',
    }
  },


  loadingOverlayTitle: {
    en: 'loading visualization',
    fr: 'visualisation en chargement',
  },

  socialBar: {
    downloadButton: {
      en:'download data file',
      fr: 'télécharger le fichier de données'
    }
  }

})

export default TranslationTable
