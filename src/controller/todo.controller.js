//@ts-check
const Todo = require("../model/todo.model");
const HttpError = require("http-errors");

/**
 * @typedef {import("../model/todo.model").Todo} Todo
 * @typedef {import("../model/todo.model").CreateTodo} CreateTodo
 *
 * @typedef {import('express').Request} ExpressRequest
 * @typedef {import('express').Response} ExpressResponse
 *
 * @typedef {ExpressRequest & {
 *  params : { id:number },
 * }} TodoReadItemReq
 *
 * @typedef {ExpressRequest & {
 *  query : import("../../@types/global").PaginationReq,
 * }} TodoReadPageReq
 *
 * @typedef {ExpressRequest & {
 *  body: CreateTodo,
 * }} TodoCreateReq
 *
 * @typedef {ExpressRequest & {
 *  params : { id:number },
 *  body : Partial<Todo>
 * }} TodoUpdateReq
 *
 * @typedef {ExpressRequest & {
 * params : { id:number },
 * }} TodoDeleteReq
 */

/**
 *
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 */
async function getTodos(req, res) {
  const result = await Todo.findAll();

  res.json(result);
}

/**
 *
 * @param {TodoReadPageReq} req
 * @param {ExpressResponse} res
 */
async function getTodosWithPagination(req, res) {
  const { limit, offset } = req.query;
  const result = await Todo.findAll(limit, offset);

  res.json(result);
}

/**
 * @route
 * @param {TodoReadItemReq} req
 * @param {ExpressResponse} res
 */
async function getTodoById(req, res) {
  const todo = await Todo.findById(Number(req.params.id));

  if (!todo) throw new HttpError.NotFound("Todo not found");
  res.json(todo);
}

/**
 *
 * @param {TodoCreateReq} req
 * @param {ExpressResponse} res
 */
async function createTodo(req, res) {
  const todo_id = await Todo.create(req.body);
  res.status(201).json({ id: todo_id });
}

/**
 * @route
 * @param {TodoUpdateReq} req
 * @param {ExpressResponse} res
 */
async function updateTodoById(req, res) {
  if (req.body.id) {
    if (req.body.id !== Number(req.params.id))
      throw new HttpError.BadRequest("Id in body does not match id in params");
  }
  await Todo.update(req.body, Number(req.params.id));
  const todo = await Todo.findById(Number(req.params.id));

  res.status(200).json(todo);
}

/**
 *
 * @param {TodoDeleteReq} req
 * @param {ExpressResponse} res
 */
async function deleteTodoById(req, res) {
  // await Todo.destroy(Number(req.params.id));
  await Todo.markAsDelete(Number(req.params.id));
  res.status(204).json(null);
}

module.exports = {
  getTodos,
  getTodosWithPagination,
  getTodoById,
  createTodo,
  updateTodoById,
  deleteTodoById,
};
