import axios from 'axios';

const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';

export const setSingleProduct = (singleProduct) => {
    return{
        type: SET_SINGLE_PRODUCT,
        singleProduct,
    };
};

export const addProduct = (singleProduct) => {
    return{
        type: ADD_PRODUCT,
        singleProduct,
    };
};

export const fetchSingleProduct = (id) => {
    return async(dispatch) => {
        try{
            const { data } = await axios.get(`/api/products/${id}`);
            dispatch(setSingleProduct(data));
        }catch(error){
            console.log('FETCH SINGLE PRODUCT ERROR ', error);
        }
    };
};

export const addNewProduct = (product) => {
    return async(dispatch) => {
        try{
            const { data : newProduct } = await axios.post('/api/products', product);
            dispatch(addProduct(newProduct));
        }catch(error){
            console.log('ADD NEW PRODUCT ERROR ', error);
        }
    };
};

export default function singleProductReducer(state = {}, action) {
    switch(action.type){
        case SET_SINGLE_PRODUCT:
            return action.singleProduct;
        case ADD_PRODUCT:
            return [...state, action.singleProduct]
        default:
            return state;
    }
}