import React from "react";
import { Link } from "react-router-dom";

const SessionList = ({ sessions }) => {
  // Check if there are no sessions
  if (!sessions.length) {
    return <h3>No Sessions Yet</h3>;
  }

  return (
    <>
      <h1 className="is-size-1 has-text-black has-text-weight-bold mb-5">
        Recent Sessions
      </h1>
      <div className="columns is-multiline">
        {/* Map over each session and create a card */}
        {sessions.map((session) => (
          <div className="column is-one-third" key={session._id}>
            <Link to={`/session/${session._id}`}>
              <div className="card">
                <div className="card-content">
                  {/* Check if the session has a message */}
                  {session.messages[0] ? (
                    <p className="is-size-5 has-text-weight-bold">
                      {/* Display the user question, truncating it if necessary */}
                      {session.messages[0].userQuestion.length > 30
                        ? session.messages[0].userQuestion.slice(0, 30) + "..."
                        : session.messages[0].userQuestion}
                    </p>
                  ) : (
                    <p className="is-size-5 has-text-weight-bold">
                      {/* Displays if there are no messages in the session */}
                      No Questions Yet
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default SessionList;
