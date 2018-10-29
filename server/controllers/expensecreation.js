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
      .then(expense_details =>
        res
          .status(200)
          .send({ expenseAdded: true, expenseEntry: expense_details })
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
  }
};