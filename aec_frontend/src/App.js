import Feed from './components/UserSide/Feed';
import Login from './components/Accounts/Login';
import ProfileVerification from './components/UserSide/ProfileVerification';
import Register from './components/Accounts/Register';
import UserProfile from './components/Profiles/UserProfile';
import OthersProfile from './components/Profiles/OthersProfile';
import { Routes, Route } from 'react-router-dom'
import Common from './components/UserSide/Common'
import Home from './components/UserSide/Home';
import Error from './components/ErrorPages/Error';
import AdminCommon from './components/Admin/AdminCommon';
import Allusers from './components/Admin/AlllUsers';
import Allposts from './components/Admin/Allposts';
import Profileverifi_Requests from './components/Admin/Profileverifi_Requests';
import AdminDashboard from './components/Admin/AdminDashboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminRoute from './utils/AdminRoute'
import Restricted from './components/ErrorPages/Restricted'
import PrivateRoute from './utils/PrivateRoute';
import Payment from './components/payment/Payment'
import Payment_Confirmation from './components/payment/Payment_Confirmation';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Success from './components/payment/Success';
import Cancelled from './components/payment/Cancelled';

function App() {



  return (
    <PayPalScriptProvider
      options={{ "client-id":process.env.REACT_APP_PAYPAL_CLIENT_ID }} >
      <div className="App">
        <Routes>
          <Route path='/' element={<Common />}>
            <Route index element={<Home />} />
            <Route element={<PrivateRoute />}>
              <Route path='feed/' element={<Feed />} />
              <Route path='profile_verification/' element={<ProfileVerification />} />
              <Route path='profile' element={<UserProfile />} />
              <Route path='profile/:user_id' element={<OthersProfile/>} />
              <Route path='payment' element={<Payment />} />
              <Route path='/paymentconfirmation/:price' element={<Payment_Confirmation />} />
              <Route path='/success' element={<Success/>} />
              <Route path='/cancelled' element={<Cancelled/>} />

            </Route>
            
          </Route>

          <Route path='*' element={<Error />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path="/restricted" element={<Restricted />} />


          <Route element={<AdminRoute />}>
            <Route path='admin/' element={<AdminCommon />}>
              <Route index element={<AdminDashboard />} />
              <Route path='allusers/' element={<Allusers />} />
              <Route path='allposts/' element={<Allposts />} />
              <Route path='profileverification_requests/' element={<Profileverifi_Requests />} />
            </Route>
          </Route>

        </Routes>
        <ToastContainer />
      </div>
    </PayPalScriptProvider>
  );
}

export default App;
