const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");

const { todoTable, todoDetailTable } = require("./database/table");
const routes = require("./routes");

const app = express();
const PORT = 4500;
const server = http.createServer(app);

todoTable(); // execute some table
todoDetailTable();

app.use(cors());
app.use(bodyParser.json());

app.use(routes);

server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
