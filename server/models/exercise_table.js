'use strict';
module.exports = (sequelize, DataTypes) => {
  const Exercise_Table = sequelize.define('Exercise_Table', {
    Weight: {
		type: DataTypes.INTEGER,
        allowNull: false,
      }, 
	NoOfSets: {
		type: DataTypes.INTEGER,
        allowNull: false,
      },
	 NoOfReps: {
		type: DataTypes.INTEGER,
        allowNull: false,
      },
  });
  
 Exercise_Table.associate = (models) => {
   Exercise_Table.belongsTo(models.Workout_table, {
      foreignKey: 'WorkoutId',
      onDelete: 'CASCADE',
    });
   Exercise_Table.belongsTo(models.User_Details, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE',
    });
  }; 
  return Exercise_Table;
};