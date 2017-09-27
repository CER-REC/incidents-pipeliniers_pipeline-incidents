const React = require('react')
const ReactRedux = require('react-redux')

const Tr = require('../TranslationTable.js')
const AddPinnedIncidentCreator = require('../actionCreators/AddPinnedIncidentCreator')
const RemovePinnedIncidentCreator = require('../actionCreators/RemovePinnedIncidentCreator')

require('./IncidentListItem.scss')

class IncidentListItem extends React.Component {


  incidentListItemClass() {
    let classString = 'incidentListItem'
    if (this.props.pinned === true) {
      classString += ' pinned'
    }
    return classString
  }

  incidentDetailClass() {
    if (this.props.pinned === true) {
      return 'highEmphasis'
    }
    else {
      return 'mediumEmphasis'
    }
  }

  incidentItemClick() {
    if (this.props.pinned === true) {
      this.props.removeFromPinnedIncidents(this.props.incident)
    }
    else {
      this.props.addToPinnedIncidents(this.props.incident)
    }
  }


  render() {

    return <li 
      className = { this.incidentListItemClass() }
      onClick = { this.incidentItemClick.bind(this) }
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

const mapDispatchToProps = dispatch => {
  return {
    addToPinnedIncidents: incident => {
      dispatch(AddPinnedIncidentCreator(incident))
    },
    removeFromPinnedIncidents: incident => {
      dispatch(RemovePinnedIncidentCreator(incident))
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(IncidentListItem)
