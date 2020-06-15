const ProspectModel = require('./prospect');
const UserModel = require('./user')


module.exports = async () => {
    Promise.all([
        ProspectModel.model.createCollection().catch(() => {}), 
        UserModel.model.createCollection().catch(() => {}),
    ])
}