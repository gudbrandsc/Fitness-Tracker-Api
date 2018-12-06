const follower_details = require("../models").follower_table;
const user_details = require("../models").User_Details;
const Promise = require("promise");

module.exports = {
  create(req, res) {
    return follower_details
      .create({
        FollowerId: req.params.followerid,
        FollowingId: req.params.followingid
      })
      .then(follower_details => res.status(200).send(follower_details))
      .catch(error => res.status(400).send(error));
  },

  listfollows(req, res) {
    var followerId = req.params.followerid;
    var userId = req.params.userid;

    if (followerId === userId) {
      // get list of people you are following
      return follower_details
        .findAll({
          where: {
            FollowerId: followerId
          },
          include: [
            {
              model: user_details
            }
          ]
        })
        .then(function(follower_details) {
          const promiseJson = [];

          for (var i in follower_details) {
            var jsonTemp = {
              FollowingId: 0,
              FollowerId: 0,
              LastName: "",
              FirstName: "",
              UserName: "",
              ImageUrl: "",
              FollowingFollower: ""
            };
            jsonTemp.FollowerId = follower_details[i].FollowerId;
            jsonTemp.FollowingId = follower_details[i].FollowingId;

            jsonTemp.FirstName = follower_details[i].User_Detail.FirstName;
            jsonTemp.LastName = follower_details[i].User_Detail.LastName;
            jsonTemp.UserName = follower_details[i].User_Detail.UserName;
            jsonTemp.ImageUrl = follower_details[i].User_Detail.ImageUrl;
            jsonTemp.FollowingFollower = "true";
            promiseJson.push(jsonTemp);
          }

          res.status(200).send(promiseJson);
        })
        .catch(error => res.status(400).send(error));
    } else {
      // get list of people you are following
      return follower_details
        .findAll({
          where: {
            FollowerId: userId
          },
          include: [
            {
              model: user_details
            }
          ]
        })
        .then(function(follower_details) {
          const promiseJson = [];

          for (var i in follower_details) {
            var jsonTemp = {
              FollowingId: 0,
              FollowerId: 0,
              LastName: "",
              FirstName: "",
              UserName: "",
              ImageUrl: "",
              FollowingFollower: ""
            };
            jsonTemp.FollowerId = follower_details[i].FollowerId;
            jsonTemp.FollowingId = follower_details[i].FollowingId;

            jsonTemp.FirstName = follower_details[i].User_Detail.FirstName;
            jsonTemp.LastName = follower_details[i].User_Detail.LastName;
            jsonTemp.UserName = follower_details[i].User_Detail.UserName;
            jsonTemp.ImageUrl = follower_details[i].User_Detail.ImageUrl;

            // check if the people that this person is following is following you
            promiseJson.push(
              checkIfOtherFollowsAreFollowingYou(jsonTemp, followerId)
            );
          }
          var results = Promise.all(promiseJson); // pass array of promises
          results.then(data => res.status(200).send(data));

          //res.status(200).send(follower_details);
        })
        .catch(error => res.status(400).send(error));
    }
  },

  listfollowers(req, res) {
    var followingId = req.params.followingid;
    var userId = req.params.userid;

    if (followingId === userId) {
      // get list of your followers with info to see if you are following them as well
      return follower_details
        .findAll({
          where: {
            FollowingId: followingId
          },
          include: [
            {
              model: user_details,
              as: "follower_details"
            }
          ]
        })
        .then(function(follower_details) {
          const promiseJson = [];

          for (var i in follower_details) {
            var jsonTemp = {
              FollowingId: 0,
              FollowerId: 0,
              LastName: "",
              FirstName: "",
              UserName: "",
              ImageUrl: "",
              FollowingFollower: ""
            };
            jsonTemp.FollowerId = follower_details[i].FollowerId;
            jsonTemp.FollowingId = follower_details[i].FollowingId;

            jsonTemp.FirstName = follower_details[i].follower_details.FirstName;
            jsonTemp.LastName = follower_details[i].follower_details.LastName;
            jsonTemp.UserName = follower_details[i].follower_details.UserName;
            jsonTemp.ImageUrl = follower_details[i].follower_details.ImageUrl;

            promiseJson.push(checkIfFollowingFollower(jsonTemp));
          }
          var results = Promise.all(promiseJson); // pass array of promises

          results.then(data => res.status(200).send(data));
        })
        .catch(error => res.status(400).send(error));
    } else {
      // get a list of followers for the userid and see if you are following that person's followers
      return follower_details
        .findAll({
          where: {
            FollowingId: userId
          },
          include: [
            {
              model: user_details,
              as: "follower_details"
            }
          ]
        })
        .then(function(follower_details) {
          const promiseJson = [];

          for (var i in follower_details) {
            var jsonTemp = {
              FollowingId: 0,
              FollowerId: 0,
              LastName: "",
              FirstName: "",
              UserName: "",
              ImageUrl: "",
              FollowingFollower: ""
            };
            jsonTemp.FollowerId = follower_details[i].FollowerId;
            jsonTemp.FollowingId = follower_details[i].FollowingId;

            jsonTemp.FirstName = follower_details[i].follower_details.FirstName;
            jsonTemp.LastName = follower_details[i].follower_details.LastName;
            jsonTemp.UserName = follower_details[i].follower_details.UserName;
            jsonTemp.ImageUrl = follower_details[i].follower_details.ImageUrl;

            promiseJson.push(checkIfFollowingFollower2(jsonTemp, followingId));
          }
          var results = Promise.all(promiseJson); // pass array of promises

          results.then(data => res.status(200).send(data));
        })
        .catch(error => res.status(400).send(error));
    }
  },

  destroy(req, res) {
    return follower_details
      .find({
        where: {
          FollowerId: req.params.followerid,
          FollowingId: req.params.followingid
        }
      })
      .then(follower_details => {
        if (!follower_details) {
          return res.status(200).send({
            message: "Follower Not Found"
          });
        }

        return follower_details
          .destroy()
          .then(() =>
            res.status(200).send({ message: "Follower deleted successfully." })
          )
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  getfollowers(req, res) {
    return follower_details
      .count({
        where: {
          FollowingId: req.params.followingid
        }
      })
      .then(follower_details =>
        res.status(200).send({ count: follower_details })
      )
      .catch(error => res.status(400).send(error));
  }
};

function checkIfFollowingFollower(jsonTemp) {
  // checks if you are following the person who is following you
  return new Promise(function(resolve, reject) {
    follower_details
      .find({
        where: {
          FollowerId: jsonTemp.FollowingId,
          FollowingId: jsonTemp.FollowerId
        }
      })
      .then(function(follower_details) {
        if (follower_details !== null) {
          jsonTemp.FollowingFollower = "true";
        } else {
          jsonTemp.FollowingFollower = "false";
        }

        resolve(jsonTemp);
      });
  });
}

function checkIfFollowingFollower2(jsonTemp, followingId) {
  // checks if you are following someone in the list of another person's followers
  return new Promise(function(resolve, reject) {
    follower_details
      .find({
        where: {
          FollowerId: followingId, // this is id of logged in user
          FollowingId: jsonTemp.FollowerId // follower in another users list of followers
        }
      })
      .then(function(follower_details) {
        if (follower_details !== null) {
          jsonTemp.FollowingFollower = "true";
        } else {
          jsonTemp.FollowingFollower = "false";
        }

        resolve(jsonTemp);
      });
  });
}

function checkIfOtherFollowsAreFollowingYou(jsonTemp, followerId) {
  return new Promise(function(resolve, reject) {
    follower_details
      .find({
        where: {
          FollowerId: followerId,
          FollowingId: jsonTemp.FollowingId
        }
      })
      .then(function(follower_details) {
        if (follower_details !== null) {
          jsonTemp.FollowingFollower = "true";
        } else {
          jsonTemp.FollowingFollower = "false";
        }

        resolve(jsonTemp);
      });
  });
}
