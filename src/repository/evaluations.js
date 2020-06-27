const { MODEL: model } = require('../model/evaluation');
const repository = require('../repository/generic')(model);
const evaluationFactory = require('../factory/evaluation');

async function create(evaluation) { 
    return repository.create(evaluationFactory(evaluation))
}

async function find(prospectId) { 
    return repository.find({ prospectId });
}

async function findById(id) { 
    return repository.db.findById(id).lean().exec()
}

async function update(evaluation, id) { 
    return repository.db.findByIdAndUpdate(id, { $set: evaluation }).lean().exec();
}

async function remove(id) { 
    return repository.db.findByIdAndDelete(id).lean().exec();
}

module.exports = {
    create, find, findById,update, remove
}
