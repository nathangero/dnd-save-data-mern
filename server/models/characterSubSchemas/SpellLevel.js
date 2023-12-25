const { Schema, model } = require("mongoose");
const Spell = require("./Spell");

const SpellLevel = new Schema({
  _id: String,
  spell: {
    type: [Spell],
    require: true
  }
});

module.exports = SpellLevel;