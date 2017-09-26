const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')
const Constants = require('../Constants.js')
const IncidentComputations = require('../IncidentComputations.js')
const IncidentListItem = require('./IncidentListItem.jsx')
const SetIncidentListScrollCreator = require('../actionCreators/SetIncidentListScrollCreator.js')

require('./IncidentList.scss')

class IncidentList extends React.Component {

  // Callbacks

  onListScroll() {
    if (this.scrollPane !== undefined) {
      this.props.setListScroll(this.scrollPane.scrollTop)
    }
  }



  // Render Helpers

  noIncidentsText() {
    if (this.props.filterboxActivationState.get('columnName') === null) {

      // TODO: if this design sticks, translate me
      return <p className = 'noIncidentsText'>No category selected. Select a category from a column to see related incidents.</p>

    }
    else {
      return null
    }
  }

  incidentList() {
    if (this.props.filterboxActivationState.get('columnName') === null) {
      return null
    }
    else {
      return <div 
        className = 'incidentListScrollPane'
        style = { this.scrollPaneStyle() }
        ref = { element => this.scrollPane = element }
        onScroll = { this.onListScroll.bind(this) }
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
        selected = { this.props.selectedIncident === incident }
      />
    }).toArray()
  }


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

    return {
      width: `${Constants.getIn(['pinColumn', 'width']) + Constants.getIn(['pinColumn', 'horizontalMargins'])}px`,
      height: `${pinColumnPositions.get('height')}px`,
      top: `${pinColumnPositions.get('y')}px`,
    }
  }

  scrollPaneStyle() {
    // TODO: if the scrolling list replaces the pin column permanently, we
    // should rename this chunk of the horizontal positions ... 
    const pinColumnPositions = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories, 
      this.props.viewport, 
      this.props.data, 
      this.props.columns, 
      this.props.categories
    ).get('pinColumn')

    return {
      maxHeight: `${pinColumnPositions.get('height')}px`,
    }
  }



  // React Lifecycle Hooks

  componentDidUpdate() {
    if (this.scrollPane !== undefined) {
      this.scrollPane.scrollTop = this.props.incidentListScrollPosition
    }
  }

  render() {
    return <div className = 'incidentListOuterContainer'>
      <div 
        className = 'incidentListInnerContainer' 
        style = { this.innerContainerStyle() }
      >
        { this.noIncidentsText() }
        { this.incidentList() }
      </div>

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
    selectedIncident: state.selectedIncident,
    incidentListScrollPosition: state.incidentListScrollPosition,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setListScroll: (scrollTop) => {
      dispatch(SetIncidentListScrollCreator(scrollTop))
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(IncidentList)