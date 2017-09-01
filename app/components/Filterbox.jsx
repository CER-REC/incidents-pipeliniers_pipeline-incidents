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



  dragButton() {
    return <g className='filterBoxButton'>
      <rect
        className='filterBoxRect'
        x = { Constants.getIn(['filterbox', 'filterButtonWidth']) }
        y = '0'
        width = { Constants.getIn(['filterbox', 'dragButtonWidth']) }
        height = { this.buttonHeight() }
      />
      <image 
        xlinkHref='images/vertical_drag.svg' 
        className = 'verticalDrag'
        x = { Constants.getIn(['filterbox', 'filterButtonWidth']) + Constants.getIn(['filterbox', 'dragIconHorizontalOffset']) }
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
    console.log('DRAG STARTED')
  }

  handleDragMove(e) {
    e.stopPropagation()
    e.preventDefault()
    console.log('DRAG MOVE')
  }

  handleDragEnd(e) {
    e.stopPropagation()
    e.preventDefault()
    console.log('DRAG ENDED')
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
    columns: state.columns
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
    onCategoryDrag: (newX) => {
      dispatch(DragCategoryCreator(newX))
    },
    onCategoryDragEnded: (isStarted) => {
      dispatch(DragCategoryEndedCreator(isStarted))
    },
    onCategorySnap: (columnName, categoryName, oldY, newY, viewport) => {
      dispatch(SnapCategoryCreator(columnName, categoryName, oldY, newY, viewport))
    }
  }
}



module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Filterbox)