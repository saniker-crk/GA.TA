import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from 'react-toastify';
import Message from "./Message";
import Loader from "./Loader";
import { updateProfile, updateProfilePassword } from '../actions/auth';
import { getMyOrders } from '../actions/orderAction';

const Profile = () => {
    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordCurrent, setPasswordCurrent] = useState("");

    const dispatch = useDispatch();

    const { userInfo, loading } = useSelector(state => state.auth);
    
    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading: isLoading, error: errorOrders, orders } = orderListMy;

    useEffect(() => {
        if (userInfo?.data?.data) {
            setName(userInfo.data.data.name);
            setEmail(userInfo.data.data.email);
        }
        dispatch(getMyOrders()); 
    }, [dispatch, userInfo]);

    
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          await dispatch(updateProfile({ name, email }));
          toast.success('Profile updated successfully');
        } catch (err) {
          toast.error(err?.message || 'Error updating profile');
        }
      };
      
    
    const updatePasswordHandler = (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            toast.error('Passwords do not match');
        } else {
            try {
                dispatch(updateProfilePassword({ passwordCurrent, password, passwordConfirm }));
                toast.success('Profile Password updated successfully');     
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }   
        }
    }

    if (loading) return <Loader />;
    if (!userInfo) return <Message variant="danger">No user info</Message>;

    const isAdmin = userInfo?.data?.data?.role === 'admin';
        return (
            <Row>
                <Col>
                    <h2>User Profile</h2>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'className='my-2'>
                        <Form.Label>Name  </Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'className='my-2'>
                        <Form.Label>Email  </Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary' className='my-2'>
                            Update
                        </Button>

                    </Form>

                    <Form onSubmit={updatePasswordHandler}>

                        <Form.Group controlId='passwordCurrent'className='my-2'>
                        <Form.Label>Current password  </Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter old password'
                            value={passwordCurrent}
                            onChange={(e) => setPasswordCurrent(e.target.value)}
                        ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'className='my-2'>
                        <Form.Label>password </Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter new password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='passwordConfirm'className='my-2'>
                        <Form.Label>password Confirm </Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter new password again'
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                        ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary' className='my-2'>
                            Update Password
                        </Button>

                    </Form>

                </Col>
                <Col>
                    <h2>My Orders</h2>
                    {isLoading ? <Loader /> : errorOrders ? (
                        <Message variant='danger'>{errorOrders}</Message>
                    ) : !isAdmin ? (
                        <Table striped hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice}€</td>
                                        <td>
                                            { order.isPaid ? (
                                            order.paidAt.substring(0, 10) 
                                            ) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}
                                        </td>
                                        <td>
                                            { order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10) 
                                            ) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}
                                        </td>
                                        <td>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                <Button className='btn-sm' variant='light'>
                                                    Details
                                                </Button>
                                                </LinkContainer>       
                                        </td>
                                    </tr>
                                ) )}
                            </tbody>
                        </Table>
                    ) : null}

                </Col>
            </Row>
            
        );
};

export default Profile;
