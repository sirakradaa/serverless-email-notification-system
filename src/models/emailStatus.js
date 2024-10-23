const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const EmailStatus = sequelize.define(
    "EmailStatus",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      status: {
        type: DataTypes.ENUM("delivered", "failed", "bounced"),
        allowNull: false,
      },
      messageId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "email_statuses",
      timestamps: true,
    }
  );

  EmailStatus.associate = (models) => {
    EmailStatus.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return EmailStatus;
};
