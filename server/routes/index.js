const usercontroller = require("../controllers").user_details;
const userlogin = require("../controllers").user_login;
const categorycontroller = require("../controllers").workout_categories;
const workoutcontroller = require("../controllers").workout_details;
const exercisecontroller = require("../controllers").exercise_details;
const journalcontroller = require("../controllers").journal_details;
const followercontroller = require("../controllers").follower_details;

module.exports = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the Fitness Tracker API!"
    })
  );
   
  app.get("/api/user_details/:userid", usercontroller.retrieve);
  app.post("/api/userregistration", usercontroller.create);
  app.post("/api/userregistration/:userid/update", usercontroller.update);
  app.get("/api/exercisehistory/:userid", usercontroller.listexerciseforuser);
  app.get("/api/viewjournals/:userid", usercontroller.listjournalforuser);
  app.get("/api/searchuser/:name", usercontroller.listuserbyname);
  app.post("/api/userlogin", userlogin.login);
  app.get("/api/workoutcategories", categorycontroller.getall);
  app.get("/api/getworkouts/:categoryid", categorycontroller.retrieve);
  app.post("/api/createworkout", workoutcontroller.create);
  app.get("/api/getallworkouts", workoutcontroller.getall);
  app.get("/api/getworkoutbyid/:workoutid", workoutcontroller.retrieve);
  app.post("/api/newexercise", exercisecontroller.create);
  app.post("/api/createjournal", journalcontroller.create);
  app.get("/api/createfollower/:followerid/:followingid", followercontroller.create);
  app.get("/api/listfollower/:followerid", followercontroller.listfollowers);
  app.get("/api/removefollower/:followerid/:followingid", followercontroller.destroy);
};
