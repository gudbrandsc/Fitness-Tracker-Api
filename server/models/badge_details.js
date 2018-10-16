'use strict';
module.exports = (sequelize, DataTypes) => {
  const Badge_Details = sequelize.define('Badge_Details', {
    BadgeName: {
		type: DataTypes.STRING,
        allowNull: false,
      },
	});
	
  Badge_Details.associate = function(models) {
	  Badge_Details.hasMany(models.User_Badge_Table, {
      foreignKey: 'BadgeId',
	  onDelete: 'CASCADE',
    });
  };
  return Badge_Details;
};