// components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-dark text-white p-3" style={{ minHeight: '100vh', width: '250px' }}>
      <h4 className="mb-4">Hi, User</h4>
      <div className="d-grid gap-2">
        <Link to="/showproduct" className="btn btn-outline-light text-start">Show Products</Link>
        <Link to="/cart" className="btn btn-outline-light text-start">Cart</Link>
        <Link to="/showwishlist" className="btn btn-outline-light text-start">Wishlist</Link>
        <Link to="/yourorderuser" className="btn btn-outline-light text-start">Your Orders</Link>
        <Link to="/addaddress" className="btn btn-outline-light text-start">Add Address</Link>
        <Link to="/showaddress" className="btn btn-outline-light text-start">Show Address</Link>
        <Link to="/login" className="btn btn-outline-light text-start">Go to Login</Link>
      </div>
    </div>
  );
};

export default Sidebar;
