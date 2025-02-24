import React, { useState, useEffect } from 'react';
import Nav from './comp/nav';
import Rout from './comp/rout';
import Footer from './comp/footer';
import axios from 'axios';

import { Row, Col, Form, ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from './actions/cartActions'; 

// import { loadUser } from './actions/auth';

const App = () => {

  const [products, setProducts] = useState([]); 
  const [shop, setShop] = useState([]);         
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/v1/products'); 
        //console.log(response); 
        const fetched = response.data.data.data; 

        setProducts(fetched);
        setShop(fetched); 
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };


  const Filter = (category) => {
    if (!products) return;
    const cateFilter = products.filter((p) => p.cat === category);
    setShop(cateFilter);
  };

  const allcatefilter = () => {
    setShop(products);
  };

  const [search, setSearch] = useState('');

  const searchProduct = () => {
    if (!search.trim()) {
      alert('Please type something');
      setShop(products);
    } else {
      const searchFilter = products.filter((x) => 
        x.name.toLowerCase().includes(search.toLowerCase()) || 
        x.cat.toLowerCase().includes(search.toLowerCase())
      );
      setShop(searchFilter);
    }
  };

  if (loading) {
    return <div>Loading products from backend...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Nav search={search} setSearch={setSearch} searchProduct={searchProduct} />

      <Rout
        shop={shop}
        Filter={Filter}
        allcatefilter={allcatefilter}
        addToCart={addToCartHandler}
      />

      <Footer />
    </>
  );
};

export const QtySelect = ({ product, qty, setQty }) => {
  return (
    <ListGroup.Item>
      <Row>
        <Col>Qty</Col>
        <Col>
          <Form.Control
            as="select"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          >
            {[...Array(product.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </Form.Control>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default App;