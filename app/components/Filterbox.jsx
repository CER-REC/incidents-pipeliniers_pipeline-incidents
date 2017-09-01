const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const CategoryComputations = require('../CategoryComputations.js')

const DeactivateAllCategoriesExceptOneCreator = require('../actionCreators/DeactivateAllCategoriesExceptOneCreator.js')
const DeactivateCategoryCreator = require('../actionCreators/DeactivateCategoryCreator.js')
const HideFilterboxCreator = require('../actionCreators/HideFilterboxCreator.js')

const FilterboxButton = require('./FilterBoxButton.jsx')
const Tr = require('../TranslationTable.js')

require('./Filterbox.scss')


class Filterbox extends React.Component {

  showShowOnlyButton() {
    return true
  }

  showHideButton() {
    return true
  }

  showResetButton() {
    return true
  }

  buttonCount() {
    let count = 0
    if (this.showShowOnlyButton()) {
      count += 1
    }
    if (this.showHideButton()) {
      count += 1
    }
    if (this.showResetButton()) {
      count += 1
    }
    return count
  }

  buttonHeight() {
    return this.buttonCount() * Constants.getIn(['filterbox', 'rectVerticalOffset'])
  }


  buttons() {

    const buttons = []
    let currentY = 0

    if (this.showShowOnlyButton()) {
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

    if (this.showHideButton()) {
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

    if (this.showResetButton()) {
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
        x = { CategoryComputations.filterboxDragImageX(0) }
        y = '0'
        width = { Constants.getIn(['filterbox', 'dragIconWidth']) }
        height = { this.buttonHeight() }
      />
    </g> 
  }
        // y = { Constants.getIn(['filterbox', 'dragIconVerticalOffset']) }

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
    console.error("TODO")
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
  }
}



module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Filterbox)