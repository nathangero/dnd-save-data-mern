import { GraphQLError } from "graphql";

export const authMiddleware = function ({ req }) {
  let token = req.body.token || req.query.token || req.headers.authorization;
  if (req.headers.authorization) {
    // Get the token which will be the last element in the split
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const data = token;
    req.user = data; // Set a user object to the req for context checking
  } catch (error) {
    console.log("Invalid token");
  }

  return req;
};

export const ErrorAuthentication = new GraphQLError("Could not authenticate user.", {
  extensions: {
    code: "UNAUTHENTICATED",
  },
});

export const ErrorMustBeLoggedIn = new GraphQLError("Must be logged in to do this.", {
  extensions: {
    code: "NOT_LOGGED_IN",
  },
});
