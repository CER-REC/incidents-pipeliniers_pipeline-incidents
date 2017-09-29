const React = require('react')
const ReactRedux = require('react-redux')

const IncidentListItem = require('./IncidentListItem.jsx')
const Constants = require('../Constants.js')
const WorkspaceComputations = require('../WorkspaceComputations.js')
const IncidentListComputations = require('../IncidentListComputations.js')

require('./StarredIncidentList.scss')

class StarredIncidentList extends React.Component {


  innerContainerStyle() {
    // TODO: if the scrolling list replaces the pin column permanently, we
    // should rename this chunk of the horizontal positions ... 
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

    const dividerHeight = IncidentListComputations.dividerHeight(
      this.props.pinnedIncidents
    )

    const topOffset = pinColumnPositions.get('y') + incidentListHeight + dividerHeight

    return {
      width: `${Constants.getIn(['pinColumn', 'width']) + Constants.getIn(['pinColumn', 'horizontalMargins'])}px`,
      top: `${topOffset}px`,
    }
  }

  scrollPaneStyle() {

    const starredIncidentListHeight = IncidentListComputations.starredIncidentListHeight(
      this.props.pinnedIncidents
    )

    return {
      maxHeight: `${starredIncidentListHeight}px`,
    }
  }




  incidentList() {
    return <div 
      className = 'starredIncidentListScrollPane'
      style = { this.scrollPaneStyle() }
    >
      <ul>{ this.incidents() }</ul>
    </div>
  }


  incidents() {
    return this.props.pinnedIncidents.map( incident => {
      return <IncidentListItem
        incident = { incident }
        key = { incident.get('incidentNumber') }
        pinned = { this.props.pinnedIncidents.contains(incident) }
      />
    }).toArray()
        //selected = { this.props.selectedIncidents.contains(incident) }
  }

  render() {

    if (this.props.pinnedIncidents.count() === 0) {
      return null
    }


    return <div 
      className = 'starredIncidentList'
      style = { this.innerContainerStyle() }
    >
      { this.incidentList() }
    </div>
  }


}


const mapStateToProps = state => {
  return {
    showEmptyCategories: state.showEmptyCategories,
    viewport: state.viewport,
    data: state.data,
    columns: state.columns,
    categories: state.categories,
    pinnedIncidents: state.pinnedIncidents,
    selectedIncidents: state.selectedIncidents,
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(StarredIncidentList)