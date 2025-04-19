import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // optional, if you want to style separately
import { getAuth, signOut } from 'firebase/auth';

const Navbar = ({ onOpenPhoneFinder }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => navigate('/login'))
      .catch((error) => console.error('Logout failed:', error));
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/home">Mobilytics</Link>
      </div>
      <div className="navbar-links">
        <Link to="/news">News</Link>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;

