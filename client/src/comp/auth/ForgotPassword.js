import React, { Fragment, useState } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Register.css';
import axios from 'axios';
import { setAlert } from "../../actions/alert";



const ForgotPassword = ({ setAlert, Filter, allcatefilter }) => {

    const [formData, setformData] = useState({ email: ''});

    const { email } = formData;

    const  onChange = e => setformData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
            const newUser = {
                email
            };
        

            try {
                const config = {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                };
            
                const body = JSON.stringify(newUser);

                const res = await axios.post('http://127.0.0.1:5000/api/v1/users/forgotpassword', body, config);
                console.log(res.data);
            } catch(err) {
                console.error('Error from backend:', err.response?.data || err.message);;

            };
        
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

                                    <h1 className="large text-primary">Forget Your Password ?</h1>
                            <p className="lead"><i className="fas fa-user"></i> Fill your email to send token</p>
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
                            
                            <input type="submit" className="btn btn-primary" value="Send Link" />
                            </form>
                            <p className="my-1">
                            Create an account? <Link to="/register">Sign Up</Link>
                            </p>
                            <p className="my-2">
                            Remember Your Password? <Link to="/login">Sign In</Link>
                            </p>


                        </div>
                    </div>
                </div>


            </div>
        </div>

    </Fragment>)
    
};

export default connect(null, { setAlert })(ForgotPassword);