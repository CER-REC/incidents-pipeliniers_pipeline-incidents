
const defaultState = 0

const StoryImageReducer = (state = defaultState, action) => {
  switch(action.type) {

  case 'ActivateStoryImage':
    return action.storyImage

  case 'NextImage':
    if(state < action.count - 1)
      return state+1
    else 
      return state

  case 'PreviousImage':
    if(state < 1)
      return 0
    return state-1

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


export default StoryImageReducer