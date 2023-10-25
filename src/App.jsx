import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Sidebar from './components/common/Sidebar'
import Logout from './components/common/Logout'
import Search from './components/common/Search'
import Notifications from './components/common/Notifications'

import Home from './pages/Home'
import Error from './pages/Error'
import Profile from './pages/Profile'
import Chat from './pages/Chat'
import Create from './pages/Create'
import EditPage from './components/core/profile/EditPage'

import Auth from './pages/Auth'
import { useSelector } from 'react-redux'
import BottomNavigation from './components/common/BottomNavigation'


const App = () => {

  const { token } = useSelector(state => state.user);

  const [logout, setLogout] = useState(false);
  const [search, setSearch] = useState(false);
  const [notifications, setNotifications] = useState(false);

  return (
    <div className='w-screen bg-black'>
      <Routes>
        <Route path='/' element={token ? <Home /> : <Auth />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/profile' element={<Profile />} />
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