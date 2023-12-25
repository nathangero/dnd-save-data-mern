const { Schema, model } = require("mongoose");

const FeatureTrait = new Schema({
  actionType: {
    type: String,
  },
  description: {
    type: String
  },
  name: {
    type: String,
    require: true
  },
  traitType: {
    type: String,
    require: true
  },
  uses: {
    type: Number,
    require: true
  }
});

module.exports = FeatureTrait;