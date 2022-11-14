import { NavLink, Link } from "react-router-dom";
import './AllCouriers.css'
import React, { useState, useEffect } from "react";
import axios from "axios";

const AllCouriers = (props) => {

    const [couriers, setCouriers] = useState([]);
    const [deliveryPerson, setDeliveryPerson] = useState({});
    const id = localStorage.getItem('userId');

    useEffect(function () {
        async function getDeliveryPersonById() {
            try {
                const response = await axios.get(
                    `http://localhost:4000/deliveryPersons/getDeliveryPerson/${id}`
                );
                setDeliveryPerson(response.data);
            } catch (error) {
                console.log("error", error);
            }
        }
        getDeliveryPersonById();
    }, [props]);

    async function getCouriers() {
        try {
            const response = await axios.get(`http://localhost:4000/couriers/getCourierByPickupLocation/${deliveryPerson.deliveryPersonPickupLocation}`);
            setCouriers(response.data);
        } catch (error) {
            console.log("error", error);
        }
    }
    getCouriers();
    return (
        <>
            <div id="myContent">
                <div id="myDiv1">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/view-profile-delivery-person">
                                View Profile
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/update-profile-delivery-person">
                                Update Profile
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/all-couriers">
                                All Couriers
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/my-couriers">
                                My Couriers
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div id="allcouriers">
                    <h2>All Couriers</h2>
                    <div className="table-responsive">
                        <table className="table riped  table-hover table-bordered container">
                            <thead>
                                <tr className="table-primary">
                                    <th>Courier Id</th>
                                    <th>Pick Up Address</th>
                                    <th>End Address</th>
                                    <th>Courier Type</th>
                                    <th>Status</th>
                                    <th>Customer Id</th>
                                    <th>Actions</th>
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
                                                <td>{courier.status}</td>
                                                <td>{courier.customerId}</td>
                                                <td>
                                                    <Link
                                                        to={`/pick-up-courier/${courier._id}`}
                                                        className="btn btn-warning"
                                                    >
                                                        Pickup Courier
                                                    </Link>
                                                </td>
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
export default AllCouriers;