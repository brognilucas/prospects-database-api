const db = require("../../repository/evaluations");

module.exports = async (req, res, next) => {
    const { id } = req.params; 
    const evaluation = await db.findById(id);

    if (!evaluation) { 
        return res.status(404).send('Evaluation not found');
    }

    req.$evaluation = evaluation; 
    req.$evaluationId = evaluation._id;

    next();
 }