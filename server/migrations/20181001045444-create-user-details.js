'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => 
     queryInterface.createTable('User_Details', {
      Userid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FirstName: {
        type: Sequelize.STRING,
		allowNull: false
      },
	  LastName: {
        type: Sequelize.STRING,
		allowNull: false
      },
	  StreetAddress: {
        type: Sequelize.STRING,
		allowNull: false
      },
	  City: {
        type: Sequelize.STRING,
		allowNull: false
      },
	  State: {
        type: Sequelize.STRING,
		allowNull: false
      },
	  Zipcode: {
        type: Sequelize.STRING,
		allowNull: false
      },
	  UserName: {
        type: Sequelize.STRING,
		allowNull: false
      },
	  Password: {
        type: Sequelize.STRING,
		allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),

   down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('User_Details'),
};