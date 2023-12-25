import { Schema } from "mongoose";

export const Language = new Schema({
  name: {
    type: String,
    require: true,
    trim: true
  },
  proficiency: {
    type: String,
    require: true,
    trim: true
  }
});

export { Language };