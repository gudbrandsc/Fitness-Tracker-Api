const user_details = require("../models").User_Details;
const user_journal = require("../models").Journal;

module.exports = {
  create(req, res) {
    return user_journal
      .create({
        Journal: req.body.Journal,
        UserId: req.body.UserId
      })
      .then(journal_entry =>
        res
          .status(200)
          .send({ journalAdded: true, journalEntry: journal_entry })
      )
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return user_details
      .findById(req.params.userid, {
        include: [
          {
            model: user_journal
          }
        ]
      })
      .then(journal_entries => {
        return res.status(200).send(journal_entries);
      })
      .catch(error => res.status(400).send(error));
  }
};
