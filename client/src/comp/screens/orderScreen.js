import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import './orderScreen.css';

import {
  getOrderDetails,
  payOrder,
  deliverOrder,
  getPaypalClientId,
} from '../../actions/orderAction';
import Loader from '../Loader';
import Message from '../Message';


const OrderScreen = () => {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    //success: successPay,
    //error: errorPay,
  } = orderPay;


  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    success: successDeliver,
    //error: errorDeliver,
  } = orderDeliver;


  const paypalClient = useSelector((state) => state.paypalClientId);
  const {
    loading: loadingPayPal,
    error: errorPayPal,
    clientId
  } = paypalClient;

  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();



useEffect(() => {
    dispatch(getOrderDetails(orderId));
    dispatch(getPaypalClientId());
  }, [dispatch, orderId]);

  useEffect(() => {
    if (successDeliver) {
      toast.success('Order delivered');
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, successDeliver, orderId]);
  
 

    useEffect(() => {
        if (!errorPayPal && !loadingPayPal && clientId) {
            const loadPayPalScript = async () => { 
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                    'client-id': clientId,
                     currency: 'EUR',
                },
            });
            paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
        }
        if (order && !order.isPaid) {
            if(!window.paypal){
                loadPayPalScript();
            }
        }

    }
  }, [order, clientId, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) { 
    return actions.order.capture().then(async function (details) {
        try {
                dispatch(payOrder(orderId, details));
                dispatch(getOrderDetails(orderId));
                toast.success('Payment successful');
                window.location.reload();
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        }
     });
  }
  async function onApproveTest() { 
    dispatch(payOrder(orderId, { payer: {} }));
    dispatch(getOrderDetails(orderId));
    toast.success('Payment successful');
    window.location.reload();
  }
  function onError(err) { 
    toast.error(err.message);
  }
  function createOrder(data, actions) { 
    return actions.order.create({
        purchase_units: [
            {
                amount: {
                    value: order.data.totalPrice || '0'
                },
            },
        ],
    }).then((orderId) => { 
        return orderId
    })
  }

 const deliverOrderHandler = () => {
  dispatch(deliverOrder(orderId));
};

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="order-screen"> 
      <h1>Order {order.data._id}</h1>
      <Row>
        <Col md={8}>
            <ListGroup.Item>
                <h2>Shipping </h2>
                <p>
                    <strong>Name: </strong>{order.data?.user?.name}
                </p>
                <p>
                    <strong>Email: </strong>{' '}
                    <a href={`mailto:${order.data?.user?.email}`}>{order.data.user.email}</a>
               
                </p>
                <p>
                    <strong>Address: </strong>
                    {order.data.shippingAddress.address}, {order.data.shippingAddress.city},{' '}
              {order.data.shippingAddress.postalCode}, {order.data.shippingAddress.country}
                </p>
                {order.data.isDelivered ? (
              <Message variant="success">
                Delivered on {order.data.orderDeliver}
              </Message>
            ) : (
              <Message variant="danger">Not Delivered Yet</Message>
            )}
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                    <strong>Method: </strong>
                    {order.data.paymentMethod}
                </p>
                {order.data.isPaid ? (
              <Message variant="success">Paid on {order.data.paidAt}</Message>
            ) : (
              <Message variant="danger">Not Paid Yet</Message>
            )}
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>Order Items</h2>
                {order.data.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                        <Row>
                        <Col md={2}>
                            <Image
                                src={`/${item.imageCover}`}
                                alt={item.name}
                                fluid
                                rounded
                                style={{ width: '80px', height: '80px' }} 
                            />
                        </Col>
                        <Col>
                            <Link to={`/products/${item.product}`}>
                                {item.name}
                            </Link>
                        </Col>
                        <Col md={4}>
                            {item.qty} x {item.price}€ = 
                            {(item.qty * (item.price * 100)) / 100}€
                        </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup.Item>
        </Col>
        <Col md={4}>
        <Card>
        
            <ListGroup.Item>
                <h2>Order Summary</h2>
            </ListGroup.Item>  
            <ListGroup.Item>
            <Row>
                <Col>Items</Col>
                <Col>{order.data.itemsPrice}€</Col>
            </Row>

            <Row>
                <Col>Items</Col>
                <Col>{order.data.shippingPrice}€</Col>
            </Row>

            <Row>
                <Col>Tax</Col>
                <Col>{order.data.taxPrice}€</Col>
            </Row>

            <Row>
                <Col>Total</Col>
                <Col>{order.data.totalPrice}€</Col>
            </Row>
            </ListGroup.Item> 
            
            { !order.data.isPaid && order.data.paymentMethod !== 'Αντικαταβολή' && (
                <ListGroup.Item>
                    {loadingPay && <Loader />}

                    { isPending ? <Loader /> : (
                        <div>
                            <Button onClick={onApproveTest} style={{marginBottom: '10px'}}> Test Pay Order</Button>
                            <div>
                                <PayPalButtons
                                createOrder={ createOrder}
                                onApprove={onApprove}
                                onError={onError}
                                ></PayPalButtons>
                            </div>
                        </div>
                    )}
                </ListGroup.Item>
            )} 

{userInfo?.data?.data?.role === 'admin' &&
              (order.data.isPaid || order.data.paymentMethod === 'Αντικαταβολή') &&
              !order.data.isDelivered && (
                <ListGroup.Item>
                  {loadingDeliver && <Loader />}
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={deliverOrderHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
        </Card>
            
        </Col>
      </Row>
    </div>

  )
   
     
      
    
};

export default OrderScreen;
