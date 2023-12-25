import { ObjectId } from "bson";
import Character from "../models/Character.js";
import User from "../models/User.js";

const resolvers = {
  Query: {
    getMe: async (parent, args, context) => {
      console.log("@getMe");

      console.log("context:", context);
      
      try {
        const user = await User.findOne({
          _id: "dzWqul52fsbxshNPYm7hnBR1dH83"
        })
        .populate("characters");

        // console.log("user:", user);
        return user
      } catch (error) {
        console.log("couldn't load user");
        console.error(error);
      }
    }
  },

  // Mutations: {

  // }
};

export default resolvers;