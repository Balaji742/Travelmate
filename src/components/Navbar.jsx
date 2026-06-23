import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../styles/navbar.css"
import plane from '../assets/plane.png';
import { BiSolidPlaneAlt } from "react-icons/bi";
import { auth } from '../firabase';
import { onAuthStateChanged } from 'firebase/auth';
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
    <nav className='navbar container'>
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
            <div className="d-flex align-items-center gap-2">
              <FaUserCircle size={28} className="text-success" />
              <span className="fw-semibold">
                {user.displayName || user.email.split("@")[0]}
              </span>
            </div>
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
