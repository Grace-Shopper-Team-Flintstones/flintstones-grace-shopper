import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, updateQuantities, removeLineItem, checkout } from '../../store/reducers1/cartReducer';

const Cart =() => {
   const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);

    console.log('CART', cart);
    console.log('AUTH CART', auth)

    let UUID = cart.UUID || 'empty';
    const accountId = auth.id || 0;
    if(accountId === 0 && UUID === 'empty' && localStorage.UUID !== undefined) {
        UUID = localStorage.getItem('UUID');
    }

    const cartItems = cart.products || [];

    useEffect(() => {
        dispatch(fetchCart(accountId, UUID));
    }, [accountId]);

    return (
        <div>
      {cartItems.length ? (
        <div>
          <div className="row">
            <h3>Cart or Bag</h3>
          </div>
          <div className="row-item">
            <div className="column-left">
              {cartItems.map((item) => (
                <div key={item.id} className="row-cart-Item">
                  <div className="column-item-img">
                    <Link to={`/products/${item.title}`}>
                      <img src={item['imageUrl']} />
                    </Link>
                  </div>
                  <div className="column-heading">
                    <div className="row">
                      <div className="column">{item['title']}</div>{' '}
                      <div className="column">
                        {'$'}
                        {item['price']}
                      </div>
                    </div>
                    <div className="row">
                      <div className="column">
                        <button onClick={() => {
                            if (item.lineItem.quantity > 1) {
                              dispatch(updateQuantities(cart.id, UUID, accountId, lineItem.id, 'decrement'))
                            } else {
                              dispatch(removeLineItem(cart.id, item.id, accountId, UUID))
                            }
                          }}>
                            -
                        </button>
                        <span>Quantity: {item.lineItem.quantity}</span>

                        <button onClick={() => dispatch(updateQuantities(cart.id, UUID, accountId, lineItem.id, 'increment'))
                          }>
                          +
                        </button>
                      </div>
                      <div className="column">
                        <i onClick={() => dispatch(removeCartItem(cart.id, lineItem.id, accountId, UUID))}></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="column-summary">
              <h1>Cart Summary:</h1>
              <div className="row">
                <div className="column">Subtotal: </div>
                <div className="column">
                  {'$'} {cart.orderTotal}.00
                </div>
              </div>
              <div className="row">
                <div className="column">Estimated Shipping</div>
                <div className="column">$5.00</div>
              </div>
              <div className="row">
                <div className="column">Estimated Tax</div>
                <div className="column">10%</div>
              </div>
              <div className="row total">
                <div className="column">Total</div>
                <div className="column">
                  {'$'} {cart.orderTotal + 5 + (cart.orderTotal + 5) * 0.1}.00
                </div>
              </div>

              {auth.id ? (
                <div className="row ">
                  <button onClick={() => {
                      if (accountId !== 0) {
                        dispatch(checkout(UUID));
                      }
                    }}
                  >
                    Checkout
                  </button>
                </div>
              ) : (
                <div className="row">
                  <Link to="signup">
                    <button>Sign up</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h3>Your Cart is Empty!</h3>
        </div>
      )}
    </div>
  );
};

export default Cart