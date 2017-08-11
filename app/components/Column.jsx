const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')
const CategoryComputations = require('../CategoryComputations.js')
const ColumnPaths = require('./ColumnPaths.jsx')
const Category = require('./Category.jsx')

require('./Column.scss')

class Column extends React.Component {

  // Specifically: non-empty AND visible categories
  nonEmptyCategories() {
    const categoryColours = CategoryComputations.coloursForColumn(
      this.props.categories,
      this.props.columnName)
    const categoryHeights = WorkspaceComputations.categoryHeights(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories, 
      this.props.columnName) 

    // TODO: I'm not very happy computing the vertical layout this way, refactor!
    let categoryY = WorkspaceComputations.topBarHeight()

    const displayedCategories = CategoryComputations.displayedCategories(
      this.props.data,
      this.props.columns,
      this.props.categories, 
      this.props.columnName)

    const x = WorkspaceComputations.columnXCoordinates(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories).get(this.props.columnName)

    return displayedCategories
      .map( (visible, categoryName) => {
        const currentY = categoryY
        categoryY += categoryHeights.get(categoryName)

        return <Category
          categoryName={categoryName}
          key={categoryName}
          colour={categoryColours.get(categoryName)} 
          height={categoryHeights.get(categoryName)}
          width={ WorkspaceComputations.columnWidth(this.props.columns) }
          x={ x }
          y={currentY}
        />
      }).toArray()

  }

  emptyCategories() {
    
    if (!this.props.showEmptyCategories) {
      // If not showing empty categories, bail out
      return null
    }


    const categoryColours = CategoryComputations.coloursForColumn(
      this.props.categories,
      this.props.columnName)

    const baselineHeight = WorkspaceComputations.baselineHeight(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)

    const emptyCategoryHeight = WorkspaceComputations.emptyCategoryHeight(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories)

    const x = WorkspaceComputations.columnXCoordinates(
      this.props.showEmptyCategories,
      this.props.viewport,
      this.props.data,
      this.props.columns,
      this.props.categories).get(this.props.columnName)


    // TODO: I'm not very happy computing the vertical layout this way, refactor!
    let categoryY = baselineHeight

    return CategoryComputations.emptyCategoriesForColumn(
      this.props.data,
      this.props.columns,
      this.props.categories,
      this.props.columnName
    ).map( (visible, categoryName) => {
      // TODO: I think that we don't care whether an empty category is visible or not?
      const currentY = categoryY
      categoryY += emptyCategoryHeight

      return <Category
        categoryName={categoryName}
        key={categoryName}
        colour={categoryColours.get(categoryName)} 
        height={emptyCategoryHeight}
        width={ WorkspaceComputations.columnWidth(this.props.columns) }
        x={ x }
        y={currentY}
      />

    }).toArray()



  }

  columnPaths() {
    if (WorkspaceComputations.shouldRenderColumnPath(
      this.props.columns,
      this.props.columnName)) {
      return <ColumnPaths index={this.props.index} columnName={this.props.columnName}/>
    }
    else {
      return null
    }
    
  }



  render() {
    return <g>
      { this.nonEmptyCategories() }
      { this.emptyCategories() }
      { this.columnPaths() }
    </g>
  }
}



const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    columns: state.columns,
    categories: state.categories,
    data: state.data,
    showEmptyCategories: state.showEmptyCategories,
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(Column)