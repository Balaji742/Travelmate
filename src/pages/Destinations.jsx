import React, { useState } from 'react'
import '../styles/destinations.css'
import notfound from "../assets/notfound.png";
import bali1 from "../assets/bali1.jpg";
import paris from "../assets/paris.jpg";
import dubai from "../assets/dubai.jpg";
import tokyo from "../assets/tokyo.jpg";
import maldives from "../assets/maldives.jpg";
import banff from "../assets/banff.jpg";
import santorini from "../assets/santorini.jpg";
import swiss from "../assets/swiss.jpg";
import newyork from "../assets/newyork.jpg";
import singapore from "../assets/singapore.jpg";
import sydney from "../assets/sydney.jpg";
import goa from "../assets/goa.jpg";
import london from "../assets/london.jpg";
import rome from "../assets/rome.jpg";
import fuji from "../assets/fuji.jpg";
import { IoLocation } from "react-icons/io5";
import MapSection from "../components/MapSection";
import Footer from '../components/Footer';
// import DestinationCard from '../components/DestinationCard';

const Destinations = () => {

  const [search, setSearch] = useState("")
  const [sortBy, setSoryBy] = useState("featured")
  const destinations = [
    {
      id: 1,
      title: "Bali",
      country: "Indonesia",
      category: "Beach",
      price: "$999",
      image: bali1,
    },
    {
      id: 2,
      title: "Paris",
      country: "France",
      category: "City",
      price: "$1499",
      image: paris,
    },
    {
      id: 3,
      title: "Dubai",
      country: "UAE",
      category: "City",
      price: "$1299",
      image: dubai,
    },
    {
      id: 4,
      title: "Tokyo",
      country: "Japan",
      category: "City",
      price: "$1799",
      image: tokyo,
    }, {
      id: 5,
      title: "Maldives",
      country: "Maldives",
      category: "Beach",
      price: "$1899",
      image: maldives,
    },
    {
      id: 6,
      title: "Banff",
      country: "Canada",
      category: "Mountain",
      price: "$1699",
      image: banff,
    },
    {
      id: 7,
      title: "Santorini",
      country: "Greece",
      category: "Beach",
      price: "$1599",
      image: santorini,
    },
    {
      id: 8,
      title: "Swiss Alps",
      country: "Switzerland",
      category: "Mountain",
      price: "$2199",
      image: swiss,
    },
    {
      id: 9,
      title: "New York",
      country: "USA",
      category: "City",
      price: "$1699",
      image: newyork,
    },
    {
      id: 10,
      title: "Singapore",
      country: "Singapore",
      category: "City",
      price: "$1399",
      image: singapore,
    },
    {
      id: 11,
      title: "Sydney",
      country: "Australia",
      category: "City",
      price: "$1999",
      image: sydney,
    },
    {
      id: 12,
      title: "Goa",
      country: "India",
      category: "Beach",
      price: "$799",
      image: goa,
    },

    {
      id: 13,
      title: "London",
      country: "United Kingdom",
      category: "City",
      price: "$1899",
      image: london,
    },

    {
      id: 14,
      title: "Rome",
      country: "Italy",
      category: "Historical",
      price: "$1699",
      image: rome,
    },
    {
      id: 15,
      title: "Mount Fuji",
      country: "Japan",
      category: "Mountain",
      price: "$1499",
      image: fuji,
    }
  ]

  const filteredDest = destinations.filter((dest) => dest.title.toLowerCase().includes(search.toLowerCase()) || dest.country.toLowerCase().includes(search.toLowerCase()) || dest.category.toLowerCase().includes(search.toLowerCase()))
  const sortedDest = [...filteredDest]
  if (sortBy === "hightolow") {
    sortedDest.sort((a, b) => parseInt(b.price.replace("$", "")) - parseInt(a.price.replace("$", "")))
  }
  if (sortBy === "lowtohigh") {
    sortedDest.sort((a, b) => parseInt(a.price.replace("$", "")) - parseInt(b.price.replace("$", "")))
  }
  if (sortBy === "A-Z") {
    sortedDest.sort((a, b) => a.country.localeCompare(b.country))
  }
  if (sortBy === "Z-A") {
    sortedDest.sort((a, b) => b.country.localeCompare(a.country))
  }

  return (
    <div className='container-fluid bg-dark-subtle'>
      <h1 className='text-center fw-bold pt-4'>Explore Destinations</h1>
      <p className='text-center text-muted'>Discover amazing places around the world and plan your next Adventure.</p>
      <div className='text-center mt-4 mb-5 d-flex justify-content-center gap-2'>
        <input type='text' placeholder='Search destinations' className='form-control w-50 bg-dark-subtle border-2 border-black' value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className='border rounded-1 bg-dark-subtle border-2 border-black' value={sortBy} onChange={(e) => setSoryBy(e.target.value)}>
          <option value="featured">Featured</option>
          <option value="hightolow">High-to-Low</option>
          <option value="lowtohigh">Low-to-high</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>
      <div className='container mb-5'>
        <div className='row g-4'>
          {
            filteredDest.length > 0 ? sortedDest.map((dest, i) => (
              <div className='col-lg-4' key={i}>
                <div className='dest-card h-100 bg-light'>
                  <img src={dest.image} alt={dest.title} width="100%" height="250px" style={{ objectFit: "cover" }} />
                  <div className='p-3'>
                    <div className='d-flex justify-content-between'>
                      <h3>{dest.title}</h3>
                      <h6>⭐ 4.8</h6>
                    </div>
                    <h6 className='text-secondary mb-3'><IoLocation className='text-info' />
                      {dest.country}</h6>
                    <div className='d-flex justify-content-between pt-6'>
                      <h5 className='fw-bold text-success'>{dest.price}</h5>
                      <button className='btn btn-success'>View Details</button>
                    </div>
                  </div>
                </div>
              </div>
            )) :
              <div className='text-center' >
                <img src={notfound} alt="Not Found" style={{ maxWidth: "600px", width: "100%", marginBottom: "-20px" }} />
                <div style={{ marginTop: "-100px" }}>
                  <h1 className='fw-bold'>Destination not found</h1>
                  <p className='text-muted'>We couldn't find any destination <br />matching your search. <br /> Try another city or country.</p>
                </div>
              </div>
          }
        </div>
      </div>
      {
        filteredDest.length > 0 ? (
          <>
            <div className='m-5'>
              <MapSection />
            </div>
            <Footer />
          </>)
          : null
      }
    </div>
  )
}

export default Destinations
