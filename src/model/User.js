/**
 * @typedef UserDAO
 * @property {number} id
 * @property {string} name
 */

/** @typedef {Omit<UserDAO, 'id'>} UserDAOCreationAttributes */

const a = /** @type {UserDAO} */({});
const b = /** @type {UserDAOCreationAttributes} */({});
