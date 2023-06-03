import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { LOGIN_USER, ADD_USER } from "../../utils/mutations";

// LoginForm component
const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ username: "", email: "", password: "" });
  const [showAlert, setShowAlert] = useState(false);
  const [activeTab, setActiveTab] = useState("signup", "login"); // Track the active tab

  const [login, { error: loginError }] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      const { token } = data.login;
      Auth.login(token);
    },
  });

  const [addUser, { error: signupError }] = useMutation(ADD_USER, {
    onCompleted(data) {
      const { token } = data.addUser;
      Auth.login(token);
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (activeTab === "login") {
      try {
        const { data } = await login({ variables: { ...userFormData } });

        if (!loginError) {
          setUserFormData({ email: "", password: "" });
        }
      } catch (e) {
        console.error(e);
        setShowAlert(true);
      }
    } else if (activeTab === "signup") {
      try {
        const { data } = await addUser({ variables: { ...userFormData } });

        if (!signupError) {
          setUserFormData({ email: "", password: "" });
        }
      } catch (e) {
        console.error(e);
        setShowAlert(true);
      }
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="tabs">
        <ul>
          <li
            className={activeTab === "login" ? "is-active" : ""}
            onClick={() => handleTabChange("login")}
          >
            <a>Login</a>
          </li>
          <li
            className={activeTab === "signup" ? "is-active" : ""}
            onClick={() => handleTabChange("signup")}
          >
            <a>Sign Up</a>
          </li>
        </ul>
      </div>

      <form onSubmit={handleFormSubmit}>
        {showAlert || loginError || signupError ? (
          <div className="notification is-danger">
            Something went wrong with your {activeTab === "login" ? "login" : "sign up"} credentials!
          </div>
        ) : null}
        {activeTab === "login" && (
          <div>
            <div className="field">
              <label className="label" htmlFor="email">
                Email
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Your email"
                  name="email"
                  onChange={handleInputChange}
                  value={userFormData.email}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="password">
                Password
              </label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Your password"
                  name="password"
                  onChange={handleInputChange}
                  value={userFormData.password}
                  required
                />
              </div>
            </div>
          </div>
          
        )}

        {activeTab === "signup" && (
          <div>
            <div className="field">
              <label className="label" htmlFor="username">
                Username
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Your Username"
                  name="username"
                  onChange={handleInputChange}
                  value={userFormData.username}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="email">
                Email
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Your email"
                  name="email"
                  onChange={handleInputChange}
                  value={userFormData.email}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label" htmlFor="password">
                Password
              </label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Your password"
                  name="password"
                  onChange={handleInputChange}
                  value={userFormData.password}
                  required
                />
              </div>
            </div>
          </div>
        )}

        <button
          className="button is-success"
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
        >
          {activeTab === "login" ? "Login" : "Sign Up"}
        </button>
      </form>
    </>
  );
};

export default LoginForm;