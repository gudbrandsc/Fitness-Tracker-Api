const usercontroller = require("../controllers").user_details;
const userlogin = require("../controllers").user_login;
const userfollowing = require("../controllers").user_following;

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
  app.post("/api/userfollowing", userfollowing.create);
};
