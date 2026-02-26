const express = require("express");
const { register, login, getProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// REGISTER USER
router.post("/register", register);

// LOGIN USER
router.post("/login", login);

// GET PROFILE
router.get("/profile", protect, getProfile);

module.exports = router;