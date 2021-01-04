const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const MODEL = "EvaluationProspects";

const Evaluation = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    prospectCode: {
      type: String,
      required: true
    },
    userCode: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    skills: {
      type: Array,
      required: true
    },
    overall: {
      type: Number,
      required: true,
    },
    hasRedFlag: {
      type: Boolean,
      default: false,
    },
    redFlag: {
      type: String,
    },
  },
  { collection: MODEL }
);
Evaluation.index({ code: 1 }, { unique: true });
Evaluation.index({ prospectCode: 1 });
Evaluation.index({ userCode: 1 });
Evaluation.index({ prospectCode: 1, userCode: 1 } , { unique: true });
Evaluation.index({ bestSkills: 1 });
Evaluation.index({ worstSkills: 1 });
module.exports = {
  schema: Evaluation,
  MODEL,
  model: mongoose.model(MODEL, Evaluation),
};
