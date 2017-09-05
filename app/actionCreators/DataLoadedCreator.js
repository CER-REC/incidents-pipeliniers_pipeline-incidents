
function DataLoadedCreator (data) {
  return {
    type: 'DataLoaded',
    data: data,
  }
}

module.exports = DataLoadedCreator