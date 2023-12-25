const { Schema, model } = require("mongoose");

const AbilityScore = new Schema({
  _id: String,
  proficient: {
    type: Number,
    require: true
  }
});

module.exports = AbilityScore;