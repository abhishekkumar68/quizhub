const express = require("express");
const { createQuiz, getAllQuizzes, getQuizById } = require("../controllers/quizController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE NEW QUIZ (Admin Only)
router.post("/", protect, adminOnly, createQuiz);

// GET ALL QUIZZES (Public)
router.get("/", getAllQuizzes);

// GET SINGLE QUIZ BY ID (Logged-in User)
router.get("/:id", protect, getQuizById);

module.exports = router;
