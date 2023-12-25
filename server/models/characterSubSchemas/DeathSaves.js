import { Schema } from "mongoose";

const DeathSaves = new Schema({
  failures: {
    type: Number,
    require: true
  },
  successes: {
    type: Number,
    require: true
  },
});

export default DeathSaves;