import Character from "../models/Character.js";
import User from "../models/User.js";
import { ErrorAuthentication } from "../../server/utils/auth.js";
import { ObjectId } from "bson";

const resolvers = {
  Query: {
    getMe: async (parent, args, context) => {
      try {
        if (!context.user) {
          // console.log("no user found");
          throw ErrorAuthentication;
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
        // Do a case-insensitive search of the username
        const regex = { $regex: new RegExp(`^${username.trim()}$`, 'i') };
        const user = await User.findOne({ username: regex });

        // console.log("user:", user);
        return user;
      } catch (error) {
        console.log("couldn't search for user");
        console.error(error);
        return {}
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
    },
    updateCharacter: async (parent, { _id, character }, context) => {
      try {
        if (!context.user) {
          throw ErrorAuthentication;
        }

        const updatedChar = await Character.findOneAndUpdate(
          { _id },
          { $set: { ...character }},
          { new: true }
        );

        // console.log("updatedChar level:", updatedChar.level);
        return updatedChar;
      } catch (error) {
        console.log("server couldn't update character");
        console.error(error);
      }
    }
  }
};

export default resolvers;