// NB: 'searchString' is the search part of the URL, including ?
const SetUrlFromStringCreator = function (searchString) {
  return {
    type: 'SetUrlFromString',
    searchString: searchString,
  }

}

module.exports = SetUrlFromStringCreator