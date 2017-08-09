const Immutable = require('immutable')

const Constants = Immutable.fromJS({

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

  socialBar: {
    width: 23, 
    height: 115,
    iconSize: 16,
    leftMargin: 5,
  },


  maxColumnsWithoutSroll: 4,

  columnNames: [
    'incidentType',
    'reportedDate',
    'company',
    'status',
    'province',
    'substance',
    'releaseType',
    'whatHappened',
    'whyItHappened',
    'pipelinePhase',
    'approxVolReleased',
    'substanceCategory',
    'systemComponentsInvolved',
    'map',
  ],

  sidebar: {
    columWidth: 70,
    columnOffset: 10,
  },

})


module.exports = Constants

