const { Schema, model } = require("mongoose");

const DeathSaves = new Schema({
  failures: {
    type: Number,
    require: true
  },
  successes: {
    type: Number,
    require: true
  },
});

module.exports = DeathSaves;