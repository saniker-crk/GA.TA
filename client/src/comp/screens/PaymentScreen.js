import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Form, Button, Col } from 'react-bootstrap';
import React from 'react';
import './../cart.css';
import './PaymentScreen.css';

import CheckoutSteps from '../checkoutSteps';
import { savePaymentMethod } from '../../actions/cartActions';




const Payment = () => {
    
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress, PaymentMethod } = cart;
    const [paymentMethod, setPaymentMethod] = useState(PaymentMethod?.paymentMethod || '');
    const [error, setError] = useState('');
    
    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping');
        }
     },[shippingAddress, navigate])

     const submitHandler = (e) => {
        e.preventDefault();
        if (!paymentMethod) {
            setError('Please select a payment method.');
            return;
          }
          setError('');
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
     }

    return ( 
        <div className="cart">
            <CheckoutSteps step1 step2 step3/>
        <h3>#Payment Method</h3>
        <Form onSubmit={submitHandler }>
            <Form.Group>
                <Form.Label as='legend' >Select Method</Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        className='my-2'
                        label='PayPal or Credit Card'
                        id='PayPal'
                        name='paymentMethod'
                        value="PayPal"
                        checked={paymentMethod === 'PayPal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                    <Form.Check
                        type="radio"
                        className="my-2"
                        label="Αντικαταβολή"
                        id="CashOnDelivery"
                        name="paymentMethod"
                        value="Αντικαταβολή"
                        checked={paymentMethod === 'Αντικαταβολή'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                </Col>
            </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>            
        </Form>
   </div>
 
   
  );
};

      
   

   

export default Payment;
