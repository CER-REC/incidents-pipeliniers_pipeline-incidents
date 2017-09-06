const React = require('react')
const ReactRedux = require('react-redux')

const Filterbox = require('./Filterbox.jsx')
const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const CategoryHoverStateCreator = require('../actionCreators/CategoryHoverStateCreator.js')
const CategoryUnhoverStateCreator = require('../actionCreators/CategoryUnhoverStateCreator.js')

const BeginIncidentDragCreator = require('../actionCreators/BeginIncidentDragCreator.js')
const UpdateIncidentDragCreator = require('../actionCreators/UpdateIncidentDragCreator.js')
const EndIncidentDragCreator = require('../actionCreators/EndIncidentDragCreator.js')
const IncidentSelectionStateCreator = require('../actionCreators/IncidentSelectionStateCreator.js')
const ActivateFilterboxCreator = require('../actionCreators/ActivateFilterboxCreator.js')

const IncidentComputations = require('../IncidentComputations.js')
const WorkspaceComputations = require('../WorkspaceComputations.js')
const IncidentPathComputations = require('../IncidentPathComputations.js')
const CategoryComputations = require('../CategoryComputations.js')
const FilterboxComputations = require('../FilterboxComputations.js')

require('./Category.scss')



class Category extends React.Component {

  filterboxActive() {

    const filterboxState = this.props.filterboxActivationState
    return filterboxState.get('columnName') === this.props.columnName &&
      filterboxState.get('categoryName') === this.props.categoryName

  }

  filterbox(currentY) {
    if (this.filterboxActive()) {
      return <Filterbox
        width = { this.props.width }
        y = { currentY + Constants.getIn(['filterbox', 'labelOffset']) }
        columnName = { this.props.columnName }
        categoryName = { this.props.categoryName }
      />
    }
    else {
      return null
    }

  }

  // Do not render category labels for sidebar columns.
  label() {
    if(this.props.columnType === Constants.getIn(['columnTypes', 'SIDEBAR'])) {
      return null
    }

    const labelLines = this.labelLines()
    if(labelLines.length * Constants.get('singleLineCategoryLabelHeight') > this.props.height) {
      return null
    }

    let labelClassName = 'inactiveCategoryLabels'
    let filterBoxOffset = 0

    if(this.filterboxActive()) {
      labelClassName = 'activeCategoryLabels'
      filterBoxOffset = Constants.getIn(['filterbox', 'filterBoxOffset'])
    }

    let currentY = (this.props.height/2) - filterBoxOffset
    let lineCount = 0
    currentY += (1 - (labelLines.length/2)) * 
                Constants.get('singleLineCategoryLabelHeight')

    // Decrement just before it's increcemented inside the map.
    currentY -= Constants.get('singleLineCategoryLabelHeight')

    return <g>
      <text
        onClick = { this.categoryLabelClick.bind(this) }
      >
        {labelLines.map((line) => {
          currentY += Constants.get('singleLineCategoryLabelHeight')
          lineCount += 1
          return <tspan fill={this.fill} className={labelClassName}             
            key={this.props.categoryName + 'CategoryLabelLine' + lineCount}
            y={currentY}
            x={this.props.width + Constants.get('categoryLabelOffset')}>
            {line}
          </tspan>
        })}
      </text>
      { this.filterbox(currentY) }
    </g>
  }

  categoryLabelClick() {
    if (!this.props.enableCategoryHeadingClick) {
      return
    }

    // It's possible to get into a configuration where we should not show the
    // filterbox at all. Ex: if there are no filters set on the current column,
    // we do not show the reset button. If filters are set on the other columns
    // such that only one category is visible in our column, we can't show only
    // or hide any categories in this column either. 

    // In that case, no box!
    if (FilterboxComputations.buttonCount(this.props.data, this.props.columns, this.props.categories, this.props.columnName) === 0) {
      return
    }

    this.props.activateFilterbox(this.props.columnName, this.props.categoryName)
  }


  // preventDefault is added to these event handlers to disable browser image
  // drag functionality

