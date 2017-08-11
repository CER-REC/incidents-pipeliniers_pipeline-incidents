const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')

class MapColumn extends React.Component {

  render() {

    const measurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)
      .getIn(['columns', 'map'])

    return <g>
      <rect
        x={ measurements.get('x') }
        y={ measurements.get('y') }
        width={ measurements.get('width') }
        height={ measurements.get('height') }
        fill='#888'
      />
    </g>
  }
}




const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    columns: state.columns,
    categories: state.categories,
    data: state.data,
    showEmptyCategories: state.showEmptyCategories,
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(MapColumn)