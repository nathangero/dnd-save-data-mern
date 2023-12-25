const { Schema, model } = require("mongoose");

const Hp = new Schema({
  current: {
    type: Number,
    require: true
  },
  dieType: {
    type: String,
    require: true
  },
  dieAmountCurrent: {
    type: Number,
    require: true
  },
  dieAmountMax: {
    type: Number,
    require: true
  },
  max: {
    type: Number,
    require: true
  },
  temp: {
    type: Number,
    require: true
  }
});

module.exports = Hp;