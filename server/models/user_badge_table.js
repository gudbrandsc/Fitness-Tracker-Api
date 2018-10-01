'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Badge_Table = sequelize.define('User_Badge_Table', {
    
   });
  
  User_Badge_Table.associate = function(models) {
    User_Badge_Table.belongsTo(models.Badge_Details, {
      foreignKey: 'Badgeid',
      onDelete: 'CASCADE',
    });
   Exercise_Table.belongsTo(models.User_Details, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE',
    });
  };
  return User_Badge_Table;
};