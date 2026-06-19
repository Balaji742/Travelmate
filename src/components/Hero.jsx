import React from 'react'
import "../styles/hero.css"
import { Parallax } from 'react-scroll-parallax'
import cloud1 from '../assets/cloud1.png'
import cloud2 from '../assets/cloud2.png'
import cloud3 from '../assets/cloud3.png'
import birds1 from '../assets/birds1.png'
import sun from '../assets/sun.png'
import bison2 from '../assets/bison2.png'

const Hero = () => {
  return (
    <section className='hero'>
      <img src={cloud1} alt="" className='cloud cloud1' />
      <img src={cloud2} alt="" className='cloud cloud2' />
      {/* <img src={cloud3} alt="" className='cloud cloud3' /> */}
      <Parallax speed={-15}>
        <img src={birds1} alt='birds1' className='birds1' />
      </Parallax>
      <Parallax speed={-10}>
        <img src={sun} alt='' className='sun' />
      </Parallax>
      <img src={bison2} alt='bison2' className='bison2' />
      <div className='hero-content'>
        <Parallax speed={-3}>
          <h1>Discover Your Next Adventures</h1>
        </Parallax>
        <Parallax speed={2}>
          <p>Explore beautiful destinations around the world</p>
        </Parallax>
        <button>Explore Now</button>
        <div className="scroll-indicator">
          <span></span>
        </div>
      </div>
    </section>
  )
}

export default Hero
