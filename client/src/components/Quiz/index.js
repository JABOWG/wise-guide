import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';

const Quiz = () => {
    const { loading, data } = useQuery(GET_ME);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    
    useEffect(() => {
        if (data?.me?.savedQuestions) {
            setQuestions(data.me.savedQuestions);
        }
    }, [data]);
  
    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
        
        if (answer === questions[currentQuestionIndex].answer) {
            setScore(score + 1);
        }
    }
    
    const handleNextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer('');
    }
    
    if (loading) return <p>Loading...</p>;
    if (currentQuestionIndex >= questions.length) {
        return <h2>Your score: {score}/{questions.length}</h2>;
    }
    
    const question = questions[currentQuestionIndex];
    
    return (
        <div>
            <h2>{question.title}</h2>
            <p>{selectedAnswer === question.answer ? 'Correct' : 'Incorrect'}</p>
            <textarea class="textarea" placeholder="Test Your Knowledge Here"></textarea>
            <button onClick={() => handleAnswerClick(question.answer)}>Confirm Answer</button>
            <button onClick={handleNextQuestion}>Next Question</button>
        </div>
    );
};
  
export default Quiz;
