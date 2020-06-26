const db = require('../repository/evaluations');


async function create(req, res) { 
    const { body, $userCode: userCode } = req; 
    let evaluation = { ...body, userCode } ;
    await db.create(evaluation);

    return res.status(201).end();
}

module.exports = {
    create
}