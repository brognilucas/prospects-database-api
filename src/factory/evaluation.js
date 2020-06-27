const uuid = require('uuid');

module.exports = (evaluationInfo = {}) => { 
    function generateCode() { 
        return evaluationInfo.code || uuid.v4()
    }

    return { 
        code: generateCode(),
        ...evaluationInfo,
    }
}