
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './common/header/Header';
import Footer from './common/footer/Footer';
import Home from './common/home/Home';
import HomeLayout from './common/homelayout/HomeLayout';
import CustomerLayout from './customer/customerlayout/CustomerLayout';
import ViewProfileCustomer from './customer/viewprofile/ViewProfile';
import UpdateProfileCustomer from './customer/updateprofile/UpdateProfile';
import BookMyCourier from './customer/bookmycourier/BookMyCourier';
import TrackMyOrder from './customer/trackmyorder/TrackMyOrder';
import MyWallet from './customer/mywallet/MyWallet';
import LoginCustomer from './common/logincustomer/LoginCustomer';
import RegisterCustomer from './common/registercustomer/RegisterCustomer';
import AddMoney from './customer/addmoney/AddMoney';
import AdminLayout from './admin/adminlayout/AdminLayout';
import ViewProfileAdmin from './admin/viewprofileadmin/ViewProfileAdmin';
import UpdateProfileAdmin from './admin/updateprofileadmin/UpdateProfileAdmin';
import ManageCustomers from './admin/managecustomers/ManageCustomers';
import ManageCouriers from './admin/managecouriers/ManageCouriers';
import ManageDeliveryPersons from './admin/managedeliverypersons/ManageDeliveryPersons';
import LoginAdmin from './common/loginadmin/LoginAdmin';
import DeliveryPersonLayout from './deliveryperson/deliverypersonlayout/DeliveryPersonLayout';
import ViewProfileDeliveryPerson from './deliveryperson/viewprofiledeliveryperson/ViewProfileDeliveryPerson';
import UpdateProfileDeliveryPerson from './deliveryperson/updateprofiledeliveryperson/UpdateProfileDeliveryPerson';
import LoginDeliveryPerson from './common/logindeliveryperson/LoginDeliveryPerson';
import RegisterDeliveryPerson from './common/registerdeliveryperson/RegisterDeliveryPerson'
import AllCouriers from './deliveryperson/allcouriers/AllCouriers';
import MyCouriers from './deliveryperson/mycouriers/MyCouriers';
import PickupCourier from './deliveryperson/pickupcourier/PickupCourier';
import UpdateStatus from './deliveryperson/updatestatus/UpdateStatus';


function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/register-customer' element={<RegisterCustomer />} />
            <Route exact path='/login-customer' element={<LoginCustomer />} />
            <Route exact path='/login-admin' element={<LoginAdmin />} />
            <Route exact path='/login-delivery-person' element={<LoginDeliveryPerson />} />
            <Route exact path='/register-delivery-person' element={<RegisterDeliveryPerson />} />

          </Route>
          <Route element={<CustomerLayout />}>
            <Route exact path='/view-profile-customer' element={<ViewProfileCustomer />} />
            <Route exact path='/update-profile-customer' element={<UpdateProfileCustomer />} />
            <Route exact path='/book-my-courier' element={<BookMyCourier />} />
            <Route exact path='/track-my-order' element={<TrackMyOrder />} />
            <Route exact path='/my-wallet' element={<MyWallet />} />
            <Route exact path='/add-money' element={<AddMoney />} />
          </Route>
          <Route element={<AdminLayout />}>
            <Route exact path='/view-profile-admin' element={<ViewProfileAdmin />} />
            <Route exact path='/update-profile-admin' element={<UpdateProfileAdmin />} />
            <Route exact path='/manage-customers' element={<ManageCustomers />} />
            <Route exact path='/manage-couriers' element={<ManageCouriers />} />
            <Route exact path='/manage-delivery-persons' element={<ManageDeliveryPersons />} />
          </Route>
          <Route element={<DeliveryPersonLayout />}>
            <Route exact path='/view-profile-delivery-person' element={<ViewProfileDeliveryPerson />} />
            <Route exact path='/update-profile-delivery-person' element={<UpdateProfileDeliveryPerson />} />
            <Route exact path='/all-couriers' element={<AllCouriers />} />
            <Route exact path='/my-couriers' element={<MyCouriers />} />
            <Route exact path='/pick-up-courier/:_id' element={<PickupCourier />} />
            <Route exact path='/update-status/:_id' element={<UpdateStatus />} />
          </Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
