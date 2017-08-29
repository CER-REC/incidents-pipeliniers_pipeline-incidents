const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')
const CategoryComputations = require('../CategoryComputations.js')
const SidebarColumnHoverCreator = require('../actionCreators/SidebarColumnHoverCreator.js')
const DragColumnStartedCreator = require('../actionCreators/DragColumnStartedCreator.js')
const DragColumnCreator = require('../actionCreators/DragColumnCreator.js')
const DragColumnEndedCreator = require('../actionCreators/DragColumnEndedCreator.js')
const ColumnPaths = require('./ColumnPaths.jsx')
const Category = require('./Category.jsx')
const Constants = require('../Constants.js')
const TranslationTable = require('../TranslationTable.js')

const COLUMN_TYPE = {
  SIDEBAR: 'SIDEBAR',
  WORKSPACE: 'WORKSPACE'
}

require('./Column.scss')

// TODO: Get this from the URL query? Cookies? language reducer! 
const language = 'en'

class Column extends React.Component {

  // Specifically: non-empty AND visible categories
  nonEmptyCategories() {
    const categoryColours = CategoryComputations.coloursForColumn(
      this.props.categories,
      this.props.columnName)
    const categoryHeights = WorkspaceComputations.categoryHeights(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories, 
      this.props.columnName) 

    // TODO: I'm not very happy computing the vertical layout this way, refactor!
    let categoryY = WorkspaceComputations.columnY()

    const displayedCategories = CategoryComputations.displayedCategories(
      this.props.data,
      this.props.columns,
      this.props.categories, 
      this.props.columnName)

    const columnMeasurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)
      .getIn(['columns', this.props.columnName])


