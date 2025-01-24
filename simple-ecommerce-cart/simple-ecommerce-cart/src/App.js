import React, { useState } from 'react';
import Product from './Product';
import Cart from './Cart';

const App = () => {
  // Sample product data
  const [products] = useState([
    { id: 1, name: 'T-Shirt', price: 20 },
    { id: 2, name: 'Jeans', price: 40 },
    { id: 3, name: 'Sneakers', price: 60 },
    { id: 4, name: 'Hat', price: 15 },
    { id: 5, name: 'Socks', price: 5 },
  ]);

  // Cart state to store items in the cart
  const [cart, setCart] = useState([]);

  // Add product to cart or update quantity if already in the cart
  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1; // Increment the quantity if product is already in the cart
    } else {
      updatedCart.push({ ...product, quantity: 1 }); // Add new item to cart
    }

    setCart(updatedCart); // Update the cart state
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id)); // Remove item by id
  };

  // Change quantity of a product in the cart
  const changeQuantity = (id, quantity) => {
    if (quantity < 1) return; // Prevent reducing quantity below 1
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  // Calculate the total price of all items in the cart
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="App">
      <h1>Simple E-Commerce Cart</h1>

      {/* Product List */}
      <div className="products">
        {products.map((product) => (
          <Product key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>

      {/* Cart Summary */}
      <Cart
        cart={cart}
        removeFromCart={removeFromCart}
        changeQuantity={changeQuantity}
        totalPrice={totalPrice}
      />
    </div>
  );
};

export default App;
