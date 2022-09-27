import axios from 'axios';
import { getProductsThunk } from './productsReducer';

const GET_PRODUCT= 'GET_PRODUCT';
const GET_INVENTORY= 'GET_INVENTORY';
const ADD_PRODUCT = 'ADD_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const CLEAR_PRODUCT = 'CLEAR_PRODUCT';
const GET_ACCOUNTS = 'GET_ACCOUNTS';
const GET_ACCOUNT = 'GET_ACCOUNT';
const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
const CLEAR_ACCOUNT = 'CLEAR_ACCOUNT';


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

const addProduct = (product) => {
  return{
    type: ADD_PRODUCT,
    product,
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
  
  export const getAccounts = (accounts) => {
    return{
      type: GET_ACCOUNTS,
      accounts,
    };
  };

  const getAccount = (account) => {
    return {
      type: GET_ACCOUNT,
      account,
    };
  };

  export const deleteAccount = (account) => {
    return{
      type: DELETE_ACCOUNT,
      account,
    };
  };

  export const clearAccount = () => {
    return{
      type: CLEAR_ACCOUNT,
      account: null,
    };
  };

export const addNewProduct = (product, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      if(token){ 
        await axios.post('/api/admin/products', product, {
          headers: {
          authorization:token
         }
        });}
        dispatch(addProduct(product));
        history.push('/admin');
    } catch (error) {
      console.log('ADD PRODUCT THUNK ERROR ', error);
    }
  };
};

export const fetchInventory = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/admin/products');
      dispatch(getInventory(data));
    } catch (error) {
      console.log('FETCH INVENTORY THUNK ERROR ', error);
    }
  };
};

export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.get(`/api/admin/products/${id}`);
      dispatch(getProduct(product));
    } catch (error) {
      console.error('FETCH SINGLE PRODUCT ERROR', error);
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
      console.log('UPDATE PRODUCT THUNK ERROR ', error);
    }
  };
};

export const deleteThisProduct = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`api/products/${id}`);
      //dispatch(getProductsThunk());
    } catch (error) {
      console.log('DELETE PRODUCT THUNK ERROR ', error);
    }
  };
};

export const fetchAccounts = () => {
  return async(dispatch) => {
    try{
      const { data } = await axios.get('/api/orderInfo');
      dispatch(setAccounts(data));
    }catch(error){
      console.log('FETCH ACCOUNTS THUNK ERROR ', error)
    }
  }
};

export const fetchAllAccounts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/admin/accounts');
      dispatch(getAccounts(data));
    } catch (error) {
      console.log('FETCH ALL ACCOUNTS ERROR ', error);
    }
  };
};

export const fetchSingleAccount = (id) => {
  return async (dispatch) => {
    try {
      const { data: account } = await axios.get(`/api/admin/account/${id}`);
      dispatch(getAccount(account));
    } catch (error) {
      console.error('FETCH SINGLE ACCOUNT ERROR', error);
    }
  };
};

export const deleteThisAccount = (id) => {
  return async (dispatch) => {
    try {
      const { data: deletedAccount } = await axios.delete(`api/accounts/${id}`);
      dispatch(deleteAccount(deletedAccount));
    } catch (error) {
      console.log('DELETE ACCOUNT THUNK ERROR ', error);
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
        return state.filter((product) => product.id !== action.product.id);
    case CLEAR_PRODUCT:
        return action.product;
    case GET_ACCOUNTS:
        return action.accounts;
    case GET_ACCOUNT:
        return action.account;
    case ADD_PRODUCT:
        return[...state, action.product];
    case DELETE_ACCOUNT:
      return state.filter((account) => account.id !== action.account.id);
    case CLEAR_ACCOUNT:
      return action.account;
    default:
      return state;
  }
}