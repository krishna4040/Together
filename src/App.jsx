import React from 'react'
import {Routes , Route} from 'react-router-dom'

import Navbar from './components/common/Navbar'
import Home from './pages/Home'
import Error from './pages/Error'
import Auth from './pages/Auth'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<Error />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </div>
  )
}

export default App