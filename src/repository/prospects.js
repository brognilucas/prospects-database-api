const { find: findGeneric } = require('../repository/generic');
const { MODEL } = require('../model/prospect')

async function find (query) { 
    return findGeneric({ model: MODEL , query });
}

module.exports = {
    find 
}