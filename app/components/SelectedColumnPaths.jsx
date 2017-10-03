const React = require('react')
const ReactRedux = require('react-redux')

const IncidentPathComputations = require('../IncidentPathComputations.js')
const CategoryComputations = require('../CategoryComputations.js')
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

    const selectedIncidentPaths = IncidentPathComputations.selectedIncidentPaths(
      this.props.data,
      this.props.columns,
      this.props.categories,
      this.props.showEmptyCategories,
      this.props.viewport,
      selectedIncidents,
      hoveredIncident
    )
    //const destinationColumn = IncidentPathComputations.columnPair.getIn(['destination', 'columnName'])

    let fillOpacity
    if(Constants.getIn(['columnTypes', 'SIDEBAR'])) {
      fillOpacity = '0.2'
    } else {
      fillOpacity = '0.6'
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