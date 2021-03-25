const initialState = {
  products: [],
  product: {},
  loading: false,
  error: false,
  allProduct: []
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch(type) {
    case 'PRODUCTS/FETCH_ALL':
      return { ...state, products: payload }
    case 'PRODUCTS/FETCH_ALLPRODUCT':
      return { ...state, allProduct: payload }
    case 'PRODUCTS/FETCH_BY_ID':
      return { ...state, product: payload }
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