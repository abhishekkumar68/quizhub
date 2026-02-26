import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <h2>QuizHub</h2>
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/quizzes">Quizzes</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
