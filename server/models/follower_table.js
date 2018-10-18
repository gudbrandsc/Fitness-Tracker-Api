'use strict';
module.exports = (sequelize, DataTypes) => {
  const follower_table = sequelize.define('follower_table', {
  });
  follower_table.associate = function(models) {
    // associations can be defined here
	follower_table.belongsTo(models.User_Details, {
      foreignKey: 'FollowerId',
      onDelete: 'CASCADE',
    });
	follower_table.belongsTo(models.User_Details, {
      foreignKey: 'FollowingId',
      onDelete: 'CASCADE',
    });
  };
  return follower_table;
};