const exercise_details = require("../models").Exercise_Table;
const follower_details = require("../models").follower_table;
const workout_details = require("../models").Workout_table;
const category_details = require("../models").Workout_Categories;
const Sequelize = require("sequelize");
const pg = require("pg");
const Op = Sequelize.Op;
const user_details = require("../models").User_Details;
const Promise = require("promise");

module.exports = {
  create(req, res) {
    const inputjsonobject = req.body;
    const userid = inputjsonobject.userid;
    const inputjsonarray = inputjsonobject.workouts;
    var outputjsonarray = [];
    console.log("input array lentgth is" + inputjsonarray.length);
    var sessionid = 0;
    var initialpromise = module.exports.getmaxsessionvalue();
    initialpromise.then(function(data) {
      //console.log('value after receving id' +JSON.stringify(data));
      for (var i in data) {
        sessionid = data[i].SessionId + 1;
      }
      console.log("session id after increment is" + sessionid);
      for (var i = 0; i < inputjsonarray.length; i++) {
        exercise_details
          .create({
            WorkoutId: inputjsonarray[i].id,
            UserId: userid,
            NoOfSets: inputjsonarray[i].value1,
            NoOfReps: inputjsonarray[i].value2,
            Weight: inputjsonarray[i].value3,
            SessionId: sessionid
          })
          .then(function(exercise_details) {
            outputjsonarray.push(exercise_details);

            if (outputjsonarray.length === inputjsonarray.length) {
              res.status(200).send(outputjsonarray);
            }
          })
          .catch(error => res.status(400).send(error));
      }
    });
  },
  getexercisefeed(req, res) {
    //get list of people you are following
    follower_details
      .findAll({
        where: {
          FollowerId: req.params.followerid
        },
        include: [
          {
            model: user_details
          }
        ]
      })
      .then(function(follower_details) {
        console.log("Entered here");
        const responseJsonNew = [];
        const results = [];
        if (follower_details.length <= 100) {
          exercise_details
            .findAll({
              where: {
                UserId: {
                  [Op.in]: Sequelize.literal(
                    '(Select "follower_tables"."FollowingId" from follower_tables where "follower_tables"."FollowerId" = ' +
                      req.params.followerid +
                      ")"
                  )
                }
              },
              include: [
                {
                  model: user_details,
                  required: true
                },
                {
                  model: workout_details,
                  include: [category_details],
                  required: true
                }
              ],
              order: [["createdAt", "DESC"]],
              limit: 50
            })
            .then(details => module.exports.formatdata(details, res))
            .catch(error => res.status(200).send(error));
        } else if (
          follower_details.length >= 100 &&
          follower_details.length <= 200
        ) {
          exercise_details
            .findAll({
              where: {
                UserId: {
                  [Op.in]: Sequelize.literal(
                    '(Select "follower_tables"."FollowingId" from follower_tables where "follower_tables"."FollowerId" = ' +
                      req.params.followerid +
                      ")"
                  )
                },
                createdAt: {
                  [Op.gte]: moment()
                    .subtract(2, "days")
                    .toDate()
                }
              },
              include: [
                {
                  model: user_details
                }
              ],
              order: [["createdAt", "DESC"]],
              limit: 50
            })
            .then(details => res.status(200).send(details))
            .catch(error => res.status(200).send(error));
        } else {
          exercise_details
            .findAll({
              where: {
                UserId: {
                  [Op.in]: Sequelize.literal(
                    '(Select "follower_tables"."FollowingId" from follower_tables where "follower_tables"."FollowerId" = ' +
                      req.params.followerid +
                      ")"
                  )
                },
                createdAt: {
                  [Op.gte]: moment()
                    .subtract(1, "days")
                    .toDate()
                }
              },
              include: [
                {
                  model: user_details
                }
              ],
              order: [["createdAt", "DESC"]],
              limit: 50
            })
            .then(details => res.status(200).send(details))
            .catch(error => res.status(200).send(error));
        }
      })
      .catch(error => res.status(200).send(error));
  },

  listexerciseforuser(req, res) {
    exercise_details
      .findAll({
        where: { UserId: req.params.userid },
        attributes: [
          [Sequelize.fn("DISTINCT", Sequelize.col("SessionId")), "SessionId"]
        ]
      })
      .then(function(exercise_detailsNew) {
        const jsonTemp = [];
        const promisearray = [];
        for (var i in exercise_detailsNew) {
          promisearray.push(
            module.exports.getsessiondata(exercise_detailsNew[i].SessionId)
          );
        }
        var results = Promise.all(promisearray); // pass array of promises

        results.then(data => res.status(200).send(data));
      });
  },
  getanalysisexercise(req, res) {
    exercise_details
      .findAll({
        where: { UserId: req.params.userid, WorkoutId: req.params.workoutid }
      })
      .then(function(exercise_detailsNew) {
        res.status(200).send(exercise_detailsNew);
      })
      .catch(error => res.status(400).send(error));
  },

  /*	for(var i in exercise_detailsNew)
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
			resolve();
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
    .catch(error => res.status(400).send(error)); */

  getsessiondata(sessionid) {
    console.log("entered session" + sessionid);
    return new Promise(function(resolve, reject) {
      exercise_details
        .findAll({
          where: { SessionId: sessionid },
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
          const responseJson = {
            sessionid: 0,
            firstname: "",
            lastname: "",
            jsonArray: []
          };
          responseJson.sessionid = sessionid;
          responseJson.firstname = details[0].User_Detail.FirstName;
          responseJson.lastname = details[0].User_Detail.LastName;
          for (var i in details) {
            var jsonTemp = {
              noofsets: 0,
              noofreps: 0,
              weight: 0,
              workoutname: "",
              workoutid: 0,
              cardio: ""
            };
            jsonTemp.noofsets = details[i].NoOfSets;
            jsonTemp.noofreps = details[i].NoOfReps;
            jsonTemp.weight = details[i].Weight;
            (jsonTemp.workoutid = details[i].id),
              (jsonTemp.workoutname = details[i].Workout_table.WorkoutName);
            var categoryId = details[i].Workout_table.CategoryId;
            if (categoryId === 8) {
              jsonTemp.cardio = "true";
            } else {
              jsonTemp.cardio = "false";
            }

            responseJson.jsonArray.push(jsonTemp);
          }
          resolve(responseJson);
        });
    });
  },

  getmaxsessionvalue() {
    return new Promise(function(resolve, reject) {
      exercise_details
        .findAll({
          attributes: [
            [Sequelize.fn("MAX", Sequelize.col("SessionId")), "SessionId"]
          ]
        })
        .then(sessionid => resolve(sessionid));
    });
  },
  formatdata(details, res) {
    try {
      const responsejsontemp = [];
      for (var j in details) {
        var jsonTemp = {
          username: "",
          id: 0,
          firstname: "",
          lastname: "",
          userimage: "",
          noofsets: 0,
          noofreps: 0,
          weight: 0,
          workoutname: "",
          categoryname: "",
          categoryurl: "",
          createddate: "",
          sessionid: 0
        };
        jsonTemp.id = details[j].id;
        jsonTemp.username = details[j].User_Detail.UserName;
        jsonTemp.firstname = details[j].User_Detail.FirstName;

        jsonTemp.lastname = details[j].User_Detail.LastName;

        jsonTemp.userimage = details[j].User_Detail.ImageUrl;

        jsonTemp.noofsets = details[j].NoOfSets;

        jsonTemp.noofreps = details[j].NoOfReps;

        jsonTemp.weight = details[j].Weight;

        jsonTemp.createddate = details[j].createdAt;
        jsonTemp.sessionid = details[j].SessionId;

        jsonTemp.workoutname = details[j].Workout_table.WorkoutName;

        jsonTemp.categoryname =
          details[j].Workout_table.Workout_Category.CategoryName;

        jsonTemp.categoryurl =
          details[j].Workout_table.Workout_Category.ImageUrl;

        responsejsontemp.push(jsonTemp);
      }

      res.status(200).send(responsejsontemp);
    } catch (error) {
      console.log("entered in error");
      console.log(error);
    }
  }
};
