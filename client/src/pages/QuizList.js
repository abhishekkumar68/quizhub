import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/quizzes', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setQuizzes(response.data);
            } catch (err) {
                setError('Error fetching quizzes.');
            }
        };

        fetchQuizzes();
    }, []);

    return (
        <div>
            <h2>Quizzes Page</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {quizzes.length === 0 && !error ? (
                <p>No quizzes available yet.</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {quizzes.map((quiz) => (
                        <li key={quiz._id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
                            <h3>{quiz.title}</h3>
                            <p>{quiz.description}</p>
                            <button onClick={() => navigate(`/quiz/${quiz._id}`)}>
                                Start Quiz
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default QuizList;
