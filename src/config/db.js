const mongoose = require('mongoose');
const models = require('../model/')
const configDatabase = async (db) => {

    if (db) {
        return db;
    }
    const { DB_PORT = 27017, DB_NAME = 'prospects_db', DB_HOST = '127.0.0.1' } = process.env
    let connection = await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, { useNewUrlParser: true });
    await models();
    return connection;
}

module.exports = configDatabase;