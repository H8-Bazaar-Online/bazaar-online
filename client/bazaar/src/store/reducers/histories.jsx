const initialState = {
  histories: [],
  loading: false,
  error: false
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch(type) {
    case 'HISTORIES/FETCH_ALL':
      return { ...state, histories: payload }
    case 'HISTORIES/SET_LOADING':
      return { ...state, loading: payload }
    case 'HISTORIES/SET_ERROR':
      return { ...state, error: payload }
    default:
      return state
  }
}

export default reducer