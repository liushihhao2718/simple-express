const Todo = require("../model/todo.model");

/**
 * @typedef {import("../model/todo.model").Todo} Todo
 * @typedef {import("../model/todo.model").CreateTodo} CreateTodo
 * 
 * @typedef {import('express').Request} ExpressRequest
 * @typedef {import('express').Response} ExpressResponse
 *
 * @typedef {ExpressRequest & {
 *  params : { id:string },
 *  query : {page: string},
 *  body : { }
 * }} TodoReadReq
 * 
 * @typedef {ExpressRequest & {
 *  body: CreateTodo
 * }} TodoCreateReq
 */

module.exports = { getTodos, getTodoById, createTodo };

/**
 *
 * @param {ExpressRequest} req
 * @returns {Promise<Todo>}
 */
async function getTodos(req, res) {
  const result = await Todo.findAll();

  res.json(result);
}

//TODO: pagination

/**
 * @route
 * @param {TodoReadReq} req
 * @param {ExpressResponse} res
 */
async function getTodoById(req, res) {
  const todo = await Todo.findById(req.params.id, req.query.page);
  res.json(todo);
}

/**
 * 
 * @param {TodoCreateReq} req 
 * @param {ExpressResponse} res 
 */
async function createTodo(req, res) {
  const todo_id = await Todo.create(req.body);
  res.status(201).json({ id: todo_id});
}