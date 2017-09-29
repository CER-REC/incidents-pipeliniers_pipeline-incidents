const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')

class Path extends React.Component {
  
  fillColour () {

    if (this.props.fillColour) {
      return this.props.fillColour
    }

    const isAnythingHovered = this.props.categoryHoverState.get('columnName') !== null
    const isFilterboxActivated = this.props.filterboxActivationState.get('columnName') !== null

      
    if (isAnythingHovered || isFilterboxActivated) {
      return Constants.getIn(['columnPaths', 'notColumnHovered'])
    }
    else {
      return Constants.getIn(['columnPaths', 'defaultColumn'])
    }

  }

  render() {
    return <path 
      d = { this.props.d }
      fill = { this.fillColour() }
      className = 'ColumnPaths'
      fillOpacity = '0.6'
    />
  }
}

const mapStateToProps = state => {
  return {
    categoryHoverState: state.categoryHoverState,
    filterboxActivationState: state.filterboxActivationState, 
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(Path)