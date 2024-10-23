const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.json({
    message: "Please submit POST request to /login with username and password",
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "password") {
    res.json({ message: "Login successful", token: "sample_token_123" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
