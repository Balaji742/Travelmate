import React, { useEffect, useState } from 'react'
import '../styles/profile.css'
import { GoHome } from "react-icons/go";
import { IoBagOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { MdOutlinePayment } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import profile from "../assets/profile.jpg"
import { MdOutlineCalendarToday } from "react-icons/md";
import { PiAirplaneTiltLight } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa6";
import { destinations } from "../data/destinationsData";
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firabase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { MdKeyboardArrowRight } from "react-icons/md";
import MyBookings from '../overview/MyBookings';
import Wishlist from '../overview/Wishlist';
import ProfileInfo from '../overview/ProfileInfo';
import Payment from '../overview/Payment';
import Settings from '../overview/Settings';
import { settings } from 'firebase/analytics';
import { FaMoneyBillWave } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


const Profile = () => {
    const [bookings, setBookings] = useState([])
    const [wishlist, setWishList] = useState([])
    const [userData, setUserData] = useState(null)
    const [activeTab, setActiveTab] = useState("overview")
    const navigate = useNavigate()
    const uniqueDestinations = [...new Set(bookings.map(booking => booking.destination))];
    const totalSpent = bookings.reduce(
        (total, booking) => total + Number(booking.price.replace(/[^\d]/g, "")),
        0
    );

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUserData(currentUser);
                fetchBookings()
                fetchWishlist()
                fetchUsers()
            }
        });
        return unsubscribe;
    }, [])

    const fetchBookings = async () => {
        const q = query(collection(db, "bookings"), where("userId", "==", auth.currentUser.uid));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookings(data)

    }

    const fetchWishlist = async () => {
        const q = query(collection(db, "whishlist"), where("userId", "==", auth.currentUser.uid));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setWishList(data)
    }

    const fetchUsers = async () => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUserData(docSnap.data())
        }
    }

    const handleLogout = async ()=>{
        try{
            await signOut(auth);
            navigate('/login')
        }catch(error){
            alert(error.messsage)
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-lg-3">
                    <div className='border-end border-top' style={{ height: '100vh' }}>
                        <div className="profile-container text-center mt-5">
                            <img
                                src={userData?.photoURL || "https://ui-avatars.com/api/?name=User"}
                                alt="Profile"
                                className="profile-image rounded-circle"
                                style={{ width: "120px", height: "120px", objectFit: "cover" }}
                            />

                            <h4 className="profile-name">{userData?.fullName}</h4>

                            <p className="profile-email">
                                {userData?.email}
                            </p>
                        </div>
                        <div className=''>
                            <ul className='list-unstyled profile-menu'>
                                <li className={`ms-2 me-2 p-3 d-flex align-items-center gap-3 ${activeTab === "overview" ? "active-menu" : ""
                                    }`} onClick={() => setActiveTab("overview")}><GoHome className='fs-4' /> Overview</li>

                                <li className={`ms-2 me-2 p-3 d-flex align-items-center gap-3 ${activeTab === "bookings" ? "active-menu" : ""
                                    }`} onClick={() => setActiveTab("bookings")}><IoBagOutline className='fs-4' /> My Bookings</li>

                                <li className={`ms-2 me-2 p-3 d-flex align-items-center gap-3 ${activeTab === "wishList" ? "active-menu" : ""
                                    }`} onClick={() => setActiveTab("wishList")}><GoHeart className='fs-4' /> Wishlist</li>

                                <li className={`ms-2 me-2 p-3 d-flex align-items-center gap-3 ${activeTab === "Profile-info" ? "active-menu" : ""
                                    }`} onClick={() => setActiveTab("Profile-info")}><BiUser className='fs-4' /> Profile Info</li>

                                <li className={`ms-2 me-2 p-3 d-flex align-items-center gap-3 ${activeTab === "payment" ? "active-menu" : ""
                                    }`} onClick={() => setActiveTab("payment")}><MdOutlinePayment className='fs-4' /> Payment Methods</li>

                                <li className={`ms-2 me-2 p-3 d-flex align-items-center gap-3 ${activeTab === "settings" ? "active-menu" : ""
                                    }`} onClick={() => setActiveTab("settings")}><IoSettingsOutline className='fs-4' /> Settings</li><hr className='ms-4 me-4' />

                                <li className='text-danger p-2 m-3' style={{cursor:"pointer"}} onClick={handleLogout}><MdOutlineLogout className='fs-4' /> Logout</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {
                    activeTab === "overview" && (
                        <>
                            <div className="col-lg-9 bg-light">
                                <div
                                    style={{
                                        backgroundImage: `url(${profile})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        height: "300px",
                                        borderRadius: "12px"
                                    }} className='d-flex flex-column justify-content-center ps-5 mt-3'>

                                    <h6 className='fw-bold'>Welcome Back,</h6>
                                    <h1 className='fw-bold'>{userData?.fullName}</h1>
                                    <p>Manage your travels, bookings <br /> and preferences all in one place.</p>
                                </div>
                                <div className='d-flex justify-content-between mt-4'>
                                    <div className='border rounded-4 p-3 d-flex align-items-center column-gap-4 bg-white'>
                                        <MdOutlineCalendarToday
                                            className='border rounded-circle p-3 bg-success-subtle text-success'
                                            style={{ fontSize: "60px" }}
                                        />
                                        <div>
                                            <h3>{bookings.length}</h3>
                                            <p>Total Bookings</p>
                                        </div>
                                    </div>
                                    <div className='border rounded-4 p-3 d-flex align-items-center column-gap-4 bg-white'>
                                        <PiAirplaneTiltLight className='border rounded-circle p-3 bg-primary-subtle text-primary' style={{ fontSize: "60px" }} />
                                        <div>
                                            <h3>{uniqueDestinations.length}</h3>
                                            <p>Destination Visited</p>
                                        </div>
                                    </div>
                                    <div className='border rounded-4 p-3 d-flex align-items-center column-gap-4 bg-white'>
                                        <GoHeart className='border rounded-circle p-3' style={{ fontSize: "60px", background: "#e0d2f9", color: "#6840c6" }} />
                                        <div>
                                            <h3>{wishlist.length}</h3>
                                            <p>Saved in Wishlist</p>
                                        </div>
                                    </div>
                                    <div className='border rounded-4 p-3 d-flex align-items-center column-gap-4 bg-white'>
                                        <FaMoneyBillWave className='border rounded-circle p-3' style={{ fontSize: "60px", background: "#ffedd7", color: "orange" }} />
                                        <div>
                                            <h3>${totalSpent}</h3>
                                            <p>Total Amount spent</p>
                                        </div>
                                    </div>
                                </div>


                                <div className='border rounded-4 mt-4 bg-white p-3'>
                                    <div className='d-flex justify-content-between align-items-center mb-3'>
                                        <h5 className='fw-bold mb-0'>Recent Bookings</h5>
                                        <h6 className='text-primary mb-0' style={{ cursor: "pointer" }} onClick={() => setActiveTab("bookings")}>View all</h6>
                                    </div>
                                    {
                                        bookings.slice(0, 2).map((booking, i) => (
                                            <div key={i} className="d-flex justify-content-between align-items-center border mb-1 rounded-3 p-3 ">
                                                <div className='d-flex align-items-center gap-3'>
                                                    <img src={booking.image} alt="image" style={{ width: "120px", height: "80px", objectFit: "cover", borderRadius: "10px" }} />
                                                    <div>
                                                        <h5 className='mb-1'><IoLocationOutline />
                                                            {booking.destination}</h5>
                                                        <p className="text-muted mb-0"><MdOutlineCalendarToday /> {booking.travelDate}</p>
                                                    </div>
                                                </div>
                                                <div className='text-end d-flex align-items-center gap-5 border-start ps-5 '>
                                                    <div>
                                                        <span className="bg-success-subtle text-success p-1 mb-1 rounded-2">Confirmed</span>
                                                        <h5 className="fw-bold mt-2">{booking.price}</h5>
                                                    </div>
                                                    <MdKeyboardArrowRight
                                                        size={28}
                                                        className="text-secondary"
                                                        style={{ cursor: "pointer" }}
                                                    />
                                                </div>

                                            </div>
                                        ))
                                    }
                                </div>

                                <div className='border rounded-4 mt-4 bg-white p-3'>
                                    <div className='d-flex justify-content-between align-items-center mb-3'>
                                        <h5 className='fw-bold mb-0'>Wishlist</h5>
                                        <h6 className='text-primary mb-0' style={{ cursor: "pointer" }} onClick={() => setActiveTab("wishList")}>View all</h6>
                                    </div>
                                    <div className='row'>
                                        {
                                            wishlist.slice(0, 3).map((like, i) => (
                                                <div className='col-lg-4 mb-3' key={i}>
                                                    <div className="card h-100 shadow-sm" >
                                                        <div className='position-relative'>
                                                            <img
                                                                src={like.image}
                                                                className="card-img-top"
                                                                height="200"
                                                                style={{ objectFit: "cover" }}
                                                                alt={like.title}
                                                            />
                                                            <FaHeart className='position-absolute' style={{ top: "12px", right: "12px", padding: "5px", fontSize: "38px", cursor: "pointer", color: "red" }} />
                                                        </div>

                                                        <div className="card-body">
                                                            <h5>{like.title},{like.country}</h5>
                                                            <h6 className="text-muted">{like.price}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                {activeTab === "bookings" && (
                    <div className="col-lg-9 bg-light">
                        <MyBookings bookings={bookings} />
                    </div>
                )}
                {activeTab === "wishList" && (
                    <div className="col-lg-9 bg-light">
                        <Wishlist wishlist={wishlist} />
                    </div>
                )}
                {activeTab === "Profile-info" && (
                    <div className="col-lg-9 bg-light">
                        <ProfileInfo />
                    </div>
                )}
                {activeTab === "payment" && (
                    <div className="col-lg-9 bg-light">
                        <Payment />
                    </div>
                )}
                {activeTab === "settings" && (
                    <div className="col-lg-9 bg-light">
                        <Settings profileInfo={userData}/>
                    </div>
                )}

            </div>
        </div >
    )
}

export default Profile
