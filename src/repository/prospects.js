const repository = require('../repository/generic');
const { MODEL: model } = require('../model/prospect');
const prospectFactory = require('../factory/prospect');

async function find(query = {}) {
    const { name = '', college = '', year, position } = query
    let filters = {
        year: year,
        position: position
    };

    if (name.length) {
        Object.assign(filters, {
            name: { $regex: name, $options: 'i' },
        })
    }

    if (college.length) {
        Object.assign(filters, {
            college: { $regex: college, $options: 'i' },
        })
    }

    return repository.find({ model, query: removeUnusedFilters(filters) });
}

async function findByCode(code) {
    return repository.findOneByCode({ model, code });
}


async function update(prospect) {
    return repository.update({ model, body: prospect })
}

async function create(body) {
    return repository.create({ model, body: prospectFactory(body) });
}

async function remove(code) {
    return repository.remove({ model, code });
}

function removeUnusedFilters(filters) {
    for (let filter of Object.keys(filters)) {
        if (filters[filter] === undefined || filters[filter] === null) {
            delete filters[filter];
        }
    }

    return filters;
}


module.exports = {
    find, create, findByCode, update, remove
}