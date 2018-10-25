"use strict";
module.exports = (sequelize, DataTypes) => {
  const User_Details = sequelize.define("User_Details", {
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    StreetAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    City: {
      type: DataTypes.STRING,
      allowNull: false
    },
    State: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Zipcode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false
    },
	ImageUrl: {
      type: DataTypes.STRING,
    },
    UserName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUnique: function(value, next) {
          var self = this;
          User_Details.find({ where: { UserName: value } })
            .then(function(user) {
              // reject if a different user wants to use the same username
              if (user && self.id !== user.id) {
                return next("username already in use!");
              }
              return next();
            })
            .catch(function(err) {
              return next(err);
            });
        }
      }
    }
  });

  User_Details.associate = models => {
    User_Details.hasMany(models.Exercise_Table, {
      foreignKey: "UserId"
      //as: 'UserId',
    });
    User_Details.hasMany(models.User_Badge_Table, {
      foreignKey: "UserId"
      //as: 'UserId',
    });
    User_Details.hasMany(models.Journal, {
      foreignKey: "UserId"
      //as: 'UserId',
    });
	User_Details.hasMany(models.follower_table, {
      foreignKey: "FollowerId"
      //as: 'UserId',
    });
	User_Details.hasMany(models.follower_table, {
      foreignKey: "FollowingId"
      //as: 'UserId',
    });
  };
  return User_Details;
};
