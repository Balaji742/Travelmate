import React, { useEffect, useState } from 'react'
import { GoPencil } from "react-icons/go";
import { BiUser } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineCalendarToday } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { VscGlobe } from "react-icons/vsc";
import { BsBank } from "react-icons/bs";
import { IoLanguage } from "react-icons/io5";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { FiTag } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { RiShieldCheckLine } from "react-icons/ri";
import { MdLock } from "react-icons/md";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firabase';
import { settings } from 'firebase/analytics';

const ProfileInfo = () => {
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [nationality, setNationality] = useState("");
    const [photo, setPhoto] = useState(null)
    const [profileinfo, setProfileInfo] = useState({})
    const [settings, setSettings] = useState("")
    const [selectedFile, setSelectedFile] = useState(null);
    const lastLogin = auth.currentUser?.metadata?.lastSignInTime;

    useEffect(() => {
        fetchProfile();
        fetchSettings()
    }, []);

    const fetchProfile = async () => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setProfileInfo(docSnap.data())
        }
    }

    const handleUpdate = async () => {
        try {
            const userRef = doc(db, "users", auth.currentUser.uid);
            await updateDoc(userRef, {
                fullName,
                phone,
                dob,
                gender,
                country,
                city,
                nationality,
                photoURL: photo
            });
            await fetchProfile(); // Refresh UI
            alert("Profile Updated Successfully");
        } catch (error) {
            alert(error.message);
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 500 * 1024) {
            alert("Please select an image smaller than 500 KB");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setPhoto(reader.result);
        }
        reader.readAsDataURL(file)
    }

    const uploadPhoto = async () => {
    if (!selectedFile) {
        alert("Please choose an image first.");
        return;
    }

    if (selectedFile.size > 500 * 1024) {
        alert("Please choose an image less than 500 KB.");
        return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
        const base64 = reader.result;

        try {
            const userRef = doc(db, "users", auth.currentUser.uid);

            await updateDoc(userRef, {
                photoURL: base64,
            });

            setPhoto(base64);

            await fetchProfile();

            alert("Photo uploaded successfully!");
        } catch (error) {
            alert(error.message);
        }
    };

    reader.readAsDataURL(selectedFile);
};

const fetchSettings = async () => {
        const docRef = doc(db, "settings", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setSettings(docSnap.data())
        }
    }

