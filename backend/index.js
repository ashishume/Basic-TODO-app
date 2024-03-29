const express = require("express");
const app = express();
const port = 4000;
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
require("./src/controllers/db-connect");
app.use(cookieParser());

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);
//define all the routes index
app.use(routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
