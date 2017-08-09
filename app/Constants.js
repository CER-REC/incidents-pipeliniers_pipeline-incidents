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
  showHideTopMargin: 100,
  showHideLeftMargin: 5,

  topBar: {
    homeIconWidth: 18,
    homeIconHeight: 20,
    width: 550,
    height: 100,
    xHeading: 35,
    yHeading: 18,
    xSubpop: 35,
    ySubpop: 38,
    headingFontSize: 22,
    subheadingFontSize: 12,
    headingLineHeight: 1.5, // e.g., 0.5x the font size in padding, on top
    topBarBottomMargin: 5,
  },

  showHideEmptyCategories: {
    xShowImage: 10,
    yShowImage: 997,
    xShowText: 35,
    yShowText: 1008,
    showHideIconHeight: 15,
    showHideIconWidth: 15,
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

  columnHeadingHeight: 42,
  columnHeadingLineOffset: 15,
  columnSubheadingOffset: 40,

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
    'volumeCategory',
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
      'Closed',
      'Submitted',
      'Initially Submitted',
    ],
    province: [
      'Alberta',
      'British Columbia',
      'Manitoba',
      'New Brunswick',
      'Newfoundland and Labrador',
      'Northwest Territories',
      'Nova Scotia',
      'Nunavut',
      'Ontario',
      'Prince Edward Island',
      'Quebec',
      'Saskatchewan',
      'Yukon',
    ],
    substance: [
      'Not Applicable',
      'Amine',
      'Butane',
      'Condensate',
      'Contaminated Water',
      'Crude Oil - Sour',
      'Crude Oil - Sweet',
      'Crude Oil - Synthetic',
      'Diesel Fuel',
      'Drilling Fluid',
      'Fuel Gas',
      'Gasoline',
      'Glycol',
      'Hydrogen Sulphide',
      'Jet Fuel',
      'Lube Oil',
      'Mixed HVP Hydrocarbons',
      'Natural Gas - Sour',
      'Natural Gas - Sweet',
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
      'Not Applicable',
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
    'volumeCategory': [
      'Not Applicable',
      'Not Provided',
      'Less Than 1 m³',
      '1 m³ to 1,000 m³',
      '1,000 m³ to 1,000,000 m³',
      'More than 1,000,000 m³',
    ],
  },

  columnBaseColors: {
    'incidentTypes': {
      start: '#1A548E',
      middle: '#E66CE2',
      end: '#FFAEAB',
    },
    'reportedDate': {
      start: '#D6106E',
      middle: '#E66F45',
      end: '#FCFF96',
    },
    'company': {
      start: '#4E2F2C',
      middle: '#E6C56A',
      end: '#FBFFAB',
    },
    'status': {
      start: '#29836F',
      middle: '#73ADE6',
      end: '#E6E0FF',
    },
    'province': {
      start: '#870E4A',
      middle: '#E6D65E',
      end: '#DCFF82',
    },
    'substance': {
      start: '#951379',
      middle: '#E66364',
      end: '#FFE0A3',
    },
    'releaseType': {
      start: '#63BCE3',
      middle: '#D69BE7',
      end: '#FFE0E7',
    },
    'whatHappened': {
      start: '#194613',
      middle: '#86D0E6',
      end: '#D4EFFF',
    },
    'whyItHappened': {
      start: '#F56A39',
      middle: '#E6E06C',
      end: '#ABFFAC',
    },
    'pipelinePhase': {
      start: '#F8B51C',
      middle: '#78E690',
      end: '#A8EAFF',
    },
    'volumeCategory': {
      start: '#64347F',
      middle: '#E6A1C9',
      end: '#FFF9E6',
    },
    'substanceCategory': {
      start: '#84B551',
      middle: '#7CE6DF',
      end: '#C7E9FF',
    },
    'pipelineSystemComponentsInvolved': {
      start: '#E42236',
      middle: '#E6A761',
      end: '#FFFFA9',
    },
  },


})


module.exports = Constants

