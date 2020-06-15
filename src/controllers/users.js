const userFactory = require('../factory/user')
const db = require('../repository/users');
const bcrypt = require('bcrypt');
async function create(req, res, next) { 
    const { body } = req; 
    const user = await userFactory(body);
    try { 
        await db.create(user);

        return res.status(201).send();
    } catch(error) { 
        return res.status(400).send(error);
    }
}

async function login(req, res) { 
    const { body } = req; 
    
    let response = await db.findUserByEmail(body.email);
    if (!response){ 
        return res.status(404).send('User not found'); 
    }
    
    if (!(await validatePassword(body.password , response.password))){ 
        return res.status(403).send("User and password doesnt match");
    }

    return res.status(200).json({ 
        user: { 
            email: body.email
        }, 
        token: 'temp_token'
    })

}



async function validatePassword(password, hash) { 
    return bcrypt.compare(password, hash)
}

module.exports = { 
    create, validatePassword, login
};