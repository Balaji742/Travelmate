import React from 'react'
import Hero from '../components/Hero'
import DestinationCard from '../components/DestinationCard'
import bali1 from "../assets/bali1.jpg"
import paris from "../assets/paris.jpg"
import dubai from "../assets/dubai.jpg"
import tokyo from "../assets/tokyo.jpg"
import '../styles/whychooseus.css'
import Footer from '../components/Footer'
import AdventureSection from '../components/AdventureSection'
import Testimonials from '../components/Testimonials'
import Cta from '../components/Cta'
import { Parallax } from 'react-scroll-parallax'


const Home = () => {
  return (
    <div>
      <Parallax speed={-20}>
      <Hero />
      </Parallax>
      <AdventureSection />

      <section className='destinations'>
        <h2 className='text-center mt-4 mb-2'>Popular Destinations</h2>
        <p className='text-center  mt-0 fs-4'>Discover handpicked destinations loved by thousands of travelers.</p>
        <div className='destination-grid'>
          <DestinationCard image={bali1} title="Bali" country="Indonesia" price="$999" destination='bali'/>
          <DestinationCard image={paris} title="Paris" country="France" price="$1499" destination='paris'/>
          <DestinationCard image={dubai} title="Dubai" country="UAE" price="$1299" destination='dubai'/>
          <DestinationCard image={tokyo} title="Tokyo" country="Japan" price="$1799" destination='japan'/>
        </div>
      </section>

      <section className='why-us'>
        <h2>Why Choose TravelMate?</h2>
        <div className='features'>
          <div>
            <h3>Best Destinations</h3>
            <p>Handpicked travel experiences around the world.</p>
          </div>
          <div>
            <h3>Affordable Prices</h3>
            <p>Get the best travel delas within your budget.</p>
          </div>
          <div>
            <h3>Secure Bookings</h3>
            <p>Fast, Safe and reliable booking experience.</p>
          </div>
        </div>
      </section>
      <Testimonials/>
      <Cta/>
      <Footer />
    </div>
  )
}

export default Home
