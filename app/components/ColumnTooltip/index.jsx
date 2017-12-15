const React = require('react')
const ReactRedux = require('react-redux')

const SimpleTooltip = require('./Simple')
const ListTooltip = require('./List')
const Tr = require('../../TranslationTable')

const ColumnTooltipDismiss = require('../../actionCreators/ColumnTooltipDismissedCreator')

require('./style.scss')

const TooltipWrapper = (props) => {
  const listItems = Tr.getIn([
    'tooltips',
    props.columnTooltip.get('columnName'),
    'detail',
    props.language
  ])
  return (listItems.count() === 0)
    ? <SimpleTooltip {...props} />
    : <ListTooltip {...props} />
}

module.exports = ReactRedux.connect(state => ({
  language: state.language,
  viewport: state.viewport,
  columnTooltip: state.columnTooltip,
  showEmptyCategories: state.showEmptyCategories,
  data: state.data,
  columns: state.columns,
  categories: state.categories,
  schema: state.schema,
}), { ColumnTooltipDismiss })(TooltipWrapper)
