const redis = require('redis');
const session = require('express-session');
const redisStore = require('connect-redis');

function connectSession() {
    let store = redisStore(session);
    const client = redis.createClient();
    return {
        secret: process.env.SESSION_SECRET,
        store: new store({ client: client, ttl: 3600 }),
        saveUninitialized: false,
        resave: false
    }
}

module.exports = connectSession