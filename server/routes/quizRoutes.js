const express = require("express");
const { createQuiz, getAllQuizzes, getQuizById, submitQuizAttempt } = require("../controllers/quizController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE NEW QUIZ (Admin Only)
router.post("/", protect, adminOnly, createQuiz);

// GET ALL QUIZZES (Public)
router.get("/", getAllQuizzes);

// GET SINGLE QUIZ BY ID (Logged-in User)
router.get("/:id", protect, getQuizById);

// SUBMIT QUIZ ATTEMPT (Logged-in User)
router.post("/:id/submit", protect, submitQuizAttempt);

module.exports = router;
