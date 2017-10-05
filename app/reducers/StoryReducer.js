const Immutable = require('immutable')

const defaults = Immutable.fromJS({
  isActive:false,
  storyID: null,
})

const StoryReducer = (state = defaults, action) => {
  switch(action.type) {

  case 'StorySelected':
    return state.merge({isActive:true, storyID: action.storyID})

  case 'StoryDismissed':
    return state.merge({isActive:false, storyID: null})

  default:
    return state
  }
}


module.exports = StoryReducer