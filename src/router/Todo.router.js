//@ts-check
const express = require("express");
const router = express.Router();
const TodoController = require("../controller/todo.controller");
const {
  validateReq,
  checkPagination,
  validateSchema,
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
  validateSchema([TodoController.TodoReadItemReq_schema]),
  validateReq,
  TodoController.getTodoById,
  handleNoRowsAffected
);
router.post("/", TodoController.createTodo);
router.put("/:id", TodoController.updateTodoById, handleNoRowsAffected);
router.delete("/:id", TodoController.deleteTodoById, handleNoRowsAffected);

router.get("/:a/:b", (req, res)=>{});

function handleNoRowsAffected(err, req, res, next) {
  console.log("handleNoRowsAffected", err);
  if (err.message === "NoRowsAffected") {
    err.code = "NoRowsAffected";
    err.status = 404;
    err.message = "Todo not found";
  }
  next(err);
}
module.exports = router;
