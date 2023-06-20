//@ts-check
require("dotenv").config();
require("./src/config/timezone.js");
require("./src/db");
var cors = require('cors');
const express = require("express");
const bodyParser = require("body-parser");

require("express-async-errors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log('req', req.params, req.query, req.body);
  let oldSend = res.send;
  res.send = function (data) {
    console.log(data); // do something with the data
    res.send = oldSend; // set function back to avoid the 'double-send'
    return res.send(data); // just call as normal with data
  };
  next();
});

app.use("/api/todos", require("./src/router/Todo.router"));

//default router handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: "RouteNotFound",
      message: req.url + " not found in router.",
    },
  });
});
//default error handler
app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status ?? 500);
    res.json({
      error: {
        code: err.code ?? err.name,
        message: err.message,
        ...(process.env.MODE === "dev" && { stack: err.stack }),
      },
    });
  }
  next(err);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
