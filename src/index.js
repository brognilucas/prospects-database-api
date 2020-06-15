const express = require('express');
const app = express();
const routes = require('./routes');
const PORT = process.env.PORT || 3000;
const configDB = require('./config/db')
require("dotenv-safe").config();
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client  = redis.createClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ 
    secret: process.env.SESSION_SECRET,
    store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl : 3600}),
    saveUninitialized: false,
    resave: false
}))
app.use('/', routes);
app.listen(PORT, async () => {
    await configDB();
});

module.exports = app;

