import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Destinations from '../pages/Destinations'
import Booking from '../pages/Booking'
import Login from '../pages/Login'
import DestinationDetails from "../pages/DestinationDetails";
import Register from '../pages/Register'
import ProtectedRoutes from './ProtectedRoutes'


const Routings = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/destinations' element={<Destinations />} />
        <Route path="/destination/:id" element={<DestinationDetails />} />
        {/* <Route path='/bookings/:id' element={<Booking />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path="/bookings/:id" element={
            <ProtectedRoutes>
              <Booking />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  )
}

export default Routings
