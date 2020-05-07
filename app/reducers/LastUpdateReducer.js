const LastUpdateReducer = (state = '0000-00-00', action) =>
  (action.type === 'SetLastUpdate') ? action.payload.date : state

export default LastUpdateReducer
