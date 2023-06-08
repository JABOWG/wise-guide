import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          WiseGuide
        </Link>

        <button
          className={`navbar-burger burger ${isMenuOpen ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded={isMenuOpen ? "true" : "false"}
          onClick={handleMenuToggle}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div
        className={`navbar-menu ${
          isMenuOpen ? "is-active" : ""
        } custom-navbar-menu`}
        onClick={handleMenuToggle}
      >
        <div className="navbar-end">
          <Link to="/" className="navbar-item">
            Home
          </Link>
          <Link to="/me" className="navbar-item">
            Profile
          </Link>
          <Link to="/sessions" className="navbar-item">
            Sessions
          </Link>
          <Link to="/userform" className="navbar-item">
            Log Out
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
