# Serverless Email Notification System

## Overview

This project is a serverless email notification system that allows users to register and automatically receive welcome emails. It demonstrates the integration of various AWS services (SQS, Lambda, SES, SNS) with a Node.js backend, showcasing a modern, cloud-native application architecture. The system was developed to demonstrate proficiency in serverless architecture, AWS services, and Node.js to potential employers during the interview process.

## Features

- User registration API with database integration
- Automated email notifications using AWS SES
- Serverless architecture utilizing AWS Lambda, SQS, and SNS
- Admin panel for monitoring user registrations and email statuses
- Secure authentication system for admin access
- Scalable design capable of handling high loads

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 14.0.0 or higher)
- npm (version 6.0.0 or higher)
- AWS account with access to SQS, SNS, Lambda, and SES
- MySQL database

## Getting Started

To get a local copy up and running, follow these steps:

1. Clone the repository:

   ```
   git clone git@github.com:sirakradaa/serverless-email-notification-system.git]
   ```

2. Navigate to the project directory:

   ```
   cd serverless-email-notification-system
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Set up your environment variables in a `.env` file:

   ```
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASS=your_database_password
   DB_HOST=your_database_host
   AWS_REGION=your_aws_region
   SQS_QUEUE_URL=your_sqs_queue_url
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   ```

5. Start the development server:
   ```
   npm run dev
   ```

This runs the app in development mode. The API will be available at `http://localhost:3000`.

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the development server with nodemon for auto-reloading.
- `npm start`: Starts the server without auto-reloading.

## Project Structure

- `src/api/`: Contains Express routes and API logic
- `src/models/`: Database models using Sequelize ORM
- `src/lambda/`: AWS Lambda functions for email processing and SNS handling
- `views/`: EJS templates for admin panel

## AWS Services Used

- AWS Simple Queue Service (SQS)
- AWS Simple Notification Service (SNS)
- AWS Lambda
- AWS Simple Email Service (SES)

## Purpose

This project serves as a demonstration of skills in serverless architecture, AWS services integration, and Node.js development for a software engineering position.

## Troubleshooting

If you encounter any issues with AWS services, ensure that:

- Your AWS credentials are correctly set up
- You have the necessary permissions for SQS, SNS, Lambda, and SES
- Your SES account is out of the sandbox mode for production use

For database connection issues, verify your MySQL credentials and ensure the database server is running and accessible.
