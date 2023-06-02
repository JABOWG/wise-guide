import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_QUESTION } from '../utils/mutations';

import Auth from '../utils/auth';
import { removeQuestionByTitle } from '../utils/localStorage';

const SavedQuestion = () => {
    const { loading, data } = useQuery(GET_ME);
    const [removeQuestion, { error }] = useMutation(REMOVE_QUESTION);

    const userData = data?.me || {};

    // This will hold the id of the question that was clicked
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);

    const handleDeleteQuestion = async (questionId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            await removeQuestion({
                variables: { questionId },
                update: (cache) => {
                    const existingUser = cache.readQuery({ query: GET_ME });
                    const newUser = existingUser.me.savedQuestions.filter(question => question._id !== questionId);
                    cache.writeQuery({ query: GET_ME, data: { me: { ...existingUser.me, savedQuestions: newUser } } });
                }
            });

            removeQuestionByTitle(questionId);
            // After deleting, clear the selection
            setSelectedQuestionId(null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleReset = () => {
        // Clear the selection
        setSelectedQuestionId(null);
    };

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    return (
        <>
             <h1>Welcome, {userData.username}! Here are your saved questions:</h1>
             {userData.savedQuestions?.length ? (
              userData.savedQuestions.map((question) => (
                <div key={question._id} className="question">
                <button className="question-button" onClick={() => setSelectedQuestionId(question._id)}>
                    {question.title}
                </button>
                {selectedQuestionId === question._id && <div className="question-answer">{question.answer}</div>}
                {selectedQuestionId === question._id && <button onClick={() => handleDeleteQuestion(question._id)}>Remove Question</button>}
                </div>
              ))
             ) : (
              <p>No saved questions yet.</p>
             )}
             <button onClick={handleReset}>Reset</button>
        </>
  );
};

export default SavedQuestion;
