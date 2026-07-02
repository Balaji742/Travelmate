import React, { useEffect, useState } from 'react'
import { collection, addDoc, serverTimestamp, getDocs, doc, deleteDoc, updateDoc, writeBatch } from "firebase/firestore";
import { auth, db } from "../firabase";
import { BsPlusLg } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import { FaCcVisa, FaRegTrashAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa6";
import { LuShieldCheck } from "react-icons/lu";
import { SlLock } from "react-icons/sl";
import { BsHeadset } from "react-icons/bs";
import sbi from "../assets/logos/sbi.svg"

const Payment = ({ payment }) => {
    const [cards, setCards] = useState([]);
    const [cardHolder, setCardHolder] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardType, setCardType] = useState("");
    const [editId, setEditId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const cardStyles = {
        Visa: {
            icon: <FaCcVisa className="icon text-white" />,
            bg: "payment-card"
        },
        MasterCard: {
            icon: <FaCcMastercard className="icon text-white" />,
            bg: "payment-master"
        },
        SBI: {
            icon: <img src={sbi} width="55" alt='SBI' />,
            bg: "payment-sbi"
        },
        HDFC: {
            icon: <img src="/hdfc.svg" width="55" />,
            bg: "payment-hdfc"
        },
        ICICI: {
            icon: <img src="/icici.svg" width="55" />,
            bg: "payment-icici"
        },
    };

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        const querySnapshot = await getDocs(collection(db, "paymentMethods"));
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        setCards(data);
    };

    const handleAddCard = async () => {
        try {
            await addDoc(collection(db, "paymentMethods"), {
                userId: auth.currentUser.uid,
                cardHolder,
                cardNumber,
                expiry,
                cardType,
                isDefault: false,
                createdAt: serverTimestamp(),
            });

            await fetchCards();
            alert("Card Added Successfully");
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDelete = async (id) => {
        try {

            await deleteDoc(doc(db, "paymentMethods", id));

            await fetchCards();

            alert("Card Deleted Successfully");

        } catch (error) {
            alert(error.message);
        }
    };

    const handleUpdate = async () => {

        try {
            const userRef = doc(db, "paymentMethods", editId);
            await updateDoc(userRef, {
                cardHolder,
                cardNumber,
                expiry,
                cardType,
            });
            await fetchCards();
            setIsEditing(false);
            alert("Card Updated Successfully");
        } catch (error) {
            alert(error.message);
        }
    };

    const handleEdit = (card) => {

        setEditId(card.id);
        setCardHolder(card.cardHolder);
        setCardNumber(card.cardNumber);
        setExpiry(card.expiry);
        setCardType(card.cardType);
        setIsEditing(true);
    };


    const handleSetDefault = async (selectedId) => {
        try {

            const batch = writeBatch(db);

            cards.forEach((card) => {
                const cardRef = doc(db, "paymentMethods", card.id);

                batch.update(cardRef, {
                    isDefault: card.id === selectedId
                });
            });

            await batch.commit();

            await fetchCards();

            alert("Default Card Updated");

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center m-3 px-5 py-3'>
                <div>
                    <h1>Payment Methods</h1>
                    <p className='text-muted'>Manage your saved payment methods and set your preffered cards.</p>
                </div>
                <div>
                    <button className='p-2 rounded-3 border-0 add text-white ps-3 pe-3' data-bs-toggle="modal"
                        data-bs-target="#editProfileModal"><BsPlusLg className='fs-4' /> Add New Card</button>
                </div>
            </div>

            <div>
                <h4 className='m-3 px-5'>Saved Cards</h4>

                {
                    cards.length > 0 ? (
                        cards.map((card, i) => {

                            const style = cardStyles[card.cardType];

                            return (
                                <div className='d-flex justify-content-evenly mb-4' key={i}>

                                    <div className={`col-lg-5 ${style.bg} border rounded-4 p-3`}>

                                        <div className='d-flex justify-content-between mb-3'>
                                            {style.icon}

                                            {
                                                card.isDefault ? (
                                                    <p className='bg-success rounded-5 ps-4 pe-4 text-white text-center p-2'>
                                                        Default
                                                    </p>
                                                ) : (
                                                    <p className='bg-secondary rounded-5 ps-4 pe-4 text-white text-center p-2'>
                                                        Credit Card
                                                    </p>
                                                )
                                            }
                                        </div>

                                        <h3 className='text-white'>
                                            {card.cardNumber}
                                        </h3>

                                        <p className='text-white fs-5 mb-0'>
                                            {card.cardHolder}
                                        </p>

                                        <span className='text-white fs-5'>
                                            Expires {card.expiry}
                                        </span>

                                        <br />

                                        <hr className='text-white-50' />

                                        <div className='d-flex align-items-center'>

                                            {!card.isDefault && (
                                                <div className='text-center border-end flex-fill'>
                                                    <span
                                                        className='text-white'
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => handleSetDefault(card.id)}
                                                    >
                                                        <FaRegStar /> Set as Default
                                                    </span>
                                                </div>
                                            )}

                                            <div className='text-center border-end flex-fill'>
                                                <span
                                                    className='text-white'
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleEdit(card)}
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#editProfileModal"
                                                >
                                                    <GoPencil /> Edit
                                                </span>
                                            </div>

                                            <div className='text-center flex-fill'>
                                                <span
                                                    className='text-danger'
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleDelete(card.id)}
                                                >
                                                    <FaRegTrashAlt /> Delete
                                                </span>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            );
                        })
                    ) : (
                        <h1 className='text-center border mx-5 py-3 text-danger'>
                            No Cards Found. Add a Card
                        </h1>
                    )
                }
            </div>

            <div className='dashed-border mx-5 my-5'>
                <div className='d-flex justify-content-evenly align-items-center p-3'>
                    <div className='d-flex gap-4'>
                        <div className="rounded-circle faa d-flex justify-content-center align-items-center" style={{ width: "80px", height: "80px" }} >
                            <FaRegCreditCard className="primary" style={{ fontSize: "38px" }} />
                        </div>
                        <div className='mt-2'>
                            <h4>Add a new payment method</h4>
                            <small className="text-muted">Save a new card for faster checkout and secure payments.</small>
                        </div>
                    </div>
                    <button className='p-2 rounded-3 adds ps-3 pe-3' data-bs-toggle="modal"
                        data-bs-target="#editProfileModal"><BsPlusLg className='fs-4' /> Add New Card</button>
                </div>
            </div>

            <div className='border rounded-4 d-flex justify-content-evenly bg align-content-center mb-4 mx-5 py-3'>
                <div className='d-flex gap-3'>
                    <div className="rounded-circle faa d-flex justify-content-center align-items-center mt-3" style={{ width: "60px", height: "60px" }} >
                        <LuShieldCheck className="primary" style={{ fontSize: "38px" }} />
                    </div>
                    <div className='mt-2'>
                        <h6>Secure Payments</h6>
                        <small className="text-muted">Your payment information is<br />encrypted and secure</small>
                    </div>
                </div>
                <div className='d-flex gap-3'>
                    <div className="rounded-circle faa d-flex justify-content-center align-items-center mt-3" style={{ width: "60px", height: "60px" }} >
                        <SlLock className="primary" style={{ fontSize: "38px" }} />
                    </div>
                    <div className='mt-2'>
                        <h6>Privacy Protected</h6>
                        <small className="text-muted">We never share your payment details<br />checkout and secure payments</small>
                    </div>
                </div>
                <div className='d-flex gap-3'>
                    <div className="rounded-circle faa d-flex justify-content-center align-items-center mt-3" style={{ width: "60px", height: "60px" }} >
                        <BsHeadset className="primary" style={{ fontSize: "38px" }} />
                    </div>
                    <div className='mt-2'>
                        <h6>24/7 Support</h6>
                        <small className="text-muted">Need help? Our support team<br />is here for you</small>
                    </div>
                </div>
            </div>



            <div className="modal fade" id="editProfileModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded-4">
                        <div className="modal-header border-0">
                            <div>
                                <h3 className="fw-bold">Add New Card</h3>
                                <p className="text-muted mb-0">Save a payment method for future bookings.</p>
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" ></button>
                        </div>

                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Card Holder Name</label>
                                <input type="text" className="form-control" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} placeholder="Enter card holder name" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Card Number</label>
                                <input type="text" className="form-control" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="1234 5678 9012 3456" />
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label className="form-label">Expiry</label>
                                    <input type="text" className="form-control" value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" />
                                </div>

                                <div className="col">
                                    <label className="form-label">CVV</label>
                                    <input type="password" className="form-control" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="123" />
                                </div>
                            </div>

                            <div className="mt-3">
                                <label className="form-label">Card Type</label>
                                <select className="form-select" value={cardType} onChange={(e) => setCardType(e.target.value)}>
                                    <option value="">Select Card</option>
                                    <option value="Visa">Visa</option>
                                    <option value="MasterCard">MasterCard</option>
                                    <option value="SBI">SBI</option>
                                    <option value="ICICI">ICICI</option>
                                    <option value="HDFC">Hdfc</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer border-0">
                            <button className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button className="btn btn-primary" onClick={isEditing ? handleUpdate : handleAddCard}>
                                {isEditing ? "Update Card" : "Save Card"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
