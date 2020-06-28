const db = require("../../repository/evaluations");
const factory = require('../../factory/evaluation')
module.exports = async (req, res, next) => {
    const { code } = req.params; 
    const evaluation = await db.findOne(code)

    if (!evaluation) { 
        return res.status(404).send('Evaluation not found');
    }

    req.$evaluation = await factory(evaluation); 
    req.$evaluationCode = evaluation.code;

    next();
 }