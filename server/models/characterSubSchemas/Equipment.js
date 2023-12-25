import { Schema } from "mongoose";

export const Equipment = new Schema({
  amount: {
    type: Number,
    require: true
  },
  description: {
    type: String,
  },
  name: {
    type: String,
    require: true,
  },
});

export { Equipment };