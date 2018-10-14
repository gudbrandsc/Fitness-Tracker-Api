"use strict";
module.exports = (sequelize, DataTypes) => {
  const User_Following = sequelize.define("User_Following", {
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    UserName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User_Following.associate = models => {
    User_Following.belongsTo(models.User_Details, {
      foreignKey: "userid",
      onDelete: "CASCADE"
    });
  };
  return User_Following;
};
