const express = require("express");
const app = express();

const {
  created,
  getAll,
  updated,
  deleted,
} = require("../controllers/todo-list");

// GET , POST , PUT/PATCH, DELETE
app.post("/todo", created);
app.get("/todo", getAll);
app.put("/todo/:todoId", updated);
app.delete("/todo/:todoId", deleted);

module.exports = app;
