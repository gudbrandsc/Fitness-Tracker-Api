const workout_categories = require("../models").Workout_Categories;
const Workout_table = require('../models').Workout_table;

module.exports = {
  getall(req, res) {
    return workout_categories
      .findAll()
      .then(workout_categories => res.status(200).send(workout_categories))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return workout_categories
    .findById(req.params.categoryid, {
      include: [{
        model: Workout_table,
        as: 'workouts',
      }],
    })
    .then(workout_categories => res.status(200).send(workout_categories))
    .catch(error => res.status(400).send(error));
   },
};