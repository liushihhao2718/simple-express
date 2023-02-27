//@ts-check
require("dotenv").config();
require("./src/db");
const express = require("express");

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  const todos = require("./src/model/TodoModel");
  const deleted = await todos.destroy(9);
  res.json({ deleted });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
