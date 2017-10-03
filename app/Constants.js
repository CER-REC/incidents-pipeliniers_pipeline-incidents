//CONSTANTS
const Immutable = require('immutable')

const Constants = Immutable.fromJS({

  // Data mode controls how the application loads up its data. Values are:
  //   'dataService': initialize the data and schema from REST requests
  //   'csvFile': initialize the data and schema from a flat CSV file
  // See: DataLoader.js, data/CategorySchema.json
  // TODO: might be good to make this a .env file option, or a URL param,
  // rather than hard coding it
  dataMode: 'csvFile',

  workspace: {
    maxWidth: 1138,
    heightToWidthRatio: 0.66,
    emptyCategoryOffsetRatio: 0.06,
  },

  // All in px
  leftOuterMargin: 5,
  topOuterMargin: 5,
  bottomOuterMargin: 17,
  showHideTopMargin: 100,
  showHideLeftMargin: 5,

  topBar: {
    headerIconWidth: 18,
    headerIconHeight: 20,
    width: 860,
    height: 100,
    xHeading: 35,
    yHeading: 18,
    xSubpop: 35,
    ySubpop: 38,
    headingFontSize: 22,
    subheadingFontSize: 12,
    headingLineHeight: 1.5, // e.g., 0.5x the font size in padding, on top
    topBarBottomMargin: 5,
    methodologyIconY: 25,
  },

  showHideEmptyCategories: {
    xShowImage: 10,
    yShowImage: 8,
    xShowText: 20,
    showHideIconHeight: 11,
    showHideIconWidth: 11,
    fontSize: 12,
    checkboxPadding: 2,
    checkboxWidth: 1,
    dividerLineLength: 124,
    dividerLinePadding: -17,
    checkboxStrokePadding: 1, 
  },

  //incident list
  pinColumn: {
    horizontalMargins: 11, // both left and right
    width: 155,
    pinIconSize: 25,
    textWidth: 79,
    connectorDotSize: 6,
    connectorLength: 5,
    labelIconSize: 15,
    labelPadding: 15,
    labelIconPadding: -7,
    columnHeightPadding: 25,
    chevron90Rotation: 90,
    chevron270Rotation:270,
    hideIncidentListX: 10,
    hideIncidentListY: 5,
    showIncidentListXY: -2,
  },

  columnWideWidth: 62,
  columnNarrowWidth: 24,
  minimumColumnPathWidth: 90,

  columnHeadingHeight: 47,
  columnHeadingLineOffset: 15,
  columnSubheadingHeight: 10,
  columnSubheadingOffset: 40,


  dragArrow: {
    width: 24,
    height: 10,
    topMargin: 7,
  },

  headerBar: {
    height: 47,
  },

  socialBar: {
    width: 23, 
    height: 148,
    iconSize: 16,
    leftMargin: 5,
    iconSideMargin: 3.5,
    emailIconPadding: 3,
    facebookIconPadding: 26,
    linkedinIconPadding: 49,
    twitterIconPadding: 72,
    dividerLine: 95,
    downloadImageIconPadding: 105,
    downloadIconPadding: 128,
  },


  maxColumnsWithoutScroll: 5,

  // i.e. ordinary columns, excludes the map column
  maxColumnsWithoutScrollWithMap: -1,

  columnNames: [
    'incidentTypes',
    'year',
    'company',
    'status',
    'province',
    'substance',
    'releaseType',
    'whatHappened',
    'whyItHappened',
    'pipelinePhase',
    'volumeCategory',
    'pipelineSystemComponentsInvolved',
    'map',
  ],

  defaultColumns: [
    'province',
    'incidentTypes',
  ],

  sidebar: {
    columWidth: 105,
    columnOffset: 10,

    verticalStackingOffset: 2,
    horizontalStackingOffset: 10,

    labelHorizontalOffset: 7,
    labelHeight: 35,

    columnHoverOffset: -3,

    maxLineLength: 15,

    dropShadowX: 1,
    dropShadowY: 2,

  },

  sidebarMapColumn: {
    heightPadding: 25,
    widthPadding: 6,
    xPadding: 3,
    yPadding: 25,
  },

  columnPaths: {
    defaultColumn: '#ccc',
    columnHovered: '#666666',
    notColumnHovered: '#e6e6e6',

  },

  filterbox: {
    labelOffset: 4,

    filterButtonWidth: 66,
    filterButtonWidthFr: 100,
    filterButtonHeight: 13.5,

    iconSize: 7,

    filterBoxOffset: 13.25,

    iconTextOffset: 3,
    iconHorizontalOffset: 3,

    filterIconVerticalOffset: 3,

    dragButtonWidth: 10,

    dragIconWidth: 6.5,
    dragIconHorizontalOffset: 1.75,

    textHeight: 7,
    textWidth: 40,
    textVerticalOffset: 9.5,

    rectVerticalOffset: 13.5,

  },

  columnBaseColors: {
    'incidentTypes': {
      start: '#1A548E',
      middle: '#E66CE2',
      end: '#FFAEAB',
    },
    'year': {
      start: '#E42236',
      middle: '#E6A761',
      end: '#FFFFA9',
    },
    'company': {
      start: '#4E2F2C',
      middle: '#E6C56A',
      end: '#FBFFAB',
    },
    'status': {
      start: '#194613',
      middle: '#86D0E6',
      end: '#D4EFFF',
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
      start: '#DF0070',
      middle: '#E66F45',
      end: '#FCFF96',
    },
    'whatHappened': {
      start: '#55A2E7',
      middle: '#D69BE7',
      end: '#FFE0E7',
    },
    'whyItHappened': {
      start: '#F56A39',
      middle: '#E6E06C',
      end: '#ABFFAC',
    },
    'pipelinePhase': {
      start: '#84B551',
      middle: '#7CE6DF',
      end: '#C7E9FF',
    },
    'volumeCategory': { 
      start: '#64347F',
      middle: '#E6A1C9',
      end: '#FFF9E6',
    },
    'pipelineSystemComponentsInvolved': {
      start: '#29836F',
      middle: '#73ADE6',
      end: '#E6E0FF',
    },
  },

  emptyCategoryHeight: 20, // px
  
  map: {
    widthHeightRatio: 500 / 450,
    // widthHeightRatio: 510 / 375,
    // widthHeightRatio: 410 / 375,
    
    // NB: Must match dimensions of canada.svg
    coordinateSpace: {
      width: 500,
      height: 450,
    },

    // TODO: colours should maybe be their own segment of constants?
    backgroundColour: 'rgb(255, 255, 255)',
    shadowColour: '#333',
    lightGrey: 'rgba(102, 102, 102, 0.4)',
    lightGreyBlank: 'rgba(102, 102, 102, 0.0)',
    deselectedLightGrey: 'rgba(207, 207, 207, 0.4)',
    deselectedLightGreyBlank: 'rgba(207, 207, 207, 0.0)',
    selectedLightGrey: 'rgb(48, 48, 48)',

    smallIncidentRadius: 3,
    largeIncidentRadius: 5,
    incidentDotCountSizeCutoff: 100,
    padding: 10,
    bundleOffsetDistance: 25,
    radialControlPointDistance: 150,

  },


  categoryLabelOffset: 4,
  singleLineCategoryLabelHeight: 15,
  doubleLineCategoryLabelHeight: 30,
  tripleLineCategoryLabelHeight: 45,
  maxCategoryLabelLines: 3,
  categoryLabelTerminatingDots: 3,
  categoryLabelLineLength: 14,
  categoryDefaultOpacity: 1,
  categoryFadeOpacity: 0.4,
  categoryStrokeWidth: 1,
  categoryDefaultStrokeColour: '#ffffff',
  categoryHoverStrokeColour: '#000000',



  selectedIncidentPath: {
    controlPointOffset: 30,
    colourBetweenColumns: '#1A1A1A',
    columnBarColour: '#FFF',
    columnBarOpacity: 0.75,
    strokeWidth: '2px',
    hoveredStrokeWidth: '3px',
  },

  columnTypes: {
    SIDEBAR: 'SIDEBAR',
    WORKSPACE: 'WORKSPACE'
  },

  pathCurveControlFactor: 2.5,

  nearBlack: '#333333',
  darkGrey: '#666',

  emptyCategoryLabelFudgeFactor: 8,

  incidentList: {
    // Begin scrolling the list when we have 4 or more incidents
    maxIncidentsWithoutScroll: 3,
    
    // NB: this is an approximate height based on manually measuring the DOM
    // element. Since we're using HTML, we can't compute the height in advance,
    // but we could possibly measure the elements instead of assuming the
    // height.
    listItemHeight: 90,

    dividerLineWidth: 1,
    dividerLineVerticalMargin: 10, // top and bottom each

  },


  // This is the order we are to use for display of provinces.
  // It's not clear where exactly this order comes from, my guess is that it is
  // the result of an Object.keys() call on a provinces category object 
  // somewhere, but we have been asked to preserve this order going forward!

  provinceOrder: {
    dataService: [
      '7', '10', '4', '5', '3', '6', '9', '13', '1', '8', '12', '2', '11'
    ],
    csvFile: [
      'NS','PE','NB','NL','MB','NT','ON','YT','AB','NU','SK','BC','QC'
    ],
  },

})


module.exports = Constants

