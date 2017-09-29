const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')

class IncidentListDivider extends React.Component {

  render() {

    // We only need the divider if both lists are on display
    if (this.props.pinnedIncidents.count() > 0 && 
      this.props.filterboxActivationState.get('columnName') !== null) {

      const style = {
        marginTop: Constants.getIn(['incidentList', 'dividerLineVerticalMargin']),
        marginBottom: Constants.getIn(['incidentList', 'dividerLineVerticalMargin']),
        height: Constants.getIn(['incidentList', 'dividerLineWidth']),
        width: '100%',
        backgroundColor: Constants.get('nearBlack'),
      }

      return <div> 
        <div style = { style } />
      </div>
    }
    else {
      console.log('srsly')
      return null
    }
  }

}



const mapStateToProps = state => {
  return {
    filterboxActivationState: state.filterboxActivationState,
    pinnedIncidents: state.pinnedIncidents,
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(IncidentListDivider)
