const ProspectModel = require('./prospect');
const UserModel = require('./user')
const EvaluationProspect = require('./evaluation')

module.exports = async () => {
    Promise.all([
        ProspectModel.model.createCollection().catch(() => {}), 
        UserModel.model.createCollection().catch(() => {}),
        EvaluationProspect.model.createCollection().catch(() => {}) 
    ])
}