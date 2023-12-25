import { Schema } from "mongoose";

export const DeathSaves = new Schema({
  failures: {
    type: Number,
    require: true
  },
  successes: {
    type: Number,
    require: true
  },
});

export { DeathSaves };