  handleOnMouseDown(event) {
    if (this.props.columnType === Constants.getIn(['columnTypes', 'SIDEBAR'])) {
      return
    }
    event.preventDefault()
    this.props.onBeginDrag(this.props.columnName, this.props.categoryName)
  }
  handleOnMouseMove(event) {
    if (this.props.columnType === Constants.getIn(['columnTypes', 'SIDEBAR'])) {
      return
    }
    event.preventDefault()
    this.selectIncidentAtMousePosition(event)
  }
  handleOnMouseUp(event) {
    if (this.props.columnType === Constants.getIn(['columnTypes', 'SIDEBAR'])) {
      return
    }
    event.preventDefault()
    this.selectIncidentAtMousePosition(event)
    this.props.onEndDrag()
  }

  selectIncidentAtMousePosition(event) {

    if (!this.props.incidentDragState.get('currentlyDragging')) {
      return
    }

    this.props.onUpdateDrag(this.props.columnName, this.props.categoryName)

    const bounds = this.rect.getBoundingClientRect()
    const localY = event.clientY - bounds.top

    const filteredIncidents = IncidentComputations.filteredIncidents(
      this.props.data,
      this.props.columns,
      this.props.categories
    )

    const categoryIncidents = IncidentComputations.categorySubset(
      filteredIncidents,
      this.props.columnName,
      this.props.categoryName
    )

    const categoryHeightFraction = localY / bounds.height
    const incidentIndex = Math.round(categoryHeightFraction * categoryIncidents.count())

    const incident = categoryIncidents.get(incidentIndex)

    if (typeof incident !== 'undefined') {
      this.props.selectIncident(incident)
    }


  }




  labelLines() {

    switch(this.props.columnName) {
    case 'incidentTypes':
    case 'status':
    case 'province':
    case 'substance':
    case 'releaseType':
    case 'whatHappened':
    case 'whyItHappened':
    case 'pipelinePhase':
    case 'volumeCategory':
    case 'substanceCategory':
    case 'pipelineSystemComponentsInvolved': { 
      // These columns draw category names from a defined vocabulary
      const label = Tr.getIn([
        'categories', 
        this.props.columnName, 
        this.props.categoryName, 
        this.props.language
      ])
      return this.splitHeading(label.toUpperCase())
    }
    case 'company':
    case 'year':
      // These columns use the category name directly
      // Years are numbers, and we need a string here
      return this.splitHeading(this.props.categoryName.toString().toUpperCase())

    // No categories for map column
    }
  }

  splitHeading(label) {

    // No need to split into multiple lines.
    if(label.length <= Constants.get('categoryLabelLineLength')) {
      return [label]
    }

    // Split (' ' or '-') right at the maxmium allows characters per line.
    // Case 1: split right at the line length limit.
    if(label[Constants.get('categoryLabelLineLength')] === ' ' || 
       label[Constants.get('categoryLabelLineLength')] === '-') {
      return [this.splitHeading(label
        .substring(0,Constants.get('categoryLabelLineLength')))]
        .concat(this.splitHeading(label
          .substring(Constants.get('categoryLabelLineLength') + 1)))
    }

    // Case 2: split at the closest space or dash.
    let firstLineSplitPoint = label
      .substring(0, Constants.get('categoryLabelLineLength')).lastIndexOf(' ')
    if(firstLineSplitPoint < 0) {
      firstLineSplitPoint = label
        .substring(0, Constants.get('categoryLabelLineLength')).lastIndexOf('-')
    }

    return [this.splitHeading(label.substring(0, firstLineSplitPoint))].concat( 
      this.splitHeading(label.substring(firstLineSplitPoint + 1)))
  }


  handleMouseEnter() {
    // Do not highlight categories in the sidebar.
    if(this.props.columnType !== Constants.getIn(['columnTypes', 'SIDEBAR'])) {
      this.props.onMouseEnter(this.props.columnName, this.props.categoryName)
    }
  }
  handleMouseLeave() {
    // Do not highlight categories in the sidebar.
    if(this.props.columnType !== Constants.getIn(['columnTypes', 'SIDEBAR'])) {
      this.props.onMouseLeave()
    }
  }