// console.log(userData.currency)
    return (
        <div className="bg-white border rounded-3 mt-4">
            <div className='d-flex justify-content-between align-items-center m-3 px-5'>
                <div>
                    <h4>Profile Information</h4>
                    <p className='fs- text-muted'>View and update your personal details</p>
                </div>
                <div>
                    <button className='p-1 rounded-3 border-primary text-primary ps-3 pe-3' data-bs-toggle="modal"
                        data-bs-target="#editProfileModal"><GoPencil className='fs-4' /> Edit Profile</button>
                </div>
            </div>
            <hr className='ms-5 me-5' />
            <div className="row align-items-center ">
                <div className="col-lg-7 border-end p-3">
                    <h5 className='text-primary px-4 mx-5'>Personal Details</h5>

                    <div className='ps-5 '>
                        <div className='row py-3 mx-3 border-bottom align-items-center'>
                            <div className='col-5'>
                                <h6 className='fw-semibold text-secondary mb-0'><BiUser className='me-2 text-black fs-5' /> Full Name</h6>
                            </div>
                            <div className='col-7 ps-5'>
                                <p className='text-dark mb-0'>{profileinfo.fullName}</p>
                            </div>
                        </div>
                        <div className='row py-3 mx-3 border-bottom align-items-center '>
                            <div className='col-5'>
                                <h6 className='fw-semibold text-secondary mb-0'><MdOutlineMailOutline className='me-2 text-black fs-4' /> Email Address</h6>
                            </div>
                            <div className='col-7 ps-5'>
                                <p className='text-dark mb-0'>{profileinfo.email}</p>
                            </div>
                        </div>
                        <div className='row py-3 mx-3 border-bottom align-items-center'>
                            <div className='col-5'>
                                <h6 className='fw-semibold text-secondary mb-0'><BsTelephone className='me-2 text-black fs-5' /> Phone Number</h6>
                            </div>
                            <div className='col-7 ps-5'>
                                <p className='text-dark mb-0'>+91 {profileinfo.phone}</p>
                            </div>
                        </div>
                        <div className='row py-3 mx-3 border-bottom align-items-center'>
                            <div className='col-5'>
                                <h6 className='fw-semibold text-secondary mb-0'><MdOutlineCalendarToday className='me-2 text-black fs-5' /> Date of Birth</h6>
                            </div>
                            <div className='col-7 ps-5'>
                                <p className='text-dark mb-0'>{profileinfo.dob}</p>
                            </div>
                        </div>
                        <div className='row py-3 mx-3 border-bottom align-items-center'>
                            <div className='col-5'>
                                <h6 className='fw-semibold text-secondary mb-0'><IoLocationOutline className='me-2 text-black fs-4' /> Location</h6>
                            </div>
                            <div className='col-7 ps-5'>
                                <p className='text-dark mb-0'>{profileinfo.city}, {profileinfo.country}</p>
                            </div>
                        </div>
                        <div className='row pt-3 mx-3 align-items-center'>
                            <div className='col-5'>
                                <h6 className='fw-semibold text-secondary mb-0'><VscGlobe className='me-2 text-black fs-4' /> Nationality</h6>
                            </div>
                            <div className='col-7 ps-5'>
                                <p className='text-dark mb-0'>{profileinfo.nationality}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-5 ">
                    <h5 className='text-primary mx-5'>Avatar</h5>
                    <div className="  p-4 text-center">
                        <img
                            src={photo || profileinfo?.photoURL || "https://ui-avatars.com/api/?name=User"}
                            alt="Profile"
                            className="rounded-circle border mb-3"
                            style={{
                                width: "150px",
                                height: "150px",
                                objectFit: "cover"
                            }}
                        />
                        <input type="file" className="form-control mt-3" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])}/>
                        <button className="btn btn-success w-100 mt-3" onClick={uploadPhoto}>Upload Photo</button>
                    </div>
                </div>
            </div>

            <hr className='ms-5 me-5' />

            <div className="row align-items-center ">
                <div className="col-lg-7 p-3">
                    <h5 className='text-primary px-5 mx-3'>Travel Preferences</h5>
                    <div className='ps-5 '>
                        <div className='row py-3 mx-3 border-bottom'>
                            <div className='col-5'>
                                <h6 className='fw-semibold text-secondary mb-0'><BsBank className='me-2 text-black fs-5' />
                                    Default Currency</h6>
                            </div>
                            <div className='col-7 ps-5'>
                                <p className='text-dark mb-0'>{settings.currency}</p>
                            </div>
                        </div>
                        <div className='row py-3 mx-3 border-bottom'>
                            <div className='col-5'>
                                <h6 className='fw-semibold text-secondary mb-0'><IoLanguage className='me-2 text-black fs-4' />
                                    Language</h6>
                            </div>
                            <div className='col-7 ps-5'>
                                <p className='text-dark mb-0'>{settings.language}</p>
                            </div>
                        </div>
                        <div className='row py-3 mx-3 border-bottom'>
                            <div className='col-5'>
                                <h6 className='fw-semibold text-secondary mb-0'><MdAirlineSeatReclineExtra className='me-2 text-black fs-4' /> Preferred Seat</h6>
                            </div>
                            <div className='col-7 ps-5'>
                                <p className='text-dark mb-0'>Window</p>
                            </div>
                        </div>
                        <div className='row py-3 mx-3 '>
                            <div className='col-5'>
                                <h6 className='fw-semibold text-secondary mb-0'><FiTag className='me-2 text-black fs-4' /> Travel Style</h6>
                            </div>
                            <div className='col-7 ps-5'>
                                <p className='text-dark mb-0'>Adventure</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-lg-5 mb-5">
                    <h5 className='text-primary px-4'>Account Information</h5>
                    <div className='row py-3 mx-3 border-bottom'>
                        <div className='col-6'>
                            <h6 className='fw-semibold text-secondary mb-0'><RiShieldCheckLine className='me-2 text-black fs-4' />
                                Member Since</h6>
                        </div>
                        <div className='col-6 ps-5'>
                            <p className='text-dark mb-0'>{profileinfo.createdAt?.toDate().toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}</p>
                        </div>
                    </div>
                    <div className='row py-3 mx-3 border-bottom'>
                        <div className='col-6'>
                            <h6 className='fw-semibold text-secondary mb-0'><MdLockOutline className='me-2 text-black fs-4' />
                                Account Type</h6>
                        </div>
                        <div className='col-6 ps-5'>
                            <p className='text-success mb-0 border rounded-3 bg-success-subtle text-center w-50'>Standard</p>
                        </div>
                    </div>
                    <div className='row py-3 mx-3 border-bottom'>
                        <div className='col-5'>
                            <h6 className='fw-semibold text-secondary mb-0'><FaRegClock className='me-2 text-black fs-5' />
                                Last Logged In</h6>
                        </div>
                        <div className='col-7 ps-5'>
                            <p className="text-dark mb-0">
                                {lastLogin
                                    ? new Date(lastLogin).toLocaleString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })
                                    : "N/A"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <p className='border rounded-3 mx-5 p-2 ps-4 bg-primary-subtle text-primary' style={{ width: "90%" }}><MdLock className='fs-5' /> Your information is secure and will never be shared with anyone.</p>
            <div className="modal fade" id="editProfileModal" tabIndex="-1" aria-hidden="true" >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content rounded-4">

                        {/* Header */}
                        <div className="modal-header border-0">
                            <div>
                                <h3 className="fw-bold mb-1">Edit Profile</h3>
                                <p className="text-muted mb-0">Update your personal information</p>
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" ></button>
                        </div>

                        {/* Body */}
                        <div className="modal-body">
                            {/* Avatar */}
                            <div className="text-center mb-4">
                                <img src={photo || profileinfo?.photoURL || "https://ui-avatars.com/api/?name=User"} alt="Profile" className="rounded-circle border shadow-sm" style={{ width: "120px", height: "120px", objectFit: "cover" }} />
                                <br />
                                <button className="btn btn-outline-success btn-sm mt-3" onClick={() => document.getElementById("profilePhoto").click()}>Change Photo</button>
                                <input type='file' id='profilePhoto' accept='image/*' style={{ display: "none" }} onChange={handlePhotoChange} />
                            </div>

                            {/* Form */}
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Full Name</label>
                                    <input type="text" className="form-control" value={profileinfo.fullName || ""} onChange={(e) => setFullName(e.target.value)} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Phone Number </label>
                                    <input type="text" className="form-control" value={profileinfo.phone || ""} onChange={(e) => setPhone(e.target.value)} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Date of Birth</label>
                                    <input type="date" className="form-control" value={profileinfo.dob || ""} onChange={(e) => setDob(e.target.value)} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Gender</label>
                                    <select className="form-select" value={profileinfo.gender || ""} onChange={(e) => setGender(e.target.value)}>
                                        <option value="">Select Gender</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Country</label>
                                    <input type="text" className="form-control" value={profileinfo.country || ""} onChange={(e) => setCountry(e.target.value)} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">City</label>
                                    <input type="text" className="form-control" value={profileinfo.city || ""} onChange={(e) => setCity(e.target.value)} />
                                </div>

                                <div className="col-12">
                                    <label className="form-label fw-semibold">Nationality</label>
                                    <input type="text" className="form-control" value={profileinfo.nationality || ""} onChange={(e) => setNationality(e.target.value)} />
                                </div>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal" > Cancel</button>
                            <button type="button" className="btn btn-success" onClick={handleUpdate}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProfileInfo
