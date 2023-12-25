const resolvers = {
  Query: {
    hello: () => {
      console.log("@hello");
      return "Hello world"
    }
  },

  // Mutations: {

  // }
};

module.exports = resolvers;