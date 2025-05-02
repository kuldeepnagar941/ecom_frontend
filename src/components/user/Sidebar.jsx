
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaBars } from 'react-icons/fa';


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('name') || 'User';
    setUserName(storedName);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  

  return (
    <>
      
      <div className="d-flex">
        <div
          className="bg-dark text-white p-2 d-flex flex-column align-items-center"
          style={{ width: isOpen ? '250px' : '60px', minHeight: '100vh', transition: 'width 0.3s' }}
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
                <FaUserCircle size={40} />
                <h5 className="mt-2">Hi, {userName}</h5>
              </div>

              <nav className="d-grid gap-2">
                <Link to="/" className="text-white text-decoration-none py-2 px-3 rounded hover-bg-secondary">Show Products</Link>
                <Link to="/cart" className="text-white text-decoration-none py-2 px-3 rounded hover-bg-secondary">Cart</Link>
                <Link to="/showwishlist" className="text-white text-decoration-none py-2 px-3 rounded hover-bg-secondary">Wishlist</Link>
                <Link to="/yourorderuser" className="text-white text-decoration-none py-2 px-3 rounded hover-bg-secondary">Your Orders</Link>
                {/* <Link to="/addaddress" className="text-white text-decoration-none py-2 px-3 rounded hover-bg-secondary">Add Address</Link> */}
                <Link to="/showaddress" className="text-white text-decoration-none py-2 px-3 rounded hover-bg-secondary">Show Address</Link>
                <Link to="/login" className="text-white text-decoration-none py-2 px-3 rounded hover-bg-secondary">Go to Login</Link>
              </nav>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
