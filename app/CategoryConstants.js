const Immutable = require('immutable')

const CategoryConstants = Immutable.fromJS({

  // The data loader uses these category names while parsing the data CSV
  // It's important for the spelling of the column heading to match exactly.
  // column heading: internal identifier

  // Some columns do not have fixed categories, so they don't appear here
  // including: year, company, incident number
  // NB also: map has no categories at all


  dataLoaderCategoryNames: {
    incidentTypes: {
      'Release of Substance': 'release',
      'Adverse Environmental Effects': 'environmentalEffects',
      'Fatality': 'fatality',
      'Fire': 'fire',
      'Serious Injury (NEB or TSB)': 'seriousInjury',
      'Operation Beyond Design Limits': 'obdl',
      'Explosion': 'explosion',
    },
    status: {
      'Closed': 'closed',
      'Submitted': 'submitted',
      'Initially Submitted': 'initiallySubmitted',
    },
    province: {
      'Alberta': 'AB',
      'British Columbia': 'BC',
      'Manitoba': 'MB',
      'New Brunswick': 'NB',
      'Newfoundland and Labrador': 'NL',
      'Northwest Territories': 'NT',
      'Nova Scotia': 'NS',
      'Nunavut': 'NU',
      'Ontario': 'ON',
      'Prince Edward Island': 'PE',
      'Quebec': 'QC',
      'Saskatchewan': 'SK',
      'Yukon': 'YT',
    },
    substance: {
      'Not Applicable': 'notApplicable',
      'Amine': 'amine',
      'Butane': 'butane',
      'Condensate': 'condensate',
      'Contaminated Water': 'contaminatedWater',
      'Crude Oil - Sour': 'crudeOilSour',
      'Crude Oil - Sweet': 'crudeOilSweet',
      'Crude Oil - Synthetic': 'crudeOilSynthetic',
      'Diesel Fuel': 'dieselFuel',
      'Drilling Fluid': 'drillingFluid',
      'Fuel Gas': 'fuelGas',
      'Gasoline': 'gasoline',
      'Glycol': 'glycol',
      'Hydrogen Sulphide': 'hydrogenSulphide',
      'Jet Fuel': 'jetFuel',
      'Lube Oil': 'lubeOil',
      'Mixed HVP Hydrocarbons': 'mixedHydrocarbons',
      'Natural Gas - Sour': 'naturalGasSour',
      'Natural Gas - Sweet': 'naturalGasSweet',
      'Natural Gas Liquids': 'naturalGasLiquids',
      'Odourant': 'odourant',
      'Potassium Carbonate': 'potassiumCarbonate',
      'Potassium Hydroxide (caustic solution)': 'potassiumHydroxide',
      'Produced Water': 'producedWater',
      'Propane': 'propane',
      'Pulp slurry': 'pulpSlurry',
      'Sulphur': 'sulphur',
      'Sulphur Dioxide': 'sulphurDioxide',
      'Waste Oil': 'wasteOil',
      'Water': 'water',
    },
    releaseType: {
      'Gas': 'gas',
      'Liquid': 'liquid',
      'Miscellaneous': 'miscellaneous',
      'Not Applicable': 'notApplicable',
    },
    whatHappened: {
      'Internal Corrosion': 'internalCorrosion',
      'Equipment Failure': 'equipmentFailure',
      'Material Defect': 'materialDefect',
      'Incorrect Operation': 'incorrectOperation',
      'Cracking ': 'cracking',
      'Operating Conditions': 'operatingConditions',
      'External Interference': 'externalInterference',
      'Natural Force Damage': 'naturalForceDamage',
      'Material Degradation ': 'materialDegradation',
      'External Corrosion ': 'externalCorrosion',
      'To be determined': 'tbd',
      'Other Causes': 'otherCauses',
    },
    whyItHappened: {
      'Maintenance': 'maintenance',
      'Standards and Procedures': 'standardsAndProcedures',
      'Engineering and Planning': 'engineeringAndPlanning',
      'Individual Factors': 'individualFactors',
      'Leadership and Communication': 'leadershipAndCommunication',
      'Tools and Equipment': 'toolsAndEquipment',
      'To be determined': 'tbd',
      'Natural or Environmental Forces': 'naturalForces',
      'Purchasing': 'purchasing',
    },
    pipelinePhase: {
      'Construction': 'construction',
      'Operation': 'operation',
      'Maintenance': 'maintenance',
      'Abandonment': 'abandonment',
    },
    substanceCategory: {
      'Low Vapour Pressure Product': 'lowVapourPressureProduct',
      'High Vapour Pressure Product': 'highVapourPressureProduct',
      'Miscellaneous': 'miscellaneous',
      'Not Applicable': 'notApplicable',
      'Commodity': 'commodity',
    },
    pipelineSystemComponentsInvolved: {
      'Pipeline': 'pipeline',
      'Processing Plant': 'processingPlant',
      'Compression Station': 'compressionStation',
      'Metering Station': 'meteringStation',
      'Pigging': 'pigging',
      'Pumping Station': 'pumpingStation',
      'Power Generation': 'powerGeneration',
      'Regulating Facility': 'regulatingFacility',
      'Storage Facility': 'storageFacility',
      'Vehicle/Mobile Equipment': 'vehicleMobileEquipment',
    },
    'volumeCategory': {
      'Not Applicable': 'notApplicable',
      'Not Provided': 'notProvided',
      'Less Than 1 m³': 'lessThanOne',
      '1 m³ to 1,000 m³': 'lessThanOneThousand',
      '1,000 m³ to 1,000,000 m³': 'lessThanOneMillion',
      'More than 1,000,000 m³': 'moreThanOneMillion',
    },
  },




})

module.exports = CategoryConstants