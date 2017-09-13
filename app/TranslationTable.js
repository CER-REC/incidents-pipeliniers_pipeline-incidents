const Immutable = require('immutable')

const TranslationTable = Immutable.fromJS({ 
  columnHeadings: {
    incidentTypes: {
      en:'INCIDENT TYPE',
      fr:'TODO',
    },
    year: {
      en:'REPORTED DATE/YEAR',
      fr:'TODO',
    },
    company: {
      en:'COMPANY',
      fr:'TODO',
    },
    status: {
      en:'STATUS',
      fr:'TODO',
    },
    province: {
      en:'PROVINCES',
      fr:'TODO',
    },
    substance: {
      en:'SUBSTANCE',
      fr:'TODO',
    },
    releaseType: {
      en:'RELEASE TYPE',
      fr:'TODO',
    },
    whatHappened: {
      en:'WHAT HAPPENED',
      fr:'TODO',
    },
    whyItHappened: {
      en:'WHY IT HAPPENED',
      fr:'TODO',
    },
    pipelinePhase: {
      en:'PIPELINE PHASE',
      fr:'TODO',
    },
    volumeCategory: {
      en:'APPROX VOL RELEASED',
      fr:'TODO',
    },
    substanceCategory: {
      en:'SUBSTANCE CATEGORY',
      fr:'TODO',
    },
    pipelineSystemComponentsInvolved: {
      en:'SYS. COMP. INVOLVED',
      fr:'TODO',
    },
    incidentNumber: {
      en:'INCIDENT NUMBER',
      fr:'TODO',
    },
    map: {
      en:'MAP OVERVIEW',
      fr:'TODO',
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



  categories: {
    incidentTypes: {
      release: {
        en: 'Release of Substance',
        fr: 'TODO'
      },
      environmentalEffects: {
        en: 'Adverse Environmental Effects',
        fr: 'TODO'
      },
      fatality: {
        en: 'Fatality',
        fr: 'TODO'
      },
      fire: {
        en: 'Fire',
        fr: 'TODO'
      },
      seriousInjury: {
        en: 'Serious Injury (NEB or TSB)',
        fr: 'TODO'
      },
      obdl: {
        en: 'Operation Beyond Design Limits',
        fr: 'TODO'
      },
      explosion: {
        en: 'Explosion',
        fr: 'TODO'
      },
    },
    status: {
      closed: {
        en: 'Closed',
        fr: 'TODO'
      },
      submitted: {
        en: 'Submitted',
        fr: 'TODO'
      },
      initiallySubmitted: {
        en: 'Initially Submitted',
        fr: 'TODO'
      },
    },
    province: {
      AB: {
        en: 'Alberta',
        fr: 'TODO'
      },
      BC: {
        en: 'British Columbia',
        fr: 'TODO'
      },
      MB: {
        en: 'Manitoba',
        fr: 'TODO'
      },
      NB: {
        en: 'New Brunswick',
        fr: 'TODO'
      },
      NL: {
        en: 'Newfoundland and Labrador',
        fr: 'TODO'
      },
      NT: {
        en: 'Northwest Territories',
        fr: 'TODO'
      },
      NS: {
        en: 'Nova Scotia',
        fr: 'TODO'
      },
      NU: {
        en: 'Nunavut',
        fr: 'TODO'
      },
      ON: {
        en: 'Ontario',
        fr: 'TODO'
      },
      PE: {
        en: 'Prince Edward Island',
        fr: 'TODO'
      },
      QC: {
        en: 'Quebec',
        fr: 'TODO'
      },
      SK: {
        en: 'Saskatchewan',
        fr: 'TODO'
      },
      YT: {
        en: 'Yukon',
        fr: 'TODO'
      },
    },
    substance: {
      notApplicable: {
        en: 'Not Applicable',
        fr: 'TODO'
      },
      amine: {
        en: 'Amine',
        fr: 'TODO'
      },
      butane: {
        en: 'Butane',
        fr: 'TODO'
      },
      condensate: {
        en: 'Condensate',
        fr: 'TODO'
      },
      contaminatedWater: {
        en: 'Contaminated Water',
        fr: 'TODO'
      },
      crudeOilSour: {
        en: 'Crude Oil - Sour',
        fr: 'TODO'
      },
      crudeOilSweet: {
        en: 'Crude Oil - Sweet',
        fr: 'TODO'
      },
      crudeOilSynthetic: {
        en: 'Crude Oil - Synthetic',
        fr: 'TODO'
      },
      dieselFuel: {
        en: 'Diesel Fuel',
        fr: 'TODO'
      },
      drillingFluid: {
        en: 'Drilling Fluid',
        fr: 'TODO'
      },
      fuelGas: {
        en: 'Fuel Gas',
        fr: 'TODO'
      },
      gasoline: {
        en: 'Gasoline',
        fr: 'TODO'
      },
      glycol: {
        en: 'Glycol',
        fr: 'TODO'
      },
      hydrogenSulphide: {
        en: 'Hydrogen Sulphide',
        fr: 'TODO'
      },
      jetFuel: {
        en: 'Jet Fuel',
        fr: 'TODO'
      },
      lubeOil: {
        en: 'Lube Oil',
        fr: 'TODO'
      },
      mixedHydrocarbons: {
        en: 'Mixed HVP Hydrocarbons',
        fr: 'TODO'
      },
      naturalGasSour: {
        en: 'Natural Gas - Sour',
        fr: 'TODO'
      },
      naturalGasSweet: {
        en: 'Natural Gas - Sweet',
        fr: 'TODO'
      },
      naturalGasLiquids: {
        en: 'Natural Gas Liquids',
        fr: 'TODO'
      },
      odourant: {
        en: 'Odourant',
        fr: 'TODO'
      },
      potassiumCarbonate: {
        en: 'Potassium Carbonate',
        fr: 'TODO'
      },
      potassiumHydroxide: {
        en: 'Potassium Hydroxide (caustic solution)',
        fr: 'TODO'
      },
      producedWater: {
        en: 'Produced Water',
        fr: 'TODO'
      },
      propane: {
        en: 'Propane',
        fr: 'TODO'
      },
      pulpSlurry: {
        en: 'Pulp slurry',
        fr: 'TODO'
      },
      sulphur: {
        en: 'Sulphur',
        fr: 'TODO'
      },
      sulphurDioxide: {
        en: 'Sulphur Dioxide',
        fr: 'TODO'
      },
      wasteOil: {
        en: 'Waste Oil',
        fr: 'TODO'
      },
      water: {
        en: 'Water',
        fr: 'TODO'
      },
    },
    releaseType: {
      gas: {
        en: 'Gas',
        fr: 'TODO'
      },
      liquid: {
        en: 'Liquid',
        fr: 'TODO'
      },
      miscellaneous: {
        en: 'Miscellaneous',
        fr: 'TODO'
      },
      notApplicable: {
        en: 'Not Applicable',
        fr: 'TODO'
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
        fr: 'TODO'
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
        fr: 'TODO'
      },
      operation: {
        en: 'Operation',
        fr: 'TODO'
      },
      maintenance: {
        en: 'Maintenance',
        fr: 'TODO'
      },
      abandonment: {
        en: 'Abandonment',
        fr: 'TODO'
      },
    },
    substanceCategory: {
      lowVapourPressureProduct: {
        en: 'Low Vapour Pressure Product',
        fr: 'TODO'
      },
      highVapourPressureProduct: {
        en: 'High Vapour Pressure Product',
        fr: 'TODO'
      },
      miscellaneous: {
        en: 'Miscellaneous',
        fr: 'TODO'
      },
      notApplicable: {
        en: 'Not Applicable',
        fr: 'TODO'
      },
      commodity: {
        en: 'Commodity',
        fr: 'TODO'
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
        fr: 'TODO'
      },
      notProvided: {
        en: 'Not Provided',
        fr: 'TODO'
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