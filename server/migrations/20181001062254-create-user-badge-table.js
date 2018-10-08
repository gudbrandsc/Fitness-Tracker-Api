'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => 
     queryInterface.createTable('User_Badge_Tables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
	  BadgeId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Badge_Details',
          key: 'id',
          as: 'Badgeid',
        },
      },
	  UserId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'User_Details',
          key: 'id',
          as: 'Userid',
        },
      },
    }),
	
     down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('User_Badge_Tables'),

};