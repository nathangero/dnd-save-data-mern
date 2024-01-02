import { Schema } from "mongoose";

const Spell = new Schema({
  castingTime: {
    type: Number,
    require: true
  },
  description: {
    type: String,
  },
  duration: {
    type: Number,
    require: true
  },
  durationType: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  range: {
    type: Number,
    require: true
  },
});

export default Spell;