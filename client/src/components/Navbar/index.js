import React from "react";
import { Link } from "react-router-dom";
import Authservice from "../../utils/auth";

const Navbar = () => {
  return (
    // Render the navigation bar
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        {/* Link to the home page */}
        <Link to="/" className="navbar-item">
          Home
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
          {/* Link to the sessions page */}
          <Link to="/sessions" className="navbar-item">
            My Sessions
          </Link>
          {/* Link to the user's profile page */}
          <Link to="/me" className="navbar-item">
            My Profile
          </Link>
          {/* Link to the user login/signup form */}
          <Link to="/userform" className="navbar-item">
            Signup/Login
          </Link>
          {/* Logout button */}
          <button
            className="btn btn-lg btn-light m-2"
            onClick={Authservice.logout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
