const express = require("express");
const app = express();

const userRoutes = require("./src/routes/Auth");
const taskRoutes = require("./src/routes/Tasks");
const searchRoutes = require("./src/routes/SearchTasks");

[userRoutes, taskRoutes, searchRoutes].forEach((apiRoutes) =>
  app.use("/api/v1", apiRoutes)
);
module.exports = app;
