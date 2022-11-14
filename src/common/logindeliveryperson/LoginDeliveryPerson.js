import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import image1 from "../../../src/images/JumboBgImg.jpeg";
import "./LoginDeliveryPerson.css";

function LoginDeliveryPerson(props) {
  const newstyle = {
    backgroundImage: `url(${image1})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const initialState = {
    deliveryPersonUsername: "",
    deliveryPersonPassword: "",
  };

  const [deliveryPerson, setDeliveryPerson] = useState(initialState);
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => { setPasswordShown(!passwordShown) }

  function handleSubmit(event) {
    event.preventDefault();
    async function loginDeliveryPerson() {
      try {
        const response = await axios.post(
          "http://localhost:4000/deliveryPerson/auth/login",
          deliveryPerson
        );
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("userId", response.data._id);
        navigate(`/view-profile-delivery-person`);
      } catch (error) {
        alert("Invalid Credentials.");
      }
    }
    loginDeliveryPerson();
  }

  function handleChange(event) {
    setDeliveryPerson({
      ...deliveryPerson,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <>
      <div id="mycontent">
        <div className="jumbotron" style={newstyle}>
          <h1 className="display-3">Courier Service</h1>
          <p className="lead">An easy doorstep service for you..</p>
        </div>
        <div id="loginform">
          <h2>Login Delivery Person</h2>
          <hr />
          <h3>Don't have an account?...
            <Link
              to={'/register-delivery-person/'}
            >
              Register here
            </Link>
          </h3>

          <form onSubmit={handleSubmit}>
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
              <label className="form-label">🔒 Password</label>
              <input type={passwordShown ? "text" : "password"}
                name="deliveryPersonPassword"
                className="form-control"
                value={deliveryPerson.deliveryPersonPassword}
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
  );
}
export default LoginDeliveryPerson;
