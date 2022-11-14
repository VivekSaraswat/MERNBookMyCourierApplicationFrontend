import { NavLink } from "react-router-dom";
import './ViewProfile.css'
import axios from "axios";
import React, { useEffect, useState } from "react";


const ViewProfileCustomer = (props) => {
    const [customer, setCustomer] = useState({});
    const id = localStorage.getItem('userId');

    useEffect(
        function () {
            async function getCustomerById() {
                try {
                    const response = await axios.get(`http://localhost:4000/customers/getCustomer/${id}`);
                    setCustomer(response.data);
                } catch (error) {
                    console.log("error", error);
                }
            }
            getCustomerById();
        },
        [props]
    );

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
                <div id="viewprofile">
                    <h2>My Profile</h2>
                    <table className="table table-hover">
                        <tbody>
                            <tr className="table-info">
                                <th scope="row"> <i className="material-icons">perm_identity</i> Customer ID</th>
                                <td>{customer._id}</td>
                            </tr>
                            <tr>
                                <th scope="row"> <i className="material-icons">person</i> Customer Name</th>
                                <td>{customer.customerName}</td>
                            </tr>
                            <tr className="table-info">
                                <th scope="row"> <i className="material-icons">person_pin</i> Customer Username</th>
                                <td>{customer.username}</td>
                            </tr>
                            <tr>
                                <th scope="row"> <i className="material-icons">contact_phone</i> Customer Mobile No</th>
                                <td>{customer.customerMobileNo}</td>
                            </tr>
                            <tr className="table-info">
                                <th scope="row"> <i className="material-icons">location_on</i> Customer Pickup Location</th>
                                <td>{customer.pickupLocation}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default ViewProfileCustomer;