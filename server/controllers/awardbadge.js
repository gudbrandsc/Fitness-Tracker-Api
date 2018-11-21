const badge_details = require("../models").Badge_Details;
const user_details = require("../models").User_Details;
const user_badge_table = require("../models").User_Badge_Table;
const follower_details = require("../models").follower_table;
const user_journal = require("../models").Journal;
const exercise_table = require("../models").Exercise_Table;

module.exports = {
  create(req, res) {
    return badge_details
      .create({
        BadgeName: req.body.BadgeName,
        badgeinfo: req.body.badgeinfo,
        imageurl: req.body.imageurl
      })
      .then(badge_details => res.status(200).send(badge_details))
      .catch(error => res.status(400).send(error));
  },

  getbadges(req, res) {
    badge_details
      .findAll()
      .then(badges => {
        return res.status(200).send(badges);
      })
      .catch(error => res.status(400).send(error));
  },

  updateBadge(req, res) {
    return badge_details
      .find({
        where: {
          id: req.body.badgeid
        }
      })
      .then(badge_details => {
        if (!badge_details) {
          return res.status(200).send("Badge with given badgeId not found.");
        }

        return badge_details
          .update({
            BadgeName: req.body.badgename || badge_details.BadgeName,
            badgeinfo: req.body.badgeinfo || badge_details.badgeinfo,
            imageurl: req.body.imageurl || badge_details.imageurl
          })
          .then(() => res.status(200).send(badge_details))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  deletebadge(req, res) {
    return badge_details
      .find({
        where: {
          id: req.params.id
        }
      })
      .then(badge => {
        if (!badge) {
          return res.status(200).send({
            message: "Badge at given ID does not exist"
          });
        }

        return badge
          .destroy()
          .then(() =>
            res.status(200).send({ message: "Badge was successfully deleted." })
          )
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    const UserId = req.params.userid;
    //return user_details
    user_badge_table
      .findAll({
        where: {
          UserId: UserId
        },
        include: [
          {
            model: badge_details
          }
        ]
      })
      .then(function(user_badges) {
        // get a list of badgesIds for the user
        var responseJson = [];
        for (var i in user_badges) {
          var jsonTemp = {
            BadgeId: 0,
            BadgeName: "",
            BadgeInfo: "",
            ImageUrl: ""
          };
          jsonTemp.BadgeId = user_badges[i].BadgeId;
          jsonTemp.BadgeInfo = user_badges[i].Badge_Detail.badgeinfo;
          jsonTemp.BadgeName = user_badges[i].Badge_Detail.BadgeName;
          jsonTemp.ImageUrl = user_badges[i].Badge_Detail.imageurl;
          responseJson.push(jsonTemp);
        }

        initiationBadgeCheck(req, res, UserId, responseJson);
        socialStriverBadgeCheck(req, res, UserId, responseJson);
        superStarBadgeCheck(req, res, UserId, responseJson);
        wellnessBadgeCheck(req, res, UserId, responseJson);
        enduranceBadgeCheck(req, res, UserId, responseJson);
        powerBadgeCheck(req, res, UserId, responseJson);
        hardworkerBadgeCheck(req, res, UserId, responseJson);

        return res.status(200).send(responseJson);
        //return res.status(200).send(user_badges);
      })
      .catch(error => res.status(400).send("1" + error));
  },

  awardbadge(req, res) {
    return user_badge_table
      .create({
        BadgeId: req.body.BadgeId,
        UserId: req.body.UserId
      })
      .then(user_badges => {
        return res.status(200).send(user_badges);
      })
      .catch(error => res.status(400).send(error));
  },

  withdrawbadge(req, res) {
    return user_badge_table
      .find({
        where: {
          BadgeId: req.body.badgeid,
          UserId: req.body.userid
        }
      })
      .then(badge => {
        if (!badge) {
          return res.status(200).send({
            message: "User does not have badge."
          });
        }

        return badge
          .destroy()
          .then(() =>
            res.status(200).send({
              message: "Badge was successfully withdrawn from the user."
            })
          )
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};

function socialStriverBadgeCheck(req, res, UserId, responseJson) {
  // check if badge 6 for social striver exists
  var badgeExists = false;
  for (var i in responseJson) {
    var badgeId = responseJson[i].BadgeId;
    if (badgeId === 6) {
      badgeExists = true;
      break;
    }
  }

  // If user already has badge do nothing. If he does not, check if he should have it awarded.
  if (badgeExists === false) {
    var numOfFollows = 0;

    return follower_details
      .findAll({
        where: {
          FollowerId: UserId
        }
      })
      .then(function(follower_details) {
        for (var i in follower_details) {
          numOfFollows++;
        }

        // If this user follows a certain amount of users, award him this badge
        if (numOfFollows >= 4) {
          return user_badge_table
            .create({
              BadgeId: 6,
              UserId: UserId
            })
            .then(user_badges => {
              var jsonTemp = {
                BadgeId: 6
              };
              responseJson.push(jsonTemp);
              //res.status(200).send(responseJson);
            })
            .catch(error => res.status(400).send("3" + error));
        } else {
          //res.status(200).send(responseJson);
        }
      })
      .catch(error => res.status(400).send("2" + error));
  } // end of method for checking if social striver badge exists
}

function superStarBadgeCheck(req, res, UserId, responseJson) {
  // check if badge 7 for superstar exists
  var badgeExists = false;
  for (var i in responseJson) {
    var badgeId = responseJson[i].BadgeId;
    if (badgeId === 7) {
      badgeExists = true;
      break;
    }
  }

  // If user already has badge do nothing. If he does not, check if he should have it awarded.
  if (badgeExists === false) {
    var numOfFollowers = 0;

    return follower_details
      .findAll({
        where: {
          FollowingId: UserId
        }
      })
      .then(function(follower_details) {
        for (var i in follower_details) {
          numOfFollowers++;
        }

        // If this user follows a certain amount of users, award him this badge
        if (numOfFollowers >= 3) {
          return user_badge_table
            .create({
              BadgeId: 7,
              UserId: UserId
            })
            .then(user_badges => {
              var jsonTemp = {
                BadgeId: 7
              };
              responseJson.push(jsonTemp);
              //res.status(200).send(responseJson);
            })
            .catch(error => res.status(400).send("3" + error));
        } else {
          //res.status(200).send(responseJson);
        }
      })
      .catch(error => res.status(400).send("2" + error));
  }
}

function initiationBadgeCheck(req, res, UserId, responseJson) {
  // check if badge 8 for intiation exists
  var badgeExists = false;
  for (var i in responseJson) {
    var badgeId = responseJson[i].BadgeId;
    if (badgeId === 8) {
      badgeExists = true;
      break;
    }
  }

  // If user already has badge do nothing. If he does not, award it.
  if (badgeExists === false) {
    return user_badge_table
      .create({
        BadgeId: 8,
        UserId: UserId
      })
      .then(user_badges => {
        var jsonTemp = {
          BadgeId: 8
        };
        responseJson.push(jsonTemp);
        //res.status(200).send(responseJson);
      })
      .catch(error => res.status(400).send(error));
  } // end of method for checking if initiation badge exists
}

function wellnessBadgeCheck(req, res, UserId, responseJson) {
  // check if badge 9 for wellness exists
  var badgeExists = false;
  for (var i in responseJson) {
    var badgeId = responseJson[i].BadgeId;
    if (badgeId === 9) {
      badgeExists = true;
      break;
    }
  }

  // If user already has badge do nothing. If he does not, check if he should have it awarded.
  if (badgeExists === false) {
    var numOfJournals = 0;

    return user_journal
      .findAll({
        where: {
          UserId: UserId
        }
      })
      .then(function(journal_details) {
        for (var i in journal_details) {
          numOfJournals++;
        }

        // If this user follows a certain amount of users, award him this badge
        if (numOfJournals >= 8) {
          return user_badge_table
            .create({
              BadgeId: 9,
              UserId: UserId
            })
            .then(user_badges => {
              var jsonTemp = {
                BadgeId: 9
              };
              responseJson.push(jsonTemp);
              //res.status(200).send(responseJson);
            })
            .catch(error => res.status(400).send("3" + error));
        } else {
          //res.status(200).send(responseJson);
        }
      })
      .catch(error => res.status(400).send("2" + error));
  } // end of method for checking if social striver badge exists
}

function enduranceBadgeCheck(req, res, UserId, responseJson) {
  var badgeExists = false;
  for (var i in responseJson) {
    var badgeId = responseJson[i].BadgeId;
    if (badgeId === 10) {
      badgeExists = true;
      break;
    }
  }

  // If user already has badge do nothing. If he does not, check if he should have it awarded.
  if (badgeExists === false) {
    var numOfCardio = 0;

    return exercise_table
      .findAll({
        where: {
          UserId: UserId
        }
      })
      .then(function(exercise_details) {
        for (var i in exercise_details) {
          if (exercise_details[i].WorkoutId === 10) {
            // if it is equal to running
            numOfCardio++;
          }
        }

        if (numOfCardio >= 2) {
          return user_badge_table
            .create({
              BadgeId: 10,
              UserId: UserId
            })
            .then(user_badges => {
              var jsonTemp = {
                BadgeId: 10
              };
              responseJson.push(jsonTemp);
              //res.status(200).send(responseJson);
            })
            .catch(error => res.status(400).send("3" + error));
        } else {
          //res.status(200).send(responseJson);
        }
      })
      .catch(error => res.status(400).send("2" + error));
  } // end of method for checking if social striver badge exists
}

function powerBadgeCheck(req, res, UserId, responseJson) {
  var badgeExists = false;
  for (var i in responseJson) {
    var badgeId = responseJson[i].BadgeId;
    if (badgeId === 11) {
      badgeExists = true;
      break;
    }
  }

  // If user already has badge do nothing. If he does not, check if he should have it awarded.
  if (badgeExists === false) {
    var numOfWeight = 0;

    return exercise_table
      .findAll({
        where: {
          UserId: UserId
        }
      })
      .then(function(exercise_details) {
        for (var i in exercise_details) {
          if (
            exercise_details[i].WorkoutId === 1 ||
            exercise_details[i].WorkoutId === 2 ||
            exercise_details[i].WorkoutId === 6 ||
            exercise_details[i].WorkoutId === 7 ||
            exercise_details[i].WorkoutId === 8 ||
            exercise_details[i].WorkoutId === 9
          ) {
            // if it is equal to any weight exercises, workoutid = 1, 2, 6, 7, 8, and 9
            numOfWeight++;
          }
        }

        if (numOfWeight >= 8) {
          return user_badge_table
            .create({
              BadgeId: 11,
              UserId: UserId
            })
            .then(user_badges => {
              var jsonTemp = {
                BadgeId: 11
              };
              responseJson.push(jsonTemp);
              //res.status(200).send(responseJson);
            })
            .catch(error => res.status(400).send("3" + error));
        } else {
          //res.status(200).send(responseJson);
        }
      })
      .catch(error => res.status(400).send("2" + error));
  } // end of method for checking if social striver badge exists
}

function hardworkerBadgeCheck(req, res, UserId, responseJson) {
  var badgeExists = false;
  for (var i in responseJson) {
    var badgeId = responseJson[i].BadgeId;
    if (badgeId === 12) {
      badgeExists = true;
      break;
    }
  }

  // If user already has badge do nothing. If he does not, check if he should have it awarded.
  if (badgeExists === false) {
    var numOfSessions = 0;

    return exercise_table
      .findAll({
        where: {
          UserId: UserId
        }
      })
      .then(function(exercise_details) {
        for (var i in exercise_details) {
          // how many times did user go to the gym
          numOfSessions++;
        }

        if (numOfSessions >= 4) {
          return user_badge_table
            .create({
              BadgeId: 12,
              UserId: UserId
            })
            .then(user_badges => {
              var jsonTemp = {
                BadgeId: 12
              };
              responseJson.push(jsonTemp);
              //res.status(200).send(responseJson);
            })
            .catch(error => res.status(400).send("3" + error));
        } else {
          //res.status(200).send(responseJson);
        }
      })
      .catch(error => res.status(400).send("2" + error));
  } // end of method for checking if social striver badge exists
}
