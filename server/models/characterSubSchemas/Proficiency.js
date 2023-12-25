const { Schema, model } = require("mongoose");

const Proficiency = new Schema({
  description: {
    type: String,
  },
  name: {
    type: String,
    require: true
  },
});

module.exports = Proficiency;