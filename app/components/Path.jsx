const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')

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
  }

  render() {
    return <path 
      d={this.props.d} 
      fill={this.hoverLogic()} 
      className='ColumnPaths'
    />
  }
}

const mapStateToProps = state => {
  return {
    categoryHoverState: state.categoryHoverState,
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(Path)