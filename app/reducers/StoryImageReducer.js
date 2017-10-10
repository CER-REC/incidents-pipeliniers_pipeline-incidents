
const StoryImageReducer = (state = 0, action) => {
  switch(action.type) {

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
    return 0

  case 'StorySelected':
  	return 0

  default:
    return state
  }
}


module.exports = StoryImageReducer