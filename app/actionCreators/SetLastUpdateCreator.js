function SetLastUpdateCreator (date) {
  return {
    type: 'SetLastUpdate',
    payload: { date },
  }
}

export default SetLastUpdateCreator
