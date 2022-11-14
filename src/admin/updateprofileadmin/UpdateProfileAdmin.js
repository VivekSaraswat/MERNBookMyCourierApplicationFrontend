import { NavLink } from "react-router-dom";
import './UpdateProfileAdmin.css'
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProfileAdmin = (props) => {
    const initialState = {
        adminName: "",
        adminUsername: "",
        adminEmail: "",
    };
    const [admin, setAdmin] = useState(initialState);
    const id = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(
        function () {
            async function getAdmin() {
                try {
                    const response = await axios.get(`http://localhost:4000/admin/getAdmin/${id}`);
                    setAdmin(response.data)
                } catch (error) {
                    console.log("error", error);
                }
            }
            getAdmin();
        },
        [props]
    );

    function handleSubmit(event) {
        event.preventDefault();
        async function updateAdmin() {
            try {
                const response = await axios.patch(`http://localhost:4000/admin/updateAdmin/${admin._id}`, admin);
                navigate(`/view-profile-admin/`)
            } catch (error) {
                alert("Username already exists.")
            }
        }
        updateAdmin();
    }

    function handleChange(event) {
        setAdmin({ ...admin, [event.target.name]: event.target.value })
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
                <div id="updateprofile">
                    <h2>Update Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Admin Name</label>
                            <input type="text" pattern="[A-Za-z]+[A-Za-z ]+"
                                name="adminName"
                                className="form-control"
                                value={admin.adminName}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Username</label>
                            <input type="text"
                                name="adminUsername"
                                className="form-control"
                                value={admin.adminUsername}
                                onChange={handleChange}
                                minLength="5"
                                required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Admin Email</label>
                            <input type="email"
                                name="adminEmail"
                                className="form-control"
                                value={admin.adminEmail}
                                onChange={handleChange}
                                pattern="[a-zA-Z0-9]+[@][a-zA-Z]+[.][com]{3}"
                                required />
                        </div>
                        <div className="buttonSubmit">
                            <input type="submit" value="Update" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default UpdateProfileAdmin;