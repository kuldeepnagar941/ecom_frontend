import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserTie, FaBars } from 'react-icons/fa';

const SellerSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sellerName, setSellerName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('name') || 'Seller';
    setSellerName(storedName);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="d-flex">
      <div
        className="bg-dark text-white p-2 d-flex flex-column align-items-center"
        style={{
          width: isOpen ? '250px' : '60px',
          minHeight: '100vh',
          transition: 'width 0.3s'
        }}
      >
        <button
          className="btn btn-sm btn-outline-light mb-3"
          onClick={toggleSidebar}
          style={{ border: 'none', background: 'none' }}
        >
          <FaBars size={24} />
        </button>

        {isOpen && (
          <>
            <div className="text-center mb-4">
              <FaUserTie size={40} />
              <h5 className="mt-2">Hi, {sellerName}</h5>
            </div>

            <nav className="d-grid gap-2">
              <Link to="/sellershowproduct" className="text-white text-decoration-none py-2 px-3 rounded hover-bg-secondary">Show Products</Link>
              <Link to="/addproduct" className="text-white text-decoration-none py-2 px-3 rounded hover-bg-secondary">Add Product</Link>
              <Link to="/productQunatity" className="text-white text-decoration-none py-2 px-3 rounded hover-bg-secondary">Add Product Quantity</Link>
              <Link to="/yourorderseller" className="text-white text-decoration-none py-2 px-3 rounded hover-bg-secondary">Your Orders</Link>
              <Link to="/login" className="text-white text-decoration-none py-2 px-3 rounded hover-bg-secondary">Go to Login</Link>
            </nav>
          </>
        )}
      </div>
    </div>
  );
};

export default SellerSidebar;
