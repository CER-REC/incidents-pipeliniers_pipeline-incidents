const React = require('react')
const ReactRedux = require('react-redux')

const IncidentPathComputations = require('../IncidentPathComputations.js')
const Constants = require('../Constants.js')


class ColumnPaths extends React.Component {

  paths() {

    const selectedCategoryPathMeasurements = IncidentPathComputations.flowPathMeasurements(
      this.props.data,
      this.props.columns,
      this.props.categories,
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.categoryHoverState,
      this.props.filterboxActivationState
    )

    const paths = []

    const pathCurves = IncidentPathComputations.pathCurves(
      this.props.data,
      this.props.columns,
      this.props.categories,
      this.props.showEmptyCategories,
      this.props.viewport, 
      selectedCategoryPathMeasurements, 
      this.props.columnName
    )

    let fillOpacity
    if (this.props.columnName === this.props.columns.last()) {
      fillOpacity = Constants.getIn(['columnPaths','lastColumnOpacity'])
    }

    pathCurves.forEach( pathCurve => {
      paths.push(<path
        d = { pathCurve.get('d') }
        key = { pathCurve.get('sourceCategory') + pathCurve.get('destinationCategory') }
        fill = '#bcbcbc'
        fillOpacity = {fillOpacity}
      />)
    })

    return paths

  }


  render() {
    return <g>{ this.paths() }</g>
  }

}





const mapStateToProps = state => {
  return {
    data: state.data,
    columns: state.columns,
    categories: state.categories,
    showEmptyCategories: state.showEmptyCategories,
    viewport: state.viewport,
    categoryHoverState: state.categoryHoverState,
    filterboxActivationState: state.filterboxActivationState, 
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(ColumnPaths)