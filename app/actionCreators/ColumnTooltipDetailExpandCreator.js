
function ColumnTooltipDetailExpandCreator (columnName, itemOverview) {
  return {
    type: 'ColumnTooltipDetailExpand',
    columnName: columnName,
    itemOverview: itemOverview,
  }
}

module.exports = ColumnTooltipDetailExpandCreator