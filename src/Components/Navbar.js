import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">CodePractice</Link>
      </div>
      <div className="navbar-links">
        <Link to="/dashboard" className="navbar-link">Dashboard</Link>
        <Link to="/add-problem" className="navbar-link">Add Problem</Link>
      </div>
    </nav>
  );
};

export default Navbar;
