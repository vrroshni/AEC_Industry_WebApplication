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


function App() {
  return (
    <div className="App">
      {/* <AllContext> */}
        <Routes>
          <Route path='/' element={<Common />}>
            <Route index element={<Home />} />
            <Route path='feed/' element={<Feed />} />
            <Route path='profile/verification/' element={<ProfileVerification />} />
            <Route path='profile' element={<UserProfile />} />
            <Route  path='*' element={<Error/>}/>
          </Route>
          
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />

          <Route path='admin/' element={<Common />}>
            <Route index element={<Home/>} />
            <Route path='allusers' element={<Feed />} />
            <Route path='profileverification_requests' element={<ProfileVerification />} />
            <Route path='allposts' element={<UserProfile />} />
          </Route>
        </Routes>
      {/* </AllContext> */}
    </div>
  );
}

export default App;
