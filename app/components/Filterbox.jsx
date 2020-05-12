import React from 'react'
import * as ReactRedux from 'react-redux'
import Immutable from 'immutable'

import Constants from '../Constants.js'

import DeactivateAllCategoriesExceptOneCreator from '../actionCreators/DeactivateAllCategoriesExceptOneCreator.js'
import DeactivateCategoryCreator from '../actionCreators/DeactivateCategoryCreator.js'
import HideFilterboxCreator from '../actionCreators/HideFilterboxCreator.js'
import ActivateAllCategoriesForColumnCreator from '../actionCreators/ActivateAllCategoriesForColumnCreator.js'
import DragCategoryStartedCreator from '../actionCreators/DragCategoryStartedCreator.js'
import DragCategoryCreator from '../actionCreators/DragCategoryCreator.js'
import DragCategoryEndedCreator from '../actionCreators/DragCategoryEndedCreator.js'
import SnapCategoryCreator from '../actionCreators/SnapCategoryCreator.js'
import SetCategoriesForColumnCreator from '../actionCreators/SetCategoriesForColumnCreator.js'

import FilterboxButton from './FilterboxButton.jsx'
import Tr from '../TranslationTable.js'

import CategoryComputations from '../CategoryComputations.js'
import FilterboxComputations from '../FilterboxComputations.js'
import WorkspaceComputations from '../WorkspaceComputations.js'
import IncidentComputations from '../IncidentComputations.js'

let categoryWindowMoveHandler = null
let categoryWindowEndHandler = null

import './Filterbox.scss'


class Filterbox extends React.Component {

  buttonHeight() {
    return FilterboxComputations.buttonCount(this.props.data, this.props.columns, this.props.categories, this.props.columnName) * Constants.getIn(['filterbox', 'rectVerticalOffset'])
  }


  buttons() {

    const buttons = []
    let currentY = 0

    if (FilterboxComputations.showShowOnlyButton(this.props.data, this.props.columns, this.props.categories, this.props.columnName)) {
      buttons.push(<FilterboxButton 
        x = '0'
        y = { currentY }
        clickCallback = {this.onShowOnlyClick.bind(this)}
        imageUrl = 'images/filter.svg'
        text = {Tr.getIn(['showOnly', this.props.language])}
        key = 'showOnly'
        role = 'button'
        aria-label = { Tr.getIn(['showOnly', this.props.language]) }
        keyDownCallback = { this.onShowOnlyKeyDown.bind(this) } 
      />)
      currentY += Constants.getIn(['filterbox', 'rectVerticalOffset'])
    }

    if (FilterboxComputations.showHideButton(this.props.data, this.props.columns, this.props.categories, this.props.columnName)) {
      buttons.push(<FilterboxButton 
        x = '0'
        y = { currentY }
        clickCallback = {this.onHideClick.bind(this)}
        imageUrl = 'images/hide_(close).svg'
        text = {Tr.getIn(['hide', this.props.language])}
        key = 'hide'
        role = 'button'
        aria-label = { Tr.getIn(['hide', this.props.language]) }
        keyDownCallback = { this.onHideKeyDown.bind(this) } 
      />)
      currentY += Constants.getIn(['filterbox', 'rectVerticalOffset'])
    }

    if (FilterboxComputations.showResetButton(this.props.categories, this.props.columnName)) {
      buttons.push(<FilterboxButton 
        x = '0'
        y = { currentY }
        clickCallback = {this.onResetClick.bind(this)}
        imageUrl = 'images/reset_arrow.svg'
        text = {Tr.getIn(['reset', this.props.language])}
        key = 'reset'
        role = 'button'
        aria-label = { Tr.getIn(['reset', this.props.language]) }
        keyDownCallback = { this.onResetKeyDown.bind(this) } 
      />)
      currentY += Constants.getIn(['filterbox', 'rectVerticalOffset'])
    }

    return buttons
  }

  dragButton() {
    return <g className='filterBoxButton'>
      <rect
        className='filterBoxRect'
        x = { FilterboxComputations.boxWidth(this.props.language) }
        y = '0'
        width = { Constants.getIn(['filterbox', 'dragButtonWidth']) }
        height = { this.buttonHeight() }
      />
      <image 
        xlinkHref='images/vertical_drag.svg' 
        className = 'verticalDrag'
        x = { FilterboxComputations.boxWidth(this.props.language) + Constants.getIn(['filterbox', 'dragIconHorizontalOffset']) }
        y = '0'
        tabIndex = '0'
        role = 'button'
        onKeyDown={this.categoryKeyDown.bind(this)}
        width = { Constants.getIn(['filterbox', 'dragIconWidth']) }
        height = { this.buttonHeight() }
        onMouseDown={this.handleDragStart.bind(this)}
        onMouseMove={this.handleDragMove.bind(this)}
        onMouseUp={this.handleDragEnd.bind(this)}
        onTouchStart={this.handleTouchStart.bind(this)}
        onTouchMove={this.handleTouchMove.bind(this)}
        onTouchEnd={this.handleTouchEnd.bind(this)}
      />
    </g> 
     
  }

