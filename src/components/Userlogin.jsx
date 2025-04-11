import { useState } from "react";
 import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
 const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { email, password };
    console.log("Login Data:", loginData);

    try {
      const response = await axios.post("http://localhost:4000/user/login", loginData);
      console.log(response)
      const role = response.data.User.role;
      const token =response.data.token
      const userid = response.data.User._id
      console.log(response.data.User._id)
      localStorage.setItem("token",token);
      localStorage.setItem("role", role);
      localStorage.setItem("userid",userid)

      

      if (response.status === 200 && role ==="seller") {
        alert("Login successful!");
        navigate("/sellershowproduct")
          

      }else{
        navigate("/showproduct")
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid email or password!");
    }
  };

  return (
    <div className="container mt-5container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
          
          
           <p className="text-center mt-3">If you not an account? <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => navigate("/signup")}>Signup</span></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
