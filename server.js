const express = require("express");

const server = express();
server.use(express.json());

//Projects Router
const projectsRouter = require("./routes/projectsRouter");
server.use("/api/projects", logger, projectsRouter);

//Actions Router
const actionsRouter = require("./routes/actionsRouter");
server.use("/api/actions", logger, actionsRouter);

server.get("/", (req, res) => {
  const message = process.env.MESSAGE || "Sprint 4.1";
  res.status(200).json({ message });
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} ${req.get(
      "Origin"
    )}`
  );
  next();
}

module.exports = server;
