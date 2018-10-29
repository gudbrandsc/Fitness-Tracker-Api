const exercise_details = require("../models").Exercise_Table;

module.exports = {
  create(req, res) {
    return exercise_details
      .create({
        WorkoutId: req.body.WorkoutId,
        UserId: req.body.UserId,
        Weight: req.body.Weight,
        NoOfSets: req.body.NoOfSets,
        NoOfReps: req.body.NoOfReps
      })
      .then(exercise_details => res.status(200).send(exercise_details))
      .catch(error => res.status(400).send(error));
  }
  /*
  listexerciseforuser(req, res) {
    return exercise_details
    .findById(req.params.userid, {
      include: [{
        model: Workout_table,
        as: 'workoutdetails',
      }],
	  include: [{
        model: User_Details,
        as: 'userdetails',
      }],
    })
    .then(exercise_details => res.status(200).send(exercise_details))
    .catch(error => res.status(400).send(error));
   },*/
};
