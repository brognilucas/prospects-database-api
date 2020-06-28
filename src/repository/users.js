const { MODEL: model } = require('../model/user');
const repository = require('../repository/generic')(model);

async function find() {
    return repository.find({})
}

async function create(user) {
    return repository.create(user);
}

async function update(user) {
    return repository.update(user, { code: user.code});
}


async function findPublicUserInfo(code){ 
    return repository.db.findOne({ code } , { password: 0 });
}

async function findOne(code) {
    return repository.findOneByCode(code);
}

async function remove(code) {
    return repository.remove(code);
}

async function findUserByEmail(email) {
    return repository.db.findOne({ email }).lean().exec()
}

module.exports = {
    create, update, remove, findOne, find, findUserByEmail, findPublicUserInfo
}