  handleDragStart(e) {
    e.stopPropagation()
    e.preventDefault()

    const oldY = this.props.y
    const offset = e.clientY - oldY

    this.props.onCategoryDragStarted(
      true, 
      this.props.columnName, 
      this.props.categoryName, 
      oldY, 
      e.clientY, 
      offset)

    // These handlers will help keep the dragged column moving
    // even when the cursor is off the dragging handle. This
    // is necessary because the dragging handle is too small
    // making it harder to drag without the cursor leaving 
    // the handle.
    categoryWindowMoveHandler = this.handleDragMove.bind(this)
    categoryWindowEndHandler = this.handleDragEnd.bind(this)
    window.addEventListener('mouseup', categoryWindowEndHandler)
    window.addEventListener('mousemove', categoryWindowMoveHandler)
  }


  categoryKeyDown(event) {
    // put up the guards
    if(event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
      return
    }

    // prevent vertical scrolling
    event.preventDefault()

    let swap = null

    if(event.key === 'ArrowUp') {
      swap = -1
    } else if(event.key === 'ArrowDown') {
      swap = 1
    }

    const displayedCategories = CategoryComputations.displayedCategories(
      this.props.data,
      this.props.columns,
      this.props.categories,
      this.props.columnName)


    const displayedCategoryNames = displayedCategories.keySeq()

    const displayedCategoryIndex = displayedCategoryNames.findIndex(k => k === this.props.categoryName)

    if((displayedCategoryIndex + swap) < 0) {
      // Can't move category up any more
      return
    } else if ((displayedCategoryIndex + swap) >= displayedCategories.count()) {
      // Can't move category down any more
      return
    }

    const swapCategoryName = displayedCategoryNames.get(displayedCategoryIndex + swap)

    const columnCategories = this.props.categories.get(this.props.columnName)
    const oldCategoryNames = columnCategories.keySeq().toList()

    const oldCategoryIndex = oldCategoryNames.findIndex(k => k === this.props.categoryName)
    const newCategoryIndex = oldCategoryNames.findIndex(k => k === swapCategoryName)


    let newCategoryNames = oldCategoryNames.set(oldCategoryIndex, swapCategoryName)
    newCategoryNames = newCategoryNames.set(newCategoryIndex, this.props.categoryName)


    // new ordered map for the swapping categories
    let newOrderedCategories = Immutable.OrderedMap()

    newCategoryNames.forEach( categoryName => {
      newOrderedCategories = newOrderedCategories.set(categoryName, columnCategories.get(categoryName))
    })

    this.props.onCategoryArrowKeyDown(this.props.columnName, newOrderedCategories)

  }

  handleDragMove(e) {
    e.stopPropagation()
    e.preventDefault()

    // No need to fire unneeded events if drag hasn't started.
    if(!this.props.categoryDragStatus.get('isStarted')) return 

    this.props.onCategoryDrag(e.clientY)
  }

  handleDragEnd(e) {
    const eventString = this.props.columnName === 'year' ? `${this.props.categoryName}` : `${this.props.schema.getIn([this.props.columnName, this.props.categoryName, 'en']).toLowerCase()}`
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','filterbox'])}`,
      'dragged', 
      eventString
    )
    e.stopPropagation()
    e.preventDefault()

    // No need to fire unneeded events if drag hasn't started.
    if(!this.props.categoryDragStatus.get('isStarted')) return

    this.props.onCategoryDragEnded(false)

    const filteredData = IncidentComputations.filteredIncidents(
      this.props.data,
      this.props.columns,
      this.props.categories
    )

    const categoryHeights = WorkspaceComputations.categoryHeights(
      this.props.showEmptyCategories,
      this.props.viewport,
      filteredData,
      this.props.columns,
      this.props.categories, 
      this.props.categoryDragStatus.get('columnName')) 

    const newY = this.props.categoryDragStatus.get('newY') - 
                 this.props.categoryDragStatus.get('offset')

    this.props.onCategorySnap(
      this.props.categoryDragStatus.get('columnName'), 
      this.props.categoryDragStatus.get('categoryName'), 
      this.props.categoryDragStatus.get('oldY'), 
      newY, 
      categoryHeights)

