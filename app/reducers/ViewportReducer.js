const Immutable = require('immutable')

const Constants = require('../Constants.js')

const defaults = Immutable.fromJS({
  x: 0,
  y: 0
})

const ViewportReducer = (state = defaults, action) => {

  switch(action.type) {

  case 'ResizeScreen':
    // Check that the action is a valid object.
    if (action && action.x && action.y)
      // Check that the dimensions are valid.
      // TODO: Increase the height of the workspace by emptyCategoryOffsetRatio if
      // the empty categories are visible (i.e. empty categories state is visible).
      if (action.x > Constants.getIn(['workspace', 'maxWidth'])) 
        action.x = Math.min(Constants.getIn(['workspace', 'maxWidth']), action.x)
        action.y = action.x * Constants.getIn(['workspace', 'heightToWidthRatio'])
      return state.set('x', action.x).set('y', action.y)

    return state
  default:
    return state
  }




}


module.exports = ViewportReducer