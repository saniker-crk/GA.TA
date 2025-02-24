import { useState } from "react";
import React from "react";
import { QtySelect }from './../App';
import './shop.css';
import { FaHeart, FaEye } from "react-icons/fa";



const ProductPage = ({ shop, Filter, allcatefilter, addToCartHandler, addToCart }) => {
 
  const [quantities, setQuantities] = useState({});

  const handleSetQty = (productId, newQty) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: newQty,
    }));
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product._id] || 1;
    addToCart(product, qty); 
  };

  return (
    <div className="shop">
      <h2># shop</h2>
      <p>Home . shop</p>
      <div className="container">
        <div className="left_box">
          <div className="category">
            <div className="header">
              <h2>all categories</h2>
            </div>
            <div className="box">
              <ul>
                <li onClick={() => allcatefilter()}> - All </li>
                <li onClick={() => Filter('headphone')}> - Headphone </li>
                <li onClick={() => Filter('laptop')}> - Laptop </li>
                <li onClick={() => Filter('watch')}> - Watch </li>
                <li onClick={() => Filter('speaker')}> - Speaker </li>
              </ul>
            </div>
          </div>
          <div className="banner">
            <div className="img_box">
              <img src="EIKONES/shop_left.jpeg" alt="banner" />
            </div>
          </div>
        </div>

        
          </div>
          <div className="product_box">
            <h2>Shop Product</h2>
            <div className="product_container">
              {shop.map((product) => {
                const currentQty = quantities[product._id] || 1;

                return (
                  <div className="box" key={product._id}>
                    <div className="img_box">
                      <img
                        src={`../img/products/${product.imageCover}`}
                        alt={product.imageCover}
                      />
                      <div className="icon">
                        <li><FaHeart /></li>
                        <li><FaEye /></li>
                      </div>
                    </div>
                    <div className="detail">
                      <h3>{product.name}</h3>

                      {product.countInStock > 0 && (
                        <QtySelect
                          product={product}
                          qty={currentQty}
                          setQty={(value) => handleSetQty(product._id, value)}
                        />
                      )}

                      <p>€{product.price}</p>
                      <button onClick={() => handleAddToCart(product)}>
                        Add to cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      
  );
};

export default ProductPage;

