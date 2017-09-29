const React = require('react')
const ReactRedux = require('react-redux')

const Path = require('./Path.jsx')
const IncidentPathComputations = require('../IncidentPathComputations.js')
const Constants = require('../Constants.js')


class PinnedIncidentPaths extends React.Component {

  paths() {

    const pinnedIncidentPathMeasurements = IncidentPathComputations.pinnedIncidentPathMeasurements(
      this.props.data,
      this.props.columns,
      this.props.categories,
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.pinnedIncidents
    )

    const paths = []

    const pathCurves = IncidentPathComputations.pathCurves(
      this.props.data,
      this.props.columns,
      this.props.categories,
      this.props.showEmptyCategories,
      this.props.viewport, 
      pinnedIncidentPathMeasurements, 
      this.props.columnName
    )

    pathCurves.forEach( pathCurve => {
      paths.push(<Path
        d = { pathCurve.get('d') }
        key = { pathCurve.get('sourceCategory') + pathCurve.get('destinationCategory') }
        fillColour = { Constants.get('nearBlack') }
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
    pinnedIncidents: state.pinnedIncidents, 
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(PinnedIncidentPaths)