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
  bottomOuterMargin: 17,
  showHideTopMargin: 100,
  showHideLeftMargin: 5,

  topBar: {
    headerIconWidth: 18,
    headerIconHeight: 20,
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
    methodologyIconY: 25,
  },

  showHideEmptyCategories: {
    xShowImage: 10,
    yShowImage: 10,
    xShowText: 20,
    showHideIconHeight: 15,
    showHideIconWidth: 15,
    fontSize: 12,
  },

  pinColumn: {
    horizontalMargins: 11, // both left and right
    width: 132,
    pinIconSize: 25,
    textWidth: 79,
    connectorDotSize: 6,
    connectorLength: 5,
  },

  incidentPopover: {
    height: 65,
    width: 95,
    pinIconXY: -25,
    popoverX: 25,
    horizontalLineY: 155,
    showPopoverBodyY: 170,
    horizontalLineEnd: 120,
    lineHeightX: 145,
    showYLineY: 155,
    horizontalLineXStart: 151,
    dotRadius: 3,
    lineHeight: 16.2,
  },

  columnWideWidth: 62,
  columnNarrowWidth: 24,
  minimumColumnPathWidth: 80,

  columnHeadingHeight: 42,
  columnHeadingLineOffset: 15,
  columnSubheadingHeight: 10,
  columnSubheadingOffset: 40,

  dragArrow: {
    width: 24,
    height: 10,
    topMargin: 7,
  },

  socialBar: {
    width: 23, 
    height: 137,
    iconSize: 16,
    leftMargin: 5,
    iconSideMargin: 3.5,
    emailIconPadding: 3,
    facebookIconPadding: 26,
    linkedinIconPadding: 49,
    twitterIconPadding: 72,
    downloadIconPadding: 95,
    downloadImageIconPadding: 118,
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
    'substanceCategory',
    'pipelineSystemComponentsInvolved',
    'map',
  ],

  sidebar: {
    columWidth: 70,
    columnOffset: 10,

    verticalStackingOffset: 2,
    horizontalStackingOffset: 10,

    labelHorizontalOffset: 7,
    labelHeight: 35,

    columnHoverOffset: -3,
  },

  filterbox: {
    labelOffset: 3,

    filterButtonWidth: 56,
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
    'substanceCategory': {
      start: '#F8B51C',
      middle: '#78E690',
      end: '#A8EAFF',
    },
    'pipelineSystemComponentsInvolved': {
      start: '#29836F',
      middle: '#73ADE6',
      end: '#E6E0FF',
    },
  },

  emptyCategoryHeight: 20, // px
  
  map: {
    widthHeightRatio: 510 / 375,
    
    // NB: Must match dimensions of canada.svg
    coordinateSpace: {
      width: 800,
      height: 600,
    },

    // TODO: colours should maybe be their own segment of constants?
    backgroundColour: 'rgb(239, 236, 231)',
    incidentCircleColour: 'rgb(80, 113, 82)',
    selectedIncidentCircleColour: 'rgb(149, 183, 181)',
    shadowColour: '#333',
    lightGrey: 'rgba(102, 102, 102, 0.4)',
    deselectedLightGrey: 'rgba(207, 207, 207, 0.2)',
    selectedLightGrey: 'rgb(48, 48, 48)',

    incidentRadius: 5,
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


  selectedIncidentPath: {
    controlPointOffset: 30,
    colourBetweenColumns: '#1A1A1A',
    columnBarColour: '#FFF',
    columnBarOpacity: 0.75,
    strokeWidth: '2px'
  },

  columnTypes: {
    SIDEBAR: 'SIDEBAR',
    WORKSPACE: 'WORKSPACE'
  },



})


module.exports = Constants

