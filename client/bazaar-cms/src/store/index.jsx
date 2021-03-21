import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import productsReducer from './reducers/products';
import usersReducer from './reducers/users';
import merchantsReducer from './reducers/merchants';
import logger from './middlewares/logger'

const rootReducer = combineReducers({
  users: usersReducer,
  products: productsReducer,
  product: productsReducer,
  merchants: merchantsReducer
})

const store = createStore(rootReducer, applyMiddleware(logger, thunk))

// console.log(store.getState(), 'ini dari store/index.jsgit');

export default store