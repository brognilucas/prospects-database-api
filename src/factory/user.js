const bcrypt = require('bcrypt');
const { SALT = 10 } = process.env
const uuid = require('uuid');

const defaultFields = {
    code: null,
    email: null,
    name: null,
    password: null
}


async function userFactory({password , ...user} = defaultFields , omitPassword = false) {

    function getCode() {
        return user.code || uuid.v4()
    }

    async function hashPassword() {
        if (!password) return null;
         
        return bcrypt.hash(password, SALT);
    }

    
    if (!password && !omitPassword) { 
        password = await hashPassword();
    }
    
    let userCreated = {
        ...user,
        code: getCode(),
    }
    if(!omitPassword) { 
        Object.assign(userCreated, { password });
    }

    return userCreated
}


module.exports = userFactory; 