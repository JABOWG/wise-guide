import React from "react";
import { Link } from "react-router-dom";

const SessionList = ({ sessions, handleDeleteSession }) => {
  // Check if there are no sessions
  if (!sessions.length) {
    return <h3>No Sessions Yet</h3>;
  }

  return (
    <>
      <h2 className="is-size-2 has-text-black has-text-weight-bold mb-5">
        Recent Sessions
      </h2>
      <div className="columns is-multiline">
        {/* Map over each session and create a card */}
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
                        ? session.messages[0].userQuestion.slice(0, 45) + "..."
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
    </>
  );
};

export default SessionList;
