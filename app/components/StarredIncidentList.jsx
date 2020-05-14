import React from 'react'
import * as ReactRedux from 'react-redux'

import IncidentListItem from './IncidentListItem.jsx'
import Constants from '../Constants.js'
import IncidentListComputations from '../IncidentListComputations.js'

import './StarredIncidentList.scss'

class StarredIncidentList extends React.Component {


  innerContainerStyle() {

    const starredIncidentsInnerContainerTop = IncidentListComputations.starredIncidentsInnerContainer(
      this.props.showEmptyCategories,
      this.props.viewport, 
      this.props.data, 
      this.props.columns, 
      this.props.categories,
      this.props.pinnedIncidents)

    return {
      width: `${Constants.getIn(['pinColumn', 'width']) + Constants.getIn(['pinColumn', 'horizontalMargins'])}px`,
      top: `${starredIncidentsInnerContainerTop}px`
    }
  }

  scrollPaneStyle() {

    const starredIncidentScrollPaneStyle = IncidentListComputations.starredIncidentScrollPaneStyle(
      this.props.pinnedIncidents
    )

    return {
      maxHeight: `${starredIncidentScrollPaneStyle}px`,
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
        selected = { this.props.selectedIncidents.contains(incident) }
      />
    }).toArray()
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


export default ReactRedux.connect(mapStateToProps)(StarredIncidentList)