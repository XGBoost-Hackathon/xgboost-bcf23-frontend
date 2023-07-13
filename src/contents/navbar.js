import React from 'react';
import './styles/navbar.css';

const Navbar = () => {
  return (
    <div className='navbar-component'>
    <nav className="navbar">
      <div className="navbar-brand">My Website</div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="/" className="nav-link">Home</a>
        </li>
        <li className="nav-item">
          <a href="/about" className="nav-link">About</a>
        </li>
        <li className="nav-item">
          <a href="/services" className="nav-link">Services</a>
        </li>
        <li className="nav-item">
          <a href="/contact" className="nav-link">Contact</a>
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default Navbar;
