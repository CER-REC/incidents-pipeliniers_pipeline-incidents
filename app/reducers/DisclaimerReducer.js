
const DisclaimerReducer = (state = false, action) => {
  switch(action.type) {

  case 'DisclaimerSummoned':
    return true

  case 'DisclaimerDismissed':
    return false

  default:
    return state
  }
}


module.exports = DisclaimerReducer