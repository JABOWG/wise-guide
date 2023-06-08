import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_RECENT_SESSIONS } from "../utils/queries";
import { CREATE_SESSION, REMOVE_SESSION } from "../utils/mutations";
import SessionList from "../components/SessionList";
import AuthService from "../utils/auth";
import "../assets/css/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const limit = 5; // number of recent sessions we want to display on the home page

  // useQuery hook to fetch all sessions
  const { loading, data, refetch } = useQuery(GET_RECENT_SESSIONS, {
    variables: { limit: limit },
  });
  const sessions = data?.recentSessions || [];

  // useMutation hook to create a new session
  const [createSession, { loading: sessionLoading, error: sessionError }] =
    useMutation(CREATE_SESSION);

  // useMutation hook to delete a session
  const [removeSession, { loading: deleteLoading, error: deleteError }] =
    useMutation(REMOVE_SESSION);

  // Call the refetch function whenever the sessions array changes
  useEffect(() => {
    refetch();
  }, [sessions]);

  // Handle the creation of a new session
  const handleCreateSession = async (event) => {
    event.preventDefault();

    try {
      // Create the session
      const { data } = await createSession();

      // Redirect the user to the session page
      navigate(`/session/${data.createSession._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle the deletion of a new session
  const handleDeleteSession = async (sessionId) => {
    try {
      // Delete the session
      await removeSession({ variables: { sessionId } });

      // Refetch the recent sessions after the deletion of a new session
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  // Check if the user is logged in
  if (!AuthService.loggedIn()) {
    navigate("/userform"); // Redirect to login page
    return null; // Render nothing else
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered is-multiline is-variable is-8">
          <div className="column is-12-mobile is-8-tablet is-6-desktop">
            <h1 className="title is-1 is-spaced has-text-black has-text-weight-bold">
              Welcome to the Home Page
            </h1>
            <p className="subtitle is-5 has-text-black">
              Start by creating a new session or browse your recent sessions.
            </p>
            <div className="buttons">
              <button
                className="button is-primary is-large"
                onClick={handleCreateSession}
              >
                Create Session
              </button>
            </div>
          </div>
          <div className="column is-12-mobile is-8-tablet is-6-desktop">
            <h2 className="title is-3 has-text-black">Recent Sessions</h2>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <SessionList
                sessions={sessions}
                handleDeleteSession={handleDeleteSession}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
