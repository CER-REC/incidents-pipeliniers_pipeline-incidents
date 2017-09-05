const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../WorkspaceComputations.js')
const IncidentPathComputations = require('../IncidentPathComputations.js')

//load IncidentPopover
const IncidentPopover = require('./IncidentPopover.jsx')

require('./IncidentBar.scss')

class IncidentBar extends React.Component {

  selectedIncident() {
    if ((this.props.selectedIncident) === null) {
      return null
    }
    else {
      return <IncidentPopover
        incident={this.props.selectedIncident}
        y={WorkspaceComputations.columnY()}/>
    }
  }

  pinnedAndSelectedIncidents() {
    let pinnedIncidents = this.props.pinnedIncidents
    if(this.props.pinnedIncidents.count() === 0) {
      return this.selectedIncident()
    }
    else if(this.props.selectedIncident !== null) {
      pinnedIncidents = this.props.pinnedIncidents
        .push(this.props.selectedIncident)
    }

    let index = 0
    const boxSize = this.pinnedIncidentBoxSize(pinnedIncidents.count())
    return pinnedIncidents.sort((a,b) => 
      this.incidentHeight(a) > this.incidentHeight(b))
      .map(incident => {
        const y = (boxSize * index) + WorkspaceComputations.columnY()
        index += 1
        return <IncidentPopover 
          key={incident.get('incidentNumber')} 
          incident={incident} 
          y={y}>
        </IncidentPopover>
      })
  }

  incidentHeight(incident) {
    // 1) Handle the case when the map is the first column. Ideally, one 
    // would want to assign the incident height based on the order of clicks
    // (or geographic distance if feeling too fancy), but this is up to the 
    // design team to decide. For now, all incidents will be assigned an 
    // equal height of zero.
    // 2) Handle the case when there are no columns in the workspace. In this 
    // case, all incidents will be assigned an equal height of zero.
    if(this.props.columns.count() ===0 ||
       this.props.columns.get(0) === 'map') return 0

    const categoryVerticalPositions = WorkspaceComputations.categoryVerticalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories,
      this.props.columns.get(0)
    )

    return IncidentPathComputations.incidentHeightsInColumn(
      incident,
      this.props.columns.get(0),
      this.props.data,
      this.props.columns,
      this.props.categories,
      this.props.showEmptyCategories,
      this.props.viewport,
      categoryVerticalPositions
    ).get(0)
  }

  pinnedIncidentBoxSize(incidentCount) {
    const availableHeight = WorkspaceComputations.baselineHeight(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data, 
      this.props.columns,
      this.props.categories) - 
    Constants.getIn(['showHideEmptyCategories', 'fontSize']) - 
    WorkspaceComputations.columnY()

    if(availableHeight/incidentCount < Constants.getIn(['incidentPopover', 'popupHeight'])) {
      return availableHeight / incidentCount
    }

    return Constants.getIn(['incidentPopover', 'popupHeight'])
  }

  render() {
    return <g>
      {this.pinnedAndSelectedIncidents()}
    </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    columns: state.columns,
    categories: state.categories,
    data: state.data,
    showEmptyCategories: state.showEmptyCategories,
    selectedIncident: state.selectedIncident,
    pinnedIncidents: state.pinnedIncidents
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(IncidentBar)