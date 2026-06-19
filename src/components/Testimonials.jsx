import React from 'react'
import '../styles/testimonials.css'

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2>What Our Travelers Say</h2>

      <div className="testimonial-grid">

        <div className="testimonial-card">
          <p>"Amazing experience in Bali. Everything was perfectly organized."</p>
          <h4>⭐ ⭐ ⭐ ⭐ ⭐</h4>
          <span>- Rahul</span>
        </div>

        <div className="testimonial-card">
          <p>"TravelMate made booking simple and stress-free."</p>
          <h4>⭐ ⭐ ⭐ ⭐ ⭐</h4>
          <span>- Priya</span>
        </div>

        <div className="testimonial-card">
          <p>"Best vacation ever. Will definitely book again."</p>
          <h4>⭐ ⭐ ⭐ ⭐ ⭐</h4>
          <span>- Arjun</span>
        </div>

      </div>
    </section>
  )
}

export default Testimonials