import React from "react";
import { Navigate } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";

import AuthService from "../utils/auth";

const Profile = () => {
  // Query the logged-in user's data
  const { loading, data } = useQuery(GET_ME);

  // Extract the user data from the response
  const me = data?.me || {};

  // Check if the user is not logged in
  if (!AuthService.loggedIn()) {
    Navigate("/userform"); // Redirect to login page
    return null; // Render nothing else
  }

  // If data is still loading, display a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the user profile information and list of their sessions
  return (
    <div className="container">
      <div className="section">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="box">
              <h1 className="title">User Profile</h1>
              <div className="content">
                <p>
                  <strong>Username:</strong> {me.username}
                </p>
                <p>
                  <strong>Email:</strong> {me.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
