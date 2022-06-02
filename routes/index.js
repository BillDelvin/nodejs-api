const express = require("express");
const app = express();
const todoRoutes = require("./todo-list");

const api = "/api/v1";

app.use(api, todoRoutes);

module.exports = app;
