const user_details = require("./userregistration");
const user_login = require("./userlogin");
const workout_categories = require("./workoutcategories");
const workout_details = require("./workoutcreation");
const exercise_details = require("./exercisedetails");
const follower_details = require("./followercreation");
const award_badge = require("./awardbadge");
const user_journal = require("./userjournal");
const forgotten_password = require("./forgotpassword");

module.exports = {
  user_details,
  user_login,
  workout_categories,
  workout_details,
  exercise_details,
  follower_details,
  award_badge,
  user_journal,
  forgotten_password
};
