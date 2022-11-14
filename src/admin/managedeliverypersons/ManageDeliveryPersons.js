import { NavLink } from "react-router-dom";
import './ManageDeliveryPersons.css'
import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageDeliveryPersons = () => {
    const [deliveryPersons, setDeliveryPersons] = useState([]);

    useEffect(function () {
        async function getDeliveryPersons() {
            try {
                const response = await axios.get(`http://localhost:4000/deliveryPersons/`);
                setDeliveryPersons(response.data);
            } catch (error) {
                console.log("error", error);
            }
        }
        getDeliveryPersons();
    }, []);

    const removeDeliveryPerson = (id) => {
		try {
			axios.delete("http://localhost:4000/deliveryPersons/deleteDeliveryPerson/"+id);
		} catch (error) {
			console.error(error);
		}
	}

    return (
        <>
            <div id="myContent">
            <div id="myDiv1">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/view-profile-admin">
                                View Profile
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/update-profile-admin">
                                Update Profile
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/manage-customers">
                                Manage Customers
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/manage-couriers">
                                Manage Couriers
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/manage-delivery-persons">
                                Manage Delivery Persons
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div id="managedeliverypersons">
                    <h2>Delivery Persons</h2>
                    <div className="table-responsive">
                        <table className="table riped  table-hover table-bordered container">
                            <thead>
                                <tr className="table-primary">
                                    <th>Delivery Person Id</th>
                                    <th>Delivery Person Name</th>
                                    <th>Delivery Person Username</th>
                                    <th>Delivery Person Mobile Number</th>
                                    <th>Delivery Person Pickup Location</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table-hover">
                                {deliveryPersons &&
                                    deliveryPersons.map((deliveryPerson) => {
                                        return (
                                            <tr key={deliveryPerson._id}>
                                                <td>{deliveryPerson._id}</td>
                                                <td>{deliveryPerson.deliveryPersonName}</td>
                                                <td>{deliveryPerson.deliveryPersonUsername}</td>
                                                <td>{deliveryPerson.deliveryPersonMobileNo}</td>
                                                <td>{deliveryPerson.deliveryPersonPickupLocation}</td>
                                                <td className="text-center edit-block">
                                                    <div className="btn-group">
                                                        <button onClick={() => removeDeliveryPerson(deliveryPerson._id)} className="btn btn-danger">
                                                            Delete
                                                        </button>
                                                    </div>
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
export default ManageDeliveryPersons;