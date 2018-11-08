const exercise_details = require("../models").Exercise_Table;
const follower_details = require("../models").follower_table;
const workout_details = require("../models").Workout_table;
const category_details = require("../models").Workout_Categories
const Sequelize = require("sequelize");
const pg = require('pg');
const Op = Sequelize.Op;
const user_details = require("../models").User_Details;

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
		
  },
  getexercisefeed(req, res){
  //get list of people you are following
      follower_details.findAll({
        where: {
          FollowerId: req.params.followerid
        },
        include: [
          {
            model: user_details
          }
        ]
      })
      .then(function(follower_details) 
	  { 
		console.log('Entered here');
        const responseJson = [];
		const results = [];
		if(follower_details.length <= 100)
		{
			exercise_details.findAll({
			 where: {
					UserId: { [Op.in]: Sequelize.literal( "(Select \"follower_tables\".\"FollowingId\" from follower_tables where \"follower_tables\".\"FollowerId\" = " +req.params.followerid + ")") 
						}
				},
			include: [
				{
				model: user_details
				}
			],
			order: [
            ['createdAt', 'DESC'],
			 ],
			 limit: 50
		}).then(details => res.status(200).send(details))
	   .catch(error => res.status(200).send(error));
	   }
	   else if(follower_details.length >=100 && follower_details.length <=200)
	   {
		   exercise_details.findAll({
			 where: {
					UserId: { [Op.in]: Sequelize.literal( "(Select \"follower_tables\".\"FollowingId\" from follower_tables where \"follower_tables\".\"FollowerId\" = " +req.params.followerid + ")") 
						},
					createdAt: {  [Op.gte]: moment().subtract(2, 'days').toDate()
					}
				},
			include: [
				{
				model: user_details
				}
			],
			order: [
            ['createdAt', 'DESC'],
			 ],
			 limit: 50
		}).then(details => res.status(200).send(details))
	   .catch(error => res.status(200).send(error));
	   }
	   else
	   {
		   exercise_details.findAll({
			 where: {
					UserId: { [Op.in]: Sequelize.literal( "(Select \"follower_tables\".\"FollowingId\" from follower_tables where \"follower_tables\".\"FollowerId\" = " +req.params.followerid + ")") 
						},
					createdAt: {  [Op.gte]: moment().subtract(1, 'days').toDate()
					}
				},
			include: [
				{
				model: user_details
				}
			],
			order: [
            ['createdAt', 'DESC'],
			 ],
			 limit: 50
		}).then(details => res.status(200).send(details))
	   .catch(error => res.status(200).send(error));
	   }
   })
  .catch(error => res.status(200).send(error)); 
  },
 
  listexerciseforuser(req, res) {
     
    exercise_details.findAll({
	where: { UserId : req.params.userid }, 
    attributes: [ [Sequelize.fn('DISTINCT', Sequelize.col('SessionId')) ,'SessionId']],
    })
    .then(function(exercise_detailsNew) {
		    const responseJson = {
            UserName: "",
            jsonArray: []
            };
		const jsonTemp = [];
		for(var i in exercise_detailsNew)
		{
			console.log('enetered here' +exercise_detailsNew);
			var sessionid = exercise_detailsNew[i].SessionId;
			exercise_details.findAll({
		    where: { SessionId : sessionid }, 
			include: [
				{
				model: workout_details,
				required: true
				//include: [ { model: category_details } ]
				},
				{
					model: user_details,
					required: true
				}
			]
		    })
			.then(function(details) {
				console.log('details are' +JSON.stringify(details));
				for(var j in details)
				{
					jsonTemp.push(details[j]);
				}
				console.log('after pushing are' +JSON.stringify(jsonTemp));
			})
		}
		console.log('came here');
		for(var k in jsonTemp)
		{
			console.log('enetered inside loop');
			responseJson.jsonArray.push(jsonTemp[k]);
		}
		console.log('just before sending' +JSON.stringify(responseJson));
		res.status(200).send(responseJson);
	})
    .catch(error => res.status(400).send(error));
   },
};
