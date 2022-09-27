import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//import reducers here
//import accountsReducer from './reducers1/accountsReducer'
import productsReducer from './reducers1/productsReducer'
import  authReducer  from "./reducers1/authReducer";
import  guestCartReducer  from './reducers1/guestCartReducer';
//import  albumReducer  from './reducers2/albumReducer';
import  adminReducer  from './reducers1/adminReducer';
//import cartReducer from './reducers1/cartReducer';
import ordersReducer from './reducers1/ordersReducer';
import guestCartReducer from './reducers1/guestCartReducer';
import infoReducer from './reducers1/infoReducer';
import singleOrderReducer from './reducers1/singleOrderReducer';


const rootReducer = combineReducers({
    //accounts: accountsReducer,
    products: productsReducer,
    //albums: albumReducer,
    auth: authReducer,
    guestCart: guestCartReducer,
    admin: adminReducer,
    //cart: cartReducer,
    orders: ordersReducer,
    guestCart: guestCartReducer,
    orderinfo: infoReducer,
    singleOrder: singleOrderReducer,
   
})

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)


