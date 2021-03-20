const initialState = {
  products: [],
  loading: false,
  error: false
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  console.log(payload, '<<<<<<<<<<< PAYLOAD');
  switch(type) {
    case 'PRODUCTS/FETCH_ALL':
      return { ...state, products: payload }
    case 'PRODUCTS/SET_ADD_PRODUCT':
      return { ...state, products: [...state.products, payload] }
    case 'PRODUCTS/SET_LOADING':
      return { ...state, loading: payload }
    case 'PRODUCTS/SET_ERROR':
      return { ...state, error: payload }
    default:
      return state
  }
}

export default reducer