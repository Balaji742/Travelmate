import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../styles/navbar.css"
import plane from '../assets/plane.png';
import { BiSolidPlaneAlt } from "react-icons/bi";
import { auth } from '../firabase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,
      (currentUser) => {
        setUser(currentUser)
      });

    return () => unsubscribe
  }, [])
  const navigate = useNavigate()
  const handleBooking = () => {
    if (auth.currentUser) {
      navigate('/')
    } else {
      navigate('/login')
    }
  }

  return (
    <nav className='navbar container d-flex align-items-center'>
      <div className="logo">
        <h2 className=' text-primary-emphasis'><BiSolidPlaneAlt className='mb-2' />Travel<span className='text-success'>Mate</span></h2>
      </div>
      <ul className='nav-links'>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/destinations">Destinations</Link>
        </li>
        <li>
          <Link to="/bookings/1">Bookings</Link>
        </li>
        {
          user ? (
            <Link to="/profile" className='d-flex align-items-center gap-2 text-decoration-none text-dark'>
              <FaUserCircle size={22} className='text-success' /><span>{user.email.split("@")[0]}</span>
            </Link>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )
        }
      </ul>
    </nav>
  )
}

export default Navbar
