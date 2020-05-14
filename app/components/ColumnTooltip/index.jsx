import React from 'react'
import * as ReactRedux from 'react-redux'

import SimpleTooltip from './Simple'
import ListTooltip from './List'
import Tr from '../../TranslationTable'

import ColumnTooltipDismiss from '../../actionCreators/ColumnTooltipDismissedCreator'

import './style.scss'

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

export default ReactRedux.connect(state => ({
  language: state.language,
  viewport: state.viewport,
  columnTooltip: state.columnTooltip,
  showEmptyCategories: state.showEmptyCategories,
  data: state.data,
  columns: state.columns,
  categories: state.categories,
  schema: state.schema,
  idMap: state.idMap,
}), { ColumnTooltipDismiss })(TooltipWrapper)
