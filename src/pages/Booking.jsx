import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { destinations } from '../data/Destinationsdata';
import { auth, db } from '../firabase';
import { addDoc, collection } from 'firebase/firestore';

const Booking = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const { id } = useParams();
  const destination = destinations.find((item) => item.id === Number(id));
  const price = Number(destination.price.replace(/[^\d]/g,""));
  const totalPrice = price * travelers;

  const handleBooking = async () => {
    try {
      await addDoc(collection(db, "bookings"), {
        userId: auth.currentUser.uid,
        destination: destination.title,
        price: destination.price,
        image:destination.image,
        name,
        email,
        phone,
        travelDate,
        travelers,
        createdAt: new Date(),
      });

      alert("Booking Successful!");
    } catch (error) {
      console.log(error);
      alert("Booking Failed!");
    }
  };


  return (
    <div className='container py-5'>
      <div className='row g-4'>
        <div className='col-lg-8'>
          <div className='card shadow'>
            <div className='card-body'>
              <h2 className='mb-4'>Book Your Trip <br />for {destination.title}</h2>
              <form>
                <input type='text' className='form-control mb-3' placeholder='Full Name' onChange={(e) => setName(e.target.value.replace(/[^A-Za-z\s]/g, ""))} />
                <input type='email' className='form-control mb-3' placeholder='Email Address' onChange={(e)=>setEmail(e.target.value)}/>
                <input type='number' className='form-control mb-3' placeholder='Phone Number' onChange={(e)=>setPhone(e.target.value)}/>
                <input type='date' className='form-control mb-3' placeholder='Travel Date' onChange={(e)=>setTravelDate(e.target.value)}/>
                <input type='text' className='form-control mb-3' placeholder='Number of Travelers' value={travelers} onClick={(e)=>setTravelers(e.target.value)}/>
                <textarea className="form-control" rows="4" placeholder="Special Requests" />
              </form>
            </div>
          </div>
        </div>

        <div className='col-lg-4'>
          <div className="card shadow sticky-top">
            <div className="card-body">
              <h5>Package includes</h5>
              <ul>
                <li>Hotel Accommodation</li>
                <li>Airport Transfer</li>
                <li>Breakfast Included</li>
                <li>Guided Toors</li>
              </ul>
              <h5>Price per Person</h5>
              <h4 className="text-success fw-bold">{destination.price}</h4>
              <hr/>
              <h5>Number of Travelers</h5>
              <h4>{travelers}</h4>
              <hr />
              <h5>Total price</h5>
              <h3 className="text-primary fw-bold">{totalPrice.toLocaleString}</h3>
              <button className="btn btn-success w-100" onClick={handleBooking}>Confirm Booking</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Booking
