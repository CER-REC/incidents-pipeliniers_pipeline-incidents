import Immutable from 'immutable'

const defaults = Immutable.fromJS({
  isActive:false,
  storyID: null,
})

const StoryReducer = (state = defaults, action) => {
  switch(action.type) {

  case 'StorySelected':
    return state.merge({isActive:true, storyID: action.storyID})

  case 'PopupDismissed':
    return state.merge({isActive:false, storyID: null})

  default:
    return state
  }
}


export default StoryReducer