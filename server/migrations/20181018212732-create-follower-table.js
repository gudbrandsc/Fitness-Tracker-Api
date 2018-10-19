'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => 
     queryInterface.createTable('follower_tables', {
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
	  FollowerId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'User_Details',
          key: 'id',
          as: 'FollowerId',
        },
	  },
	  FollowingId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'User_Details',
          key: 'id',
          as: 'FollowingId',
        },
	  },
    }),
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('follower_tables');
  }
};