import { MdKeyboardArrowRight } from "react-icons/md";

const MyBookings = ({ bookings }) => {
    return (
        <div >
            {
                bookings.map((booking, i) => (
                    <div
                        key={i}
                        className="d-flex justify-content-between align-items-center border mb-3 rounded-3 p-3"
                    >
                        <div className="d-flex align-items-center gap-3">
                            <img
                                src={booking.image}
                                alt={booking.destination}
                                style={{
                                    width: "120px",
                                    height: "80px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                }}
                            />

                            <div>
                                <h5 className="mb-1">{booking.destination}</h5>
                                <p className="text-muted mb-0">{booking.travelDate}</p>
                            </div>
                        </div>

                        <div className="text-end d-flex align-items-center gap-5 border-start ps-5">
                            <div>
                                <span className="bg-success-subtle text-success p-1 rounded-2">
                                    Confirmed
                                </span>
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
    );
};

export default MyBookings;