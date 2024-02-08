import { Schema } from "mongoose";

const SkillProficiency = new Schema({
  proficient: {
    type: Boolean,
    require: true
  },
  expertise: {
    type: Boolean,
    require: true
  }
});

export default SkillProficiency;