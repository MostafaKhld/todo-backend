const Joi = require("joi");
const mongoose = require("mongoose");

const Todo = mongoose.model(
  "Todo",
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

    priority: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
  })
);

function validateTodo(Todo) {
  const schema = {
    title: Joi.string().min(5).max(255).required(),
    description: Joi.string().min(5).max(255).required(),
    title: Joi.string().min(5).max(255).required(),
    priority: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(Todo, schema);
}

exports.Todo = Todo;
exports.validate = validateTodo;
