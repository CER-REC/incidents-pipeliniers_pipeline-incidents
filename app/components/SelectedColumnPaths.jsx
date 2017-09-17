const React = require('react')
const ReactRedux = require('react-redux')

const Path = require('./Path.jsx')
const WorkspaceComputations = require('../WorkspaceComputations.js')
const IncidentComputations = require('../IncidentComputations.js')
const IncidentPathComputations = require('../IncidentPathComputations.js')
const Constants = require('../Constants.js')



class ColumnPaths extends React.Component {



  paths() {

    const filteredData = IncidentComputations.filteredIncidents(
      this.props.data, 
      this.props.columns, 
      this.props.categories)

    const horizontalPositions = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      filteredData,
      this.props.columns,
      this.props.categories)


    const selectedCategoryPathMeasurements = IncidentPathComputations.selectedCategoryPathMeasurements(
      filteredData,
      this.props.columns,
      this.props.categories,
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.categoryHoverState,
      this.props.filterboxActivationState
    )

    const nextToSidebarColumn = this.props.columnName === this.props.columns.last()

    let columnPair
    if (nextToSidebarColumn) {
      // Rendering paths to the sidebar
      columnPair = selectedCategoryPathMeasurements.get('sidebarColumnPair')
    }
    else {
      // Rendering paths to another column
      columnPair = selectedCategoryPathMeasurements.get('columnPairs').find( columnPairSearch => {
        return columnPairSearch.getIn(['source', 'columnName']) === this.props.columnName
      })
    }

    if (columnPair === undefined) {
      return []
    }

    const sourceX = horizontalPositions.getIn(['columns', this.props.columnName]).get('x') + WorkspaceComputations.columnWidth(this.props.columns)
    
    let destinationX
    if (nextToSidebarColumn) {
      destinationX = horizontalPositions.getIn(['sideBar', 'x'])
    }
    else {
      destinationX = horizontalPositions.getIn([
        'columns', 
        columnPair.getIn(['destination', 'columnName'])
      ]).get('x')
    }


    const paths = []

    const curveControlThreshold = Math.abs(sourceX - destinationX) / Constants.get('pathCurveControlFactor')

    columnPair.get('pathMeasurements').forEach( (sourceMeasurements, sourceCategory) => {
      sourceMeasurements.forEach( (measurements, destinationCategory) => {

        const sourceMeasurement = measurements.get('sourceMeasurement')
        const destinationMeasurement = measurements.get('destinationMeasurement')

        const sourceY1 = sourceMeasurement.get('y1')
        const sourceY2 = sourceMeasurement.get('y2')
        const destinationY1 = destinationMeasurement.get('y1')
        const destinationY2 = destinationMeasurement.get('y2')

        let d = `M ${sourceX} ${sourceY1} `
        d += `C ${sourceX + curveControlThreshold} ${sourceY1} `
        d += `${destinationX - curveControlThreshold} ${destinationY1} `
        d += `${destinationX} ${destinationY1} `
        d += `L ${destinationX} ${destinationY2} `
        d += `C ${destinationX - curveControlThreshold} ${destinationY2} `
        d += `${sourceX + curveControlThreshold} ${sourceY2} `
        d += `${sourceX} ${sourceY2}`

        const currentPath = <Path
          d={d}
          key={sourceCategory + destinationCategory} 
          sourceCategory={sourceCategory}
          destinationCategory={destinationCategory}
          columnName={this.props.columnName}
          destinationColumnName={columnPair.getIn(['destination', 'columnName'])}
          fillColour = "#666666"
        />

        paths.push(currentPath)
      })

    })

    return paths
  }


  render() {
    return <g className='SelectedColumnPaths'>{ this.paths() }</g>
  }

}





const mapStateToProps = state => {
  return {
    data: state.data,
    columns: state.columns,
    categories: state.categories,
    showEmptyCategories: state.showEmptyCategories,
    viewport: state.viewport,

    // Are these two going to be a performance problem? 
    categoryHoverState: state.categoryHoverState,
    filterboxActivationState: state.filterboxActivationState, 

  }
}

module.exports = ReactRedux.connect(mapStateToProps)(ColumnPaths)