const React = require('react')
const ReactRedux = require('react-redux')
const Immutable = require('immutable')
const D3 = require('d3')

const WorkspaceComputations = require('../WorkspaceComputations.js')
const IncidentPathComputations = require('../IncidentPathComputations.js')



class SelectedIncidentPaths extends React.Component {

  departureHeights() {

    const categoryVerticalPositions = WorkspaceComputations.categoryVerticalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories,
      this.props.columnName
    )

    return IncidentPathComputations.incidentHeightsInColumn(
      this.props.selectedIncident,
      this.props.columnName,
      this.props.data,
      this.props.columns,
      this.props.categories,
      this.props.showEmptyCategories,
      this.props.viewport,
      categoryVerticalPositions
    )
  }

  destinationHeights() {

    const columnIndex = this.props.columns.indexOf(this.props.columnName)

    if (columnIndex === this.props.columns.count() - 1) {
      // We are at the end of the list of displayed columns
      return this.sidebarDestinationHeights()
    }
    else {
      // We are adjacent to an ordinary column
      return this.columnDestinationHeights(columnIndex)
    }
  }

  destinationPositions(horizontalPositions) {

    const columnIndex = this.props.columns.indexOf(this.props.columnName)

    if (columnIndex === this.props.columns.count() - 1) {
      // We are at the end of the list of displayed columns
      return horizontalPositions.get('sideBar')
    }
    else {
      // We are adjacent to an ordinary column
      const nextColumnName = this.props.columns.get(columnIndex + 1)
      return horizontalPositions.getIn(['columns', nextColumnName])
    }
  }


  columnDestinationHeights(columnIndex) {

    // Is there a column to our right that we should draw to?
    const nextColumnName = this.props.columns.get(columnIndex + 1)
    const displayedColumnRight = typeof nextColumnName !== 'undefined' && nextColumnName !== 'map'

    if (!displayedColumnRight) {
      return Immutable.List()
    }

    const categoryVerticalPositions = WorkspaceComputations.categoryVerticalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories,
      nextColumnName
    )

    return IncidentPathComputations.incidentHeightsInColumn(
      this.props.selectedIncident,
      nextColumnName,
      this.props.data,
      this.props.columns,
      this.props.categories,
      this.props.showEmptyCategories,
      this.props.viewport,
      categoryVerticalPositions
    )
  }

  sidebarDestinationHeights() {

    // Is there a sidebar column to draw to?
    const sidebarColumns = WorkspaceComputations.sidebarColumns(this.props.columns)
    const sidebarColumnRight = sidebarColumns.count() > 0 && sidebarColumns.get(0) !== 'map'

    if (!sidebarColumnRight) {
      return Immutable.List()
    }

    const sidebarCategoryVerticalPositions = WorkspaceComputations.sidebarCategoryVerticalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories,
      sidebarColumns.get(0)
    )

    return IncidentPathComputations.incidentHeightsInColumn(
      this.props.selectedIncident,
      sidebarColumns.get(0),
      this.props.data,
      this.props.columns,
      this.props.categories,
      this.props.showEmptyCategories,
      this.props.viewport,
      sidebarCategoryVerticalPositions
    )


  }





  render() {

    if (this.props.selectedIncident === null) {
      return null
    }

    const departureHeights = this.departureHeights()
    const destinationHeights = this.destinationHeights()

    const horizontalPositions = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)

    const departurePositions = horizontalPositions.getIn(['columns', this.props.columnName])
    const destinationPositions = this.destinationPositions(horizontalPositions)

    const paths = []

    departureHeights.forEach( departureHeight => {
      destinationHeights.forEach( destinationHeight => {

        const d3path = D3.path()
        d3path.moveTo(
          departurePositions.get('x') + departurePositions.get('width'),
          departureHeight
        )

        const controlPointX = (
          departurePositions.get('x') + departurePositions.get('width') + 
          destinationPositions.get('x')
        ) / 2
        
        // control x, control y, x, y
        d3path.quadraticCurveTo(
          controlPointX,
          (departureHeight + destinationHeight) / 2,
          destinationPositions.get('x'),
          destinationHeight)

        paths.push(
          <path
            d = { d3path.toString() }
            strokeWidth = '2px'
            stroke = '#000'
            fill = 'none'
          /> 
        )


      })
    })

    return <g> { paths } </g>

  }


}



const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    columns: state.columns,
    categories: state.categories,
    data: state.data,
    showEmptyCategories: state.showEmptyCategories,
    selectedIncident: state.selectedIncident
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(SelectedIncidentPaths)