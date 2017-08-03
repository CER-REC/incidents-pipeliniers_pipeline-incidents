const Immutable = require('immutable')

// const Constants = require('../Constants.js')

const defaults = Immutable.fromJS([
  'province',
  'incidentType',
])


const ViewportReducer = (state = defaults, action) => {

  switch(action.type) {
  default:
    return state
  }

}


module.exports = ViewportReducer