
import React from 'react';
import { Link } from 'react-router-dom';

const SellerSidebar = () => {
  return (
    <div className="bg-dark text-white p-3" style={{ minHeight: '100vh', width: '250px' }}>
      <h4 className="mb-4">Hi, Seller</h4>
      <div className="d-grid gap-2">
        <Link to="/sellershowproduct" className="btn btn-outline-light text-start">Show Products</Link>
        <Link to="/addproduct" className="btn btn-outline-light text-start">Add Product</Link>
        <Link to="/productQunatity" className="btn btn-outline-light text-start">Add Product Quantity</Link>
        <Link to="/yourorderseller" className="btn btn-outline-light text-start">Your Orders</Link>
        <Link to="/login" className="btn btn-outline-light text-start">Go to Login</Link>
      </div>
    </div>
  );
};

export default SellerSidebar;
