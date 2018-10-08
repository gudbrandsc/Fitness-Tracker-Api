'use strict';
module.exports = (sequelize, DataTypes) => {
  const Journal = sequelize.define('Journal', {
    title: {
		type: DataTypes.STRING,
        allowNull: false,
	},
  });
  Journal.associate = function(models) {
    Journal.belongsTo(models.User_Details, {
      foreignKey: 'userid',
      onDelete: 'CASCADE',
    });
  }; 
  return Journal;
};