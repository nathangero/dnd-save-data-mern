const { Schema, model } = require("mongoose");
const SpellSlot = require("./SpellSlot");

const SpellSlotLevel = new Schema({
  _id: String,
  slot: {
    type: SpellSlot,
    require: true
  }
});

module.exports = SpellSlotLevel;