const { Schema, model } = require("mongoose");

const deathSaves = new Schema({
  failures: {
    type: Int,
    required: true
  },
  successes: {
    type: Int,
    required: true
  },
});

module.exports = deathSaves;