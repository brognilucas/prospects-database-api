const uuid = require('uuid');

module.exports = (prospectInfo = {}) => { 
    function generateCode() { 
        return uuid.v4()
    }

    const props = { 
        name: null,
        position: null, 
        college: null,
        year: null,
        height: null,
        weight: null,
        dateOfBirth: null,
        photo: null, 
    }
    
    return { 
        code: !prospectInfo.code  ? generateCode() : prospectInfo.code,
        ...props,
        ...prospectInfo,
    }
}