const express = require("express");
const app = express();

const userRoutes = require("./src/routes/Auth");
const taskRoutes = require("./src/routes/Tasks");

[userRoutes, taskRoutes].forEach((apiRoutes) =>
  app.use("/api/v1", apiRoutes)
);
module.exports = app;
