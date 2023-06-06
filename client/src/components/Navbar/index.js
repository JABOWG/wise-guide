import React from "react";
import { Link } from "react-router-dom";
import Authservice from "../../utils/auth";

const Navbar = () => {
  return (
    <>
      {/* Render the navigation bar */}
      {Authservice.loggedIn() ? (
        <nav
          className="navbar is-dark"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            {/* Link to the home page */}
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
              <h1 className="title is-1" style={{ color: "white" }}>
                Wise Guide!
              </h1>

              <img
                src={`${process.env.PUBLIC_URL}/Project-logo.png`}
                alt="Logo"
                style={{
                  marginLeft: "8px",
                  marginBottom: "8px",
                  width: "50px",
                  height: "50px",
                }}
              />
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
              {/* Link to the user's profile page */}
              <a
                className="navbar-item is-size-4"
                href={process.env.REACT_APP_STRIPE_CHECKOUT_URL}
              >
                Buy Me a Coffee
              </a>
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
