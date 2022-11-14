import './Home.css'
import { NavLink, Link } from "react-router-dom";


const Home = () => {
    return (
        <>
            <div id="bg-home">
                <div className="col d-flex justify-content-center">
                    <div className="card col-md-4" id="home-card">
                        <div className="card-body">
                            <h5 className="card-title">Looking for Booking a Courier</h5>
                            <p className="card-text" id='hi'>Get Started..</p>
                            <NavLink
                                id='login'
                                className="nav-link btn btn-info"
                                to="/login-customer">
                                Login
                            </NavLink>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Home;