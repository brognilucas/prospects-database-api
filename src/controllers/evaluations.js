const db = require("../repository/evaluations");

async function create(req, res) {
  const { body, $userCode: userCode } = req;
  let evaluation = { ...body, userCode };
  await db.create(evaluation);

  return res.status(201).end();
}

async function get(req, res) {
  const { prospectId } = req.params;
  let evaluations = await db.find(prospectId);

  return res.status(200).json({evaluations});
}

async function getById(req, res) { 
    const { $evaluation: evaluation } = req; 
    return res.status(200).json(evaluation);
} 


async function update(req, res) { 
    const { body, $evaluationId: id } = req; 

    await db.update(body, id);

    return res.status(204).end();
}

async function remove(req, res){
  const { id } = req.params; 
  await db.remove(id);

  return res.status(204).end()
}

module.exports = {
  create,get, getById, update, remove
};
