import { NavLink } from "react-router-dom";
import './TrackMyOrder.css'
import React, { useState, useEffect } from "react";
import axios from "axios";


const TrackMyOrder = () => {
    const [couriers, setCouriers] = useState([]);
    const id = localStorage.getItem('userId');

    useEffect(function () {
        async function getCouriers() {
            try {
                const response = await axios.get(`http://localhost:4000/couriers/getCourierByCustomerId/${id}`);
                setCouriers(response.data);
            } catch (error) {
                console.log("error", error);
            }
        }
        getCouriers();
    }, []);

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
                <div id="trackmyorder">
                    <h2>Track My Order</h2>
                    <div className="table-responsive">
                        <table className="table riped  table-hover table-bordered container">
                            <thead>
                                <tr className="table-primary">
                                    <th>Courier Id</th>
                                    <th>Pick Up Address</th>
                                    <th>End Address</th>
                                    <th>Courier Type</th>
                                    <th>Courier Content</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody className="table-hover">
                                {couriers &&
                                    couriers.map((courier) => {
                                        return (
                                            <tr key={courier._id}>
                                                <td>{courier._id}</td>
                                                <td>{courier.pickupAddress} , {courier.pickupLocation}</td>
                                                <td>{courier.endAddress} , {courier.endLocation}</td>
                                                <td>{courier.courierType}</td>
                                                <td>{courier.courierContent}</td>
                                                <td>{courier.status}</td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    )
}
export default TrackMyOrder;