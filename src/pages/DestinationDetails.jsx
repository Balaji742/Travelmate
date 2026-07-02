import React from 'react'
import { destinations } from "../data/Destinationsdata";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";
import { useNavigate, useParams } from 'react-router-dom';
import { Parallax } from 'react-scroll-parallax';
import { Link } from "react-router-dom";
import { GoHeart } from 'react-icons/go';

const DestinationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate()

    const destination = destinations.find(
        (item) => item.id === Number(id)
    );

    if (!destination) {
        return <h2>Destination Not Found</h2>;
    }

    return (
        <div className="container py-5">
            <h1 className="text-center fw-bold mb-5">DESTINATION DETAILS</h1>
            <Parallax speed={-10}>
                <img src={destination.image} alt={destination.title} className="img-fluid rounded shadow mb-5" style={{ width: "100%", height: "500px", objectFit: "cover" }} />
            </Parallax>

            <div className="row">
                <div className="col-lg-8">
                    <div className="card shadow border-0 mb-4">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <h1 className="fw-bold">{destination.title}, {destination.country}</h1>
                                <h4>⭐ {destination.rating.rate}</h4>
                            </div>

                            <p className="text-muted fs-5">{destination.category} • Tropical • Adventure</p>
                            <h3 className="text-success fw-bold">Starting From {destination.price}</h3>
                        </div>
                    </div>

                    <Parallax translateY={[-10, 10]}>
                        <div className="card shadow border-0 mb-4">
                            <div className="card-body">
                                <h3>About {destination.title}</h3>
                                <p>{destination.description}</p>
                            </div>
                        </div>
                    </Parallax>

                    <Parallax scale={[0.9, 1.1]}>
                        <div className="card shadow border-0 mb-4">
                            <div className="card-body">
                                <h3>Highlights</h3>
                                <ul>
                                    <li>Beautiful Beaches</li>
                                    <li>Luxury Resorts</li>
                                    <li>Water Sports</li>
                                    <li>Local Cuisine</li>
                                    <li>Cultural Temples</li>
                                    <li>Sunset Views</li>
                                </ul>
                            </div>
                        </div>
                    </Parallax>

                    <div className="card shadow border-0 mb-4">
                        <div className="card-body">
                            <h3>Trip Information</h3>
                            <p>📍 {destination.country}</p>
                            <p>🕒 {destination.duration.ShortTrip}</p>
                            <p>🌤 {destination.bestSeason}</p>
                            <p>👥 {destination.GroupSize}</p>
                        </div>
                    </div>

                    <div className="card shadow border-0">
                        <div className="card-body">
                            <h3 className="mb-4">Location on Map</h3>

                            <MapContainer
                                center={[
                                    destination.latitude,
                                    destination.longitude
                                ]}
                                zoom={10}
                                style={{
                                    height: "500px",
                                    width: "100%",
                                    borderRadius: "15px"
                                }}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                <Marker
                                    position={[
                                        destination.latitude,
                                        destination.longitude
                                    ]}
                                >
                                    <Popup>
                                        {destination.title}
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>
                </div>

                {/* <Parallax rotate={[0, 1]}> */}
                <div className="col-lg-4">
                    <div className="card shadow sticky-top">
                        <div className="card-body">
                            <h2 className="text-success fw-bold">{destination.price}</h2>
                            <hr />
                            <p>✔ Hotel Included</p>
                            <p>✔ Airport Transfer</p>
                            <p>✔ Breakfast Included</p>
                            <p>✔ Guided Tours</p>
                            <button className="btn btn-success w-100" onClick={()=>navigate(`/bookings/${destination.id}`)}>Book Now</button>
                        </div>
                    </div>
                </div>
                {/* </Parallax> */}
            </div>

            <h2 className="mt-5 mb-4">Related Destinations</h2>

            <div className="row g-4">
                {destinations
                    .filter(
                        (item) =>
                            item.category === destination.category &&
                            item.id !== destination.id
                    )
                    .slice(0, 3)
                    .map((item) => (
                        <div className="col-md-4" key={item.id}>
                            <Link to={`/destination/${item.id}`} className="text-decoration-none text-dark">
                                <div className="card h-100 shadow-sm">
                                    <div className='position-relative'>
                                    <img
                                        src={item.image}
                                        className="card-img-top"
                                        height="200"
                                        style={{ objectFit: "cover" }}
                                        alt={item.title}
                                    />
                                    <GoHeart className='position-absolute bg-white rounded-circle shadow' style={{top:"12px",right:"12px",padding:"8px",fontSize:"38px",color:"#555",cursor:"pointer"}} />
                                    </div>
                                    
                                    <div className="card-body">
                                        <h5>{item.title}</h5>
                                        <p>{item.country}</p>
                                        <h6 className="text-success">{item.price}</h6>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default DestinationDetails