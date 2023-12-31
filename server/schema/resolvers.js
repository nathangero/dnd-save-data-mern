import Character from "../models/Character.js";
import User from "../models/User.js";
import { ErrorAuthentication } from "../../server/utils/auth.js";
import { ObjectId } from "bson";

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

        // if (user) console.log("got user")
        return user
      } catch (error) {
        console.log("couldn't load user");
        console.error(error);
      }
    },
    checkUser: async (parent, { username }) => {
      try {
        const user = User.findOne({ username });
        // console.log("user:", user);
        return user;
      } catch (error) {
        console.log("couldn't search for user");
      }
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        // console.log("new user:", user);
        return user;
      } catch (error) {
        console.log("Couldn't sign up user");
        console.error(error);
      }
    }
  }
};

export default resolvers;