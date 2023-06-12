const mysql = require("mysql2");
const dedent = require("dedent");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_ROOT_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: true,
  timezone: "+08:00",
  typeCast: function (field, next) {
    if (field.type == "TINY" && field.length == 1) {
      return field.string() == "1"; // 1 = true, 0 = false
    }

    return next();
  },
});

module.exports.pool = pool.promise();
module.exports.mysql = mysql;
module.exports.query = query;

/**
 * @param {string} sql
 * @param {any[]} [values]
 * @returns {T extends RowDataPacket[][] 
 * | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader}
 */
async function query(sql, values) {
  console.log(dedent(mysql.format(sql, values)));
  return pool.promise().query(dedent(sql), values);
}
