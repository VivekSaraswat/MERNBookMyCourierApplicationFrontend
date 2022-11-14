import { NavLink } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import './ViewProfileDeliveryPerson.css';

const ViewProfileDeliveryPerson = (props) => {
  const [deliveryPerson, setDeliveryPerson] = useState({});
  const id = localStorage.getItem("userId");

  useEffect(
    function () {
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
    },
    [props]
  );

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
        <div id="viewprofile">
          <h2>My Profile</h2>
          <table className="table table-hover">
            <tbody>
              <tr className="table-info">
                <th scope="row">
                  <i className="material-icons">perm_identity</i> Delivery Person ID
                </th>
                <td>{deliveryPerson._id}</td>
              </tr>
              <tr>
                <th scope="row">
                  <i className="material-icons">person</i> Delivery Person Name
                </th>
                <td>{deliveryPerson.deliveryPersonName}</td>
              </tr>
              <tr className="table-info">
                <th scope="row">
                  <i className="material-icons">person_pin</i> Delivery Person Username
                </th>
                <td>{deliveryPerson.deliveryPersonUsername}</td>
              </tr>
              <tr>
                <th scope="row">
                  <i className="material-icons">contact_phone</i> Delivery Person Mobile No
                </th>
                <td>{deliveryPerson.deliveryPersonMobileNo}</td>
              </tr>
              <tr className="table-info">
                <th scope="row">
                  <i className="material-icons">location_on</i> Deliveryperson Pickup Location
                </th>
                <td>{deliveryPerson.deliveryPersonPickupLocation}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default ViewProfileDeliveryPerson;
