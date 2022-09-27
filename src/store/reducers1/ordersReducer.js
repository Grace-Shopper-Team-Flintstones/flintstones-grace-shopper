import axios from 'axios';

const SET_ORDERS = 'SET_ORDERS';

export const setOrders = (orders) => {
    return{
        type: SET_ORDERS,
        orders,
    };
};

export const fetchOrders = () => {
    return async(dispatch) => {
        try{
            const { data } = await axios.get('/api/orders');
            dispatch(setOrders(data));
        }catch(error){
            console.log('FETCH ORDERS THUNK ERROR ', error);
        }
    };
};

export default function ordersReducer(state = [], action){
    switch(action.type){
        case SET_ORDERS:
            return action.orders;
        default:
            return state;
    };
};