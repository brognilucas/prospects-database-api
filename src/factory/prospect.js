const uuid = require('uuid');

const defaultFields = { 
    name: null,
    position: null, 
    college: null,
    year: null,
    height: null,
    weight: null,
    dateOfBirth: null,
    photo: null, 
}


module.exports = (prospectInfo = defaultFields) => { 
    function generateCode() { 
        return prospectInfo.code || uuid.v4()
    }

    return { 
        code: generateCode(),
        ...prospectInfo,
    }
}