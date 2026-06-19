import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/navbar.css"
import plane from '../assets/plane.png';
import { BiSolidPlaneAlt } from "react-icons/bi";

const Navbar = () => {
  return (
    <nav className='navbar container'>
      <div className="logo">
        <h2><BiSolidPlaneAlt className='mb-2'/>TravelMate</h2>
      </div>
      <ul className='nav-links'>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/destinations">Destinations</Link>
        </li>
        <li>
          <Link to="/bookings">Bookings</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
