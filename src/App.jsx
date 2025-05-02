import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/user/Header";
import Sidebar from "./components/user/Sidebar";
import Signup from "./components/user/Usersignup";
import Userlogin from "./components/user/Userlogin"
import Showproducts from "./components/user/Showproduct"
import Cart from "./components/user/cart";
import Wishlist from "./components/user/Showwishlist";
import Createaddress from './components/user/createAddress'
import Showaddress from './components/user/showAddress'
import YourOrderuser from "./components/user/yourOrderuser";


import SellerHeader from "./components/Seller/SellerHeader";
import SellerSidebar from "./components/Seller/SellerSidebar";
import SellerSignup from "./components/Seller/SellerSignup";
import Addproduct from "./components/Seller/Addproduct"
import SellerShowproducts from "./components/Seller/SellerShowproducts"
import SellerYourorder from "./components/Seller/SellerYourorder";
import ProductQunatity from "./components/Seller/ProductQunatity";


import Deshboard from './components/Admin/Deshboard'
import GetAllUser from "./components/Admin/GetAllUser";
import GetAllSeller from "./components/Admin/GetAllSeller";




function App() {
  
const role = localStorage.getItem("role")

  return (
    <Router>
      <Routes>
        
        <Route path="/header" element={<Header />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/sellerheader" element={<SellerHeader />} />
        <Route path="/sellersidebar" element={<SellerSidebar />} />
        <Route path="/login" element={<Userlogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sellersignup" element={<SellerSignup />} />
        <Route path="/addproduct" element={<Addproduct />} />
        <Route path="/" element={<Showproducts />} />
        {/* <Route path="/sellershowproduct" element={<SellerShowproducts />} /> */}
        <Route path="/sellershowproduct" element={role === "seller" ? <SellerShowproducts /> : <Navigate to="/" />} />
        <Route path="/cart" element={<Cart />} />
        <Route path ="/showwishlist" element={<Wishlist/>} />
        <Route path ="/addaddress" element={<Createaddress/>} />
        <Route path ="/showaddress" element={ <Showaddress/> } />
        <Route path='/yourorderuser' element={<YourOrderuser/>} />
        <Route path='/yourorderseller' element={<SellerYourorder/>} />
        <Route path='/productQunatity' element={<ProductQunatity/>} />


        <Route path='/deshboard' element={<Deshboard/>} />
        <Route path="/getalluseradmin" element={<GetAllUser/>} />
        <Route path="/getallselleradmin" element={<GetAllSeller/>} />


        
      </Routes>
    </Router>
  );
}

export default App;
