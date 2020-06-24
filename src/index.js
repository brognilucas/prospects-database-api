const express = require("express");
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 8080;
const configDB = require("./config/db");
require("dotenv-safe").config({
  allowEmptyValues: true,
});
const cookieParser = require('cookie-parser');
const cors = require('cors')

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);
app.listen(PORT, async () => {
  await configDB();
});

module.exports = app;
