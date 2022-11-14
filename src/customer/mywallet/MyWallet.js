import { NavLink } from "react-router-dom";
import './MyWallet.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import image1 from '../../images/Cash.png'


const MyWallet = (props) => {

    const newstyle = {
        backgroundImage: `url(${image1})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }

    const [customer, setCustomer] = useState({});
    const id = localStorage.getItem('userId');
    const navigate = useNavigate();


    useEffect(
        function () {
            async function getCustomerById() {
                try {
                    const response = await axios.get(`http://localhost:4000/customers/getCustomer/${id}`);
                    setCustomer(response.data);
                } catch (error) {
                    console.log("error", error);
                }
            }
            getCustomerById();
        },
        [props]
    );

    function handleSubmit(event) {
        event.preventDefault();
        async function addMoney() {

            navigate(`/add-money`)

        }
        addMoney();
    }

    return (
        <>
            <div id="myContent">
                <div id="myDiv1">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                activeclassname="active"
                                to="/view-profile-customer">
                                View Profile
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                activeclassname="active"
                                to="/update-profile-customer">
                                Update Profile
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                activeclassname="active"
                                to="/book-my-courier">
                                Book My Courier
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                activeclassname="active"
                                to="/track-my-order">
                                Track My Order
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                activeclassname="active"
                                to="/my-wallet">
                                My Wallet
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div id="mywallet" style={newstyle}>
                    <h2>My Wallet</h2>
                    <h3>Your Wallet Amount is</h3>
                    <h2>{customer.customerWalletAmount}</h2>
                    <form onSubmit={handleSubmit}>
                        <div >
                            <input type="submit" value="Add Money" className="btn btn-warning" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default MyWallet;