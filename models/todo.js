const Joi = require("joi");
const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
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
    minlength: 4,
    maxlength: 255,
    default: "TODO",
    enum: ["TODO", "IN progress", "Under review", "Rework", "Completed "],
  },

  priority: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 6,
    enum: ["High", "Medium", "Low"],
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

function validateTodo(todo) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    description: Joi.string().min(5).max(255).required(),
    title: Joi.string().min(5).max(255).required(),
    priority: Joi.string().min(3).max(6).required(),
    status: Joi.string(),
  });

  return schema.validate(todo);
}

exports.Todo = Todo;
exports.validate = validateTodo;
