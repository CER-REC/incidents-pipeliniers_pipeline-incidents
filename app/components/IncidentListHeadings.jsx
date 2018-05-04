const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')
const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const IncidentComputations = require('../IncidentComputations.js')
const StringComputations = require('../StringComputations.js')
const ColumnTooltipSummonedCreator = require('../actionCreators/ColumnTooltipSummonedCreator.js')

class IncidentListHeadings extends React.Component {

  incidentHeadingLabel() {

    const columnMeasurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories
    ).get('pinColumn')

    const y = WorkspaceComputations.barHeading() +
      Constants.get('columnHeadingLineOffset')

    // TODO: Incidents, the same in French and English. Translate this string if
    // it changes!
    return <tspan className='incidentsHeading' 
      x = { columnMeasurements.get('x') + 
            Constants.getIn(['questionMark', 'size']) +
            Constants.get('columnHeadingXOffset') + Constants.get('columnHeadingLeftPadding')}
      y = { y }
      tabIndex = '0'
      aria-label = 'incidents'
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
    const y = WorkspaceComputations.barSubheading(this.props.language) 

   
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
    
    // TODO: this is NOT an ordinary column! This is highly misleading.
    const columnName = 'pinColumn'

    const columnMeasurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories
    ).get(columnName)

    let questionMarkY = WorkspaceComputations.barHeading() -
      Constants.getIn(['questionMark', 'size']) + 
      Constants.getIn(['questionMark', 'yOffset'])+
      Constants.getIn(['pinColumn','questionMarkXOffset'])


    return <image 
      id='pinColumn-QuestionMark'
      className= 'questionMark'
      xlinkHref="images/large_qmark.svg" 
      width={Constants.getIn(['questionMark', 'size'])} 
      height={Constants.getIn(['questionMark', 'size'])} 
      x={columnMeasurements.get('x') + Constants.get('columnHeadingLeftPadding')} 
      y={questionMarkY}
      onClick={this.questionMarkClick.bind(this)}
      tabIndex = '0'
      aria-label = 'Column question mark tool tip'
      role = 'button' 
      onKeyDown = { this.questionMarkKeyDown.bind(this) }/>
  }

  questionMarkClick(e) {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','questionMark'])}`, 
      'selected', 
      'TODO',  
      'incident list')
    e.stopPropagation()
    e.preventDefault()
    this.props.onQuestionMarkClick('pinColumn')
  }

  questionMarkKeyDown(event) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.stopPropagation(event)
      event.preventDefault(event)
      this.props.onQuestionMarkClick('pinColumn')
    }
  }

  componentDidMount() {
    
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
    analytics: state.analytics,
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