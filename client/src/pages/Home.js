import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { GET_RECENT_SESSIONS } from "../utils/queries";
import { CREATE_SESSION } from "../utils/mutations";

import SessionList from "../components/SessionList";
import AuthService from "../utils/auth";

const Home = () => {
  const navigate = useNavigate();
  const limit = 5; // number of recent sessions we want to display on home page

  // useQuery hook to fetch all sessions
  const { loading, data, refetch } = useQuery(GET_RECENT_SESSIONS, {
    variables: { limit: limit },
  });
  const sessions = data?.recentSessions || [];

  // useMutation hook to create a new session
  const [createSession, { loading: sessionLoading, error: sessionError }] =
    useMutation(CREATE_SESSION);

  // Handle the creation of a new session
  const handleCreateSession = async (event) => {
    try {
      event.preventDefault();
      // Create a new session
      const { data } = await createSession();

      // redirect the user to the new session's page
      const sessionId = data.createSession._id;
      navigate(`/session/${sessionId}`);

      // Refetch the recent sessions after the creation of a new session
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  // Check if the user is logged in
  if (!AuthService.loggedIn()) {
    navigate("/userform"); // Redirect to the login page
    return null; // Render nothing else
  }

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          <section className="mb-5">
            <h2 className="is-size-2 has-text-black has-text-weight-bold mb-3">
              Create a new session
            </h2>
            <button className="button is-success" onClick={handleCreateSession}>
              Create Session
            </button>
          </section>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <SessionList sessions={sessions} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
