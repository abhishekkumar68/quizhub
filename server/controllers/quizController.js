const Quiz = require("../models/Quiz");

// CREATE NEW QUIZ (Admin Only)
const createQuiz = async (req, res) => {
    try {
        const { title, description, questions } = req.body;

        // Create a new quiz with the logged-in admin's ID
        const newQuiz = await Quiz.create({
            title,
            description,
            createdBy: req.user.id,
            questions
        });

        res.status(201).json({
            message: "Quiz created successfully",
            quiz: newQuiz
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating quiz" });
    }
};

// GET ALL QUIZZES (Public)
const getAllQuizzes = async (req, res) => {
    try {
        // Fetch all quizzes but exclude the 'correctAnswer' field from the 'questions' array
        const quizzes = await Quiz.find().select("-questions.correctAnswer");

        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching quizzes" });
    }
};

// GET SINGLE QUIZ BY ID (Logged-in User)
const getQuizById = async (req, res) => {
    try {
        // Fetch a single quiz by its ID and exclude the 'correctAnswer' field
        const quiz = await Quiz.findById(req.params.id).select("-questions.correctAnswer");

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: "Error fetching quiz" });
    }
};

const Attempt = require("../models/Attempt");

// SUBMIT QUIZ ATTEMPT (Logged-in User)
const submitQuizAttempt = async (req, res) => {
    try {
        const { selectedAnswers } = req.body;

        // Fetch the quiz by ID to get the correct answers
        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        // Calculate score
        let score = 0;
        quiz.questions.forEach((question, index) => {
            // Check if the selected answer matches the correct answer
            if (selectedAnswers[index] === question.correctAnswer) {
                score++;
            }
        });

        // Save attempt in database
        const newAttempt = await Attempt.create({
            user: req.user.id,
            quiz: quiz._id,
            selectedAnswers,
            score
        });

        // Return the calculated score
        res.status(201).json({
            message: "Quiz submitted successfully",
            score,
            totalQuestions: quiz.questions.length
        });

    } catch (error) {
        res.status(500).json({ message: "Error submitting quiz" });
    }
};


module.exports = {
    createQuiz,
    getAllQuizzes,
    getQuizById,
    submitQuizAttempt
};
