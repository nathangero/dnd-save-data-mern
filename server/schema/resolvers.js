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

export default resolvers;