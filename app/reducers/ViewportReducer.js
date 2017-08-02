const Immutable = require('immutable')

const defaults = Immutable.fromJS({
  x: 0,
  y: 0
})

const ViewportReducer = (state = defaults, action) => {

  switch(action.type) {

  case 'ResizeScreen':
    // TODO: validate this

    return state.set('x', action.x).set('y', action.y)

  default:
    return state
  }




}


module.exports = ViewportReducer