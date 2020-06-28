const bcrypt = require('bcrypt');
const { SALT = 10 } = process.env
const uuid = require('uuid');

const defaultFields = {
    code: null,
    email: null,
    name: null,
    password: null
}


async function userFactory(user = defaultFields , omitPassword = false) {

    function getCode() {
        return user.code || uuid.v4()
    }

    async function hashPassword() {
        if (!user.password) return null;
         
        return bcrypt.hash(user.password, SALT);
    }

    let password = await hashPassword();


    let userCreated = {
        ...user,
        code: getCode(),
    }
    
    if(!omitPassword) { 
        Object.assign(userCreated, { password });
    } else { 
        delete userCreated.password; 
    }

    return userCreated
}


module.exports = userFactory; 