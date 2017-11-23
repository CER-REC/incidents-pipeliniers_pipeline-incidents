
const StoryImageReducer = (state = 0, action) => {
  switch(action.type) {

  case 'ActivateStoryImage':
    return Immutable.Map({
      columnName: action.columnName,
      categoryName: action.categoryName,
    })

  case 'StoryDismissed':
    return 0

  case 'StorySelected':
    return 0

  case 'PopupDismissed':
    return 0

  default:
    return state
  }
}


module.exports = StoryImageReducer