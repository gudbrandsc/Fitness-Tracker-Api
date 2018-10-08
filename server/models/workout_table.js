'use strict';
module.exports = (sequelize, DataTypes) => {
  const Workout_table = sequelize.define('Workout_table', {
    WorkoutName: {
		type: DataTypes.STRING,
        allowNull: false,
	},
  });
  
  Workout_table.associate = (models) => {
    Workout_table.belongsTo(models.Workout_Categories, {
      foreignKey: 'categoryid',
      onDelete: 'CASCADE',
    });
	
	 Workout_table.hasMany(models.Exercise_Table, {
      foreignKey: 'workoutid',
    });
	
  };
  return Workout_table;
};