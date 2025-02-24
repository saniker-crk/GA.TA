
import {  Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from '../../Message';
import Loader from '../../Loader';
import FormContainer from '../../FormContainer';
import { toast } from 'react-toastify';
import { updateUser, getUserDetails } from '../../../actions/userAction';
import { USER_UPDATE_RESET } from '../../../actions/types';



const UserEditScreen = () => {
    const { id: userId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading: loadingUpdate, error: updateError, success: successUpdate } = userUpdate;
    
   

   
    useEffect(() => {
        dispatch(getUserDetails(userId));
    }, [dispatch, userId]);
 
    useEffect(() => {
       
        if (user && user._id) {
            setName(user.name || '');
            setEmail(user.email || '');
            setRole(user.role || '');
            
        }
    }, [user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const updatedUser = {
            _id: userId,
            name,
            email,
            role,
            
        };
    dispatch(updateUser(userId, updatedUser));
    }

     useEffect(() => {
        if (successUpdate) {
            toast.success('Το προϊόν ενημερώθηκε με επιτυχία');
            dispatch({ type: USER_UPDATE_RESET });
            dispatch(getUserDetails(userId)); 
            navigate('/admin/userlist');
            //dispatch({ type: PRODUCT_UPDATE_RESET });

        }
    }, [successUpdate, navigate, dispatch, userId]);

    
    
    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
            Go back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant="danger">{error}</Message>
                    ) : user ? ( 


                    <Form onSubmit={submitHandler }>
                        <Form.Group controlId='name'className='my-2'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'className='my-2'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        
                        <Form.Group controlId='image'className='my-2'>
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Role'
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Button
                            type='submit'
                            variant='primary'
                            className='my-3'
                            >
                                Update
                            </Button>
                    </Form>
                   ) : (
                    <Message variant="warning">User not found</Message>
                )}
                
            </FormContainer>

        </>
    )
};

export default UserEditScreen;