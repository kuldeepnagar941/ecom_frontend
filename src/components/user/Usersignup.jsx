import React, { useState } from "react";
import axios from "axios";
 import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Data = { name, email, phone, password };
    console.log("data",Data)

    const response = await axios.post("http://localhost:4000/user/signup", Data);
      console.log("Response: ", response);
      if(response.status === 201){
        alert("data Saved Succesfully")
        navigate("/")
      }
    
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input type="tel" className="form-control" placeholder="Enter phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          
          <p className="text-center mt-3">
            Already have an account? <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Login</span>
          </p>
          <p className="text-center mt-3">
            if you create Seller Account? <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => navigate("/sellersignup")}>signup</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
