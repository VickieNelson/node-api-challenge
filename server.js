const express = require("express");
const cors = require("cors");
const server = express();

// const projectsRouter = require("./api/projects");
// const actionsRouter = require("./api/actions");
server.use(express.json());
server.use(cors());

// server.use("/api/projects", projectsRouter);
// server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send(`<h3>Sprint1: Node API challenge</h3>`);
});

module.exports = server;
