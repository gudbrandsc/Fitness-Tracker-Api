const follower_details = require("../models").follower_table;
const user_details = require("../models").User_Details;

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

  listfollowers(req, res) {
    return follower_details
      .findAll({
        where: {
          FollowerId: req.params.followerid
        },
        include: [
          {
            model: user_details
          }
        ]
      })
      .then(function(follower_details) {
        const responseJson = [];
        for (var i in follower_details) {
          var jsonTemp = {
            FollowingId: 0,
            FollowerId: 0,
            LastName: "",
            FirstName: "",
            UserName: ""
          };
          jsonTemp.FollowerId = follower_details[i].FollowerId;
          jsonTemp.FollowingId = follower_details[i].FollowingId;

          jsonTemp.FirstName = follower_details[i].User_Detail.FirstName;
          jsonTemp.LastName = follower_details[i].User_Detail.LastName;
          jsonTemp.UserName = follower_details[i].User_Detail.UserName;

          responseJson.push(jsonTemp);
        }
        res.status(200).send(responseJson);
      })
      .catch(error => res.status(400).send(error));
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
  
  getfollowers(req, res)
	{
		return follower_details
		.count({
			where: {
			FollowingId: req.params.followingid
			},
		})
		.then(follower_details => res.status(200).send({count: follower_details}))
		.catch(error => res.status(400).send(error));
	},
};
