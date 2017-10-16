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

  storyBarID: 'storyBar',

  workspace: {
    maxWidth: 1138,
    heightToWidthRatio: 0.66,
    emptyCategoryOffsetRatio: 0.06,
    viewportPadding: 40,
    frenchStringPadding: 18,
  },

  storyThumbnailDimensions: {
    widthPercentage: 0.32,
    heightPercentage: 0.21,
    borderStroke: 1,
    titleBackgroundWidth: '100%',
    titleBackgroundHeight: '43%',
    titleBackgroundYOffset: 0.57,
    iconOffset: 50,

    windowYOffset: 25,
    windowShadowOffset: 10,
    windowCloseButtonSize: 30,
    windowCloseButtonOffset: 15,
  },

  stories: {
    firstRow: {
      leftStory: 'the-basics-of-incident-visualization',
      middleStory: 'getting-the-big-picture',
      rightStory: 'adding-columns-to-dig-deeper',
    },
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
    height: 150,
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
    columnHeightPadding: 5,
    chevron90Rotation: 90,
    chevron270Rotation:270,
    hideIncidentListX: 10,
    hideIncidentListY: 5,
    showIncidentListXY: -2,
    starredListPadding: 5,
    incidentListPadding: 6,
  },

  columnWideWidth: 62,
  columnNarrowWidth: 24,
  minimumColumnPathWidth: 90,

  columnHeadingHeight: 47,
  columnHeadingLineOffset: 15,
  columnHeadingHeightFr: 30, 
  columnSubheadingHeight: 10,
  columnSubheadingOffset: 45,
  columnSubheadingPaddingEn: 2,
  columnSubheadingPaddingFr: 3,


  dragArrow: {
    width: 24,
    height: 10,
    topMargin: 7,
  },

  headerBar: {
    // top and bottom spacing of 3px plus 23px for 4 icons
    height: 3 * 2 + 23 * 4,
    // 16px of height + 7px of vertical spacing between icons
    tellMeAStoryHeight: 3,
    aboutThisProjectHeight: 26,
    methodologyHeight: 49,
    resetAllHeight: 72,
    headerLabelFontSize: 13,
    headerLabelLeftOffset: -10,
  },

  socialBar: {
    width: 23, 
    height: 148,
    iconSize: 16,
    leftMargin: 5,
    iconSideMargin: 3.5,
    // 16px of height + 7px of vertical spacing between icons
    emailIconPadding: 3,
    facebookIconPadding: 26,
    linkedinIconPadding: 49,
    twitterIconPadding: 72,
    dividerLine: 95,
    downloadImageIconPadding: 105,
    downloadIconPadding: 128,
  },

  disclaimer: {
    windowMaxWidth: 700,
    windowMinWidth: 400,
    textMaxWidth: 635,
    textMinWidth: 335,
    disclaimerWorkspaceRatio: 0.75,
    closeButtonSize: 10,
    closeButtonRightMargin: 30,
    closeButtonTopMargin:10,
  },

  maxColumnsWithoutScroll: 5,

  // i.e. ordinary columns, excludes the map column
  maxColumnsWithoutScrollWithMap: -1,

  columnNames: [
    'status',
    'pipelinePhase',
    'incidentTypes',
    'year',
    'company',
    'province',
    'substance',
    'releaseType',
    'whatHappened',
    'whyItHappened',
    'volumeCategory',
    'pipelineSystemComponentsInvolved',
    'map',
  ],

  defaultColumns: [
    'province',
    'incidentTypes',
  ],

  sidebar: {
    columWidth: 90,
    columnOffset: 10,

    verticalStackingOffset: 2,
    horizontalStackingOffset: 10,

    labelHorizontalOffset: 7,
    labelHeight: 35,

    columnHoverOffset: -3,

    // There are precise reasons for these line lengths
    // 'What happened' wraps appropriately at 12 characters in English
    // 'Volume approx rejeté' wraps appropriately at 13 characters, in French
    maxLineLength: {
      en: 12,
      fr: 13,
    },

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
    lastColumnOpacity: 0.3,
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
    'incidentTypes': ['#1A548E', '#E66CE2', '#FFAEAB'],
    'year': ['#E42236', '#E6A761', '#FFFFA9'],
    'company': ['#4E2F2C', '#E6C56A', '#FBFFAB'],
    'status': ['#194613', '#86D0E6', '#D4EFFF'],
    'province': ['#870E4A', '#E6D65E', '#DCFF82'],
    'substance': ['#951379', '#E66364', '#FFE0A3', '#ec7014', '#7f3b08'],
    'releaseType': ['#DF0070', '#E66F45', '#FCFF96'],
    'whatHappened': ['#55A2E7', '#D69BE7', '#FFE0E7'],
    'whyItHappened': ['#F56A39', '#E6E06C', '#ABFFAC'],
    'pipelinePhase': ['#84B551', '#7CE6DF', '#C7E9FF'],
    'volumeCategory': ['#64347F', '#E6A1C9', '#FFF9E6'],
    'pipelineSystemComponentsInvolved': ['#29836F', '#73ADE6', '#E6E0FF'],
  },

  columnColourDomains: {
    'incidentTypes': [0, 0.5, 1],
    'year': [0, 0.5, 1],
    'company': [0, 0.5, 1],
    'status': [0, 0.5, 1],
    'province': [0, 0.5, 1],
    'substance': [0, 0.1, 0.2, 0.7, 1],
    'releaseType': [0, 0.5, 1],
    'whatHappened': [0, 0.5, 1],
    'whyItHappened': [0, 0.5, 1],
    'pipelinePhase': [0, 0.5, 1],
    'volumeCategory': [0, 0.5, 1],
    'pipelineSystemComponentsInvolved': [0, 0.5, 1],
  },

  emptyCategoryHeight: 20, // px
  
  map: {
    widthHeightRatio: 550 / 450,
    
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
  categorySelectionStrokeWidth: 2,
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

  screenshotPath: 'screenshot',

  screenshotHeight: 1000,

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

  questionMark: {
    pixelsPerCharacter: 7.4,
    xOffset: 5,
    size: 16,
  },

  columnTooltip: {
    width: 322,
    leftMargin: 10,
    titleTopMargin: 20,
    descriptionTopMargin: 35,

    separatorLineY: 42,
  },

  appHost: 'https://apps2.neb-one.gc.ca',

  // The purpose of the bottom margin is to allow some space for the filterbox
  // to drop below
  workspaceBottomMargin: 20,
 
})


module.exports = Constants

