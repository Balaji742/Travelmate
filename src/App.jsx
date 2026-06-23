import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Routings from './Routes/Routings'
import "leaflet/dist/leaflet.css";

const App = () => {
  return (
    <div>
     <Navbar/>
     <Routings/>
    </div>
  )
}

export default App
