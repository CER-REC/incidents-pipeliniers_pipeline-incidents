const React = require('react')
const ReactRedux = require('react-redux')

const Filterbox = require('./Filterbox.jsx')
const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')

const BeginIncidentDragCreator = require('../actionCreators/BeginIncidentDragCreator.js')
const UpdateIncidentDragCreator = require('../actionCreators/UpdateIncidentDragCreator.js')
const EndIncidentDragCreator = require('../actionCreators/EndIncidentDragCreator.js')
const IncidentSelectionStateCreator = require('../actionCreators/IncidentSelectionStateCreator.js')

const IncidentComputations = require('../IncidentComputations.js')
const WorkspaceComputations = require('../WorkspaceComputations.js')
const IncidentPathComputations = require('../IncidentPathComputations.js')
const CategoryComputations = require('../CategoryComputations.js')

require('./Category.scss')



class Category extends React.Component {

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

    // TODO: Check if the category is hovered-on/selected to assign it
    // with the proper class name. For now, I am assigning a filter box
    // randomly to 20% of the categories for test purposes only. 
    // This will change once the the category hover/selection reducer is inplace.
    const isSelected = Math.random() < 0.2
    if(isSelected) {
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
      <text>
        {labelLines.map((line) => {
          currentY += Constants.get('singleLineCategoryLabelHeight')
          lineCount += 1
          return <tspan className={labelClassName}
            key={this.props.categoryName + 'CategoryLabelLine' + lineCount}
            y={currentY}
            x={this.props.width + Constants.get('categoryLabelOffset')}>
            {line}
          </tspan>
        })}
      </text>
      {<Filterbox isSelected={isSelected} width={this.props.width} y={currentY + Constants.getIn(['filterbox', 'labelOffset'])}/>}
    </g>
  }


  // preventDefault is added to these event handlers to disable browser image
  // drag functionality

  handleOnMouseDown(event) {
    event.preventDefault()
    this.props.onBeginDrag(this.props.columnName, this.props.categoryName)
  }
  handleOnMouseMove(event) {
    event.preventDefault()
    this.selectIncidentAtMousePosition(event)
  }
  handleOnMouseUp(event) {
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
      return this.splitHeading(this.props.categoryName.toString())

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

  categoryFade(incident) {
    const isIncidentSelected = this.props.selectedIncident === this.props.selectIncident(incident) &&
      this.props.columnType === Constants.getIn(['columnTypes', 'WORKSPACE'])

    const isAnyIncidentSelected = this.props.selectedIncident.get('data') !== null

    if (!isAnyIncidentSelected) {
      return '1' // default -> no incident is selected, opacity set at 1
    }
    else if (isAnyIncidentSelected === true && isIncidentSelected === true) {
      return '1' // an incident is selected and in the category, opacity set at 1
    }
    else if (isAnyIncidentSelected === true && isIncidentSelected === false) {
      return '0.2' // an incident is selected but not in the category, opacity set at 0.2
    }
  }

  render() {
    const transformString = `translate(${this.props.x}, ${this.props.y})`

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
          opacity={this.categoryFade()}
          onMouseDown={this.handleOnMouseDown.bind(this)}
          onMouseMove={this.handleOnMouseMove.bind(this)}

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
    incidentDragState: state.incidentDragState,
    data: state.data,
    columns: state.columns, 
    categories: state.categories,
    selectedIncident: state.selectedIncident,
    showEmptyCategories: state.showEmptyCategories,
    viewport: state.viewport
  }
}

const mapDispatchToProps = dispatch => {
  return {
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
    }
  }
}


module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Category)
