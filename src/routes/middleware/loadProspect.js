const { findByCode } = require('../../repository/prospects')
const prospectFactory = require('../../factory/prospect')
module.exports =  async (req, res, next) => { 
    const { params } = req; 

    const prospect = prospectFactory(await findByCode(params.code));

    if (!prospect) { 
        return res.status(404).send('Prospect not found'); 
    }

    req.$prospect =  prospect;

    next(req, res);
}