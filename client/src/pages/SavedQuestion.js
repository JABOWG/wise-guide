import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_QUESTION } from '../utils/mutations';

import Auth from '../utils/auth';
import { removeQuestionByTitle } from '../utils/localStorage';

const SavedQuestion = () => {
    const { loading, data } = useQuery(GET_ME);
    const [removeQuestion, { error }] = useMutation(REMOVE_QUESTION);

    const userData = data?.me || {};

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
        } catch (err) {
            console.error(err);
        }
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
                <button className="question-button" onClick={() => handleDeleteQuestion(question._id)}>
              {question.title}
            </button>
            <div className="question-answer">{question.answer}</div>
          </div>
        ))
      ) : (
        <p>No saved questions yet.</p>
      )}
    </>
  );
};

export default SavedQuestion;
