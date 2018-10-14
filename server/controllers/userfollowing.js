const user_following = require("../models").User_Following;

module.exports = {
  create(req, res) {
    return user_following
      .create({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        UserName: req.body.UserName
      })
      .then(
        res
          .status(200)
          .send({ userfollowed: true, username: req.body.UserName })
      )
      .catch(error =>
        res
          .status(400)
          .send({ userfollowed: false, message: "user could not be followed" })
      );
  }
};
