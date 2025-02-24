import React, { Fragment, useState } from "react";
import { MdLocalShipping } from "react-icons/md";
import './nav.css'
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
import { NavDropdown, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";






const Nav = ({auth: { isAuthenticated, loading, userInfo }, logout, search,setSearch, searchproduct}) => {
   
    
    const authLinks = (
      <div className='user' >
       <div className='icon'>
       <li>
       <div className='btn'>
       <Link to="/" onClick={logout}>
            Logout
            
        </Link>
       </div>
       </li>
    </div>
    </div>  
      );

  const adminDropdown = (
    <div className="dropdown">
      <Link to="/profile" className="dropdown-toggle link">
        <div className="dropdown-title">
          <h2>{userInfo?.data?.data?.name}</h2>
        </div>
      </Link>
      <div className="dropdown-menu">
      
        <div className="dropdown-divider"></div>
        <Link to="/admin/productlist" className="dropdown-item">
          Products
        </Link>
        <div className="dropdown-divider"></div>
        <Link to="/admin/userlist" className="dropdown-item">
          Users
        </Link>
        <div className="dropdown-divider"></div>
        <Link to="/admin/orderlist" className="dropdown-item">
          Orders
        </Link>
      </div>
    </div>
  );


   const userProfileLink = (
    <div className="user">
        
        
          <div className="btn">
            <Link to="/profile" className="profile-link"><h2>{userInfo?.data?.data?.name}</h2></Link>
          </div>
          
    </div>
  );
      const guestLinks = (
           <div className='user'>
           <div className='icon'>
           <li>
           <div className='btn'>
               <Link to="/login">Login</Link>
           </div>
           </li>
        </div>
        </div>  
      );

      const guestLinks1 = (
        <>
        <div className='icon'>
            
        </div>
        <div className='info'>
        <Link to="/login"><h2>Login</h2></Link>
        </div>
    </>
      )
    return (
       <>
       <div className='header'>
        <div className='top_header'>
            <div className='icon'>
            <MdLocalShipping />
            </div>
            <div className='info'>
                <p>Δωρεάν Μεταφορικά Για Αγορές ανω των 100€</p>
            </div>
        </div>
        <div className='mid_header'>
            <div className='logo'>
            <img src="/img/products/EIKONES/newlogo.jpeg" alt="newlogo" />




            </div>
            <div className='search_box'>
                <input type='text' value={search} placeholder='search' onChange={(e) => setSearch(e.target.value)}></input>
                <button onClick={searchproduct}><CiSearch /></button>
            </div>
            {!loading && (
                <Fragment>
                    {isAuthenticated ? authLinks : guestLinks}
                </Fragment>
            )}
                
            </div>
                <div className='last_header'>
                    <div className='user_profile'>
                        {!loading && (
                            <Fragment>
                                {isAuthenticated ? (
                                    userInfo?.data?.data?.role === "admin"
                                    ? adminDropdown
                                    : userProfileLink
                                ) : (
                                    guestLinks1
                                )}
                            </Fragment>
                        )}
                        
                    </div>
                    <div className='nav'>
                        <ul>
                            <li><Link to='/' className='link'>Home</Link></li>
                            <li><Link to='/shop' className='link'>Shop</Link></li>
                            <li><Link to='/about' className='link'>About</Link></li>
                            <li><Link to='/contact' className='link'>Contact</Link></li>
                            <li><Link to='/cart' className='link'>Cart</Link></li>
                        </ul>
                    </div>
                    <div className='offer'>
                        <p>Έκπτωση 10% με την πρώτη παραγγελία σας!</p>
                    </div>
                </div>
       </div>
       </>
    )
}

Nav.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
 

  export default connect(
      mapStateToProps, 
      { logout }
  )(Nav);