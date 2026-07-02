import React, { useEffect, useState } from 'react'
import { destinations } from "../data/destinationsData";
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
import { Parallax } from 'react-scroll-parallax';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firabase';
import { onAuthStateChanged } from 'firebase/auth';

const Destinations = () => {

  const [search, setSearch] = useState("")
  const [sortBy, setSoryBy] = useState("featured")
  const [wishList, setWishList] = useState([]);

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

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchWishlist()
      }
    });
    return unsubscribe;
  }, [])

  const fetchWishlist = async () => {
    const q = query(collection(db, "whishlist"), where("userId", "==", auth.currentUser.uid));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setWishList(data)
  };

  const handleWishlist = async (dest) => {
    try {
      const alreadyExists = wishList.find(
        (item) => item.destinationId === dest.id
      );

      if (alreadyExists) {
        await deleteDoc(doc(db, "whishlist", alreadyExists.id)) //Remove from firestore

        setWishList(wishList.filter(item=>item.destinationId !== dest.id)); //Remove from state
        alert("Removed from wishlist")
      } else {
        const docRef = await addDoc(collection(db, "whishlist"), {
          userId: auth.currentUser.uid,
          destinationId: dest.id,
          title: dest.title,
          country: dest.country,
          price: dest.price,
          image: dest.image,
          createdAt: new Date(),
        });

        setWishList((prev) => [
          ...prev,
          {
            id: docRef.id,
            destinationId: dest.id,
            title: dest.title,
          },
        ]);

        alert("Added to wishlist!");
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className='container-fluid bg-dark-subtle'>
      <Parallax translateY={[-20, 20]}>
        <h1 className='text-center fw-bold pt-4'>Explore Destinations</h1>
        <p className='text-center text-muted'>Discover amazing places around the world and plan your next Adventure.</p>
      </Parallax>
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
      <Parallax speed={5}>
        <div className='container mb-5'>
          <div className='row g-4'>
            {
              filteredDest.length > 0 ? sortedDest.map((dest, i) => {
                const isWishlisted = wishList.some(item => item.destinationId === dest.id)
                return (
                  <div className='col-lg-4' key={i}>
                    <div className='dest-card h-100 bg-light'>
                      <div className='position-relative'>
                        <img src={dest.image} alt={dest.title} width="100%" height="250px" style={{ objectFit: "cover" }} />
                        <FaHeart className='position-absolute' onClick={() => handleWishlist(dest)} style={{ top: "12px", right: "12px", padding: "5px", fontSize: "38px", cursor: "pointer", color: isWishlisted ? "red" : "white" }} />
                      </div>
                      <div className='p-3'>
                        <div className='d-flex justify-content-between'>
                          <h3>{dest.title}</h3>
                          <h6>⭐ {dest.rating.rate}</h6>
                        </div>
                        <h6 className='text-secondary mb-3'><IoLocation className='text-info' />
                          {dest.country}</h6>
                        <div className='d-flex justify-content-between pt-6'>
                          <h5 className='fw-bold text-success'>{dest.price}</h5>
                          <Link
                            to={`/destination/${dest.id}`}
                            className="btn btn-success"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
                : (
                  <div className='text-center' >
                    <Parallax rotate={[0, 8]}>
                      <img src={notfound} alt="Not Found" style={{ maxWidth: "600px", width: "100%", marginBottom: "-20px" }} /></Parallax>
                    <div style={{ marginTop: "-100px" }}>
                      <h1 className='fw-bold'>Destination not found</h1>
                      <p className='text-muted'>We couldn't find any destination <br />matching your search. <br /> Try another city or country.</p>
                    </div>
                  </div>
                )
            }

          </div>
        </div>
      </Parallax>
      {
        filteredDest.length > 0 ? (
          <>

            <div className='m-5'>
              <Parallax scale={[0.9, 1]}>
                <MapSection />
              </Parallax>
            </div>
            <Footer />
          </>
        ) : null
      }
    </div>
  )
}
export default Destinations
