const initialState = {
  users: [],
  loading: false,
  error: false
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch(type) {
    case 'PRODUCTS/LOGIN':
      return { ...state, products: payload }
    case 'USERS/SET_ADD_USERS':
      return { ...state, users: [...state.users, payload] }
    case 'USERS/SET_LOADING':
      return { ...state, loading: payload }
    case 'USERS/SET_ERROR':
      return { ...state, error: payload }
    default:
      return state
  }
}

export default reducer