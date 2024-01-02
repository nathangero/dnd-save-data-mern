import { Schema } from "mongoose";

const SpellSlot = new Schema({
  current: {
    type: Number,
    require: true
  },
  max: {
    type: Number,
    require: true
  }
});

export default SpellSlot;