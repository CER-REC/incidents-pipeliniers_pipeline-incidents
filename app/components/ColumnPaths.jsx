const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')
const CategoryComputations = require('../CategoryComputations.js')
const Constants = require('../Constants.js')

require('./ColumnPaths.scss')

class ColumnPaths extends React.Component {
  categoriesForColumn(columnIndex) {
    const columnName = this.props.columns.get(columnIndex)
    const categoryHeights = WorkspaceComputations.categoryHeights(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data, 
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
        const count = CategoryComputations.itemsInCategory(this.props.data, columnName, categoryName)
        return {
          categoryName:categoryName,
          key:categoryName, 
          height:categoryHeights.get(categoryName),
          width:WorkspaceComputations.columnWidth(this.props.columns),
          x:WorkspaceComputations.horizontalPositions(this.props.showEmptyCategories,
            this.props.viewport, this.props.data,
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

  categoriesForSidebarColumn(sidebarColumnName) {
    const columnName = sidebarColumnName

    const measurements = WorkspaceComputations.horizontalPositions(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)
      .get('sideBar')

    const sideBarColumnsCount = Constants.get('columnNames').count() - this.props.columns.count()
    const columnHeight = measurements.get('height') - ((sideBarColumnsCount - 1) * 2)
    const columnY = measurements.get('y')
    const categoryHeights = WorkspaceComputations.sideBarCategoryHeights(
      columnHeight,
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data, 
      this.props.columns,
      this.props.categories, 
      columnName) 

    console.log(columnHeight)

    let categoryY = columnY

    return this.props.categories.get(columnName)
      .filter( (visible) => visible === true)
      .filter( (visible, categoryName) => categoryHeights.get(categoryName) !== undefined)
      .map( (visible, categoryName) => {
        const currentY = categoryY
        categoryY += categoryHeights.get(categoryName)
        const count = CategoryComputations.itemsInCategory(this.props.data, columnName, categoryName)
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
    let pathArray = []

    // TODO: This will probably have to change later on, but for
    // now we are disregarding paths to the SideBar because
    // we don't have one.
    const currentColumnIndex = this.props.columns.indexOf(this.props.columnName)
    const nextColumnIndex = currentColumnIndex + 1
    if (currentColumnIndex >= this.props.columns.count() - 1) {
      return pathArray.concat(this.pathsToSideBar())
    }

    let sourceColumn = {
      index: this.props.index,
      name: this.props.columnName,
      categories: this.categoriesForColumn(currentColumnIndex),
      x: WorkspaceComputations.horizontalPositions(this.props.showEmptyCategories,
        this.props.viewport, this.props.data,
        this.props.columns, this.props.categories)
        .getIn(['columns', this.props.columnName]).get('x') + 
        WorkspaceComputations.columnWidth(this.props.columns)
    }

    let destinationColumn = {
      index: this.props.index + 1,
      name: this.props.columns.get(nextColumnIndex),
      categories: this.categoriesForColumn(nextColumnIndex),
      x: WorkspaceComputations.horizontalPositions(this.props.showEmptyCategories,
        this.props.viewport, this.props.data,
        this.props.columns, this.props.categories)
        .getIn(['columns', this.props.columns.get(nextColumnIndex)]).get('x')
    }

    sourceColumn.categories.forEach((sourceCategory) => {
      destinationColumn.categories.forEach((destinationCategory) => {
        const mutualIncidentCount = CategoryComputations.itemsInBothCategories(
          this.props.data, 
          sourceColumn.name, 
          sourceCategory.categoryName, 
          destinationColumn.name, destinationCategory.categoryName)

        if(mutualIncidentCount !== 0) {
          sourceCategory.totalOutgoingIncidents += mutualIncidentCount
          destinationCategory.totalIncomingIncidents += mutualIncidentCount

          sourceCategory.outgoingCategories.push({'key': destinationCategory.key, 'mutualIncidentCount': mutualIncidentCount})
          destinationCategory.incomingCategories.push({'key': sourceCategory.key, 'mutualIncidentCount': mutualIncidentCount})
        }

        const multipleDestinationCategoryIncidents = (destinationCategory.totalIncomingIncidents > destinationCategory.count)? 
          destinationCategory.totalIncomingIncidents - 
          destinationCategory.count : 0
        destinationCategory.intersectionThreshold = multipleDestinationCategoryIncidents / 
          (destinationCategory.incomingCategories.length - 1) * 
          destinationCategory.height / destinationCategory.count

        const multipeSourceCategoryIncidents = (sourceCategory.totalOutgoingIncidents > sourceCategory.count)? 
          sourceCategory.totalOutgoingIncidents - 
          sourceCategory.count : 0
        sourceCategory.intersectionThreshold = multipeSourceCategoryIncidents / 
          (sourceCategory.outgoingCategories.length - 1) * 
          sourceCategory.height / sourceCategory.count
      })
    })

    sourceColumn.categories.forEach((sourceCategory) => {
      const pathsForSourceCategory = this.buildPathsForCategory(sourceColumn, 
        sourceCategory, destinationColumn)
      pathArray = pathArray.concat(pathsForSourceCategory)
    })

    return pathArray
  }

  pathsToSideBar() {
    let pathArray = []

    const currentColumnIndex = this.props.columns.indexOf(this.props.columnName)
    const SideBarColumns = WorkspaceComputations.sidebarColumns(this.props.columns)
    const firstSideBarColumn = SideBarColumns.get(0)

    let sourceColumn = {
      index: currentColumnIndex,
      name: this.props.columnName,
      categories: this.categoriesForColumn(currentColumnIndex),
      x: WorkspaceComputations.horizontalPositions(this.props.showEmptyCategories,
        this.props.viewport, this.props.data,
        this.props.columns, this.props.categories)
        .getIn(['columns', this.props.columnName]).get('x') + 
        WorkspaceComputations.columnWidth(this.props.columns)
    }

    let destinationColumn = {
      name: firstSideBarColumn,
      categories: this.categoriesForSidebarColumn(firstSideBarColumn),
      x: WorkspaceComputations.horizontalPositions(this.props.showEmptyCategories,
        this.props.viewport, this.props.data,
        this.props.columns, this.props.categories)
        .getIn(['sideBar', 'x'])
    }

    //console.log(sourceColumn.categories.toArray())
    //console.log(destinationColumn.categories.toArray())

    sourceColumn.categories.forEach((sourceCategory) => {
      destinationColumn.categories.forEach((destinationCategory) => {
        const mutualIncidentCount = CategoryComputations.itemsInBothCategories(
          this.props.data, 
          sourceColumn.name, 
          sourceCategory.categoryName, 
          destinationColumn.name, destinationCategory.categoryName)

        if(mutualIncidentCount !== 0) {
          sourceCategory.totalOutgoingIncidents += mutualIncidentCount
          destinationCategory.totalIncomingIncidents += mutualIncidentCount

          sourceCategory.outgoingCategories.push({'key': destinationCategory.key, 'mutualIncidentCount': mutualIncidentCount})
          destinationCategory.incomingCategories.push({'key': sourceCategory.key, 'mutualIncidentCount': mutualIncidentCount})
        }

        const multipleDestinationCategoryIncidents = (destinationCategory.totalIncomingIncidents > destinationCategory.count)? 
          destinationCategory.totalIncomingIncidents - 
          destinationCategory.count : 0
        destinationCategory.intersectionThreshold = multipleDestinationCategoryIncidents / 
          (destinationCategory.incomingCategories.length - 1) * 
          destinationCategory.height / destinationCategory.count

        const multipeSourceCategoryIncidents = (sourceCategory.totalOutgoingIncidents > sourceCategory.count)? 
          sourceCategory.totalOutgoingIncidents - 
          sourceCategory.count : 0
        sourceCategory.intersectionThreshold = multipeSourceCategoryIncidents / 
          (sourceCategory.outgoingCategories.length - 1) * 
          sourceCategory.height / sourceCategory.count
      })
    })

    sourceColumn.categories.forEach((sourceCategory) => {
      const pathsForSourceCategory = this.buildPathsForCategory(sourceColumn, 
        sourceCategory, destinationColumn)
      pathArray = pathArray.concat(pathsForSourceCategory)
    })

    return pathArray
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

      const currentPath = <path d={d} className='ColumnPaths' key={sourceCategory.categoryName + destinationCategory.categoryName}/>
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