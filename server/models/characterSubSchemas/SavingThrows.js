import { Schema } from "mongoose";

export const SavingThrow = new Schema({
  cha: {
    type: Boolean,
    required: true
  },
  con: {
    type: Boolean,
    required: true
  },
  dex: {
    type: Boolean,
    required: true
  },
  int: {
    type: Boolean,
    required: true
  },
  str: {
    type: Boolean,
    required: true
  },
  wis: {
    type: Boolean,
    required: true
  },
});

export { SavingThrow };