const React = require('react')
const ReactRedux = require('react-redux')

const Tr = require('../TranslationTable.js')
const AddPinnedIncidentCreator = require('../actionCreators/AddPinnedIncidentCreator')
const RemovePinnedIncidentCreator = require('../actionCreators/RemovePinnedIncidentCreator')

const HoverIncidentCreator = require('../actionCreators/HoverIncidentCreator.js')
const UnhoverIncidentCreator = require('../actionCreators/UnhoverIncidentCreator.js')

const AddSelectedIncidentCreator = require('../actionCreators/AddSelectedIncidentCreator.js')
const RemoveSelectedIncidentCreator = require('../actionCreators/RemoveSelectedIncidentCreator.js')

require('./IncidentListItem.scss')

class IncidentListItem extends React.Component {


  incidentListItemClass() {
    let classString = 'incidentListItem'
    if (this.props.selected === true) {
      classString += ' selected'
    }
    return classString
  }

  incidentDetailClass() {
    if (this.props.selected === true) {
      return 'highEmphasis'
    }
    else {
      return 'mediumEmphasis'
    }
  }

  incidentItemClick() {
    if (this.props.selected === true) {
      this.props.removeFromSelectedIncidents(this.props.incident)
    }
    else {
      this.props.addToSelectedIncidents(this.props.incident)
    }
  }

  incidentStarClick(event) {
    // Don't propagate this click event to the parent list item.
    event.stopPropagation()

    if (this.props.pinned === true) {
      this.props.removeFromPinnedIncidents(this.props.incident)
    }
    else {
      this.props.addToPinnedIncidents(this.props.incident)
    }
  }

  mouseEnter() {
    this.props.hoverIncident(this.props.incident)
  }

  mouseLeave() {
    if (this.props.hoveredIncident === this.props.incident) {
      this.props.unhoverIncident()
    }
  }


  starImage() {
    if (this.props.pinned === true) {
      return 'images/star_selected.svg'
    }
    else {
      return 'images/star_notselected.svg'
    }
  }



  render() {

    return <li 
      className = { this.incidentListItemClass() }
      onClick = { this.incidentItemClick.bind(this) }
      onMouseEnter = { this.mouseEnter.bind(this) }
      onMouseLeave = { this.mouseLeave.bind(this) }
    >
      <div 
        className = "starContainer"
        onClick = { this.incidentStarClick.bind(this) }
      >
        <img src = { this.starImage() } ></img>
      </div>

      <div className = "incidentContainer">
        <p className = { this.incidentDetailClass() }>{ this.props.incident.get('incidentNumber') }</p>
        <p>
          <span className = 'lowEmphasis'>{ Tr.getIn(['near', this.props.language])} </span>
          <span className = { this.incidentDetailClass() } >{ this.props.incident.get('nearestPopulatedCentre') }</span>
        </p>

        <p>
          <span className = 'lowEmphasis'>{ Tr.getIn(['reportedDate', this.props.language]) } </span>
          <span className = { this.incidentDetailClass() }>{ this.props.incident.get('reportedDate').format('MM/DD/YYYY') }</span>
        </p>

      </div>
    </li>

  }


}



const mapStateToProps = state => {
  return {
    language: state.language,
    hoveredIncident: state.hoveredIncident,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToPinnedIncidents: incident => {
      dispatch(AddPinnedIncidentCreator(incident))
    },
    removeFromPinnedIncidents: incident => {
      dispatch(RemovePinnedIncidentCreator(incident))
    },
    hoverIncident: incident => {
      dispatch(HoverIncidentCreator(incident))
    },
    unhoverIncident: () => {
      dispatch(UnhoverIncidentCreator())
    },
    addToSelectedIncidents: incident => {
      dispatch(AddSelectedIncidentCreator(incident))
    },
    removeFromSelectedIncidents: incident => {
      dispatch(RemoveSelectedIncidentCreator(incident))
    },
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(IncidentListItem)
