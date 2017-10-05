const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')
const CategoryComputations = require('../CategoryComputations.js')
const IncidentComputations = require('../IncidentComputations.js')
const StringComputations = require('../StringComputations.js')


const SidebarColumnHoverCreator = require('../actionCreators/SidebarColumnHoverCreator.js')
const DragColumnStartedCreator = require('../actionCreators/DragColumnStartedCreator.js')
const DragColumnCreator = require('../actionCreators/DragColumnCreator.js')
const DragColumnEndedCreator = require('../actionCreators/DragColumnEndedCreator.js')
const SnapColumnCreator = require('../actionCreators/SnapColumnCreator.js')
const AddColumnCreator = require('../actionCreators/AddColumnCreator.js')
const DragSidebarColumnStartedCreator = require('../actionCreators/DragSidebarColumnStartedCreator.js')
const DragSidebarColumnEndedCreator = require('../actionCreators/DragSidebarColumnEndedCreator.js')
const DragSidebarColumnCreator = require('../actionCreators/DragSidebarColumnCreator.js')
const AddColumnAtPositionCreator = require('../actionCreators/AddColumnAtPositionCreator.js')
const ColumnPaths = require('./ColumnPaths.jsx')
const SelectedColumnPaths = require('./SelectedColumnPaths.jsx')
const Category = require('./Category.jsx')
const Constants = require('../Constants.js')
const TranslationTable = require('../TranslationTable.js')
const SelectedIncidentPaths = require('./SelectedIncidentPaths.jsx')

const Tr = require('../TranslationTable.js')

let columnWindowMoveHandler = null
let columnWindowEndHandler = null
let sidebarWindowMoveHandler = null
let sidebarWindowEndHandler = null

require('./Column.scss')

