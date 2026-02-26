const express = require("express");
const { register, login, getProfile } = require("../controllers/authController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// REGISTER USER
router.post("/register", register);

// LOGIN USER
router.post("/login", login);

// GET PROFILE
router.get("/profile", protect, getProfile);

// ADMIN DASHBOARD
router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

module.exports = router;