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
      this.props.viewport,
      this.props.data, 
      this.props.categories, 
      this.props.columnName) 

    // TODO: I'm not very happy computing the vertical layout this way, refactor!
    let categoryY = WorkspaceComputations.topBarHeight()

    return this.props.categories.get(this.props.columnName)
      .filter( (visible) => visible === true)
      .filter( (visible, categoryName) => categoryHeights.get(categoryName) !== undefined)
      .map( (visible, categoryName) => {
        const currentY = categoryY
        categoryY += categoryHeights.get(categoryName)

        return <Category
          categoryName={categoryName}
          key={categoryName}
          colour={categoryColours.get(categoryName)} 
          height={categoryHeights.get(categoryName)}
          width={ WorkspaceComputations.columnWidth(this.props.columns) }
          x={WorkspaceComputations.columnX(this.props.columns, this.props.viewport, this.props.index)}
          y={currentY}
        />
      }).toArray()

  }

  render() {
    return <g>
      { this.nonEmptyCategories() }
      <ColumnPaths index={this.props.index}/>
    </g>
  }
}

/*
      <rect
        x={ WorkspaceComputations.columnX(this.props.columns, this.props.viewport, this.props.index) }
        y={ WorkspaceComputations.topBarHeight() }
        width={ WorkspaceComputations.columnWidth(this.props.columns) }
        height={ WorkspaceComputations.columnHeight(this.props.viewport) }
        fill='#FFDDFF'
      />
*/

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    columns: state.columns,
    categories: state.categories,
    data: state.data,
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(Column)