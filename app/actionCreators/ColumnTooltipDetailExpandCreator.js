
function ColumnTooltipDetailExpandCreator (columnName, itemOverview) {
  return {
    type: 'ColumnTooltipDetailExpand',
    columnName: columnName,
    itemOverview: itemOverview,
  }
}

export default ColumnTooltipDetailExpandCreator