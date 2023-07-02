//@ts-check
// eslint-disable-next-line no-unused-vars
const { query, mysql } = require("../db");
const utilObj = require("../util/object");

/**
 * @typedef {import('mysql2')} mysql
 */

/**
 * @typedef {Object} Todo
 * @property {number} id
 * @property {string} description
 * @property {boolean} completed
 * @property {Date} created_date
 * @property {Date} delete_date
 */

/**
 * @typedef {Omit<Todo, 'id' | 'completed' >} CreateTodo
 */

/**
 * @param {number} limit
 * @param {number} offset
 * @returns {Promise<Todo[]>}
 */
async function findAll(limit = Number.MAX_SAFE_INTEGER, offset = 0) {
  const [rows] = await query(
    `
    SELECT * FROM todos 
    INNER JOIN (
      SELECT id FROM todos 
      WHERE delete_date IS NULL
      ORDER BY id LIMIT ? OFFSET ?
    ) AS tmp USING (id)`,
    [limit, offset]
  );
  return /** @type {Todo[]}*/ (rows);
}

/**
 *
 * @param {Todo["id"]} id
 * @returns {Promise<Todo>}
 */
async function findById(id) {
  const [rows] = await query(
    "SELECT * FROM todos WHERE id = ? AND delete_date IS NULL",
    [id]
  );
  return /** @type {Todo}*/ (rows[0]);
}

/**
 *
 * @param {CreateTodo} description
 * @returns {Promise<Todo["id"]>}
 */
async function create(description) {
  const [result] = /** @type {mysql.OkPacket[]} */ (
    await query("INSERT INTO todos SET ?", [description])
  );

  return result.insertId;
}

//TODO: insert ignore

/**
 *
 * @param {Partial<Todo>} todo
 * @param {Todo["id"]} id
 */
async function update(todo, id) {
  const [result] = /** @type {[mysql.ResultSetHeader, any]} */ (
    await query("UPDATE todos SET ? WHERE id = ?", [
      utilObj.objectWithoutProperties(todo, [
        "id",
        "created_date",
        "delete_date",
      ]),
      id,
    ])
  );

  if (result.affectedRows === 0) throw new Error("NoRowsAffected");
}

/**
 *
 * @param {Partial<Todo> & {id: Todo["id"]}} todo
 * @param {Todo["id"]} id
 * @returns {Promise<Todo>}
 */
async function updateAndSelect(todo, id) {
  const [result] =
    /** @type {[[mysql.ResultSetHeader, mysql.RowDataPacket[]], any]} */ (
      await query(
        `UPDATE todos SET ? WHERE id = ?;
        SELECT * FROM todos WHERE id = ?;
        `,
        [utilObj.objectWithoutProperties(todo, ["id"]), id, id]
      )
    );

  if (result[0].affectedRows === 0) throw new Error("NoRowsAffected");
  return /** @type {Todo}*/ (result[1][0]);
}

/**
 *
 * @param {Todo["id"]} id
 */
async function destroy(id) {
  const [result] = /** @type {[mysql.ResultSetHeader, any]} */ (
    await query("DELETE FROM todos WHERE id = ?", [id])
  );

  console.log(result);
  if (result.affectedRows === 0) throw new Error("NoRowsAffected");
}

/**
 *
 * @param {number} id
 */
async function markAsDelete(id) {
  const [result] = /** @type {[mysql.ResultSetHeader, any]} */ (
    await query("UPDATE todos SET delete_date=? WHERE id = ?", [new Date(), id])
  );

  if (result.affectedRows === 0) throw new Error("NoRowsAffected");
}

module.exports = {
  create,

  findAll,
  findById,

  update,
  updateAndSelect,

  destroy,
  markAsDelete,
};
