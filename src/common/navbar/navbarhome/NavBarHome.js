import { NavLink } from "react-router-dom";
import './NavBarHome.css';

const NavBarHome = () => {
    return (
        <>
            <nav id="navbar-home" className="navbar navbar-expand-lg navbar-dark bg-info">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" id="cs" hrefLang="#" to={"/"}>
                        CS
                    </NavLink>
                    <button className="navbar-toggler collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mobileMenu"
                        aria-controls="mobileMenu"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon top-bar"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mobileMenu">
                        <div className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/home">
                                    Home
                                </NavLink>
                            </li>
                        </div>
                        <div className="dropdown">
                            <button style={{margin:"10px"}} className="btn abc btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Register
                            </button>
                            <div className="dropdown-menu" id="dropDown" aria-labelledby="dropdownMenuButton">
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/register-delivery-person">
                                        Register Delivery Person
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/register-customer">
                                        Register Customer
                                    </NavLink>
                                </li>
                            </div>
                        </div>

                        <div className="dropdown">
                            <button className="btn btn-primary dropdown-toggle"  type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Login
                            </button>
                            <div className="dropdown-menu"  aria-labelledby="dropdownMenuButton">
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/login-admin">
                                        Login Admin
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/login-delivery-person">
                                        Login Delivery Person
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/login-customer">
                                        Login Customer
                                    </NavLink>
                                </li>
                            </div>
                        </div>
                    </div>

                </div>
            </nav>
        </>
    )
}

export default NavBarHome;