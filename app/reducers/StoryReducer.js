const Immutable = require('immutable')

const defaults = Immutable.fromJS({
  isActive:false,
  storyRow: null,
  storyPosition:null
})

const StoryReducer = (state = defaults, action) => {
  switch(action.type) {

  case 'StorySelected':
    return state.merge({isActive:true, storyRow: action.storyRow, storyPosition: action.storyPosition})

  case 'StoryDismissed':
    return state.merge({isActive:false})

  default:
    return state
  }
}


module.exports = StoryReducer