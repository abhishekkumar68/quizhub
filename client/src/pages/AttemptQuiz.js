import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AttemptQuiz = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [scoreResult, setScoreResult] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setQuiz(response.data);
                // Initialize an empty array of answers matching the number of questions
                setSelectedAnswers(new Array(response.data.questions.length).fill(''));
            } catch (err) {
                setError('Error fetching quiz.');
            }
        };

        fetchQuiz();
    }, [id]);

    const handleOptionChange = (questionIndex, optionValue) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[questionIndex] = optionValue;
        setSelectedAnswers(newAnswers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `http://localhost:5000/api/quizzes/${id}/submit`,
                { selectedAnswers },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setScoreResult(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error submitting quiz.');
        }
    };

    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!quiz) return <p>Loading quiz...</p>;

    return (
        <div>
            <h2>{quiz.title}</h2>
            <p>{quiz.description}</p>

            {scoreResult ? (
                <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#e6ffe6', border: '1px solid #00cc00' }}>
                    <h3>Quiz Completed!</h3>
                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                        You scored {scoreResult.score} / {scoreResult.totalQuestions}
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {quiz.questions.map((question, qIndex) => (
                        <div key={qIndex} style={{ margin: '20px 0', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                            <h4>{qIndex + 1}. {question.questionText}</h4>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {question.options.map((option, oIndex) => (
                                    <label key={oIndex} style={{ cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            name={`question-${qIndex}`}
                                            value={option}
                                            checked={selectedAnswers[qIndex] === option}
                                            onChange={() => handleOptionChange(qIndex, option)}
                                            required
                                        />
                                        {' '}{option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', fontSize: '1rem' }}>
                        Submit Quiz
                    </button>
                </form>
            )}
        </div>
    );
};

export default AttemptQuiz;
