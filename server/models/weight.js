'use strict';
module.exports = (sequelize, DataTypes) => {
  const Weight = sequelize.define('Weight', {
    Weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
 
});
Weight.associate = function(models) {
  Weight.belongsTo(models.User_Details, {
    foreignKey: "UserId",
    onDelete: "CASCADE"
  });
};
  return Weight;
};