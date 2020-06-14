const db = require('../../repository/prospects')
const prospectFactory = require('../../factory/prospect')
module.exports = async (req, res, next) => {
    const { code } = req.params
    let dbProspect = await db.findByCode(code);

    if (!dbProspect) { 
        return res.status(404).send('Prospect not found');
    }

    req.$prospect = prospectFactory(dbProspect);
    req.$prospectCode = req.$prospect.code; 
    next();
}