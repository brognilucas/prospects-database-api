const mongoose = require('mongoose');

async function find({ model, query = {} }) {
    return mongoose.model(model).find(query).lean().exec()
}


module.exports = {
    find
}