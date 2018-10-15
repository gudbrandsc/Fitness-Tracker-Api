const usercontroller = require("../controllers").user_details;
const userlogin = require("../controllers").user_login;
const categorycontroller = require("../controllers").workout_categories;
const workoutcontroller = require("../controllers").workout_details;

module.exports = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the Fitness Tracker API!"
    })
  );
   
  
  app.get("/api/user_details/:userid", usercontroller.retrieve);
  app.post("/api/userregistration", usercontroller.create);
  app.post("/api/userregistration/:userid/update", usercontroller.update);
  app.post("/api/userlogin", userlogin.login);
  app.get("/api/workoutcategories", categorycontroller.getall);
  app.get("/api/getworkouts/:categoryid", categorycontroller.retrieve);
  app.post("/api/createworkout", workoutcontroller.create);
  app.get("/api/getallworkouts", workoutcontroller.getall);
  app.get("/api/getworkoutbyid/:workoutid", workoutcontroller.retrieve);
};
