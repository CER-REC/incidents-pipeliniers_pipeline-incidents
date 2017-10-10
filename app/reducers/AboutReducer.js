
const AboutReducer = (state = false, action) => {
  switch(action.type) {

  case 'AboutSummoned':
    return true

  default:
    return state
  }
}


module.exports = AboutReducer