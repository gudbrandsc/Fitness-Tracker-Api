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

  getbadges(req, res) {
    badge_details
      .findAll()
      .then(badges => {
        return res.status(200).send(badges);
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
