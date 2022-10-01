const config = require("../config/auth.config");
const nodemailer = require("../config/nodemailer.config");

const { User, validate } = require("../models/user");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const token = jwt.sign({ email: req.body.email }, config.secret);
  const salt = await bcrypt.genSalt(10);
  console.log(req.body);
  const password = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: password,
    confirmationCode: token,
  });

  await user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({
      message: "User was registered successfully! Please check your email",
    });
    nodemailer.sendConfirmationEmail(
      user.username,
      user.email,
      user.confirmationCode
    );
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    if (user.status != "Active") {
      return res.status(401).send({
        message: "Pending Account. Please Verify Your Email!",
      });
    }

    var token = user.generateAuthToken();

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,

      accessToken: token,
      status: user.status,
    });
  });
};

exports.verifyUser = (req, res, next) => {
  User.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      user.status = "Active";
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      });
    })
    .catch((e) => console.log("error", e));
};
