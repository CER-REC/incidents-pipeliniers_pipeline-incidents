import React from 'react'
import * as ReactRedux from 'react-redux'

import Constants from '../Constants.js'
import WorkspaceComputations from '../WorkspaceComputations.js'
import IncidentListComputations from '../IncidentListComputations.js'

class IncidentListDivider extends React.Component {

  containerStyle() {

    const pinColumnPositions = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories, 
      this.props.viewport, 
      this.props.data, 
      this.props.columns, 
      this.props.categories
    ).get('pinColumn')

    const incidentListHeight = IncidentListComputations.incidentListHeight(
      this.props.showEmptyCategories, 
      this.props.viewport, 
      this.props.data, 
      this.props.columns, 
      this.props.categories,
      this.props.pinnedIncidents
    )

    const topOffset = pinColumnPositions.get('y') + incidentListHeight

    return {
      position: 'absolute',
      top: topOffset, 
      width: `${Constants.getIn(['pinColumn', 'width']) + Constants.getIn(['pinColumn', 'horizontalMargins'])}px`,
    }
  }

  lineStyle() {
    return {
      marginTop: Constants.getIn(['incidentList', 'dividerLineVerticalMargin']),
      marginBottom: Constants.getIn(['incidentList', 'dividerLineVerticalMargin']),
      height: Constants.getIn(['incidentList', 'dividerLineWidth']),
      width: '100%',
      backgroundColor: Constants.get('darkGrey'),
    }
  }


  render() {
    // We only need the divider if both lists are on display
    if (this.props.pinnedIncidents.count() > 0 && 
      this.props.filterboxActivationState.get('columnName') !== null) {
      return <div style = { this.containerStyle() }>
        <div style = { this.lineStyle() } />
      </div>
    }
    else {
      return null
    }
  }

}



const mapStateToProps = state => {
  return {
    showEmptyCategories: state.showEmptyCategories,
    viewport: state.viewport,
    data: state.data,
    columns: state.columns,
    categories: state.categories,
    filterboxActivationState: state.filterboxActivationState,
    pinnedIncidents: state.pinnedIncidents,
  }
}


export default ReactRedux.connect(mapStateToProps)(IncidentListDivider)
