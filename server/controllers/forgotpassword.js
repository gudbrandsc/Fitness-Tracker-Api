const user_details = require("../models").User_Details;
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

module.exports = {
  passwordreset(req, res) {
    var username = req.body.username;

    return user_details
      .find({
        where: {
          UserName: username
        }
      })
      .then(user_details => {
        var newpassword = randomstring.generate(8);
        var newhashedpassword = bcrypt.hashSync(newpassword, 8);
        var passwordmessage = "New password: " + newpassword;
        newpassword = newpassword + "1aB@";

        if (!user_details) {
          return res.status(400).send({
            message: "Username with given email does not exist"
          });
        }

        // send the email with new password
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "fitness.tracker6@gmail.com",
            pass: "Lovedeep"
          }
        });

        var mailOptions = {
          from: "fitness.tracker6@gmail.com",
          to: username,
          subject: "New Password for Fitness Tracker",
          text: passwordmessage
        };

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        return user_details
          .update({
            Password: newhashedpassword
          })
          .then(() => res.status(200).send(user_details))
          .catch(error => res.status(400).send("error = " + error));
      })
      .catch(error => res.status(400).send("error = " + error));
  },

  updatepassword(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    return user_details
      .find({
        where: {
          UserName: username
        }
      })
      .then(user_details => {
        var newhashedpassword = bcrypt.hashSync(req.body.password, 8);

        if (!user_details) {
          return res.status(400).send({
            message: "Username with given email does not exist"
          });
        }

        return user_details
          .update({
            Password: newhashedpassword
          })
          .then(() =>
            res.status(200).send({
              password: password
            })
          )
          .catch(error => res.status(400).send("error = " + error));
      })
      .catch(error => res.status(400).send("error = " + error));
  }
};
