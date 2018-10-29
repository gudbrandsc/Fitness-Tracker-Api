'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expenses_Details = sequelize.define('Expenses_Details', {
    ExpenseType: {
		type: DataTypes.STRING,
        allowNull: false,
	},
	AmountSpent: {
		type: DataTypes.INTEGER,
        allowNull: false,
      },
  });
  Expenses_Details.associate = function(models) {
    Expenses_Details.belongsTo(models.User_Details, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE',
    });
  }; 
  return Expenses_Details;
};