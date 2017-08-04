const Immutable = require('immutable')

const Constants = Immutable.fromJS({

  workspace: {
    maxWidth: 1138,
    heightToWidthRatio: 0.66,
    emptyCategoryOffsetRatio: 0.06,
  },

  // All in px
  leftOuterMargin: 5,
  topOuterMargin: 5,
  bottomOuterMargin: 5,

  topBar: {
    homeIconWidth: 18,
    homeIconHeight: 20,
    
    headingFontSize: 22,
    subheadingFontSize: 12,
    headingLineHeight: 1.5, // e.g., 0.5x the font size in padding, on top

    topBarBottomMargin: 5,

  },

  pinColumn: {
    horizontalMargins: 11, // both left and right
    width: 96,
    pinIconSize: 17,
    textWidth: 79,
    connectorDotSize: 6,
    connectorLength: 5,
  },

  columnWideWidth: 62,
  columnNarrowWidth: 24,
  minimumColumnPathWidth: 80,

  socialBar: {
    width: 23, 
    height: 115,
    iconSize: 16,
    leftMargin: 5,
  },


  maxColumnsWithoutScroll: 4,

  columnNames: [
    'incidentTypes',
    'reportedDate',
    'company',
    'status',
    'province',
    'substance',
    'releaseType',
    'whatHappened',
    'whyItHappened',
    'pipelinePhase',
    'approximateVolumeReleased',
    'substanceCategory',
    'pipelineSystemComponentsInvolved',
    'map',
  ],

  sidebar: {
    columWidth: 70,
    columnOffset: 10,
  },


  // Some columns do not have fixed categories, so they don't appear here
  // including: reportedDate, company
  // NB also: map has no categories at all

  // TODO: validate more of these against the source data... 
  categoryNames: {
    incidentTypes: [
      'Release of Substance',
      'Adverse Environmental Effects',
      'Fatality',
      'Fire',
      'Serious Injury (NEB or TSB)',
      'Operation Beyond Design Limits',
      'Explosion',
    ],
    status: [
      'Initially Submitted',
      'Submitted',
      'Closed',
    ],
    province: [
      'British Columbia',
      'Alberta',
      'Saskatchewan',
      'Manitoba',
      'Ontario',
      'Quebec',
      'New Brunswick',
      'Nova Scotia',
      'Newfoundland and Labrador',
      'Prince Edward Island',
      'Yukon',
      'Northwest Territories',
      'Nunavut',
    ],
    substance: [
      'Not Applicable',
      'Amine',
      'Butane',
      'Condensate',
      'Contaminated Water',
      'Crude Oil – Sour',
      'Crude Oil – Sweet',
      'Crude Oil – Synthetic',
      'Diesel Fuel',
      'Drilling Fluid',
      'Fuel Gas',
      'Gasoline',
      'Glycol',
      'Hydrogen Sulphide',
      'Jet Fuel',
      'Lube Oil',
      'Mixed HVP Hydrocarbons',
      'Natural Gas – Sour',
      'Natural Gas – Sweet',
      'Natural Gas Liquids',
      'Odourant',
      'Potassium Carbonate',
      'Potassium Hydroxide (caustic solution)',
      'Produced Water',
      'Propane',
      'Pulp Slurry',
      'Sulphur',
      'Sulphur Dioxide',
      'Waste Oil',
      'Water',
    ],
    releaseType: [
      'Gas',
      'Liquid',
      'Miscellaneous',
      'Not applicable',
    ],
    whatHappened: [
      'Internal Corrosion',
      'Equipment Failure',
      'Material Defect',
      'Incorrect Operation',
      'Cracking ',
      'Operating Conditions',
      'External Interference',
      'Natural Force Damage',
      'Material Degradation ',
      'External Corrosion ',
      'To be determined',
      'Other Causes',
    ],
    whyItHappened: [
      'Maintenance',
      'Standards and Procedures',
      'Engineering and Planning',
      'Individual Factors',
      'Leadership and Communication',
      'Tools and Equipment',
      'To be determined',
      'Natural or Environmental Forces',
      'Purchasing',
    ],
    pipelinePhase: [
      'Construction',
      'Operation',
      'Maintenance',
      'Abandonment',
    ],
    substanceCategory: [
      'Low Vapour Pressure Product',
      'High Vapour Pressure Product',
      'Miscellaneous',
      'Not Applicable',
      'Commodity',
    ],
    pipelineSystemComponentsInvolved: [
      'Pipeline',
      'Processing Plant',
      'Compression Station',
      'Metering Station',
      'Pigging',
      'Pumping Station',
      'Power Generation',
      'Regulating Facility',
      'Storage Facility',
      'Vehicle/Mobile Equipment',
    ],
    'approximateVolumeReleased': [
      'Not Applicable',
      'Not Provided',
      'Less Than 1 m³',
      '1 m³ to 1,000 m³',
      '1,000 m³ to 1,000,000 m³',
      'More than 1,000,000 m³',
    ],
  }


})


module.exports = Constants

