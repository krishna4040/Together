import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Error from './pages/Error'
import Profile from './pages/Profile'
import Create from './pages/Create'
import EditPage from './pages/EditPage'

import Auth from './pages/Auth'
import FriendProfile from './pages/FriendProfile'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './store/slices/user'
import Message from './pages/Message'
import { Protect } from './components/guards/Protect'
import { DashBoard } from './pages'
import { useAxiosWithAuth } from './hooks/useAxios'

const App = () => {
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosWithAuth();

  const fetchUser = async () => {
    try {
      const { data } = await axiosPrivate.get('/user/getUserDetails');
      dispatch(setUser(data.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      navigate('/auth')
    }
  }, [token]);

  return (
    <div className='w-screen bg-black'>
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='*' element={<Error />} />
        <Route element={<Protect />}>
          <Route path='/' element={<DashBoard />}>
            <Route path='/home' element={<Home />} />
            <Route path='/messages' element={<Message />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/view-profile/:userName' element={<FriendProfile />} />
            <Route path='/edit-profile' element={<EditPage />} />
            <Route path='/create' element={<Create />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App