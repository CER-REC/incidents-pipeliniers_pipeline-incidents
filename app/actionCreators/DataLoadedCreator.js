
// NB: Data as passed to this action creator is a plain old javascript object,
// which is made into an immutable object in DataReducer.
function DataLoadedCreator (data) {
  return {
    type: 'DataLoaded',
    data: data,
  }
}

module.exports = DataLoadedCreator