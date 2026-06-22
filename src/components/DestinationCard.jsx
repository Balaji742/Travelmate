import React from 'react'
import '../styles/destinations.css'
import { useNavigate } from 'react-router-dom'

const DestinationCard = ({ image, title, country, price }) => {

  const navigate = useNavigate()
  return (
    <div className='card' onClick={()=>navigate('/destinations')}>
      <div className='image-container'>
      <img src={image} alt={title} />
      <span className='badge'>Popular</span>
      </div>

      <div className='card-body'>
        
        <h3>{title}</h3>
        <p>📍 {country}</p>
        <div className="card-footer">
          <span>⭐ 4.8</span>
          <h4>💰{price}</h4>
        </div>
      </div>
    </div>
  )
}

export default DestinationCard