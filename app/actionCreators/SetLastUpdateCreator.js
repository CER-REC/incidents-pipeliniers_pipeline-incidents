function SetLastUpdateCreator (date) {
  return {
    type: 'SetLastUpdate',
    payload: { date },
  }
}

module.exports = SetLastUpdateCreator
