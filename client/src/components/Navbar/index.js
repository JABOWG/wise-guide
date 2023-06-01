import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import SignUpForm from '../SignupForm';
import LoginForm from '../LoginForm';

import Auth from '../../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Wise Guide!
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar"
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbar">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Ask a question about your homework!
                </Link>
              </li>
              {Auth.loggedIn() ? (
                <>
                  <li className="nav-item">
                    <Link to="/saved" className="nav-link">
                      See Your Questions
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link" onClick={Auth.logout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button className="nav-link" onClick={() => setShowModal(true)}>
                    Login/Sign Up
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {/* set modal data up */}
      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <ul className="nav nav-pills">
                  <li className="nav-item">
                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#login-tab">
                      Login
                    </button>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#signup-tab">
                      Sign Up
                    </button>
                  </li>
                </ul>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="login-tab">
                    <LoginForm handleModalClose={() => setShowModal(false)} />
                  </div>
                  <div className="tab-pane fade" id="signup-tab">
                    <SignUpForm handleModalClose={() => setShowModal(false)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppNavbar;
