const initialState = {
  allHistory: []
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch(type) {
    case 'HISTORY/SET_FETCHALLHISTORY':
      return { ...state, allHistory: payload }
    default:
      return state
  }
}

export default reducer