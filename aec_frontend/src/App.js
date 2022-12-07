import Feed from './components/Feed';
import Login from './components/Login';
import ProfileVerification from './components/ProfileVerification';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import { Routes, Route } from 'react-router-dom'
import Common from './components/Common'
import Home from './components/Home';
import Error from './components/Error';
import AdminCommon from './components/AdminCommon';
import Allusers from './components/Allusers';
import Allposts from './components/Allposts';
import Profileverifi_Requests from './components/Profileverifi_Requests';
import AdminDashboard from './components/AdminDashboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminRoute from './utils/AdminRoute'
import Restricted from './components/Restricted'
import PrivateRoute from './utils/PrivateRoute';


function App() {



  return (
    <div className="App">
      <Routes>
        
        <Route path='/' element={<Common />}>
          <Route index element={<Home />} />
          <Route element={<PrivateRoute/>}>
          <Route path='feed/' element={<Feed />} />
          <Route path='profile_verification/' element={<ProfileVerification />} />
          <Route path='profile' element={<UserProfile />} />
          </Route>
          <Route path='*' element={<Error />} />
        </Route>
        

        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path="/restricted" element={<Restricted/>}/>

        <Route element={<AdminRoute />}>
          <Route path='admin/' element={<AdminCommon />}>
            <Route index element={<AdminDashboard />} />
            <Route path='allusers/' element={<Allusers />} />
            <Route path='allposts/' element={<Allposts />} />
            <Route path='profileverification_requests/' element={<Profileverifi_Requests />} />
            <Route path='allposts/' element={<UserProfile />} />
          </Route>
        </Route>

      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
