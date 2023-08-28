import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import App from '../App'
import RegisterReducer from './register/duck'
import AddComicReducer from './AddComic/duck'
import WebListReducer from './webList/duck'
import UserReducer from './userList/duck'
import UpdateComicReducer from './updateComic/duck'
import LoginReducer from './login/duck'
import SingleUserReducer from './singleUser/duck'
import UpdateUserReducer from './UpdateUser/duck'
import cartReducer from './cart/duck'
import CheckOutReducer from './checkout/duck'
import OrderListReducer from './orderList/duck'


// Define Middleware
const middleware = [thunk, promiseMiddleware]

// Define Reducers
const reducers = combineReducers({
  registerUser: RegisterReducer,
  addComic: AddComicReducer,
  webList: WebListReducer,
  userList : UserReducer,
  updateComic : UpdateComicReducer,
  singleUser : SingleUserReducer,
  loginUser : LoginReducer,
  updateUser : UpdateUserReducer,
  cart : cartReducer,
  checkOut : CheckOutReducer,
  orderList : OrderListReducer,
  App,
})

// Create Store
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(...middleware))
)
export default store