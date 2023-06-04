import React from "react";
import { Link } from "react-router-dom";
import Authservice from "../../utils/auth"

const Navbar = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          Home
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
          <Link to="/sessions" className="navbar-item">
            My Sessions
          </Link>
          <Link to="/me" className="navbar-item">
            My Profile
          </Link>
          <Link to="/userform" className="navbar-item">
            Signup/Login
          </Link>
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
