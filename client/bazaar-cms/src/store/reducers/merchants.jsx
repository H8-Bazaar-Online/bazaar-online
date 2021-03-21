const initialState = {
  merchants: [],
  loading: false,
  error: false
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch(type) {
    case 'MERCHANTS/FETCH_ALL':
      return { ...state, merchants: payload }
    case 'MERCHANTS/SET_ADD_MERCHANT':
      return { ...state, merchants: [...state.merchants, payload] }
    case 'MERCHANTS/SET_LOADING':
      return { ...state, loading: payload }
    case 'MERCHANTS/SET_ERROR':
      return { ...state, error: payload }
    default:
      return state
  }
}

export default reducer