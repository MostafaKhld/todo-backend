const Joi = require("joi");
const mongoose = require("mongoose");

const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },

    description: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },

    status: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
  })
);

function validateTask(Task) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
  };

  return Joi.validate(Task, schema);
}

exports.Task = Task;
exports.validate = validateTask;
