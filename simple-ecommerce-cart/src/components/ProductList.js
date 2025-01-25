// ProductList.js
import React from 'react';
import Product from './Product';

const ProductList = ({ products, onAddToCart }) => {
  return (
    <div>
      <h2>Products</h2>
      <div>
        {products.map(product => (
          <Product key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
