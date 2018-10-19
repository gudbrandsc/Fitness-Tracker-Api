const follower_details = require("../models").follower_table;
module.exports = {
  create(req, res) {
    return follower_details
      .create({
        FollowerId: req.params.followerid,
        FollowingId: req.params.followingid,
      })
      .then(follower_details => res.status(200).send(follower_details))
      .catch(error => res.status(400).send(error));
  },
  
 listfollowers(req, res) {
	   return follower_details
	   .findAll({
		   where: 
			   {
                 FollowerId: req.params.followerid
               }
        })
		 .then(follower_details => res.status(200).send(follower_details))
         .catch(error => res.status(400).send(error));
   },
   
   destroy(req, res) {
    return follower_details
    .find({
        where: {
          FollowerId: req.params.followerid,
		  FollowingId: req.params.followingid
        },
      })
    .then(follower_details => {
      if (!follower_details) {
        return res.status(400).send({
          message: 'Follower Not Found',
        });
      }

      return follower_details
        .destroy()
        .then(() => res.status(200).send({ message: 'Follower deleted successfully.'}))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error)); 
},
};