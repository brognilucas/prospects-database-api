const uuid = require('uuid');
const prospectDB = require('../repository/prospects')
module.exports = async (evaluationInfo = {}) => { 
    function generateCode() { 
        return evaluationInfo.code || uuid.v4()
    }

    async function findProspect() { 
        return prospectDB.findByCode(evaluationInfo.prospectCode);
    }

    let _prospect = await findProspect();

    return { 
        code: generateCode(),
        ...evaluationInfo,
        _prospect
    }
}