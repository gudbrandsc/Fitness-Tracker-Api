const expense_details = require("../models").Expenses_Details;
const user_details = require("../models").User_Details;

module.exports = {
  create(req, res) {
    return expense_details
      .create({
        ExpenseType: req.body.ExpenseType,
        AmountSpent: req.body.AmountSpent,
		    UserId: req.body.UserId
      })
      .then(function(expense_detailsNew) {
         user_details.findById(req.body.UserId, {
         include: [
          {
            model: expense_details
          }
        ]
      })
      .then(expense_detailsAll => {
        return res.status(200).send(expense_detailsAll);
      });
      } 
      )
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return user_details
      .findById(req.params.userid, {
        include: [
          {
            model: expense_details
          }
        ]
      })
      .then(expense_details => {
        return res.status(200).send(expense_details);
      })
      .catch(error => res.status(400).send(error));
  },
  deleteexpense(req, res) {
    return expense_details
      .find({
        where: {
          id: req.params.id
        }
      })
      .then(expense_details => {
        if (!expense_details) {
          return res.status(200).send({
            message: "Expense with given id does not exist"
          });
        }

        return expense_details
          .destroy()
          .then(() =>
            res.status(200).send({
              message: "Expense entry with given id was successfully removed."
            })
          )
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};