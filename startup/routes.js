const express = require("express");

const auth = require("../routes/auth");
const todo = require("../routes/todo");
const passwordReset = require("../routes/passwordReset");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());

  app.use("/api/auth", auth);
  app.use("/api/todo", todo);
  app.use("/api/password-reset", passwordReset);

  app.use(error);
};
