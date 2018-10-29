const usercontroller = require("../controllers").user_details;
const userlogin = require("../controllers").user_login;
const categorycontroller = require("../controllers").workout_categories;
const workoutcontroller = require("../controllers").workout_details;
const exercisecontroller = require("../controllers").exercise_details;
const followercontroller = require("../controllers").follower_details;
const awardbadge = require("../controllers").award_badge;
const userjournal = require("../controllers").user_journal;
const forgottenpassword = require("../controllers").forgotten_password;
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();
const multer = require("multer"); // file storing middleware
var upload = multer({ dest: "uploads/" });
const expensecontroller = require("../controllers").expense_details;

module.exports = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the Fitness Tracker API!"
    })
  );

  app.get("/api/user_details/:userid", usercontroller.retrieve);
  app.post("/api/userregistration", usercontroller.create);
  app.post("/api/userregistration/:userid/update", usercontroller.update);
  app.post(
    "/api/uploadfile",
    upload.single("image"),
    usercontroller.uploadimage
  );
  app.get("/api/exercisehistory/:userid", usercontroller.listexerciseforuser);
  app.get("/api/searchuser/:name/:userid", usercontroller.listuserbyname);
  app.post("/api/userlogin", userlogin.login);
  app.get("/api/workoutcategories", categorycontroller.getall);
  app.get("/api/getworkouts/:categoryid", categorycontroller.retrieve);
  app.post("/api/createworkout", workoutcontroller.create);
  app.get("/api/getallworkouts", workoutcontroller.getall);
  app.get("/api/getworkoutbyid/:workoutid", workoutcontroller.retrieve);
  app.post("/api/newexercise", exercisecontroller.create);
  app.get(
    "/api/createfollower/:followerid/:followingid",
    followercontroller.create
  );
  app.get("/api/listfollows/:followerid", followercontroller.listfollows);
  app.get("/api/listfollowers/:followingid", followercontroller.listfollowers);
  app.get(
    "/api/removefollower/:followerid/:followingid",
    followercontroller.destroy
  );
  app.post("/api/createbadge", awardbadge.create);
  app.get("/api/getbadges/:userid", awardbadge.retrieve);
  app.post("/api/awardbadge", awardbadge.awardbadge);
  app.post("/api/appendjournal", userjournal.create);
  app.get("/api/getjournalentries/:userid", userjournal.retrieve);
  app.post("/api/updatejournal", userjournal.update);
  app.get(
    "/api/getnooffollowers/:followingid",
    followercontroller.getfollowers
  );
  app.post("/api/getnewpassword", forgottenpassword.passwordreset);
  app.post("/api/updatepassword", forgottenpassword.updatepassword);
  app.post("/api/createexpense", expensecontroller.create);
  app.get("/api/getexpense/:userid", expensecontroller.retrieve);
};
