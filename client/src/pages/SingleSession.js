import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import { GET_SESSION } from "../utils/queries";
import { CREATE_MESSAGE } from "../utils/mutations";

import "../assets/css/SingleSession.css";
import AuthService from "../utils/auth";

const SingleSession = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  // Gets all the sessions for the user
  const {
    loading: querySessionLoading,
    data: querySessionData,
    refetch,
  } = useQuery(GET_SESSION, {
    variables: { sessionId: sessionId },
  });

  // mutation to create a message
  const [createMessage, { loading: messageLoading, error: messageError }] =
    useMutation(CREATE_MESSAGE);
  // mutation to delete a session

  const [messageState, setMessageState] = useState("");
  const [sessionData, setSessionData] = useState(null); // Initialize sessionData as null

  // Refetch the session data when the page is re-rendered
  useEffect(() => {
    refetch();
  });

  useEffect(() => {
    if (querySessionData?.session) {
      setSessionData(querySessionData.session);
    }
  }, [querySessionData]);

  // Scroll the screen to the location of the reference on initial load and when a message is added
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView();
    }
  }, [sessionData, messageLoading]);

  // Check if the user is not logged in
  if (!AuthService.loggedIn()) {
    navigate("/userform"); // Redirect to login page
    return null; // Render nothing else
  }

  // Check if the session data is still loading or sessionData is null
  if (querySessionLoading || sessionData === null) {
    return <div>Loading...</div>;
  }

  // Creates a message document with the userQuestion and the aiResponse to the question
  // The new message document is appended to the sessionData state so it is rendered on the page
  const handleMessageSubmit = async (event) => {
    event.preventDefault();

    try {
      setMessageState(""); // Clear the input field
      // creates the message document
      const { data } = await createMessage({
        variables: { userQuestion: messageState, sessionId },
      });

      // Force a re-render by updating the session state
      setSessionData({
        ...sessionData,
        messages: [...sessionData.messages, data.createMessage],
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Dynamically resize the textarea based on the amount of text entered by the user. It ensures that the
  // textarea expands vertically to accommodate the content within a maximum of 4 lines. We also update the
  // message state with the new data entered in the field
  function handleTextareaChange(event) {
    const textarea = event.target;
    textarea.style.height = "auto"; // Reset the height of the textarea to its default value
    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      4 * parseFloat(getComputedStyle(textarea).lineHeight)
    )}px`; // Set the height of the textarea based on its content

    setMessageState(textarea.value); // Update the message state with the new textarea value
  }

  // Checks if the user pressed on the "Enter" key with or without the shift key.
  // If the user hit shift+key then create a new line, other-wise prevent the default (new line).
  // This will allow the "enter" key to submit the form instead
  function handleTextareaKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent new-line when Enter key is pressed
      handleMessageSubmit(event); // Submit the form
    }
  }

  // Renders chat bubbles based on the session data
  const renderChatBubbles = () => {
    // Check if there are no messages in the session data
    if (!sessionData.messages || sessionData.messages.length === 0) {
      return <div>Ask Away!</div>; // Render a message indicating no messages
    }

    // Map through the messages in the session data
    return sessionData.messages.map((message, index) => {
      return (
        <div key={index} className="columns">
          <div className="column is-8 is-offset-2">
            {/* Render the user question if available */}
            {message.userQuestion && (
              <div className="message is-primary">
                <div className="message-body">{message.userQuestion}</div>
              </div>
            )}

            {/* Render the AI response if available */}
            {message.aiResponse && (
              <div className="message is-light">
                <div className="message-body">{message.aiResponse}</div>
              </div>
            )}

            {/* Render a loading message if the message is currently being sent */}
            {messageLoading && index === sessionData.messages.length - 1 && (
              <div className="message is-warning">
                <div className="message-body">
                  Working on getting your answer, this may take a moment...
                </div>
              </div>
            )}

            {/* Render an error message if there was an error creating the message */}
            {messageError && index === sessionData.messages.length - 1 && (
              <div className="message is-danger">
                <div className="message-body">
                  Error occurred while creating message
                </div>
              </div>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container">
      <div className="section mb-6">
        <div className="columns">
          <div className="column">{renderChatBubbles()}</div>
        </div>
        <div ref={chatEndRef}></div>
      </div>
      <form onSubmit={handleMessageSubmit} className="form-container">
        <div className="field">
          <div className="field is-grouped">
            <div className="control is-expanded">
              <textarea
                className="textarea message-input"
                id="userMessage"
                name="userQuestion"
                placeholder="Enter your question here..."
                rows="1"
                value={messageState}
                onChange={handleTextareaChange}
                onKeyDown={handleTextareaKeyDown}
              />
            </div>
            <div className="control">
              <button className="button is-primary send-button" type="submit">
                Send
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SingleSession;