  // These are the faint bars which appear on the columns themselves, indicating
  // the selected incident's position(s) in the column.
  selectedIncidentBars() {

    if (this.props.selectedIncident === null || 
        this.props.columnType !== Constants.getIn(['columnTypes', 'WORKSPACE'])) {
      return null
    }

    if (!CategoryComputations.itemInCategory(
      this.props.selectedIncident,
      this.props.columnName,
      this.props.categoryName
    )) {
      return
    }

    const categoryVerticalPositions = WorkspaceComputations.categoryVerticalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories,
      this.props.columnName
    )

    const incidentHeightsInColumn = IncidentPathComputations.incidentHeightsInColumn(
      this.props.selectedIncident,
      this.props.columnName,
      this.props.data,
      this.props.columns,
      this.props.categories,
      this.props.showEmptyCategories,
      this.props.viewport,
      categoryVerticalPositions
    )

    const columnMeasurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)
      .getIn(['columns', this.props.columnName])

    return incidentHeightsInColumn.map( (height, i) => {
      return <line 
        stroke = { Constants.getIn(['selectedIncidentPath', 'columnBarColour']) }
        strokeOpacity = { Constants.getIn(['selectedIncidentPath', 'columnBarOpacity']) }
        strokeWidth = { Constants.getIn(['selectedIncidentPath', 'strokeWidth']) }
        x1 = { columnMeasurements.get('x') }
        y1 = { height }
        x2 = { columnMeasurements.get('x') + columnMeasurements.get('width') }
        y2 = { height }
        key = { i }
      />
    }).toArray()

  }



  render() {
    const transformString = `translate(${this.props.x}, ${this.props.y})`

    // TODO: put strokewidth in a method
    let strokeWidth
    if (this.props.categoryName === this.props.categoryHoverState.get('categoryName') &&
      this.props.columnName === this.props.categoryHoverState.get('columnName')) {
      strokeWidth = Constants.getIn('categoryStrokeWidth')
    } 
    else {
      strokeWidth = '0'
    }

    // We need the mouseUp handler on the group, rather than the rect itself,
    // because the selected incident bar will always be underneath the mouse
    // when we stop dragging.
    // TODO: Placing the mouseup handler so high up could cause it to be 
    // triggered by the filter box, we'll have to make sure.

    return <g
      onMouseUp = { this.handleOnMouseUp.bind(this) }
      className = 'category'
    >
      <g transform={transformString}>
        <rect
          width={this.props.width}
          height={this.props.height}
          fill={this.props.colour}
          strokeWidth={strokeWidth}
          className = 'categoryRect'
          onMouseDown={this.handleOnMouseDown.bind(this)}
          onMouseMove={this.handleOnMouseMove.bind(this)}
          onMouseEnter={this.handleMouseEnter.bind(this)}
          onMouseLeave={this.handleMouseLeave.bind(this)}
          ref={ (element) => this.rect = element }
        />
        { this.label() }
      </g>
      { this.selectedIncidentBars() }
    </g>
  }

}

const mapStateToProps = state => {
  return {
    language: state.language,
    categoryHoverState: state.categoryHoverState,
    incidentDragState: state.incidentDragState,
    data: state.data,
    columns: state.columns, 
    categories: state.categories,
    selectedIncident: state.selectedIncident,
    showEmptyCategories: state.showEmptyCategories,
    viewport: state.viewport,
    filterboxActivationState: state.filterboxActivationState,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMouseEnter: (columnName, categoryName) => {
      dispatch(CategoryHoverStateCreator(columnName, categoryName))
    },
    onMouseLeave: () => {
      dispatch(CategoryUnhoverStateCreator())
    },
    onBeginDrag: (columnName, categoryName) => {
      dispatch(BeginIncidentDragCreator(columnName, categoryName))
    },
    onUpdateDrag: (columnName, categoryName) => {
      dispatch(UpdateIncidentDragCreator(columnName, categoryName))
    },
    onEndDrag: () => {
      dispatch(EndIncidentDragCreator())
    },
    selectIncident: (incident) => {
      dispatch(IncidentSelectionStateCreator(incident))
    },
    activateFilterbox(columnName, categoryName) {
      dispatch(ActivateFilterboxCreator(columnName, categoryName))
    }
  }
}


module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Category)