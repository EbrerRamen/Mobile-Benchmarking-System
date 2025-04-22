import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; 
import { getAuth, signOut } from 'firebase/auth';

const Navbar = ({ onOpenPhoneFinder }) => {
  const navigate = useNavigate();
  const [count] = useState(0)

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
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/notifications">Notifications {count > 0 && <span className="badge">{count}</span>}</Link>
        <Link to="/benchmark">Benchmark</Link>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;

