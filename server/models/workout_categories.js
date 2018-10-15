'use strict';
module.exports = (sequelize, DataTypes) => {
  const Workout_Categories = sequelize.define('Workout_Categories', {
	  
    CategoryName: {
		type: DataTypes.STRING,
        allowNull: false,
	},
  });
  
   Workout_Categories.associate = (models) => {
    Workout_Categories.hasMany(models.Workout_table, {
      foreignKey: 'CategoryId',
	  //as: 'Workout_table',
    });
  };
  return Workout_Categories;
};