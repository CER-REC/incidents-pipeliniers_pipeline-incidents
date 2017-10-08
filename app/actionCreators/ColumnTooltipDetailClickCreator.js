
function ColumnTooltipDetailClickCreator (columnName, itemOverview) {
  return {
    type: 'ColumnTooltipDetailClick',
    columnName: columnName,
    itemOverview: itemOverview,
  }
}

module.exports = ColumnTooltipDetailClickCreator