
function SidebarColumnHoverCreator (columnName) {
  return {
    type: 'SidebarColumnHover',
    columnName: columnName,
  }
}

module.exports = SidebarColumnHoverCreator