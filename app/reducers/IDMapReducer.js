import Immutable from 'immutable'

const IDMapReducer = (state = Immutable.Map(), action) => {
  if (action.type !== 'IDMapsLoaded') { return state }
  return Immutable.fromJS(action.idMaps)
}

export default IDMapReducer
