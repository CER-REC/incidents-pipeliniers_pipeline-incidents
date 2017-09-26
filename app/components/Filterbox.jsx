const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')

const DeactivateAllCategoriesExceptOneCreator = require('../actionCreators/DeactivateAllCategoriesExceptOneCreator.js')
const DeactivateCategoryCreator = require('../actionCreators/DeactivateCategoryCreator.js')
const HideFilterboxCreator = require('../actionCreators/HideFilterboxCreator.js')
const ActivateAllCategoriesForColumnCreator = require('../actionCreators/ActivateAllCategoriesForColumnCreator.js')
const DragCategoryStartedCreator = require('../actionCreators/DragCategoryStartedCreator.js')
const DragCategoryCreator = require('../actionCreators/DragCategoryCreator.js')
const DragCategoryEndedCreator = require('../actionCreators/DragCategoryEndedCreator.js')
const SnapCategoryCreator = require('../actionCreators/SnapCategoryCreator.js')

const FilterboxButton = require('./FilterBoxButton.jsx')
const Tr = require('../TranslationTable.js')

const FilterboxComputations = require('../FilterboxComputations.js')
const WorkspaceComputations = require('../WorkspaceComputations.js')
const IncidentComputations = require('../IncidentComputations.js')

let categoryWindowMoveHandler = null
let categoryWindowEndHandler = null

require('./Filterbox.scss')


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
      />)
      currentY += Constants.getIn(['filterbox', 'rectVerticalOffset'])
    }

    return buttons
  }

  filterBoxWidthX() {
    if(this.props.language === 'en') {
      return Constants.getIn(['filterbox', 'filterButtonWidth']) 
    }
    if(this.props.language === 'fr') {
      return Constants.getIn(['filterbox', 'filterButtonWidthFr'])
    }
  }

  dragButton() {
    return <g className='filterBoxButton'>
      <rect
        className='filterBoxRect'
        x = { this.filterBoxWidthX()}
        y = '0'
        width = { Constants.getIn(['filterbox', 'dragButtonWidth']) }
        height = { this.buttonHeight() }
      />
      <image 
        xlinkHref='images/vertical_drag.svg' 
        className = 'verticalDrag'
        x = { this.filterBoxWidthX() + Constants.getIn(['filterbox', 'dragIconHorizontalOffset']) }
        y = '0'
        width = { Constants.getIn(['filterbox', 'dragIconWidth']) }
        height = { this.buttonHeight() }
        onMouseDown={this.handleDragStart.bind(this)}
        onMouseMove={this.handleDragMove.bind(this)}
        onMouseUp={this.handleDragEnd.bind(this)}
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

  handleDragMove(e) {
    e.stopPropagation()
    e.preventDefault()

    // No need to fire unneeded events if drag hasn't started.
    if(!this.props.categoryDragStatus.get('isStarted')) return 

    this.props.onCategoryDrag(e.clientY)
  }

  handleDragEnd(e) {
    e.stopPropagation()
    e.preventDefault()

    // No need to fire unneeded evenets if drag hasn't started.
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

  lineToCategory() {
    return <line className='filterBoxLine'
      x1 = { -Constants.get('categoryLabelOffset') }
      y1 = { this.buttonHeight() / 2 }
      x2 = '0'
      y2 = { this.buttonHeight() / 2 }
    />
  }

  onShowOnlyClick() {
    this.props.onShowOnlyClick(this.props.columnName, this.props.categoryName)
  }

  onHideClick() {
    this.props.onHideClick(this.props.columnName, this.props.categoryName)
  }

  onResetClick() {
    this.props.onResetClick(this.props.columnName)
  }

  render() {
    const transform = `translate(${this.props.width + Constants.get('categoryLabelOffset')}, ${this.props.y})`

    return <g transform = { transform }>
      { this.buttons() }
      { this.dragButton() }
      { this.lineToCategory() }
    </g>
  }
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onShowOnlyClick: (columnName, categoryName) => {
      dispatch(HideFilterboxCreator())
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
    }
  }
}



module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Filterbox)