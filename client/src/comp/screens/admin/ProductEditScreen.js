
import {  Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from '../../Message';
import Loader from '../../Loader';
import FormContainer from '../../FormContainer';
import { toast } from 'react-toastify';
import { updateProduct, getProductDetails, uploadProductImage } from '../../../actions/productsAction';
import { PRODUCT_UPDATE_RESET } from '../../../actions/types';



const ProductEditScreen = () => {
    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [imageCover, setImageCover] = useState('');
    const [brand, setBrand] = useState('');
    const [cat, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const { loading: loadingUpdate, error: updateError, success: successUpdate } = productUpdate;
    
    const productImageUpload = useSelector((state) => state.productImageUpload);

    const {
    loading: loadingUpload,
    error: uploadError,
    success: successUpload,
    imageUrl
    } = productImageUpload;

    useEffect(() => {
        dispatch(getProductDetails(productId));
    }, [dispatch, productId]);
 
    useEffect(() => {
       
        if (product && product._id) {
            setName(product.name || '');
            setPrice(product.price || 0);
            setImageCover(product.imageCover || '');
            setBrand(product.brand || '');
            setCategory(product.cat || '');
            setCountInStock(product.countInStock || 0);
            setDescription(product.description || '');
        }
    }, [product]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const updatedProduct = {
            _id: productId,
            name,
            price,
            imageCover,
            brand,
            cat,
            countInStock,
            description,
        };
    dispatch(updateProduct(productId, updatedProduct));
    }

     useEffect(() => {
        if (successUpdate) {
            toast.success('Το προϊόν ενημερώθηκε με επιτυχία');
            dispatch({ type: PRODUCT_UPDATE_RESET });
            dispatch(getProductDetails(productId)); 
            navigate('/admin/productlist');
            //dispatch({ type: PRODUCT_UPDATE_RESET });

        }
    }, [successUpdate, navigate, dispatch, productId]);

    useEffect(() => {
        if (successUpload && imageUrl) {
          toast.success('Image uploaded successfully!');
          const cleanedUrl = imageUrl.startsWith('/') ? imageUrl.substring(1) : imageUrl;
          setImageCover(cleanedUrl);
        }
      }, [successUpload, imageUrl]);


    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
    
        const formData = new FormData();
        formData.append('image', file);
    
        try {
            await dispatch(uploadProductImage(file)); 
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message);
        }
    };
    
    
    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
            Go back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant="danger">{error}</Message>
                    ) : product ? ( 


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

                        <Form.Group controlId='price'className='my-2'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        
                        <Form.Group controlId='image'className='my-2'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Image Url'
                                value={imageCover}
                                onChange={(e) => setImageCover(e.target.value)}
                            ></Form.Control>
                            <Form.Control 
                            type='file' 
                            Label='Choose file'
                            onChange={uploadFileHandler}
                            ></Form.Control>
                            {imageCover && (
                            <img
                            src={`/${imageCover}`}
                                alt="Product Preview"
                                width="100"
                            />
                            )}
                        </Form.Group>

                        <Form.Group controlId='brand'className='my-2'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Brand Name'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock' className='my-2'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Quantity'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category' className='my-2'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Category'
                                value={cat}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='description' className='my-2'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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
                    <Message variant="warning">Product not found</Message>
                )}
                
            </FormContainer>

        </>
    )
};

export default ProductEditScreen;