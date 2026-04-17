import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <div className="App">
      {!showProducts ? (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Paradise Nursery</h1>
            <p>Bring Nature Indoors</p>
            <AboutUs />
            <button 
              className="get-started-btn" 
              onClick={() => setShowProducts(true)}
            >
              Get Started
            </button>
          </div>
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;
