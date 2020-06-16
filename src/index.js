const express = require('express');
const app = express();
const routes = require('./routes');
const PORT = process.env.PORT || 3000;
const configDB = require('./config/db')
require("dotenv-safe").config();
const session = require('express-session');
const connectSession = require('./config/redis')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(connectSession(session)));

app.use('/', routes);
app.listen(PORT, async () => {
    await configDB();
});

module.exports = app;

