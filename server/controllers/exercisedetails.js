const exercise_details = require("../models").Exercise_Table;

module.exports = {
  create(req, res) {
	var inputjsonobject = req.body;
	var userid = inputjsonobject.userid;
	var inputjsonarray = inputjsonobject.workouts
	var outputjsonarray;
	for(var i = 0; i < inputjsonarray.length; i++)
	{
	  return exercise_details
      .create({
        WorkoutId: inputjsonarray[i].id,
        UserId: userid,
        Weight: 10,
        NoOfSets: inputjsonarray[i].value1,
        NoOfReps: inputjsonarray[i].value2,
      })
      .then(exercise_details => outputjsonarray.push(exercise_details))
      .catch(error => res.status(400).send(error));
	}
	res.status(200).send(outputjsonarray);
		
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
