const express = require("express");
const { User, EmailStatus, Admin } = require("../models");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("admin/login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ where: { username } });

  if (admin && (await admin.validatePassword(password))) {
    req.session.isAuthenticated = true;
    res.redirect("/admin/dashboard");
  } else {
    res.render("admin/login", { error: "Invalid credentials" });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/admin/login");
  });
});

router.get("/dashboard", isAuthenticated, async (req, res) => {
  const users = await User.findAll({
    include: [{ model: EmailStatus, as: "emailStatuses" }],
  });

  res.render("admin/dashboard", { users });
});

module.exports = router;
