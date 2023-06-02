import React, { useState, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import { SAVE_QUESTION } from '../utils/mutations';
import { SEARCH_QUESTIONS } from '../utils/queries';
import Auth from '../utils/auth';
import { saveQuestionIds, getSavedQuestionIds } from '../utils/localStorage';

const SearchQuestions = () => {
  const [searchedQuestions, setSearchedQuestions] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedQuestionIds, setSavedQuestionIds] = useState(getSavedQuestionIds());

  useEffect(() => {
    return () => saveQuestionIds(savedQuestionIds);
  }, [savedQuestionIds]);

  const [saveQuestion] = useMutation(SAVE_QUESTION);
  const [searchQuestions, { loading, data: searchQuestionData }] = useLazyQuery(SEARCH_QUESTIONS);

  useEffect(() => {
    if (searchQuestionData) {
      const { searchQuestion } = searchQuestionData;
      console.log('searchQuestion:', searchQuestion);
      setSearchedQuestions(searchQuestion ? [searchQuestion] : []);
    }
  }, [searchQuestionData]);

  
  

  const handleSaveQuestion = async (questionData) => {
    const { answer } = questionData;
    const title = searchInput; // set title as user's query
  
    const token = Auth.loggedIn() ? Auth.getToken() : null;
  
    console.log('token before send:', token);
  
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
    searchQuestions({ variables: { query: searchInput } }); // Pass `query` variable
  };

  return (
    <>
      <div className='search-bar'>
        <h1>Search for Questions!</h1>
        <form onSubmit={handleSearch}>
          <input
            name='searchInput'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type='text'
            placeholder='Search for a question'
          />
          <button type='submit' disabled={!searchInput}>
            Submit Search
          </button>
        </form>
      </div>

      {loading ? 
        <img src="https://media.giphy.com/media/xTkcEQACH24SMPxIQg/giphy.gif" alt="Loading..." /> 
        : (
        <div className='search-results'>
          <h2>
            {searchedQuestions.length
              ? `Viewing ${searchedQuestions.length} results:`
              : 'Search for a question to begin'}
          </h2>
          {searchedQuestions.map((question) => (
            <div className='question-card' key={question.questionId}>
              <h3>{question.title}</h3>
              <p>{question.answer}</p>
              <button
                disabled={savedQuestionIds?.some((savedQuestionId) => savedQuestionId === question.questionId)}
                onClick={() => handleSaveQuestion(question)}
              >
                {savedQuestionIds?.some((savedQuestionId) => savedQuestionId === question.questionId)
                  ? 'This question has already been saved!'
                  : 'Save this Question!'}
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchQuestions;
