
const AboutReducer = (state = false, action) => {
  switch(action.type) {

  case 'AboutSummoned':
    return true

  case 'PopupDismissed':
  	return false

  default:
    return state
  }
}


module.exports = AboutReducer