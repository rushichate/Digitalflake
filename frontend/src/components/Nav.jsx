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
    <nav id='nav'>
      <h1>digital<span>flake</span></h1>
      <button onClick={handleLogout}>LogOut</button>
    </nav>
  );
}

export default Nav;
