const React = require('react')
const ReactRedux = require('react-redux')
const D3 = require('d3')

const WorkspaceComputations = require('../WorkspaceComputations.js')
const IncidentPathComputations = require('../IncidentPathComputations.js')
const Constants = require('../Constants.js')


class SelectedIncidentPaths extends React.Component {


  destinationColumnName() {
    if (this.props.columnName === this.props.columns.last()) {
      return null
    }

    const columnIndex = this.props.columns.indexOf(this.props.columnName)
    const destinationColumnName = this.props.columns.get(columnIndex + 1)

    if (destinationColumnName === undefined || destinationColumnName === 'map') {
      return null
    }

    return destinationColumnName
  }


  paths() {

    const destinationColumnName = this.destinationColumnName()
    if (destinationColumnName === null) {
      return null
    }

    const selectedIncidentPaths = IncidentPathComputations.selectedIncidentPaths(
      this.props.data,
      this.props.columns,
      this.props.categories,
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.selectedIncidents
    )

    const sourceIncidentHeights = selectedIncidentPaths.get(this.props.columnName)
    const destinationIncidentHeights = selectedIncidentPaths.get(destinationColumnName)


    const horizontalPositions = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)

    const sourcePositions = horizontalPositions.getIn(['columns', this.props.columnName])
    const destinationPositions = horizontalPositions.getIn(['columns', destinationColumnName])


    const paths = []

    sourceIncidentHeights.forEach( (sourceHeights, incident) => {

      const destinationHeights = destinationIncidentHeights.get(incident)

      if (sourceHeights === undefined || destinationHeights === undefined) {
        return
      }

      sourceHeights.forEach( (sourceHeight, i) => {
        destinationHeights.forEach( (destinationHeight, j) => {

          const sourcePoint = {
            x: sourcePositions.get('x') + sourcePositions.get('width'),
            y: sourceHeight
          }

          const destinationPoint = {
            x: destinationPositions.get('x'),
            y: destinationHeight
          }

          const d3path = D3.path()
          d3path.moveTo(
            sourcePoint.x,
            sourcePoint.y
          )

          const curveControlThreshold = IncidentPathComputations.curveControlThreshold(sourcePoint.x, destinationPoint.x)

          d3path.bezierCurveTo(
            // control point 1
            sourcePoint.x + curveControlThreshold,
            sourcePoint.y,

            // control point 2
            destinationPoint.x - curveControlThreshold,
            destinationPoint.y,

            // destination
            destinationPoint.x,
            destinationPoint.y
          )

          paths.push(
            <path
              d = { d3path.toString() }
              strokeWidth = { Constants.getIn(['selectedIncidentPath', 'strokeWidth']) }
              stroke = { Constants.getIn(['selectedIncidentPath', 'colourBetweenColumns']) }
              fill = 'none'
              key = { `incidentPath-${incident.get('incidentNumber')}-${i}-${j}` }
            /> 
          )

        })
      })

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
    // TODO: dev mode only!!!!!!!!!
    selectedIncidents: state.pinnedIncidents,
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(SelectedIncidentPaths)