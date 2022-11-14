import React, { useState, useCallback } from 'react';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import image1 from "../../../src/images/JumboBgImg.jpeg"
import './RegisterCustomer.css';
import Select from './Select';


function RegisterCustomer(props) {

    const newstyle = {
        backgroundImage: `url(${image1})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }

    const initialState = {
        customerName: "",
        username: "",
        customerMobileNo: "",
        pickupLocation: "",
        password: "",
    };

    const cityList = [
        { value: 'Delhi', label: 'Delhi' },
        { value: 'Mumbai', label: 'Mumbai' },
        { value: 'Chennai', label: 'Chennai' },
        { value: 'Kolkata', label: 'Kolkata' },
    ];

    const [customer, setCustomer] = useState(initialState);
    const [passwordShown, setPasswordShown] = useState(false);

    const navigate = useNavigate();

    const togglePassword=()=>{setPasswordShown(!passwordShown)}
    
    const [form, setForm] = useState({
        city: null
    });

    const onValidate = (value, name) => {
        setError((prev) => ({
            ...prev,
            [name]: { ...prev[name], errorMsg: value },
        }));
    };

    const [error, setError] = useState({
        city: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onValidate,
        },
    });

    const onHandleChange = useCallback((value, name) => {
        setForm({ ...form, [name]: value });

    });

    const customerDetails = {
        customerName: customer.customerName,
        username: customer.username,
        customerMobileNo: customer.customerMobileNo,
        pickupLocation: form.city,
        password: customer.password,
    };

    const validateForm = () => {
        let isInvalid = false;
        Object.keys(error).forEach((x) => {
            const errObj = error[x];
            if (errObj.errorMsg) {
                isInvalid = true;
            } else if (errObj.isReq && !form[x]) {
                isInvalid = true;
                onValidate(true, x);
            }
        });
        return !isInvalid;
    };


    function handleSubmit(event) {
        event.preventDefault();
        async function addCustomer() {
            const isValid = validateForm();
            if (!isValid) {
                console.error('Invalid Form!');
                return false;
            }
            else {
                try {
                    const response = await axios.post("http://localhost:4000/auth/register", customerDetails);
                    alert("Customer created succesfully.")
                    navigate(`/login-customer`)

                } catch (error) {
                    alert("Username already exists.");
                }
            }
        }
        addCustomer();
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
                <div id="registerform">
                    <h2>Register Customer</h2>
                    <hr />
                    <h3>Already have an account ?..
                        <Link
                            to={'/login-customer/'}
                        >
                            Login here
                        </Link>
                    </h3>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">🤵 Customer Name</label>
                            <input type="text" pattern="[A-Za-z]+[A-Za-z ]+"
                                name="customerName"
                                className="form-control"
                                value={customer.customerName}
                                onChange={handleChange}
                                autocomplete="off"
                                required />
                        </div>
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
                            <label className="form-label">📞 Customer Mobile Number</label>
                            <input type="text"
                                name="customerMobileNo"
                                className="form-control"
                                value={customer.customerMobileNo}
                                onChange={handleChange}
                                pattern="[6-9][0-9]{9}"
                                autocomplete="off"
                                required />
                                <span><h6>Format : [6-9]XXXXXXXXX</h6></span>
                        </div>
                        <div className="form-group">
                            <Select
                                name="city"
                                title="📍 Pickup Location"
                                value={form.city}
                                options={cityList}
                                onChangeFunc={onHandleChange}
                                {...error.city}
                            />
                        </div>
                        {/* <div className="form-group">
                            <label className="form-label">Pick Up Location</label>
                            <input type="text"
                                name="pickupLocation"
                                className="form-control"
                                value={customer.pickupLocation}
                                onChange={handleChange}
                                required />
                        </div> */}
                        {/* <div className="form-group">
                            <label className="form-label">Pickup Location</label>
                            <select className="custom-select form-control"
                                name="pickupLocation"
                                value={customer.pickupLocation}
                                onChange={handleChange}
                                required >
                                <option hidden>Select a city</option>
                                {
                                   Cities.map((city) => {
                                        return (
                                            <option key={city} value={city}>{city}</option>
                                        )
                                    }) 
                                }
                            </select>
                        </div>  */}
                        <div className="form-group">
                            <label className="form-label">🔒 Password</label>
                            <input type={passwordShown ? "text" :"password"}
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                                name="customerPassword"
                                className="form-control"
                                value={customer.customerPassword}
                                onChange={handleChange}
                                minLength="8"
                                required />
                                <span><h6>Must contain a capital letter, a small letter, a number, a special character and minimum length must be 8</h6></span>
                            <span id="showpass" onClick={togglePassword}>👁️</span>
                        </div>
                        <div className="buttonSubmit">
                            <input type="submit" value="Register" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}
export default RegisterCustomer;