const React = require('react')

const SimpleTooltip = require('./Simple')
const TooltipListItem = require('./ListItem.jsx')
const CategoryComputations = require('../../CategoryComputations.js')

class ListTooltip extends SimpleTooltip {
  getListItems() {
    return this.getColumnTranslation().getIn(['detail', this.props.language])
  }

  getTooltipClass() {
    return this.getListItems().some(item => item.get('expanded'))
      ? 'ExpandingTooltip'
      : 'ListTooltip'
  }

  getColumns() {
    // Aim for 5 items per column, to a maximum of 4 columns
    return Math.min(Math.ceil(this.getListItems().count() / 5), 4)
  }

  getWidth() {
    // Add 1x base width for each column for the list beside the description
    return Math.min(
      super.getWidth() * (this.getColumns() + 1),
      this.props.viewport.get('x') * 0.8
    )
  }

  generateLists(items, categoryColours, columns = 2) {
    const itemsPerColumn = Math.ceil(items.count() / columns)
    const result = []
    let i
    for (i = 0; i < columns; i++) {
      const columnItems = items.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn)
      const renderedItems = columnItems.map(item => {
        return (
          <TooltipListItem
            key={item.get('overview')}
            item={item}
            columnName={this.props.columnTooltip.get('columnName')}
            categoryName={item.get('categoryName', '-1')}
            categoryColours={categoryColours}
            language={this.props.language}
          />
        )
      })
      result.push((
        <ul key={`column-${i}`} className={`colCount${columns}`}>
          {renderedItems}
        </ul>
      ))
    }
    return result
  }

  render() {
    const items = this.getListItems()
    const categoryColours = CategoryComputations.coloursForColumn(
      this.props.data,
      this.props.columnTooltip.get('columnName'),
      this.props.schema,
      this.props.language)

    return this.getTooltipLayout(
      <div className="tooltipItems">
        {this.generateLists(items, categoryColours, this.getColumns())}
      </div>
    )
  }
}

module.exports = ListTooltip
