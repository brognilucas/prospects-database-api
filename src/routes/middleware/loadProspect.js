const db = require("../../repository/prospects");
const prospectFactory = require("../../factory/prospect");
module.exports = async (req, res, next) => {
  const { query } = req;
  const { code, prospectCode } = req.params;
  let isSummary = Object.keys(query).some((key) => key === "summary");

  let dbProspect = await findDB(code || prospectCode);

  if (!dbProspect) {
    return res.status(404).send("Prospect not found");
  }

  req.$prospect = prospectFactory(dbProspect);
  req.$prospectCode = req.$prospect.code;
  next();

  function findDB(code) {
    if (isSummary) {
      return db.findSummaryByCode(code);
    }

    return db.findByCode(code);
  }
};
