const mongoose = require('mongoose');

async function find({ model, query = {} }) {
    return mongoose.model(model).find(query).lean().exec()
}

async function findOneByCode({ model, code }){ 
    return mongoose.model(model).findOne({ code }).lean().exec()
}

async function create({ model, body}) { 
    return  mongoose.model(model).create(body)
}

module.exports = {
    find, create, findOneByCode
}