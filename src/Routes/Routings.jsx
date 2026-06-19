import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Destinations from '../pages/Destinations'
import Booking from '../pages/Booking'
import Login from '../pages/Login'

const Routings = () => {
  return (
    <div>
       <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/destinations' element={<Destinations/>}/>
        <Route path='/bookings' element={<Booking/>}/>
        <Route path='/login' element={<login/>}/>
      </Routes>
    </div>
  )
}

export default Routings
