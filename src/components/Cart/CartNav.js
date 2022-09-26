// import React, {useEffect} from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// // import { logoutAccount } from '../../store/reducers1/authReducer';
// // import { clearCart } from '../../store/reducers1/cartReducer';

// const CartNav = () => {
//     const dispatch = useDispatch();
//     const auth = useSelector((state) => state.auth);
//     const cart = useSelector((state) => state.cart)

//     console.log('CART', cart)
//     console.log('AUTH', auth)
//     // const id = auth.id;
//     // const username = auth.username;
//     let cartItems = 0;

//     const cartProducts = cart.products;
//     if (cartProducts){
//         let total = 0;
//         const totalProducts = cartProducts.map((items) => {
//             total += items.lineItems.quantity;
//             return total;
//         });
    
//         cartProducts = totalProducts[totalProducts.length - 1];
//     }

    

//     return (
//         <>
//         <Link to='cart'>
//             {cartItems ? <button className='cart-view'>Cart: {cartItems}</button>: ''}
//         </Link>
//         </>
//     )
// }

// export default CartNav;