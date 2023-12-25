const { Schema, model } = require("mongoose");

const AbilityScores = new Schema({
  cha: {
    type: Number,
    required: true
  },
  con: {
    type: Number,
    required: true
  },
  dex: {
    type: Number,
    required: true
  },
  int: {
    type: Number,
    required: true
  },
  str: {
    type: Number,
    required: true
  },
  wis: {
    type: Number,
    required: true
  },
});

module.exports = AbilityScores;