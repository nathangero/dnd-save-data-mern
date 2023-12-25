import { Schema, model } from "mongoose";

const userSchema = new Schema({
  _id: { // These _ids will be coming from firebase auth
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    minLength: 3,
    maxLength: 100
  },
  characters: [
    {
      type: Schema.Types.ObjectId,
      ref: "Character"
    }
  ]
});

const User = model("User", userSchema);
export default User;