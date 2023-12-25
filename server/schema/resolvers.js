import Character from "../models/Character.js";
import User from "../models/User.js";
import { ErrorAuthentication } from "../../server/utils/auth.js"

const resolvers = {
  Query: {
    getMe: async (parent, args, context) => {
      try {
        if (!context.user) {
          console.log("no user found");
          throw ErrorAuthentication;
        } else {
          console.log("context.user:", context.user);
        }

        const user = await User.findOne({
          _id: context.user
        })
          .populate("characters");

        if (user) console.log("got user")
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