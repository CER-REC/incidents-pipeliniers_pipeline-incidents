const Immutable = require('immutable')

const defaults = Immutable.fromJS({
  x: 0,
  y: 0
})

const ViewportDimensions = (state = defaults, action) => {

  switch(action.type) {

    case 'ScreenResized':
      // TODO: validate this
      return action.delete('type')

      break
    default:
      return state
  }




}


module.exports = ViewportDimensions