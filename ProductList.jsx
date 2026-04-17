import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plants = [
    { category: 'Air Purifying', name: 'Snake Plant', cost: 15, image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1b7e?w=500' },
    { category: 'Air Purifying', name: 'Spider Plant', cost: 12, image: 'https://images.unsplash.com/photo-1616053359556-91d1e44f8dc1?w=500' },
    { category: 'Succulents', name: 'Aloe Vera', cost: 10, image: 'https://images.unsplash.com/photo-1596547609652-9fc5d8d424b9?w=500' },
    { category: 'Succulents', name: 'Jade Plant', cost: 18, image: 'https://images.unsplash.com/photo-1610450947171-70cb8eb2a2b3?w=500' },
    { category: 'Aromatic', name: 'Lavender', cost: 20, image: 'https://images.unsplash.com/photo-1595908238128-410a8d6b6313?w=500' },
    { category: 'Aromatic', name: 'Mint', cost: 8, image: 'https://images.unsplash.com/photo-1628156108426-11f8b1dbdc7b?w=500' }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isAdded = (name) => cartItems.some(item => item.name === name);

  return (
    <div>
      <nav className="navbar">
        <div className="nav-links">
          <span onClick={() => window.location.reload()}>Home</span>
          <span onClick={() => setShowCart(false)}>Plants</span>
        </div>
        <div className="cart-icon" onClick={() => setShowCart(true)}>
          🛒 Cart ({totalQuantity})
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-grid">
          {plants.map((plant, index) => (
            <div key={index} className="product-card">
              <img src={plant.image} alt={plant.name} />
              <h3>{plant.name}</h3>
              <p>Category: {plant.category}</p>
              <p>Price: ${plant.cost}</p>
              <button 
                className="add-btn"
                onClick={() => handleAddToCart(plant)} 
                disabled={isAdded(plant.name)}
              >
                {isAdded(plant.name) ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
