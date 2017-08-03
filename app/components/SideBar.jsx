const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../WorkspaceComputations.js')

require('./Sidebar.scss')

class Sidebar extends React.Component {

  render() {
    return <g/>
  }
    // return <g>
    //   <rect
    //     x={ this.props.viewport.get('x') - Constants.getIn(['Sidebar', 'width']) }
    //     y={ WorkspaceComputations.topBarHeight() }
    //     width={ Constants.getIn(['Sidebar', 'width']) }
    //     height={ Constants.getIn(['Sidebar', 'height']) }
    //     fill='#FFDDDD'
    //   />
    // </g>
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(Sidebar)