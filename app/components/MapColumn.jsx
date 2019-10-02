const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const WorkspaceComputations = require('../WorkspaceComputations.js')
const DragColumnStartedCreator = require('../actionCreators/DragColumnStartedCreator.js')
const DragColumnCreator = require('../actionCreators/DragColumnCreator.js')
const DragColumnEndedCreator = require('../actionCreators/DragColumnEndedCreator.js')
const SnapColumnCreator = require('../actionCreators/SnapColumnCreator.js')
const SetColumnsToCreator = require('../actionCreators/SetColumnsToCreator.js')

let columnWindowMoveHandler = null
let columnWindowEndHandler = null

require('./MapColumn.scss')

// NB: The 'map column' is not responsible for actually drawing the map. It is
// just a dummy object to occupy the same space as the actual map canvas.

// As the map is drawn with a canvas element, embedding it in the SVG would be
// a bad idea. See MapContainer and Map components.

class MapColumn extends React.Component {

  dragArrow() {
    const measurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)
      .getIn(['columns', 'map'])

    const dragArrowX = measurements.get('x') +
                       (measurements.get('width') / 2) -
                       (Constants.getIn(['dragArrow', 'width']) / 2)

    return <image xlinkHref='images/horizontal_drag.svg'
      className = 'dragArrow'
      height = {Constants.getIn(['dragArrow', 'height'])}
      width = {Constants.getIn(['dragArrow', 'width'])}
      x= {dragArrowX}
      y= {WorkspaceComputations.dragArrowY(this.props.viewport)}
      onMouseDown={this.handleDragStart.bind(this)}
      onMouseMove={this.handleDragMove.bind(this)}
      onMouseUp={this.handleDragEnd.bind(this)}
      onTouchStart = { this.handleTouchStart.bind(this) }
      onTouchMove = { this.handleTouchMove.bind(this) }
      onTouchEnd = { this.handleTouchEnd.bind(this) }
      tabIndex = '0'
      role = 'button'
      aria-label = {Tr.getIn(['columnHeadings','map'])}
      onKeyDown = { this.mapKeyDown.bind(this) }
    >
    </image>
  }

  handleDragStart(e) {
    e.stopPropagation()
    e.preventDefault()

    const measurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)
      .getIn(['columns', 'map'])

    const oldX = measurements.get('x') +
                       (measurements.get('width') / 2) -
                       (Constants.getIn(['dragArrow', 'width']) / 2)
    const offset = e.clientX - oldX

    this.props.onColumnDragStarted(true, 'map', oldX, e.clientX, offset)

    // These handlers will help keep the dragged column moving
    // even when the cursor is off the dragging handle. This
    // is necessary because the dragging handle is too small
    // making it harder to drag without the cursor leaving
    // the handle.
    columnWindowEndHandler = this.handleDragEnd.bind(this)
    columnWindowMoveHandler = this.handleDragMove.bind(this)
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
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','column'])}`,
      'dragged',
      'map')
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

  handleTouchStart(e) {
    e.stopPropagation()
    e.preventDefault()

    const measurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)
      .getIn(['columns', 'map'])

    const oldX = measurements.get('x') +
                       (measurements.get('width') / 2) -
                       (Constants.getIn(['dragArrow', 'width']) / 2)
    const offset = e.touches[0].clientX - oldX

    this.props.onColumnDragStarted(true, 'map', oldX, e.clientX, offset)
  }

  handleTouchMove(e) {
    e.stopPropagation()
    e.preventDefault()

    // No need to fire unneeded events if drag hasn't started.
    if(!this.props.columnDragStatus.get('isStarted')) return

    this.props.onColumnDrag(e.touches[0].clientX)
  }

  handleTouchEnd(e) {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','column'])}`,
      'touch dragged',
      'map')
    e.stopPropagation()
    e.preventDefault()

    // No need to fire unneeded evenets if drag hasn't started.
    if(!this.props.columnDragStatus.get('isStarted')) return
    this.props.onColumnDragEnded(false)
    const newX = this.props.columnDragStatus.get('newX') -
                 this.props.columnDragStatus.get('offset')
    this.props.onColumnSnap(this.props.columnDragStatus.get('columnName'), this.props.columnDragStatus.get('oldX'), newX, this.props.viewport)

  }

  mapKeyDown(event) {
    // put up the guards
    if((event.key !== 'ArrowLeft') && (event.key !== 'ArrowRight')) {
      return null
    }

    // prevent horizontal scrolling on the page
    event.preventDefault()

    let swap = null

    if (event.key === 'ArrowLeft') {
      swap = -1
    }
    else if (event.key === 'ArrowRight') {
      swap = 1
    }

    const columnIndex = this.props.columns.indexOf('map')

    if ((columnIndex + swap) < 0) {
      // Can't move the column to the left any further
      return
    }
    else if ((columnIndex + swap) >= this.props.columns.count()) {
      // Send the column back to the sidebar
      this.props.onColumnArrowKeyDown(this.props.columns.pop())
      return
    }

    const columnNameToSwap = this.props.columns.get(columnIndex + swap)

    // Swap the current column with its neighbour
    let newColumns = this.props.columns.set(columnIndex, columnNameToSwap)
    newColumns = newColumns.set(columnIndex + swap, 'map')

    this.props.onColumnArrowKeyDown(newColumns)

  }

  columnTransform() {
    let transformString = 'translate(0,0)'
    if(this.props.columnDragStatus.get('isStarted') &&
       this.props.columnDragStatus.get('columnName') === 'map') {
      const xTransform = this.props.columnDragStatus.get('newX') -
                         this.props.columnDragStatus.get('offset') -
                         this.props.columnDragStatus.get('oldX')
      transformString = `translate(${xTransform},0)`
    }
    return transformString
  }

  render() {

    return <g
      transform={this.columnTransform()}>
      {this.dragArrow()}
    </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    columns: state.columns,
    categories: state.categories,
    data: state.data,
    showEmptyCategories: state.showEmptyCategories,
    columnDragStatus: state.columnDragStatus,
    analytics: state.analytics,
  }
}

const mapDispatchToProps = dispatch => {
  return {
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
    onColumnArrowKeyDown: (columnNames) => {
      dispatch(SetColumnsToCreator(columnNames))
    },
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(MapColumn)
