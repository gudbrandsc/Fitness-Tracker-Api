const user_details = require("../models").User_Details;
const user_journal = require("../models").Journal;

module.exports = {
  create(req, res) {
    return user_journal
      .create({
        Journal: req.body.Journal,
        UserId: req.body.UserId,
        imageurl: req.body.ImageUrl
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
  },

  update(req, res) {
    var id = req.body.id;
    var newjournalentry = req.body.journal;
    var ImageUrl = req.body.ImageUrl;

    return user_journal
      .findById(id)
      .then(journal => {
        if (!journal) {
          return res.status(400).send({
            message: "Journal with id does not exist"
          });
        }

        return journal
          .update({
            Journal: newjournalentry,
            imageurl: ImageUrl
          })
          .then(() => res.status(200).send(journal))
          .catch(error => res.status(400).send("error = " + error));
      })
      .catch(error => res.status(400).send("error = " + error));
  },

  deletejournal(req, res) {
    return user_journal
      .find({
        where: {
          id: req.params.id
        }
      })
      .then(journal_entry => {
        if (!journal_entry) {
          return res.status(200).send({
            message: "Journal with given id does not exist"
          });
        }

        return journal_entry
          .destroy()
          .then(() =>
            res.status(200).send({
              message: "Journal entry with given id was successfully removed."
            })
          )
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
