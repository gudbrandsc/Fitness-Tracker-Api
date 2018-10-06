'use strict';
module.exports = (sequelize, DataTypes) => {
  const Workout_table = sequelize.define('Workout_table', {
    WorkoutName: {
		type: DataTypes.STRING,
        allowNull: false,
	},
  });
  
  Workout_table.associate = (models) => {
    Workout_table.belongsTo(models.Workout_categories, {
      foreignKey: 'CategoryId',
      onDelete: 'CASCADE',
    });
	
	 Workout_table.hasMany(models.Exercise_Table, {
      foreignKey: 'WorkoutId',
      as: 'WorkoutId',
    });
	
  };
  return Workout_table;
};