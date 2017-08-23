const Immutable = require('immutable')

const Constants = require('../Constants.js')

const CategoryHoverStateReducer = (state = null, action) => {

  switch(action.type) {

  case 'CategoryHoverStateCreator':
    // When hovered, neither name or category should be null
    if((Constants.get('columnNames') !== null) && (Constants.get('categoryNames') !== null)) {
      return action.state
    }
    break

  case 'CategoryUnhoverStateCreator':
    return state

  default:
    return state
  }

}


module.exports = CategoryHoverStateReducer