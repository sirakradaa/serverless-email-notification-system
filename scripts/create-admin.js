const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

// Database connection configuration
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

// Define Admin model
const Admin = sequelize.define(
  "Admin",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "admins",
    timestamps: true,
  }
);

// Hash password before saving
Admin.beforeCreate(async (admin) => {
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
});

async function createAdmin() {
  try {
    // Sync the model with the database
    await sequelize.sync();

    // Create admin user
    const admin = await Admin.create({
      username: "admin",
      password: "your-secure-password",
    });

    console.log("Admin user created:", admin.username);
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await sequelize.close();
  }
}

createAdmin();
