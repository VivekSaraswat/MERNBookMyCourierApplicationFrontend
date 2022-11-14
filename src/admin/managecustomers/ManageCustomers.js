import { NavLink } from "react-router-dom";
import './ManageCustomers.css'
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManageCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    useEffect(function () {
        async function getCustomers() {
            try {
                const response = await axios.get(`http://localhost:4000/customers/`);
                setCustomers(response.data);
            } catch (error) {
                console.log("error", error);
            }
        }
        getCustomers();
    }, []);

    const removeCustomer = (id) => {
		try {
			axios.delete("http://localhost:4000/customers/deleteCustomer/"+id);
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
                <div id="managecustomers">
                    <h2>Customers</h2>
                    <div className="table-responsive">
                        <table className="table riped  table-hover table-bordered container">
                            <thead>
                                <tr className="table-primary">
                                    <th>Customer Id</th>
                                    <th>Customer Name</th>
                                    <th>Customer Username</th>
                                    <th>Customer Mobile Number</th>
                                    <th>Customer Pickup Location</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table-hover">
                                {customers &&
                                    customers.map((customer) => {
                                        return (
                                            <tr key={customer._id}>
                                                <td>{customer._id}</td>
                                                <td>{customer.customerName}</td>
                                                <td>{customer.username}</td>
                                                <td>{customer.customerMobileNo}</td>
                                                <td>{customer.pickupLocation}</td>
                                                <td className="text-center edit-block">
                                                    <div className="btn-group">
                                                        <button onClick={() => removeCustomer(customer._id)} className="btn btn-danger">
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
export default ManageCustomers;