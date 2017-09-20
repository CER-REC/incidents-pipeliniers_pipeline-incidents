const Immutable = require('immutable')

const CategoryConstants = Immutable.fromJS({

  // The data loader uses these category names while parsing the data CSV
  // It's important for the spelling of the column heading to match exactly.
  // column heading: internal identifier

  // Some columns do not have fixed categories, so they don't appear here
  // including: year, company
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
      'Calcium Carbonate': 'calciumCarbonate',
      'Casing Cement': 'casingCement',
      'Chlorodifluoromethane': 'chlorodifluoromethane',
      'Contaminated Water': 'contaminatedWater',
      'Corrosion Inhibitor': 'corrosionInhibitor',
      'Drilling Fluid': 'drillingFluid',
      'Drip Oil': 'dripOil',
      'Glycol': 'glycol',
      'Grey Water (Sewage)': 'greyWater',
      'Hydraulic Fluid': 'hydraulicFluid',
      'Hydrogen Sulphide': 'hydrogenSulphide',
      'Lube Oil': 'lubeOil',
      'Methanol': 'methanol',
      'Methyl Tert-butyl Ether': 'methylTertButylEther',
      'Morphysorb': 'morphysorb',
      'Oil Well Effluent': 'oilWellEffluent',
      'Polychlorinated Biphenyls': 'polychlorinatedBiphenyls',
      'Potassium Carbonate': 'potassiumCarbonate',
      'Potassium Hydroxide (caustic solution)': 'potassiumHydroxide',
      'Produced Water': 'producedWater',
      'Sulphur Dioxide': 'sulphurDioxide',
      'Toluene': 'toluene',
      'Waste Oil': 'wasteOil',
      'Water': 'water',
      'Butane': 'butane',
      'Mixed HVP Hydrocarbons': 'mixedHydrocarbons',
      'Natural Gas Liquids': 'naturalGasLiquids',
      'Propane': 'propane',
      'Condensate': 'condensate',
      'Crude Oil - Sour': 'crudeOilSour',
      'Crude Oil - Sweet': 'crudeOilSweet',
      'Crude Oil - Synthetic': 'crudeOilSynthetic',
      'Diesel Fuel': 'dieselFuel',
      'Gasoline': 'gasoline',
      'Iso-octane': 'isoOctane',
      'Jet Fuel': 'jetFuel',
      'Carbon Dioxide': 'carbonDioxide',
      'Sulphur': 'sulphur',
      'Fuel Gas': 'fuelGas',
      'Natural Gas - Sweet': 'naturalGasSweet',
      'Natural Gas - Sour': 'naturalGasSour',
      'Odourant': 'odourant',
      'Pulp slurry': 'pulpSlurry',
    },
    releaseType: {
      'Gas': 'gas',
      'Liquid': 'liquid',
      'Miscellaneous': 'miscellaneous',
      'Not Applicable': 'notApplicable',
    },
    whatHappened: {
      'Defect & Deterioration': 'defectDeterioration',
      'Corrosion & Cracking': 'corrosionCracking',
      'Equipment Failure': 'equipmentFailure',
      'Incorrect Operation': 'incorrectOperation',
      'External Interference': 'externalInterference',
      'Natural Force Damage': 'naturalForceDamage',
      'Other Causes': 'otherCauses',
      'To be determined': 'tbd',
    },
    whyItHappened: {
      'Engineering and Planning': 'engineeringAndPlanning',
      'Maintenance': 'maintenance',
      'Inadequate Procurement': 'inadequateProcurement',
      'Tools and Equipment': 'toolsAndEquipment',
      'Standards and Procedures': 'standardsAndProcedures',
      'Failure in communication': 'failureInCommunication',
      'Inadequate Supervision': 'inadequateSupervision',
      'Human Factors': 'humanFactors',
      'Natural or Environmental Forces': 'naturalOrEnvironmentalForces',
      'To be determined': 'tbd',
    },
    pipelinePhase: {
      'Construction': 'construction',
      'Operation': 'operation',
      'Maintenance': 'maintenance',
      'Abandonment': 'abandonment',
    },
    // substanceCategory: {
    //   'Low Vapour Pressure Product': 'lowVapourPressureProduct',
    //   'High Vapour Pressure Product': 'highVapourPressureProduct',
    //   'Miscellaneous': 'miscellaneous',
    //   'Not Applicable': 'notApplicable',
    //   'Commodity': 'commodity',
    // },
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