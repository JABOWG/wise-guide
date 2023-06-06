import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_ALL_SESSIONS } from "../utils/queries";

import AuthService from "../utils/auth";

const Sessions = () => {
  const navigate = useNavigate();
  const { loading, data, refetch } = useQuery(GET_ALL_SESSIONS);
  const sessions = data?.allSessions || [];

  // Function to refetch the sessions data when a new session is created
  const handleRefetch = async () => {
    await refetch();
  };

  // Call the handleRefetch function whenever the sessions array changes
  useEffect(() => {
    handleRefetch();
  }, [sessions]);

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
              <Link to={`/session/${session._id}`}>
                <div className="card">
                  <div className="card-content">
                    {session.messages[0] ? (
                      <p className="is-size-5 has-text-weight-bold">
                        {session.messages[0].userQuestion.length > 20
                          ? session.messages[0].userQuestion.slice(0, 20) +
                            "..."
                          : session.messages[0].userQuestion}
                      </p>
                    ) : (
                      <p className="is-size-5 has-text-weight-bold">
                        No Questions Yet
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Sessions;
