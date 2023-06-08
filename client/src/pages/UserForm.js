import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_USER, LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const UserForm = () => {
  // State variables for the signup form and login form
  const [signupFormState, setSignupFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loginFormState, setLoginFormState] = useState({
    email: "",
    password: "",
  });

  // Mutation functions for adding a user and logging in
  const [addUser, { error : signupError, signupData }] = useMutation(ADD_USER);
  const [login, { error: loginError, loginData }] = useMutation(LOGIN_USER);

  // Event handler for signup form change
  const handleSignupChange = (event) => {
    const { name, value } = event.target;

    // Update the signup form state
    setSignupFormState({
      ...signupFormState,
      [name]: value,
    });
  };

  // Event handler for login form change
  const handleLoginChange = (event) => {
    const { name, value } = event.target;

    // Update the login form state
    setLoginFormState({
      ...loginFormState,
      [name]: value,
    });
  };

  // Event handler for signup form submission
  const handleSignupFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Perform the addUser mutation with the signup form state as variables
      const { data } = await addUser({
        variables: { ...signupFormState },
      });

      // Log in the user by storing the token in the Auth utility
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error("error:", e);
    }
  };

  // Event handler for login form submission
  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Perform the login mutation with the login form state as variables
      const { data } = await login({
        variables: { ...loginFormState },
      });

      // Log in the user by storing the token in the Auth utility
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-multiline is-tablet">
          <div className="column is-two-fifths card">
            <h2 className="is-size-3 is-size-4-mobile pb-4">
              Your AI Tutor for Homework and Assignments
            </h2>
            <p className="subtitle">
              Welcome to WiseGuide - Wise Guide is an AI-powered tutor that is designed to assist students with any difficulties they have with homework and assignments. Whether it's math, science, history, or any other subject, Wise Guide is here to help you improve your knowledge and grades.
            </p>
            <p className="subtitle">
              Our advanced AI algorithms analyze your questions and provide
              detailed explanations, step-by-step solutions, and additional
              resources to help you understand the concepts better. With Wise
              Guide, you'll never feel stuck or overwhelmed by your assignments
              again.
            </p>
            <ul>
              <ul>
                <i className="fas fa-check-circle"></i>
                Personalized Assistance: Wise Guide tailors its responses to your
                specific questions and learning needs.
              </ul>
              <ul>
                <i className="fas fa-check-circle"></i>
                Step-by-Step Solutions: Get detailed step-by-step solutions to
                complex problems.
              </ul>
              <ul>
                <i className="fas fa-check-circle"></i>
                Interactive Learning: Engage in interactive learning experiences
                that make studying enjoyable.
              </ul>
              <ul>
                <i className="fas fa-check-circle"></i>
                Progress Tracking: Monitor your progress and track your
                improvements over time.
              </ul>
            </ul>
          </div>
          <div className="column">
            <div className="card">
              <div className="card-content">
                {signupData ? (
                  <p>
                    Success! You may now head{" "}
                    <Link to="/">back to the homepage.</Link>
                  </p>
                ) : (
                  <div className="columns">
                    <div className="column">
                      <div className="card">
                        <header className="card-header has-background-dark has-text-light is-flex is-justify-content-center p-2">
                          <h4 className="title is-4 has-text-white">Sign Up</h4>
                        </header>
                        <div className="card-content">
                          <form onSubmit={handleSignupFormSubmit}>
                            <div className="field">
                              <label
                                htmlFor="signup-username"
                                className="label"
                              >
                                Your username
                              </label>
                              <div className="control">
                                <input
                                  className="input"
                                  id="signup-username"
                                  name="username"
                                  type="text"
                                  placeholder="Your username"
                                  value={signupFormState.username}
                                  onChange={handleSignupChange}
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label htmlFor="signup-email" className="label">
                                Your email
                              </label>
                              <div className="control">
                                <input
                                  className="input"
                                  id="signup-email"
                                  name="email"
                                  placeholder="Your email"
                                  type="email"
                                  value={signupFormState.email}
                                  onChange={handleSignupChange}
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label
                                htmlFor="signup-password"
                                className="label"
                              >
                                Password
                              </label>
                              <div className="control">
                                <input
                                  className="input"
                                  id="signup-password"
                                  name="password"
                                  placeholder="Your password"
                                  type="password"
                                  value={signupFormState.password}
                                  onChange={handleSignupChange}
                                />
                              </div>
                            </div>
                            <div className="field">
                              <div className="control">
                                <button
                                  className="button is-primary is-fullwidth"
                                  type="submit"
                                >
                                  Sign Up
                                </button>
                              </div>
                            </div>
                          </form>
                          {signupError && (
                            <div className="notification is-danger mt-3">
                              {signupError.message}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div className="card">
                        <header className="card-header has-background-dark has-text-light is-flex is-justify-content-center p-2">
                          <h4 className="title is-4 has-text-white">Login</h4>
                        </header>
                        <div className="card-content">
                          <form onSubmit={handleLoginFormSubmit}>
                            <div className="field">
                              <label htmlFor="login-email" className="label">
                                Your email
                              </label>
                              <div className="control">
                                <input
                                  className="input"
                                  id="login-email"
                                  name="email"
                                  type="email"
                                  value={loginFormState.email}
                                  onChange={handleLoginChange}
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label htmlFor="login-password" className="label">
                                Password
                              </label>
                              <div className="control">
                                <input
                                  className="input"
                                  id="login-password"
                                  name="password"
                                  type="password"
                                  value={loginFormState.password}
                                  onChange={handleLoginChange}
                                />
                              </div>
                            </div>
                            <div className="field">
                              <div className="control">
                                <button
                                  className="button is-primary is-fullwidth"
                                  type="submit"
                                >
                                  Log In
                                </button>
                              </div>
                            </div>
                          </form>
                          {loginError && (
                            <div className="notification is-danger mt-3">
                              {loginError.message}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserForm;
