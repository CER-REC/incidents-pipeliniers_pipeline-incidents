const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const CategoryComputations = require('../CategoryComputations.js')

const DeactivateAllCategoriesExceptOneCreator = require('../actionCreators/DeactivateAllCategoriesExceptOneCreator.js')
const DeactivateCategoryCreator = require('../actionCreators/DeactivateCategoryCreator.js')
const HideFilterboxCreator = require('../actionCreators/HideFilterboxCreator.js')

require('./Filterbox.scss')

const FILTER_TYPE = {
  SHOW_ONLY: 'SHOW_ONLY',
  HIDE: 'HIDE'
}

class Filterbox extends React.Component {
  
  filterButton(filterType, clickCallback) {
    return <g
      className = 'filterBoxButton'
      onClick = { clickCallback }
    >
      <rect
        className = 'filterBoxRect'
        y = {CategoryComputations.filterboxFilterButtonY(this.props.y, filterType) }
        x = { CategoryComputations.filterboxFilterButtonX(this.props.width) }
        width = { Constants.getIn(['filterbox', 'filterButtonWidth']) }
        height = { Constants.getIn(['filterbox', 'filterButtonHeight']) } >
      </rect>
      <image 
        xlinkHref = { Constants.getIn(['filterbox', filterType, 'imagePath']) }
        height = { Constants.getIn(['filterbox', 'iconSize']) }
        width = { Constants.getIn(['filterbox', 'iconSize']) }
        x = { CategoryComputations.filterboxFilterButtonImageX(this.props.width) }
        y = { CategoryComputations.filterboxFilterButtonImageY(this.props.y, filterType) } 
      />
      <text
        className = 'filterBox'
        height = { Constants.getIn(['filterbox', 'textHeight']) }
        width = { Constants.getIn(['filterbox', 'textWidth']) }
        x = {CategoryComputations.filterboxFilterButtonTextX(this.props.width) }
        y = {CategoryComputations.filterboxFilterButtonTextY(this.props.y, filterType) }
      >
        { Constants.getIn(['filterbox', filterType, 'text']) }
      </text>
    </g>
  }

  dragButton() {
    return <g className='filterBoxButton'>
      <rect
        className='filterBoxRect'
        y={this.props.y}
        x={CategoryComputations.filterboxDragButtonX(this.props.width)}
        width={Constants.getIn(['filterbox', 'dragButtonWidth'])}
        height={Constants.getIn(['filterbox', 'dragButtonHeight'])}>
      </rect>
      <image 
        xlinkHref='images/vertical_drag.svg' 
        className = 'verticalDrag'
        height = {Constants.getIn(['filterbox', 'dragIconHeight'])}
        width = {Constants.getIn(['filterbox', 'dragIconWidth'])}
        x= {CategoryComputations.filterboxDragImageX(this.props.width)}
        y= {CategoryComputations.filterboxDragImageY(this.props.y)}>
      </image>
    </g> 
  }

  lineToCategory() {
    return <line className='filterBoxLine'
      x1={this.props.width}
      y1={this.props.y + Constants.getIn(['filterbox', 'lineVerticalOffset'])}
      x2={this.props.width + Constants.get('categoryLabelOffset')}
      y2={this.props.y + Constants.getIn(['filterbox', 'lineVerticalOffset'])}>
    </line>
  }

  onShowOnlyClick() {
    this.props.onShowOnlyClick(this.props.columnName, this.props.categoryName)
  }

  onHideClick() {
    this.props.onHideClick(this.props.columnName, this.props.categoryName)
  }

  render() {
    return <g>
      {this.filterButton(FILTER_TYPE.SHOW_ONLY, this.onShowOnlyClick.bind(this))}
      {this.filterButton(FILTER_TYPE.HIDE, this.onHideClick.bind(this))}
      {this.dragButton()}
      {this.lineToCategory()}
    </g>
  }
}

const mapStateToProps = state => {
  return {}
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