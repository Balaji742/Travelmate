import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
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
import { h2 } from "framer-motion/client";

const MapSection = () => {
    return (
        <div>
        <h2 className="text-center mb-2">Explore Destinations on Map</h2>
        <p className="text-center text-muted">Click on the marker to discover popular travel destinations around the world.</p>
        <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: "350px", width: "100%"}}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[-8.4095, 115.1889]}>
                <Popup>
                <div style={{textAlign:"center"}}>
                    <img src={bali1} alt="Bali" width="80" height="50" style={{borderRadius:"8px",objectFit:"cover"}}/>
                    <h6 className="mt-1">Bali, Indonesia</h6>
                </div>
                </Popup>
            </Marker>

            <Marker position={[48.8566, 2.3522]}>
                <Popup>
                <div style={{textAlign:"center"}}>
                    <img src={paris} alt="Paris" width="80" height="50" style={{borderRadius:"8px",objectFit:"cover"}}/>
                    <h6 className="mt-1">Paris, France</h6>
                </div>
                </Popup>
            </Marker>

            <Marker position={[25.2048, 55.2708]}>
                <Popup>
                <div style={{textAlign:"center"}}>
                    <img src={dubai} alt="Dubai" width="80" height="50" style={{borderRadius:"8px",objectFit:"cover"}}/>
                    <h6 className="mt-1">Dubai, UAE</h6>
                </div>
                </Popup>
            </Marker>

            <Marker position={[35.6762, 139.6503]}>
                <Popup>
                <div style={{textAlign:"center"}}>
                    <img src={tokyo} alt="Tokyo" width="80" height="50" style={{borderRadius:"8px",objectFit:"cover"}}/>
                    <h6 className="mt-1">Tokyo, Japan</h6>
                </div>
                </Popup>
            </Marker>

            <Marker position={[3.2028, 73.2207]}>
                <Popup>
                <div style={{textAlign:"center"}}>
                    <img src={maldives} alt="Maldives" width="80" height="50" style={{borderRadius:"8px",objectFit:"cover"}}/>
                    <h6 className="mt-1">Maldives, Maldives</h6>
                </div>
                </Popup>
            </Marker>

            <Marker position={[36.3932, 25.4615]}>
                <Popup>
                <div style={{textAlign:"center"}}>
                    <img src={santorini} alt="Santorini" width="80" height="50" style={{borderRadius:"8px",objectFit:"cover"}}/>
                    <h6 className="mt-1">Santorini, Greece</h6>
                </div>
                </Popup>
            </Marker>


            <Marker position={[46.8182, 8.2275]}>
                <Popup>
                <div style={{textAlign:"center"}}>
                    <img src={swiss} alt="Swiss Alps" width="80" height="50" style={{borderRadius:"8px",objectFit:"cover"}}/>
                    <h6 className="mt-1">Swiss Alps, Switzerland</h6>
                </div>
                </Popup>
            </Marker>

            <Marker position={[40.7128, -74.0060]}>
                <Popup>
                <div style={{textAlign:"center"}}>
                    <img src={newyork} alt="New York" width="80" height="50" style={{borderRadius:"8px",objectFit:"cover"}}/>
                    <h6 className="mt-1">New York, USA</h6>
                </div>
                </Popup>
            </Marker>

            <Marker position={[1.3521, 103.8198]}>
                <Popup>
                <div style={{textAlign:"center"}}>
                    <img src={singapore} alt="Singapore" width="80" height="50" style={{borderRadius:"8px",objectFit:"cover"}}/>
                    <h6 className="mt-1">Singapore, Singapore</h6>
                </div>
                </Popup>
            </Marker>

            <Marker position={[-33.8688, 151.2093]}>
                <Popup>
                <div style={{textAlign:"center"}}>
                    <img src={sydney} alt="Sydney" width="80" height="50" style={{borderRadius:"8px",objectFit:"cover"}}/>
                    <h6 className="mt-1">Sydney, Australia</h6>
                </div>
                </Popup>
            </Marker>

            <Marker position={[15.2993, 74.1240]}>
                <Popup>
                <div style={{textAlign:"center"}}>
                    <img src={goa} alt="Goa" width="80" height="50" style={{borderRadius:"8px",objectFit:"cover"}}/>
                    <h6 className="mt-1">Goa, India</h6>
                </div>
                </Popup>
            </Marker>

            <Marker position={[51.5072, -0.1276]}>
                <Popup>
                <div style={{textAlign:"center"}}>
                    <img src={london} alt="London" width="80" height="50" style={{borderRadius:"8px",objectFit:"cover"}}/>
                    <h6 className="mt-1">London, UK</h6>
                </div>
                </Popup>
            </Marker>

            <Marker position={[41.9028, 12.4964]}>
                <Popup>
                <div style={{textAlign:"center"}}>
                    <img src={rome} alt="Rome" width="80" height="50" style={{borderRadius:"8px",objectFit:"cover"}}/>
                    <h6 className="mt-1">Rome, Italy</h6>
                </div>
                </Popup>
            </Marker>

            <Marker position={[35.3606, 138.7274]}>
                <Popup>
                <div style={{textAlign:"center"}}>
                    <img src={fuji} alt="Mount fuji" width="80" height="50" style={{borderRadius:"8px",objectFit:"cover"}}/>
                    <h6 className="mt-1">Mount Fuji, Japan</h6>
                </div>
                </Popup>
            </Marker>

            <Marker position={[51.1784, -115.5708]}>
                <Popup>
                <div style={{textAlign:"center"}}>
                    <img src={banff} alt="Banff" width="80" height="50" style={{borderRadius:"8px",objectFit:"cover"}}/>
                    <h6 className="mt-1">Banff, Canada</h6>
                </div>
                </Popup>
            </Marker>
        </MapContainer >
        </div>
    );
};

export default MapSection;