import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Sidebar from './components/common/Sidebar'
import Logout from './components/common/Logout'
import Search from './components/common/Search'

import Home from './pages/Home'
import Error from './pages/Error'
import Settings from './pages/Settings'
import Chat from './pages/Chat'

import Auth from './pages/Auth'
import { useSelector } from 'react-redux'


const App = () => {

  const { token } = useSelector(state => state.user);

  const [logout, setLogout] = useState(false);
  const [search , setSearch] = useState(false);

  return (
    <div>
      <Routes>
        <Route path='/' element={token ? <Home /> : <Auth />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='*' element={<Error />} />
      </Routes>
      {token && <Sidebar setLogout={setLogout} setSearch={setSearch} />}
      {logout && <Logout setLogout={setLogout} />}
      {search && <Search setSearch={setSearch} />}
    </div>
  )
}

export default App