const React = require('react')
const ReactRedux = require('react-redux')

const Path = require('./Path.jsx')
const WorkspaceComputations = require('../WorkspaceComputations.js')
const CategoryComputations = require('../CategoryComputations.js')
const IncidentComputations = require('../IncidentComputations.js')
const Constants = require('../Constants.js')

require('./ColumnPaths.scss')

class ColumnPaths extends React.Component {
  categoriesForColumn(columnIndex, filteredData) {
    const columnName = this.props.columns.get(columnIndex)
    const categoryHeights = WorkspaceComputations.categoryHeights(
      this.props.showEmptyCategories,
      this.props.viewport,
      filteredData, 
      this.props.columns,
      this.props.categories, 
      columnName) 

    let categoryY = WorkspaceComputations.columnY()

    return this.props.categories.get(columnName)
      .filter( (visible) => visible === true)
      .filter( (visible, categoryName) => categoryHeights.get(categoryName) !== undefined)
      .map( (visible, categoryName) => {
        const currentY = categoryY
        categoryY += categoryHeights.get(categoryName)
        const count = CategoryComputations.itemsInCategory(filteredData, columnName, categoryName)
        return {
          categoryName:categoryName,
          key:categoryName, 
          height:categoryHeights.get(categoryName),
          width:WorkspaceComputations.columnWidth(this.props.columns),
          x:WorkspaceComputations.horizontalPositions(this.props.showEmptyCategories,
            this.props.viewport, filteredData,
            this.props.columns, this.props.categories)
            .getIn(['columns', columnName]).get('x'),
          y:currentY,
          count: count,
          totalOutgoingIncidents: 0,
          totalIncomingIncidents: 0,
          intersectionThreshold: 0,
          outgoingCategories: [],
          incomingCategories: []
        }
      })
  }

  categoriesForSidebarColumn(sidebarColumnName, filteredData) {
    const measurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      filteredData,
      this.props.columns,
      this.props.categories)
      .get('sideBar')

    const columnHeight = WorkspaceComputations.rightSidebarColumnHeight(measurements.get('height'), this.props.columns)

    const categoryHeights = WorkspaceComputations.sideBarCategoryHeights(
      columnHeight,
      this.props.showEmptyCategories,
      this.props.viewport,
      filteredData, 
      this.props.columns,
      this.props.categories, 
      sidebarColumnName) 

    let categoryY = measurements.get('y')

