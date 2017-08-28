const SidebarColumnHoverReducer = (state = '', action) => {
  switch (action.type) {

  case 'SidebarColumnHover':
    return action.columnName

  default:
    return state
  }
}

module.exports = SidebarColumnHoverReducer