    return displayedCategories
      .map( (visible, categoryName) => {
        const currentY = categoryY
        categoryY += categoryHeights.get(categoryName)

        return <Category
          categoryName={categoryName}
          key={categoryName}
          colour={categoryColours.get(categoryName)} 
          height={categoryHeights.get(categoryName)}
          width={ columnMeasurements.get('width') }
          x={ columnMeasurements.get('x') }
          y={currentY}
        />
      }).toArray()
  }

  barHeading() {
    let currentY = WorkspaceComputations.topBarHeight()

    // Check if the subheading is visible. If it is not, 
    // add Constants.get('columnSubheadingHeight') to currentY.
    if(CategoryComputations.columnFiltered(this.props.categories, this.props.columnName)) {
      currentY += Constants.get('columnSubheadingHeight')
    }

    const columnMeasurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)
      .getIn(['columns', this.props.columnName])

    return  this.splitHeading().map((word) => {
      currentY += Constants.get('columnHeadingLineOffset')
      return <tspan className='barsHeading' 
        key={word}
        x={columnMeasurements.get('x')} 
        y={currentY}>
        {word}
      </tspan>
    })
  }

  barSubHeading() {
    // Only render the sub-heading if filters are on.
    if(CategoryComputations.columnFiltered(this.props.categories, this.props.columnName)) {
      return
    }

    const columnMeasurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)
      .getIn(['columns', this.props.columnName])

    const currentY = WorkspaceComputations.topBarHeight() + 
                     Constants.get('columnSubheadingOffset')
    return <tspan className='barsSubHeading' 
      key='barSubHeading'
      x={columnMeasurements.get('x')} 
      y={currentY}>
      578/1017 shown
    </tspan>
  }

  dragArrow() {
    const columnMeasurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)
      .getIn(['columns', this.props.columnName])

    return <image xlinkHref='images/horizontal_drag.svg' 
      className = 'dragArrow'
      height = {Constants.getIn(['dragArrow', 'height'])}
      width = {Constants.getIn(['dragArrow', 'width'])}
      x= {WorkspaceComputations.dragArrowX(this.props.columns, columnMeasurements.get('x'))}
      y= {WorkspaceComputations.dragArrowY(this.props.viewport)}
      onMouseDown={this.handleDragStart.bind(this)}
      onMouseMove={this.handleDragMove.bind(this)}
      onMouseUp={this.handleDragEnd.bind(this)}>
    </image>
  }

  emptyCategories() {
    
    if (!this.props.showEmptyCategories) {
      // If not showing empty categories, bail out
      return null
    }


    const categoryColours = CategoryComputations.coloursForColumn(
      this.props.categories,
      this.props.columnName)

    const baselineHeight = WorkspaceComputations.baselineHeight(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)

    const emptyCategoryHeight = WorkspaceComputations.emptyCategoryHeight(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)

    const columnMeasurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)
      .getIn(['columns', this.props.columnName])


    // TODO: I'm not very happy computing the vertical layout this way, refactor!
    let categoryY = baselineHeight

    return CategoryComputations.emptyCategoriesForColumn(
      this.props.data,
      this.props.columns,
      this.props.categories,
      this.props.columnName
    ).map( (visible, categoryName) => {
      // TODO: I think that we don't care whether an empty category is visible or not?
      const currentY = categoryY
      categoryY += emptyCategoryHeight

      return <Category
        categoryName={categoryName}
        key={categoryName}
        colour={categoryColours.get(categoryName)} 
        height={emptyCategoryHeight}
        width={ columnMeasurements.get('width') }
        x={ columnMeasurements.get('x') }
        y={currentY}
      />

    }).toArray()
  }

  columnPaths() {
    if (WorkspaceComputations.shouldRenderColumnPath(
      this.props.columns,
      this.props.columnName)) {
      return <ColumnPaths 
        index={this.props.index} 
        columnName={this.props.columnName}/>
    }
    else {
      return null
    }
  }

  handleDragStart(e) {
    const columnMeasurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)

    const oldX = WorkspaceComputations.dragArrowX(this.props.columns, columnMeasurements.getIn(['columns', this.props.columnName, 'x']))
    const offset = e.clientX - oldX
    const newX = e.clientX - offset

    this.props.onColumnDragStarted(true, this.props.columnName, oldX, e.clientX, offset)
  }

  handleDragMove(e) {
    // No need to fire unneeded events if drag hasn't started.
    if(!this.props.columnDragStatus.get('isStarted')) return 

    this.props.onColumnDrag(e.clientX)
  }

  handleDragEnd(e) {
    this.props.onColumnDragEnded(false)
  }

  handleMouseEnter() {
    this.props.onMouseEnter(this.props.columnName)
  }
  handleMouseLeave() {
    this.props.onMouseLeave()
  }

  render() {
    switch(this.props.columnType) {
    case COLUMN_TYPE.SIDEBAR: {
      return <g 
        className='Column' 
        id={this.props.columnName}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}>
        {this.sideBarColumn()}
        <text>
          {this.sidebarHeading()}
        </text>
      </g>
    }
    case COLUMN_TYPE.WORKSPACE:
    default: {
      return <g transform={this.columnTransform()}>
        <text>
          {this.barHeading()}
          {this.barSubHeading()}
        </text>
        { this.columnPaths() }
        { this.nonEmptyCategories() }
        { this.emptyCategories() }
        { this.dragArrow() }
      </g>        
    }
    }
  }

  splitHeading() {
    const columnHeading = TranslationTable.getIn(['columnHeadings', this.props.columnName, language])
    const splitIndex = columnHeading.lastIndexOf(' ')
    const topLine = columnHeading.substring(0, splitIndex)
    const bottomLine = columnHeading.substring(splitIndex+1)
    return [topLine, bottomLine]
  }

  columnTransform() {
    let transformString = 'translate(0,0)'
    if(this.props.columnDragStatus.get('isStarted') &&
       this.props.columnDragStatus.get('columnName') === this.props.columnName) {
      const xTransform = this.props.columnDragStatus.get('newX') - 
                         this.props.columnDragStatus.get('offset') - 
                         this.props.columnDragStatus.get('oldX')
      transformString = `translate(${xTransform},0)`
    }
    return transformString
  }

  sideBarColumn() {
    // Handle the sidebar map column differently.
    if(this.props.columnName === 'map') {
      return this.sidebarMapColumn()
    }

    const categoryColours = CategoryComputations.coloursForColumn(
      this.props.categories,
      this.props.columnName)

    const categoryHeights = WorkspaceComputations.sideBarCategoryHeights(
      this.props.columnHeight,
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories, 
      this.props.columnName) 

    const displayedCategories = CategoryComputations.displayedCategories(
      this.props.data,
      this.props.columns,
      this.props.categories, 
      this.props.columnName)

    let categoryY = this.props.columnY
    return displayedCategories
      .map( (visible, categoryName) => {
        const currentY = categoryY
        categoryY += categoryHeights.get(categoryName)

        return <Category
          columnType={this.props.columnType}
          categoryName={categoryName}
          key={categoryName}
          colour={categoryColours.get(categoryName)} 
          height={categoryHeights.get(categoryName)}
          width={ this.props.columnWidth }
          x={ this.props.columnX }
          y={currentY}
        />
      }).toArray()
  }

  sidebarMapColumn() {
    return <image 
      xlinkHref='images/sidebar_map.svg' 
      height={ this.props.columnHeight }
      width={ this.props.columnWidth }
      x={ this.props.columnX }
      y={ this.props.columnY }>
    </image> 
  }

  sidebarHeading() {
    let currentY = this.props.columnY
    return  this.splitHeading().map((word) => {
      // Terminating space.
      if(word === '') return null
      currentY += Constants.get('columnHeadingLineOffset')

      return <tspan className='sidebars'
        key={word}
        x={this.props.columnX + Constants.getIn(['sidebar', 'labelHorizontalOffset'])}
        y={currentY}>
        {word}
      </tspan>
    })
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    columns: state.columns,
    categories: state.categories,
    data: state.data,
    showEmptyCategories: state.showEmptyCategories,
    columnDragStatus: state.columnDragStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMouseEnter: (columnName) => {
      dispatch(SidebarColumnHoverCreator(columnName))
    },
    onMouseLeave: () => {
      dispatch(SidebarColumnHoverCreator(null))
    },
    onColumnDragStarted: (isStarted, columnName, oldX, newX, offset) => {
      dispatch(DragColumnStartedCreator(isStarted, columnName, oldX, newX, offset))
    },
    onColumnDrag: (newX) => {
      dispatch(DragColumnCreator(newX))
    },
    onColumnDragEnded: (isStarted) => {
      dispatch(DragColumnEndedCreator(isStarted))
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Column)