    // Remove the window event handlers previously attached.
    window.removeEventListener('mouseup', categoryWindowEndHandler)
    window.removeEventListener('mousemove', categoryWindowMoveHandler)
  }

  handleTouchStart(e) {
    e.stopPropagation()
    e.preventDefault()

    const oldY = this.props.y
    const offset = e.touches[0].clientY - oldY

    this.props.onCategoryDragStarted(
      true, 
      this.props.columnName, 
      this.props.categoryName, 
      oldY, 
      e.clientY, 
      offset)
  }

  handleTouchMove(e) {
    e.stopPropagation()
    e.preventDefault()

    // No need to fire unneeded events if drag hasn't started.
    if(!this.props.categoryDragStatus.get('isStarted')) return 

    this.props.onCategoryDrag(e.touches[0].clientY)
  }

  handleTouchEnd(e) {
    const eventString = this.props.columnName === 'year' ? `${this.props.categoryName}` : `${this.props.schema.getIn([this.props.columnName, this.props.categoryName, 'en']).toLowerCase()}`
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','filterbox'])}`,
      'touch dragged', 
      eventString
    )
    e.stopPropagation()
    e.preventDefault()

    // No need to fire unneeded events if drag hasn't started.
    if(!this.props.categoryDragStatus.get('isStarted')) return

    this.props.onCategoryDragEnded(false)

    const filteredData = IncidentComputations.filteredIncidents(
      this.props.data,
      this.props.columns,
      this.props.categories
    )

    const categoryHeights = WorkspaceComputations.categoryHeights(
      this.props.showEmptyCategories,
      this.props.viewport,
      filteredData,
      this.props.columns,
      this.props.categories, 
      this.props.categoryDragStatus.get('columnName')) 

    const newY = this.props.categoryDragStatus.get('newY') - 
                 this.props.categoryDragStatus.get('offset')

    this.props.onCategorySnap(
      this.props.categoryDragStatus.get('columnName'), 
      this.props.categoryDragStatus.get('categoryName'), 
      this.props.categoryDragStatus.get('oldY'), 
      newY, 
      categoryHeights)
  }

  lineToCategory() {
    return <line className='filterBoxLine'
      x1 = { -Constants.get('categoryLabelOffset') }
      y1 = { this.buttonHeight() / 2 }
      x2 = '0'
      y2 = { this.buttonHeight() / 2 }
    />
  }

  onShowOnlyClick() {
    const eventString = this.props.columnName === 'year' ? `${this.props.categoryName} show only` : `${this.props.schema.getIn([this.props.columnName, this.props.categoryName, 'en']).toLowerCase()} show only`
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','filterbox'])}`, 
      'selected', 
      eventString
    )
    this.props.onShowOnlyClick(this.props.columnName, this.props.categoryName)
  }

  onShowOnlyKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.onShowOnlyClick()
    }
  }

  onHideClick() {
    const eventString = this.props.columnName === 'year' ? `${this.props.categoryName} hide` : `${this.props.schema.getIn([this.props.columnName, this.props.categoryName, 'en']).toLowerCase()} hide`
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','filterbox'])}`,
      'selected', 
      eventString
    )
    this.props.onHideClick(this.props.columnName, this.props.categoryName)
  }

  onHideKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.onHideClick()
    }
  }

  onResetClick() {
    const eventString = this.props.columnName === 'year' ? `${this.props.categoryName} reset` : `${this.props.schema.getIn([this.props.columnName, this.props.categoryName, 'en']).toLowerCase()} reset`
    this.props.analytics.reportEvent(
      `${Constants.getIn(['analyticsCategory','filterbox'])}`,
      'selected', 
      eventString
    )
    this.props.onResetClick(this.props.columnName)
  }

  onResetKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.onResetClick()
    }
  }

  render() {
    const transform = `translate(${this.props.width + Constants.get('categoryLabelOffset')}, ${this.props.y})`

    return <g transform = { transform }>
      { this.buttons() }
      { this.dragButton() }
    </g>
  }
  // TODO: This was not requested by design, but I have disabled the line from
  // the filter box to the category. Since the filterbox is not always adjacent 
  // to a category, we can't guarantee that this line will connect to anything.
  // { this.lineToCategory() }
}

const mapStateToProps = state => {
  return {
    language: state.language,
    categories: state.categories,
    data: state.data, 
    columns: state.columns,
    categoryDragStatus: state.categoryDragStatus,
    showEmptyCategories: state.showEmptyCategories,
    viewport: state.viewport,
    analytics: state.analytics,
    schema: state.schema,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onShowOnlyClick: (columnName, categoryName) => {
      dispatch(DeactivateAllCategoriesExceptOneCreator(columnName, categoryName))
    },
    onHideClick: (columnName, categoryName) => {
      dispatch(HideFilterboxCreator())
      dispatch(DeactivateCategoryCreator(columnName, categoryName))
    },
    onResetClick: columnName => {
      dispatch(ActivateAllCategoriesForColumnCreator(columnName))
    },
    onCategoryDragStarted: (isStarted, columnName, categoryName, oldY, newY, offset) => {
      dispatch(DragCategoryStartedCreator(isStarted, columnName, categoryName, oldY, newY, offset))
    },
    onCategoryDrag: (newY) => {
      dispatch(DragCategoryCreator(newY))
    },
    onCategoryDragEnded: (isStarted) => {
      dispatch(DragCategoryEndedCreator(isStarted))
    },
    onCategorySnap: (columnName, categoryName, oldY, newY, categoryHeights) => {
      dispatch(SnapCategoryCreator(columnName, categoryName, oldY, newY, categoryHeights))
    },
    onCategoryArrowKeyDown: (columnName, categoryName) => {
      dispatch(SetCategoriesForColumnCreator(columnName, categoryName))
    }
  }
}



export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Filterbox)
