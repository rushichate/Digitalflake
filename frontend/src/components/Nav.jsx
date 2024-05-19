import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Nav.css";

const Nav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <h1 className="logo">
        digital<span>flake</span>
      </h1>
      <button onClick={handleLogout} className="logout-button">
        LogOut
      </button>
    </nav>
  );
}

export default Nav;
