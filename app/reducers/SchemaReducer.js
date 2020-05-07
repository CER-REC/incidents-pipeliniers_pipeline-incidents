import Immutable from 'immutable'

// The schema is loaded from the CategorySchema.json file, and defines category
// IDs with English and French translation strings.
const SchemaReducer = (state = Immutable.Map(), action) => {

  switch(action.type) {

  case 'SetSchema':
    return action.schema

  default:
    return state
  }

}


export default SchemaReducer