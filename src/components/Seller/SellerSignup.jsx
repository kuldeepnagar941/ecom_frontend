import { useState } from "react";
 import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const SellerSignup = () => {
  const navigate = useNavigate();
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
  const [shopname, setShopName] = useState("");
  const [password, setPassword] = useState("");
  const [gst, setGst] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sellerData = { name ,email,phone,shopname, password, gst,role:"seller" };
    console.log("Seller Data:", sellerData);

    try {
      const response = await axios.post("http://localhost:4000/user/signup", sellerData);
      if (response.status === 201) {
        alert("Seller account created successfully!");
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="container mcontainer d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center">Seller Signup</h2>
        <form onSubmit={handleSubmit}>

        <div className="mb-3">
            <label className="form-label"> Name:</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address:</label>
            <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number:</label>
            <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Shop Name:</label>
            <input type="text" className="form-control" value={shopname} onChange={(e) => setShopName(e.target.value)} required />
          </div>

         

          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">GST Number:</label>
            <input type="text" className="form-control" value={gst} onChange={(e) => setGst(e.target.value)} required />
          </div>

          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          {/* <button className="btn btn-success"  onClick={() => (navigate("/"))}>Go to login</button> */}
          <p className="text-center mt-3">
            Already have an account? <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SellerSignup;
