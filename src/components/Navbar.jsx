import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; 
import ProfileModal from './ProfileModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fullName, setFullName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [isHovering, setIsHovering] = useState(false);


  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    // Check if access_token exists in localStorage
    const token = window.localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);

      // Fetch full name and profile picture from localStorage
      const storedFullName = window.localStorage.getItem('full_name');
      const storedProfilePicture = window.localStorage.getItem('profile_picture');

      // Set them in state to display
      setFullName(storedFullName);
      setProfilePicture(`${import.meta.env.VITE_BASE_URL}${storedProfilePicture}`);
    }

  }, []);


  const handleLogout = async () => {
    try {
      // Send a POST request to the logout endpoint
      await axios.post(`${import.meta.env.VITE_BASE_URL}/logout/`); // Adjust to your API's logout endpoint
      
      // Remove local storage items
      localStorage.removeItem('access_token');
      localStorage.removeItem('full_name');
      localStorage.removeItem('profile_picture');
      localStorage.removeItem('user_id');
      localStorage.removeItem('is_patient');
      // Update authentication state
      setIsAuthenticated(false);

      // Alert the user and redirect to login page
      alert('Logged out successfully');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <nav className="flex items-center relative bg-mycolor text-white sm:p-2 md:p-4">
      <Link to="/" className="flex items-center no-underline text-white">
        <img src='/icon2.png' className='w-12 h-12 mr-2 ml-4' alt="Medi Logo" />
        <div className="text-lg md:text-xl font-bold">Medi</div>


        
        
      </Link>


      {/* Desktop Links */}
      <div className="hidden md:flex ml-auto space-x-4">

      {isAuthenticated && (
        <Link to="/appointments">
          <button className="bg-gray-100 text-textcolor px-4 py-2 rounded hover:bg-buttoncolor transition-transform transform hover:scale-95">
            Appointments
          </button>
        </Link>
      )}


        <Link to="/blogs">
          <button className="bg-gray-100 text-textcolor px-4 py-2 rounded hover:bg-buttoncolor transition-transform transform hover:scale-95">
            Blogs
          </button>
        </Link>

        <Link to="/doctors">
              <button className="bg-gray-100 text-textcolor px-4 py-2 rounded hover:bg-buttoncolor transition-transform transform hover:scale-95">
                Doctors
              </button>
            </Link>

      </div>

      {isAuthenticated ? (
          <>
          <div className="text-center px-3">
            <span className="text-sm md:text-md font-medium block">Welcome, {fullName}!</span>
            <div className="flex items-center justify-center">
            
              <button
                className="text-white text-base underline w-full block text-center transition-transform transform hover:scale-95 inline-flex items-center cursor-pointer"
                onClick={handleLogout}>
                <FontAwesomeIcon icon={faPowerOff} className="text-white mr-2" style={{ fontSize: '1rem' }} />
                Logout
              </button>
            </div>
          </div>
          <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <img
              src={profilePicture}
              alt={fullName}
              className={`w-12 h-12 rounded-full object-cover cursor-pointer mr-4 profileimg`}
            />
          <ProfileModal isHovering={isHovering} className='z-50'/>
          
          </div>
        </>

        ) : (
          <>
          <div className="text-center px-3 mr-2">
          <span className="text-sm md:text-md font-medium block">Welcome!</span>

          <div className="flex items-center justify-center space-x-2">
            <Link
              to="/login"
              className="text-white text-base underline w-full block text-center transition-transform transform hover:scale-95"
            >
              
              LogIn
            </Link>
             <span>|</span>
            <Link
              to="/register"
              className="text-white text-base underline w-full block text-center transition-transform transform hover:scale-95"
            >
              SignUp
            </Link>
          </div>

        </div>
          </>
        )}

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden ml-auto focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-1/3 bg-mycolor shadow-lg transform transition-transform duration-300 z-20 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-4 p-2">
        <img src="/icon2.png" className="w-8 h-8" alt="Medi Logo" />
        <img src="/arrow.svg" className="w-8 h-8 icon-filter-white" alt="Icon" 
        onClick={() => setIsOpen(false)}/>
      </div>
        {/* Links with underline and divider */}
        <a
          href="/login"
          className="text-white underline py-2 mb-2 w-full block p-2"
          onClick={() => setIsOpen(false)}
        >
          Login
        </a>
        <hr className="border-t border-white my-2" />
        <a
          href="#signup"
          className="text-white underline py-2 mb-2 w-full block p-2"
          onClick={() => setIsOpen(false)}
        >
          Sign Up
        </a>
        <hr className="border-t border-white my-2" />
        <a
          href="#blogs"
          className="text-white underline py-2 w-full block p-2"
          onClick={() => setIsOpen(false)}
        >
          Blogs
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
