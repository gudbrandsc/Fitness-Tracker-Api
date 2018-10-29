const workout_details = require("../models").Workout_table;
const workout_categories = require("../models").Workout_Categories;

module.exports = {
  create(req, res) {
    return workout_details
      .create({
        WorkoutName: req.body.WorkoutName,
        CategoryId: req.body.CategoryId
      })
      .then(workout_details => res.status(200).send(workout_details))
      .catch(error => res.status(400).send(error));
  },

  getall(req, res) {
    return workout_details
      .findAll()
      .then(workout_details => res.status(200).send(workout_details))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return workout_details
      .findById(req.params.workoutid)
      .then(workout_details => {
        if (!workout_details) {
          return res.status(400).send({
            message: "Workout not found"
          });
        }
        res.status(200).send(workout_details);
      })
      .catch(error => res.status(400).send(error));
  }
};
