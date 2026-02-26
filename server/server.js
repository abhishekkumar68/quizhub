const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes);

const { errorHandler } = require("./middleware/errorMiddleware");

app.get("/", (req, res) => {
  res.json({ message: "QuizHub API Running 🚀" });
});

// Global error handler middleware should be at the very bottom
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect Database before starting server
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});