const Immutable = require('immutable')

const TranslationTable = Immutable.fromJS({ 

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
    },
  },

  columnHeadings: {
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
    en: 'See empty categories',
    fr: 'Voir les catégories vides',
  },
  hideEmptyCategories: {
    en: 'Hide empty categories',
    fr: 'Cacher les catégories vides',
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
    en: 'Incidents at NEB-regulated pipelines and facilities',
    fr: 'Incidents impliquant des installations et des pipelines réglementés par l’Office'
  },

  mainSubheading: {
    en: 'The information presented here is based on NEB data from 2008 to current for incidents reported under the Onshore Pipeline Regulations  and the Processing Plant Regulations. New data is added on a quaterly basis.',
    fr: 'L’information présentée ici provient des données de l’Office de 2008 à aujourd’hui et vise les incidents signalés en application du  Règlement de l’Office national de l’énergie sur les pipelines terrestres et du Règlement sur les usines de traitement. De nouvelles données sont ajoutées tous les trois mois.',
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
    en: 'Hide incident list',
    fr: 'Cacher la liste des incidents',
  },

  showIncidentList: {
    en: 'Show incident list',
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
    fr: '<TODO>',
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