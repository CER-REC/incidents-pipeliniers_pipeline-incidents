const React = require('react')
const ReactRedux = require('react-redux')

const IncidentPathComputations = require('../IncidentPathComputations.js')

class ColumnPaths extends React.Component {

  paths() {

    const pathMeasurements = IncidentPathComputations.pathMeasurements(
      this.props.data,
      this.props.columns,
      this.props.categories,
      this.props.showEmptyCategories,
      this.props.viewport
    )

    const paths = []

    const pathCurves = IncidentPathComputations.pathCurves(
      this.props.data,
      this.props.columns,
      this.props.categories,
      this.props.showEmptyCategories,
      this.props.viewport, 
      pathMeasurements,
      this.props.columnName
    )

    pathCurves.forEach( pathCurve => {
      paths.push(<path
        d = { pathCurve.get('d') }
        key = { pathCurve.get('sourceCategory') + pathCurve.get('destinationCategory') }
        fill = '#f0f0f0'
        fillOpacity = '0.4'
      />)

    })

    return paths

  }



  render() {
    return <g className='ColumnPaths'>{ this.paths() }</g>
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

module.exports = ReactRedux.connect(mapStateToProps)(ColumnPaths)