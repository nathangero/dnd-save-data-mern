import { Schema } from "mongoose";

export const SpellSlot = new Schema({
  current: {
    type: Number,
    require: true
  },
  max: {
    type: Number,
    require: true
  }
});

export { SpellSlot };