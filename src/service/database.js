// @ts-check
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DB,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
});

pool.on('connection', ()=> {
  console.log('db connected');
})

module.exports = {pool};
