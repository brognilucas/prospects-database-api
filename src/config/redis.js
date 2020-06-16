const redis = require('redis');
const redisStore = require('connect-redis');
function connectSession(session) {
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