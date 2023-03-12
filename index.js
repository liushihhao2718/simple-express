//@ts-check
require("dotenv").config();
require("./src/db");
const express = require("express");
const bodyParser = require('body-parser');
require("express-async-errors");

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use( (req, res, next) => {
  
  console.log('Request Body:', req.body);
  let oldSend = res.send;
  res.send = function(data) {
    console.log(data); // do something with the data
    res.send = oldSend; // set function back to avoid the 'double-send'
    return res.send(data); // just call as normal with data
  };
  next();
  
});

app.use("/api/todo", require("./src/router/Todo.router"));

app.use((err, req, res, next) => {
  if (err) {
    res.status(500);
    res.json({ error: err.message });
  }
  next(err);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
