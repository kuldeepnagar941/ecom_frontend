import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaSearch } from 'react-icons/fa';

const Header = ({ cartCount = 0 }) => {
  const navigate = useNavigate();


  const isLoggedIn = !!localStorage.getItem('name');

  const handleLogout = () => {
    localStorage.clear();
    alert('You have been logged out successfully!');
    navigate('/login');
  };

  const handleCartClick = () => {
    if (isLoggedIn) {
      navigate('/cart');
    } else {
      alert('Please login to view your cart.');
      navigate('/login');
    }
  };

  return (
    <header className="bg-dark text-white py-3 shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
       
        <Link to="" className="text-white text-decoration-none fs-4 fw-bold">
          Kuldeep's Store
        </Link>

   
        <form className="d-none d-md-flex align-items-center">
          <input
            type="text"
            placeholder="Search products..."
            className="form-control form-control-sm me-2"
          />
          <button className="btn btn-outline-light btn-sm" type="submit">
            <FaSearch />
          </button>
        </form>

   
        <div className="d-flex align-items-center gap-3">
       
          <button
            onClick={handleCartClick}
            className="btn text-white position-relative text-decoration-none"
            style={{ background: 'none', border: 'none' }}
          >
            <FaShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </button>

          
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

export default Header;
