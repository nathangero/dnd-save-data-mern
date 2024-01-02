import express from "express";
import mongoose from 'mongoose';
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import typeDefs from "./schema/typeDefs.js";
import resolvers from "./schema/resolvers.js";
import { authMiddleware } from "./utils/auth.js";
// import path from "path";

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers
})

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/dist'));
    app.get('*', (req, res) => {
      res.sendFile('../client/dist/index.html');
    });

    // app.use(express.static(path.join(__dirname, '../client/dist')));

    // app.get('*', (req, res) => {
    //   res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    // });
  }

  mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dndSaveData'
  )

  mongoose.connection.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  })
}

startApolloServer();