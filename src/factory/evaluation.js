const uuid = require('uuid');
const prospectDB = require('../repository/prospects');
const userDB = require('../repository/users');
const userFactory = require('./user')
const prospectFactory = require('./prospect');
module.exports = async (evaluationInfo = {}) => { 
    function generateCode() { 
        return evaluationInfo.code || uuid.v4()
    }

    async function findUser() { 
        return userDB.findPublicUserInfo(evaluationInfo.userCode);
    }

    async function findProspect() { 
        return prospectDB.findByCode(evaluationInfo.prospectCode);
    }

    let _prospect = await findProspect();
    let _user = await findUser();
    
    if (!_user && process.env.NODE_ENV !== 'test'){ 
        throw 'User not found';
    }

    if (!_prospect && process.env.NODE_ENV !== 'test') { 
        throw 'Invalid prospect';
    }

    return { 
        code: generateCode(),
        ...evaluationInfo,
        _prospect,
        _user
    }
}