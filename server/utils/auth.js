const { GraphQLError } = require("graphql");
const { auth } = require("./firebase.js");

module.exports = {
  authMiddleware: function ({ req }) {
    // let token = req.body.token || req.query.token || req.headers.authorization;

    // if (req.headers.authorization) {
    //   // Get the token which will be the last element in the split
    //   token = token.split(" ").pop().trim();
    // }

    // if (!token) {
    //   return req;
    // }

    try {
      if (!auth.currentUser) return;
      console.log("auth.currentUser:", auth.currentUser);
      const data = auth.currentUser;
      console.log("data:", data);
      req.user = data; // Set a user object to the req for context checking
    } catch (error) {
      console.log("Invalid token");
    }

    return req;
  }
}