    return this.props.categories.get(sidebarColumnName)
      .filter( (visible) => visible === true)
      .filter( (visible, categoryName) => categoryHeights.get(categoryName) !== undefined)
      .map( (visible, categoryName) => {
        const currentY = categoryY
        categoryY += categoryHeights.get(categoryName)
        const count = CategoryComputations.itemsInCategory(filteredData, sidebarColumnName, categoryName)
        return {
          categoryName:categoryName,
          key:categoryName, 
          height:categoryHeights.get(categoryName),
          x:measurements.get('x'),
          y:currentY,
          count: count,
          totalOutgoingIncidents: 0,
          totalIncomingIncidents: 0,
          intersectionThreshold: 0,
          outgoingCategories: [],
          incomingCategories: []
        }
      })
  }

  paths() {
    const filteredData = IncidentComputations.filteredIncidents(
      this.props.data, 
      this.props.columns, 
      this.props.categories)

    let pathArray = []

    const currentColumnIndex = this.props.columns.indexOf(this.props.columnName)
    const nextColumnIndex = currentColumnIndex + 1

    // Compute the paths to the left most sidebar column.
    if (currentColumnIndex >= this.props.columns.count() - 1) {
      return pathArray.concat(this.pathsToSideBar(filteredData))
    }

    let sourceColumn = {
      index: this.props.index,
      name: this.props.columnName,
      categories: this.categoriesForColumn(currentColumnIndex, filteredData),
      x: WorkspaceComputations.horizontalPositions(this.props.showEmptyCategories,
        this.props.viewport, filteredData,
        this.props.columns, this.props.categories)
        .getIn(['columns', this.props.columnName]).get('x') + 
        WorkspaceComputations.columnWidth(this.props.columns)
    }

    let destinationColumn = {
      index: this.props.index + 1,
      name: this.props.columns.get(nextColumnIndex),
      categories: this.categoriesForColumn(nextColumnIndex, filteredData),
      x: WorkspaceComputations.horizontalPositions(this.props.showEmptyCategories,
        this.props.viewport, filteredData,
        this.props.columns, this.props.categories)
        .getIn(['columns', this.props.columns.get(nextColumnIndex)]).get('x')
    }

    CategoryComputations.ComputeSourceAndDestinationColumnPaths(sourceColumn, destinationColumn, filteredData)

    sourceColumn.categories.forEach((sourceCategory) => {
      const pathsForSourceCategory = this.buildPathsForCategory(sourceColumn, 
        sourceCategory, destinationColumn)
      pathArray = pathArray.concat(pathsForSourceCategory)
    })

    return pathArray
  }

  pathsToSideBar(filteredData) {
    let pathArray = []

    const currentColumnIndex = this.props.columns.indexOf(this.props.columnName)
    const SideBarColumns = WorkspaceComputations.sidebarColumns(this.props.columns)
    const firstSideBarColumn = SideBarColumns.get(0)

    // Don't render paths to sidebar if sidebar is empty.
    if(firstSideBarColumn === undefined) return pathArray

    let sourceColumn = {
      index: currentColumnIndex,
      name: this.props.columnName,
      categories: this.categoriesForColumn(currentColumnIndex, filteredData),
      x: WorkspaceComputations.horizontalPositions(this.props.showEmptyCategories,
        this.props.viewport, filteredData,
        this.props.columns, this.props.categories)
        .getIn(['columns', this.props.columnName]).get('x') + 
        WorkspaceComputations.columnWidth(this.props.columns)
    }

    let destinationColumn = {
      name: firstSideBarColumn,
      categories: this.categoriesForSidebarColumn(firstSideBarColumn, filteredData),
      x: WorkspaceComputations.horizontalPositions(this.props.showEmptyCategories,
        this.props.viewport, filteredData,
        this.props.columns, this.props.categories)
        .getIn(['sideBar', 'x'])
    }

    CategoryComputations.ComputeSourceAndDestinationColumnPaths(sourceColumn, destinationColumn, filteredData)

    sourceColumn.categories.forEach((sourceCategory) => {
      const pathsForSourceCategory = this.buildPathsForCategory(sourceColumn, 
        sourceCategory, destinationColumn)
      pathArray = pathArray.concat(pathsForSourceCategory)
    })

    return pathArray
  }

  hoverLogic (sourceCategory, destinationCategory, destinationColumnName) {

    const isDestinationCategoryHovered = (this.props.categoryHoverState.get('categoryName') === destinationCategory.categoryName) &&
      this.props.categoryHoverState.get('columnName') === destinationColumnName
    
    const isCategoryHovered = (this.props.categoryHoverState.get('categoryName') === sourceCategory.categoryName) &&
      this.props.categoryHoverState.get('columnName') === this.props.columnName
    const isAnythingHovered = this.props.categoryHoverState.get('columnName') !== null
      
    if (!isAnythingHovered) {
      return Constants.getIn(['columnPaths', 'defaultColumn'])
    }
    else if (isCategoryHovered === true && isAnythingHovered === true) {
      return Constants.getIn(['columnPaths', 'columnHovered'])
    }
    else if (isDestinationCategoryHovered === true) {
      return Constants.getIn(['columnPaths', 'columnHovered'])
    }
    else if (isCategoryHovered === false && isAnythingHovered === true) {
      return Constants.getIn(['columnPaths', 'notColumnHovered'])
    }
  } 



  buildPathsForCategory(sourceColumn, sourceCategory, destinationColumn) {
    
    let pathsForCategory = []
    const curveControlThreshold = Math.abs(sourceColumn.x - destinationColumn.x) / 2.5

    sourceCategory.outgoingCategories.forEach((destinationCategoryKeyAndCount) => {
      let destinationCategory = destinationColumn.categories.get(destinationCategoryKeyAndCount.key)

      const sourceColumnY = sourceCategory.y
      const destinationColumnY = destinationCategory.y
      const sourceCurveHeight = sourceCategory.height * (destinationCategoryKeyAndCount.mutualIncidentCount/sourceCategory.count)
      const destinationCurveHeight = destinationCategory.height * (destinationCategoryKeyAndCount.mutualIncidentCount/destinationCategory.count)

      let d = `M ${sourceColumn.x} ${sourceColumnY} `
      d += `C ${sourceColumn.x + curveControlThreshold} ${sourceColumnY} `
      d += `${destinationColumn.x - curveControlThreshold} ${destinationColumnY} `
      d += `${destinationColumn.x} ${destinationColumnY} `
      d += `L ${destinationColumn.x} ${destinationColumnY + destinationCurveHeight} `
      d += `C ${destinationColumn.x - curveControlThreshold} ${destinationColumnY + destinationCurveHeight} `
      d += `${sourceColumn.x + curveControlThreshold} ${sourceColumnY + sourceCurveHeight} `
      d += `${sourceColumn.x} ${sourceColumnY + sourceCurveHeight}`

      const currentPath = <Path
        d={d}
        key={sourceCategory.categoryName + destinationCategory.categoryName} 
        sourceCategory={sourceCategory}
        destinationCategory={destinationCategory}
        columnName={this.props.columnName}
        destinationColumnName={destinationColumn.name}/>

      pathsForCategory.push(currentPath)

      sourceCategory.y += sourceCurveHeight
      sourceCategory.y -= sourceCategory.intersectionThreshold

      destinationCategory.y += destinationCurveHeight
      destinationCategory.y -= destinationCategory.intersectionThreshold
    })

    return pathsForCategory
  }

  render() {
    return <g>
      {this.paths()}
      }
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
    filters: state.filters,
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(ColumnPaths)