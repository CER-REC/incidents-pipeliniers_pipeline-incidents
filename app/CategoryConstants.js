const Immutable = require('immutable')

const CategoryConstants = Immutable.fromJS({

  // The data loader uses these category names while parsing the data CSV
  // It's important for the spelling of the column heading to match exactly.
  // internal identifier: column heading

  // Some columns do not have fixed categories, so they don't appear here
  // including: year, company
  // NB also: map has no categories at all


  dataLoaderCategoryNames: {
    incidentTypes: {
      release: 'Release of Substance',
      environmentalEffects: 'Adverse Environmental Effects',
      fatality: 'Fatality',
      fire: 'Fire',
      seriousInjury: 'Serious Injury (NEB or TSB)',
      obdl: 'Operation Beyond Design Limits',
      explosion: 'Explosion',
    },
    status: {
      closed: 'Closed',
      submitted: 'Submitted',
      initiallySubmitted: 'Initially Submitted',
    },
    province: {
      AB: 'Alberta',
      BC: 'British Columbia',
      MB: 'Manitoba',
      NB: 'New Brunswick',
      NL: 'Newfoundland and Labrador',
      NT: 'Northwest Territories',
      NS: 'Nova Scotia',
      NU: 'Nunavut',
      ON: 'Ontario',
      PE: 'Prince Edward Island',
      QC: 'Quebec',
      SK: 'Saskatchewan',
      YT: 'Yukon',
    },
    substance: {
      notApplicable: 'Not Applicable',
      amine: 'Amine',
      butane: 'Butane',
      condensate: 'Condensate',
      contaminatedWater: 'Contaminated Water',
      crudeOilSour: 'Crude Oil - Sour',
      crudeOilSweet: 'Crude Oil - Sweet',
      crudeOilSynthetic: 'Crude Oil - Synthetic',
      dieselFuel: 'Diesel Fuel',
      drillingFluid: 'Drilling Fluid',
      fuelGas: 'Fuel Gas',
      gasoline: 'Gasoline',
      glycol: 'Glycol',
      hydrogenSulphide: 'Hydrogen Sulphide',
      jetFuel: 'Jet Fuel',
      lubeOil: 'Lube Oil',
      mixedHydrocarbons: 'Mixed HVP Hydrocarbons',
      naturalGasSour: 'Natural Gas - Sour',
      naturalGasSweet: 'Natural Gas - Sweet',
      naturalGasLiquids: 'Natural Gas Liquids',
      odourant: 'Odourant',
      potassiumCarbonate: 'Potassium Carbonate',
      potassiumHydroxide: 'Potassium Hydroxide (caustic solution)',
      producedWater: 'Produced Water',
      propane: 'Propane',
      pulpSlurry: 'Pulp slurry',
      sulphur: 'Sulphur',
      sulphurDioxide: 'Sulphur Dioxide',
      wasteOil: 'Waste Oil',
      water: 'Water',
    },
    releaseType: {
      gas: 'Gas',
      liquid: 'Liquid',
      miscellaneous: 'Miscellaneous',
      notApplicable: 'Not Applicable',
    },
    whatHappened: {
      internalCorrosion: 'Internal Corrosion',
      equipmentFailure: 'Equipment Failure',
      materialDefect: 'Material Defect',
      incorrectOperation: 'Incorrect Operation',
      cracking: 'Cracking ',
      operatingConditions: 'Operating Conditions',
      externalInterference: 'External Interference',
      naturalForceDamage: 'Natural Force Damage',
      materialDegradation : 'Material Degradation ',
      externalCorrosion : 'External Corrosion ',
      tbd: 'To be determined',
      otherCauses: 'Other Causes',
    },
    whyItHappened: {
      maintenance: 'Maintenance',
      standardsAndProcedures: 'Standards and Procedures',
      engineeringAndPlanning: 'Engineering and Planning',
      individualFactors: 'Individual Factors',
      leadershipAndCommunication: 'Leadership and Communication',
      toolsAndEquipment: 'Tools and Equipment',
      tbd: 'To be determined',
      naturalForces: 'Natural or Environmental Forces',
      purchasing: 'Purchasing',
    },
    pipelinePhase: {
      construction: 'Construction',
      operation: 'Operation',
      maintenance: 'Maintenance',
      abandonment: 'Abandonment',
    },
    substanceCategory: {
      lowVapourPressureProduct: 'Low Vapour Pressure Product',
      highVapourPressureProduct: 'High Vapour Pressure Product',
      miscellaneous: 'Miscellaneous',
      notApplicable: 'Not Applicable',
      commodity: 'Commodity',
    },
    pipelineSystemComponentsInvolved: {
      pipeline: 'Pipeline',
      processingPlant: 'Processing Plant',
      compressionStation: 'Compression Station',
      meteringStation: 'Metering Station',
      pigging: 'Pigging',
      pumpingStation: 'Pumping Station',
      powerGeneration: 'Power Generation',
      regulatingFacility: 'Regulating Facility',
      storageFacility: 'Storage Facility',
      vehicleMobileEquipment: 'Vehicle/Mobile Equipment',
    },
    'volumeCategory': {
      notApplicable: 'Not Applicable',
      notProvided: 'Not Provided',
      lessThanOne: 'Less Than 1 m³',
      lessThanOneThousand: '1 m³ to 1,000 m³',
      lessThanOneMillion: '1,000 m³ to 1,000,000 m³',
      moreThanOneMillion: 'More than 1,000,000 m³',
    },
  },




})

module.exports = CategoryConstants