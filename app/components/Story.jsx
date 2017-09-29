
const React = require('react')
const ReactRedux = require('react-redux')

require('./Story.scss')

const Constants = require('../Constants.js')

class Story extends React.Component {
  render() {
    return <div 
      className='story'
      id={this.props.position}>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    showEmptyCategories: state.showEmptyCategories,
    viewport: state.viewport,
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(Story)