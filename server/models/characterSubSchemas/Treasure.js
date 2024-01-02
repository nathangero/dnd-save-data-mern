import { Schema } from "mongoose";

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

export default Treasure;