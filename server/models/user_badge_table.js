'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Badge_Table = sequelize.define('User_Badge_Table', {
    
   });
  
  User_Badge_Table.associate = function(models) {
    User_Badge_Table.belongsTo(models.Badge_Details, {
      foreignKey: 'badgeid',
      onDelete: 'CASCADE',
    });
   User_Badge_Table.belongsTo(models.User_Details, {
      foreignKey: 'userid',
      onDelete: 'CASCADE',
    });
  }; 
  return User_Badge_Table;
};