// Cart.js
import React from 'react';
import CartItem from './CartItem';

const Cart = ({ cart, onRemoveFromCart, onUpdateQuantity }) => {
  return (
    <div>
      <h2>Your Cart</h2>
      <div>
        {cart.length > 0 ? (
          cart.map(item => (
            <CartItem 
              key={item.id} 
              cartItem={item} 
              onRemoveFromCart={onRemoveFromCart} 
              onUpdateQuantity={onUpdateQuantity} 
            />
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
