import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <h1>ALUMNISPHERE</h1>
      <button className="menu-toggle" onClick={toggleMenu}>
        {isOpen ? '✖' : '≡'}
      </button>
      <nav className={isOpen ? 'open' : ''}>
        <ul>
          <li>HOME</li>
          <li>CONNECT</li>
          <li>CONTACT</li>
          <li className="login">LOGIN/SIGNUP</li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;