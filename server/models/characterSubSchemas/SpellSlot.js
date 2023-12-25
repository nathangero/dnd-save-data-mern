const { Schema, model } = require("mongoose");

const SpellSlot = new Schema({
  current: {
    type: Number,
    require: true
  },
  max: {
    type: Number,
    require: true
  }
});

module.exports = SpellSlot;