class Column extends React.Component {
  // Specifically: non-empty AND visible categories
  nonEmptyCategories() {
    const categoryColours = CategoryComputations.coloursForColumn(
      this.props.data,
      this.props.columnName,
      this.props.schema,
      this.props.language)
    const categoryHeights = WorkspaceComputations.categoryHeights(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories, 
      this.props.columnName) 

    // TODO: I'm not very happy computing the vertical layout this way, refactor!
    // TODO: use the new WorkspaceComputations.categoryVerticalPositions
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
          columnName={this.props.columnName}
          categoryName={categoryName}
          className="Column"
          key={categoryName}
          colour={categoryColours.get(categoryName)} 
          height={categoryHeights.get(categoryName)}
          width={ columnMeasurements.get('width') }
          x={ columnMeasurements.get('x') }
          y={currentY}
          columnType={this.props.columnType}
          enableCategoryHeadingClick = { true }
        />
      }).toArray()
  }

  barHeading() {
    let currentY = WorkspaceComputations.topBarHeight()

    const columnMeasurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)
      .getIn(['columns', this.props.columnName])

    return StringComputations.splitHeading(TranslationTable.getIn(['columnHeadings', this.props.columnName, this.props.language]), 12).map((word) => {
      currentY += Constants.get('columnHeadingLineOffset')
      return <tspan className='barsHeading' 
        key={word}
        x={columnMeasurements.get('x')} 
        y={currentY}
        onMouseDown={this.handleDragStart.bind(this)}
        onMouseMove={this.handleDragMove.bind(this)}
        onMouseUp={this.handleDragEnd.bind(this)}>
        {word}
      </tspan>
    })
  }

  barSubHeading() {
    // Only render the sub-heading if filters are on.
    if(!CategoryComputations.columnFiltered(this.props.categories, this.props.columnName)) {
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

    const filteredData = IncidentComputations.filteredIncidents(
      this.props.data,
      this.props.columns,
      this.props.categories
    )

    const subheadingString = `${filteredData.count()} / ${this.props.data.count()} ${Tr.getIn(['shown', this.props.language])}`

    return <tspan className='barsSubHeading' 
      key='barSubHeading'
      x={columnMeasurements.get('x')} 
      y={currentY}>
      { subheadingString }
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
      this.props.data,
      this.props.columnName,
      this.props.schema,
      this.props.language)

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
        columnName={this.props.columnName}
        categoryName={categoryName}
        key={categoryName}
        colour={categoryColours.get(categoryName)} 
        height={emptyCategoryHeight}
        width={ columnMeasurements.get('width') }
        x={ columnMeasurements.get('x') }
        y={currentY}
        columnType={this.props.columnType}
        enableCategoryHeadingClick = { false }
      />

    }).toArray()

  }

  columnPaths() {
    if (WorkspaceComputations.shouldRenderColumnPath(
      this.props.columns,
      this.props.columnName)) {

      return <ColumnPaths 
        columnName={this.props.columnName}
      />
    }
    else {
      return null
    }
  }

  // These are the emphasized column paths for the current category selection
  selectedColumnPaths() {
    if (WorkspaceComputations.shouldRenderColumnPath(
      this.props.columns,
      this.props.columnName)) {

      return <SelectedColumnPaths 
        columnName={this.props.columnName}
      />
    } else {
      return null
    }
  }

  handleDragStart(e) {
    e.stopPropagation()
    e.preventDefault()

    const columnMeasurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)

    const oldX = WorkspaceComputations.dragArrowX(this.props.columns, columnMeasurements.getIn(['columns', this.props.columnName, 'x']))
    const offset = e.clientX - oldX

    this.props.onColumnDragStarted(true, this.props.columnName, oldX, e.clientX, offset)

    // These handlers will help keep the dragged column moving
    // even when the cursor is off the dragging handle. This
    // is necessary because the dragging handle is too small
    // making it harder to drag without the cursor leaving 
    // the handle.
    columnWindowMoveHandler = this.handleDragMove.bind(this)
    columnWindowEndHandler = this.handleDragEnd.bind(this)
    window.addEventListener('mouseup', columnWindowEndHandler)
    window.addEventListener('mousemove', columnWindowMoveHandler)
  }

  handleDragMove(e) {
    e.stopPropagation()
    e.preventDefault()

    // No need to fire unneeded events if drag hasn't started.
    if(!this.props.columnDragStatus.get('isStarted')) return 

    this.props.onColumnDrag(e.clientX)
  }

  handleDragEnd(e) {
    e.stopPropagation()
    e.preventDefault()

    // No need to fire unneeded evenets if drag hasn't started.
    if(!this.props.columnDragStatus.get('isStarted')) return

    this.props.onColumnDragEnded(false)
    const newX = this.props.columnDragStatus.get('newX') - 
                 this.props.columnDragStatus.get('offset')
    this.props.onColumnSnap(this.props.columnDragStatus.get('columnName'), this.props.columnDragStatus.get('oldX'), newX, this.props.viewport)

    // Remove the window event handlers previously attached.
    window.removeEventListener('mouseup', columnWindowEndHandler)
    window.removeEventListener('mousemove', columnWindowMoveHandler)
  }

  handleSidebarDragStart(e) {
    e.stopPropagation()
    e.preventDefault()

    const oldX = this.props.columnX
    const offset = e.clientX - oldX

    this.props.onSidebarDragStarted(true, this.props.columnName, oldX, e.clientX, offset)

    // These handlers will help keep the dragged column moving
    // even when the cursor is off the dragging handle. This
    // is necessary because the dragging handle is too small
    // making it harder to drag without the cursor leaving 
    // the handle.
    sidebarWindowMoveHandler = this.handleSidebarDragMove.bind(this)
    sidebarWindowEndHandler = this.handleSidebarDragEnd.bind(this)
    window.addEventListener('mouseup', sidebarWindowEndHandler)
    window.addEventListener('mousemove', sidebarWindowMoveHandler)
  }

  handleSidebarDragEnd(e) {
    e.stopPropagation()
    e.preventDefault()

    // No need to fire unneeded evenets if drag hasn't started.
    if(!this.props.sidebarDragStatus.get('isStarted')) return

    this.props.onSidebarDragEnded(false)
    const newX = this.props.sidebarDragStatus.get('newX') - 
                 this.props.sidebarDragStatus.get('offset')
    this.props.onSidebarColumnSnap(this.props.sidebarDragStatus.get('columnName'), this.props.sidebarDragStatus.get('oldX'), newX, this.props.viewport)

    // Remove the window event handlers previously attached.
    window.removeEventListener('mouseup', sidebarWindowEndHandler)
    window.removeEventListener('mousemove', sidebarWindowMoveHandler)
  }

  handleSidebarDragMove(e) {
    e.stopPropagation()
    e.preventDefault()

    // No need to fire unneeded evenets if drag hasn't started.
    if(!this.props.sidebarDragStatus.get('isStarted')) return

    this.props.onSidebarDrag(e.clientX)
  }

  handleMouseEnter() {
    if(!this.props.columnDragStatus.get('isStarted')) {
      this.props.onMouseEnter(this.props.columnName)
    }
  }
  handleMouseLeave() {
    if(!this.props.columnDragStatus.get('isStarted')) {
      this.props.onMouseLeave()
    }
  }
  handleMouseClick(e) {
    e.stopPropagation()
    e.preventDefault()
    this.props.onSidebarColumnClicked(this.props.columnName)
  }

  sidebarColumnTransform() {
    let transformString = 'translate(0,0)'
    if(this.props.sidebarDragStatus.get('isStarted') &&
       this.props.sidebarDragStatus.get('columnName') === this.props.columnName) {
      const xTransform = this.props.sidebarDragStatus.get('newX') - 
                         this.props.sidebarDragStatus.get('offset') - 
                         this.props.sidebarDragStatus.get('oldX')
      transformString = `translate(${xTransform},0)`
    }
    return transformString    
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
      this.props.data,
      this.props.columnName,
      this.props.schema,
      this.props.language)

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
          enableCategoryHeadingClick = { false }
        />
      }).toArray()
  }

  sidebarMapColumn() {
    return <g>
      <rect
        height={ this.props.columnHeight }
        className='Column'
        width={ this.props.columnWidth }
        x={ this.props.columnX }
        y={ this.props.columnY }
        fill='#1CD1C8'
        stroke='#1CD1C8'></rect>
      <image
        xlinkHref='images/mapColumn.png' 
        height={ this.props.columnHeight - Constants.getIn(['sidebarMapColumn','heightPadding']) }
        className='Column'
        width={ this.props.columnWidth - Constants.getIn(['sidebarMapColumn','widthPadding'])}
        x={ this.props.columnX + Constants.getIn(['sidebarMapColumn','xPadding'])}
        y={ this.props.columnY + Constants.getIn(['sidebarMapColumn','yPadding'])}>
      </image>
    </g>
  }

  sidebarHeading() {
    let currentY = this.props.columnY
    return StringComputations.splitHeading(TranslationTable.getIn(['columnHeadings', this.props.columnName, this.props.language]), Constants.getIn(['sidebar', 'maxLineLength'])).map((word) => {
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

  sidebarShadow() {

    if (this.props.sidebarColumnHover === this.props.columnName) {

      const transform = `translate(${Constants.getIn(['sidebar', 'dropShadowX'])},${Constants.getIn(['sidebar', 'dropShadowY'])})`
      
      return <g transform = { transform } >
        <rect
          fill = '#999'
          width = { this.props.columnWidth }
          height = { this.props.columnHeight }
          x = { this.props.columnX }
          y = { this.props.columnY }
        />
      </g>
    }
    else {
      return null
    }

  }

  render() {
    switch(this.props.columnType) {
    case Constants.getIn(['columnTypes', 'SIDEBAR']): {
      return <g
        onMouseDown = { this.handleSidebarDragStart.bind(this) }
        onMouseMove = { this.handleSidebarDragMove.bind(this) }
        onMouseUp = { this.handleSidebarDragEnd.bind(this) }
        onMouseEnter = { this.handleMouseEnter.bind(this) }
        onMouseLeave = { this.handleMouseLeave.bind(this) }
      >
        <g transform={this.sidebarColumnTransform()}>
          { this.sidebarShadow() }
          <g
            className="sidebar"
            id={this.props.columnName}
          >
            {this.sideBarColumn()}
          </g>
          <text className='Column'>
            { this.sidebarHeading() }
          </text>
        </g>
      </g>
    }
    case Constants.getIn(['columnTypes', 'WORKSPACE']):
    default: {
      return <g
        transform={this.columnTransform()}
      >
        <text>
          {this.barHeading()}
          {this.barSubHeading()}
        </text>
        { this.columnPaths() }
        { this.selectedColumnPaths() }
        <SelectedIncidentPaths 
          columnName = { this.props.columnName }
          categoryName = { this.props.categoryName }
        />
        { this.nonEmptyCategories() }
        { this.emptyCategories() }
        { this.dragArrow() }
      </g>
    }
    }
  }

}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    columns: state.columns,
    categories: state.categories,
    data: state.data,
    showEmptyCategories: state.showEmptyCategories,
    language: state.language,
    columnDragStatus: state.columnDragStatus,
    sidebarDragStatus: state.sidebarDragStatus,
    sidebarColumnHover: state.sidebarColumnHover,
    schema: state.schema,
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
    },
    onColumnSnap: (columnName, oldX, newX, viewport) => {
      dispatch(SnapColumnCreator(columnName, oldX, newX, viewport))
    },
    onSidebarColumnClicked: (columnName) => {
      dispatch(AddColumnCreator(columnName))
    },
    onSidebarDragStarted: (isStarted, columnName, oldX, newX, offset) => {
      dispatch(DragSidebarColumnStartedCreator(isStarted, columnName, oldX, newX, offset))
    },
    onSidebarDragEnded: (isStarted) => {
      dispatch(DragSidebarColumnEndedCreator(isStarted))
    },
    onSidebarDrag: (newX) => {
      dispatch(DragSidebarColumnCreator(newX))
    },
    onSidebarColumnSnap: (columnName, oldX, newX, viewport) => {
      dispatch(AddColumnAtPositionCreator(columnName, oldX, newX, viewport))
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Column)