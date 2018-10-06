'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => 
     queryInterface.createTable('Journals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Journal: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
	   UserId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'User_Details',
          key: 'Userid',
          as: 'Userid',
        },
      },
    }),
	
    down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Journals'),

};