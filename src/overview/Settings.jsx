import React, { useState } from 'react'
import { FaUser } from "react-icons/fa6";
import { IoNotifications, IoShieldCheckmark } from "react-icons/io5";
import { MdKeyboardArrowRight } from 'react-icons/md';
import Switch from "react-switch"
import { IoWarning } from "react-icons/io5";
import { auth, db } from '../firabase';
import { collection, deleteDoc, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Settings = ({ profileInfo }) => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("")
    const [notifications, setNotifications] = useState({ booking: true, offers: false, travel: true, sms: false, push: true, profile: false, history: false, recommend: true })
    const [setting, setSetting] = useState({
        countryCode: "+91",
        language: "English",
        timeZone: "",
        region: "",
        currency: "INR",
        dateFormat: "DD/MM/YYYY",
        timeFormat: "12 Hour",
        bookingNotifications: true,
        smsNotifications: false,
        marketingEmails: true,
        theme: "Light"
    });

    const handleSettings = async () => {
        try {
            await setDoc(doc(db, "settings", auth.currentUser.uid), {
                userId: auth.currentUser.uid,
                countryCode: setting.countryCode,
                language: setting.language,
                timeZone: setting.timeZone,
                region: setting.region,
                currency: setting.currency,
                dateFormat: setting.dateFormat,
                timeFormat: setting.timeFormat,
                notifications: notifications,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            alert("Settings Added Successfully");
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const user = auth.currentUser
            const uid = auth.currentUser.uid;
            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credential)


            await deleteDoc(doc(db, "users", uid));
            await deleteDoc(doc(db, "settings", uid));
            
            const paymentQuery = query(
                collection(db, "paymentMethods"),
                where("userId", "==", uid)
            );
            const paymentSnapshot = await getDocs(paymentQuery);
            for (const document of paymentSnapshot.docs) {
                await deleteDoc(doc(db, "paymentMethods", document.id));
            }

            const bookingQuery = query(
                collection(db, "bookings"),
                where("userId", "==", uid)
            );

            const bookingSnapshot = await getDocs(bookingQuery);

            for (const document of bookingSnapshot.docs) {
                await deleteDoc(doc(db, "bookings", document.id));
            }

            const wishlistQuery = query(
                collection(db, "whishlist"),
                where("userId", "==", uid)
            );
            const wishlistSnapshot = await getDocs(wishlistQuery);
            for (const document of wishlistSnapshot.docs) {
                await deleteDoc(doc(db, "whishlist", document.id));
            }
            await deleteUser(user);

            alert("User data deleted Successfully")
            navigate("/login")
        } catch (error) {
            alert(error.message)
        }
    }

    // console.log(profileInfo)
    // console.log(profileInfo?.phone)
    return (
        <div className='mx-5 my-3'>
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <h1>Settings</h1>
                    <p className='text-muted fs-5'>Manage your account preferences and settings</p>
                </div>
                <div>
                    <button className='bg-success text-white border rounded-3 px-4 py-2 fw-bolder' onClick={handleSettings}>Save Changes</button>
                </div>
            </div>

            <div className='border rounded-3 mt-5 bg-white'>
                <div className='d-flex my-4 mx-5 gap-4'>
                    <div className="rounded-4 border d-flex justify-content-center align-items-center bg-primary-subtle" style={{ width: "60px", height: "60px", }} >
                        <FaUser className="text-primary" style={{ fontSize: "29px" }} />
                    </div>
                    <div>
                        <h4>Account Settings</h4>
                        <p className='text-muted'>Manage your personal information and preferences</p>
                    </div>
                </div>

                <div className="container mb-2">
                    <form>
                        <div className="row mx-4">
                            <div className="col-lg-6 mb-3">
                                <label className="form-label">Email Address</label>
                                <input type="email" className="form-control" value={auth.currentUser?.email || ""} readOnly />
                            </div>

                            <div className="col-lg-6 mb-3">
                                <label className="form-label">Phone Number</label>
                                <div className="input-group">
                                    <select className="form-select" style={{ maxWidth: "90px" }} value={setting.countryCode} onChange={(e) => setSetting({ ...setting, countryCode: e.target.value })}>
                                        <option>+91</option>
                                        <option>+1</option>
                                        <option>+44</option>
                                        <option>+971</option>
                                        <option>+966</option>
                                        <option>+81</option>
                                        <option>+61</option>
                                        <option>+65</option>
                                        <option>+49</option>
                                        <option>+33</option>
                                        <option>+39</option>
                                    </select>

                                    <input
                                        type="tel"
                                        className="form-control "
                                        value={profileInfo?.phone}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6 mb-3">
                                <label className="form-label">Language</label>
                                <select className="form-select" value={setting.language} onChange={(e) => setSetting({ ...setting, language: e.target.value })}>
                                    <option>Arabic</option>
                                    <option>English</option>
                                    <option>French</option>
                                    <option>German</option>
                                    <option>Hindi</option>
                                    <option>Italian</option>
                                    <option>Japanese</option>
                                    <option>Mandarin Chinese</option>
                                    <option>portuguese</option>
                                    <option>Spanish</option>
                                </select>
                            </div>

                            <div className="col-lg-6 mb-3">
                                <label className="form-label">Time Zone</label>
                                <select className="form-select" value={setting.timeZone} onChange={(e) => setSetting({ ...setting, timeZone: e.target.value })}>
                                    <option>(GMT+05:30) Asia/Kolkata (India)</option>
                                    <option>(GMT+00:00) Europe/London (United Kingdom)</option>
                                    <option>(GMT-05:00) America/New_York (United States)</option>
                                    <option>(GMT+09:00) Asia/Tokyo (Japan)</option>
                                    <option>(GMT+04:00) Asia/Dubai (United Arab Emirates)</option>
                                    <option>(GMT+03:00) Asia/Riyadh (Saudi Arabia)</option>
                                    <option>(GMT+10:00) Australia/Sydney (Australia)</option>
                                    <option>(GMT-05:00) America/Toronto (Canada)</option>
                                    <option>(GMT+08:00) Asia/Singapore (Singapore)</option>
                                    <option>(GMT+01:00) Europe/Berlin (Germany)</option>
                                    <option>(GMT+01:00) Europe/Paris (France)</option>
                                    <option>(GMT+01:00) Europe/Rome (Italy)</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className='border rounded-3 my-5 bg-white'>
                <div className='d-flex my-4 mx-5 gap-4'>
                    <div className="rounded-4 border d-flex justify-content-center align-items-center bg-primary-subtle " style={{ width: "60px", height: "60px" }} >
                        <IoNotifications className="text-primary" style={{ fontSize: "29px" }} />
                    </div>
                    <div>
                        <h4>Notifications</h4>
                        <p className='text-muted'>Choose what notifications you want to receive</p>
                    </div>
                </div>

                <div className="container mb-2 bg-white">
                    <div className="row mx-4">
                        <div className="col-lg-6 mb- d-flex gap-5 justify-content-between">
                            <div>
                                <h5 className="">Booking Updates</h5>
                                <p className="text-muted">Get notified about your bookings</p>
                            </div>
                            <Switch checked={notifications.booking} onChange={(value) => setNotifications({ ...notifications, booking: value, })} onColor="#4F6EF7" offColor="#D1D5DB" uncheckedIcon={false} checkedIcon={false} height={24} width={48} handleDiameter={20} className='my-3' />
                        </div>

                        <div className="col-lg-6 mb- d-flex gap-5 justify-content-between">
                            <div>
                                <h5 className="">SMS Notifications</h5>
                                <p className="text-muted">Receive SMS alerts</p>
                            </div>
                            <Switch checked={notifications.sms} onChange={(value) => setNotifications({ ...notifications, sms: value, })} onColor="#4F6EF7" offColor="#D1D5DB" uncheckedIcon={false} checkedIcon={false} height={24} width={48} handleDiameter={20} className='my-3' />
                        </div>

                        <div className="col-lg-6 mb- d-flex gap-5 justify-content-between">
                            <div>
                                <h5 className="">Promotion Offers</h5>
                                <p className="text-muted">Receive offers and discounts</p>
                            </div>
                            <Switch checked={notifications.offers} onChange={(value) => setNotifications({ ...notifications, offers: value, })} onColor="#4F6EF7" offColor="#D1D5DB" uncheckedIcon={false} checkedIcon={false} height={24} width={48} handleDiameter={20} className='my-3' />
                        </div>

                        <div className="col-lg-6 mb- d-flex gap-5 justify-content-between">
                            <div>
                                <h5 className="">Push Notifications</h5>
                                <p className="text-muted">Receive Push Notifications</p>
                            </div>
                            <Switch checked={notifications.push} onChange={(value) => setNotifications({ ...notifications, push: value, })} onColor="#4F6EF7" offColor="#D1D5DB" uncheckedIcon={false} checkedIcon={false} height={24} width={48} handleDiameter={20} className='my-3' />
                        </div>

                        <div className="col-lg-6 mb- d-flex gap-5 justify-content-between">
                            <div>
                                <h5 className="">Travel Tips & Guides</h5>
                                <p className="text-muted">Helpful tips  and destinations guides</p>
                            </div>
                            <Switch checked={notifications.travel} onChange={(value) => setNotifications({ ...notifications, travel: value, })} onColor="#4F6EF7" offColor="#D1D5DB" uncheckedIcon={false} checkedIcon={false} height={24} width={48} handleDiameter={20} className='my-3' />
                        </div>
                    </div>
                </div>
            </div>

            <div className="border rounded-4 px-4 py-4 mt-5 bg-white">
                <div className="d-flex gap-4 align-items-center mx-4">
                    <div className="rounded-4 bg-primary-subtle d-flex justify-content-center align-items-center" style={{ width: "60px", height: "60px" }}>
                        <IoShieldCheckmark className="text-primary fs-3" style={{ fontSize: "29px" }} />
                    </div>
                    <div>
                        <h3 className="mb-1">Security</h3>
                        <p className="text-muted mb-0">Enhance your account security</p>
                    </div>
                </div>

                <div className="mt-4 mx-4">
                    <div className="d-flex justify-content-between align-items-center py-1">
                        <div>
                            <h5 className="mb-1">Booking Password</h5>
                            <p className="text-muted mb-0">Update your password regularly</p>
                        </div>

                        <MdKeyboardArrowRight size={28} />
                    </div>

                    <div className="d-flex justify-content-between align-items-center py-1">
                        <div>
                            <h5 className="mb-1">Two-Factor Authentication</h5>
                            <p className="text-muted mb-0">Add an extra layer of security to your account</p>
                        </div>

                        <div className="d-flex align-items-center gap-3">
                            <span className="border ps-2 pe-2 rounded-pill bg-secondary-subtle text-dark">Inactive</span>
                            <MdKeyboardArrowRight size={28} />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center py-1 border-top">
                        <div>
                            <h5 className="mb-1">Login Sessions</h5>
                            <p className="text-muted mb-0">Manage your active sessions</p>
                        </div>
                        <MdKeyboardArrowRight size={28} />
                    </div>
                </div>
            </div>

            <div className="border rounded-4 px-4 py-4 mt-5 bg-white">
                <div className="d-flex gap-4 align-items-center mx-4">
                    <div className="rounded-4 bg-primary-subtle d-flex justify-content-center align-items-center" style={{ width: "60px", height: "60px" }}>
                        <IoShieldCheckmark className="text-primary fs-3" style={{ fontSize: "29px" }} />
                    </div>
                    <div>
                        <h3 className="mb-1">Privacy</h3>
                        <p className="text-muted mb-0">Manage your privacy preferences</p>
                    </div>
                </div>

                <div className="mt-4 mx-4">
                    <div className="d-flex justify-content-between align-items-center py-1">
                        <div>
                            <h5 className="mb-1">Show profile publicly</h5>
                            <p className="text-muted mb-0">Allow others to view your profile</p>
                        </div>

                        <Switch checked={notifications.profile} onChange={(value) => setNotifications({ ...notifications, profile: value, })} onColor="#4F6EF7" offColor="#D1D5DB" uncheckedIcon={false} checkedIcon={false} height={24} width={48} handleDiameter={20} className='my-3' />
                    </div>

                    <div className="d-flex justify-content-between align-items-center py-1 ">
                        <div>
                            <h5 className="mb-1">Share travel history</h5>
                            <p className="text-muted mb-0">Share your travel history with others</p>
                        </div>

                        <Switch checked={notifications.history} onChange={(value) => setNotifications({ ...notifications, history: value, })} onColor="#4F6EF7" offColor="#D1D5DB" uncheckedIcon={false} checkedIcon={false} height={24} width={48} handleDiameter={20} className='my-3' />
                    </div>

                    <div className="d-flex justify-content-between align-items-center py-1 ">
                        <div>
                            <h5 className="mb-1">Personalized recommendations</h5>
                            <p className="text-muted mb-0">Get recommendations based on your activity</p>
                        </div>
                        <Switch checked={notifications.recommend} onChange={(value) => setNotifications({ ...notifications, recommend: value, })} onColor="#4F6EF7" offColor="#D1D5DB" uncheckedIcon={false} checkedIcon={false} height={24} width={48} handleDiameter={20} className='my-3' />
                    </div>
                </div>
            </div>

            <div className="border rounded-4 px-4 py-4 mt-5 bg-white">
                <div className="d-flex gap-4 align-items-center mx-4">
                    <div className="rounded-4 bg-primary-subtle d-flex justify-content-center align-items-center" style={{ width: "60px", height: "60px" }}>
                        <IoShieldCheckmark className="text-primary fs-3" style={{ fontSize: "29px" }} />
                    </div>
                    <div>
                        <h3 className="mb-1">Appearance</h3>
                        <p className="text-muted mb-0">Customize the look and feel of the app</p>
                    </div>
                </div>

                <div className='mx-4 my-3'>
                    <h5 className='pt-2'>Theme</h5>
                    <div className='d-flex gap-5'>
                        <div>
                            <input type="radio" checked={setting.theme === "Light"} onChange={() => setSetting({ ...setting, theme: "Light" })} />
                            <span className='ms-2'>Light</span>
                        </div>
                        <div>
                            <input type="radio" onChange={() => setSetting({ ...setting, theme: "Dark" })} checked={setting.theme === "Dark"} />
                            <span className='ms-2'>Dark</span>
                        </div>
                        <div>
                            <input type="radio" checked={setting.theme === "System Default"} onChange={() => setSetting({ ...setting, theme: "System Default" })} />
                            <span className='ms-2'>System Default</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='border rounded-3 mt-5 bg-white'>
                <div className='d-flex my-4 mx-5 gap-4'>
                    <div className="rounded-4 border d-flex justify-content-center align-items-center bg-primary-subtle" style={{ width: "60px", height: "60px", }} >
                        <FaUser className="text-primary" style={{ fontSize: "29px" }} />
                    </div>
                    <div>
                        <h4>Currency & Region</h4>
                        <p className='text-muted'>Set your preferred currency and region settings</p>
                    </div>
                </div>

                <div className="container mb-2">
                    <form>
                        <div className="row mx-4">
                            <div className="col-lg-6 mb-3">
                                <label className="form-label">Currency</label>
                                <select className="form-select" value={setting.currency} onChange={(e) => setSetting({ ...setting, currency: e.target.value })}>
                                    <option value="INR">INR - Indian Rupee (₹)</option>
                                    <option value="USD">USD - US Dollar ($)</option>
                                    <option value="EUR">EUR - Euro (€)</option>
                                    <option value="GBP">GBP - British Pound (£)</option>
                                    <option value="AED">AED - UAE Dirham (د.إ)</option>
                                    <option value="SAR">SAR - Saudi Riyal (﷼)</option>
                                    <option value="JPY">JPY - Japanese Yen (¥)</option>
                                    <option value="AUD">AUD - Australian Dollar (A$)</option>
                                    <option value="CAD">CAD - Canadian Dollar (C$)</option>
                                    <option value="SGD">SGD - Singapore Dollar (S$)</option>
                                </select>
                            </div>

                            <div className="col-lg-6 mb-3">
                                <label className="form-label">Date Format</label>
                                <select className="form-select" value={setting.dateFormat} onChange={(e) => setSetting({ ...setting, dateFormat: e.target.value })}>
                                    <option>DD/MM/YYYY (31/12/2026)</option>
                                    <option>MM/DD/YYYY (12/31/2026)</option>
                                    <option>YYYY-MM-DD (2026-12-31)</option>
                                    <option>DD-MMM-YYYY (31-Dec-2026)</option>
                                    <option>MMMM DD, YYYY (December 31, 2026)</option>
                                </select>
                            </div>

                            <div className="col-lg-6 mb-3">
                                <label className="form-label">Time Format</label>
                                <select className="form-select" value={setting.timeFormat} onChange={(e) => setSetting({ ...setting, timeFormat: e.target.value })}>
                                    <option>12 Hour (10:30 AM)</option>
                                    <option>24 Hour (22:30)</option>
                                </select>
                            </div>

                            <div className="col-lg-6 mb-3">
                                <label className="form-label">Region</label>
                                <select className="form-select" value={setting.region} onChange={(e) => setSetting({ ...setting, region: e.target.value })}>
                                    <option>Asia - India</option>
                                    <option>North America - United States</option>
                                    <option>Europe - United Kingdom</option>
                                    <option>Middle East - United Arab Emirates</option>
                                    <option>Middle East - Saudi Arabia</option>
                                    <option>Asia - Japan</option>
                                    <option>Oceania - Australia</option>
                                    <option>North America - Canada</option>
                                    <option>Asia - Singapore</option>
                                    <option>Europe - Germany</option>
                                    <option>Europe - France</option>
                                    <option>Europe - Italy</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className='border border-danger rounded-3 mt-5 bg-danger-subtle'>
                <div className='d-flex my-4 mx-5 gap-4'>
                    <div className="rounded-4 border border-black d-flex justify-content-center align-items-center bg-danger-subtle" style={{ width: "60px", height: "60px", }} >
                        <IoWarning className="text-danger" style={{ fontSize: "35px" }} />
                    </div>
                    <div>
                        <h3 className='text-danger'>Danger Zone</h3>
                        <p className='text-muted'>Irreversible and sensitive actions</p>
                    </div>
                </div>
                <div className='d-flex justify-content-between align-items-center mx-5'>
                    <div>
                        <h2>Delete Account</h2>
                        <p>Permenantly delete your account and all your data</p>
                    </div>
                    <div>
                        <button className='text-danger bg-transparent rounded-3 border-danger px-5 py-3 fs-5' data-bs-toggle='modal' data-bs-target="#deleteAccountModal">Delete Account</button>
                    </div>
                </div>
                <div
                    className="modal fade"
                    id="deleteAccountModal"
                    tabIndex="-1"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title text-danger">
                                    Delete Account
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <h6>Are you sure?</h6>
                                <p className="text-muted">
                                    This action will permanently delete your account,
                                    profile, settings, payment methods and bookings.
                                    This action cannot be undone.
                                </p>
                                <label className='form-label'>Confirm Password</label>
                                <input type='password' className='form-control' placeholder='Enter your password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={handleDeleteAccount}
                                >
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
