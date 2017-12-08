const defaultState = 0

const StoryImageReducer = (state = defaultState, action) => {
  switch(action.type) {

  case 'ActivateStoryImage':
    return action.indicatorDot

  case 'StoryDismissed':
    return defaultState

  case 'StorySelected':
    return defaultState

  case 'PopupDismissed':
    return defaultState

  default:
    return state
  }
}


module.exports = StoryImageReducer