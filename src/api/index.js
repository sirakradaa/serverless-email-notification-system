require("dotenv").config();
const express = require("express");
const AWS = require("aws-sdk");
const { sequelize, User } = require("../models");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Configure AWS
AWS.config.update({
  region: process.env.AWS_REGION || "us-east-1",
});

// Initialize AWS services
const sqs = new AWS.SQS();

// Example route for user registration
app.post("/register", async (req, res) => {
  try {
    const { email, name } = req.body;

    // Save user to database
    const user = await User.create({ email, name });

    // Send message to SQS
    const params = {
      MessageBody: JSON.stringify({ userId: user.id, email, name }),
      QueueUrl: process.env.SQS_QUEUE_URL,
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

const authRoutes = require("./auth");
app.use("/", authRoutes);

const userRoutes = require("./routes/user");
app.use("/users", userRoutes);

// Start server
async function startServer() {
  try {
    await sequelize.sync();
    console.log("Database synced successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
}

startServer();
