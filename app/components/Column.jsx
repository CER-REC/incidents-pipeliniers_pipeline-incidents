const React = require('react')
const ReactRedux = require('react-redux')

const WorkspaceComputations = require('../WorkspaceComputations.js')
const CategoryComputations = require('../CategoryComputations.js')
const ColumnPaths = require('./ColumnPaths.jsx')
const Category = require('./Category.jsx')
const Constants = require('../Constants.js')
const TranslationTable = require('../TranslationTable.js')

require('./Column.scss')

// TODO: Get this from the URL query? Cookies?
const language = 'en'

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
    let categoryY = WorkspaceComputations.topBarHeight() + Constants.get('columnHeadingHeight')

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

  barHeading() {
    let currentY = WorkspaceComputations.topBarHeight()

    // Check if the subheading is visible. If it is not, 
    // add Constants.get('columnSubheadingHeight') to currentY.
    if(this.props.filters.get(this.props.columnName) === undefined) {
      currentY += Constants.get('columnSubheadingHeight')
    }

    const currentX = WorkspaceComputations.columnX(this.props.columns, this.props.viewport, this.props.index)
    return  this.splitHeading().map((word) => {
      currentY += Constants.get('columnHeadingLineOffset')
      return <tspan className='barsHeading' 
        x={currentX} 
        y={currentY}>
        {word}
      </tspan>
    })
  }

  barSubHeading() {
    // Only render the sub-heading if filters are on.
    if(this.props.filters.get(this.props.columnName) === undefined) {
      return
    }

    const currentY = WorkspaceComputations.topBarHeight() + 
                     Constants.get('columnSubheadingOffset')
    const currentX = WorkspaceComputations.columnX(this.props.columns, this.props.viewport, this.props.index)
    return <tspan className='barsSubHeading' 
      x={currentX} 
      y={currentY}>
      578/1017 shown
    </tspan>
  }

  render() {
    return <g>
      <text>
        {this.barHeading()}
        {this.barSubHeading()}
      </text>
      { this.nonEmptyCategories() }
      <ColumnPaths index={this.props.index}/>
    </g>
  }

  splitHeading() {
    const columnHeading = TranslationTable.getIn(['columnHeadings', this.props.columnName, language])
    const splitIndex = columnHeading.lastIndexOf(' ')
    const topLine = columnHeading.substring(0, splitIndex)
    const bottomLine = columnHeading.substring(splitIndex+1)
    return [topLine, bottomLine]
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    columns: state.columns,
    categories: state.categories,
    data: state.data,
    filters: state.filters
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(Column)