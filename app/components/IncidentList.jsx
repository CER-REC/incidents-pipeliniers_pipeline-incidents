import React from 'react'
import * as ReactRedux from 'react-redux'

import Constants from '../Constants.js'
import IncidentComputations from '../IncidentComputations.js'
import IncidentListItem from './IncidentListItem.jsx'
import SetIncidentListScrollCreator from '../actionCreators/SetIncidentListScrollCreator.js'
import ShowIncidentListCreator from '../actionCreators/ShowIncidentListCreator.js'

import Tr from '../TranslationTable.js'
import IncidentListComputations from '../IncidentListComputations.js'


import './IncidentList.scss'

class IncidentList extends React.Component {

  // Callbacks

  onListScroll() {
    if (this.scrollPane !== undefined && this.scrollPane !== null) {
      this.props.setListScroll(this.scrollPane.scrollTop)
    }
  }



  // Render Helpers

  noIncidentsText() {
    if (this.props.filterboxActivationState.get('columnName') !== null ||
      this.props.pinnedIncidents.count() > 0) {
      return null
    }

    return <div className='noIncidentsTextBlock'>
      <p className = 'noIncidentsText'>{ Tr.getIn(['noCategorySelection', this.props.language])}</p>
    </div>
  }

  incidentListKeyDown(event) {
    if(event.key === 'Escape') {
      document.querySelector('.incidentListShowHide').focus()
    }
  }

  incidentList() {
    if (!this.props.showIncidentList) {
      return null
    }

    if (this.props.filterboxActivationState.get('columnName') === null) {
      return null
    }
    else {
      return <div tabIndex='0'  
        className = 'incidentListScrollPane'
        style = { this.scrollPaneStyle() }
        ref = { element => this.scrollPane = element }
        onScroll = { this.onListScroll.bind(this) }
        onKeyDown = {this.incidentListKeyDown.bind(this)}
      >
        <ul>{ this.incidents() }</ul>
      </div>
    }

  }

  incidents() {
    if (this.props.filterboxActivationState.get('columnName') === null) {
      return []
    }

    const filteredData = IncidentComputations.filteredIncidents(
      this.props.data,
      this.props.columns,
      this.props.categories
    )

    const categoryData = IncidentComputations.categorySubset(
      filteredData,
      this.props.filterboxActivationState.get('columnName'),
      this.props.filterboxActivationState.get('categoryName')
    )


    return categoryData.map( incident => {
      return <IncidentListItem
        incident = { incident }
        key = { incident.get('incidentNumber') }
        pinned = { this.props.pinnedIncidents.contains(incident) }
        selected = { this.props.selectedIncidents.contains(incident) }
      />
    }).toArray()
  }

  innerContainerStyle() {
    // TODO: if the scrolling list replaces the pin column permanently, we
    // should rename this chunk of the horizontal positions ... 
    const pinColumnPositions = IncidentListComputations.incidentListInnerContainer(
      this.props.showEmptyCategories, 
      this.props.viewport, 
      this.props.data, 
      this.props.columns, 
      this.props.categories)

    return {
      width: `${Constants.getIn(['pinColumn', 'width']) + Constants.getIn(['pinColumn', 'horizontalMargins'])}px`,

      top: `${pinColumnPositions}px`,
    }
  }

  scrollPaneStyle() {

    const maxHeight = IncidentListComputations.incidentScrollPaneStyle(
      this.props.showEmptyCategories, 
      this.props.viewport, 
      this.props.data, 
      this.props.columns, 
      this.props.categories,
      this.props.pinnedIncidents
    )

    return {
      
      maxHeight: `${maxHeight}px`,

    }
  }



  // React Lifecycle Hooks

  componentDidUpdate() {
    if (this.scrollPane !== undefined && this.scrollPane !== null) {

      this.scrollPane.scrollTop = this.props.incidentListScrollPosition
    } 
  }

  render() {
    return <div 
      className = 'incidentList' 
      style = { this.innerContainerStyle() }
    >
      { this.noIncidentsText() }
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
    filterboxActivationState: state.filterboxActivationState,
    language: state.language,
    pinnedIncidents: state.pinnedIncidents,
    incidentListScrollPosition: state.incidentListScrollPosition,
    showIncidentList: state.showIncidentList,
    selectedIncidents: state.selectedIncidents,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setListScroll: (scrollTop) => {
      dispatch(SetIncidentListScrollCreator(scrollTop))
    },
    onClick: () => {
      dispatch(ShowIncidentListCreator())
    }
  }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(IncidentList)