
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import {  FaEdit, FaTrash } from 'react-icons/fa';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../Message';
import Loader from '../../Loader';
import { toast } from 'react-toastify';
import { getProducts, createProduct, deleteProduct } from '../../../actions/productsAction';



const ProductListScreen = () => {
    const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { 
        products, 
        loading, 
        error 
    } = productList;
 

  const productCreateState = useSelector((state) => state.productCreate);
  const { 
        loading: loadingCreate,
        error: errorCreate, 
        success: successCreate, 
        product 
    } = productCreateState;

    
  const productUpdate = useSelector((state) => state.productUpdate);
  
  const { 
       
    } = productUpdate;
  

 useEffect(() => {
    if (successCreate) {
      toast.success('Product created successfully!');

      dispatch(getProducts());

    } else {
      dispatch(getProducts());
    }
  }, [dispatch, successCreate]);




const createProductHandler = () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      dispatch(createProduct());
    }
  };

  const deleteHanddler = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      dispatch(deleteProduct(id))
        .then(() => {
          dispatch(getProducts());
          toast.success('Product deleted successfully!');
        })
        .catch((err) => {
          console.log('Delete product error:', err);
          toast.error('Error deleting product.');
        });
    }
  };
  
  
  const allProducts = products?.data?.data || [];
    return <>
        <Row className="align-items-center">
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className="text-end">
                <Button className="btn-sm m-3" onClick={createProductHandler }>
                    <FaEdit /> Create Product
                </Button>
            </Col>
        </Row>

        {loadingCreate && <Loader />}
        { loading ? (
          <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : allProducts.length === 0 ? (
                    <Message variant="warning">No products found</Message>
                ) : (

            <>
               <Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {allProducts.filter(product => product).map((product) => (

                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name || 'No Name'}</td>
                                <td>{product.price}</td>
                                <td>{product.cat}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm mx-2'>
                                            <FaEdit  />
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm'
                                    onClick={ () => deleteHanddler(product._id)}>
                                        <FaTrash style={{ color: 'white'}}/>
                                    </Button>
                                </td>
                            </tr>
                            
                        ))}
                    </tbody>
                </Table> 
            </>
        )}
    
    </>;
};

export default ProductListScreen;
