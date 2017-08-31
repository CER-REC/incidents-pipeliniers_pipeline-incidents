const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../WorkspaceComputations.js')

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

  pinnedIncidents() {
    let index = 0
    return this.props.pinnedIncidents.map(incident => {
      let y = (Constants.getIn(['pinColumn', 'pinIconSize']) * index) + WorkspaceComputations.columnY()
      if(this.props.selectedIncident !== null) {
        y += Constants.getIn(['pinColumn', 'pinIconSize'])
      }
      index += 1

      return <IncidentPopover key={incident.get('incidentNumber')} incident={incident} y={y}/>
    })
  }

  render() {
    //TODO: put as many of the popovers as needed (max 5)
    //if empty, produce an empty array
    //show only the selected and pinned incidents
    return <g>

     

      {this.selectedIncident()}
      {this.pinnedIncidents()}
    </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    selectedIncident: state.selectedIncident,
    pinnedIncidents: state.pinnedIncidents
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(IncidentBar)