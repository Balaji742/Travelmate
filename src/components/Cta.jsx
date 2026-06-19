import React from 'react'
import '../styles/cta.css'
import { useNavigate } from 'react-router-dom'

const CTA = () => {
    const navigate = useNavigate()
  return (
    <section className="cta">
      <h2>Ready for Your Next Adventure?</h2>
      <p>
        Discover amazing destinations and create unforgettable memories with TravelMate.
      </p>
      <button onClick={()=>navigate('/booking')}>Book Your Trip Now</button>
    </section>
  )
}

export default CTA