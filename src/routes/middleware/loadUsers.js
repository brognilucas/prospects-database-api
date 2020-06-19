const db = require('../../repository/users')
const userFactory = require('../../factory/user')
module.exports = async (req, res, next) => {
    const { code } = req.params
    let user = await db.findOne(code);

    if (!user) { 
        return res.status(404).send('User not found');
    }

    req.$user = userFactory(user, true);
    req.$userCode = req.$user.code; 
    next();
}