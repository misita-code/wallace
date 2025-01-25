// CartItem.js
import React, { useState } from 'react';

const CartItem = ({ cartItem, onRemoveFromCart, onUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const handleChangeQuantity = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      onUpdateQuantity(cartItem.id, newQuantity);
    }
  };

  return (
    <div>
      <h3>{cartItem.name} - ${cartItem.price}</h3>
      <p>Quantity: 
        <input 
          type="number" 
          value={quantity} 
          onChange={handleChangeQuantity} 
          min="1"
        />
      </p>
      <button onClick={() => onRemoveFromCart(cartItem.id)}>Remove</button>
    </div>
  );
};

export default CartItem;
