import React, { useState, useEffect } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { SAVE_QUESTION } from "../utils/mutations";
import { SEARCH_QUESTIONS } from "../utils/queries";
import Auth from "../utils/auth";
import { saveQuestionIds, getSavedQuestionIds } from "../utils/localStorage";

import "bulma/css/bulma.css";

const SearchQuestions = () => {
  const [searchedQuestions, setSearchedQuestions] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedQuestionIds, setSavedQuestionIds] = useState(getSavedQuestionIds());
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    return () => saveQuestionIds(savedQuestionIds);
  }, [savedQuestionIds]);

  const [saveQuestion] = useMutation(SAVE_QUESTION);
  const [searchQuestions, { loading, data: searchQuestionData }] = useLazyQuery(SEARCH_QUESTIONS);

  useEffect(() => {
    if (searchQuestionData) {
      const { searchQuestion } = searchQuestionData;
      console.log("searchQuestion:", searchQuestion);
      setSearchedQuestions(searchQuestion ? [searchQuestion] : []);
    }
  }, [searchQuestionData]);

  const handleSaveQuestion = async (questionData) => {
    const { answer } = questionData;
    const title = searchInput; // set title as user's query

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    console.log("token before send:", token);

    if (!token) {
      return false;
    }

    try {
      await saveQuestion({
        variables: {
          questionData: { answer, title }, // title now is the user's query
        },
        update: (cache) => {
          cache.writeQuery({
            query: SEARCH_QUESTIONS,
            data: { searchQuestion: searchedQuestions },
          });
        },
      });

      setSavedQuestionIds([...savedQuestionIds, questionData._id]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (Auth.loggedIn()) {
      searchQuestions({ variables: { query: searchInput } });
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="title">Search for Answers to Your Homework Questions!</h1>
          <form className="field has-addons" onSubmit={handleSearch}>
            <div className="control is-expanded">
              <input
                className="input"
                name="searchInput"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                placeholder="Search for a question"
              />
            </div>
            <div className="control">
              <button
                className="button is-info"
                type="submit"
                disabled={!searchInput}
              >
                Submit Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {loading ? (
        <div className="section">
          <div className="container has-text-centered">
            <img
              src="https://media.giphy.com/media/xTkcEQACH24SMPxIQg/giphy.gif"
              alt="Loading..."
            />
          </div>
        </div>
      ) : (
        <section className="section">
          <div className="container">
            <h2 className="title">
              {searchedQuestions.length
                ? `Viewing ${searchedQuestions.length} results:`
                : "🏋️‍♂️Ask a Question to begin🏋️‍♂️"}
            </h2>
            {searchedQuestions.map((question) => (
              <div className="box" key={question.questionId}>
                <h3 className="title">{question.title}</h3>
                <p className="subtitle">{question.answer}</p>
                <button
                  className={`button is-primary ${
                    savedQuestionIds?.some(
                      (savedQuestionId) =>
                        savedQuestionId === question.questionId
                    )
                      ? "is-disabled"
                      : ""
                  }`}
                  disabled={savedQuestionIds?.some(
                    (savedQuestionId) => savedQuestionId === question.questionId
                  )}
                  onClick={() => handleSaveQuestion(question)}
                >
                  {savedQuestionIds?.some(
                    (savedQuestionId) => savedQuestionId === question.questionId
                  )
                    ? "This question has already been saved!"
                    : "Save this Question!"}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {showModal && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="box">
              <p className="has-text-weight-bold">
                Only signed-in users can perform searches.
              </p>
              <button className="button is-danger is-centered" onClick={closeModal}>
                Dismiss
              </button>
            </div>
          </div>
          <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
        </div>
      )}
    </>
  );
};

export default SearchQuestions;