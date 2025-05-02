import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaBars, FaBox, FaShoppingCart, FaHeart, FaClipboardList, FaMapMarkerAlt, FaSignInAlt } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('name') || 'User';
    setUserName(storedName);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="d-flex">
      <div
        className="bg-dark text-white p-2 d-flex flex-column align-items-start"
        style={{
          width: isOpen ? '250px' : '60px',
          minHeight: '80vh',
          transition: 'width 0.3s'
        }}
      >
        <button
          className="btn btn-sm btn-outline-light mb-3 align-self-center"
          onClick={toggleSidebar}
          style={{ border: 'none', background: 'none' }}
        >
          <FaBars size={24} />
        </button>

        {isOpen && (
          <div className="text-center mb-4 w-100">
            <FaUserCircle size={40} className="mb-2" />
            <h5 className="mt-2">Hi, {userName}</h5>
          </div>
        )}

        <nav className="d-grid gap-2 w-100">
          <Link to="/" className="text-white text-decoration-none py-2 px-3 rounded d-flex align-items-center gap-2 hover-bg-secondary">
            <FaBox />
            {isOpen && 'Show Products'}
          </Link>

          <Link to="/cart" className="text-white text-decoration-none py-2 px-3 rounded d-flex align-items-center gap-2 hover-bg-secondary">
            <FaShoppingCart />
            {isOpen && 'Cart'}
          </Link>

          <Link to="/showwishlist" className="text-white text-decoration-none py-2 px-3 rounded d-flex align-items-center gap-2 hover-bg-secondary">
            <FaHeart />
            {isOpen && 'Wishlist'}
          </Link>

          <Link to="/yourorderuser" className="text-white text-decoration-none py-2 px-3 rounded d-flex align-items-center gap-2 hover-bg-secondary">
            <FaClipboardList />
            {isOpen && 'Your Orders'}
          </Link>

          <Link to="/showaddress" className="text-white text-decoration-none py-2 px-3 rounded d-flex align-items-center gap-2 hover-bg-secondary">
            <FaMapMarkerAlt />
            {isOpen && 'Show Address'}
          </Link>

          <Link to="/login" className="text-white text-decoration-none py-2 px-3 rounded d-flex align-items-center gap-2 hover-bg-secondary">
            <FaSignInAlt />
            {isOpen && 'Go to Login'}
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
