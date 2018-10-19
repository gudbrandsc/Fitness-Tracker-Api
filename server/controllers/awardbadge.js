const badge_details = require("../models").Badge_Details;
const user_details = require("../models").User_Details;
const user_badge_table = require("../models").User_Badge_Table;

module.exports = {
  create(req, res) {
    return badge_details
      .create({
        BadgeName: req.body.BadgeName
      })
      .then(badge_details => res.status(200).send(badge_details))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return user_details
      .findById(req.params.userid, {
        include: [
          {
            model: user_badge_table
          }
        ]
      })
      .then(user_badges => {
        return res.status(200).send(user_badges);
      })
      .catch(error => res.status(400).send(error));
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
  }
};
