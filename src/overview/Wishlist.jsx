import React from 'react'
import { FaHeart } from 'react-icons/fa'

const Wishlist = ({ wishlist }) => {
    return (
        <div className='row mt-4'>
            {
                wishlist.map((like, i) => (
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
    )
}

export default Wishlist
