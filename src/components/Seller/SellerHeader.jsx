import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';

const SellerHeader = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('name');

  const handleLogout = () => {
    localStorage.clear();
    alert('You have been logged out successfully!');
    navigate('/login');
  };

  return (
    <header className="bg-dark text-white py-3 shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">

        {/* Brand */}
        <Link to="" className="text-white text-decoration-none fs-4 fw-bold">
          Kuldeep's Store (Seller Panel)
        </Link>

        {/* Action Buttons */}
        <div className="d-flex align-items-center gap-3">
          {isLoggedIn && (
            <Link to="" className="btn btn-sm btn-outline-light d-flex align-items-center gap-1">
              <FaUser /> Profile
            </Link>
          )}

          {isLoggedIn ? (
            <button onClick={handleLogout} className="btn btn-sm btn-outline-light d-flex align-items-center gap-1">
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-sm btn-outline-light d-flex align-items-center gap-1">
              <FaSignInAlt /> Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default SellerHeader;
