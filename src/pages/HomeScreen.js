import React from 'react';
import '../styles/HomeScreen.css';
import Navbar from '../Components/Navbar';

function HomeScreen() {
  return (
    <div className="home-container">
      {/* <header className="navbar">
        <a href="/dashboard">Dashboard</a>
        <a href="/add-problem">Add Problem</a>
        <a href="/profile">Profile</a>
      </header> */}

      <Navbar />

      <div className="hero">
        <h1>Welcome to Coding Practice</h1>
        <p>Practice coding problems to improve your skills!</p>
        <button className="cta-button">Start Learning</button>
      </div>

      <footer className="footer">
        <p>&copy; 2024 Coding Practice | All rights reserved</p>
      </footer>
    </div>
  );
}

export default HomeScreen;
