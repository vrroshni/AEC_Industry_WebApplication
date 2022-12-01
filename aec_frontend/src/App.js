import Feed from './components/Feed';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ProfileVerification from './components/ProfileVerification';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import { Routes, Route } from 'react-router-dom'
import Common from './components/Common'
import Home from './components/Home';
import Error from './components/Error';
import AllContext from './context/AllContext';
import AdminCommon from './components/AdminCommon';
import Allusers from './components/Allusers';
import Allposts from './components/Allposts';
import Profileverifi_Requests from './components/Profileverifi_Requests';
import AdminDashboard from './components/AdminDashboard';
import Status_Success from './profileveri_components/Status_Success';
import StatusPending from './profileveri_components/StatusPending';
import StatusRejected from './profileveri_components/StatusRejected';


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Common />}>
            <Route index element={<Home/>} />
            <Route path='feed/' element={<Feed />} />
            <Route path='profile_verification/' element={<ProfileVerification />} />
            <Route path='profile' element={<UserProfile />} />
            <Route  path='*' element={<Error/>}/>
          </Route>
          
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />

          <Route path='admin/' element={<AdminCommon/>}>
            <Route index element={<AdminDashboard/>} />
            <Route path='allusers/' element={<Allusers/>} />
            <Route path='allposts/' element={<Allposts/>} />
            <Route path='profileverification_requests/' element={<Profileverifi_Requests/>} />
            <Route path='allposts/' element={<UserProfile />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
