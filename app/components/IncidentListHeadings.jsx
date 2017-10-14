const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')
const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const IncidentComputations = require('../IncidentComputations.js')
const StringComputations = require('../StringComputations.js')
const ColumnTooltipSummonedCreator = require('../actionCreators/ColumnTooltipSummonedCreator.js')

require('./IncidentListHeadings.scss')

require('./IncidentListHeadings.scss')

class IncidentListHeadings extends React.Component {

  incidentHeadingLabel() {

    const columnMeasurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories
    ).get('pinColumn')

    const y = WorkspaceComputations.topBarHeight() +
      Constants.get('columnHeadingLineOffset') * 2

    // TODO: Incidents, the same in French and English. Translate this string if
    // it changes!
    return <tspan className='incidentsHeading' 
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
    const y = WorkspaceComputations.columnY() 

   
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

    const subheadingString = `${categoryData.count()} / ${this.props.data.count()} ${Tr.getIn(['shown', this.props.language])}`

    return <tspan className='barsSubHeading' 
      x = { columnMeasurements.get('x')}
      y = { y }>
      { subheadingString }
    </tspan>

  }

  // TODO: Find a way to unify this with the questionmark in Column
  questionMark() {
    const columnName = 'pinColumn'
    const columnMeasurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories
    ).get(columnName)

    let isActive = 'inactive'
    if(this.props.columnTooltip.get('isActive') &&
      this.props.columnTooltip.get('columnName') === columnName) 
      isActive = 'active'

    return <image 
      id='pinColumn-QuestionMark'
      className={'questionMark ' + isActive}
      xlinkHref="images/large_qmark.svg" 
      width={Constants.getIn(['questionMark', 'size'])} 
      height={Constants.getIn(['questionMark', 'size'])} 
      x={columnMeasurements.get('x') + 
        StringComputations.questionMarkOffset(Tr.getIn(['columnHeadings', columnName, this.props.language]), 12)} 
      y={WorkspaceComputations.topBarHeight() + 
        Constants.get('columnHeadingLineOffset') - 
        Constants.getIn(['questionMark', 'size']) / 2 + 
        Constants.getIn(['questionMark', 'yOffset'])}
      onClick={this.questionMarkClick.bind(this)}/>
  }

  questionMarkClick(e) {
    e.stopPropagation()
    e.preventDefault()
    this.props.onQuestionMarkClick('pinColumn')
  }

  render() {
    if (this.props.screenshotMode === true) {
      return null
    }

    return <g>
      <text>
        { this.incidentHeadingLabel() }
        { this.incidentCountLabel() }
      </text>
      {this.questionMark()}
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
    columnTooltip: state.columnTooltip,
    screenshotMode: state.screenshotMode,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onQuestionMarkClick: (columnName) => {
      dispatch(ColumnTooltipSummonedCreator(columnName))
    },
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(IncidentListHeadings)