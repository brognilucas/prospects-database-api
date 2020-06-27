const { MODEL: model } = require('../model/prospect');
const repository = require('../repository/generic')(model);
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

    return repository.find(removeUnusedFilters(filters));
}

async function findSummaryByCode(code){ 
    return repository.findOneByCode(code);
}

async function findByCode(code) {
    return (await repository.findOneAllowingPopulate(code)).populate('evaluations').toJSON();
}


async function update(prospect) {
    return repository.update(prospect , { code: prospect.code })
}

async function create(body) {
    return repository.create(prospectFactory(body));
}

async function remove(code) {
    return repository.remove(code);
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
    find, create, findByCode, update, remove, findSummaryByCode
}