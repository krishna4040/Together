import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Home from './pages/Home'
import Error from './pages/Error'
import Audio from './pages/Audio'
import Video from './pages/Video'
import Logout from './pages/Logout'
import Settings from './pages/Settings'
import Chat from './pages/Chat'

import Auth from './pages/Auth'
import { useSelector } from 'react-redux'


const App = () => {

  const { token } = useSelector(state => state.user);

  return (
    <div>
      <Routes>
        <Route path='/' element={token ? <Home/> : <Auth/>}>
          <Route path='/settings' element={<Settings/>} />
          <Route path='/logout' element={<Logout/>} />
          <Route path='/audio' element={<Audio/>} />
          <Route path='/video' element={<Video/>} />
          <Route path='/chat' element={<Chat/>} />
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  )
}

export default App