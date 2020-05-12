import React from 'react'
import * as ReactRedux from 'react-redux'

import Constants from '../Constants.js'

class SelectedIncidentPath extends React.Component {

  strokeWidth() {
    if (this.props.incident === this.props.hoveredIncident) {
      return Constants.getIn(['selectedIncidentPath', 'hoveredStrokeWidth'])
    }
    else {
      return Constants.getIn(['selectedIncidentPath', 'strokeWidth'])
    }
  }

  render() {
    return <path 
      d = { this.props.d }
      fill = 'none'
      stroke = { this.props.stroke }
      strokeWidth = { this.strokeWidth() }
    />
  }
}

const mapStateToProps = state => {
  return {
    hoveredIncident: state.hoveredIncident,
  }
}


export default ReactRedux.connect(mapStateToProps)(SelectedIncidentPath)
