import React from 'react'
import * as ReactRedux from 'react-redux'

import WorkspaceComputations from '../WorkspaceComputations.js'
import CategoryComputations from '../CategoryComputations.js'
import IncidentComputations from '../IncidentComputations.js'
import StringComputations from '../StringComputations.js'


import SidebarColumnHoverCreator from '../actionCreators/SidebarColumnHoverCreator.js'
import DragColumnStartedCreator from '../actionCreators/DragColumnStartedCreator.js'
import DragColumnCreator from '../actionCreators/DragColumnCreator.js'
import DragColumnEndedCreator from '../actionCreators/DragColumnEndedCreator.js'
import SnapColumnCreator from '../actionCreators/SnapColumnCreator.js'
import AddColumnCreator from '../actionCreators/AddColumnCreator.js'
import DragSidebarColumnStartedCreator from '../actionCreators/DragSidebarColumnStartedCreator.js'
import DragSidebarColumnEndedCreator from '../actionCreators/DragSidebarColumnEndedCreator.js'
import DragSidebarColumnCreator from '../actionCreators/DragSidebarColumnCreator.js'
import AddColumnAtPositionCreator from '../actionCreators/AddColumnAtPositionCreator.js'
import ColumnTooltipSummonedCreator from '../actionCreators/ColumnTooltipSummonedCreator.js'
import SetColumnsToCreator from '../actionCreators/SetColumnsToCreator.js'
import ColumnPaths from './ColumnPaths.jsx'
import SelectedColumnPaths from './SelectedColumnPaths.jsx'
import Category from './Category.jsx'
import Constants from '../Constants.js'
import TranslationTable from '../TranslationTable.js'
import SelectedIncidentPaths from './SelectedIncidentPaths.jsx'

import Tr from '../TranslationTable.js'

let columnWindowMoveHandler = null
let columnWindowEndHandler = null
let sidebarWindowMoveHandler = null
let sidebarWindowEndHandler = null

