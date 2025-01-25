// Import necessary React libraries
import React, { useState } from 'react';
// Import components
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const App = () => {
  // State to hold the products in the cart
  const [cart, setCart] = useState([]);

  // Sample product data
  const products = [
    { id: 1, name: "T-Shirt", price: 20 },
    { id: 2, name: "Jeans", price: 40 },
    { id: 3, name: "Sneakers", price: 60 },
    { id: 4, name: "Hat", price: 15 },
    { id: 5, name: "Socks", price: 5 }
  ];

  // Add a product to the cart
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove a product from the cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Update the quantity of a product in the cart
  const updateQuantity = (productId, quantity) => {
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity }
        : item
    ));
  };

  // Calculate the total price of the items in the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h1>Simple E-Commerce Cart</h1>
      
      {/* Product List Component */}
      <ProductList products={products} onAddToCart={addToCart} />
      
      {/* Cart Component */}
      <Cart 
        cart={cart} 
        onRemoveFromCart={removeFromCart} 
        onUpdateQuantity={updateQuantity} 
      />
      
      {/* Display the total price */}
      <h2>Total: ${calculateTotal()}</h2>
    </div>
  );
};

export default App;
