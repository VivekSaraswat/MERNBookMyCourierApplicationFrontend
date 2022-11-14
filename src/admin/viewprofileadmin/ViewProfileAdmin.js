import { NavLink } from "react-router-dom";
import './ViewProfileAdmin.css'
import axios from "axios";
import React, { useEffect, useState } from "react";


const ViewProfileAdmin = (props) => {
    const [admin, setAdmin] = useState({});
    const id = localStorage.getItem('userId');

    useEffect(
        function () {
            async function getAdminById() {
                try {
                    const response = await axios.get(`http://localhost:4000/admin/getAdmin/${id}`);
                    setAdmin(response.data);
                } catch (error) {
                    console.log("error", error);
                }
            }
            getAdminById();
        },
        [props]
    );

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
                <div id="viewprofile">
                    <h2>My Profile</h2>
                    <table className="table table-hover">
                        <tbody>
                        <tr className="table-info">
                            <th scope="row"> <i className="material-icons">perm_identity</i> Admin ID</th>
                            <td>{ admin._id }</td>
                        </tr>
                        <tr>
                            <th scope="row"> <i className="material-icons">person</i> Admin Name</th>
                            <td>{ admin.adminName }</td>
                        </tr>
                        <tr className="table-info">
                            <th scope="row"> <i className="material-icons">person_pin</i> Admin Username</th>
                            <td>{ admin.adminUsername }</td>
                        </tr>
                        <tr>
                            <th scope="row"> <i className="material-icons">email</i> Admin Email</th>
                            <td>{ admin.adminEmail }</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default ViewProfileAdmin;