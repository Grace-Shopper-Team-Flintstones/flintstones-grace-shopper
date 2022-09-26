import axios from 'axios';
import { getProductsThunk } from './productsReducer';

const GET_PRODUCT= 'GET_PRODUCT';
const GET_INVENTORY= 'GET_INVENTORY';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const CLEAR_PRODUCT = 'CLEAR_PRODUCT';

const getProduct = (product) => {
  return {
    type: GET_PRODUCT,
    product,
  };
};

const getInventory = (products) => {
  return {
    type: GET_INVENTORY,
    products,
  };
};

export const deleteProduct = (product) => {
    return{
      type: DELETE_PRODUCT,
      product,
    };
  };
  
  
  export const clearProduct = () => {
    return{
      type: CLEAR_PRODUCT,
      product: null,
    };
  };
  

export const addProduct = (product, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      if(token){ 
        await axios.post('/api/admin/products', product, {
          headers: {
          authorization:token
         }
        });}
        dispatch(getProductsThunk());
        history.push('/admin');
    } catch (error) {
      console.log('uh oh something went wrong adding products.', error);
    }
  };
};

export const fetchInventory = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/admin/products');
      dispatch(getInventory(data));
    } catch (error) {
      console.log('uh oh something went wrong fetching products.', error);
    }
  };
};

export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.get(`/api/admin//products/${id}`);
      dispatch(getProduct(product));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateProduct = (product, history) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/admin/products/${product.id}`, product);
      dispatch(fetchSingleProduct(product.id));
      history.push('/admin');
    } catch (error) {
      console.log('Error occured in updating single style.', error);
    }
  };
};

export const deleteThisProduct = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`api/products/${id}`);
      dispatch(deleteProduct());
    } catch (error) {
      console.log('uh oh something went wrong deleting products.', error);
    }
  };
};

export default function adminReducer(state = [], action) {
  switch (action.type) {
    case GET_INVENTORY:
      return action.products;
    case GET_PRODUCT:
      return action.product;
    case DELETE_PRODUCT:
        console.log(state)
        return state.filter((product) => product.id !== action.product.id);
    case CLEAR_PRODUCT:
        return action.product;
    default:
      return state;
  }
}