// index.js
require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { json } = require("body-parser");
const cors = require("cors");

const typeDefs = require("./schema/typeDefs");
const resolvers = require("./resolvers/bookResolver");
const { sequelize } = require("./models");

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  app.use(
    "/graphql",
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.authorization })
    })
  );

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, async () => {
    try {
      await sequelize.authenticate();
      console.log("🟢 DB Connected");
    } catch (err) {
      console.error("🔴 DB Connection Error:", err);
    }

    console.log(`🚀 GraphQL Server ready at http://localhost:${PORT}/graphql`);
  });
};

startServer();
