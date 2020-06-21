const express = require("express");
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 8080;
const configDB = require("./config/db");
require("dotenv-safe").config({
  allowEmptyValues: true,
});
const session = require("express-session");
const connectSession = require("./config/redis");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(connectSession(session)));

app.use("/", routes);
app.listen(PORT, async () => {
  await configDB();
});

module.exports = app;
