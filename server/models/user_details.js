'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Details = sequelize.define('User_Details', {
    FirstName: {
		type: DataTypes.STRING,
        allowNull: false,
    },
	LastName: {
		type: DataTypes.STRING,
        allowNull: false,
    },
	StreetAddress: {
		type: DataTypes.STRING,
        allowNull: false,
    },
	City: {
		type: DataTypes.STRING,
        allowNull: false,
    },
	State: {
		type: DataTypes.STRING,
        allowNull: false,
    },
	Zipcode: {
		type: DataTypes.STRING,
        allowNull: false,
    },
	Password: {
		type: DataTypes.STRING,
        allowNull: false,
    },
	Username: {
		type: DataTypes.STRING,
        allowNull: false,
    },
   });
   
  User_Details.associate = (models) => {
    User_Details.hasMany(models.Exercise_table, {
      foreignKey: 'UserId',
      as: 'UserId',
    });
	User_Details.hasMany(models.User_Badge_Table, {
      foreignKey: 'UserId',
      as: 'UserId',
    });
  };
  return User_Details;
};