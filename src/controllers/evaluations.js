const db = require("../repository/evaluations");
const factory = require('../factory/evaluation');
async function create(req, res) {
  const { body, $userCode: userCode } = req;
  let evaluation =  await factory({ ...body, userCode });

  await db.create(evaluation);

  return res.status(201).end();
}

async function get(req, res) {
  const { prospectCode } = req.params;
  let evaluations = await db.find(prospectCode);

  return res.status(200).json({evaluations});
}

async function getByCode(req, res) { 
    const { $evaluation: evaluation } = req; 
    return res.status(200).json(evaluation);
} 


async function update(req, res) { 
    const { body, $evaluationCode: code } = req; 
    await db.update(body, code);
    return res.status(204).end();
}

async function remove(req, res){
  const { code } = req.params; 
  await db.remove(code);

  return res.status(204).end()
}

module.exports = {
  create,get, getByCode, update, remove
};
