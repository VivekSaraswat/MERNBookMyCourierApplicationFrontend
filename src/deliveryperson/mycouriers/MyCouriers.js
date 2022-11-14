import { NavLink, Link } from "react-router-dom";
import './MyCouriers.css'
import React, { useState, useEffect } from "react";
import axios from "axios";

const MyCouriers = () => {

  const [couriers, setCouriers] = useState([]);
  const id = localStorage.getItem('userId');

  useEffect(function () {
    async function getCouriers() {
      try {
        const response = await axios.get(`http://localhost:4000/couriers/getCourierByDeliveryPersonId/${id}`);
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
        <div id="mycouriers">
          <h2>My Couriers</h2>
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
                            to={`/update-status/${courier._id}`}
                            className="btn btn-warning"
                          >
                            Update Status
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
export default MyCouriers;