const React = require('react')
const ReactRedux = require('react-redux')
const Immutable = require('immutable')

const ColumnComputations = require('../ColumnComputations.js')
const IncidentPathComputations = require('../IncidentPathComputations.js')



class SelectedIncidentPaths extends React.Component {

  departureHeights() {
    return IncidentPathComputations.incidentHeightsInColumn(
      this.props.selectedIncident,
      this.props.columnName,
      this.props.data,
      this.props.columns,
      this.props.categories,
      this.props.showEmptyCategories,
      this.props.viewport
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


  columnDestinationHeights(columnIndex) {

    // Is there a column to our right that we should draw to?
    const nextColumnName = this.props.columns.get(columnIndex + 1)
    const displayedColumnRight = typeof nextColumnName !== 'undefined' && nextColumnName !== 'map'

    if (!displayedColumnRight) {
      return Immutable.List()
    }

    return IncidentPathComputations.incidentHeightsInColumn(
      this.props.selectedIncident,
      nextColumnName,
      this.props.data,
      this.props.columns,
      this.props.categories,
      this.props.showEmptyCategories,
      this.props.viewport
    )
  }

  sidebarDestinationHeights() {

    // Is there a sidebar column to draw to?
    const sidebarColumns = ColumnComputations.sidebarColumns(this.props.columns)
    const sidebarColumnRight = sidebarColumns.count() > 0 && sidebarColumns.get(0) !== 'map'

    if (!sidebarColumnRight) {
      return Immutable.List()
    }

    const destinationHeights = []
    // get all the categories this incident belongs to
    // get its vertical position in all of those categories
    // add a point per category

    return destinationHeights
  }





  render() {

    if (this.props.selectedIncident === null) {
      return null
    }

    const departureHeights = this.departureHeights()
    const destinationHeights = this.destinationHeights()

    // const paths = []
    // for (const departurePoint of departureHeights) {
    //   for (const destinationPoint of destinationHeights) {
    //     console.log('draw path like',
    //       departurePoint,
    //       destinationPoint)
    //   }
    // }


    // console.log(this.props.columnName, departureHeights.toJS())
    // console.log(this.props.columnName, destinationHeights.toJS())
    return null
    return paths

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