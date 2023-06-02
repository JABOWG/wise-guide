import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setShowAlert(false);

    try {
      const { data } = await addUser({ variables: { ...userFormData } });

      if (data?.addUser) {
        const { token } = data.addUser;
        Auth.login(token);
      } else {
        throw new Error("createUser not returned by the mutation");
      }
    } catch (e) {
      console.error(e);
      setShowAlert(true);
    }

    setUserFormData({ username: "", email: "", password: "" });
  };

  return (
    <>
      <form noValidate onSubmit={handleFormSubmit}>
        {showAlert ? (
          <div className="notification is-danger">
            Something went wrong with your signup!
          </div>
        ) : null}

        <div className="field">
          <label className="label" htmlFor="username">
            Username
          </label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Your username"
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
              type="email"
              placeholder="Your email address"
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
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
          type="submit"
        >
          SignUp
        </button>
      </form>
    </>
  );
};

export default SignupForm;
