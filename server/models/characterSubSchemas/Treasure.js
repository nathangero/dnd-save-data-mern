const { Schema, model } = require("mongoose");

const Treasure = new Schema({
  amount: {
    type: Number,
    require: true
  },
  description: {
    type: String
  },
  name: {
    type: String,
    require: true
  },
});

module.exports = Treasure;