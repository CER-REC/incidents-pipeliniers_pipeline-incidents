const Immutable = require('immutable')

// NB: The reportedDate objects contained in this dataset are not immutable,
// but are Moment date objects.

const DataReducer = (state = {}, action) => {

  switch(action.type) {
  case 'DataLoaded':
    return Immutable.fromJS(action.data)
  default:
    return state
  }




}


module.exports = DataReducer