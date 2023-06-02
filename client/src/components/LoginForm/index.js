import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { LOGIN_USER } from "../../utils/mutations";

// LoginForm component
const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [showAlert, setShowAlert] = useState(false);

  const [login, { error }] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      const { token } = data.login;
      Auth.login(token);
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({ variables: { ...userFormData } });

      if (!error) {
        setUserFormData({ email: "", password: "" });
      }
    } catch (e) {
      console.error(e);
      setShowAlert(true);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        {showAlert || error ? (
          <div className="notification is-danger">
            Something went wrong with your login credentials!
          </div>
        ) : null}
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
        <button
          className="button is-success"
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
