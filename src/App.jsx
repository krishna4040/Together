import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

import Sidebar from './components/common/Sidebar'
import Logout from './components/common/Logout'
import Search from './components/common/Search'
import Notifications from './components/common/Notifications'

import Home from './pages/Home'
import Error from './pages/Error'
import Profile from './pages/Profile'
import Create from './pages/Create'
import EditPage from './components/core/profile/EditPage'

import Auth from './pages/Auth'
import BottomNavigation from './components/common/BottomNavigation'
import FriendProfile from './pages/FriendProfile'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './store/slices/user'
import Message from './pages/Message'

const App = () => {

  const { token } = useSelector(state => state.auth);
  const dispacth = useDispatch();

  const [logout, setLogout] = useState(false);
  const [search, setSearch] = useState(false);
  const [notifications, setNotifications] = useState(false);

  const fecthUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/getUserDetails`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispacth(setUser(response.data.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (token) {
      fecthUser();
    }
  }, [token]);

  return (
    <div className='w-screen bg-black'>
      <Routes>
        <Route path='/' element={token ? <Home /> : <Auth />} />
        <Route path='/messages' element={<Message />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/view-profile/:userName' element={<FriendProfile />} />
        <Route path='/edit-profile' element={<EditPage />} />
        <Route path='*' element={<Error />} />
        <Route path='/create' element={<Create />} />
      </Routes>
      {token && <Sidebar setLogout={setLogout} setSearch={setSearch} setNotifications={setNotifications} />}
      {token && <BottomNavigation setLogout={setLogout} setSearch={setSearch} />}
      {logout && <Logout setLogout={setLogout} />}
      {search && <Search setSearch={setSearch} />}
      {notifications && <Notifications setNotifications={setNotifications} />}
    </div>
  )
}

export default App