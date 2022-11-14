import { NavLink } from "react-router-dom";
import './ManageCouriers.css'
import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageCouriers = () => {
    const [couriers, setCouriers] = useState([]);

    useEffect(function () {
        async function getCouriers() {
            try {
                const response = await axios.get(`http://localhost:4000/couriers/`);
                setCouriers(response.data);
            } catch (error) {
                console.log("error", error);
            }
        }
        getCouriers();
    }, []);

    const removeCourier = (id) => {
		try {
			axios.delete("http://localhost:4000/couriers/deleteCourier/"+id);
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
                <div id="managecouriers">
                    <h2>Couriers</h2>
                    <div className="table-responsive">
                        <table className="table riped  table-hover table-bordered container">
                            <thead>
                                <tr className="table-primary">
                                    <th>Courier Id</th>
                                    <th>Pickup Address</th>
                                    <th>End Address</th>
                                    <th>Courier Type</th>
                                    <th>Status</th>
                                    <th>Customer Id</th>
                                    <th>Delivery Person Id</th>
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
                                                <td>{courier.deliveryPersonId}</td>
                                                <td className="text-center edit-block">
                                                    <div className="btn-group">
                                                        <button onClick={() => removeCourier(courier._id)} className="btn btn-danger">
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
export default ManageCouriers;