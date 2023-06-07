import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_SESSIONS } from "../utils/queries";
import { REMOVE_SESSION } from "../utils/mutations";

import AuthService from "../utils/auth";

import "../assets/css/Sessions.css"

const Sessions = () => {
  const navigate = useNavigate();
  const { loading, data, refetch } = useQuery(GET_ALL_SESSIONS);
  const sessions = data?.allSessions || [];

  // useMutation hook to delete a session
  const [removeSession, { loading: deleteLoading, error: deleteError }] =
    useMutation(REMOVE_SESSION);

  // Call the refetch function whenever the sessions array changes
  useEffect(() => {
    refetch();
  }, [sessions]);

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

  // Check if the user has no sessions
  if (!sessions.length) {
    return (
      <h3>Looks like you don't have any sessions yet. Let's get you started</h3>
    );
  }

  // Render the list of sessions
  return (
    <>
      <br></br>
      <h1 className="is-size-1 has-text-black has-text-weight-bold mb-5 is-outlined">
        Here is a list of all your sessions
      </h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="columns is-multiline">
          {sessions.map((session) => (
            <div className="column is-one-third" key={session._id}>
              <div className="card">
                <Link to={`/session/${session._id}`}>
                  <div className="card-content session-content">
                    {/* Check if the session has a message */}
                    {session.messages[0] ? (
                      <p className="is-size-5 has-text-weight-bold">
                        {/* Display the user question, truncating it if necessary */}
                        {session.messages[0].userQuestion.length > 45
                          ? session.messages[0].userQuestion.slice(0, 45) +
                            "..."
                          : session.messages[0].userQuestion}
                      </p>
                    ) : (
                      <p className="is-size-5 has-text-weight-bold">
                        {/* Displays if there are no messages in the session */}
                        No Questions Yet
                      </p>
                    )}
                  </div>
                </Link>
                <footer className="card-footer">
                  <button
                    className="delete-button card-footer-item button is-danger has-text-white"
                    onClick={() => handleDeleteSession(session._id)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </footer>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Sessions;
