const { Schema, model } = require("mongoose");

const Language = new Schema({
  _id: {
    type: String,
    require: true,
    trim: true
  },
  proficiency: {
    type: String,
    require: true,
    trim: true
  }
});

module.exports = Language;