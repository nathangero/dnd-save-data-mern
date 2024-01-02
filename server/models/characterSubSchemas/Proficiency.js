import { Schema } from "mongoose";

const Proficiency = new Schema({
  description: {
    type: String,
  },
  name: {
    type: String,
    require: true
  },
});

export default Proficiency;