const { Todo, validate } = require("../models/todo");
const { verifyToken: auth } = require("../middleware/auth");
const express = require("express");
const _ = require("lodash");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const todos = await Todo.find().select("-__v").sort("priority");
  // const todos = await Todo.find().select("-__v").sort("priority");
  var obj = {};
  let AllTodos = [];
  let bundle = _(todos).groupBy("status").value();
  for (let index = 0; index < Object.keys(bundle).length; index++) {
    // console.log(Object.keys(bundle)[index]);
    // console.log(Object.values(bundle)[index]);
    let name = Object.keys(bundle)[index].toString();
    // console.log(name);
    // console.log(bundle[name]);
    // bundle[Object.keys(bundle)[index]].title = Object.keys(bundle)[index];
    // console.log(bundle[Object.keys(bundle)[index]].title);
    obj[name] = {
      items: Object.values(bundle)[index],
      title: Object.keys(bundle)[index],
    };
  }
  //   const result = _.flatMap(AllTodos, ({ name, tags }) =>
  //   _.map(tags, tag => ({ name, ...tag }))
  // );
  res.send(obj);
});

router.post("/", auth, async (req, res) => {
  console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
  });
  todo = await todo.save();

  res.send(todo);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      priority: req.body.priority,
    },
    { new: true }
  );

  if (!todo)
    return res.status(404).send("The todo with the given ID was not found.");

  res.send(todo);
});

router.delete("/:id", auth, async (req, res) => {
  const todo = await Todo.findByIdAndRemove(req.params.id);

  if (!todo)
    return res.status(404).send("The todo with the given ID was not found.");

  res.send(todo);
});

router.get("/:id", auth, async (req, res) => {
  const todo = await Todo.findById(req.params.id).select("-__v");

  if (!todo)
    return res.status(404).send("The todo with the given ID was not found.");

  res.send(todo);
});

module.exports = router;
