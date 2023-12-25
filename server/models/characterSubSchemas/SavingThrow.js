const { Schema, model } = require("mongoose");

const SavingThrow = new Schema({
  _id: String,
  proficient: {
    type: Boolean,
    require: true
  }
});

module.exports = SavingThrow;