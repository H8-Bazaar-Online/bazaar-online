const initialState = {
  socketConnect : null,
  players : [],
  player: {},
  updatePlayers: []
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch(type) {
    case 'SOCKET/SET_CONNECT':
      return { ...state, socketConnect: payload }
    case 'SOCKET/SET_PLAYERS':
      return { ...state, players: payload }
      // return { ...state, players: [...state.players , payload] }
    case 'SOCKET/SET_PLAYER':
      return { ...state, player: payload }
    case 'SOCKET/SET_UPDATEPLAYERS':
      return { ...state, updatePlayers: payload }
    default:
      return state
  }
}

export default reducer