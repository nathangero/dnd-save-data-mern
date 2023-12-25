const { Schema, model } = require("mongoose");
const SpellLevel = require("./SpellLevel");

const Spell = new Schema({
  level: {
    type: SpellLevel,
    require: true
  }
});

module.exports = SpellLevel;