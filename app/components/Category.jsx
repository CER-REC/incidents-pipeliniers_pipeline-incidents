const React = require('react')
const ReactRedux = require('react-redux')

// const WorkspaceComputations = require('../WorkspaceComputations.js')


class Category extends React.Component {

  render() {

    return <g></g>
  }
  // <rect
  //   x={ WorkspaceComputations.sidebarX(this.props.columns, this.props.viewport) }
  //   y={ WorkspaceComputations.topBarHeight() }
  //   width={ WorkspaceComputations.sidebarWidth(this.props.columns) }
  //   height={ WorkspaceComputations.columnHeight(this.props.viewport) }
  //   fill='#DDDDFF'
  // />
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    columns: state.columns,
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(Category)