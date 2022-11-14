import { NavLink , useParams  } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './PickupCourier.css';

const PickupCourier = (props) => {

    const initialState = {
        deliveryPersonId: "",
    };
    const [courier, setCourier] = useState({initialState});
    const { _id } = useParams();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    useEffect(
        function () {
            async function getCourier() {
                try {
                    const response = await axios.get(
                        `http://localhost:4000/couriers/getCourier/${_id}`
                    );
                    setCourier(response.data);
                } catch (error) {
                    console.log("error", error);
                }
            }
            getCourier();
        },
        [props]
    );

    function handleSubmit(event) {
        event.preventDefault();
        async function updateCourier() {
            try {
                const response = await axios.patch(
                    `http://localhost:4000/couriers/updateCourier/${_id}`,CourierDetails);
                navigate(`/my-couriers/`);
            } catch (error) {
                console.log(error);
            }
        }
        updateCourier();
    }

    const CourierDetails = {
        deliveryPersonId : userId
    }

    function handleChange(event) {
        setCourier({ ...courier, [event.target.name]: event.target.value });
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
                <div id="pickupcourier">
                    <h2>Pickup Courier</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Delivery Person Id</label>
                            <input type="text"
                                name="deliveryPersonId"
                                className="form-control"
                                defaultValue={userId}
                                readOnly
                                required />
                        </div>
                        <div className="buttonSubmit">
                            <input type="submit" value="Pickup Courier" className="btn btn-success" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default PickupCourier;