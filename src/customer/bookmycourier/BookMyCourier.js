import { NavLink } from "react-router-dom";
import './BookMyCourier.css'
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BookMyCourier = (props) => {

    const initialState = {
        pickupAddress: "",
        endLocation: "",
        endAddress: "",
        courierType: "",
        courierContent: "",
    };
    const Cities = ['Delhi', 'Chennai', 'Kolkata', 'Mumbai'];

    const [courier, setCourier] = useState(initialState);
    const [customerId, setCustomerId] = useState(0);
    const [pickupLocation, setPickupLocation] = useState(0);
    const [customer, setCustomer] = useState({});
    const navigate = useNavigate();
    const id = localStorage.getItem('userId');

    useEffect(
        function () {
            async function getCustomer() {
                try {
                    const response = await axios.get(`http://localhost:4000/customers/getCustomer/${id}`);
                    setCustomer(response.data)

                    setCustomerId(response.data._id)

                    setPickupLocation(response.data.pickupLocation)

                } catch (error) {
                    console.log("error", error);
                }
            }
            getCustomer();
        },
        [props]
    );

    const courierDetails = {
        customerId,
        pickupLocation,
        pickupAddress: courier.pickupAddress,
        endLocation: courier.endLocation,
        endAddress: courier.endAddress,
        courierType: courier.courierType,
        courierContent: courier.courierContent,
    }

    function handleSubmit(event) {
        event.preventDefault();
        async function addCourier() {
            try {
                if (customer.customerWalletAmount < 500) {
                    if (window.confirm("You don't have enough wallet Amount. Add money to wallet..")) {
                        navigate("/my-wallet/");
                    }
                }
                else {
                    const response1 = await axios.post(`http://localhost:4000/couriers/addCourier`, courierDetails);
                    try {
                        const response2 = await axios.patch(`http://localhost:4000/customers/updateCustomer/${customer._id}`,
                            { customerWalletAmount: customer.customerWalletAmount - 500 });
                        navigate("/track-my-order/")
                    } catch (error) {
                        console.log(error);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        addCourier();
    }

    function handleChange(event) {
        setCourier({ ...courier, [event.target.name]: event.target.value })

    }

    return (
        <>
            <div id="myContent">
                <div id="myDiv1">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/view-profile-customer">
                                View Profile
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/update-profile-customer">
                                Update Profile
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/book-my-courier">
                                Book My Courier
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/track-my-order">
                                Track My Order
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/my-wallet">
                                My Wallet
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div id="bookmycourier">
                    <h2>Book My Courier</h2>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Customer Id</label>
                            <input type="text"
                                name="customerId"
                                className="form-control"
                                defaultValue={customer._id}
                                readOnly
                                required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Pick Up Location</label>
                            <input type="text"
                                name="pickupLocation"
                                className="form-control"
                                defaultValue={customer.pickupLocation}
                                readOnly
                                required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Pick Up Address</label>
                            <input type="text"
                                name="pickupAddress"
                                className="form-control"
                                value={courier.pickupAddress}
                                onChange={handleChange}
                                autocomplete="off"
                                required />
                        </div>
                        {/* <div className="form-group">
                            <label className="form-label">End Location</label>
                            <input type="text"
                                name="endLocation"
                                className="form-control"
                                value={courier.endLocation}
                                onChange={handleChange}
                                required/>
                        </div> */}
                        <div className="form-group">
                            <label className="form-label">End Location</label>
                            <select className="custom-select form-control"
                                name="endLocation"
                                value={customer.endLocation}
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
                        </div>
                        <div className="form-group">
                            <label className="form-label">End Address</label>
                            <input type="text"
                                name="endAddress"
                                className="form-control"
                                value={courier.endAddress}
                                onChange={handleChange}
                                autocomplete="off"
                                required />
                        </div>
                        {/* <div className="form-group">
                            <label className="form-label">Courier Type</label>
                            <input type="text"
                                name="courierType"
                                className="form-control"
                                value={courier.courierType}
                                onChange={handleChange}
                                required />
                        </div> */}
                        <div className="form-group"
                            onChange={handleChange}
                            value={courier.courierType}
                            required>
                            <label className="form-label">Courier Type</label><br />
                            <div id="radioButtons">
                                <label><input type="radio" value="Normal" name="courierType" /> Normal </label>
                                <label><input type="radio" value="Urgent" name="courierType" /> Urgent </label>
                                <label><input type="radio" value="Confidential" name="courierType" /> Confidential </label>
                                <label><input type="radio" value="Fragile" name="courierType" /> Fragile </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Courier Content</label>
                            <input type="text"
                                name="courierContent"
                                className="form-control"
                                value={courier.courierContent}
                                onChange={handleChange}
                                autocomplete="off"
                                required />
                        </div>

                        <div className="buttonSubmit">
                            <input type="submit" value="Book My Courier" className="btn btn-success" />
                        </div>

                    </form>

                </div>
            </div>
        </>
    )
}
export default BookMyCourier;