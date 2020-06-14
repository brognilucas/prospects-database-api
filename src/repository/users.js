const repository = require('../repository/generic');
const { MODEL: model } = require('../model/user');
const mongoose = require('mongoose')
async function find() {
    return repository.find({ model })
}

async function create(user) {
    return repository.create({ model, body: user });
}

async function update(user) {
    return repository.update({ model, body: user });
}

async function findOne(code) {
    return repository.findOneByCode({ model, code });
}

async function remove(code) {
    return repository.remove({ model, code });
}

async function findUserByEmail(email) {
    return mongoose.model(model).findOne({ email }).lean().exec()
}

module.exports = {
    create, update, remove, findOne, find, findUserByEmail
}