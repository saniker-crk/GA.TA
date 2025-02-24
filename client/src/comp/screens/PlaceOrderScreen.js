import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import { Button, Col, Row, ListGroup, Card, Image } from 'react-bootstrap';
import './../cart.css';
import { toast } from 'react-toastify';
import CheckoutSteps from '../checkoutSteps';
import { createOrder } from '../../actions/orderAction';
import { clearCartItems } from './../../actions/cartActions';
import Message from '../Message';
import Loader from '../Loader';
import { CREATE_ORDER_RESET } from '../../actions/types';
import './PlaceOrderScreen.css';

const PlaceOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const cart = useSelector((state) => state.cart);
    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, success, loading, error } = orderCreate;


  useEffect(() => {
    if (success && order && order._id) {
      dispatch(clearCartItems()); 
      navigate(`/order/${order._id}`); 
      dispatch({ type: CREATE_ORDER_RESET }); 
    }
  }, [success, dispatch, navigate, order]);


  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

 
  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 5;
  cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2));
  cart.totalPrice = Number((cart.itemsPrice + cart.shippingPrice + cart.taxPrice).toFixed(2));


  const placeOrderHandler = () => {
 
    if (cart.cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (!cart.shippingAddress.address) {
      toast.error('Shipping address is missing');
      return;
    }

    if (!cart.paymentMethod) {
      toast.error('Payment method is missing');
      return;
    }


    const preparedOrderItems = cart.cartItems.map((item) => ({
      product: item._id, 
      name: item.name,
      qty: item.qty,
      price: item.price,
      imageCover: item.imageCover,
    }));


    dispatch(
      createOrder({
        orderItems: preparedOrderItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

    return (
        <div className='placeholder-container'>
            <CheckoutSteps step1 step2 step3 step4 />
            <h3>#Place Order</h3>
            <Row>
                
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address:</strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                            {cart.shippingAddress.postalCode},{' '}
                            {cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method: </strong>
                        {cart.paymentMethod}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? (
                            <Message>Your cart is empty.</Message>
                        ) : (
                            <ListGroup variant='flush'>
                                { cart.cartItems.map((item, index) => (
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
                                )) }
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
              
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                           
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>{cart.itemsPrice.toFixed(2)}€</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>{cart.shippingPrice.toFixed(2)}€</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>{cart.taxPrice.toFixed(2)}€</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price:</Col>
                                    <Col>{cart.totalPrice.toFixed(2)}€</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button 
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrderHandler} 
                                >
                                    Place Order
                                </Button>
                                {loading && <Loader />}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default PlaceOrder;
