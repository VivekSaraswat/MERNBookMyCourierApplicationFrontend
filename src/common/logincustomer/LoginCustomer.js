import React, { useState } from "react";
import axios from "axios";
import { useNavigate , Link } from "react-router-dom";
import image1 from "../../../src/images/JumboBgImg.jpeg"
import './LoginCustomer.css';



const LoginCustomer = (props) => {

    const newstyle = {
        backgroundImage: `url(${image1})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }

    const initialState = {
        username: "",
        password: "",
    };

    const [customer, setCustomer] = useState(initialState);
    const [passwordShown, setPasswordShown] = useState(false);

    const navigate = useNavigate();

    const togglePassword=()=>{setPasswordShown(!passwordShown)}

    function handleSubmit(event) {
        event.preventDefault();
        async function loginCustomer() {
            try {
                const response = await axios.post("http://localhost:4000/auth/login", customer);
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('userId', response.data._id);
                navigate(`/view-profile-customer`)
            } catch (error) {
                alert("Invalid Credentials");
            }
        }
        loginCustomer();
    }

    function handleChange(event) {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }


    return (
        <>
            <div id="mycontent">
                <div className="jumbotron" style={newstyle}>
                    <h1 className="display-3">Courier Service</h1>
                    <p className="lead">An easy doorstep service for you..</p>
                </div>
                <div id="loginform">
                    <h2>Login Customer</h2>
                    <hr />
                    <h3>Don't have an account?...
                    <Link
                            to={'/register-customer/'}
                        >
                            Register here
                        </Link>
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">👤 Username</label>
                            <input type="text"
                                name="username"
                                className="form-control"
                                value={customer.username}
                                onChange={handleChange}
                                minLength="5"
                                autocomplete="off"
                                required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">🔒 Password</label>
                            <input type={passwordShown ? "text" :"password"}
                                name="customerPassword"
                                className="form-control"
                                value={customer.customerPassword}
                                onChange={handleChange}
                                minLength="8"
                                required />
                            <span id="showpass" onClick={togglePassword}>👁️</span>
                        </div>
                        <div className="buttonSubmit">
                            <input type="submit" value="Login" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginCustomer;