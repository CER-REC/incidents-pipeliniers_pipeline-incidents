const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')

require('./Sidebar.scss')

class Sidebar extends React.Component {

  // TODO: we should think about sidebar rendering in two special cases:
  // - when the sidebar is empty, do we show something to indicate where it is?
  // - when the user is dragging a column around, should we show something on
  //   the sidebar to indicate that it is a drop target?


  render() {

    const measurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)
      .get('sideBar')

    return <g>
      <rect
        x={ measurements.get('x') }
        y={ measurements.get('y') }
        width={ measurements.get('width') }
        height={ measurements.get('height') }
        fill='#DDDDFF'
      />
    </g>
  }
}

const mapStateToProps = state => {
  return {
    showEmptyCategories: state.showEmptyCategories,
    viewport: state.viewport,
    data: state.data,
    columns: state.columns,
    categories: state.categories,
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(Sidebar)