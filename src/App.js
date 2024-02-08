import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound';
import PublicRoutes from './utils/PublicRoutes';
import PrivateRoutes from './utils/PrivateRoutes';
import Home from './pages/Home';
import Devices from './pages/Devices';

const App = () => {
  return (
      <Routes>
        {/* Public Routes */}
        <Route element = {<PublicRoutes />} >
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Route>
        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route exact path='/' element={<Home/>} />
          <Route path='/devices' element={<Devices/>} />
        </Route>

        <Route path='*' element={<NotFound/>} />
      </Routes>
  )
}

export default App;
