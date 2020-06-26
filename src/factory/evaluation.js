const uuid = require('uuid');

module.exports = (prospectInfo = {}) => { 
    function generateCode() { 
        return prospectInfo.code || uuid.v4()
    }

    return { 
        code: generateCode(),
        ...prospectInfo,
    }
}