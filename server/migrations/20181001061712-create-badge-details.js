'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => 
     queryInterface.createTable('Badge_Details', {
      Badgeid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      BadgeName: {
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
    }),
	
   down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Badge_Details'),

};