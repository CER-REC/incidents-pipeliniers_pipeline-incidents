const MemoizeImmutable = require('memoize-immutable')


const MapComputations = {}
































const MemoizedComputations = {}

for (const name of Object.keys(MapComputations)) {
  MemoizedComputations[name] = MemoizeImmutable(MapComputations[name])
}

module.exports = MemoizedComputations