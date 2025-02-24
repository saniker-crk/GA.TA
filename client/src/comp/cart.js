import React from 'react';
import './cart.css';
import { Link } from 'react-router-dom';
import {  FaTrash } from 'react-icons/fa';
import { Form, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions'

const Cart = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const handleAddToCart = async (product, qty) => {
    dispatch(addToCart({...product, qty }));

  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));

  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

 
 return (
    <div className="cart">
      <h3>#cart</h3>
      {cartItems.length === 0 ? (
        <div className="empty_cart">
          <h2>Your shopping cart is empty</h2>
          <Link to="/shop">
            <button>Shop now</button>
          </Link>
        </div>
      ) : (
        <div className="container">
          {cartItems.map((item) => (
            
            <div className="box" key={item._id}>
               <div className="img_box">
                  <img
                    src={`../${item.imageCover}`}
                    alt="imageCover"
                  />
               </div>
               <div className="detail">
                 <div className="info">
                   <h4>{item.cat}</h4>
                   <Link to={`/product/{item._id}`}><h3>{item.name}</h3></Link>
                   <p>Price: €{item.price}</p>
                   <p>Total: €{item.price * item.qty}</p>
                 </div>
                 <div className="quantity">
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) => handleAddToCart(item, Number(e.target.value))}>
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                    </Form.Control>
                    
                 </div>
                 <div className="icon">
                   
                    <Button onClick={ () => removeFromCartHandler(item._id)}>
                      <FaTrash />
                    </Button>
                   
                 </div>
               </div>
             </div>
          ))}
          <ListGroup.Item>
            <h2>
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              items
            </h2>
            €{ cartItems
            .reduce((acc, item) => acc +item.qty * item.price, 0)
            .toFixed(2) }
          </ListGroup.Item>
            <div className="box" >
                  <ListGroupItem>
                    <Button onClick={ checkoutHandler}>Proceed To Checkout</Button>
                  </ListGroupItem>
            </div>
        </div> 
      )}
     

    </div>
  );
};

export default Cart;
