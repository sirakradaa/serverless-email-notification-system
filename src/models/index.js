const { Sequelize } = require("sequelize");
const UserModel = require("./user");
const EmailStatusModel = require("./emailStatus");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const User = UserModel(sequelize);
const EmailStatus = EmailStatusModel(sequelize);

// Set up associations
User.hasMany(EmailStatus, { as: "emailStatuses", foreignKey: "userId" });
EmailStatus.belongsTo(User, { as: "user", foreignKey: "userId" });

module.exports = {
  sequelize,
  User,
  EmailStatus,
};
