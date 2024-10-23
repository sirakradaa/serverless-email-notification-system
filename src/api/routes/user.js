const express = require("express");
const router = express.Router();
const { User, EmailStatus } = require("../../models");
const { sequelize } = require("../../models");
const AWS = require("aws-sdk");
const sqs = new AWS.SQS({ region: "us-east-1" }); // replace with your region

router.delete("/:id", async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const userId = req.params.id;

    // Delete related email statuses
    await EmailStatus.destroy({
      where: { userId: userId },
      transaction: t,
    });

    // Delete the user
    const deletedUser = await User.destroy({
      where: { id: userId },
      transaction: t,
    });

    if (deletedUser) {
      await t.commit();
      res.json({
        message: `User with ID ${userId} and related data has been deleted`,
      });
    } else {
      await t.rollback();
      res.status(404).json({ message: `User with ID ${userId} not found` });
    }
  } catch (error) {
    await t.rollback();
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, name } = req.body;

    // Save user to database
    const user = await User.create({ email, name });

    // Send message to SQS
    const params = {
      MessageBody: JSON.stringify({ email, name }),
      QueueUrl: process.env.SQS_QUEUE_URL, // make sure this is in your .env file
    };

    await sqs.sendMessage(params).promise();

    res
      .status(201)
      .json({ message: "User registered successfully", userId: user.id });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

module.exports = router;
