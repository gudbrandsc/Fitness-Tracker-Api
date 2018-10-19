const user_details = require("./userregistration");
const user_login = require("./userlogin");
const workout_categories = require("./workoutcategories");
const workout_details = require("./workoutcreation");
const exercise_details = require("./exercisedetails");
const journal_details = require("./journalcreation");
const follower_details = require("./followercreation");

module.exports = {
  user_details,
  user_login,
  workout_categories,
  workout_details,
  exercise_details,
  journal_details,
  follower_details,
};
