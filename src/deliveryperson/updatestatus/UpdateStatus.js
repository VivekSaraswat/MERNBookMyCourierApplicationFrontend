import { NavLink , useParams  } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './UpdateStatus.css';

const UpdateStatus = (props) => {

    const initialState = {
        status: "",
    };
    const [courier, setCourier] = useState({initialState});
    const { _id } = useParams();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const Statuses = ['Booked','Picked Up','On the way','Delivered'];


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
                    `http://localhost:4000/couriers/updateCourier/${_id}`,courier);
                navigate(`/my-couriers/`);
            } catch (error) {
                console.log(error);
            }
        }
        updateCourier();
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
                <div id="updatestatus">
                    <h2>Update Status</h2>
                    <form onSubmit={handleSubmit}>
                    <div className="form-group">
                            <label className="form-label">Update Status</label>
                            <select className="custom-select form-control"
                                name="status"
                                value={courier.status}
                                onChange={handleChange}
                                required >
                                {
                                   Statuses.map((status) => {
                                        return (
                                            <option key={status} value={status}>{status}</option>
                                        )
                                    }) 
                                }
                            </select>
                        </div>
                        <div className="buttonSubmit">
                            <input type="submit" value="Update Status" className="btn btn-success" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default UpdateStatus;