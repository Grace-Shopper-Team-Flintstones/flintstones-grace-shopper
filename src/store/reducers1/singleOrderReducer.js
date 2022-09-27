import axios from 'axios';
import { fetchInfo } from './infoReducer';

const SET_SINGLE_ORDER = 'SET_SINGLE_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';


export const setSingleOrder = (order) => {
    return{
        type: SET_SINGLE_ORDER,
        order,
    };
};

export const deleteOrder = (order) => {
    return{
        type:DELETE_ORDER,
        order,
    };
};


export const fetchSingleOrder = (id) => {
    return async (dispatch) => {
        try{
            const { data } = await axios.get(`/api/orders/${id}`);
            dispatch(setSingleOrder(data));
        }catch(error){
            console.log('FETCH SINGLE ORDER ERROR ', error);
        }
    };
};

export const deleteThisOrder = (productId, accountId) => {
    return async(dispatch) => {
        try{
            const { data: order } = await axios.delete(`/api/orders/${productId}/${accountId}`);
            dispatch(fetchInfo(accountId));
            dispatch(fetchSingleOrder(accountId))
        }catch(error){
            console.log('DELETE ORDER THUNK ERROR ', error);
        }
    };
};

export const editOrder = (orderId, productId, quantity) => {
    return async(dispatch) => {
        try{
            await axios.put(`/api/orders/${orderId}/${productId}`, { quantity });
            dispatch(fetchSingleOrder(orderId));
        }catch(error){
            console.log('EDIT ORDER THUNK ERROR ', error);
        }
    };
};

export const addToCart = (cart) => {
    return async(dispatch) => {
        try{
            await axios.post('/api/orders', cart);
        }catch(error){
            console.log('ADD TO CART ERROR ', error);
        }
    };
};

export const checkout = (accountId, history) => {
    return async(dispatch) => {
        try{
            await axios.put(`/api/orders/${accountId}`);
            dispatch(fetchSingleOrder(accountId))
            history.push('/confirmation')
        }catch(error){
            console.log('CHECKOUT THUNK ERROR ', error);
        }
    };
};

export default function singleOrderReducer(state = {}, action) {
    switch (action.type){
        case SET_SINGLE_ORDER:
            return action.order
        default:
            return state;
    }
}