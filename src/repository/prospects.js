const { find: findGeneric, create: createGeneric, findOneByCode } = require('../repository/generic');
const { MODEL: model } = require('../model/prospect');
const prospectFactory = require('../factory/prospect');
async function find(query) {
    return findGeneric({ model, query });
}

async function findByCode(code) {
    return findOneByCode({ model, code });
}

async function create(body) {
    return createGeneric({ model, body: prospectFactory(body) });
}

module.exports = {
    find, create, findByCode
}