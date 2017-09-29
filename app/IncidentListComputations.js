const MemoizeImmutable = require('memoize-immutable')
// const Immutable = require('immutable')

const Constants = require('./Constants.js')
const WorkspaceComputations = require('./WorkspaceComputations.js')


const IncidentListComputations = {

  dividerHeight(pinnedIncidents) {
    if (pinnedIncidents.count() === 0) {
      return 0
    }

    return Constants.getIn(['incidentList', 'dividerLineVerticalMargin']) * 2 + Constants.getIn(['incidentList', 'dividerLineWidth'])
  },


  // NB: in the UI, we now call pinned incidents 'starred incidents'
  starredIncidentListHeight(pinnedIncidents) {
    if (pinnedIncidents.count() <= Constants.getIn(['incidentList', 'maxIndidentsWithoutScroll'])) {
      return Constants.getIn(['incidentList', 'listItemHeight']) *
        pinnedIncidents.count()
    }
    else {
      return Constants.getIn(['incidentList', 'listItemHeight']) *
        Constants.getIn(['incidentList', 'maxIndidentsWithoutScroll'])
    }
  },



  incidentListHeight(showEmptyCategories, viewport, data, columns, categories, pinnedIncidents) {
    const dividerHeight = IncidentListComputations.dividerHeight(pinnedIncidents)
    const starredIncidentListHeight = IncidentListComputations.starredIncidentListHeight(pinnedIncidents)

    const pinColumnPositions = WorkspaceComputations.horizontalPositions(
      showEmptyCategories, 
      viewport, 
      data, 
      columns, 
      categories
    ).get('pinColumn')

    return pinColumnPositions.get('height') - dividerHeight - starredIncidentListHeight
  },




}










const MemoizedComputations = {}

for (const name of Object.keys(IncidentListComputations)) {
  MemoizedComputations[name] = MemoizeImmutable(IncidentListComputations[name])
}

module.exports = MemoizedComputations