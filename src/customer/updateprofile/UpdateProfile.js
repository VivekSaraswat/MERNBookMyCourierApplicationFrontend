import { NavLink } from "react-router-dom";
import './UpdateProfile.css'
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProfile = (props) => {
    const initialState = {
        customerName: "",
        username: "",
        customerMobileNo: "",
        pickupLocation: "",
    };
    const Cities = ['Delhi','Chennai','Kolkata','Mumbai'];
    const [customer, setCustomer] = useState(initialState);
    const id = localStorage.getItem('userId');
    const navigate = useNavigate();;

    useEffect(
        function () {
            async function getCustomer() {
                try {
                    const response = await axios.get(`http://localhost:4000/customers/getCustomer/${id}`);
                    setCustomer(response.data)
                } catch (error) {
                    console.log("error", error);
                }
            }
            getCustomer();
        },
        [props]
    );

    function handleSubmit(event) {
        event.preventDefault();
        async function updateCustomer() {
            try {
                const response = await axios.patch(`http://localhost:4000/customers/updateCustomer/${customer._id}`,customer);
                  navigate(`/view-profile-customer/`) 
            } catch (error) {
                alert("Username already exists.")
            }
        }
        updateCustomer();
    }

    function handleChange(event) {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }

    return (
        <>
            <div id="myContent">
                <div id="myDiv1">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                activeclassname="active"
                                to="/view-profile-customer">
                                View Profile
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                activeclassname="active"
                                to="/update-profile-customer">
                                Update Profile
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                activeclassname="active"
                                to="/book-my-courier">
                                Book My Courier
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                activeclassname="active"
                                to="/track-my-order">
                                Track My Order
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                activeclassname="active"
                                to="/my-wallet">
                                My Wallet
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div id="updateprofile">
                    <h2>Update Profile</h2>
                    <hr/>
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
                                required/>
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
                                required/>
                        </div>
                        {/* <div className="form-group">
                            <label className="form-label">Pick Up Location</label>
                            <input type="text"
                                name="pickupLocation"
                                className="form-control"
                                value={customer.pickupLocation}
                                onChange={handleChange}
                                required/>
                        </div> */}
                        <div className="form-group">
                            <label className="form-label">📍 Pickup Location</label>
                            <select className="custom-select form-control"
                                name="pickupLocation"
                                value={customer.pickupLocation}
                                onChange={handleChange}
                                required >
                                {
                                   Cities.map((city) => {
                                        return (
                                            <option key={city} value={city}>{city}</option>
                                        )
                                    }) 
                                }
                            </select>
                        </div> 
                        <div className="buttonSubmit">
                            <input type="submit" value="Update" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default UpdateProfile;