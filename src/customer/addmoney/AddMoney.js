import { NavLink } from "react-router-dom";
import './AddMoney.css';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import image1 from '../../images/cardbg.png'


const AddMoney = (props) => {

    const newstyle = {
        backgroundImage: `url(${image1})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }

    const initialState = {
        amount : "",
        cardHolderName : "",
        cardNumber : "",
        cvv : "",
        expiryDate : ""
    };
    const [card, setCard] = useState({initialState});
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

    const customerMoney = {
        customerWalletAmount : parseInt(parseInt(customer.customerWalletAmount) + parseInt(card.amount)),
    }

    function handleSubmit(event) {
        event.preventDefault();
        async function addMoney() {
            try {
                const response = await axios.patch(`http://localhost:4000/customers/updateCustomer/${customer._id}`, customerMoney);
                navigate(`/my-wallet/`)
            } catch (error) {
                console.log(error);
            }

        }
        addMoney();
    }

    function handleChange(event) {
        setCard({ ...card, [event.target.name]: event.target.value })
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
                <div id="addmoney" style={newstyle}>
                    <h2>Add Money</h2>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Enter the amount</label>
                            <input type="number"
                                name="amount"
                                value={card.amount}
                                className="form-control"
                                onChange={handleChange}
                                min="1"
                                max="1500"
                                required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Card Holder Name</label>
                            <input type="text"
                                name="cardHolderName"
                                className="form-control"
                                value={card.cardHolderName}
                                pattern="[A-Za-z]+[A-Za-z ]+"
                                onChange={handleChange}
                                autocomplete="off"
                                required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Card Number</label>
                            <input type="text"
                                name="cardNumber"
                                className="form-control"
                                value={card.cardNumber}
                                onChange={handleChange}
                                minLength="16"
                                maxLength="16"
                                pattern="^\d{16}$"
                                required />
                        </div>
                        <div className="form-inline">
                        <div className="form-group">
                            <label className="form-label">CVV</label>
                            <input type="text"
                                name="cvv"
                                className="form-control"
                                value={card.cvv}
                                onChange={handleChange}
                                minLength="3"
                                maxLength="3"
                                pattern="^\d{3}$"
                                style={{marginLeft:"30px"}}
                                required />
                        </div>
                        <div className="form-group" style={{marginLeft:"175px"}}>
                            <label className="form-label">Expiry Date</label>
                            <input type="month"
                                name="expiryDate"
                                className="form-control"
                                value={card.expiryDate}
                                onChange={handleChange}
                                style={{marginLeft:"30px"}}
                                required />
                        </div>
                        </div>
                        <div id="buttonSubmit">
                            <input type="submit" value="Add Money" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddMoney;