import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './UpdateProfileDeliveryPerson.css'

const UpdateProfileDeliveryPerson = (props) => {
  const initialState = {
    deliveryPersonName: "",
    deliveryPersonUsername: "",
    deliveryPersonMobileNo: "",
    deliveryPersonPickupLocation: "",
  };
  const Cities = ['Delhi', 'Chennai', 'Kolkata', 'Mumbai'];
  const [deliveryPerson, setDeliveryPerson] = useState({ initialState });
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(
    function () {
      async function getDeliveryPerson() {
        try {
          const response = await axios.get(
            `http://localhost:4000/deliveryPersons/getDeliveryPerson/${id}`
          );
          setDeliveryPerson(response.data);
        } catch (error) {
          console.log("error", error);
        }
      }
      getDeliveryPerson();
    },
    [props]
  );

  function handleSubmit(event) {
    event.preventDefault();
    async function updateDeliveryPerson() {
      try {
        const response = await axios.patch(
          `http://localhost:4000/deliveryPersons/updateDeliveryPerson/${deliveryPerson._id}`,
          deliveryPerson
        );
        navigate(`/view-profile-delivery-person/`);
      } catch (error) {
        alert("Username already exists.");
      }
    }
    updateDeliveryPerson();
  }

  function handleChange(event) {
    setDeliveryPerson({ ...deliveryPerson, [event.target.name]: event.target.value });
  }

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
        <div id="updateprofile">
          <h2>Update Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">🤵 Delivery Person Name</label>
              <input pattern="[A-Za-z]+[A-Za-z ]+"
                type="text"
                name="deliveryPersonName"
                className="form-control"
                value={deliveryPerson.deliveryPersonName}
                onChange={handleChange}
                autocomplete="off"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">👤 Username</label>
              <input
                type="text"
                name="deliveryPersonUsername"
                className="form-control"
                value={deliveryPerson.deliveryPersonUsername}
                onChange={handleChange}
                minLength="5"
                autocomplete="off"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">📞 Delivery Person Mobile Number</label>
              <input
                type="text"
                name="deliveryPersonMobileNo"
                className="form-control"
                value={deliveryPerson.deliveryPersonMobileNo}
                onChange={handleChange}
                pattern="[6-9][0-9]{9}"
                autocomplete="off"
                required
              />
            </div>
            {/* <div className="form-group">
              <label className="form-label">Pick Up Location</label>
              <input
                type="text"
                name="deliveryPersonPickupLocation"
                className="form-control"
                value={deliveryPerson.deliveryPersonPickupLocation}
                onChange={handleChange}
                required
              />
            </div> */}
            <div className="form-group">
              <label className="form-label">📍 Pickup Location</label>
              <select className="custom-select form-control"
                name="deliveryPersonPickupLocation"
                value={deliveryPerson.deliveryPersonPickupLocation}
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
  );
};
export default UpdateProfileDeliveryPerson;
