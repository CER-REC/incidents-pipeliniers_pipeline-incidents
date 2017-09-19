const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')
const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const IncidentComputations = require('../IncidentComputations.js')

class ScrollingIncidentList extends React.Component {


  incidentHeadingLabel() {

    const columnMeasurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories
    ).get('pinColumn')

    // TODO: This is replicating math found in Column.jsx for laying out 
    // text headings. We need to pull this into a computation file.
    const y = WorkspaceComputations.topBarHeight() +
      Constants.get('columnHeadingLineOffset') +
      Constants.get('columnSubheadingHeight')

    // TODO: Incidents, the same in French and English. Translate this string if
    // it changes!
    return <tspan className='barsHeading' 
      x = { columnMeasurements.get('x') }
      y = { y }
    >INCIDENTS</tspan>

  }


  incidentCountLabel() {

    // Only render the sub-heading if a category is selected
    // TODO: might be time to rename the filterbox activation state =/
    if (this.props.filterboxActivationState.get('columnName') === null) {
      return null
    }

    const columnMeasurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories
    ).get('pinColumn')

    // TODO: This is replicating math found in Column.jsx for laying out 
    // text headings. We need to pull this into a computation file.
    const y = WorkspaceComputations.topBarHeight() +
      // Constants.get('columnHeadingLineOffset') +
      // Constants.get('columnSubheadingHeight') + 
      Constants.get('columnSubheadingOffset')

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

    const subheadingString = `${categoryData.count()} / ${this.props.data.count()} incidents ${Tr.getIn(['shown', this.props.language])}`

    return <tspan className='barsSubHeading' 
      x = { columnMeasurements.get('x') }
      y = { y }>
      { subheadingString }
    </tspan>

  }

  render() {

    // TODO: if the scrolling list replaces the pin column permanently, we
    // should rename this chunk of the horizontal positions ... 
    const pinColumnPositions = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories, 
      this.props.viewport, 
      this.props.data, 
      this.props.columns, 
      this.props.categories
    ).get('pinColumn')

    const transformString = `translate(${pinColumnPositions.get('x')}, ${pinColumnPositions.get('y')})`


    return <g>
      <text>
        { this.incidentHeadingLabel() }
        { this.incidentCountLabel() }
      </text>
      <g transform = { transformString } >
        <rect
          width = { Constants.getIn(['pinColumn', 'width']) }
          height = { pinColumnPositions.get('height') }
          fill = '#ff9'
        />
      </g>
    </g>
    
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
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(ScrollingIncidentList)