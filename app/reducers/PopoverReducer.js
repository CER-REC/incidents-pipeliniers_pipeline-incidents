const Immutable = require('immutable')

const PopoverReducer = (state = [], action) => {

  switch(action.type) {

  case 'OpenPopover':
    if(state.currentPopover !== null) {
      return state.currentPopover.focus()
    }

  case 'ClosePopover':

  default:
    return state
  }

}


module.exports = PopoverReducer
