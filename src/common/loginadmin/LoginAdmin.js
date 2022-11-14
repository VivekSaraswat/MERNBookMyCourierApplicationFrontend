import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image1 from "../../../src/images/JumboBgImg.jpeg"
import './LoginAdmin.css';



const LoginAdmin = (props) => {

    const newstyle = {
        backgroundImage: `url(${image1})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }

    const initialState = {
        adminUsername: "",
        adminPassword: "",
    };

    const [admin, setAdmin] = useState(initialState);
    const [passwordShown, setPasswordShown] = useState(false);
    const navigate = useNavigate();

    const togglePassword=()=>{setPasswordShown(!passwordShown)}

    function handleSubmit(event) {
        event.preventDefault();
        async function loginAdmin() {
            try {
                const response = await axios.post("http://localhost:4000/admin/auth/login", admin);
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('userId', response.data._id);
                navigate(`/view-profile-admin`)
            } catch (error) {
                alert("Invalid Credentials");
            }
        }
        loginAdmin();
    }

    function handleChange(event) {
        setAdmin({ ...admin, [event.target.name]: event.target.value })
    }


    return (
        <>
            <div id="mycontent">
                <div className="jumbotron" style={newstyle}>
                    <h1 className="display-3">Courier Service</h1>
                    <p className="lead">An easy doorstep service for you..</p>
                </div>
                <div id="loginform">
                    <h2>Login Admin</h2>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">👤 Username</label>
                            <input type="text" 
                                name="adminUsername"
                                className="form-control"
                                value={admin.adminUsername}
                                onChange={handleChange}
                                minLength="5"
                                autoComplete="off"
                                required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">🔒 Password</label>
                            <input type={passwordShown ? "text" :"password"}
                                name="adminPassword"
                                className="form-control"
                                value={admin.adminPassword}
                                onChange={handleChange}
                                minLength="8"
                                required />
                            <span id="showpass" onClick={togglePassword}>👁️</span>
                        </div>
                        <div className="buttonSubmit">
                            <input type="submit" value="Login" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginAdmin;