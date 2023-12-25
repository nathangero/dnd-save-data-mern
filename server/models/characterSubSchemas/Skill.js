const { Schema, model } = require("mongoose");

const Skill = new Schema({
  _id: String,
  proficient: {
    type: Boolean,
    require: true
  }
});

module.exports = Skill;