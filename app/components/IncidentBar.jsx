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
      />
    }
  }

  render() {
    //TODO: put as many of the popovers as needed (max 5)
    //if empty, produce an empty array
    //show only the selected and pinned incidents
    return <g>

     

      {this.selectedIncident()}

    </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    selectedIncident: state.selectedIncident
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(IncidentBar)