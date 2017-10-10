
function ColumnTooltipSummonedCreator (columnName) {
  return {
    type: 'ColumnTooltipSummoned',
    columnName: columnName,
  }
}

module.exports = ColumnTooltipSummonedCreator