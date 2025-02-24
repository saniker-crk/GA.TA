import React, { Fragment, useState } from "react";
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import './Register.css';
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from 'prop-types';
//import { Filter, allcatefilter } from '../../App';
//import axios from 'axios';

//import { FaHeart,FaEye } from "react-icons/fa";

const Register = ({ setAlert, register, isAuthenticated, Filter, allcatefilter }) => {
  const [formData, setformData] = useState({
  name: '',
  email: '',
  password:'',
  passwordConfirm:'' 
});

const { name, email, password, passwordConfirm } = formData;

const  onChange = e => setformData({ ...formData, [e.target.name]: e.target.value });

const onSubmit = async e => {
  e.preventDefault();
  if(password !== passwordConfirm) {
      setAlert('Password do not match', 'danger');
  } else {
      register({ name, email, password, passwordConfirm });
     
  }
};

if(isAuthenticated) {
  return <Navigate to='/shop' />;

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
                            
                        <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                  <form className="form" onSubmit={e => onSubmit(e)}>
                  <div className="form-group">
                      <input 
                          type="text" 
                          placeholder="Name" 
                          name="name" 
                          value={name} 
                          onChange={e => onChange(e)}
                          />
                  </div>
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
                          //minLength="6"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          placeholder="Confirm Password"
                          name="passwordConfirm"
                          value={passwordConfirm} 
                          onChange={e => onChange(e)}
                          // minLength="6"
                        />
                      </div>
                      <input type="submit" className="btn btn-primary" value="Register" />
                    </form>
                    <p className="my-1">
                    Already have an account? <Link to="/login">Sign In</Link>
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}
const mapStateToProps =state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps, 
  { setAlert, register }
)(Register);