import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Routings from './Routes/Routings'

const App = () => {
  return (
    <div>
     <Navbar/>
     <Routings/>
    </div>
  )
}

export default App
