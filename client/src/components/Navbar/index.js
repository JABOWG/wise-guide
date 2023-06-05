import React, { useState } from "react";
import { Link } from "react-router-dom";

//import SignUpForm from "../SignupForm";
import LoginForm from "../LoginForm";

import Auth from "../../utils/auth";

import "bulma/css/bulma.css";

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <nav
        className="navbar"
        role="navigation"
        aria-label="main navigation"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/Nav-background.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        <div className="navbar-brand">
          <Link className="navbar-item title is-1" to="/">
            Wise Guide!👼
          </Link>

          <nav
            role="button"
            className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            style={{ marginTop: "20px" }}
            onClick={() => {
              setIsActive(!isActive);
            }}
          >
            <span
              aria-hidden="true"
              style={{ height: "3px", width: "24px" }}
            ></span>
            <span
              aria-hidden="true"
              style={{ height: "3px", width: "24px" }}
            ></span>
            <span
              aria-hidden="true"
              style={{ height: "3px", width: "24px" }}
            ></span>
          </nav>
        </div>

        <div
          id="navbarBasicExample"
          className={`navbar-menu custom-background ${
            isActive ? "is-active" : ""
          }`}
        >
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link className="button is-link" to="/search">
                  Ask a question about your homework!
                </Link>

                {Auth.loggedIn() ? (
                  <>
                    <Link className="button is-success" to="/saved">
                      See Your Questions
                    </Link>
                    <a
                      className="button is-info"
                      href={process.env.REACT_APP_STRIPE_CHECKOUT_URL}
                    >
                      Buy Me a Coffee
                    </a>

                    <button className="button is-danger" onClick={Auth.logout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    className="button is-success"
                    onClick={() => setShowModal(true)}
                  >
                    Login/Sign Up
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {showModal && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Account</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => setShowModal(false)}
              ></button>
            </header>
            <section className="modal-card-body">
              <h3 class="notification is-warning">
                Login to Save your Questions / Create a New Account
              </h3>
              <LoginForm handleModalClose={() => setShowModal(false)} />
              {/* <br />
              <h3 class="notification is-warning">Create your Account:</h3>
              <SignUpForm handleModalClose={() => setShowModal(false)} /> */}
            </section>
            <footer className="modal-card-foot">
              <button className="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default AppNavbar;
