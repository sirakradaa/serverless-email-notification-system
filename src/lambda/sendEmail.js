const AWS = require("aws-sdk");
const { sequelize, EmailStatus, User } = require("../models");
const { sendEmail } = require("../services/emailService");

const ses = new AWS.SES({ region: "us-east-1" });

async function recordEmailStatus(userId, status, messageId, details = null) {
  try {
    await EmailStatus.create({
      userId,
      status,
      messageId,
      details,
    });
    console.log(`Email status recorded for user ${userId}: ${status}`);
  } catch (error) {
    console.error(`Failed to record email status for user ${userId}:`, error);
  }
}

exports.handler = async (event) => {
  // Initialize database connection
  await sequelize.authenticate();

  for (const record of event.Records) {
    const { userId, email, name } = JSON.parse(record.body);

    try {
      await sendEmail(
        email,
        "Welcome to Our Service",
        `Hello ${name}, welcome to our service!`
      );
      console.log(`Welcome email sent to ${email}`);
      // TODO: Update email status in database
    } catch (error) {
      console.error(`Failed to send email to ${email}:`, error);
      // TODO: Handle email sending failure
    }
  }

  // Close database connection
  await sequelize.close();
};
