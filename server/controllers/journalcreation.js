const journal_details = require("../models").Journal;

module.exports = {
  create(req, res) {
    return journal_details
      .create({
        Journal: req.body.Journal,
        UserId: req.body.UserId,
      })
      .then(journal_details => res.status(200).send(journal_details))
      .catch(error => res.status(200).send(error));
  },
};