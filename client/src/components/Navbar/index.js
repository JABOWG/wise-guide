import React from "react";
import { Link } from "react-router-dom";
import Authservice from "../../utils/auth";

const Navbar = () => {
  return (
    <>
      {/* Render the navigation bar */}
      {Authservice.loggedIn() ? (
        <nav
          className="navbar"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            {/* Link to the home page */}
            <Link to="/" className="navbar-item is-size-4">
              Wise Guide
            </Link>
          </div>
          <div className="navbar-menu">
            <div className="navbar-end">
              {/* Link to the sessions page */}
              <Link to="/sessions" className="navbar-item is-size-4">
                My Sessions
              </Link>
              {/* Link to the user's profile page */}
              <Link to="/me" className="navbar-item is-size-4">
                My Profile
              </Link>
              {/* Logout button */}
              <Link
                className="navbar-item is-size-4"
                onClick={Authservice.logout}
              >
                Logout
              </Link>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            {/* Link to the home page */}
            <div className="navbar-item is-size-4">WiseGuide</div>
          </div>
        </nav>
      )}
    </>
  );
};
export default Navbar;
