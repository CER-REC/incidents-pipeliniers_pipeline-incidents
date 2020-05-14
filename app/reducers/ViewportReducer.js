import Immutable from 'immutable'

const defaults = Immutable.fromJS({
  x: 0,
  y: 0
})

const ViewportReducer = (state = defaults, action) => {

  switch(action.type) {

  case 'ResizeScreen':
    return state.set('x', action.x).set('y', action.y)
  default:
    return state
  }




}


export default ViewportReducer