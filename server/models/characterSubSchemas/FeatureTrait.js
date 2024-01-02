import { Schema } from "mongoose";

const FeatureTrait = new Schema({
  actionType: {
    type: String,
  },
  description: {
    type: String
  },
  name: {
    type: String,
    require: true
  },
  traitType: {
    type: String,
    require: true
  },
  uses: {
    type: Number,
    require: true
  }
});

export default FeatureTrait;