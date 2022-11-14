import React, { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import image1 from "../../../src/images/JumboBgImg.jpeg";
import "./RegisterDeliveryPerson.css";
import Select from './Select';


function RegisterDeliveryPerson(props) {
  const newstyle = {
    backgroundImage: `url(${image1})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const initialState = {
    deliveryPersonName: "",
    deliveryPersonUsername: "",
    deliveryPersonMobileNo: "",
    deliveryPersonPassword: "",
    deliveryPersonPickupLocation: "",
  };

  const cityList = [
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Chennai', label: 'Chennai' },
    { value: 'Kolkata', label: 'Kolkata' },
  ];

  const [deliveryPerson, setDeliveryPerson] = useState(initialState);
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const togglePassword = () => { setPasswordShown(!passwordShown) }
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

  const deliveryPersonDetails = {
    deliveryPersonName: deliveryPerson.deliveryPersonName,
    deliveryPersonUsername: deliveryPerson.deliveryPersonUsername,
    deliveryPersonMobileNo: deliveryPerson.deliveryPersonMobileNo,
    deliveryPersonPickupLocation: form.city,
    deliveryPersonPassword: deliveryPerson.deliveryPersonPassword,
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
    async function addDeliveryPerson() {
      const isValid = validateForm();
      if (!isValid) {
        console.error('Invalid Form!');
        return false;
      }
      else {
        try {
          const response = await axios.post("http://localhost:4000/deliveryPerson/auth/register", deliveryPersonDetails);
          alert("Delivery Person created succesfully.")
          navigate(`/login-delivery-person`);
        } catch (error) {
          alert("Username already exists.");
        }
      }
    }
    addDeliveryPerson();
  }

  function handleChange(event) {
    setDeliveryPerson({ ...deliveryPerson, [event.target.name]: event.target.value });
  }

  return (
    <>
      <div id="mycontent">
        <div className="jumbotron" style={newstyle}>
          <h1 className="display-3">Courier Service</h1>
          <p className="lead">An easy doorstep service for you..</p>
        </div>
        <div id="registerform">
          <h2>Register Delivery Person</h2>
          <hr />
          <h3>Already have an account ?..
            <Link
              to={'/login-delivery-person/'}
            >
              Login here
            </Link>
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">🤵 Delivery Person Name</label>
              <input pattern="[A-Za-z]+[A-Za-z ]+"
                type="text"
                name="deliveryPersonName"
                className="form-control"
                value={deliveryPerson.deliveryPersonName}
                onChange={handleChange}
                autocomplete="off"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">👤 Username</label>
              <input
                type="text"
                name="deliveryPersonUsername"
                className="form-control"
                value={deliveryPerson.deliveryPersonUsername}
                onChange={handleChange}
                minLength="5"
                autocomplete="off"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">📞 Delivery Person Mobile Number</label>
              <input
                type="text"
                name="deliveryPersonMobileNo"
                className="form-control"
                value={deliveryPerson.deliveryPersonMobileNo}
                onChange={handleChange}
                pattern="[6-9][0-9]{9}"
                autocomplete="off"
                required
              />
              <span><h6>Format : [6-9]XXXXXXXXX</h6></span>
            </div>
            {/* <div className="form-group">
              <label className="form-label">Pickup Location</label>
              <input
                type="text"
                name="deliveryPersonPickupLocation"
                className="form-control"
                value={deliveryPerson.deliveryPersonPickupLocation}
                onChange={handleChange}
                required
              />
            </div> */}
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
            <div className="form-group">
              <label className="form-label">🔒 Password</label>
              <input type={passwordShown ? "text" : "password"}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                name="deliveryPersonPassword"
                className="form-control"
                value={deliveryPerson.deliveryPersonPassword}
                onChange={handleChange}
                minLength="8"
                required />
              <span><h6>Must contain a capital letter, a small letter, a number, a special character and minimum length must be 8</h6></span>

              <span id="showpass" onClick={togglePassword}>👁️</span>
            </div>
            <div className="buttonSubmit">
              <input
                type="submit"
                value="Register"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default RegisterDeliveryPerson;
