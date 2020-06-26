const { MODEL: model } = require('../model/evaluation');
const repository = require('../repository/generic')(model);
const evaluationFactory = require('../factory/evaluation');

async function create(evaluation) { 
    return repository.create(evaluationFactory(evaluation))
}

module.exports = {
    create
}
