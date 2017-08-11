const Immutable = require('immutable')

const defaults = Immutable.Map()

const FilterReducer = (state = defaults, action) => {

  switch(action.type) {

  default:
    return state
  }

}


module.exports = FilterReducer