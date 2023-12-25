const { Schema, model } = require("mongoose");

const DeathSaves = new Schema({
  failures: {
    type: Int,
    required: true
  },
  successes: {
    type: Int,
    required: true
  },
});

module.exports = DeathSaves;