const express = require("express");
const router = express.Router();
const TodoController = require("../controller/todo.controller");

router.get("/", TodoController.getTodos);
router.get("/:id", TodoController.getTodoById);
router.post("/", TodoController.createTodo);

module.exports = router;