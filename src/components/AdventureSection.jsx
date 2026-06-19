import React from 'react'
import '../styles/adventures.css'
import mountains from "../assets/mountains.jpg";
import beach from "../assets/beach.jpg";
import wildlife from "../assets/wildlife.jpg";
import { Parallax } from 'react-scroll-parallax';
import { useNavigate } from 'react-router-dom';


const AdventureSection = () => {

    const navigate = useNavigate()
    return (
        <section className="adventures">
            <Parallax speed={-5}>
                <h2>Choose Your Adventure</h2>
            </Parallax>

            <Parallax translateY={[50, 0]} speed={-2}>
            <div className="adventure-card" style={{ backgroundImage: `url(${mountains})` }} onClick={()=>navigate('/destinations')}>
                <div className="overlay">
                    <h3>🏔️ Mountain Escapes</h3>
                    <p>Explore majestic peaks and hidden trails.</p>
                </div>
            </div>
            </Parallax>

            <Parallax translateY={[50, 0]} speed={-2}>
            <div className="adventure-card" style={{ backgroundImage: `url(${beach})` }} onClick={()=>navigate('/destinations')}>
                <div className="overlay">
                    <h3>🌊 Coastal Retreats</h3>
                    <p>Relax beside crystal-clear waters.</p>
                </div>
            </div>
            </Parallax>

            <Parallax translateY={[50, 0]} speed={-2}>
            <div className="adventure-card" style={{ backgroundImage: `url(${wildlife})` }} onClick={()=>navigate('/destinations')}>
                <div className="overlay">
                    <h3>🌲 Wildlife Safaris</h3>
                    <p>Experience nature up close.</p>
                </div>
            </div>
            </Parallax>
        </section>
    )
}

export default AdventureSection