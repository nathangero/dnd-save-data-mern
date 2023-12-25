import { Schema } from "mongoose";

const Weapon = new Schema({
  amount: {
    type: Number,
    require: true
  },
  attackDamageStat: {
    type: String,
    require: true,
    trim: true
  },
  category: {
    type: String,
    require: true,
    trim: true
  },
  description: {
    type: String
  },
  dieType: {
    type: String,
    require: true,
    trim: true
  },
  name: {
    type: String,
    require: true
  },
  proficient: {
    type: Boolean,
    require: true
  }
});

export default Weapon;