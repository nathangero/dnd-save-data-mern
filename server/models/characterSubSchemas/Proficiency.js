import { Schema } from "mongoose";

export const Proficiency = new Schema({
  description: {
    type: String,
  },
  name: {
    type: String,
    require: true
  },
});

export { Proficiency };