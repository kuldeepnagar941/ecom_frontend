import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Usersignup";
import SellerSignup from "./components/SellerSignup";
import Userlogin from "./components/Userlogin"
import Addproduct from "./components/Addproduct"
import Showproducts from "./components/Showproduct"
import SellerShowproducts from "./components/SellerShowproducts"
import Cart from "./components/cart";
import Wishlist from "./components/Showwishlist";
import Createaddress from './components/createAddress'
import Showaddress from './components/showAddress'
import YourOrderuser from "./components/yourOrderuser";
import SellerYourorder from "./components/SellerYourorder";



function App() {
  
const role = localStorage.getItem("role")

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Userlogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sellersignup" element={<SellerSignup />} />
        <Route path="/addproduct" element={<Addproduct />} />
        <Route path="/showproduct" element={<Showproducts />} />
        {/* <Route path="/sellershowproduct" element={<SellerShowproducts />} /> */}
        <Route path="/sellershowproduct" element={role === "seller" ? <SellerShowproducts /> : <Navigate to="/showproduct" />} />
        <Route path="/cart" element={<Cart />} />
        <Route path ="/showwishlist" element={<Wishlist/>} />
        <Route path ="/addaddress" element={<Createaddress/>} />
        <Route path ="/showaddress" element={ <Showaddress/> } />
        <Route path='/yourorderuser' element={<YourOrderuser/>} />
        <Route path='/yourorderseller' element={<SellerYourorder/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