import './Column.scss'

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

    const columnMeasurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)
      .getIn(['columns', this.props.columnName])

    const headingPieces = StringComputations.splitHeading(TranslationTable.getIn(['columnHeadings', this.props.columnName, this.props.language]), Constants.getIn(['sidebar', 'maxLineLength', this.props.language]))

    let currentY
    if (headingPieces.length === 1) {
      currentY = WorkspaceComputations.barHeading()
    }
    else if  (headingPieces.length === 2) {
      currentY = WorkspaceComputations.barHeading() -
        Constants.get('columnHeadingLineOffset')
    }
    else {
      currentY = WorkspaceComputations.topBarHeight()
      console.error('Column heading too long: ', headingPieces)
    }

    return headingPieces.map((word) => {
      currentY += Constants.get('columnHeadingLineOffset')
      return <tspan className='barsHeading'
        key={word}
        x={columnMeasurements.get('x') +
        Constants.getIn(['questionMark', 'size']) +
        Constants.get('columnHeadingXOffset') +
        Constants.get('columnHeadingLeftMargin')}
        y={currentY}
        onMouseDown={this.handleDragStart.bind(this)}
        onMouseMove={this.handleDragMove.bind(this)}
        onMouseUp={this.handleDragEnd.bind(this)}
        onTouchStart = { this.handleTouchStart.bind(this) }
        onTouchMove = { this.handleTouchMove.bind(this) }
        onTouchEnd = { this.handleTouchEnd.bind(this) }
      >
        {word}
      </tspan>
    })
  }

  questionMark() {
    const columnMeasurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)
      .getIn(['columns', this.props.columnName])

    let questionMarkY = WorkspaceComputations.barHeading() -
      Constants.getIn(['questionMark', 'size'])  -
      Constants.getIn(['questionMark', 'yOffset']) +
      Constants.get('columnHeadingLineOffset') // Bottom-align to the text

    return <image
      id={`${this.props.columnName}-QuestionMark`}
      className= 'questionMark'
      xlinkHref="images/large_qmark.svg"
      width={Constants.getIn(['questionMark', 'size'])}
      height={Constants.getIn(['questionMark', 'size'])}
      x={columnMeasurements.get('x') + Constants.get('columnHeadingLeftMargin')}
      y={questionMarkY}
      onClick={this.questionMarkClick.bind(this)}
      tabIndex = '0'
      aria-label = {`${this.props.columnName} 'Question Mark Tool Tip'`}
      role = 'button'
      onKeyDown = { this.questionMarKeyDown.bind(this) }
    />
  }

  questionMarkClick(e) {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','questionMark'])}`,
      'selected',
      `${this.props.columnName}`)
    e.stopPropagation(e)
    e.preventDefault(e)
    this.props.onQuestionMarkClick(this.props.columnName)
  }

  questionMarKeyDown(event) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.stopPropagation(event)
      event.preventDefault(event)
      this.questionMarkClick(event)
    }
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

    const currentY = WorkspaceComputations.barSubheading(this.props.language)

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

    const dragArrowY = WorkspaceComputations.dragArrowY(this.props.viewport)

    return <image xlinkHref='images/horizontal_drag.svg'
      className = 'dragArrow'
      height = {Constants.getIn(['dragArrow', 'height'])}
      width = {Constants.getIn(['dragArrow', 'width'])}
      x= {WorkspaceComputations.dragArrowX(this.props.columns, columnMeasurements.get('x'))}
      y= { dragArrowY }
      tabIndex = '0'
      role = 'button'
      onMouseDown={this.handleDragStart.bind(this)}
      onMouseMove={this.handleDragMove.bind(this)}
      onMouseUp={this.handleDragEnd.bind(this)}
      onTouchStart = { this.handleTouchStart.bind(this) }
      onTouchMove = { this.handleTouchMove.bind(this) }
      onTouchEnd = { this.handleTouchEnd.bind(this) }
      onKeyDown = { this.columnKeyDown.bind(this) }
    >
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

  handleTouchStart(e) {
    e.stopPropagation()
    e.preventDefault()

    const columnMeasurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)

    const oldX = WorkspaceComputations.dragArrowX(this.props.columns, columnMeasurements.getIn(['columns', this.props.columnName, 'x']))
    const offset = e.touches[0].clientX - oldX

    this.props.onColumnDragStarted(true, this.props.columnName, oldX, e.clientX, offset)
  }

  handleDragMove(e) {
    e.stopPropagation()
    e.preventDefault()

    // No need to fire unneeded events if drag hasn't started.
    if(!this.props.columnDragStatus.get('isStarted')) return

    this.props.onColumnDrag(e.clientX)
  }

  handleTouchMove(e) {
    e.stopPropagation()
    e.preventDefault()

    // No need to fire unneeded events if drag hasn't started.
    if(!this.props.columnDragStatus.get('isStarted')) return

    this.props.onColumnDrag(e.touches[0].clientX)
  }

  handleDragEnd(e) {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','column'])}`,
      'dragged',
      `${this.props.columnName}`)
    e.stopPropagation()
    e.preventDefault()

    // No need to fire unneeded events if drag hasn't started.
    if(!this.props.columnDragStatus.get('isStarted')) return

    this.props.onColumnDragEnded(false)
    const newX = this.props.columnDragStatus.get('newX') -
                 this.props.columnDragStatus.get('offset')
    this.props.onColumnSnap(this.props.columnDragStatus.get('columnName'), this.props.columnDragStatus.get('oldX'), newX, this.props.viewport)

    // Remove the window event handlers previously attached.
    window.removeEventListener('mouseup', columnWindowEndHandler)
    window.removeEventListener('mousemove', columnWindowMoveHandler)
  }

  handleTouchEnd(e) {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','column'])}`,
      'touch dragged',
      `${this.props.columnName}`)
    e.stopPropagation()
    e.preventDefault()

    // No need to fire unneeded events if drag hasn't started.
    if(!this.props.columnDragStatus.get('isStarted')) return

    this.props.onColumnDragEnded(false)
    const newX = this.props.columnDragStatus.get('newX') -
                 this.props.columnDragStatus.get('offset')
    this.props.onColumnSnap(this.props.columnDragStatus.get('columnName'), this.props.columnDragStatus.get('oldX'), newX, this.props.viewport)

  }

  columnKeyDown(event) {
    if ((event.key !== 'ArrowLeft') && (event.key !== 'ArrowRight')) {
      return
    }

    // To avoid horizontal page scroll
    event.preventDefault()

    let swap = null

    if (event.key === 'ArrowLeft') {
      swap = -1
    }
    else if (event.key === 'ArrowRight') {
      swap = 1
    }

    const columnIndex = this.props.columns.indexOf(this.props.columnName)

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
    newColumns = newColumns.set(columnIndex + swap, this.props.columnName)

    this.props.onColumnArrowKeyDown(newColumns)


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

  handleSidebarTouchStart(e) {
    e.stopPropagation()
    e.preventDefault()

    const oldX = this.props.columnX
    const offset = e.touches[0].clientX - oldX

    this.props.onSidebarDragStarted(true, this.props.columnName, oldX, e.clientX, offset)

    // These handlers will help keep the dragged column moving
    // even when the cursor is off the dragging handle. This
    // is necessary because the dragging handle is too small
    // making it harder to drag without the cursor leaving
    // the handle.
    sidebarWindowMoveHandler = this.handleSidebarTouchMove.bind(this)
    sidebarWindowEndHandler = this.handleSidebarTouchEnd.bind(this)
  }

  handleSidebarDragEnd(e) {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','sidebar'])}`,
      'added to workspace',
      `${this.props.columnName}`)
    e.stopPropagation()
    e.preventDefault()

    // No need to fire unneeded events if drag hasn't started.
    if(!this.props.sidebarDragStatus.get('isStarted')) return

    this.props.onSidebarDragEnded(false)
    const newX = this.props.sidebarDragStatus.get('newX') -
                 this.props.sidebarDragStatus.get('offset')
    this.props.onSidebarColumnSnap(this.props.sidebarDragStatus.get('columnName'), this.props.sidebarDragStatus.get('oldX'), newX, this.props.viewport)

    // Remove the window event handlers previously attached.
    window.removeEventListener('mouseup', sidebarWindowEndHandler)
    window.removeEventListener('mousemove', sidebarWindowMoveHandler)
  }

  handleSidebarTouchEnd(e) {
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','sidebar'])}`,
      'added to workspace on touch',
      `${this.props.columnName}`)
    e.stopPropagation()
    e.preventDefault()

    // No need to fire unneeded events if drag hasn't started.
    if(!this.props.sidebarDragStatus.get('isStarted')) return

    this.props.onSidebarDragEnded(false)
    const newX = this.props.sidebarDragStatus.get('newX') -
                 this.props.sidebarDragStatus.get('offset')
    this.props.onSidebarColumnSnap(this.props.sidebarDragStatus.get('columnName'), this.props.sidebarDragStatus.get('oldX'), newX, this.props.viewport)
  }

  handleSidebarDragMove(e) {
    e.stopPropagation()
    e.preventDefault()

    // No need to fire unneeded events if drag hasn't started.
    if(!this.props.sidebarDragStatus.get('isStarted')) return

    this.props.onSidebarDrag(e.clientX)
  }

  handleSidebarTouchMove(e) {
    e.stopPropagation()
    e.preventDefault()

    // No need to fire unneeded events if drag hasn't started.
    if(!this.props.sidebarDragStatus.get('isStarted')) return

    this.props.onSidebarDrag(e.touches[0].clientX)
  }

  sidebarKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowLeft') {
      event.preventDefault(event)
      this.handleMouseClick(event)
    }
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
        stroke='#1CD1C8'
        tabIndex = '0'
        role = 'button'
        onKeyDown = { this.sidebarKeyDown.bind(this) }
      ></rect>
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
    const lineLength = Constants.getIn(['sidebar', 'maxLineLength', this.props.language])
    const headingText = TranslationTable.getIn(['columnHeadings', this.props.columnName, this.props.language])
    return StringComputations.splitHeading(headingText, lineLength).map((word) => {
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
        onTouchStart = { this.handleSidebarTouchStart.bind(this) }
        onTouchMove = { this.handleSidebarTouchMove.bind(this) }
        onTouchEnd = { this.handleSidebarTouchEnd.bind(this) }
      >
        <g transform={this.sidebarColumnTransform()}>
          { this.sidebarShadow() }
          <g
            className="sidebar"
            id={this.props.columnName}
            tabIndex = '0'
            role = 'button'
            aria-label = {this.props.columnName}
            onKeyDown = { this.sidebarKeyDown.bind(this) }
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
        <g>
          <text tabIndex = '0'
            aria-label = {this.props.columnName}
            onKeyDown = {this.columnKeyDown.bind(this)}>
            {this.barHeading()}</text>
          <text>
            {this.barSubHeading()}
          </text>
          {this.questionMark()}
        </g>
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
    columnTooltip: state.columnTooltip,
    analytics: state.analytics,
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
    },
    onQuestionMarkClick: (columnName) => {
      dispatch(ColumnTooltipSummonedCreator(columnName))
    },
    onColumnArrowKeyDown: (columnNames) => {
      dispatch(SetColumnsToCreator(columnNames))
    },
  }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Column)
