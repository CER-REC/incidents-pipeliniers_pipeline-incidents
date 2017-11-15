const MemoizeImmutable = require('memoize-immutable')

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
    if (pinnedIncidents.count() <= Constants.getIn(['incidentList', 'maxIncidentsWithoutScroll'])) {
      return Constants.getIn(['incidentList', 'listItemHeight']) *
        pinnedIncidents.count()
    }
    else {
      return Constants.getIn(['incidentList', 'listItemHeight']) *
        Constants.getIn(['incidentList', 'maxIncidentsWithoutScroll'])
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

    return pinColumnPositions.get('height') - dividerHeight - starredIncidentListHeight - Constants.getIn(['pinColumn', 'columnHeightPadding'])
  },



  incidentListInnerContainer(showEmptyCategories, viewport, data, columns, categories) {
    let pinColumnPositions = WorkspaceComputations.horizontalPositions(
      showEmptyCategories,
      viewport,
      data,
      columns,
      categories
    ).get('pinColumn')

    pinColumnPositions = pinColumnPositions.get('y') + Constants.getIn(['pinColumn','columnHeightPadding'])

    return pinColumnPositions
  },



  incidentScrollPaneStyle(showEmptyCategories, viewport, data, columns, categories, pinnedIncidents) {
    let maxHeight = IncidentListComputations.incidentListHeight(
      showEmptyCategories, 
      viewport, 
      data, 
      columns, 
      categories, 
      pinnedIncidents) 
    let padding = Constants.getIn(['pinColumn','incidentListPadding'])
    if(pinnedIncidents.count() === 0){
      padding = Constants.getIn(['pinColumn','incidentListPaddingNoStarredItems'])
    } 
    maxHeight = maxHeight - (Constants.getIn(['pinColumn','columnHeightPadding']) * padding)


    return maxHeight
  },

  starredIncidentsInnerContainer(showEmptyCategories, viewport, data, columns, categories, pinnedIncidents) {
    // TODO: if the scrolling list replaces the pin column permanently, we
    // should rename this chunk of the horizontal positions ... 
    const pinColumnPositions = WorkspaceComputations.horizontalPositions(
      showEmptyCategories,
      viewport,
      data,
      columns,
      categories
    ).get('pinColumn')

    const incidentListHeight = IncidentListComputations.incidentListHeight(
      showEmptyCategories,
      viewport,
      data,
      columns,
      categories,
      pinnedIncidents)

    const dividerHeight = IncidentListComputations.dividerHeight(
      pinnedIncidents)

    const starredIncidentsInnerContainerTop = pinColumnPositions.get('y') + incidentListHeight + dividerHeight + Constants.getIn(['pinColumn','columnHeightPadding'])

    return starredIncidentsInnerContainerTop

  },

  starredIncidentScrollPaneStyle(pinnedIncidents) {
    let starredIncidentScrollPaneStyle = IncidentListComputations.starredIncidentListHeight(
      pinnedIncidents)

    starredIncidentScrollPaneStyle = starredIncidentScrollPaneStyle - (Constants.getIn(['pinColumn','columnHeightPadding']) * Constants.getIn(['pinColumn','starredListPadding']))

    return starredIncidentScrollPaneStyle
  },


}










const MemoizedComputations = {}

for (const name of Object.keys(IncidentListComputations)) {
  MemoizedComputations[name] = MemoizeImmutable(IncidentListComputations[name])
}

module.exports = MemoizedComputations