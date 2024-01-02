import { Schema } from "mongoose";

const Language = new Schema({
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

export default Language;