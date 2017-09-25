const React = require('react')
const ReactRedux = require('react-redux')

const Filterbox = require('./Filterbox.jsx')
const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const CategoryHoverStateCreator = require('../actionCreators/CategoryHoverStateCreator.js')
const CategoryUnhoverStateCreator = require('../actionCreators/CategoryUnhoverStateCreator.js')

const ActivateFilterboxCreator = require('../actionCreators/ActivateFilterboxCreator.js')
const HideFilterboxCreator = require('../actionCreators/HideFilterboxCreator.js')

const WorkspaceComputations = require('../WorkspaceComputations.js')
const CategoryComputations = require('../CategoryComputations.js')
const FilterboxComputations = require('../FilterboxComputations.js')
const StringComputations = require('../StringComputations.js')

require('./Category.scss')


class Category extends React.Component {

  filterboxActive() {
    const filterboxState = this.props.filterboxActivationState
    return filterboxState.get('columnName') === this.props.columnName &&
              filterboxState.get('categoryName') === this.props.categoryName
  }

  checkHoverState() {
    return this.props.categoryName === this.props.categoryHoverState.get('categoryName') &&
      this.props.columnName === this.props.categoryHoverState.get('columnName')
  }

  filterbox(currentY) {
    if (this.filterboxActive()) {
      return <g><Filterbox
        width = { this.props.width }
        y = { currentY + Constants.getIn(['filterbox', 'labelOffset']) }
        columnName = { this.props.columnName }
        categoryName = { this.props.categoryName }
      />
      </g>
    } else if (this.checkHoverState()) {
      return <g><Filterbox
        width = { this.props.width }
        y = { currentY + Constants.getIn(['filterbox', 'labelOffset']) }
        columnName = { this.props.columnName }
        categoryName = { this.props.categoryName }
      />
      </g>
    } else {
      return null
    }
  }

  // Do not render category labels for sidebar columns.
  label() {
    if(this.props.columnType === Constants.getIn(['columnTypes', 'SIDEBAR'])) {
      return null
    }

    const labelLines = this.labelLines()
    const labelLengthExceed = labelLines.length * Constants.get('singleLineCategoryLabelHeight') > this.props.height

    let labelClassName = 'inactiveCategoryLabels'
    let filterBoxOffset = 0

    if(labelLengthExceed === true && this.checkHoverState() === false && this.filterboxActive() === false) {
      return null
    }

    if(this.checkHoverState() === true) {
      labelClassName = 'activeCategoryLabels'
      filterBoxOffset = Constants.getIn(['filterbox', 'filterBoxOffset'])
    }

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
    

    if(this.filterboxActive() === true) {
      this.props.deactivateFilterbox()
    }
    else {
      this.props.activateFilterbox(this.props.columnName, this.props.categoryName)
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
    case 'pipelineSystemComponentsInvolved': { 
    
      // These columns draw category names from a defined vocabulary
      const label = Tr.getIn([
        'categories', 
        this.props.columnName, 
        this.props.categoryName, 
        this.props.language
      ])
      return StringComputations.splitHeading(label.toUpperCase())
    }
    case 'company':
    case 'year':
      // These columns use the category name directly
      // Years are numbers, and we need a string here
      return StringComputations.splitHeading(this.props.categoryName.toString().toUpperCase())

    // No categories for map column
    }
  }

  handleMouseEnter() {
    let categoryWindowHoverHandler = null
    let categoryWindowUnhoverHandler = null
    
    // Do not highlight categories in the sidebar.
    if(this.props.columnType !== Constants.getIn(['columnTypes', 'SIDEBAR']) &&
       !this.props.columnDragStatus.get('isStarted')) {
      this.props.onMouseEnter(this.props.columnName, this.props.categoryName)

      categoryWindowHoverHandler = this.handleMouseEnter.bind(this)
      categoryWindowUnhoverHandler = this.handleMouseLeave.bind(this)
      window.addEventListener('mouseenter', categoryWindowHoverHandler)
      window.addEventListener('mouseleave', categoryWindowUnhoverHandler)
    }
  }
  handleMouseLeave() {
    // Do not highlight categories in the sidebar.
    if(this.props.columnType !== Constants.getIn(['columnTypes', 'SIDEBAR']) &&
       !this.props.columnDragStatus.get('isStarted')) {
      this.props.onMouseLeave()
    }
  }

  categoryTransform() {
    let transformString = 'translate(0,0)'
    if(this.props.categoryDragStatus.get('isStarted') &&
       this.props.categoryDragStatus.get('columnName') === this.props.columnName &&
       this.props.categoryDragStatus.get('categoryName') === this.props.categoryName) {
      const yTransform = this.props.categoryDragStatus.get('newY') - 
                         this.props.categoryDragStatus.get('offset') - 
                         this.props.categoryDragStatus.get('oldY')
      transformString = `translate(0,${yTransform})`
    }
    return transformString
  }

  strokeColour() {
    if(this.props.columnType !== Constants.getIn(['columnTypes', 'WORKSPACE'])) {
      return null
    }
    if (this.checkHoverState() || this.filterboxActive()) {
      return Constants.get('categoryHoverStrokeColour') 
    } 
    else {
      return Constants.get('categoryDefaultStrokeColour') 
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
      transform={this.categoryTransform()}
      
      className = 'category'
     
      onMouseEnter={this.handleMouseEnter.bind(this)}
      onMouseLeave={this.handleMouseLeave.bind(this)}
    >
      <g transform={transformString}>
        <rect
          width={this.props.width}
          height={this.props.height}
          fill={this.props.colour}
          onClick = { this.categoryLabelClick.bind(this) }
          stroke={this.strokeColour()}
          strokeWidth={Constants.get('categoryStrokeWidth')}
          className = 'categoryRect'
          ref={ (element) => this.rect = element }
        />
        { this.label() }
      </g>
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
    categoryDragStatus: state.categoryDragStatus,
    columnDragStatus: state.columnDragStatus,
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
    activateFilterbox(columnName, categoryName) {
      dispatch(ActivateFilterboxCreator(columnName, categoryName))
    },
    deactivateFilterbox() {
      dispatch(HideFilterboxCreator())
    },
  }
}


module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Category)