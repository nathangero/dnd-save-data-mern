import { Schema } from "mongoose";

const Equipment = new Schema({
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

export default Equipment;