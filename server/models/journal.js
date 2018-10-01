'use strict';
module.exports = (sequelize, DataTypes) => {
  const Journal = sequelize.define('Journal', {
    title: {
		type: DataTypes.String,
        allowNull: false,
	},
  });
  Journal.associate = function(models) {
    Journal.belongsTo(models.User_Details, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE',
    });
  };
  return Journal;
};