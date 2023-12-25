const { Schema, model } = require("mongoose");
const Treasure = require("./Treasure");

const Spell = new Schema({
  castingTime: {
    type: Number,
    require: Treasure
  },
  description: {
    type: String,
  },
  duration: {
    type: Number,
    require: Treasure
  },
  durationType: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  range: {
    type: Number,
    require: Treasure
  },
});

module.exports = Spell;