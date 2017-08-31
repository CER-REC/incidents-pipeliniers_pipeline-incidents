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

  incidentHeight(incident) {
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

  boxSize(incidentCount) {
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

  pinnedIncidents() {
    let pinnedIncidents = this.props.pinnedIncidents
    if(this.props.pinnedIncidents.count() === 0) {
      return this.selectedIncident()
    }
    else if(this.props.selectedIncident !== null) {
      pinnedIncidents = this.props.pinnedIncidents.push(this.props.selectedIncident)
    }

    let index = 0
    const boxSize = this.boxSize(pinnedIncidents.count())
    return pinnedIncidents.sort((a,b) => this.incidentHeight(a) > this.incidentHeight(b)).map(incident => {
      const y = (boxSize * index) + WorkspaceComputations.columnY()
      index += 1

      return <IncidentPopover key={incident.get('incidentNumber')} incident={incident} y={y}/>
    })
  }

  render() {
    //TODO: put as many of the popovers as needed (max 5)
    //if empty, produce an empty array
    //show only the selected and pinned incidents
    return <g>
      {this.pinnedIncidents()}
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