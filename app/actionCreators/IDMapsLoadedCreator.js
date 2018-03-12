function IDMapsLoadedCreator (idMaps) {
  return {
    type: 'IDMapsLoaded',
    idMaps: idMaps,
  }
}

module.exports = IDMapsLoadedCreator
