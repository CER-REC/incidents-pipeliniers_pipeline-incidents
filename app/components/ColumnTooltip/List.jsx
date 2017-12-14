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

  getWidth() {
    // Double the width, as we are adding the list beside the description
    return super.getWidth() * 2
  }

  render() {
    const items = this.getListItems()
    const categoryColours = CategoryComputations.coloursForColumn(
      this.props.data,
      this.props.columnTooltip.get('columnName'),
      this.props.schema,
      this.props.language)
    const renderedItems = items.map(item => {
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
    
    return this.getTooltipLayout(
      <ul className="tooltipItems">
        {renderedItems}
      </ul>
    )
  }
}

module.exports = ListTooltip
