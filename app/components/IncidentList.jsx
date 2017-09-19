const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')
const Constants = require('../Constants.js')
const IncidentComputations = require('../IncidentComputations.js')
const IncidentListItem = require('./IncidentListItem.jsx')

require('./IncidentList.scss')

class IncidentList extends React.Component {

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
      width: `${Constants.getIn(['pinColumn', 'width'])}px`,
      height: `${pinColumnPositions.get('height')}px`,
      left: `${pinColumnPositions.get('x')}px`,
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


  render() {




    return <div className = 'incidentListOuterContainer'>
      <div 
        className = 'incidentListInnerContainer' 
        style = { this.innerContainerStyle() }
      >

        <div 
          className = 'incidentListScrollPane'
          style = { this.scrollPaneStyle() }
        >
          <ul>
            { this.incidents() }
          </ul>
        </div>
       

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
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(IncidentList)