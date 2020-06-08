const ProspectModel = require('./prospect');



module.exports = async () => {

    Promise.all([
        ProspectModel.model.createCollection()
    ])
}