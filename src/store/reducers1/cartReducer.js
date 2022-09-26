import axios from 'axios';
import  history from '../../utils/history';

const GET_CART = 'GET_CART';
const CLEAR_CART = 'CLEAR_CART';

const getCart = (cart) => {
    return {
        type: GET_CART,
        cart,
    };
};

export const clearCart = () => {
    return {
        type: CLEAR_CART,
    };
};

export const createCart = (lineItemId, accountId, UUID) => {
    return async(dispatch) => {
        try{
            const { data } = await axios.post(`/api/cart`, { lineItemId, accountId, UUID });
            console.log('DATA?', data)
            console.log('UUID?', UUID)
            console.log('LINEITEMID?', lineItemId);
            console.log('ACCOUNTID?', accountId)
            if(accountId === 0){
                localStorage.setItem('UUID', data.UUID)
            }
            dispatch(updateQuantities(data.id, data.UUID, accountId, lineItemId, 'increment'));
        }catch(error){
            console.log('CREATE CART THUNK ERROR ', error);
        }
    }
};

export const updateQuantities = (cartId, UUID, accountId, lineItemId, op, num=1) => {
    return async(dispatch) => {
        try{
            await axios.put(`/api/cart`, {cartId, UUID, lineItemId, op, num})
            dispatch(fetchCart(accountId, UUID));
        }catch(error){
            console.log('UPDATE CART QUANT THUNK ERROR ', error);
        }
    };
}

export const fetchCart = (accountId, UUID) => {
    return async(dispatch) => {
        try{
            console.log('ACCOUNT ID?', accountId);
            console.log('UUID?', UUID)
            const { data } = await axios.get(`/api/cart/${accountId}/${UUID}`);
            dispatch(getCart(data));
        }catch(error){
            console.log('FETCH CART THUNK ERROR ', error);
        }
    }
};

export const accountAttachCart = (accountId, UUID) => {
    return async(dispatch) => {
        try{
            await axios.put(`/api/cart/attachCart/${accountId}`, {UUID})
            dispatch(fetchCart(accountId, UUID));
        }catch(error){
            console.log('ATTACH CART THUNK ERROR ', error)
        }
    };
}

export const removeLineItem = (cartId, lineItemId, accountId, UUID) => {
    return async(dispatch) => {
        try{
            const { data } = await axios.delete(`/api/cart/${lineItemId}/${UUID}`);
            const amountToRemove = data.products[0].lineItems.quantity
            dispatch(updateQuantities(cartId, UUID, accountId, lineItemId, 'remove', amountToRemove));
        }catch(error){
            console.log('REMOVE ITEM THUNK ERROR ', error);
        }
    }
};


export const checkout = (UUID) => {
    return async(dispatch) => {
        try{
            await axios.put(`/api/cart/${UUID}`);
            history.push('/confirmation')
            dispatch(clearCart());
        }catch(error){
            console.log('CHECKOUT THUNK ERROR ', error);
        }
    }
};

export default function cartReducer(state={}, action) {
    switch(action.type){
        case GET_CART:
            return action.cart;
        case CLEAR_CART:
            return {};
        default:
            return state;
    }
};
 
