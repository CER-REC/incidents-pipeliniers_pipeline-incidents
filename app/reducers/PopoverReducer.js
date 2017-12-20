const Immutable = require('immutable')

const defaultState = Immutable.fromJS({
  // popoverName: a string set by the caller. Each unique popover should have a
  // unique string, e.g.: each questionMark popover should have a unique
  // identifier here
  popoverName: null,

  // popoverElement: the root DOM element of the popover, for testing focus
  popoverElement: null,

  // returnFocusElement: a DOM element to focus when the popover is closed
  returnFocusElement: null,

  // shouldFocusPopover: boolean, should the open popover set focus on its first
  // element when it renders. Each popover should only do this once, and should
  // then set this state to false
  shouldFocusPopover: true

})

const PopoverReducer = (state = defaultState, action) => {

  switch(action.type) {

  case 'OpenPopover':
    if(state.currentPopover !== null) {
      return state.currentPopover.focus()
    }

    return state
    
  case 'ClosePopoverAndReturnFocus':

    return state

  case 'ClosePopoverWithoutReturningFocus':

    return state

  case 'HaveFocusedPopover':
    return state.set('shouldFocusPopover', false)

  default:
    return state
  }

}


module.exports = PopoverReducer




