const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')
const CategoryComputations = require('../CategoryComputations.js')

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
          x:WorkspaceComputations.columnX(this.props.columns, this.props.viewport, columnIndex),
          y:currentY,
          count: count
        }
      })
  }

  paths() {
    let pathArray = []

    // TODO: This will probably have to change later on, but for
    // now we are disregarding paths to the SideBar because
    // we don't have one. 
    if (this.props.index >= this.props.columns.count() - 1) return pathArray

    const sourceColumn = {
      index: this.props.index,
      name: this.props.columnName,
      categories: this.categoriesForColumn(this.props.index),
      x: WorkspaceComputations.columnPathX(this.props.columns, 
        this.props.viewport, 
        this.props.index)
    }

    const destinationColumn = {
      index: this.props.index + 1,
      name: this.props.columns.get(this.props.index + 1),
      categories: this.categoriesForColumn(this.props.index + 1),
      x: WorkspaceComputations.columnPathX(this.props.columns, 
        this.props.viewport, 
        this.props.index + 1)
    }

    let destinationCategoriesYs = {}

    sourceColumn.categories.forEach((sourceCategory) => {

      let totalUnfilteredIncidents = 0
      let destinationCategories = []

      destinationColumn.categories.forEach((destinationCategory) => {
        const mutualIncidentCount = CategoryComputations.itemsInBothCategories(
          this.props.data, 
          sourceColumn.name, 
          sourceCategory.categoryName, 
          destinationColumn.name, destinationCategory.categoryName)

        if(mutualIncidentCount !== 0) {
          totalUnfilteredIncidents += mutualIncidentCount
          
          let entry = {
            category: destinationCategory,
            mutualIncidentCount: mutualIncidentCount,
            yOffset: 0
          }

          destinationCategories.push(entry)
        }
      })

      const multipeCategoryIncidents = (totalUnfilteredIncidents > sourceCategory.count)? totalUnfilteredIncidents - sourceCategory.count : 0
      const intersectionThresholdInIncidents = multipeCategoryIncidents / (destinationCategories.length - 1)
      const intersectionThreshold = intersectionThresholdInIncidents * sourceCategory.height / sourceCategory.count

      const pathsForSourceCategory = this.buildPathsForCategory(sourceColumn, 
        sourceCategory, destinationColumn, 
        destinationCategories, intersectionThreshold, destinationCategoriesYs)

      pathArray = pathArray.concat(pathsForSourceCategory)
    })

    return pathArray
  }

  buildPathsForCategory(sourceColumn, sourceCategory, destinationColumn, destinationCategories, intersectionThreshold, destinationCategoriesYs) {
    
    let pathsForCategory = []

    const curveControlThreshold = Math.abs(sourceColumn.x - destinationColumn.x) / 2.5
    let sourceCategoryYShift = 0

    destinationCategories.forEach((destinationCategory) => {
      if(destinationCategoriesYs[destinationCategory.category.categoryName] === undefined) {
        destinationCategoriesYs[destinationCategory.category.categoryName] = 0
      }

      const sourceColumnY = sourceCategory.y + sourceCategoryYShift
      const destinationColumnY = destinationCategory.category.y + destinationCategoriesYs[destinationCategory.category.categoryName]
      const sourceCurveHeight = sourceCategory.height * (destinationCategory.mutualIncidentCount/sourceCategory.count)
      const destinationCurveHeight = destinationCategory.category.height * (destinationCategory.mutualIncidentCount/destinationCategory.category.count)

      let d = `M ${sourceColumn.x} ${sourceColumnY} `
      d += `C ${sourceColumn.x + curveControlThreshold} ${sourceColumnY} `
      d += `${destinationColumn.x - curveControlThreshold} ${destinationColumnY} `
      d += `${destinationColumn.x} ${destinationColumnY} `
      d += `L ${destinationColumn.x} ${destinationColumnY + destinationCurveHeight} `
      d += `C ${destinationColumn.x - curveControlThreshold} ${destinationColumnY + destinationCurveHeight} `
      d += `${sourceColumn.x + curveControlThreshold} ${sourceColumnY + sourceCurveHeight} `
      d += `${sourceColumn.x} ${sourceColumnY + sourceCurveHeight}`

      const disPath = <path d={d} className='ColumnPaths'/>
      pathsForCategory.push(disPath)      

      sourceCategoryYShift += sourceCurveHeight
      sourceCategoryYShift -= intersectionThreshold
      destinationCategoriesYs[destinationCategory.category.categoryName] += destinationCurveHeight
    })

    return pathsForCategory
  }

  render() {
    /*let pathObjs = []
    if(this.props.index < this.props.columns.count() - 1) {
      const nextColumnName = this.props.columns.get(this.props.index + 1)
      const homeCategories = this.categoriesForColumn(this.props.index)
      const awayCategories = this.categoriesForColumn(this.props.index + 1)
      
      const homeColumnPathX = WorkspaceComputations.columnPathX(this.props.columns, this.props.viewport, this.props.index)
      const awayColumnPathX = WorkspaceComputations.columnPathX(this.props.columns, this.props.viewport, this.props.index + 1)

      let awayCategoriesYs = {}

      homeCategories.forEach((homeCategory) => {
        const itemsInHomeCategory = CategoryComputations.itemsInCategory(this.props.data, this.props.columnName, homeCategory.categoryName)
        let previousHeight = 0
        awayCategories.forEach((awayCategory) => {


          const count = CategoryComputations.itemsInBothCategories(this.props.data, this.props.columnName, homeCategory.categoryName, nextColumnName, awayCategory.categoryName)

          if(count !== 0)
          {
            const curveControlThreshold = Math.abs(homeColumnPathX - awayColumnPathX) / 2.5

            const homeColumnPathY = homeCategory.y + previousHeight
            const awayColumnPathY = awayCategory.y + (awayCategoriesYs[awayCategory.categoryName]? awayCategoriesYs[awayCategory.categoryName] : 0) 
            const height = homeCategory.height * (count/itemsInHomeCategory)

            let d = `M ${homeColumnPathX} ${homeColumnPathY} `
            d += `C ${homeColumnPathX + curveControlThreshold} ${homeColumnPathY} `
            d += `${awayColumnPathX - curveControlThreshold} ${awayColumnPathY} `
            d += `${awayColumnPathX} ${awayColumnPathY} `
            d += `L ${awayColumnPathX} ${awayColumnPathY + height} `
            d += `C ${awayColumnPathX - curveControlThreshold} ${awayColumnPathY + height} `
            d += `${homeColumnPathX + curveControlThreshold} ${homeColumnPathY + height} `
            d += `${homeColumnPathX} ${homeColumnPathY + height}`


            const disPath = <path d={d} className='ColumnPaths'/>
            pathObjs.push(disPath)      

            previousHeight += height
            awayCategoriesYs[awayCategory.categoryName]? awayCategoriesYs[awayCategory.categoryName] += height : awayCategoriesYs[awayCategory.categoryName] = height
          }

        })
      })
    }*/

    /*return <g>
      {pathObjs}
    </g>*/
    return <g>
      {this.paths()}
    </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    columns: state.columns,
    categories: state.categories,
    data: state.data,
    filters: state.filters,
    showEmptyCategories: state.showEmptyCategories 
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(ColumnPaths)