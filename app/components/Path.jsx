const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')
const CategoryComputations = require('../CategoryComputations.js')
const IncidentComputations = require('../IncidentComputations.js')
const Constants = require('../Constants.js')

require('./ColumnPaths.scss')

class Path extends React.Component {
  hoverLogic () {
    const isDestinationCategoryHovered = (this.props.categoryHoverState.get('categoryName') === this.props.destinationCategory.categoryName) &&
      this.props.categoryHoverState.get('columnName') === this.props.destinationColumnName
    
    const isCategoryHovered = (this.props.categoryHoverState.get('categoryName') === this.props.sourceCategory.categoryName) &&
      this.props.categoryHoverState.get('columnName') === this.props.columnName
    const isAnythingHovered = this.props.categoryHoverState.get('columnName') !== null
      
    if (!isAnythingHovered) {
      return Constants.getIn(['columnPaths', 'defaultColumn'])
    }
    else if (isCategoryHovered === true && isAnythingHovered === true) {
      return Constants.getIn(['columnPaths', 'columnHovered'])
    }
    else if (isDestinationCategoryHovered === true) {
      return Constants.getIn(['columnPaths', 'columnHovered'])
    }
    else if (isCategoryHovered === false && isAnythingHovered === true) {
      return Constants.getIn(['columnPaths', 'notColumnHovered'])
    }

    console.log('there')
  }

  render() {
    return <path 
      d={this.props.d} 
      fill={this.hoverLogic()} 
      className='ColumnPaths'>
    </path>
  }
}

const mapStateToProps = state => {
  return {
    showEmptyCategories: state.showEmptyCategories,
    viewport: state.viewport,
    data: state.data,
    categoryHoverState: state.categoryHoverState,
    columns: state.columns,
    categories: state.categories,
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(Path)