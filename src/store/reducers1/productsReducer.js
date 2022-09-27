import axios from 'axios';

const GET_PRODUCTS = 'GET_PRODUCTS';



const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};



export const getProductsThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/products');
      dispatch(getProducts(data));
    } catch (error) {
      console.log('uh oh something went wrong fetching products.', error);
    }
  };
};

export const addToCart = (cart) => {
  return async(dispatch) => {
    try{
      await axios.post(`/api/orders/${cart.productId}/${cart.accountId}`, cart);
      await axios.put(`/api/products/${cart.productId}`, cart)
    }catch(error){
      console.log('ADD TO CART THUNK ERROR ', error);
    }
  }
}

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}