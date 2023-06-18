//@ts-check
const express = require("express");
const router = express.Router();
const TodoController = require("../controller/todo.controller");
const TodoValidator = require("../validator/todo.validator");
const {
  validateReq,
  checkPagination,
  validateSchema,
  handleNoRowsAffected,
} = require("../middleware");

// router.get("/", TodoController.getTodos);
router.get(
  "/",
  validateSchema([checkPagination]),
  validateReq,
  TodoController.getTodosWithPagination,
  handleNoRowsAffected
);

router.get(
  "/:id",
  validateSchema([TodoValidator.TodoId_schema]),
  validateReq,
  TodoController.getTodoById,
  handleNoRowsAffected
);
router.post(
  "/",
  validateSchema([TodoValidator.TodoCreateItemReq_schema]),
  validateReq,
  TodoController.createTodo
);

router.patch(
  "/:id",
  validateSchema([
    TodoValidator.TodoId_schema,
    TodoValidator.TodoUpdateItemReq_schema,
  ]),
  validateReq,
  TodoController.updateTodoById,
  handleNoRowsAffected
);

router.delete(
  "/:id",
  validateSchema([TodoValidator.TodoId_schema]),
  validateReq,
  TodoController.deleteTodoById,
  handleNoRowsAffected
);

module.exports = router;
