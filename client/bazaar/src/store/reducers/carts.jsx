const initialState = {
  carts: [],
  cart: {},
  loading: false,
  error: false
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch(type) {
    case 'CARTS/FETCH_ALL':
      return { ...state, carts: payload }
    case 'CARTS/SET_ADD_CART':
      return { ...state, cart: [...state.carts, payload] }
    case 'CARTS/SET_LOADING':
      return { ...state, loading: payload }
    case 'CARTS/SET_ERROR':
      return { ...state, error: payload }
    default:
      return state
  }
}

export default reducer