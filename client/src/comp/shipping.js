import React from 'react';
import './cart.css';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';




const Shipping = () => {
    const cart = useSelector((state) => state.cart);
    const { ShippingAddress } = cart;


    const [address, setAddress] = useState(ShippingAddress?.address || '');
    const [city, setCity] = useState(ShippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(ShippingAddress?.postalCode || '');
    const [country, setCountry] = useState(ShippingAddress?.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
      };

    return ( 
        <div className="cart">
        <h3>#shipping</h3>
        
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='adress' className='m-2'>
            <Form.Label>Address  </Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter address'
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='city'className='m-2'>
            <Form.Label>City     </Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter city'
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='postalCode'className='m-2'>
            <Form.Label>Postal Code  </Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter postal code'
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='country'className='m-2'>
            <Form.Label>Country  </Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter country'
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>Continue</Button>
        </Form>
      
        </div>
 
   
  );
};

      
   

   

export default Shipping;

