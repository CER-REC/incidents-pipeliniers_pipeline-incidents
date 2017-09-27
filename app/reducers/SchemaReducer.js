const Immutable = require('immutable')

const SchemaReducer = (state = Immutable.Map(), action) => {

  switch(action.type) {

  case 'SetSchema':
    return action.schema

  default:
    return state
  }

}


module.exports = SchemaReducer