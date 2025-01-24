import React from 'react';

const Cart = ({ cart, removeFromCart, changeQuantity, totalPrice }) => (
  <div className="cart">
    <h2>Cart</h2>
    {cart.length === 0 ? (
      <p>Your cart is empty</p>
    ) : (
      cart.map(item => (
        <div key={item.id} className="cart-item">
          <h4>{item.name}</h4>
          <p>${item.price} x {item.quantity}</p>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
          <button onClick={() => changeQuantity(item.id, item.quantity + 1)}>+</button>
          <button onClick={() => changeQuantity(item.id, item.quantity - 1)}>-</button>
        </div>
      ))
    )}
    <h3>Total: ${totalPrice}</h3>
  </div>
);

export default Cart;
