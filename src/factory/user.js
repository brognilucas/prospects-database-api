const bcrypt = require('bcrypt');
const { SALT = 10 } = process.env
const uuid = require('uuid');

const defaultFields = {
    code: null,
    email: null,
    name: null,
    password: null
}


async function userFactory(user = defaultFields) {

    function getCode() {
        return user.code || uuid.v4()
    }

    async function hashPassword() {
        return bcrypt.hash(user.password, SALT);
    }

    let password = await hashPassword();
    return {
        ...user,
        code: getCode(),
        password,
    }


}


module.exports = userFactory; 