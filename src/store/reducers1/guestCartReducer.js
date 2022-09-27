
import axios from 'axios';


const SET_GUESTCART = 'SET_GUESTCART';
const ADD_TO_GUESTCART = 'ADD_TO_GUESTCART';
const REMOVE_FROM_GUESTCART = 'REMOVE_FROM_GUESTCART';
const EDIT_GUESTCART = 'EDIT_GUESTCART';



export const setGuestCart = (guestCart) => {
    return {
        type: SET_GUESTCART,
        guestCart,
    };
};

export const addToGuestCart = (guestCartItem) => {
    return {
        type: ADD_TO_GUESTCART,
        guestCartItem,
    };
};

export const removeFromGuestCart = (guestCartItemId) => {
    return{
        type: REMOVE_FROM_GUESTCART,
        guestCartItemId,
    };
};

export const editGuestCart = (guestCartItemId, guestCartItemQty) => {
    return{
        type: EDIT_GUESTCART,
        guestCartItemId,
        guestCartItemQty,
    };
};

export const guestCheckout = (guestCart, history) => {
    return async(dispatch) => {
        try{
            await axios.post('/api/order/guest', guestCart)
            localStorage.setItem('cart', [])
            dispatch(setGuestCart([]))
            history.push('/confirmation')
        }catch(error){
            console.log('GUEST CHECKOUT THUNK ERROR ', error);
        }
    };
};


export default function guestCartReducer (state = [], action) {
    let guestCart
    switch (action.type) {
        case SET_GUESTCART:
            return[...action.guestCart];
        case ADD_TO_GUESTCART:
           let duplicate = false;
           guestCart = state.map((item) => {
            if(item.productId === action.guestCartItem.productId){
                duplicate = true;
                return{...item, quantity: item.quantity += action.guestCartItem.amount}
            }else{
                return item
            }
           })
           if(!duplicate){
            guestCart.push(action.guestCartItem)
           }
            localStorage.setItem('cart', JSON.stringify(guestCart))
            return guestCart;
        case REMOVE_FROM_GUESTCART:
            guestCart = state.filter((item) => {
                if(item.productId === action.guestCartItemId){
                    return false
                }else{
                    return true
                }
            })
            localStorage.setItem('cart', JSON.stringify(guestCart))
            return guestCart;
        case EDIT_GUESTCART:
            guestCart = state.map((item) => {
                if(item.productIt === action.guestCartItemId){
                    return {...item, quantity: action.guestCartItemQty}
                }else{
                    return item
                }
            })
            localStorage.setItem('cart', JSON.stringify(guestCart))
            return guestCart;
        default:
            return state
    }
}


