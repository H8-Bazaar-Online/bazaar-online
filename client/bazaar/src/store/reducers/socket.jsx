const initialState = {
  socketConnect : null,
  players : []
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch(type) {
    case 'SOCKET/SET_CONNECT':
      return { ...state, socketConnect: payload }
    case 'SOCKET/SET_PLAYERS':
      return { ...state, players: [...state.players , payload] }
    default:
      return state
  }
}

export default reducer