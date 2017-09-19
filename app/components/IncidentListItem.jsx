const React = require('react')
const ReactRedux = require('react-redux')

const Tr = require('../TranslationTable.js')

require('./IncidentListItem.scss')

class IncidentListItem extends React.Component {



  incidentDetailClass() {
    if (this.props.pinned === true) {
      return 'highEmphasis'
    }
    else {
      return 'mediumEmphasis'
    }
  }


  render() {

    return <li 
      className = 'incidentListItem'
    >

      <p className = { this.incidentDetailClass() }> { this.props.incident.get('incidentNumber') }</p>

      <p>
        <span className = 'lowEmphasis'>{ Tr.getIn(['near', this.props.language])} </span>
        <span className = { this.incidentDetailClass() } >{ this.props.incident.get('nearestPopulatedCentre') }</span>
      </p>

      <p>
        <span className = 'lowEmphasis'>{ Tr.getIn(['reportedDate', this.props.language]) } </span>
        <span className = { this.incidentDetailClass() }>{ this.props.incident.get('reportedDate').format('MM/DD/YYYY') }</span>
      </p>

    </li>

  }


}



const mapStateToProps = state => {
  return {
    language: state.language,
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(IncidentListItem)
