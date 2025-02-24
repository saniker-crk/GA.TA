import React, { Fragment, useState } from "react";
import { Link, Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import './Register.css';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth'

// import { FaHeart,FaEye } from "react-icons/fa";
// import axios from 'axios';

const Login = ({ login, isAuthenticated, Filter, allcatefilter }) => {

    const [formData, setformData] = useState({
        email: '',
        password:''
    });

    const { email, password } = formData;

   

    const  onChange = e => setformData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
            login(email, password);
    };

  const location = useLocation();
  const redirectParam = new URLSearchParams(location.search).get("redirect"); 
    if (isAuthenticated) {
        if (redirectParam) {
            return <Navigate to={redirectParam} />;
        }
        return <Navigate to="/" />;
    }
    
    return (<Fragment>
       
        <div className="shop">
            <h2># shop</h2>
            <p>Home . shop</p>
            <div className="container">
                <div className="left_box">
                    <div className="category">
                        <div className="header">
                            <h2>all categories</h2>
                        </div>
                        <div className="box">
                            <ul>
                            <li onClick={() => allcatefilter('All')}>#All</li>
                                <li onClick={() => Filter('headphone')}># Headphone</li >
                                <li onClick={() => Filter('laptop')}># Laptop</li >
                                <li onClick={() => Filter('watch')}># Watch</li >
                                <li onClick={() => Filter('speaker')}># Speaker</li >
                            </ul>
                        </div>
                    </div>
                    <div className="banner">
                        <div className="img_box">
                            <img src ='EIKONES/shop_left.jpeg' alt="banner"></img>
                        </div>
                    </div>
                </div>
                <div className="right_box">
                    <div className="banner">
                        <div className="img_box">
                            
                        <h1 className="large text-primary">Sign in</h1>
                  <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
                  <form className="form" onSubmit={e => onSubmit(e)}>
                      <div className="form-group">
                          <input 
                              type="email" 
                              placeholder="Email Address" 
                              name="email" 
                              value={email} 
                              onChange={e => onChange(e)}
                              
                            />
                        </div>
                      <div className="form-group">
                        <input
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={password} 
                          onChange={e => onChange(e)}
                          minLength="6"
                        />
                      </div>
                
                      <input type="submit" className="btn btn-primary" value="Login" />
                    </form>
                    <p className="my-1">
                      Create an account? <Link to="/register">Sign Up</Link>
                    </p>
                    <p className="my-1">
                      Forgot Your Password? <Link to="/forgotPassword">Click here</Link>
                    </p>







                        </div>
                    </div>
                    </div>
              </div>
              </div>

                 
</Fragment>)
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}
const mapStateToProps =state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps, 
    { login }
)(Login);