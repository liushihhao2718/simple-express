//@ts-check
const { pool } = require("../db");
const utilObj = require("../util/object");

/**
 * @typedef {Object} Todo
 * @property {number} id - The unique identifier of the todo item.
 * @property {string} description
 * @property {boolean} completed
 */

/**
 * @typedef {Object} CreateTodo
 * @property {string} description - The description of the todo item.
 */

module.exports = { findAll, findById, create, update, destroy };

/**
 *
 * @returns {Promise<Todo[]>}
 */
async function findAll() {
  const poolPromise = pool;
  const [rows] = await poolPromise.query("SELECT * FROM todos");
  // @ts-ignore
  return rows;
}

/**
 *
 * @param {Todo["id"]} id
 * @returns {Promise<Todo>}
 */
async function findById(id) {
  const poolPromise = pool;
  const [rows] = await poolPromise.query("SELECT * FROM todos WHERE id = ?", [
    id,
  ]);
  // @ts-ignore
  return rows;
}

/**
 *
 * @param {CreateTodo} description
 * @returns {Promise<Todo["id"]>}
 */
async function create(description) {
  const poolPromise = pool;

  const [result] = /** @type {import('mysql2').OkPacket[]} */ (
    await poolPromise.query("INSERT INTO todos SET ?", [description])
  );

  return result.insertId;
}

/**
 *
 * @param {Partial<Todo> & {id: Todo["id"]}} description
 * @returns {Promise<Todo["id"]>}
 */
async function update(description) {
  const poolPromise = pool;

  const [result] = /** @type {import('mysql2').OkPacket[]} */ (
    await poolPromise.query("UPDATE todos SET ? WHERE id = ?", [
      utilObj.objectWithoutProperties(description, ["id"]),
      description.id,
    ])
  );

  return result.insertId;
}

/**
 *
 * @param {Todo["id"]} id
 * @returns {Promise<boolean>}
 */
async function destroy(id) {
  const poolPromise = pool;

  const [result] = /** @type {import('mysql2').OkPacket[]} */ (
    await poolPromise.query("DELETE FROM todos WHERE id = ?", [id])
  );

  return result.affectedRows > 0;
}
