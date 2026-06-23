import React, { useState } from "react";
import registerimg from "../assets/registerimg.png";
import { FcGoogle } from "react-icons/fc";
import { CiUser } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firabase";
import { useNavigate } from "react-router-dom";

const Register = () => {

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const navigate = useNavigate()

const handleRegister = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log("User Registered:", userCredential.user);
    alert("Registration Successful");
    navigate('/login')

  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div className="container-fluid p-0">
      <div className="row g-0" style={{ height: "calc(100vh - 70px)" }}>
        <div className="col-lg-5 position-relative">
          <img src={registerimg} alt="Register" className="w-100 h-100" style={{ objectFit: "cover" }} />
          <div className="position-absolute top-50 start-0 translate-middle-y text-white p-5">
            <h1 className="fw-bold display-4">Create Your <br /> Travel Account</h1>
            <p className="fs-4 mt-4">Join TravelMate and explore amazing places around the world with exclusive deals.</p>
          </div>
        </div>

        <div className="col-lg-7 d-flex justify-content-center align-items-center bg-light">
          <div className="card shadow p-5" style={{ width: "700px" }}>
            <h1 className="text-center fw-bold">Create an Account</h1>
            <p className="text-center text-muted mb-4">Sign up to get started</p>
            <div className="position-relative mb-3">
              <CiUser
                className="position-absolute"
                style={{
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "22px",
                }}
              />
              <input type="text" className="form-control ps-5" placeholder="Enter your full name" />
            </div>

            <div className="position-relative mb-3">
              <MdOutlineEmail className="position-absolute" style={{ left: "15px", top: "50%", transform: "translateY(-50%)", fontSize: "22px", color: "gray", }} />
              <input type="email" className="form-control ps-5" placeholder="Enter your email address" onChange={(e)=>setEmail(e.target.value)}/>
            </div>

            <div className="position-relative mb-3">
              <RiLockPasswordLine
                className="position-absolute"
                style={{
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "22px",
                  color: "gray",
                }}
              />
              <input
                type="password"
                className="form-control ps-5"
                placeholder="Enter your password"
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>

            <div className="position-relative mb-3">
              <RiLockPasswordLine
                className="position-absolute"
                style={{
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "22px",
                  color: "gray",
                }}
              />
              <input
                type="password"
                className="form-control ps-5"
                placeholder="Confirm your password"
                onChange={(e)=>setConfirmPassword(e.target.value)}
              />
            </div>

            <button className="btn btn-success w-100 mb-2" onClick={handleRegister}>
              Register
            </button>

            <div className="text-center my-3">
              <span>OR</span>
            </div>

            <button className="btn  border w-100">
              <FcGoogle className="text-center" /> Sign up with Google
            </button>

            <p className="text-center mt-4">
              Already have an account?
              <a href="/login" className="ms-2 text-success">
                Login here
              </a>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;