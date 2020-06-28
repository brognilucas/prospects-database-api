const { MODEL: model } = require("../model/evaluation");
const repository = require("../repository/generic")(model);

async function create(evaluation) {
  return repository.create(evaluation);
}

async function findByProspect(prospectCode) {
  return repository.find({ prospectCode });
}

async function find(filter = {}) {
  return repository.find(filter);
}

async function findById(id) {
  return repository.db.findById(id).lean().exec();
}

async function findOne(code) {
  return repository.findOneByCode(code);
}

async function update(evaluation, code) {
  return repository.update(evaluation, { code });
}

async function remove(code) {
  return repository.remove(code);
}

module.exports = {
  create,
  find,
  findById,
  update,
  remove,
  findOne,
  findByProspect
};
