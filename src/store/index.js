import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//import reducers here
import accountsReducer from './reducers1/accountsReducer'
import productsReducer from './reducers1/productsReducer'
import  authReducer  from "./reducers1/authReducer";
import  guestCartReducer  from './reducers1/guestCartReducer';
import  albumReducer  from './reducers2/albumReducer';
import  adminReducer  from './reducers1/adminReducer';
import cartReducer from './reducers1/cartReducer';




const rootReducer = combineReducers({
    accounts: accountsReducer,
    products: productsReducer,
    albums: albumReducer,
    account: authReducer,
    guestCart: guestCartReducer,
    admin: adminReducer,
    cart: cartReducer,
   
})

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)


