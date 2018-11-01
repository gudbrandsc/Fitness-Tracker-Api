const exercise_details = require("../models").Exercise_Table;

module.exports = {
  create(req, res) {
	const inputjsonobject = req.body;
	const userid = inputjsonobject.userid;
	const inputjsonarray = inputjsonobject.workouts;
	var outputjsonarray = [];
	console.log("input array lentgth is" +inputjsonarray.length);
	for(var i = 0; i < inputjsonarray.length; i++)
	{
	  
      exercise_details.create({
        WorkoutId: inputjsonarray[i].id,
        UserId: userid,
        Weight: 10,
        NoOfSets: inputjsonarray[i].value1,
        NoOfReps: inputjsonarray[i].value2,
      })
      .then(function(exercise_details)
		{
		  outputjsonarray.push(exercise_details);
		  
		  if(outputjsonarray.length === inputjsonarray.length)
		  {
			  res.status(200).send(outputjsonarray);
		  }
	  })
	  .catch(error => res.status(400).send(error));
	
	}
		
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
