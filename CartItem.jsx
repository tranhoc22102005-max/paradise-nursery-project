import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.cost * item.quantity), 0);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      
      <div className="product-grid">
        {cart.map(item => (
          <div key={item.name} className="cart-item">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <div>Unit Price: ${item.cost}</div>
            <div style={{ margin: '15px 0' }}>
              <button className="action-btn" onClick={() => handleDecrement(item)}>-</button>
              <span style={{ margin: '0 15px', fontSize: '18px' }}>{item.quantity}</span>
              <button className="action-btn" onClick={() => handleIncrement(item)}>+</button>
            </div>
            <div>Subtotal: ${item.cost * item.quantity}</div>
            <button className="action-btn" style={{ backgroundColor: '#f44336' }} onClick={() => dispatch(removeItem(item.name))}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px' }}>
        <button className="action-btn" style={{ marginRight: '20px' }} onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <button className="action-btn" onClick={() => alert('Coming Soon')}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
