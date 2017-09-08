const Immutable = require('immutable')

const TranslationTable = Immutable.fromJS({ 
  columnHeadings: {
    incidentTypes: {
      en: 'INCIDENT TYPE',
      fr: 'TODO',
    },
    year: {
      en: 'REPORTED DATE/YEAR',
      fr: 'TODO',
    },
    company: {
      en: 'COMPANY',
      fr: 'TODO',
    },
    status: {
      en: 'STATUS',
      fr: 'TODO',
    },
    province: {
      en: 'PROVINCES',
      fr: 'TODO',
    },
    substance: {
      en: 'SUBSTANCE',
      fr: 'TODO',
    },
    releaseType: {
      en: 'RELEASE TYPE',
      fr: 'TODO',
    },
    whatHappened: {
      en: 'WHAT HAPPENED',
      fr: 'TODO',
    },
    whyItHappened: {
      en: 'WHY IT HAPPENED',
      fr: 'TODO',
    },
    pipelinePhase: {
      en: 'PIPELINE PHASE',
      fr: 'TODO',
    },
    volumeCategory: {
      en: 'APPROX VOL RELEASED',
      fr: 'TODO',
    },
    substanceCategory: {
      en: 'SUBSTANCE CATEGORY',
      fr: 'TODO',
    },
    pipelineSystemComponentsInvolved: {
      en: 'SYS. COMP. INVOLVED',
      fr: 'TODO',
    },
    map: {
      en: 'MAP OVERVIEW',
      fr: 'TODO',
    }
  },

  shown: {
    en: 'shown',
    fr: 'TODO',
  },

  showOnly: {
    en: 'SHOW ONLY',
    fr: 'TODO',
  },
  hide: {
    en: 'HIDE ',
    fr: 'TODO',
  },
  reset: {
    en: 'RESET',
    fr: 'TODO',
  },


  seeEmptyCategories: {
    en: 'see empty categories',
    fr: 'TODO'
  },
  hideEmptyCategories: {
    en: 'hide empty categories',
    fr: 'TODO'
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
        fr: 'MorphysorbR',
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
      internalCorrosion: {
        en: 'Internal Corrosion',
        fr: 'TODO'
      },
      equipmentFailure: {
        en: 'Equipment Failure',
        fr: 'TODO'
      },
      materialDefect: {
        en: 'Material Defect',
        fr: 'TODO'
      },
      incorrectOperation: {
        en: 'Incorrect Operation',
        fr: 'TODO'
      },
      cracking: {
        en: 'Cracking ',
        fr: 'TODO'
      },
      operatingConditions: {
        en: 'Operating Conditions',
        fr: 'TODO'
      },
      externalInterference: {
        en: 'External Interference',
        fr: 'TODO'
      },
      naturalForceDamage: {
        en: 'Natural Force Damage',
        fr: 'TODO'
      },
      materialDegradation :{
        en:  'Material Degradation ',
        fr: 'TODO'
      },
      externalCorrosion :{
        en:  'External Corrosion ',
        fr: 'TODO'
      },
      tbd: {
        en: 'To be determined',
        fr: 'À déterminer'
      },
      otherCauses: {
        en: 'Other Causes',
        fr: 'TODO'
      },
    },
    whyItHappened: {
      maintenance: {
        en: 'Maintenance',
        fr: 'TODO'
      },
      standardsAndProcedures: {
        en: 'Standards and Procedures',
        fr: 'TODO'
      },
      engineeringAndPlanning: {
        en: 'Engineering and Planning',
        fr: 'TODO'
      },
      individualFactors: {
        en: 'Individual Factors',
        fr: 'TODO'
      },
      leadershipAndCommunication: {
        en: 'Leadership and Communication',
        fr: 'TODO'
      },
      toolsAndEquipment: {
        en: 'Tools and Equipment',
        fr: 'TODO'
      },
      tbd: {
        en: 'To be determined',
        fr: 'TODO'
      },
      naturalForces: {
        en: 'Natural or Environmental Forces',
        fr: 'TODO'
      },
      purchasing: {
        en: 'Purchasing',
        fr: 'TODO'
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
    substanceCategory: {
      lowVapourPressureProduct: {
        en: 'Low Vapour Pressure Product',
        fr: 'Produit à faible pression de vapeur'
      },
      highVapourPressureProduct: {
        en: 'High Vapour Pressure Product',
        fr: 'Produit à haute pression de vapeur'
      },
      miscellaneous: {
        en: 'Miscellaneous',
        fr: 'Diverses substances'
      },
      notApplicable: {
        en: 'Not Applicable',
        fr: 'Sans objet'
      },
      commodity: {
        en: 'Commodity',
        fr: 'Produit'
      },

      // NB: Unclear if used/needed
      naturalGas: {
        en: 'Natural Gas',
        fr: 'Gaz naturel',
      },
    },
    pipelineSystemComponentsInvolved: {
      pipeline: {
        en: 'Pipeline',
        fr: 'TODO'
      },
      processingPlant: {
        en: 'Processing Plant',
        fr: 'TODO'
      },
      compressionStation: {
        en: 'Compression Station',
        fr: 'TODO'
      },
      meteringStation: {
        en: 'Metering Station',
        fr: 'TODO'
      },
      pigging: {
        en: 'Pigging',
        fr: 'TODO'
      },
      pumpingStation: {
        en: 'Pumping Station',
        fr: 'TODO'
      },
      powerGeneration: {
        en: 'Power Generation',
        fr: 'TODO'
      },
      regulatingFacility: {
        en: 'Regulating Facility',
        fr: 'TODO'
      },
      storageFacility: {
        en: 'Storage Facility',
        fr: 'TODO'
      },
      vehicleMobileEquipment: {
        en: 'Vehicle/Mobile Equipment',
        fr: 'TODO'
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
        fr: 'TODO'
      },
      lessThanOneThousand: {
        en: '1 m³ to 1,000 m³',
        fr: 'TODO'
      },
      lessThanOneMillion: {
        en: '1,000 m³ to 1,000,000 m³',
        fr: 'TODO'
      },
      moreThanOneMillion: {
        en: 'More than 1,000,000 m³',
        fr: 'TODO'
      },
    },
  },










})

module.exports = TranslationTable